import type {
  Appraisal,
  Asset,
  Audit,
  Bank,
  Booking,
  Company,
  Deposit,
  DocItem,
  Expense,
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
  Tenant,
  Ticket,
  Unit,
  Vehicle,
  Employee,
  PayrollRun,
} from "@/lib/types";
import { formula_BuildPaySlip } from "@/lib/formulas";

export const seedCompany: Company = {
  name: "Metrocosmo Ltd",
  slogan: "Property management, done properly",
  pin: "P0512345678A",
  email: "books@metrocosmo.co.ke",
  phone: "+254 700 123 456",
  paybill: "4001234",
  address: "Mirage Court, Thika Road, Nairobi",
};

const landlords: Landlord[] = [
  { id: "ll-1", landlordCode: "LL001", entityType: "Company", name: "Kamau Holdings Ltd", idReg: "CPK-2019-001", kraPin: "P0011112223", postalCode: "00606", phone: "+254722000111", email: "finance@kamauholdings.co.ke", nextOfKinName: "J. Kamau", nextOfKinPhone: "+254722000112", nextOfKinRelationship: "Director", remitMethod: "Bank", bank: "Equity Bank", branch: "Thika Road", accNo: "0123456789", mpesaPhone: "", isActive: true },
  { id: "ll-2", landlordCode: "LL002", entityType: "Individual", name: "Wanjiru Njeri", idReg: "", kraPin: "P0022223334", postalCode: "00100", phone: "+254733000222", email: "wanjiru@example.com", nextOfKinName: "Peter Njeri", nextOfKinPhone: "+254733000223", nextOfKinRelationship: "Spouse", remitMethod: "M-Pesa", bank: "", branch: "", accNo: "", mpesaPhone: "+254733000222", isActive: true },
  { id: "ll-3", landlordCode: "LL003", entityType: "Company", name: "Coastal Estates Ltd", idReg: "CPK-2017-884", kraPin: "P0033334445", postalCode: "80100", phone: "+254744000333", email: "rents@coastalestates.co.ke", nextOfKinName: "A. Mwinyi", nextOfKinPhone: "+254744000334", nextOfKinRelationship: "Director", remitMethod: "Bank", bank: "KCB", branch: "Mombasa", accNo: "9876543210", mpesaPhone: "", isActive: true },
];

const properties: Property[] = [
  { id: "p-1", code: "PROP001", landlordId: "ll-1", name: "Rift View Apartments", lr: "LR 209/111", county: "Nairobi", subCounty: "Dagoretti", type: "RESIDENTIAL", branch: "Nairobi Head Office", units: 12, sqft: 14000, billing: "Monthly", officer: "Achieng' O.", caretaker: "Otieno B.", caretakerPhone: "+254711000001", parking: 6, parkingRate: 1500, active: true },
  { id: "p-2", code: "PROP002", landlordId: "ll-2", name: "Wanjiru Chambers", lr: "LR NWIII/45", county: "Nairobi", subCounty: "Westlands", type: "COMMERCIAL", branch: "Westlands", units: 6, sqft: 9200, billing: "Monthly", officer: "Kiptoo S.", caretaker: "", caretakerPhone: "", parking: 10, parkingRate: 3000, active: true },
  { id: "p-3", code: "PROP003", landlordId: "ll-3", name: "Nyali Heights", lr: "KILIFI/MOMBASA/2210", county: "Mombasa", subCounty: "Mvita", type: "RESIDENTIAL", branch: "Mombasa Coastal", units: 8, sqft: 10400, billing: "Monthly", officer: "Achieng' O.", caretaker: "Salim H.", caretakerPhone: "+254711000002", parking: 4, parkingRate: 1000, active: true },
  { id: "p-4", code: "PROP004", landlordId: "ll-1", name: "Thika Mills Offices", lr: "THR/AG/98", county: "Kiambu", subCounty: "Thika", type: "COMMERCIAL", branch: "Thika", units: 4, sqft: 6800, billing: "Monthly", officer: "Kiptoo S.", caretaker: "Njoroge W.", caretakerPhone: "+254711000003", parking: 8, parkingRate: 2000, active: true },
];

