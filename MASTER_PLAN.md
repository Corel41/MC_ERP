# MC ERP — Living Master Plan

## MC ERP Architecture Tree:
├── 01. Estate Management
│   ├── 1.1 Registration (Properties, Units, Landlords, Tenants)
│   ├── 1.2 Tenants (Leases, Metering, Rent & Service Charge Ledgers)
│   ├── 1.3 Landlords (Mandates, Commissions, Tax, Remittances)
│   ├── 1.4 Repairs & Maintenance (Requests, Work Orders, LPOs, 3-Way Allocations)
│   └── 1.5 Admin (Billing Periods, Tariffs, Notice Templates, Audit Logs)
├── 02. Agency CRM
├── 03. Valuation
├── 04. Administration
├── 05. Finance
├── 06. Workplace Operations
└── 07. Settings

---

## 1. Executive Summary & Core Objective
MC ERP is the consolidated next-generation enterprise property management and financial operational system for Metrocosmo Ltd. It replaces legacy monolithic web forms with a modern, high-performance web interface adhering to multi-branch operational workflows, Kenyan statutory tax compliance (7.5% MRI, 16% agency VAT), automated utility sub-meter billing, and automated M-Pesa C2B Paybill reconciliation.

---

## 2. Module Specifications & Scopes

### 01. Estate Management (Active Core)
* **1.1 Registration**:
  - Property Onboarding: Title Deeds, LR Numbers, Branch Ownership, Land Rate & Rent Tracking.
  - Unit Inventory: Floor plans, unit types (Commercial, Residential, Industrial), baseline rent, service charge allocations.
  - Landlord & Tenant Entity Registry: KRA PINs, National IDs, contact dossiers, next of kin, emergency contacts.
* **1.2 Tenants**:
  - Lease Lifecycle: Execution dates, expiry, automatic escalation clauses, single active lease exclusion enforcement.
  - Billing Engine: Automated 1st-of-month invoicing for rent, service charges, and parking fees.
  - Utility Sub-Metering: Previous vs current meter readings, automated volume consumption, tariff calculation.
  - Payments & Receipts: M-Pesa C2B Paybill instant reconciliation, bank deposits, tenant statement ledgers.
* **1.3 Landlords**:
  - Management Mandates: Agreed agency commission percentages (e.g., 5% to 10%), fee structures.
  - Tax Withholding Engine: Residential Monthly Rental Income (MRI) tax withholding at 7.5%, 16% VAT on agency commission.
  - Remittances & Payouts: Rent collection minus commission, VAT, repairs, and withholding tax; electronic landlord disbursement statements.
* **1.4 Repairs & Maintenance**:
  - Incident Ticketing: Tenant and caretaker maintenance requests, urgency flags, photographic evidence.
  - Work Orders & LPO: Vendor bidding, Local Purchase Orders (LPO), quotes, executive authorization gates.
  - 3-Way Cost Allocation: Direct landlord offset vs tenant damage recovery vs common service charge pool.
* **1.5 Admin**:
  - Global Billing Cycles: Batch period generation, late penalty interest policies.
  - Utility Tariff Management: Per-property water tariff rates per m³, sewage multipliers.
  - Notice Templates & Communication: Eviction warnings, rent escalation letters, automated SMS broadcasts.
  - Audit Logs: Immutable tracking of all database inserts, updates, reversals, and user access records.

### 02. Agency CRM
- Property Listings: Sale and lease agency listings, marketing syndication.
- Lead Pipeline: Inquiries, site viewing scheduling, KYC documentation.
- Commission Tracking: Agent commissions, splits, and closure milestones.

### 03. Valuation
- Appraisal Requests: Asset valuation instructions from financial institutions and private clients.
- Field Inspection Records: Comparable sales data, GPS coordinates, structural condition assessments.
- Valuation Reports & Certification: Valuation certificates, statutory review, sign-off registers.

### 04. Administration
- Human Resources: Staff registry, leave tracking, role clearances.
- Fleet & Logistics: Company vehicle checkouts, mileage tracking, fuel consumption.
- Asset Inventory: Office furniture, computing hardware, service maintenance contracts.

### 05. Finance
- Multi-Branch General Ledger: Double-entry debit/credit ledger, branch-partitioned journals.
- Accounts Payable & Receivable: Operating expense vouchers, vendor billing, invoice settlement.
- Financial Statements: Trial balance, profit & loss statement, balance sheet, bank reconciliation.

### 06. Workplace Operations
- Facility Management: Headquarters and branch office utilities, facility upkeep.
- Boardroom & Resource Booking: Meeting schedules, client hosting registers.
- Document Archive: Physical and digital archive tracking with barcode indexing.

### 07. Settings
- Multi-Theme Engine: Frosted Iridescent (Flowly), Cobalt Bloom (Windows 11), Modern SaaS Iris (Hireism), and Obsidian & Emerald Executive.
- Multi-Branch Hierarchy: Nairobi Head Office, Thika Branch, Westlands Branch, Mombasa Coastal Branch.
- Integration Gateways: Safaricom Daraja M-Pesa C2B, KRA eTIMS, MobileSasa SMS Gateway, Google Drive Cloud Storage.
