import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button, Card, Field, Page, Stat } from "@/components/ui";
import { liveStatement } from "@/lib/metrics";
import { useBooks } from "@/lib/portfolio";
import { useErp } from "@/lib/store";
import { inMonth, kes, monthNumber } from "@/lib/utils";

export const Route = createFileRoute("/finance")({ component: FinancePage });

function FinancePage() {
  const books = useBooks();
  const addExpense = useErp((s) => s.addExpense);
  const allExpenses = useErp((s) => s.expenses);
  const [payee, setPayee] = useState("");
  const [category, setCategory] = useState("Office");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const period = books.periods.find((p) => p.status === "Open") ?? books.periods.at(-1);
  const month = monthNumber(period?.month || "Oct");
  const year = period?.year || 2026;
  const collected = books.receipts.filter((r) => inMonth(r.date, month, year)).reduce((s, r) => s + r.amount, 0);
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
  const fee = statements.reduce((s, r) => s + r.fee, 0);
  const vat = statements.reduce((s, r) => s + r.vat, 0);
  const spend = allExpenses.filter((e) => inMonth(e.date, month, year)).reduce((s, e) => s + e.amount, 0);
  const remitted = books.payouts.filter((p) => p.periodMonth === month && p.periodYear === year && p.status === "Paid").reduce((s, p) => s + p.amount, 0);

  return (
    <Page
      kicker="Finance"
      title="Agency money, client money"
      lede="Collections sit in trust. Only the management fee is Metrocosmo income. VAT on that fee is a liability, not profit."
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Trust collected" value={kes(collected)} hint={period ? `${period.month} receipts` : ""} />
        <Stat label="Fee income" value={kes(fee)} tone="good" hint="Commission this period" />
        <Stat label="VAT payable" value={kes(vat)} tone="warn" hint="16% on the fee" />
        <Stat label="Office spend" value={kes(spend)} hint="Vouchers this month" />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-xl">Agency result</h2>
          <ul className="mt-3 text-sm">
            <Row label="Management fees" value={kes(fee)} />
            <Row label="Less operating vouchers" value={`-${kes(spend)}`} />
            <Row label="Agency surplus before tax" value={kes(fee - spend)} />
            <Row label="Landlord remittances paid" value={kes(remitted)} />
            <Row label="Still held in trust" value={kes(collected - remitted)} />
          </ul>
          <h3 className="mt-4 text-sm text-muted">Collection accounts</h3>
          <ul className="mt-2 text-sm">
            {books.paybills.map((p) => (
              <li key={p.id} className="flex justify-between py-1">
                <span>{p.business_name}</span>
                <span className="font-mono">{p.paybill_number}</span>
              </li>
            ))}
            {books.banks.map((b) => (
              <li key={b.id} className="flex justify-between py-1">
                <span>{b.bank_name}</span>
                <span className="font-mono text-xs">{b.account_no}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="font-display text-xl">New voucher</h2>
          <form
            className="mt-3 flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              addExpense({ payee, category, amount: Number(amount), notes });
              setPayee("");
              setAmount("");
              setNotes("");
              toast.success("Voucher saved");
            }}
          >
            <Field label="Payee"><input className="field" value={payee} onChange={(e) => setPayee(e.target.value)} required /></Field>
            <Field label="Category">
              <select className="field" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Office</option>
                <option>Fuel</option>
                <option>SMS gateway</option>
                <option>Professional fees</option>
              </select>
            </Field>
            <Field label="Amount"><input className="field font-mono" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} required /></Field>
            <Field label="Note"><input className="field" value={notes} onChange={(e) => setNotes(e.target.value)} /></Field>
            <Button type="submit">Save voucher</Button>
          </form>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {allExpenses.slice(0, 6).map((ex) => (
              <li key={ex.id} className="flex justify-between gap-2">
                <span className="min-w-0 truncate">{ex.payee}<span className="block text-xs text-muted">{ex.category} · {ex.date}</span></span>
                <span className="font-mono">{kes(ex.amount)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Page>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between border-b border-line py-2">
      <span className="text-muted">{label}</span>
      <span className="font-mono">{value}</span>
    </li>
  );
}
