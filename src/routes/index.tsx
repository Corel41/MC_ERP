import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, Page, Pill, Stat, toneForStatus } from "@/components/ui";
import { daysTo, liveStatement, portfolioArrears, tenantBalances } from "@/lib/metrics";
import { useBooks } from "@/lib/portfolio";
import { useErp } from "@/lib/store";
import { inMonth, kes, monthNumber } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: BoardPage });

function BoardPage() {
  const books = useBooks();
  const raiseInvoices = useErp((s) => s.raiseInvoices);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const period = books.periods.find((p) => p.status === "Open") ?? books.periods[books.periods.length - 1];
  const month = monthNumber(period?.month || "Oct");
  const year = period?.year || 2026;
  const bals = tenantBalances(books.ledger);
  const arrears = portfolioArrears(books.invoices, books.receipts);
  const collected = books.receipts.filter((r) => inMonth(r.date, month, year)).reduce((s, r) => s + r.amount, 0);
  const occupied = books.units.filter((u) => u.status === "OCCUPIED").length;
  const occPct = books.units.length ? Math.round((occupied / books.units.length) * 100) : 0;

  const statements = books.properties.map((property) =>
    liveStatement({
      property,
      mandate: books.mandates.find((m) => m.propertyId === property.id),
      month,
      year,
      invoices: books.invoices,
      receipts: books.receipts,
      otherIncome: books.otherIncome,
      deductions: books.deductions,
      tickets: books.tickets,
      payouts: books.payouts,
    }),
  );
  const stillToRemit = statements.reduce((s, row) => s + Math.max(0, row.balance), 0);

  const series = useMemo(
    () =>
      books.periods.map((p) => ({
        month: p.month,
        collected: books.receipts
          .filter((r) => inMonth(r.date, monthNumber(p.month), p.year))
          .reduce((s, r) => s + r.amount, 0),
      })),
    [books.periods, books.receipts],
  );

  const owing = books.tenants
    .map((t) => ({ t, bal: bals.get(t.id) || 0 }))
    .filter((row) => row.bal > 1)
    .sort((a, b) => b.bal - a.bal)
    .slice(0, 6);

  const renewals = [...books.leases].sort((a, b) => a.endDate.localeCompare(b.endDate)).slice(0, 4);
  const openJobs = books.tickets.filter((t) => t.status !== "Done").slice(0, 4);

  return (
    <Page
      kicker="October board"
      title="The books, in one place"
      lede="Collections, arrears and what is still due to landlords. Aged as at 28 October 2026, the open period in this portfolio."
      actions={
        <>
          <Link
            to="/desk"
            search={{ tenant: "" }}
            className="press inline-flex h-11 items-center rounded-xl bg-primary px-4 text-sm font-medium text-ink shadow-sm transition-[filter] hover:brightness-110 active:brightness-95"
          >
            Take a payment
          </Link>
          <button
            type="button"
            className="press inline-flex h-11 items-center rounded-xl border border-line bg-surface px-4 text-sm transition-colors hover:bg-surface-2"
            onClick={() => raiseInvoices()}
          >
            Bill open period
          </button>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label={`Collected · ${period?.month}`} value={kes(collected)} hint="Receipts this period" tone="good" />
        <Stat label="Tenant arrears" value={kes(arrears.total)} hint={`${books.tenants.filter((t) => (bals.get(t.id) || 0) > 1).length} accounts owing`} tone={arrears.total > 0 ? "bad" : "good"} />
        <Stat label="Occupancy" value={`${occPct}%`} hint={`${occupied} of ${books.units.length} units`} />
        <Stat label="Still to remit" value={kes(stillToRemit)} hint="Net after fee, VAT, MRI" tone="warn" />
      </div>

      <div className="grid gap-3 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <h2 className="font-display text-xl">Collections by month</h2>
          <div className="mt-3 h-52 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={series}>
                  <XAxis dataKey="month" tick={{ fill: "var(--mc-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    formatter={(value) => kes(Number(value))}
                    cursor={{ fill: "var(--mc-surface-2)" }}
                    contentStyle={{
                      background: "var(--mc-surface)",
                      border: "1px solid var(--mc-line)",
                      borderRadius: 12,
                      color: "var(--mc-fg)",
                    }}
                  />
                  <Bar dataKey="collected" fill="var(--mc-primary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <h2 className="font-display text-xl">Arrears age</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {[...arrears.buckets.entries()].map(([label, amount]) => (
              <li key={label} className="flex items-center justify-between text-sm">
                <span className="text-muted">{label}</span>
                <span className="font-mono">{kes(amount)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-xl">Who owes</h2>
            <Link to="/tenants" className="text-sm text-primary">
              All tenants
            </Link>
          </div>
          {owing.length === 0 ? <p className="text-sm text-muted">Every account is clear.</p> : null}
          <ul className="flex flex-col gap-2">
            {owing.map(({ t, bal }) => (
              <li key={t.id}>
                <Link
                  to="/desk"
                  search={{ tenant: t.id }}
                  className="lift flex items-center justify-between gap-3 rounded-xl bg-surface-2 px-3 py-2 hover:bg-surface-2/70 hover:ring-1 hover:ring-primary/30"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm">{t.name}</span>
                    <span className="text-xs text-muted">{t.unitCode}</span>
                  </span>
                  <span className="font-mono text-sm text-bad">{kes(bal)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="font-display text-xl">Coming up</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {renewals.map((lease) => (
              <li key={lease.id} className="flex items-start justify-between gap-3 text-sm">
                <span>
                  <span className="block">{lease.tenantName}</span>
                  <span className="text-xs text-muted">
                    {lease.unitCode} · lease ends {lease.endDate}
                  </span>
                </span>
                <span className="text-xs text-muted">{daysTo(lease.endDate)} days</span>
              </li>
            ))}
            {openJobs.map((job) => (
              <li key={job.id} className="flex items-start justify-between gap-3 text-sm">
                <span>
                  <span className="block">{job.title}</span>
                  <span className="text-xs text-muted">{job.propertyName}</span>
                </span>
                <Pill tone={toneForStatus(job.urgency)}>{job.urgency}</Pill>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Page>
  );
}