function mkUnits(propId: string, propName: string, configs: string[], rent: number, sc: number): Unit[] {
  return configs.map((config, i) => ({
    id: `${propId}-u${i + 1}`,
    propertyId: propId,
    propertyName: propName,
    code: `${propName.split(" ").map((w) => w[0]).join("").toUpperCase()}-${String(i + 1).padStart(2, "0")}`,
    floor: String(Math.floor(i / 4) + 1),
    config,
    plinth: 55 + i * 6,
    rent,
    sc,
    meter: `WM-${propId.slice(-1)}${String(i + 1).padStart(3, "0")}`,
    status: i % 5 === 4 ? "VACANT" : "OCCUPIED",
  }));
}

const units: Unit[] = [
  ...mkUnits("p-1", "Rift View", ["1BED", "2BED", "Bedsitter", "2BED", "1BED", "Studio", "Bedsitter", "2BED", "1BED", "Studio", "Bedsitter", "2BED"], 22000, 2000),
  ...mkUnits("p-2", "Wanjiru Chambers", ["Office A", "Office B", "Shop", "Office C", "Studio Suite", "Office D"], 85000, 8000),
  ...mkUnits("p-3", "Nyali Heights", ["2BED Ocean", "3BED Ocean", "1BED", "2BED Ocean", "Studio", "1BED", "2BED Ocean", "3BED Ocean"], 32000, 2500),
  ...mkUnits("p-4", "Thika Mills", ["Open Plan", "Suite 1", "Suite 2", "Warehouse"], 60000, 5000),
];

const tenants: Tenant[] = [];
const leases: Lease[] = [];
units.forEach((u, idx) => {
  if (u.status !== "OCCUPIED") return;
  const names = ["Mwangi Trust", "Bright Star Schools", "Juma & Sons", "Ada Wambui", "Ken Ops Ltd", "Felix Otieno", "Zawadi Ltd", "Hassan Ali", "Grace Njeri", "Urban Eats", "Peter Kamau", "Lena Muthoni", "Savanna Tech", "Mary Wahu", "Green Leaf Ltd", "Sam Kariuki", "Aisha Noor", "Delight Interiors", "Tom Muriuki", "Rose Adhiambo", "Crest Media", "Ibrahim Farah", "Njeri Waithaka", "Paul Mutiso", "Serene Spa", "Joseph Gitau"];
  const name = names[idx % names.length];
  const t: Tenant = {
    id: `t-${u.id}`,
    code: `TNT${String(tenants.length + 1).padStart(3, "0")}`,
    name,
    idNo: `${1000000 + idx * 7331}`,
    phone: `+2547${String(10000000 + idx * 111111).slice(0, 8)}`,
    email: `${name.toLowerCase().replace(/[^a-z]+/g, ".")}@example.com`,
    kraPin: idx % 3 === 0 ? `P05${String(1000000 + idx).slice(0, 7)}A` : "",
    workplace: idx % 2 ? "Self-employed" : "Corporate",
    emergency: "Next of kin on file",
    emergencyPhone: `+2547${String(20000000 + idx * 101010).slice(0, 8)}`,
    propertyId: u.propertyId,
    propertyName: u.propertyName,
    unitId: u.id,
    unitCode: u.code,
    rent: u.rent,
    active: true,
  };
  tenants.push(t);
  leases.push({
    id: `l-${u.id}`,
    tenantId: t.id,
    tenantName: t.name,
    tenantCode: t.code,
    unitId: u.id,
    unitCode: u.code,
    propertyId: u.propertyId,
    propertyName: u.propertyName,
    startDate: "2025-01-01",
    endDate: idx % 4 === 0 ? "2026-12-31" : idx % 4 === 1 ? "2026-11-30" : idx % 4 === 2 ? "2027-03-31" : "2026-12-01",
    rentAmount: u.rent,
    serviceCharge: u.sc,
    depositAmount: u.rent,
    handoverWater: 10 + (idx % 5),
    meterSerial: u.meter,
    status: "Active",
  });
});

