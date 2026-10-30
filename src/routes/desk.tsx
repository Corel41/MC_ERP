import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button, Card, Empty, Field, Page, Pill, Stat } from "@/components/ui";
import { tenantBalances } from "@/lib/metrics";
import { useBooks } from "@/lib/portfolio";
import { useErp } from "@/lib/store";
import { kes } from "@/lib/utils";

export const Route = createFileRoute("/desk")({
  validateSearch: (search): { tenant: string } => ({ tenant: String(search.tenant ?? "") }),
  component: DeskPage,
});

function DeskPage() {
  const { tenant: tenantId } = Route.useSearch();
  const books = useBooks();
  const postReceipt = useErp((s) => s.postReceipt);

  const bals = useMemo(() => tenantBalances(books.ledger), [books.ledger]);
  const owing = books.tenants.filter((t) => (bals.get(t.id) || 0) > 1);
  const selected = books.tenants.find((t) => t.id === tenantId) || null;

  const [payeeId, setPayeeId] = useState<string>(selected?.id || "");
  const active = selected || books.tenants.find((t) => t.id === payeeId) || null;
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("M-Pesa");
  const [reference, setReference] = useState("");
  const [date, setDate] = useState("2026-10-28");
  const [notes, setNotes] = useState("");

  const balance = active ? bals.get(active.id) || 0 : 0;

  return (
    <Page
      kicker="Cash desk"
      title="Take a payment"
      lede="Receipts waterfall onto the oldest balances first — rent before service charge, arrears before this month."
    >
      <div className="grid gap-3 lg:grid-cols-[1fr_1.2fr]">
        <Card>
          <h2 className="font-display text-xl">Who is paying?</h2>
          <div className="mt-3 flex flex-col gap-2">
            <Field label="Tenant">
              <select
                className="field"
                value={active?.id || ""}
                onChange={(e) => {
                  setPayeeId(e.target.value);
                  setAmount(String(bals.get(e.target.value) || ""));
                }}
              >
                <option value="" disabled>
                  Choose a tenant
                </option>
                {books.tenants.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} · {t.unitCode}
                  </option>
                ))}
              </select>
            </Field>
            {owing.length ? (
              <>
                <p className="text-xs text-muted">Accounts owing ({owing.length})</p>
                <ul className="flex flex-col gap-1">
                  {owing.slice(0, 6).map((t) => (
                    <li key={t.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setPayeeId(t.id);
                          setAmount(String(bals.get(t.id) || 0));
                        }}
                        className={`press lift flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                          active?.id === t.id ? "bg-primary/10 ring-1 ring-primary/30" : "bg-surface-2 hover:bg-surface-2/70"
                        }`}
                      >
                        <span className="min-w-0 truncate">{t.name}</span>
                        <span className="shrink-0 font-mono text-xs text-bad">{kes(bals.get(t.id) || 0)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-sm text-muted">Every account is clear.</p>
            )}
          </div>
        </Card>

        {active ? (
          <Card>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl">{active.name}</h2>
                <p className="text-sm text-muted">
                  {active.unitCode} · {active.propertyName} · {active.code}
                </p>
              </div>
              <Pill tone={balance > 1 ? "bad" : "good"}>{balance > 1 ? `Owing ${kes(balance)}` : "In credit"}</Pill>
            </div>
            <form
              className="mt-4 grid gap-2 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                const amt = Number(amount);
                if (!amt || amt <= 0) {
                  toast.error("Enter an amount");
                  return;
                }
                postReceipt({ tenantId: active.id, amount: amt, method, reference, date, notes });
                setAmount("");
                setReference("");
                setNotes("");
              }}
            >
              <Field label="Amount, KES">
                <input className="field font-mono" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={String(Math.max(0, Math.round(balance)))} required />
              </Field>
              <Field label="Method">
                <select className="field" value={method} onChange={(e) => setMethod(e.target.value)}>
                  <option>M-Pesa</option>
                  <option>Bank</option>
                  <option>Cheque</option>
                  <option>Cash</option>
                </select>
              </Field>
              <Field label="Transaction reference">
                <input className="field font-mono" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="QGS…" required />
              </Field>
              <Field label="Value date">
                <input className="field font-mono" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Note (optional)">
                  <input className="field" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. part payment, agreed plan" />
                </Field>
              </div>
              <div className="flex gap-2 sm:col-span-2">
                <Button type="submit">Issue receipt</Button>
                {balance > 1 ? (
                  <Button type="button" variant="ghost" size="md" onClick={() => setAmount(String(Math.round(balance)))}>
                    Full balance
                  </Button>
                ) : null}
              </div>
            </form>
          </Card>
        ) : (
          <Card>
            <Empty title="Pick a tenant" body="Choose an account on the left, or follow a name from the board or the tenants list." />
          </Card>
        )}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Receipts today" value={String(books.receipts.filter((r) => r.date === "2026-10-28").length)} hint="As at 28 Oct 2026" />
        <Stat label="Accounts owing" value={String(owing.length)} hint={`Total ${kes(owing.reduce((s, t) => s + (bals.get(t.id) || 0), 0))}`} tone={owing.length ? "bad" : "good"} />
        <Stat label="This month" value={kes(books.receipts.filter((r) => r.date.startsWith("2026-10")).reduce((s, r) => s + r.amount, 0))} hint="October receipts" tone="good" />
        <Stat label="Methods" value={`${new Set(books.receipts.filter((r) => r.date.startsWith("2026-10")).map((r) => r.method)).size}`} hint="Distinct rails used in October" />
      </div>
    </Page>
  );
}
