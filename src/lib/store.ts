import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import {
  formula_BuildPaySlip,
  formula_ReceiptAutoAllocateWaterfall,
  formula_UtilityBillAmountInput,
  formula_UtilityConsumptionInput,
} from "@/lib/formulas";
import { seedData } from "@/lib/seed";
import type {
  Appraisal,
  Asset,
  Employee,
  PayrollRun,
  Audit,
  Bank,
  Booking,
  Company,
  Deposit,
  DocItem,
  Expense,
  FiledStatement,
  Invoice,
  Landlord,
  LandlordEntry,
  Lease,
  LedgerRow,
  Lead,
  Listing,
  Mandate,
  Paybill,
  Period,
  Payout,
  Property,
  Reading,
  Receipt,
  Staff,
  Tenant,
  Ticket,
  Unit,
  Vehicle,
} from "@/lib/types";
import { kes, monthName, nextCode, round, uid } from "@/lib/utils";

export type DataState = {
  company: Company;
  officer: string;
  branch: string;
  theme: "night" | "day";
  tariff: number;

  landlords: Landlord[];
  properties: Property[];
  units: Unit[];
  tenants: Tenant[];
  leases: Lease[];
  mandates: Mandate[];
  periods: Period[];
  readings: Reading[];
  invoices: Invoice[];
  receipts: Receipt[];
  ledger: LedgerRow[];
  deposits: Deposit[];
  otherIncome: LandlordEntry[];
  deductions: LandlordEntry[];
  payouts: Payout[];
  statements: FiledStatement[];
  banks: Bank[];
  paybills: Paybill[];
  tickets: Ticket[];
  leads: Lead[];
  listings: Listing[];
  appraisals: Appraisal[];
  staff: Employee[];
  fleet: Vehicle[];
  assets: Asset[];
  bookings: Booking[];
  documents: DocItem[];
  expenses: Expense[];
  audit: Audit[];
  payrollRuns: PayrollRun[];

  setCompany: (patch: Partial<Company>) => void;
  setOfficer: (name: string) => void;
  setBranch: (branch: string) => void;
  setTheme: (theme: "night" | "day") => void;
  setTariff: (rate: number) => void;

  raiseInvoices: () => void;
  recordReading: (input: { unitId: string; current: number }) => { ok: boolean; reason?: string; amount: number };
  postReceipt: (input: { tenantId: string; amount: number; method: string; reference: string; date: string; notes: string }) => void;
  openTicket: (input: Omit<Ticket, "id" | "number" | "status" | "openedAt" | "actual" | "countedInDeductions">) => void;
  advanceTicket: (id: string) => void;
  addLead: (input: { name: string; phone: string; interest: string; propertyName: string; budget: number }) => void;
  moveLead: (id: string, stage: Lead["stage"]) => void;
  addAppraisal: (input: { client: string; asset: string; purpose: string; fee: number }) => void;
  advanceAppraisal: (id: string) => void;
  addBooking: (input: { room: string; title: string; when: string }) => void;
  addExpense: (input: { payee: string; category: string; amount: number; notes: string }) => void;
  requestLeave: (staffId: string, days: number) => void;
  generatePayrollDraft: (month: number, year: number) => string | null;
  recalculatePayrollDraft: (runId: string) => void;
  postPayrollRun: (runId: string) => void;
  payStaffViaMpesa: (runId: string) => void;
  toggleVehicle: (id: string) => void;
  resetDemo: () => void;
};

const TICKET_FLOW: Ticket["status"][] = ["Open", "Quoted", "Approved", "Done"];
const APPRAISAL_FLOW: Appraisal["status"][] = ["Instructed", "Inspected", "Draft", "Certified"];

function freshSeed(): Omit<DataState, keyof ActionsOnly> {
  // Deep-ish clone so mutations never touch the module-level seed.
  return JSON.parse(JSON.stringify(seedData));
}

type ActionsOnly = Pick<
  DataState,
  | "setCompany" | "setOfficer" | "setBranch" | "setTheme" | "setTariff"
  | "raiseInvoices" | "recordReading" | "postReceipt" | "openTicket" | "advanceTicket"
  | "addLead" | "moveLead" | "addAppraisal" | "advanceAppraisal" | "addBooking"
  | "addExpense" | "requestLeave" | "toggleVehicle" | "resetDemo"
>;

