-- Migration: 20261019000013_tenant_invoicing_and_periods.sql
-- Sub-Module: Accounting Periods Roll-Over & Tenant Invoicing Engine
-- Aligned with ProMatrix Master Architecture (image_731002.png, image_7310dc.png, image_7362b5.png, image_7366d4.png)

-- 1. Create accounting_periods table
CREATE TABLE IF NOT EXISTS accounting_periods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    period_no INTEGER,
    period_month VARCHAR(20) NOT NULL,
    period_year INTEGER NOT NULL,
    description VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'Open', -- 'Open' or 'Closed'
    opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    closed_at TIMESTAMPTZ,
    opened_by VARCHAR(100) DEFAULT 'DEAN',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Expand tenant_invoices table to support ProMatrix Single, Bulk, and Arrears Invoicing
CREATE TABLE IF NOT EXISTS tenant_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Drop legacy restrictions if table already existed
ALTER TABLE tenant_invoices DROP CONSTRAINT IF EXISTS tenant_invoices_period_month_check;
ALTER TABLE tenant_invoices DROP CONSTRAINT IF EXISTS uq_invoice_org_num;

-- Add ProMatrix Invoicing columns
ALTER TABLE tenant_invoices
    ADD COLUMN IF NOT EXISTS tenant_id UUID,
    ADD COLUMN IF NOT EXISTS property_id UUID,
    ADD COLUMN IF NOT EXISTS unit_id UUID,
    ADD COLUMN IF NOT EXISTS tenant_code VARCHAR(50),
    ADD COLUMN IF NOT EXISTS tenant_name VARCHAR(255),
    ADD COLUMN IF NOT EXISTS unit_code VARCHAR(50),
    ADD COLUMN IF NOT EXISTS property_name VARCHAR(255),
    ADD COLUMN IF NOT EXISTS payable_code VARCHAR(50),
    ADD COLUMN IF NOT EXISTS description VARCHAR(255),
    ADD COLUMN IF NOT EXISTS amount NUMERIC(14,2) DEFAULT 0.00,
    ADD COLUMN IF NOT EXISTS billing_type VARCHAR(50) DEFAULT 'Single', -- 'Single', 'Bulk', 'Arrears'
    ADD COLUMN IF NOT EXISTS period_month VARCHAR(20),
    ADD COLUMN IF NOT EXISTS period_year INTEGER,
    ADD COLUMN IF NOT EXISTS is_paid BOOLEAN DEFAULT false;

-- Allow legacy columns to be nullable for direct single/bulk invoicing
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tenant_invoices' AND column_name='lease_id') THEN
        ALTER TABLE tenant_invoices ALTER COLUMN lease_id DROP NOT NULL;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tenant_invoices' AND column_name='invoice_number') THEN
        ALTER TABLE tenant_invoices ALTER COLUMN invoice_number DROP NOT NULL;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tenant_invoices' AND column_name='due_date') THEN
        ALTER TABLE tenant_invoices ALTER COLUMN due_date DROP NOT NULL;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tenant_invoices' AND column_name='period_month') THEN
        ALTER TABLE tenant_invoices ALTER COLUMN period_month TYPE VARCHAR(20) USING period_month::text;
    END IF;
END $$;

-- Enable Row Level Security (RLS)
ALTER TABLE accounting_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_invoices ENABLE ROW LEVEL SECURITY;

-- 3. Multi-Tenant RLS Policies for accounting_periods
DROP POLICY IF EXISTS "accounting_periods_auth_policy" ON accounting_periods;
CREATE POLICY "accounting_periods_auth_policy" ON accounting_periods
    AS PERMISSIVE FOR ALL
    TO authenticated
    USING (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)
    WITH CHECK (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid);

DROP POLICY IF EXISTS "accounting_periods_anon_select" ON accounting_periods;
CREATE POLICY "accounting_periods_anon_select" ON accounting_periods
    FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "accounting_periods_anon_all" ON accounting_periods;
CREATE POLICY "accounting_periods_anon_all" ON accounting_periods
    FOR ALL TO anon USING (true) WITH CHECK (true);

-- 4. Multi-Tenant RLS Policies for tenant_invoices
DROP POLICY IF EXISTS "tenant_invoices_auth_policy" ON tenant_invoices;
CREATE POLICY "tenant_invoices_auth_policy" ON tenant_invoices
    AS PERMISSIVE FOR ALL
    TO authenticated
    USING (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)
    WITH CHECK (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid);

DROP POLICY IF EXISTS "tenant_invoices_anon_select" ON tenant_invoices;
CREATE POLICY "tenant_invoices_anon_select" ON tenant_invoices
    FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "tenant_invoices_anon_all" ON tenant_invoices;
