import {
  formula_ReceiptAutoAllocateWaterfall,
  formula_StatementGrossCollection,
  formula_StatementManagementFee,
  formula_StatementNetDueLandlord,
  formula_StatementVatOnFee,
} from "@/lib/formulas";
import type {
  DueLine,
  Invoice,
  LandlordEntry,
  Lease,
  Mandate,
  Payout,
  Property,
  Receipt,
  Ticket,
} from "@/lib/types";
import { daysPastDue, inMonth, monthName, monthNumber, round } from "@/lib/utils";

export function paidByInvoice(receipts: Receipt[]) {
  const map = new Map<string, number>();
  for (const r of receipts) {
    for (const a of r.allocations || []) {
      map.set(a.invoice_id, round((map.get(a.invoice_id) || 0) + a.amount));
    }
  }
  return map;
}

export function invoiceParts(inv: Invoice) {
  const known = inv.rent + inv.serviceCharge + inv.utilities + inv.arrears;
  const other = round(Math.max(0, inv.totalAmount - known));
  return [
    { code: "ARR", label: "Arrears brought forward", priority: 5, amount: inv.arrears },
    { code: "001", label: "Rent", priority: 10, amount: inv.rent },
    { code: "010", label: "Parking / other", priority: 12, amount: other },
    { code: "009", label: "Service charge", priority: 15, amount: inv.serviceCharge },
    { code: "002", label: "Utilities", priority: 20, amount: inv.utilities },
  ].filter((p) => p.amount > 0.5);
}

export function linesForInvoice(inv: Invoice, alreadyPaid: number): DueLine[] {
  let left = alreadyPaid;
  const lines: DueLine[] = [];
  for (const part of invoiceParts(inv)) {
    const take = Math.min(left, part.amount);
    left = round(left - take);
    const due = round(part.amount - take);
    if (due > 0.5) {
      lines.push({
        invoiceId: inv.id,
        invoiceNumber: inv.invoiceNumber,
        code: part.code,
        label: part.label,
        priority: part.priority,
        due,
        period: `${monthName(inv.periodMonth)} ${inv.periodYear}`,
      });
    }
  }
  return lines;
}

export function tenantOpenLines(invoices: Invoice[], receipts: Receipt[], tenantId: string) {
  const paid = paidByInvoice(receipts);
  return invoices
    .filter((i) => i.tenantId === tenantId)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate) || a.invoiceNumber.localeCompare(b.invoiceNumber))
    .flatMap((inv, index) =>
      linesForInvoice(inv, paid.get(inv.id) || 0).map((line) => ({
        ...line,
        priority: index * 100 + line.priority,
      })),
    );
}

export function allocatePayment(amount: number, lines: DueLine[]) {
  const rows = lines.map((l) => ({
    code: l.code,
    description: l.label,
    totalDue: l.due,
    paid: 0,
    priority: l.priority,
    invoiceId: l.invoiceId,
    invoiceNumber: l.invoiceNumber,
    label: l.label,
    period: l.period,
    due: l.due,
  }));
  return formula_ReceiptAutoAllocateWaterfall(amount, rows);
}

export function invoiceStatus(total: number, paid: number) {
  if (paid >= total - 0.5) return "Paid";
  if (paid > 0.5) return "Partial";
  return "Unpaid";
}

export function tenantBalances(ledger: { tenantId: string; debit: number; credit: number }[]) {
  const map = new Map<string, number>();
  for (const row of ledger) {
    map.set(row.tenantId, round((map.get(row.tenantId) || 0) + row.debit - row.credit));
  }
  return map;
}

export function sumCollected(lines: { code: string; allocated?: number }[], code: string) {
  return round(lines.filter((l) => l.code === code).reduce((s, l) => s + (l.allocated || 0), 0));
}

export type LiveStatement = {
  rentBilled: number;
  rentCollected: number;
  otherCollected: number;
  scCollected: number;
  utilCollected: number;
  otherIncome: number;
  gross: number;
  feePct: number;
  fee: number;
  vat: number;
  mri: number;
  mriApplies: boolean;
  deductions: number;
  repairs: number;
  net: number;
  remitted: number;
  pending: number;
  balance: number;
  landlordName: string;
  feeLabel: string;
};

