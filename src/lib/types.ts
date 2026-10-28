export type Landlord = {
  id: string;
  landlordCode: string;
  entityType: string;
  name: string;
  idReg: string;
  kraPin: string;
  postalCode: string;
  phone: string;
  email: string;
  nextOfKinName: string;
  nextOfKinPhone: string;
  nextOfKinRelationship: string;
  remitMethod: string;
  bank: string;
  branch: string;
  accNo: string;
  mpesaPhone: string;
  isActive: boolean;
};

export type Property = {
  id: string;
  code: string;
  landlordId: string;
  name: string;
  lr: string;
  county: string;
  subCounty: string;
  type: string;
  branch: string;
  units: number;
  sqft: number;
  billing: string;
  officer: string;
  caretaker: string;
  caretakerPhone: string;
  parking: number;
  parkingRate: number;
  active: boolean;
};

export type Unit = {
  id: string;
  propertyId: string;
  propertyName: string;
  code: string;
  floor: string;
  config: string;
  plinth: number;
  rent: number;
  sc: number;
  meter: string;
  status: string;
};

export type Mandate = {
  id: string;
  landlordId: string;
  landlordName: string;
  propertyId: string;
  propertyName: string;
  effective: string;
  expiry: string;
  commissionType: string;
  feePct: number;
  feeFixed: number;
  vat: boolean;
  mri: boolean;
  disbursingAccount: string;
  manager: string;
  status: string;
};

export type Tenant = {
  id: string;
  code: string;
  name: string;
  idNo: string;
  phone: string;
  email: string;
  kraPin: string;
  workplace: string;
  emergency: string;
  emergencyPhone: string;
  propertyId: string;
  propertyName: string;
  unitId: string;
  unitCode: string;
  rent: number;
  active: boolean;
};

export type Lease = {
  id: string;
  tenantId: string;
  tenantName: string;
  tenantCode: string;
  unitId: string;
  unitCode: string;
  propertyId: string;
  propertyName: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
  serviceCharge: number;
  depositAmount: number;
  handoverWater: number;
  meterSerial: string;
  status: string;
};

export type Period = {
  id: string;
  month: string;
  year: number;
  label: string;
  status: string;
  openedBy: string;
};

export type Reading = {
  id: string;
  unitId: string;
  unitCode: string;
  propertyName: string;
  meterType: string;
  date: string;
  prev: number;
  curr: number;
  units: number;
  rate: number;
  amount: number;
  billed: boolean;
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  leaseId: string;
  tenantId: string;
  tenantName: string;
  unitCode: string;
  propertyName: string;
  propertyId: string;
  periodMonth: number;
  periodYear: number;
  rent: number;
  serviceCharge: number;
  utilities: number;
  arrears: number;
  totalAmount: number;
  dueDate: string;
  status: string;
};

export type Allocation = { invoice_id: string; invoice_number: string; amount: number };

export type Receipt = {
  id: string;
  number: string;
  tenantId: string;
  tenantCode: string;
  tenantName: string;
  propertyId: string;
  propertyName: string;
  unitCode: string;
  amount: number;
  method: string;
  paybill: string;
  reference: string;
  date: string;
  notes: string;
  allocations: Allocation[];
  issuedBy: string;
};

export type LedgerRow = {
  id: string;
  timestamp: string;
  refNo: string;
  tenantId: string;
  tenantName: string;
  unitCode: string;
  leaseId: string;
  type: string;
  description: string;
  debit: number;
  credit: number;
  balanceAfter: number;
};

export type FiledStatement = {
  id: string;
  landlordId: string;
  landlordName: string;
  propertyId: string;
  propertyName: string;
  periodMonth: number;
  periodYear: number;
  grossRent: number;
  commPct: number;
  commAmount: number;
  vatAmount: number;
  maintenance: number;
  mriTax: number;
  netPayable: number;
  status: string;
};

export type Deposit = {
  id: string;
  tenantId: string;
  tenantName: string;
  tenantCode: string;
  propertyId: string;
  propertyName: string;
  unitCode: string;
  depositType: string;
  payableCode: string;
  amount: number;
  date: string;
  paymentDate: string;
  periodMonth: number;
  periodYear: number;
  receiptNo: string;
  status: string;
};

export type LandlordEntry = {
  id: string;
  propertyId: string;
  propertyName: string;
  landlordId: string;
  landlordName: string;
  entryType: string;
  category: string;
  amount: number;
  periodMonth: number;
  periodYear: number;
  date: string;
  voucherRef: string;
  payee: string;
  payer?: string;
  notes: string;
  status: string;
};

export type Payout = {
  id: string;
  statementId: string;
  propertyId: string;
  propertyName: string;
  landlordId: string;
  landlordName: string;
  periodMonth: number;
  periodYear: number;
  amount: number;
  paymentMethod: string;
  bank: string;
  accountNo: string;
  payoutDate: string;
  status: string;
  batchNo: string;
};

export type Bank = {
  id: string;
  bank_name: string;
  branch_name: string;
  account_no: string;
  swift_code?: string;
  is_active: boolean;
};

export type Paybill = {
  id: string;
  paybill_number: string;
  business_name: string;
  account_prefix?: string;
  bank_account_id?: string;
  is_active: boolean;
};

export type Ticket = {
  id: string;
  number: string;
  propertyId: string;
  propertyName: string;
  unitCode: string;
  title: string;
  detail: string;
  urgency: "Low" | "Normal" | "Urgent";
  reporter: string;
  status: "Open" | "Quoted" | "Approved" | "Done";
  allocation: "Landlord" | "Tenant" | "Service pool";
  estimate: number;
  actual: number;
  vendor: string;
  openedAt: string;
  countedInDeductions: boolean;
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  interest: string;
  propertyName: string;
  stage: "New" | "Viewing" | "Offer" | "Won" | "Lost";
  agent: string;
  budget: number;
  note: string;
};

export type Listing = {
  id: string;
  unitCode: string;
  propertyName: string;
  purpose: string;
  asking: number;
  config: string;
  status: string;
};

export type Appraisal = {
  id: string;
  client: string;
  asset: string;
  purpose: string;
  fee: number;
  status: "Instructed" | "Inspected" | "Draft" | "Certified";
  valuer: string;
  instructedOn: string;
};

export type Staff = {
  id: string;
  name: string;
  role: string;
  branch: string;
  phone: string;
  leaveDays: number;
};

export type Vehicle = {
  id: string;
  plate: string;
  name: string;
  driver: string;
  status: "In yard" | "Out";
  odometer: number;
};

export type Asset = {
  id: string;
  tag: string;
  name: string;
  holder: string;
  branch: string;
  cost: number;
};

export type Booking = {
  id: string;
  room: string;
  title: string;
  when: string;
  host: string;
};

export type DocItem = {
  id: string;
  title: string;
  kind: string;
  ref: string;
  location: string;
};

export type Expense = {
  id: string;
  date: string;
  payee: string;
  category: string;
  amount: number;
  branch: string;
  notes: string;
};

export type Audit = {
  id: string;
  at: string;
  action: string;
  detail: string;
  by: string;
};

export type Company = {
  name: string;
  slogan: string;
  pin: string;
  email: string;
  phone: string;
  paybill: string;
  address: string;
};

export type DueLine = {
  invoiceId: string;
  invoiceNumber: string;
  code: string;
  label: string;
  priority: number;
  due: number;
  period: string;
};
