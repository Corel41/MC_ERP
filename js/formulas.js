/**
 * js/formulas.js — Comprehensive Procedure-Level Formula Registry
 * Metrocosmo ERP
 *
 * Every single data input, billing procedure, cashier waterfall step,
 * ledger transaction, and landlord statement calculation has its own
 * strictly isolated, pure formula function in window.MC_FORMULAS.
 */

(function(root) {
  'use strict';

  const MC_FORMULAS = {
    // -------------------------------------------------------------------------
    // A. Property & Unit Inputs
    // -------------------------------------------------------------------------
    formula_PropertyPayableRateInput: function(baseRent, ratePct, isPercentage, fixedAmt) {
      if (Boolean(isPercentage)) {
        const rent = Number(baseRent) || 0;
        const pct = Number(ratePct) || 0;
        return Math.round((rent * (pct / 100)) * 100) / 100;
      }
      return Math.round((Number(fixedAmt) || 0) * 100) / 100;
    },

    formula_UnitBaselineTotalInput: function(baselineRent, serviceCharge, extraAmt) {
      const r = Number(baselineRent) || 0;
      const s = Number(serviceCharge) || 0;
      const e = Number(extraAmt) || 0;
      return Math.round((r + s + e) * 100) / 100;
    },

    // -------------------------------------------------------------------------
    // B. Lease & Onboarding Inputs
    // -------------------------------------------------------------------------
    formula_LeaseInitialObligationInput: function(rentAmt, serviceCharge, rentDeposit, waterDeposit, elecDeposit) {
      const r = Number(rentAmt) || 0;
      const sc = Number(serviceCharge) || 0;
      const rd = Number(rentDeposit) || 0;
      const wd = Number(waterDeposit) || 0;
      const ed = Number(elecDeposit) || 0;
      return Math.round((r + sc + rd + wd + ed) * 100) / 100;
    },

    // -------------------------------------------------------------------------
    // C. Utility Meter Reading Inputs
    // -------------------------------------------------------------------------
    formula_UtilityConsumptionInput: function(previousReading, currentReading) {
      const prev = Number(previousReading) || 0;
      const curr = Number(currentReading) || 0;
      return Math.max(0, Math.round((curr - prev) * 100) / 100);
    },

    formula_UtilityBillAmountInput: function(consumptionUnits, tariffRate) {
      const units = Number(consumptionUnits) || 0;
      const tariff = Number(tariffRate) || 0;
      return Math.round((units * tariff) * 100) / 100;
    },

    // -------------------------------------------------------------------------
    // D. Tenant Invoicing Procedures (Single, Bulk, Arrears, Roll-Over)
    // -------------------------------------------------------------------------
    formula_SingleTenantLineInput: function(defaultAmt, manualInputAmt, isSelected) {
      if (!isSelected) return 0;
      if (manualInputAmt !== undefined && manualInputAmt !== null && manualInputAmt !== '' && !isNaN(Number(manualInputAmt))) {
        return Math.round(Number(manualInputAmt) * 100) / 100;
      }
      return Math.round((Number(defaultAmt) || 0) * 100) / 100;
    },

    formula_SingleTenantInvoiceTotal: function(selectedLinesArray) {
      if (!Array.isArray(selectedLinesArray)) return 0;
      const total = selectedLinesArray.reduce((sum, line) => {
        const val = typeof line === 'number' ? line : (line ? (Number(line.amount) || 0) : 0);
        return sum + val;
      }, 0);
      return Math.round(total * 100) / 100;
    },

    formula_BulkTenantRowInput: function(unitBaselineAmt, manualOverrideAmt, isRowChecked) {
      if (!isRowChecked) return 0;
      if (manualOverrideAmt !== undefined && manualOverrideAmt !== null && manualOverrideAmt !== '' && !isNaN(Number(manualOverrideAmt))) {
        return Math.round(Number(manualOverrideAmt) * 100) / 100;
      }
      return Math.round((Number(unitBaselineAmt) || 0) * 100) / 100;
    },

    formula_ArrearsMigrationInput: function(openingArrearAmt, arrearBilledInput, isRowChecked) {
      if (!isRowChecked) return 0;
      if (arrearBilledInput !== undefined && arrearBilledInput !== null && arrearBilledInput !== '' && !isNaN(Number(arrearBilledInput))) {
        return Math.round(Number(arrearBilledInput) * 100) / 100;
      }
      return Math.round((Number(openingArrearAmt) || 0) * 100) / 100;
    },

    formula_PeriodRollOverRecurringBill: function(leaseRent, leaseServiceCharge, unbilledUtilitiesSum) {
      const r = Number(leaseRent) || 0;
      const sc = Number(leaseServiceCharge) || 0;
      const u = Number(unbilledUtilitiesSum) || 0;
      return Math.round((r + sc + u) * 100) / 100;
    },

    // -------------------------------------------------------------------------
    // E. Cashier Receipting & Real-Time Clearance Procedures
    // -------------------------------------------------------------------------
    formula_ReceiptPayableRemainingDue: function(payableTotalBilled, payableTotalAlreadyPaid) {
      const billed = Number(payableTotalBilled) || 0;
      const paid = Number(payableTotalAlreadyPaid) || 0;
      return Math.max(0, Math.round((billed - paid) * 100) / 100);
    },

    formula_ReceiptAutoAllocateWaterfall: function(paymentReceivedInput, payableRowsArray) {
      const totalReceived = Math.max(0, Number(paymentReceivedInput) || 0);
      let remainingFunds = totalReceived;
      const rows = (payableRowsArray || []).map(r => ({ ...r, allocated: 0 }));

      // Sort by priority if present, lowest priority number first
      const sortedIndices = rows.map((r, i) => ({ r, i }))
        .sort((a, b) => {
          const prioA = a.r.priority !== undefined ? Number(a.r.priority) : 10;
          const prioB = b.r.priority !== undefined ? Number(b.r.priority) : 10;
          return prioA - prioB;
        });

      sortedIndices.forEach(({ r, i }) => {
        const billed = r.totalDue !== undefined ? Number(r.totalDue) : (Number(r.amount) || Number(r.monthly) || 0);
        const alreadyPaid = Number(r.paid) || Number(r.alreadyPaid) || 0;
        const due = Math.max(0, billed - alreadyPaid);

        const alloc = Math.min(remainingFunds, due);
        rows[i].allocated = Math.round(alloc * 100) / 100;
        remainingFunds = Math.round((remainingFunds - alloc) * 100) / 100;
      });

      // Route any excess remainder to primary Rent payable
      if (remainingFunds > 0) {
        let rentRow = rows.find(r => r.code === '001' || r.payable_code === '001' || (r.description && /rent/i.test(r.description)) || (r.item && /rent/i.test(r.item)));
        if (!rentRow && rows.length > 0) {
          rentRow = rows[0];
        }
        if (rentRow) {
          rentRow.allocated = Math.round((rentRow.allocated + remainingFunds) * 100) / 100;
          rentRow.overpayment = remainingFunds;
        }
      }

      return {
        allocatedRows: rows,
        unallocatedRemainder: Math.max(0, remainingFunds),
        totalAllocated: totalReceived
      };
    },

    formula_ReceiptManualCellInput: function(totalBillDueForCell, manualAllocatedInput) {
      const due = Math.max(0, Number(totalBillDueForCell) || 0);
      const alloc = Math.max(0, Number(manualAllocatedInput) || 0);
      const remainingUnpaidOnLine = Math.max(0, Math.round((due - alloc) * 100) / 100);
      const lineOverpayment = Math.max(0, Math.round((alloc - due) * 100) / 100);
      return {
        allocated: alloc,
        remainingUnpaidOnLine: remainingUnpaidOnLine,
        lineOverpayment: lineOverpayment
      };
    },

    formula_ReceiptHeaderSummaryPill: function(invoiceTotalDue, paymentReceivedInput, sumOfAllocatedCells) {
      const invoiceTotal = Math.max(0, Number(invoiceTotalDue) || 0);
      const paymentReceived = Math.max(0, Number(paymentReceivedInput) || 0);
      const sumOfAllocated = Math.max(0, Number(sumOfAllocatedCells) || 0);

      const unallocatedDiff = Math.round((paymentReceived - sumOfAllocated) * 100) / 100;
      const outstandingArrears = Math.max(0, Math.round((invoiceTotal - paymentReceived) * 100) / 100);
      const totalOverpayment = Math.max(0, Math.round((paymentReceived - invoiceTotal) * 100) / 100);
      const isBalanced = Math.abs(unallocatedDiff) < 0.01;

      return {
        invoiceTotal: invoiceTotal,
        paymentReceived: paymentReceived,
        unallocatedDiff: unallocatedDiff,
        outstandingArrears: outstandingArrears,
        totalOverpayment: totalOverpayment,
        isBalanced: isBalanced
      };
    },

    formula_ReceiptSettlementLineClearance: function(existingLineBilled, existingLinePaid, newAllocationAmt) {
      const billed = Math.max(0, Number(existingLineBilled) || 0);
      const priorPaid = Math.max(0, Number(existingLinePaid) || 0);
      const newAlloc = Math.max(0, Number(newAllocationAmt) || 0);

      const updatedPaid = Math.round((priorPaid + newAlloc) * 100) / 100;
      const updatedBalanceDue = Math.max(0, Math.round((billed - updatedPaid) * 100) / 100);
      const isFullyPaid = updatedBalanceDue <= 0.001;

      return {
        updatedPaid: updatedPaid,
        updatedBalanceDue: updatedBalanceDue,
        isFullyPaid: isFullyPaid
      };
    },

    // -------------------------------------------------------------------------
    // F. Tenant Ledger Procedures
    // -------------------------------------------------------------------------
    formula_LedgerDebitEntryInput: function(previousRunningBalance, newInvoiceDebitAmt) {
      const bal = Number(previousRunningBalance) || 0;
      const debit = Number(newInvoiceDebitAmt) || 0;
      return Math.round((bal + debit) * 100) / 100;
    },

    formula_LedgerCreditSettlementClearance: function(previousRunningBalance, paymentCreditAmt) {
      const bal = Number(previousRunningBalance) || 0;
      const credit = Number(paymentCreditAmt) || 0;
      return Math.round((bal - credit) * 100) / 100;
    },

    formula_InvoiceStatusToggleClearance: function(invoiceTotalAmt, currentPaidAmt, targetStatus) {
      const total = Math.max(0, Number(invoiceTotalAmt) || 0);
      const currentPaid = Math.max(0, Number(currentPaidAmt) || 0);
      const isPaidTarget = (targetStatus === 'Paid' || targetStatus === true);

      if (isPaidTarget) {
        return {
          amount_paid: total,
          balance_due: 0.00,
          status: 'Paid',
          ledgerDelta: Math.round(-(total - currentPaid) * 100) / 100
        };
      } else {
        return {
          amount_paid: 0.00,
          balance_due: total,
          status: 'Unpaid',
          ledgerDelta: Math.round(currentPaid * 100) / 100
        };
      }
    },

    // -------------------------------------------------------------------------
    // G. Repairs, Landlord Inputs & Statement Procedures
    // -------------------------------------------------------------------------
    formula_WorkOrderExpenseInput: function(laborCostInput, materialsCostInput, taxAmtInput) {
      const labor = Number(laborCostInput) || 0;
      const mat = Number(materialsCostInput) || 0;
      const tax = Number(taxAmtInput) || 0;
      return Math.round((labor + mat + tax) * 100) / 100;
    },

    formula_LandlordManualDeductionInput: function(deductionAmtInput) {
      return Math.max(0, Math.round((Number(deductionAmtInput) || 0) * 100) / 100);
    },

    formula_LandlordOtherIncomeInput: function(incomeAmtInput) {
      return Math.max(0, Math.round((Number(incomeAmtInput) || 0) * 100) / 100);
    },

    formula_StatementUnitOpeningArrears: function(priorPayableBilledSum, priorPayablePaidSum) {
      const billed = Number(priorPayableBilledSum) || 0;
      const paid = Number(priorPayablePaidSum) || 0;
      return Math.max(0, Math.round((billed - paid) * 100) / 100);
    },

    formula_StatementUnitTotalExpected: function(openingArrears, currentMonthlyBill) {
      const arrears = Number(openingArrears) || 0;
      const bill = Number(currentMonthlyBill) || 0;
      return Math.round((arrears + bill) * 100) / 100;
    },

    formula_StatementUnitClosingBalance: function(totalExpected, currentMonthPaid) {
      const expected = Number(totalExpected) || 0;
      const paid = Number(currentMonthPaid) || 0;
      return Math.max(0, Math.round((expected - paid) * 100) / 100);
    },

    formula_StatementDepositRowInclusion: function(depositAmt, isAgentHoldFlag) {
      if (Boolean(isAgentHoldFlag) === true) return 0;
      return Math.max(0, Math.round((Number(depositAmt) || 0) * 100) / 100);
    },

    formula_StatementGrossCollection: function(rentCollectedByAgency, nonAgentHeldDepositsSum, otherIncomeSum) {
      const rent = Number(rentCollectedByAgency) || 0;
      const deps = Number(nonAgentHeldDepositsSum) || 0;
      const inc = Number(otherIncomeSum) || 0;
      return Math.round((rent + deps + inc) * 100) / 100;
    },

    formula_StatementManagementFee: function(commissionableRentCollected, feePct, fixedFeeAmt, commissionType) {
      if (commissionType === 'FIXED') {
        return Math.max(0, Math.round((Number(fixedFeeAmt) || 0) * 100) / 100);
      }
      const rent = Number(commissionableRentCollected) || 0;
      const pct = (feePct !== undefined && feePct !== null) ? Number(feePct) : 10;
      return Math.max(0, Math.round((rent * (pct / 100)) * 100) / 100);
    },

    formula_StatementVatOnFee: function(managementFeeAmt, vatRatePct, isVatApplicable) {
      if (isVatApplicable === false) return 0;
      const fee = Number(managementFeeAmt) || 0;
      const rate = (vatRatePct !== undefined && vatRatePct !== null) ? Number(vatRatePct) : 16;
      return Math.max(0, Math.round((fee * (rate / 100)) * 100) / 100);
    },

    formula_StatementNetDueLandlord: function(grossCollection, managementFee, vatOnFee, itemizedDeductionsSum, paidToLandlordDirectSum) {
      const gross = Number(grossCollection) || 0;
      const fee = Number(managementFee) || 0;
      const vat = Number(vatOnFee) || 0;
      const deds = Number(itemizedDeductionsSum) || 0;
      const direct = Number(paidToLandlordDirectSum) || 0;
      return Math.round((gross - fee - vat - deds - direct) * 100) / 100;
    }
  };

  // Attach to window and export globally
  if (typeof window !== 'undefined') {
    window.MC_FORMULAS = MC_FORMULAS;
    Object.keys(MC_FORMULAS).forEach(name => {
      window[name] = MC_FORMULAS[name];
    });
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MC_FORMULAS;
  }
})(typeof window !== 'undefined' ? window : global);