export const useErp = create<DataState>()(
  persist(
    (set, get) => {
      const log = (action: string, detail: string) => {
        const entry: Audit = { id: uid(), at: new Date().toISOString(), action, detail, by: get().officer };
        set((s) => ({ audit: [entry, ...s.audit].slice(0, 200) }));
      };

      return {
        ...freshSeed(),
        officer: "Achieng' Odhiambo",
        branch: "all",
        theme: "night",
        tariff: 450,

        setCompany: (patch) => set((s) => ({ company: { ...s.company, ...patch } })),
        setOfficer: (name) => set({ officer: name }),
        setBranch: (branch) => set({ branch }),
        setTheme: (theme) => set({ theme }),
        setTariff: (rate) => set({ tariff: Math.max(0, round(rate)) }),

        raiseInvoices: () => {
          const s = get();
          const period = s.periods.find((p) => p.status === "Open");
          if (!period) {
            toast.error("No open billing period");
            return;
          }
          const month = Number(period.month) || (["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].indexOf(period.month) + 1);
          const existing = new Set(s.invoices.filter((i) => i.periodMonth === month && i.periodYear === period.year).map((i) => i.leaseId));
          const toRaise = s.leases.filter((l) => l.status === "Active" && !existing.has(l.id));
          if (!toRaise.length) {
            toast.message(`Already billed for ${period.label}`);
            return;
          }
          let seq = Number(nextCode(s.invoices.map((i) => i.invoiceNumber), "INV-2026-", 4).slice(-4));
          const newInvoices: Invoice[] = [];
          const newLedger: LedgerRow[] = [];
          for (const lease of toRaise) {
            const lastRead = s.readings.filter((r) => r.unitId === lease.unitId).sort((a, b) => b.date.localeCompare(a.date))[0];
            const util = lastRead ? lastRead.amount : 0;
            const total = round(lease.rentAmount + lease.serviceCharge + util);
            const invoiceNumber = `INV-${period.year}-${String(seq++).padStart(4, "0")}`;
            const inv: Invoice = {
              id: uid(),
              invoiceNumber,
              leaseId: lease.id,
              tenantId: lease.tenantId,
              tenantName: lease.tenantName,
              unitCode: lease.unitCode,
              propertyName: lease.propertyName,
              propertyId: lease.propertyId,
              periodMonth: month,
              periodYear: period.year,
              rent: lease.rentAmount,
              serviceCharge: lease.serviceCharge,
              utilities: util,
              arrears: 0,
              totalAmount: total,
              dueDate: `${period.year}-${String(month).padStart(2, "0")}-05`,
              status: "Unpaid",
            };
            newInvoices.push(inv);
            newLedger.push({
              id: uid(),
              timestamp: new Date().toISOString(),
              refNo: invoiceNumber,
              tenantId: lease.tenantId,
              tenantName: lease.tenantName,
              unitCode: lease.unitCode,
              leaseId: lease.id,
              type: "Invoice",
              description: `${monthName(month)} bill`,
              debit: total,
              credit: 0,
              balanceAfter: 0,
            });
          }
          set((st) => ({ invoices: [...st.invoices, ...newInvoices], ledger: [...st.ledger, ...newLedger] }));
          log("Billing run", `${newInvoices.length} invoices raised for ${period.label}`);
          toast.success(`${newInvoices.length} invoices raised for ${period.label}`);
        },

        recordReading: ({ unitId, current }) => {
          const s = get();
          const unit = s.units.find((u) => u.id === unitId);
          if (!unit) return { ok: false, reason: "Unit not found", amount: 0 };
          const last = s.readings.filter((r) => r.unitId === unitId).sort((a, b) => b.date.localeCompare(a.date))[0];
          const prev = last ? last.curr : 0;
          const consumption = formula_UtilityConsumptionInput(prev, current);
          if (Number(current) < prev) {
            return { ok: false, reason: `Reading is below the last one (${prev})`, amount: 0 };
          }
          const amount = formula_UtilityBillAmountInput(consumption, s.tariff);
          const reading: Reading = {
            id: uid(),
            unitId,
            unitCode: unit.code,
            propertyName: unit.propertyName,
            meterType: "Water",
            date: new Date().toISOString().slice(0, 10),
            prev,
            curr: Number(current) || 0,
            units: consumption,
            rate: s.tariff,
            amount,
            billed: false,
          };
          set((st) => ({ readings: [...st.readings, reading] }));
          log("Meter reading", `${unit.code}: ${consumption} m³ · ${kes(amount)}`);
          return { ok: true, amount };
        },

        postReceipt: ({ tenantId, amount, method, reference, date, notes }) => {
          const s = get();
          const tenant = s.tenants.find((t) => t.id === tenantId);
          if (!tenant || amount <= 0) return;
          const paidByInvoice = new Map<string, number>();
          for (const r of s.receipts) for (const a of r.allocations) paidByInvoice.set(a.invoice_id, (paidByInvoice.get(a.invoice_id) || 0) + a.amount);
          const lines = s.invoices
            .filter((i) => i.tenantId === tenantId)
            .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
            .flatMap((inv, index) => {
              const left = Math.max(0, round(inv.totalAmount - (paidByInvoice.get(inv.id) || 0)));
              if (left <= 0.5) return [];
              return [{ code: "001", label: `${monthName(inv.periodMonth)} ${inv.periodYear} balance`, priority: index * 100, due: left, invoiceId: inv.id, invoiceNumber: inv.invoiceNumber }];
            });
          const rows = formula_ReceiptAutoAllocateWaterfall(amount, lines.sort((a, b) => a.priority - b.priority)).filter((r) => r.paid > 0);
          const allocations = rows.map((r) => ({ invoice_id: r.invoice_id, invoice_number: r.invoice_number, amount: r.paid }));
          const receipt: Receipt = {
            id: uid(),
            number: nextCode(s.receipts.map((r) => r.number), "MCR-", 5),
            tenantId,
            tenantCode: tenant.code,
            tenantName: tenant.name,
            propertyId: tenant.propertyId,
            propertyName: tenant.propertyName,
            unitCode: tenant.unitCode,
            amount: round(amount),
            method,
            paybill: s.company.paybill,
            reference,
            date,
            notes,
            allocations,
            issuedBy: s.officer,
          };
          const ledgerRow: LedgerRow = {
            id: uid(),
            timestamp: new Date().toISOString(),
            refNo: receipt.number,
            tenantId,
            tenantName: tenant.name,
            unitCode: tenant.unitCode,
            leaseId: tenant.unitId,
            type: "Receipt",
            description: `Payment via ${method}`,
            debit: 0,
            credit: receipt.amount,
            balanceAfter: 0,
          };
          const touched = new Set(allocations.map((a) => a.invoice_id));
          set((st) => ({
            receipts: [...st.receipts, receipt],
            ledger: [...st.ledger, ledgerRow],
            invoices: st.invoices.map((inv) => {
              if (!touched.has(inv.id)) return inv;
              const paid = st.receipts.filter((r) => r.allocations.some((a) => a.invoice_id === inv.id)).reduce((x, r) => x + r.allocations.filter((a) => a.invoice_id === inv.id).reduce((y, a) => y + a.amount, 0), 0) + (allocations.filter((a) => a.invoice_id === inv.id).reduce((y, a) => y + a.amount, 0));
              const status = paid >= inv.totalAmount - 0.5 ? "Paid" : paid > 0.5 ? "Partial" : "Unpaid";
              return { ...inv, status };
            }),
          }));
          log("Receipt", `${receipt.number} · ${kes(receipt.amount)} · ${tenant.name}`);
          toast.success(`Receipt ${receipt.number} issued`);
        },

        openTicket: (input) => {
          const s = get();
          const ticket: Ticket = {
            ...input,
            id: uid(),
            number: nextCode(s.tickets.map((t) => t.number), "WO-", 4),
            status: "Open",
            actual: 0,
            countedInDeductions: false,
            openedAt: new Date().toISOString(),
          };
          set((st) => ({ tickets: [ticket, ...st.tickets] }));
          log("Ticket opened", `${ticket.number} ${ticket.title}`);
        },

        advanceTicket: (id) => {
          set((st) => ({
            tickets: st.tickets.map((t) => {
              if (t.id !== id) return t;
              const idx = TICKET_FLOW.indexOf(t.status);
              const next = TICKET_FLOW[Math.min(idx + 1, TICKET_FLOW.length - 1)];
              return { ...t, status: next, actual: next === "Done" && !t.actual ? t.estimate : t.actual };
            }),
          }));
          log("Ticket advanced", id);
        },

        addLead: (input) => {
          const s = get();
          const lead: Lead = { id: uid(), ...input, stage: "New", agent: s.officer, note: "" };
          set((st) => ({ leads: [lead, ...st.leads] }));
          log("Lead added", lead.name);
        },

        moveLead: (id, stage) => {
          set((st) => ({ leads: st.leads.map((l) => (l.id === id ? { ...l, stage } : l)) }));
          log("Lead moved", `${id} → ${stage}`);
        },

        addAppraisal: (input) => {
          const s = get();
          const appraisal: Appraisal = {
            id: uid(),
            ...input,
            fee: round(input.fee),
            status: "Instructed",
            valuer: s.officer,
            instructedOn: new Date().toISOString().slice(0, 10),
          };
          set((st) => ({ appraisals: [appraisal, ...st.appraisals] }));
          log("Appraisal instructed", appraisal.asset);
        },

        advanceAppraisal: (id) => {
          set((st) => ({
            appraisals: st.appraisals.map((a) => {
              if (a.id !== id) return a;
              const idx = APPRAISAL_FLOW.indexOf(a.status);
              return { ...a, status: APPRAISAL_FLOW[Math.min(idx + 1, APPRAISAL_FLOW.length - 1)] };
            }),
          }));
          log("Appraisal advanced", id);
        },

        addBooking: (input) => {
          const s = get();
          const booking: Booking = { id: uid(), ...input, host: s.officer };
          set((st) => ({ bookings: [...st.bookings, booking] }));
          log("Room booked", `${booking.room}: ${booking.title}`);
        },

        addExpense: (input) => {
          const s = get();
          const expense: Expense = {
            id: uid(),
            date: new Date().toISOString().slice(0, 10),
            payee: input.payee,
            category: input.category,
            amount: round(input.amount),
            branch: s.branch === "all" ? s.company.address.includes("Thika Road") ? "Nairobi Head Office" : s.branch : s.branch,
            notes: input.notes,
          };
          set((st) => ({ expenses: [expense, ...st.expenses] }));
          log("Expense posted", `${expense.payee} · ${kes(expense.amount)}`);
        },

        requestLeave: (staffId, days) => {
          set((st) => ({ staff: st.staff.map((p) => (p.id === staffId ? { ...p, leaveDays: Math.max(0, p.leaveDays - days) } : p)) }));
          log("Leave approved", `${days} days for ${get().staff.find((p) => p.id === staffId)?.name || staffId}`);
        },

        toggleVehicle: (id) => {
          set((st) => ({ fleet: st.fleet.map((v) => (v.id === id ? { ...v, status: v.status === "Out" ? "In yard" : "Out" } : v)) }));
          log("Vehicle status", id);
        },

        generatePayrollDraft: (month, year) => {
          const st = get();
          const existing = st.payrollRuns.find((r) => r.month === month && r.year === year);
          if (existing) {
            if (existing.status === "Posted") {
              toast.error(`Payroll for ${monthName(month)} ${year} is already posted`);
              return null;
            }
            toast(`Draft for ${monthName(month)} ${year} already exists — opening it`, { description: "Recalculate replaces the current draft." });
            return existing.id;
          }
          const slips = st.staff.map((emp) =>
            formula_BuildPaySlip(emp, {
              basic: emp.basicSalary,
              method: emp.mpesaPaybill ? "M-Pesa" : "Bank",
            }),
          );
          const totals = slips.reduce(
            (acc, sl) => ({
              gross: acc.gross + sl.gross,
              paye: acc.paye + sl.paye,
              nhif: acc.nhif + (sl.deductions.find((d) => d.label.startsWith("SHIF"))?.amount || 0),
              nssf: acc.nssf + (sl.deductions.find((d) => d.label.startsWith("NSSF"))?.amount || 0),
              halp: acc.halp + (sl.deductions.find((d) => d.label.startsWith("Housing"))?.amount || 0),
              net: acc.net + sl.net,
            }),
            { gross: 0, paye: 0, nhif: 0, nssf: 0, halp: 0, net: 0 },
          );
          const run: PayrollRun = {
            id: uid(),
            number: `PR-${year}-${String(month).padStart(2, "0")}`,
            month,
            year,
            status: "Draft",
            preparedBy: st.officer,
            slips,
            totals,
          };
          set((s) => ({ payrollRuns: [run, ...s.payrollRuns] }));
          log("Payroll drafted", `${run.number} · ${slips.length} staff · net ${kes(totals.net)}`);
          return run.id;
        },
        recalculatePayrollDraft: (runId) => {
          const run = get().payrollRuns.find((r) => r.id === runId);
          if (!run || run.status !== "Draft") return;
          const slips = get().staff.map((emp) =>
            formula_BuildPaySlip(emp, { basic: emp.basicSalary, method: emp.mpesaPaybill ? "M-Pesa" : "Bank" }),
          );
          const totals = slips.reduce(
            (acc, sl) => ({
              gross: acc.gross + sl.gross,
              paye: acc.paye + sl.paye,
              nhif: acc.nhif + (sl.deductions.find((d) => d.label.startsWith("SHIF"))?.amount || 0),
              nssf: acc.nssf + (sl.deductions.find((d) => d.label.startsWith("NSSF"))?.amount || 0),
              halp: acc.halp + (sl.deductions.find((d) => d.label.startsWith("Housing"))?.amount || 0),
              net: acc.net + sl.net,
            }),
            { gross: 0, paye: 0, nhif: 0, nssf: 0, halp: 0, net: 0 },
          );
          set((s) => ({ payrollRuns: s.payrollRuns.map((r) => (r.id === runId ? { ...r, slips, totals } : r)) }));
          log("Payroll recalculated", run.number);
        },
        postPayrollRun: (runId) => {
          const run = get().payrollRuns.find((r) => r.id === runId);
          if (!run || run.status !== "Draft") return;
          const date = new Date(run.year, run.month - 1, 28).toISOString().slice(0, 10);
          const rows: Expense[] = [
            { id: uid(), date, payee: "KRA — PAYE", category: "Payroll statutory", amount: run.totals.paye, branch: get().branch === "all" ? "Nairobi Head Office" : get().branch, notes: `${run.number} PAYE payable` },
            { id: uid(), date, payee: "NSSF", category: "Payroll statutory", amount: run.totals.nssf * 2, branch: get().branch === "all" ? "Nairobi Head Office" : get().branch, notes: `${run.number} NSSF employer+employee` },
            { id: uid(), date, payee: "SHA / SHIF", category: "Payroll statutory", amount: run.totals.nhif * 2, branch: get().branch === "all" ? "Nairobi Head Office" : get().branch, notes: `${run.number} SHIF employer+employee` },
            { id: uid(), date, payee: "National Housing Corp", category: "Payroll statutory", amount: run.totals.halp * 2, branch: get().branch === "all" ? "Nairobi Head Office" : get().branch, notes: `${run.number} Housing levy employer+employee` },
            { id: uid(), date, payee: "Staff salaries", category: "Payroll net pay", amount: run.totals.net, branch: get().branch === "all" ? "Nairobi Head Office" : get().branch, notes: `${run.number} net pay disbursement` },
          ];
          set((s) => ({
            expenses: [...rows, ...s.expenses],
            payrollRuns: s.payrollRuns.map((r) => (r.id === runId ? { ...r, status: "Posted", postedAt: new Date().toISOString(), paymentRef: `BATCH-${monthName(r.month).toUpperCase().slice(0, 3)}-${r.year}-PAY` } : r)),
          }));
          log("Payroll posted", `${run.number} · gross ${kes(run.totals.gross)} · net ${kes(run.totals.net)} · statutory booked to expenses`);
        },
        payStaffViaMpesa: (runId) => {
          const run = get().payrollRuns.find((r) => r.id === runId);
          if (!run) return;
          const mobileStaff = run.slips.filter((sl) => sl.method === "M-Pesa");
          if (!mobileStaff.length) {
            toast.error("No M-Pesa staff in this run");
            return;
          }
          const total = mobileStaff.reduce((a, s) => a + s.net, 0);
          toast.success(`Disbursement queued: ${mobileStaff.length} staff via paybill ${get().company.paybill} · ${kes(total)}`);
          log("M-Pesa payroll batch", `${run.number}: ${mobileStaff.length} recipients · ${kes(total)} (Daraja batch simulation)`);
        },

        resetDemo: () => {
          const keep = { theme: get().theme, officer: get().officer, branch: get().branch, tariff: get().tariff };
          set({ ...freshSeed(), ...keep });
          toast.message("Showcase data restored");
        },
      };
    },
    {
      name: "mc-erp-store",
      version: 1,
      partialize: (s) => Object.fromEntries(Object.entries(s).filter(([, v]) => typeof v !== "function")) as DataState,
    },
  ),
);
