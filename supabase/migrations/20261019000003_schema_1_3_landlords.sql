-- Migration: 20261019000003_schema_1_3_landlords.sql
-- Sub-Module 1.3: Landlords (Statements, Commission Calculators, Tax Deductions, Remittance Payouts)

-- 1. landlord_statements
CREATE TABLE IF NOT EXISTS landlord_statements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    landlord_id UUID NOT NULL REFERENCES landlords(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    statement_month INTEGER NOT NULL CHECK (statement_month BETWEEN 1 AND 12),
    statement_year INTEGER NOT NULL CHECK (statement_year >= 2000),
    gross_rent_collected NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    agency_commission_amount NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    agency_vat_amount NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    maintenance_deductions NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    mri_withholding_tax NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    net_payable NUMERIC GENERATED ALWAYS AS (gross_rent_collected - agency_commission_amount - agency_vat_amount - maintenance_deductions - mri_withholding_tax) STORED,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Draft', 'Approved', 'Paid')) DEFAULT 'Draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_statement_org_ll_prop_period UNIQUE (organization_id, landlord_id, property_id, statement_year, statement_month)
);

CREATE INDEX IF NOT EXISTS idx_landlord_statements_org ON landlord_statements (organization_id);
CREATE INDEX IF NOT EXISTS idx_landlord_statements_ll ON landlord_statements (organization_id, landlord_id);
CREATE INDEX IF NOT EXISTS idx_landlord_statements_prop ON landlord_statements (organization_id, property_id);
CREATE INDEX IF NOT EXISTS idx_landlord_statements_period ON landlord_statements (organization_id, statement_year, statement_month);
CREATE INDEX IF NOT EXISTS idx_landlord_statements_status ON landlord_statements (organization_id, status);

-- 2. landlord_remittance_payouts
CREATE TABLE IF NOT EXISTS landlord_remittance_payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    statement_id UUID NOT NULL REFERENCES landlord_statements(id) ON DELETE CASCADE,
    payout_method VARCHAR(30) NOT NULL CHECK (payout_method IN ('Bank Transfer', 'M-Pesa B2C', 'Cheque')),
    reference_number VARCHAR(100) NOT NULL,
    amount_paid NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    payout_date DATE NOT NULL DEFAULT CURRENT_DATE,
    processed_by UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_landlord_payouts_org ON landlord_remittance_payouts (organization_id);
CREATE INDEX IF NOT EXISTS idx_landlord_payouts_statement ON landlord_remittance_payouts (organization_id, statement_id);

-- 3. Row-Level Security (RLS) & Multi-Tenant Isolation Policies
ALTER TABLE landlord_statements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Tenant Isolation Policy" ON landlord_statements;
CREATE POLICY "Tenant Isolation Policy" ON landlord_statements
    AS PERMISSIVE FOR ALL
    TO authenticated
    USING (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)
    WITH CHECK (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid);

ALTER TABLE landlord_remittance_payouts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Tenant Isolation Policy" ON landlord_remittance_payouts;
CREATE POLICY "Tenant Isolation Policy" ON landlord_remittance_payouts
    AS PERMISSIVE FOR ALL
    TO authenticated
    USING (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)
    WITH CHECK (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid);