export function liveStatement(input: {
  property: Property;
  mandate: Mandate | undefined;
  month: number;
  year: number;
  invoices: Invoice[];
  receipts: Receipt[];
  otherIncome: LandlordEntry[];
  deductions: LandlordEntry[];
  tickets: Ticket[];
  payouts: Payout[];
}): LiveStatement {
  const { property, mandate, month, year } = input;
  const paid = paidByInvoice(input.receipts);
  let rentBilled = 0;
  let rentCollected = 0;
  let otherCollected = 0;
  let scCollected = 0;
  let utilCollected = 0;

  for (const inv of input.invoices) {
    if (inv.propertyId !== property.id || inv.periodMonth !== month || inv.periodYear !== year) continue;
    rentBilled = round(rentBilled + inv.rent);
    const parts = invoiceParts(inv);
    let left = Math.min(paid.get(inv.id) || 0, inv.totalAmount);
    for (const part of parts) {
      const take = Math.min(left, part.amount);
      left = round(left - take);
      if (part.code === "001" || part.code === "ARR") rentCollected = round(rentCollected + take);
      else if (part.code === "010") otherCollected = round(otherCollected + take);
      else if (part.code === "009") scCollected = round(scCollected + take);
      else utilCollected = round(utilCollected + take);
    }
  }

  for (const r of input.receipts) {
    if (r.propertyId !== property.id || !inMonth(r.date, month, year)) continue;
    if (!r.allocations?.length) rentCollected = round(rentCollected + r.amount);
  }

  const income = round(
    input.otherIncome
      .filter((e) => e.propertyId === property.id && e.periodMonth === month && e.periodYear === year)
      .reduce((s, e) => s + e.amount, 0),
  );
  const ded = round(
    input.deductions
      .filter((e) => e.propertyId === property.id && e.periodMonth === month && e.periodYear === year)
      .reduce((s, e) => s + e.amount, 0),
  );
  const repairs = round(
    input.tickets
      .filter((t) => {
        if (t.propertyId !== property.id || t.status !== "Done" || t.allocation !== "Landlord") return false;
        if (t.countedInDeductions) return false;
        const [y, m] = t.openedAt.slice(0, 10).split("-").map(Number);
        return y === year && m === month;
      })
      .reduce((s, t) => s + (t.actual || t.estimate), 0),
  );

  const residential = property.type !== "COMMERCIAL";
  const mriApplies = residential && Boolean(mandate?.mri);
  const mri = mriApplies ? round(rentCollected * 0.075) : 0;
  const fee = formula_StatementManagementFee(
    rentCollected,
    mandate?.feePct ?? 10,
    mandate?.feeFixed ?? 0,
    mandate?.commissionType ?? "PERCENTAGE",
  );
  const vat = formula_StatementVatOnFee(fee, 16, mandate?.vat !== false);
  const gross = formula_StatementGrossCollection(rentCollected, 0, round(otherCollected + income));
  const net = formula_StatementNetDueLandlord(gross, fee, vat, round(ded + repairs + mri), 0);
  const related = input.payouts.filter(
    (p) => p.propertyId === property.id && p.periodMonth === month && p.periodYear === year,
  );
  const remitted = round(related.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0));
  const pending = round(related.filter((p) => p.status !== "Paid").reduce((s, p) => s + p.amount, 0));

  return {
    rentBilled,
    rentCollected,
    otherCollected,
    scCollected,
    utilCollected,
    otherIncome: income,
    gross,
    feePct: mandate?.feePct ?? 0,
    fee,
    vat,
    mri,
    mriApplies,
    deductions: ded,
    repairs,
    net,
    remitted,
    pending,
    balance: round(net - remitted - pending),
    landlordName: mandate?.landlordName || "",
    feeLabel: mandate?.commissionType === "FIXED" ? "Fixed fee" : `${mandate?.feePct ?? 0}%`,
  };
}

export function openPeriodNumber(monthLabel: string) {
  return monthNumber(monthLabel);
}

export function agingBucket(days: number) {
  if (days <= 0) return "Not due";
  if (days <= 30) return "1–30 days";
  if (days <= 60) return "31–60 days";
  if (days <= 90) return "61–90 days";
  return "Over 90";
}

export function portfolioArrears(invoices: Invoice[], receipts: Receipt[]) {
  const paid = paidByInvoice(receipts);
  const buckets = new Map<string, number>([
    ["Not due", 0],
    ["1–30 days", 0],
    ["31–60 days", 0],
    ["61–90 days", 0],
    ["Over 90", 0],
  ]);
  let total = 0;
  for (const inv of invoices) {
    const due = round(inv.totalAmount - (paid.get(inv.id) || 0));
    if (due <= 0.5) continue;
    total = round(total + due);
    const key = agingBucket(daysPastDue(inv.dueDate));
    buckets.set(key, round((buckets.get(key) || 0) + due));
  }
  return { total, buckets };
}

export function daysTo(date: string) {
  const d = new Date(`${date.slice(0, 10)}T00:00:00+03:00`);
  const asOf = new Date("2026-10-28T12:00:00+03:00");
  return Math.ceil((d.getTime() - asOf.getTime()) / 86_400_000);
}

export function activeLeases(leases: Lease[]) {
  return leases.filter((l) => l.status === "Active");
}