const mandates: Mandate[] = [
  { id: "m-1", landlordId: "ll-1", landlordName: "Kamau Holdings Ltd", propertyId: "p-1", propertyName: "Rift View Apartments", effective: "2024-01-01", expiry: "2027-12-31", commissionType: "PERCENTAGE", feePct: 8, feeFixed: 0, vat: true, mri: true, disbursingAccount: "Equity 0123456789", manager: "Achieng' O.", status: "Active" },
  { id: "m-2", landlordId: "ll-2", landlordName: "Wanjiru Njeri", propertyId: "p-2", propertyName: "Wanjiru Chambers", effective: "2024-06-01", expiry: "2026-05-31", commissionType: "PERCENTAGE", feePct: 10, feeFixed: 0, vat: true, mri: false, disbursingAccount: "M-Pesa", manager: "Kiptoo S.", status: "Active" },
  { id: "m-3", landlordId: "ll-3", landlordName: "Coastal Estates Ltd", propertyId: "p-3", propertyName: "Nyali Heights", effective: "2023-09-01", expiry: "2026-08-31", commissionType: "FIXED", feePct: 0, feeFixed: 45000, vat: false, mri: true, disbursingAccount: "KCB 9876543210", manager: "Achieng' O.", status: "Active" },
  { id: "m-4", landlordId: "ll-1", landlordName: "Kamau Holdings Ltd", propertyId: "p-4", propertyName: "Thika Mills Offices", effective: "2025-01-01", expiry: "2027-12-31", commissionType: "PERCENTAGE", feePct: 8, feeFixed: 0, vat: true, mri: false, disbursingAccount: "Equity 0123456789", manager: "Kiptoo S.", status: "Active" },
];

const periods: Period[] = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((month, i) => ({
  id: `per-2026-${i + 5}`,
  month,
  year: 2026,
  label: `${month} 2026`,
  status: month === "Oct" ? "Open" : "Closed",
  openedBy: "System",
}));

const readings: Reading[] = units.map((u, i) => {
  const prev = 10 + (i % 5) + 3 * 4;
  return {
    id: `rd-${u.id}`,
    unitId: u.id,
    unitCode: u.code,
    propertyName: u.propertyName,
    meterType: "Water",
    date: "2026-09-28",
    prev: prev - 4,
    curr: prev,
    units: 4,
    rate: 450,
    amount: 1800,
    billed: true,
  };
});

// Invoices: every lease gets May–Sep billed & mostly paid; Oct billed with some arrears.
const invoices: Invoice[] = [];
let invSeq = 1;
for (const lease of leases) {
  for (const [mi, month] of [5, 6, 7, 8, 9, 10].entries()) {
    const unit = units.find((u) => u.id === lease.unitId)!;
    const util = mi % 2 === 0 ? 1800 : 2100;
    const total = lease.rentAmount + lease.serviceCharge + util;
    const overdueTenant = Boolean(lease.tenantId) && tenants.some((t) => t.id === lease.tenantId) && lease.tenantCode.endsWith("3");
    const unpaidOct = month === 10 && overdueTenant;
    const invoiceNumber = `INV-2026-${String(invSeq).padStart(4, "0")}`;
    invoices.push({
      id: `inv-${invSeq}`,
      invoiceNumber,
      leaseId: lease.id,
      tenantId: lease.tenantId,
      tenantName: lease.tenantName,
      unitCode: lease.unitCode,
      propertyName: lease.propertyName,
      propertyId: lease.propertyId,
      periodMonth: month,
      periodYear: 2026,
      rent: lease.rentAmount,
      serviceCharge: lease.serviceCharge,
      utilities: util,
      arrears: 0,
      totalAmount: total,
      dueDate: `2026-${String(month).padStart(2, "0")}-05`,
      status: unpaidOct ? "Unpaid" : "Paid",
    });
    invSeq++;
  }
}

const receipts: Receipt[] = [];
const ledger: LedgerRow[] = [];
let rcSeq = 1;
let balSeq = 1;
for (const inv of invoices) {
  if (inv.status !== "Paid") continue;
  const rcp: Receipt = {
    id: `rc-${rcSeq}`,
    number: `MCR-${String(rcSeq).padStart(5, "0")}`,
    tenantId: inv.tenantId,
    tenantCode: tenants.find((t) => t.id === inv.tenantId)?.code || "",
    tenantName: inv.tenantName,
    propertyId: inv.propertyId,
    propertyName: inv.propertyName,
    unitCode: inv.unitCode,
    amount: inv.totalAmount,
    method: rcSeq % 3 === 0 ? "Bank" : "M-Pesa",
    paybill: "4001234",
    reference: `QGS${7000000000 + rcSeq * 13}`,
    date: `2026-${String(inv.periodMonth).padStart(2, "0")}-0${(rcSeq % 5) + 3}`,
    notes: "",
    allocations: [{ invoice_id: inv.id, invoice_number: inv.invoiceNumber, amount: inv.totalAmount }],
    issuedBy: "System",
  };
  receipts.push(rcp);
  ledger.push({ id: `led-d-${balSeq++}`, timestamp: `${inv.dueDate}T09:00:00+03:00`, refNo: inv.invoiceNumber, tenantId: inv.tenantId, tenantName: inv.tenantName, unitCode: inv.unitCode, leaseId: inv.leaseId, type: "Invoice", description: `${["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"][inv.periodMonth]} bill`, debit: inv.totalAmount, credit: 0, balanceAfter: 0 });
  ledger.push({ id: `led-c-${balSeq++}`, timestamp: `${rcp.date}T10:30:00+03:00`, refNo: rcp.number, tenantId: rcp.tenantId, tenantName: rcp.tenantName, unitCode: rcp.unitCode, leaseId: inv.leaseId, type: "Receipt", description: "Payment received", debit: 0, credit: rcp.amount, balanceAfter: 0 });
  rcSeq++;
}
// running balances per tenant
{
  const bals = new Map<string, number>();
  for (const row of ledger) {
    const b = (bals.get(row.tenantId) || 0) + row.debit - row.credit;
    bals.set(row.tenantId, b);
    row.balanceAfter = b;
  }
}