CREATE POLICY "tenant_invoices_anon_all" ON tenant_invoices
    FOR ALL TO anon USING (true) WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_accounting_periods_org ON accounting_periods (organization_id, status);
CREATE INDEX IF NOT EXISTS idx_tenant_invoices_org ON tenant_invoices (organization_id);
CREATE INDEX IF NOT EXISTS idx_tenant_invoices_billing_type ON tenant_invoices (organization_id, billing_type);
CREATE INDEX IF NOT EXISTS idx_tenant_invoices_tenant ON tenant_invoices (tenant_id);

-- 5. Seed Historical Transaction Periods from ProMatrix Reference (image_7366d4.png)
INSERT INTO accounting_periods (id, organization_id, period_no, period_month, period_year, description, status, opened_at, closed_at, opened_by)
VALUES
    ('00000000-0000-0000-0000-000000000146', '00000000-0000-0000-0000-000000000001', 46, '10', 2026, 'October', 'Open', '2026-10-07 14:22:22.397+00', NULL, 'DEAN'),
    ('00000000-0000-0000-0000-000000000145', '00000000-0000-0000-0000-000000000001', 45, '9', 2026, 'September', 'Closed', '2026-09-01 08:38:40.140+00', '2026-10-07 14:22:22.397+00', 'DEAN'),
    ('00000000-0000-0000-0000-000000000144', '00000000-0000-0000-0000-000000000001', 44, '8', 2026, 'August', 'Closed', '2026-08-01 09:05:43.580+00', '2026-09-01 08:38:40.140+00', 'DEAN'),
    ('00000000-0000-0000-0000-000000000143', '00000000-0000-0000-0000-000000000001', 43, '7', 2026, 'July', 'Closed', '2026-07-01 08:07:07.233+00', '2026-08-01 09:05:43.580+00', 'DEAN'),
    ('00000000-0000-0000-0000-000000000142', '00000000-0000-0000-0000-000000000001', 42, '6', 2026, 'June', 'Closed', '2026-05-31 14:07:24.597+00', '2026-07-01 08:07:07.233+00', 'DEAN'),
    ('00000000-0000-0000-0000-000000000141', '00000000-0000-0000-0000-000000000001', 41, '5', 2026, 'May', 'Closed', '2026-05-02 09:11:23.670+00', '2026-05-31 14:07:24.597+00', 'DEAN'),
    ('00000000-0000-0000-0000-000000000140', '00000000-0000-0000-0000-000000000001', 40, '4', 2026, 'April', 'Closed', '2026-03-31 08:45:11.250+00', '2026-05-02 09:11:23.670+00', 'DEAN'),
    ('00000000-0000-0000-0000-000000000139', '00000000-0000-0000-0000-000000000001', 39, '3', 2026, 'March', 'Closed', '2026-02-28 11:08:38.153+00', '2026-03-31 08:45:11.250+00', 'DEAN'),
    ('00000000-0000-0000-0000-000000000138', '00000000-0000-0000-0000-000000000001', 38, '2', 2026, 'February', 'Closed', '2026-01-22 10:29:34.317+00', '2026-02-28 11:08:38.153+00', 'DEAN'),
    ('00000000-0000-0000-0000-000000000137', '00000000-0000-0000-0000-000000000001', 37, '1', 2026, 'January', 'Closed', '2026-01-02 18:31:13.923+00', '2026-01-22 10:29:34.317+00', 'DEAN'),
    ('00000000-0000-0000-0000-000000000136', '00000000-0000-0000-0000-000000000001', 36, '12', 2025, 'December', 'Closed', '2025-12-01 08:13:43.023+00', '2026-01-02 18:31:13.923+00', 'DEAN'),
    ('00000000-0000-0000-0000-000000000135', '00000000-0000-0000-0000-000000000001', 35, '11', 2025, 'November', 'Closed', '2025-10-31 09:33:18.753+00', '2025-12-01 08:13:43.023+00', 'DEAN'),
    ('00000000-0000-0000-0000-000000000134', '00000000-0000-0000-0000-000000000001', 34, '10', 2025, 'October', 'Closed', '2025-09-30 13:28:35.377+00', '2025-10-31 09:33:18.753+00', 'MARGARET'),
    ('00000000-0000-0000-0000-000000000133', '00000000-0000-0000-0000-000000000001', 33, '9', 2025, 'September', 'Closed', '2025-08-30 14:33:43.997+00', '2025-09-30 13:28:35.377+00', 'MARGARET'),
    ('00000000-0000-0000-0000-000000000132', '00000000-0000-0000-0000-000000000001', 32, '8', 2025, 'August', 'Closed', '2025-08-01 07:46:25.427+00', '2025-08-30 14:33:43.997+00', 'MARGARET')
ON CONFLICT (id) DO NOTHING;
