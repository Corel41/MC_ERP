import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button, Card, Drawer, Field, Page, Pill, SearchBox, toneForStatus } from "@/components/ui";
import { invoiceStatus, paidByInvoice, tenantBalances } from "@/lib/metrics";
import { useBooks } from "@/lib/portfolio";
import { useErp } from "@/lib/store";
import { kes } from "@/lib/utils";

export const Route = createFileRoute("/tenants")({ component: TenantsPage });

function TenantsPage() {
  const books = useBooks();
  const recordReading = useErp((s) => s.recordReading);
  const [q, setQ] = useState("");
  const [propertyId, setPropertyId] = useState("all");
  const [onlyArrears, setOnlyArrears] = useState(false);
  const [focus, setFocus] = useState<string | null>(null);
  const bals = useMemo(() => tenantBalances(books.ledger), [books.ledger]);
  const paid = useMemo(() => paidByInvoice(books.receipts), [books.receipts]);

  const list = books.tenants.filter((t) => {
    if (propertyId !== "all" && t.propertyId !== propertyId) return false;
    if (onlyArrears && (bals.get(t.id) || 0) <= 1) return false;
    const hay = `${t.name} ${t.code} ${t.unitCode} ${t.phone}`.toLowerCase();
    return hay.includes(q.trim().toLowerCase());
  });
  const tenant = books.tenants.find((t) => t.id === focus) || null;
  const lease = books.leases.find((l) => l.tenantId === tenant?.id && l.status === "Active");
  const invoices = books.invoices.filter((i) => i.tenantId === tenant?.id).sort((a, b) => b.dueDate.localeCompare(a.dueDate));
  const ledger = books.ledger.filter((l) => l.tenantId === tenant?.id).slice(-8).reverse();
  const unit = books.units.find((u) => u.id === tenant?.unitId);
  const lastRead = books.readings.filter((r) => r.unitId === tenant?.unitId).sort((a, b) => b.date.localeCompare(a.date))[0];
  const [meter, setMeter] = useState("");

  return (
    <Page
      kicker="Estate"
      title="Tenants"
      lede="Balances come from the ledger. Open an account for the lease, invoices, and a demand letter."
      actions={
        <button
          type="button"
          className={`press h-11 rounded-xl border px-4 text-sm transition-colors ${onlyArrears ? "border-bad bg-bad/15 text-bad" : "border-line bg-surface hover:bg-surface-2"}`}
          onClick={() => setOnlyArrears((v) => !v)}
          aria-pressed={onlyArrears}
        >
          {onlyArrears ? "Showing arrears" : "Arrears only"}
        </button>
      }
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_16rem]">
        <SearchBox value={q} onChange={setQ} placeholder="Search name, code, unit" />
        <select className="field" value={propertyId} onChange={(e) => setPropertyId(e.target.value)} aria-label="Property">
          <option value="all">All properties</option>
          {books.properties.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <p className="text-xs text-muted">{list.length} accounts</p>
      <div className="grid gap-2">
        {list.map((t) => {
          const bal = bals.get(t.id) || 0;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setFocus(t.id);
                setMeter("");
              }}
              className="lift flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-4 py-3 text-left hover:border-primary/40 focus-visible:border-primary"
            >
              <span className="min-w-0">
                <span className="block truncate font-medium">{t.name}</span>
                <span className="text-xs text-muted">
                  {t.code} · {t.unitCode} · {t.propertyName}
                </span>
              </span>
              <span className="text-right">
                <span className={`block font-mono text-sm ${bal > 1 ? "text-bad" : "text-good"}`}>{kes(bal)}</span>
                <span className="text-xs text-faint">{bal > 1 ? "Owing" : bal < -1 ? "In credit" : "Clear"}</span>
              </span>
            </button>
          );
        })}
      </div>

      <Drawer open={Boolean(tenant)} title={tenant?.name || "Tenant"} onClose={() => setFocus(null)}>
        {tenant ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <Pill tone={tenant.active ? "good" : "neutral"}>{tenant.active ? "Active" : "Inactive"}</Pill>
              <Pill tone="neutral">{tenant.unitCode}</Pill>
            </div>
            <p className="font-mono text-2xl">{kes(bals.get(tenant.id) || 0)}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a className="rounded-xl bg-surface-2 px-3 py-2" href={`tel:${tenant.phone}`}>
                {tenant.phone || "No phone"}
              </a>
              <span className="rounded-xl bg-surface-2 px-3 py-2">{tenant.idNo || "No ID"}</span>
            </div>
            {lease ? (
              <Card>
                <p className="text-xs text-muted">Lease · {lease.startDate} to {lease.endDate}</p>
                <p className="mt-1 text-sm">Rent {kes(lease.rentAmount)} · service {kes(lease.serviceCharge)}</p>
                <p className="text-sm text-muted">Deposit held {kes(lease.depositAmount)}</p>
              </Card>
            ) : null}
            <div className="flex gap-2">
              <Link
                to="/desk"
                search={{ tenant: tenant.id }}
                className="press inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-primary text-sm font-medium text-ink shadow-sm transition-[filter] hover:brightness-110 active:brightness-95"
              >
                Take payment
              </Link>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  const letter = demand(books.company, tenant.name, tenant.unitCode, tenant.propertyName, tenant.code, bals.get(tenant.id) || 0);
                  void navigator.clipboard.writeText(letter).then(() => toast.success("Demand letter copied"));
                }}
              >
                Copy demand
              </Button>
            </div>
            <div>
              <h3 className="text-sm text-muted">Invoices</h3>
              <ul className="mt-2 flex flex-col gap-2">
                {invoices.slice(0, 8).map((inv) => {
                  const got = paid.get(inv.id) || 0;
                  const status = invoiceStatus(inv.totalAmount, got);
                  return (
                    <li key={inv.id} className="flex items-center justify-between gap-2 text-sm">
                      <span>
                        <span className="block font-mono text-xs">{inv.invoiceNumber}</span>
                        <span className="text-muted">{inv.periodMonth}/{inv.periodYear}</span>
                      </span>
                      <span className="text-right">
                        <span className="block font-mono">{kes(inv.totalAmount - got)}</span>
                        <Pill tone={toneForStatus(status)}>{status}</Pill>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h3 className="text-sm text-muted">Latest ledger</h3>
              <ul className="mt-2 flex flex-col gap-1 text-sm">
                {ledger.map((row) => (
                  <li key={row.id} className="flex justify-between gap-2">
                    <span className="min-w-0 truncate text-muted">{row.description}</span>
                    <span className="font-mono">{row.credit ? `-${kes(row.credit)}` : kes(row.debit)}</span>
                  </li>
                ))}
              </ul>
            </div>
            {unit ? (
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const result = recordReading({ unitId: unit.id, current: Number(meter) });
                  if (!result.ok) toast.error(result.reason);
                  else {
                    toast.success(result.amount ? `Water bill ${kes(result.amount)}` : "Reading saved, no consumption");
                    setMeter("");
                  }
                }}
              >
                <Field label={`Water meter · last ${lastRead ? lastRead.curr : 0}`}>
                  <input className="field font-mono" inputMode="decimal" value={meter} onChange={(e) => setMeter(e.target.value)} required />
                </Field>
                <Button type="submit" variant="ghost">
                  Post reading
                </Button>
              </form>
            ) : null}
          </div>
        ) : null}
      </Drawer>
    </Page>
  );
}

function demand(company: { name: string; address: string; pin: string; paybill: string }, name: string, unit: string, property: string, code: string, balance: number) {
  return `${company.name}
${company.address}
KRA PIN ${company.pin}

RENT DEMAND NOTICE
28 October 2026

To: ${name}
${unit}, ${property}

Our ledger shows ${kes(balance)} outstanding as at 28 October 2026.

Please pay by M-Pesa Paybill ${company.paybill}, account number ${code}.

${company.name}`;
}