const deposits: Deposit[] = leases.slice(0, 8).map((l, i) => ({
  id: `dep-${i + 1}`,
  tenantId: l.tenantId,
  tenantName: l.tenantName,
  tenantCode: l.tenantCode,
  propertyId: l.propertyId,
  propertyName: l.propertyName,
  unitCode: l.unitCode,
  depositType: "Security",
  payableCode: "DEP",
  amount: l.depositAmount,
  date: "2025-01-05",
  paymentDate: "2025-01-05",
  periodMonth: 1,
  periodYear: 2025,
  receiptNo: `MCR-00${i + 1}`,
  status: "Held",
}));

const otherIncome: LandlordEntry[] = [
  { id: "oi-1", propertyId: "p-1", propertyName: "Rift View Apartments", landlordId: "ll-1", landlordName: "Kamau Holdings Ltd", entryType: "Income", category: "Parking", amount: 18000, periodMonth: 10, periodYear: 2026, date: "2026-10-12", voucherRef: "VC-1001", payee: "", payer: "Tenants", notes: "Parking bays", status: "Posted" },
  { id: "oi-2", propertyId: "p-2", propertyName: "Wanjiru Chambers", landlordId: "ll-2", landlordName: "Wanjiru Njeri", entryType: "Income", category: "Generator recovery", amount: 42000, periodMonth: 10, periodYear: 2026, date: "2026-10-15", voucherRef: "VC-1002", payee: "", payer: "Tenants", notes: "Fuel recovery", status: "Posted" },
];

const deductions: LandlordEntry[] = [
  { id: "dd-1", propertyId: "p-1", propertyName: "Rift View Apartments", landlordId: "ll-1", landlordName: "Kamau Holdings Ltd", entryType: "Deduction", category: "Maintenance", amount: 35000, periodMonth: 10, periodYear: 2026, date: "2026-10-08", voucherRef: "VC-2001", payee: "Umoja Plumbing", payer: "", notes: "Main line repair", status: "Posted" },
  { id: "dd-2", propertyId: "p-3", propertyName: "Nyali Heights", landlordId: "ll-3", landlordName: "Coastal Estates Ltd", entryType: "Deduction", category: "Security", amount: 22000, periodMonth: 10, periodYear: 2026, date: "2026-10-03", voucherRef: "VC-2002", payee: "KK Security", payer: "", notes: "October patrol", status: "Posted" },
];

const payouts: Payout[] = [
  { id: "po-1", statementId: "st-1", propertyId: "p-1", propertyName: "Rift View Apartments", landlordId: "ll-1", landlordName: "Kamau Holdings Ltd", periodMonth: 9, periodYear: 2026, amount: 214000, paymentMethod: "Bank", bank: "Equity Bank", accountNo: "0123456789", payoutDate: "2026-10-10", status: "Paid", batchNo: "BATCH-SEP-01" },
  { id: "po-2", statementId: "st-2", propertyId: "p-3", propertyName: "Nyali Heights", landlordId: "ll-3", landlordName: "Coastal Estates Ltd", periodMonth: 9, periodYear: 2026, amount: 158000, paymentMethod: "Bank", bank: "KCB", accountNo: "9876543210", payoutDate: "2026-10-11", status: "Paid", batchNo: "BATCH-SEP-01" },
];

