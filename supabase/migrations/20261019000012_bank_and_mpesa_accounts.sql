-- Migration: 20261019000012_bank_and_mpesa_accounts.sql
-- Sub-Module 08: Administration - Company Bank Accounts & M-Pesa Paybills
-- Aligned with ProMatrix Master Architecture (image_729c63.png)

-- 1. Create company_bank_accounts table
CREATE TABLE IF NOT EXISTS company_bank_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    bank_name VARCHAR(150) NOT NULL,
    branch_name VARCHAR(150),
    account_name VARCHAR(200) NOT NULL,
    account_no VARCHAR(100) NOT NULL,
    swift_code VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create company_mpesa_paybills table
CREATE TABLE IF NOT EXISTS company_mpesa_paybills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    paybill_number VARCHAR(50) NOT NULL,
    business_name VARCHAR(200) NOT NULL,
    account_prefix VARCHAR(100),
    bank_account_id UUID REFERENCES company_bank_accounts(id) ON DELETE SET NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE company_bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_mpesa_paybills ENABLE ROW LEVEL SECURITY;

-- 3. Multi-Tenant RLS Policies for company_bank_accounts
DROP POLICY IF EXISTS "bank_accounts_auth_policy" ON company_bank_accounts;
CREATE POLICY "bank_accounts_auth_policy" ON company_bank_accounts
    AS PERMISSIVE FOR ALL
    TO authenticated
    USING (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)
    WITH CHECK (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid);

DROP POLICY IF EXISTS "bank_accounts_anon_select" ON company_bank_accounts;
CREATE POLICY "bank_accounts_anon_select" ON company_bank_accounts
    FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "bank_accounts_anon_all" ON company_bank_accounts;
CREATE POLICY "bank_accounts_anon_all" ON company_bank_accounts
    FOR ALL TO anon USING (true) WITH CHECK (true);

-- 4. Multi-Tenant RLS Policies for company_mpesa_paybills
DROP POLICY IF EXISTS "mpesa_paybills_auth_policy" ON company_mpesa_paybills;
CREATE POLICY "mpesa_paybills_auth_policy" ON company_mpesa_paybills
    AS PERMISSIVE FOR ALL
    TO authenticated
    USING (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)
    WITH CHECK (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid);

DROP POLICY IF EXISTS "mpesa_paybills_anon_select" ON company_mpesa_paybills;
CREATE POLICY "mpesa_paybills_anon_select" ON company_mpesa_paybills
    FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "mpesa_paybills_anon_all" ON company_mpesa_paybills;
CREATE POLICY "mpesa_paybills_anon_all" ON company_mpesa_paybills
    FOR ALL TO anon USING (true) WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_company_bank_accounts_org ON company_bank_accounts (organization_id);
CREATE INDEX IF NOT EXISTS idx_company_mpesa_paybills_org ON company_mpesa_paybills (organization_id);

-- 5. Seed legacy default bank accounts matching ProMatrix reference screenshot
INSERT INTO company_bank_accounts (id, organization_id, bank_name, branch_name, account_name, account_no, swift_code, is_active)
VALUES 
    ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000001', 'PETTY CASH', 'PETTY CASH', 'METRO CASH', 'CASH001', 'PCASH', true),
    ('00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000001', 'ABSA BANK', 'RUIRU', 'METROCOSMO LIMITED', '0311121448', '', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Seed legacy default M-Pesa paybill accounts
INSERT INTO company_mpesa_paybills (id, organization_id, paybill_number, business_name, account_prefix, bank_account_id, is_active)
VALUES 
    ('00000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000001', '522522', 'METROCOSMO LTD', 'TENANT CODE', '00000000-0000-0000-0000-000000000020', true),
    ('00000000-0000-0000-0000-000000000040', '00000000-0000-0000-0000-000000000001', '247247', 'METROCOSMO PROPERTIES', 'UNIT NUMBER', '00000000-0000-0000-0000-000000000020', true)
ON CONFLICT (id) DO NOTHING;
