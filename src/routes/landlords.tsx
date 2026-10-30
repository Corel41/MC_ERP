import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Card, Empty, Page, Pill, Stat, toneForStatus } from "@/components/ui";
import { liveStatement } from "@/lib/metrics";
import { useBooks } from "@/lib/portfolio";
import { kes, monthNumber } from "@/lib/utils";

export const Route = createFileRoute("/landlords")({ component: LandlordsPage });

function LandlordsPage() {
  const books = useBooks();
  const period = books.periods.find((p) => p.status === "Open") ?? books.periods.at(-1);
  const month = monthNumber(period?.month || "Oct");
  const year = period?.year || 2026;

  const rows = useMemo(
    () =>
      books.mandates.map((mandate) => {
        const property = books.properties.find((p) => p.id === mandate.propertyId);
        if (!property) return null;
        const st = liveStatement({
          property,
          mandate,
          month,
          year,
          invoices: books.invoices,
          receipts: books.receipts,
          otherIncome: books.otherIncome,
          deductions: books.deductions,
          tickets: books.tickets,
          payouts: books.payouts,
        });
        return { mandate, property, st };
      }),
    [books, month, year],
  );

  const totalNet = rows.reduce((s, r) => s + (r ? Math.max(0, r.st.net) : 0), 0);
  const totalBalance = rows.reduce((s, r) => s + (r ? Math.max(0, r.st.balance) : 0), 0);

  return (
    <Page
      kicker="Trust accounting"
      title="Landlord accounts"
      lede={`Live statements for ${period?.label || "the open period"} — commission, VAT, MRI withholding, and what is still to remit.`}
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Mandates" value={String(rows.filter(Boolean).length)} hint="Active instructions" />
        <Stat label={`Net due · ${period?.label}`} value={kes(totalNet)} hint="After fee, VAT, MRI, deductions" tone="info" />
        <Stat label="Still to remit" value={kes(totalBalance)} hint={totalBalance > 0 ? "Unpaid landlord balances" : "Everything remitted"} tone={totalBalance > 0 ? "warn" : "good"} />
        <Stat label="Collected this period" value={kes(rows.reduce((s, r) => s + (r ? r.st.gross : 0), 0))} hint="Rent + other, by mandate" tone="good" />
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {rows.filter(Boolean).map(({ mandate, property, st }) => (
          <Card key={mandate.id} className="fade-slide">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl">{mandate.landlordName}</h2>
                <p className="text-sm text-muted">
                  {property.name} · {mandate.commissionType === "FIXED" ? `Fixed ${kes(mandate.feeFixed)}` : `${mandate.feePct}% commission`}
                  {mandate.mri ? " · MRI applies" : ""}
                  {mandate.vat ? " · VAT on fee" : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Pill tone={st.balance > 0.5 ? "warn" : "good"}>{st.balance > 0.5 ? "To remit" : "Settled"}</Pill>
                <Pill tone={toneForStatus(mandate.status)}>{mandate.status}</Pill>
              </div>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-4 lg:grid-cols-7">
              <Cell label="Rent collected" value={kes(st.rentCollected)} />
              <Cell label="Other & SC" value={kes(st.otherCollected + st.scCollected + st.utilCollected)} />
              <Cell label="Commission" value={`-${kes(st.fee)}`} />
              <Cell label="VAT on fee" value={`-${kes(st.vat)}`} />
              <Cell label="MRI 7.5%" value={st.mriApplies ? `-${kes(st.mri)}` : "—"} />
              <Cell label="Deductions" value={`-${kes(st.deductions + st.repairs)}`} />
              <Cell label="Net payable" value={kes(st.net)} strong />
            </dl>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 text-sm">
              <span className="text-muted">
                Remitted {kes(st.remitted)} · pending {kes(st.pending)} · disbursing to {mandate.disbursingAccount}
              </span>
              <Link
                to="/finance"
                className="press rounded-lg border border-line px-3 py-1.5 text-sm transition-colors hover:bg-surface-2"
              >
                Open the finance board
              </Link>
            </div>
          </Card>
        ))}
        {!rows.filter(Boolean).length ? (
          <Card>
            <Empty title="No mandates in scope" body="Switch the branch filter to “All branches”, or add a mandate in the database." />
          </Card>
        ) : null}
      </div>
    </Page>
  );
}

function Cell({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div>
      <dt className="text-xs text-faint">{label}</dt>
      <dd className={strong ? "font-mono font-medium text-primary" : "font-mono"}>{value}</dd>
    </div>
  );
}