const banks: Bank[] = [
  { id: "bk-1", bank_name: "Equity Bank", branch_name: "Thika Road", account_no: "0123456789", swift_code: "EQBLKENA", is_active: true },
  { id: "bk-2", bank_name: "KCB", branch_name: "Mombasa", account_no: "9876543210", is_active: true },
];

const paybills: Paybill[] = [
  { id: "pb-1", paybill_number: "4001234", business_name: "Metrocosmo Ltd", account_prefix: "MC", is_active: true },
];

const tickets: Ticket[] = [
  { id: "tk-1", number: "WO-0142", propertyId: "p-1", propertyName: "Rift View Apartments", unitCode: "RV-02", title: "Kitchen sink leak", detail: "Tenant reports slow drain and damp cabinet.", urgency: "Normal", reporter: "Ada Wambui", status: "Quoted", allocation: "Landlord", estimate: 12000, actual: 0, vendor: "Umoja Plumbing", openedAt: "2026-10-21T08:00:00+03:00", countedInDeductions: false },
  { id: "tk-2", number: "WO-0143", propertyId: "p-3", propertyName: "Nyali Heights", unitCode: "NH-04", title: "Gate motor fault", detail: "Boom gate stuck in open position.", urgency: "Urgent", reporter: "Salim H.", status: "Open", allocation: "Landlord", estimate: 45000, actual: 0, vendor: "AutoGate EA", openedAt: "2026-10-26T14:00:00+03:00", countedInDeductions: false },
  { id: "tk-3", number: "WO-0141", propertyId: "p-2", propertyName: "Wanjiru Chambers", unitCode: "WC-01", title: "AC service", detail: "Annual servicing for suite AC units.", urgency: "Low", reporter: "Facilities", status: "Done", allocation: "Service pool", estimate: 30000, actual: 28500, vendor: "CoolAir Ltd", openedAt: "2026-09-14T09:00:00+03:00", countedInDeductions: true },
];

const leads: Lead[] = [
  { id: "ld-1", name: "Njeri Construction", phone: "+254700111222", interest: "Office space", propertyName: "Wanjiru Chambers", stage: "Viewing", agent: "Kiptoo S.", budget: 90000, note: "Needs two adjoining suites" },
  { id: "ld-2", name: "Coastal Vacations", phone: "+254700333444", interest: "Serviced apartments", propertyName: "Nyali Heights", stage: "New", agent: "Achieng' O.", budget: 35000, note: "Short let partner enquiry" },
  { id: "ld-3", name: "D. Okoth", phone: "+254700555666", interest: "Two bedroom", propertyName: "Rift View Apartments", stage: "Offer", agent: "Achieng' O.", budget: 22000, note: "Move-in December" },
];

const listings: Listing[] = [
  { id: "ls-1", unitCode: "RV-10", propertyName: "Rift View Apartments", purpose: "Rent", asking: 22000, config: "Studio", status: "Listed" },
  { id: "ls-2", unitCode: "NH-05", propertyName: "Nyali Heights", purpose: "Rent", asking: 32000, config: "Studio", status: "Listed" },
  { id: "ls-3", unitCode: "TM-04", propertyName: "Thika Mills", purpose: "Rent", asking: 60000, config: "Warehouse", status: "Under offer" },
];

const appraisals: Appraisal[] = [
  { id: "ap-1", client: "Stanbic Bank", asset: "Commercial plot, Karen", purpose: "Mortgage security", fee: 85000, status: "Inspected", valuer: "Kiptoo S.", instructedOn: "2026-10-06" },
  { id: "ap-2", client: "Private buyer", asset: "Nyali apartment block", purpose: "Market value", fee: 120000, status: "Instructed", valuer: "Achieng' O.", instructedOn: "2026-10-22" },
];

const staff: Employee[] = [
  { id: "st-1", name: "Achieng' Odhiambo", role: "Portfolio manager", branch: "Nairobi Head Office", phone: "+254711222333", leaveDays: 14, basicSalary: 145000, payePin: "A012345678P", nssfNo: "N-5510233", shifNo: "SH-8890122", bankId: "bk-1", startedOn: "2022-03-01" },
  { id: "st-2", name: "Kiptoo Sang", role: "Senior property officer", branch: "Westlands", phone: "+254711444555", leaveDays: 9, basicSalary: 98000, payePin: "A098765432P", nssfNo: "N-5540112", shifNo: "SH-8871043", bankId: "bk-1", startedOn: "2023-01-15" },
  { id: "st-3", name: "Njoroge Waweru", role: "Caretaker", branch: "Thika", phone: "+254711666777", leaveDays: 21, basicSalary: 32000, payePin: "A055512345P", nssfNo: "N-5599210", shifNo: "SH-8812005", mpesaPaybill: "4001234", startedOn: "2021-08-02" },
  { id: "st-4", name: "Salim Hassan", role: "Caretaker", branch: "Mombasa Coastal", phone: "+254711888999", leaveDays: 12, basicSalary: 35000, payePin: "A066678901P", nssfNo: "N-5601337", shifNo: "SH-8823119", mpesaPaybill: "4001234", startedOn: "2020-11-09" },
];

