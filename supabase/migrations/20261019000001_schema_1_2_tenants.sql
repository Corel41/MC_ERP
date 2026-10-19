-- Migration: 20261019000001_schema_1_2_tenants.sql
-- Sub-Module 1.2: Tenants (Leases, Metering, Invoicing, Double-Entry Ledger)

CREATE TABLE IF NOT EXISTS leases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    unit_id UUID NOT NULL REFERENCES property_units(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE,
    rent_amount NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    service_charge NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    deposit_amount NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Active', 'Terminating', 'Expired')) DEFAULT 'Active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_active_unit_lease ON leases (organization_id, unit_id) WHERE (status = 'Active');
CREATE INDEX IF NOT EXISTS idx_leases_org ON leases (organization_id);
CREATE INDEX IF NOT EXISTS idx_leases_org_tenant ON leases (organization_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_leases_org_unit ON leases (organization_id, unit_id);

CREATE TABLE IF NOT EXISTS utility_readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    unit_id UUID NOT NULL REFERENCES property_units(id) ON DELETE CASCADE,
    meter_type VARCHAR(20) NOT NULL CHECK (meter_type IN ('Water', 'Electricity')),
    previous_reading NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    current_reading NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    consumption NUMERIC GENERATED ALWAYS AS (current_reading - previous_reading) STORED,
    tariff_rate NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    reading_date DATE NOT NULL DEFAULT CURRENT_DATE,
    billed_status BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_utility_readings_org ON utility_readings (organization_id);
CREATE INDEX IF NOT EXISTS idx_utility_readings_unit ON utility_readings (organization_id, unit_id);
CREATE INDEX IF NOT EXISTS idx_utility_readings_billed ON utility_readings (organization_id, billed_status);
CREATE INDEX IF NOT EXISTS idx_utility_readings_date ON utility_readings (reading_date);

CREATE TABLE IF NOT EXISTS tenant_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    lease_id UUID NOT NULL REFERENCES leases(id) ON DELETE CASCADE,
    invoice_number VARCHAR(50) NOT NULL,
    period_month INTEGER NOT NULL CHECK (period_month BETWEEN 1 AND 12),
    period_year INTEGER NOT NULL CHECK (period_year >= 2000),
    total_amount NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    due_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Unpaid', 'Partial', 'Paid')) DEFAULT 'Unpaid',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_invoice_org_num UNIQUE (organization_id, invoice_number)
);

CREATE INDEX IF NOT EXISTS idx_tenant_invoices_org ON tenant_invoices (organization_id);
CREATE INDEX IF NOT EXISTS idx_tenant_invoices_lease ON tenant_invoices (organization_id, lease_id);
CREATE INDEX IF NOT EXISTS idx_tenant_invoices_period ON tenant_invoices (organization_id, period_year, period_month);
CREATE INDEX IF NOT EXISTS idx_tenant_invoices_status ON tenant_invoices (organization_id, status);

CREATE TABLE IF NOT EXISTS tenant_invoice_lines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    invoice_id UUID NOT NULL REFERENCES tenant_invoices(id) ON DELETE CASCADE,
    description VARCHAR(255) NOT NULL,
    amount NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tenant_invoice_lines_org ON tenant_invoice_lines (organization_id);
CREATE INDEX IF NOT EXISTS idx_tenant_invoice_lines_inv ON tenant_invoice_lines (invoice_id);

CREATE TABLE IF NOT EXISTS tenant_ledger_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    lease_id UUID REFERENCES leases(id) ON DELETE SET NULL,
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('Invoice', 'Payment', 'Penalty', 'Adjustment')),
    reference_no VARCHAR(100) NOT NULL,
    debit NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    credit NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    balance_after NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tenant_ledger_org ON tenant_ledger_entries (organization_id);
CREATE INDEX IF NOT EXISTS idx_tenant_ledger_tenant ON tenant_ledger_entries (organization_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_tenant_ledger_lease ON tenant_ledger_entries (organization_id, lease_id);
CREATE INDEX IF NOT EXISTS idx_tenant_ledger_created ON tenant_ledger_entries (created_at);
