import { round } from "@/lib/utils";

export function formula_UtilityConsumptionInput(previousReading: number, currentReading: number) {
  return Math.max(0, round((Number(currentReading) || 0) - (Number(previousReading) || 0)));
}

export function formula_UtilityBillAmountInput(consumptionUnits: number, tariffRate: number) {
  return Math.max(0, round((Number(consumptionUnits) || 0) * (Number(tariffRate) || 0)));
}

export function formula_WorkOrderExpenseInput(labor: number, materials: number, tax: number) {
  return round((Number(labor) || 0) + (Number(materials) || 0) + (Number(tax) || 0));
}

export function formula_StatementManagementFee(
  commissionableRentCollected: number,
  feePct: number,
  fixedFeeAmt: number,
  commissionType: string,
) {
  if (commissionType === "FIXED") return Math.max(0, round(Number(fixedFeeAmt) || 0));
  const pct = feePct !== undefined && feePct !== null ? Number(feePct) : 10;
  return Math.max(0, round((Number(commissionableRentCollected) || 0) * (pct / 100)));
}

export function formula_StatementVatOnFee(managementFeeAmt: number, vatRatePct: number, isVatApplicable: boolean) {
  if (isVatApplicable === false) return 0;
  const rate = vatRatePct !== undefined && vatRatePct !== null ? Number(vatRatePct) : 16;
  return Math.max(0, round((Number(managementFeeAmt) || 0) * (rate / 100)));
}

export function formula_StatementGrossCollection(rentCollected: number, deposits: number, otherIncome: number) {
  return round((Number(rentCollected) || 0) + (Number(deposits) || 0) + (Number(otherIncome) || 0));
}

export function formula_StatementNetDueLandlord(
  grossCollection: number,
  managementFee: number,
  vatOnFee: number,
  itemizedDeductionsSum: number,
  paidToLandlordDirectSum: number,
) {
  return round(
    (Number(grossCollection) || 0) -
      (Number(managementFee) || 0) -
      (Number(vatOnFee) || 0) -
      (Number(itemizedDeductionsSum) || 0) -
      (Number(paidToLandlordDirectSum) || 0),
  );
}

/**
 * Receipt waterfall allocation.
 * Rows arrive pre-sorted by priority and each carries `due` (outstanding on an invoice line).
 * The payment is applied top-down: fully clearing the earliest lines before moving on.
 * Returns rows annotated with `paid`, `allocated`, `remaining`, and `invoice_id`/`invoice_number`
 * so callers can persist allocations against specific invoices.
 */
export function formula_ReceiptAutoAllocateWaterfall<
  T extends { due?: number; totalDue?: number; invoiceId?: string; invoiceNumber?: string },
>(
  amount: number,
  rows: T[],
): (T & { paid: number; allocated: number; remaining: number; invoice_id: string; invoice_number: string })[] {
  let left = Math.max(0, round(Number(amount) || 0));
  return rows.map((row) => {
    const due = Math.max(0, round(row.due ?? row.totalDue ?? 0));
    const take = Math.min(left, due);
    left = round(left - take);
    return {
      ...row,
      paid: take,
      allocated: take,
      remaining: round(due - take),
      invoice_id: row.invoiceId ?? "",
      invoice_number: row.invoiceNumber ?? "",
    };
  });
}

/* ── Kenyan payroll engine (PAYRE 2025 bands, SHIF/NSSF/Housing Levy) ─────
 * Logic re-implemented from public KRA/SHA statutory schedules — no GPL/AGPL
 * code copied. Figures are prototype-grade: verify against current Finance
 * Act tables before production use. */

const PAYE_BANDS: Array<[number, number]> = [
  // [upper limit of band (KES), rate]
  [240_000, 0.1],
  [323_000, 0.25],
  [500_000, 0.3],
  [800_000, 0.325],
  [Number.POSITIVE_INFINITY, 0.35],
];

export function formula_PayeMonthly(taxablePay: number): number {
  let tax = 0;
  let prev = 0;
  for (const [upper, rate] of PAYE_BANDS) {
    const span = Math.min(taxablePay, upper) - prev;
    if (span <= 0) break;
    tax += span * rate;
    prev = upper;
  }
  const relief = 2_600; // personal relief
  return Math.max(0, round(tax - relief));
}

/** NSSF Tier I + II (2025 rates: 6% on up to L.70,000 and up to L.360,000). */
export function formula_NssfContribution(gross: number): number {
  // Tier I: 6% on first 70k. Tier II: 6% on earnings above 70k up to the
  // statutory upper qualifying limit of 360k (tier-II span capped at 140k of
  // pensionable earnings per the NSSF Act 2013 regulations as commonly applied).
  const tierI = Math.min(gross, 70_000) * 0.06;
  const tierII = Math.min(Math.max(gross - 70_000, 0), 140_000) * 0.06;
  return round(tierI + tierII);
}

/** SHA/SHIF health insurance levy: 2.75% of gross, floor KES 300. */
export function formula_ShifLevy(gross: number): number {
  return Math.max(round(gross * 0.0275), 300);
}

/** Affordable Housing Levy: 1.5% employee share. */
export function formula_HousingLevy(gross: number): number {
  return round(gross * 0.015);
}

export type PaySlipInput = {
  basic: number;
  houseAllowancePct?: number; // default 15% of basic, capped per common practice
  transportPct?: number; // default 10% of basic
  benefits?: number; // taxable benefits in kind
  pensionPct?: number; // optional additional pension contribution % of gross
  loan?: number; // monthly staff-loan instalment (post-tax)
  method?: "Bank" | "M-Pesa";
};

export function formula_BuildPaySlip(
  emp: { id: string; name: string; role: string; branch: string },
  input: PaySlipInput,
): import("@/lib/types").PaySlip {
  const house = round(input.basic * (input.houseAllowancePct ?? 0.15));
  const transport = round(input.basic * (input.transportPct ?? 0.1));
  const benefits = input.benefits ?? 0;
  const gross = round(input.basic + house + transport + benefits);

  const nssf = formula_NssfContribution(gross);
  const shif = formula_ShifLevy(gross);
  const housing = formula_HousingLevy(gross);
  const pensionExtra = input.pensionPct ? round(gross * input.pensionPct) : 0;

  const taxablePay = round(gross - nssf - shif - pensionExtra);
  const paye = formula_PayeMonthly(taxablePay);

  const deductions = [
    { label: "NSSF (Tier I+II)", amount: nssf },
    { label: "SHIF 2.75%", amount: shif },
    { label: "Housing Levy 1.5%", amount: housing },
    ...(pensionExtra ? [{ label: "Additional pension", amount: pensionExtra }] : []),
    { label: "PAYE", amount: paye },
    ...(input.loan ? [{ label: "Staff loan", amount: input.loan }] : []),
  ];
  const net = round(gross - deductions.reduce((a, d) => a + d.amount, 0));

  return {
    employeeId: emp.id,
    name: emp.name,
    role: emp.role,
    branch: emp.branch,
    gross,
    earnings: [
      { label: "Basic salary", amount: input.basic },
      { label: "House allowance", amount: house },
      { label: "Transport allowance", amount: transport },
      ...(benefits ? [{ label: "Benefits in kind", amount: benefits }] : []),
    ],
    deductions,
    taxablePay,
    paye,
    net,
    method: input.method ?? "Bank",
  };
}