const fleet: Vehicle[] = [
  { id: "vh-1", plate: "KDG 123A", name: "Toyota Hiace", driver: "Njoroge Waweru", status: "Out", odometer: 88210 },
  { id: "vh-2", plate: "KCX 456B", name: "Nissan Navara", driver: "Salim Hassan", status: "In yard", odometer: 122400 },
];

const assets: Asset[] = [
  { id: "as-1", tag: "FA-001", name: "Ride-on mower", holder: "Thika depot", branch: "Thika", cost: 240000 },
  { id: "as-2", tag: "FA-002", name: "Pressure washer", holder: "Kiptoo Sang", branch: "Westlands", cost: 38000 },
];

const bookings: Booking[] = [
  { id: "bk-1", room: "Boardroom — Mirage", title: "Landlord review — Q3", when: "Tue 29 Oct · 09:00", host: "Achieng' O." },
  { id: "bk-2", room: "Client lounge", title: "Viewing — Nyali enquirer", when: "Thu 31 Oct · 14:00", host: "Achieng' O." },
];

const documents: DocItem[] = [
  { id: "dc-1", title: "Deeds — Rift View (6)", kind: "Title deed", ref: "TD/RV/01-06", location: "Strongroom A" },
  { id: "dc-2", title: "Mandate — Kamau Holdings", kind: "Contract", ref: "MG/KH/2024", location: "Cabinet 2, drawer 1" },
  { id: "dc-3", title: "Fire certificate — Chambers", kind: "Compliance", ref: "FC/WC/2026", location: "Digital only" },
];

const expenses: Expense[] = [
  { id: "ex-1", date: "2026-10-04", payee: "Kenya Power", category: "Utilities", amount: 21400, branch: "Nairobi Head Office", notes: "Common areas" },
  { id: "ex-2", date: "2026-10-18", payee: "Vista Printers", category: "Printing", amount: 6800, branch: "Westlands", notes: "Demand letters" },
];

const audit: Audit[] = [
  { id: "au-1", at: "2026-10-26T14:02:00+03:00", action: "Ticket opened", detail: "WO-0143 Gate motor fault", by: "Salim Hassan" },
  { id: "au-2", at: "2026-10-25T09:11:00+03:00", action: "Payout posted", detail: "September remittance — Nyali", by: "Achieng' O." },
];


/* Reference posted run generated with the same statutory engine the UI uses,
   so draft-vs-posted figures always agree. Kept in seed (not computed at
   runtime) to stay deterministic and cheap on hydration. */
function buildPayrollRun(month: number, year: number, id: string, number: string, status: "Draft" | "Posted"): PayrollRun {
  const slips = staff.map((emp) =>
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
  return {
    id,
    number,
    month,
    year,
    status,
    preparedBy: "Finance Officer",
    slips,
    totals,
    ...(status === "Posted" ? { postedAt: `${year}-${String(month).padStart(2, "0")}-28T10:00:00+03:00`, paymentRef: `BATCH-${["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][month]}-${year}-PAY` } : {}),
  };
}

const payrollRuns: PayrollRun[] = [buildPayrollRun(9, 2026, "pr-9", "PR-2026-09", "Posted")];

export const seedData = {
  company: seedCompany,
  landlords,
  properties,
  units,
  tenants,
  leases,
  mandates,
  periods,
  readings,
  invoices,
  receipts,
  ledger,
  deposits,
  otherIncome,
  deductions,
  payouts,
  banks,
  paybills,
  tickets,
  leads,
  listings,
  appraisals,
  staff,
  fleet,
  assets,
  bookings,
  documents,
  expenses,
  audit,
  payrollRuns,
  statements: [] as import("@/lib/types").FiledStatement[],
};

export type SeedData = typeof seedData;
