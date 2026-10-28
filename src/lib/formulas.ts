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
