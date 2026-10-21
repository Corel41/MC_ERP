-- Migration: 20261021000014_tenant_receipts.sql
-- Sub-Module: Tenant Payment Receipting & Invoices Reconciliation

CREATE TABLE IF NOT EXISTS tenant_receipts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    receipt_number VARCHAR(50) NOT NULL,
    tenant_id VARCHAR(100),
    tenant_code VARCHAR(50),
    tenant_name VARCHAR(255) NOT NULL,
    property_id VARCHAR(100),
    property_name VARCHAR(255),
    unit_code VARCHAR(50),
    amount_paid NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    payment_method VARCHAR(50) NOT NULL, -- 'M-Pesa Paybill', 'Bank Deposit', 'Cash', 'Cheque', 'EFT / RTGS'
    bank_account_id VARCHAR(100),
    bank_account_name VARCHAR(255),
    mpesa_paybill_id VARCHAR(100),
    mpesa_paybill_number VARCHAR(50),
    reference_code VARCHAR(100),
    payment_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    notes TEXT,
    allocated_invoices JSONB DEFAULT '[]'::jsonb,
    issued_by VARCHAR(100) DEFAULT 'DEAN',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE tenant_receipts ENABLE ROW LEVEL SECURITY;

-- Multi-Tenant RLS Policies
DROP POLICY IF EXISTS "tenant_receipts_auth_policy" ON tenant_receipts;
CREATE POLICY "tenant_receipts_auth_policy" ON tenant_receipts
    AS PERMISSIVE FOR ALL
    TO authenticated
    USING (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)
    WITH CHECK (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid);

DROP POLICY IF EXISTS "tenant_receipts_anon_select" ON tenant_receipts;
CREATE POLICY "tenant_receipts_anon_select" ON tenant_receipts
    FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "tenant_receipts_anon_all" ON tenant_receipts;
CREATE POLICY "tenant_receipts_anon_all" ON tenant_receipts
    FOR ALL TO anon USING (true) WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tenant_receipts_org ON tenant_receipts (organization_id);
CREATE INDEX IF NOT EXISTS idx_tenant_receipts_tenant ON tenant_receipts (tenant_id);
CREATE INDEX IF NOT EXISTS idx_tenant_receipts_date ON tenant_receipts (payment_date);

-- Seed initial demonstration receipts for Chimney Rise Estate tenants
INSERT INTO tenant_receipts (id, organization_id, receipt_number, tenant_id, tenant_code, tenant_name, property_id, property_name, unit_code, amount_paid, payment_method, bank_account_name, mpesa_paybill_number, reference_code, payment_date, notes, issued_by)
VALUES
    ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000001', 'REC-2026-001', 'TEN-CRE-01', 'T16557', 'Nancy Jacqueline Njuhi Kamau', 'PROP-03', 'CHIMNEY RISE ESTATE -', '1', 35000.00, 'M-Pesa Paybill', NULL, '522522', 'QKD829104A', '2026-10-03 11:20:00+00', 'October 2026 Rent settlement via M-Pesa Paybill', 'DEAN'),
    ('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000001', 'REC-2026-002', 'TEN-CRE-02', 'T00186', 'Deep Shah And Nirah Shah', 'PROP-03', 'CHIMNEY RISE ESTATE -', '2', 38000.00, 'Bank Deposit', 'ABSA BANK - RUIRU (0311121448)', NULL, 'BNK-782910', '2026-10-04 09:45:00+00', 'Direct deposit to ABSA Bank for October Rent', 'DEAN'),
    ('00000000-0000-0000-0000-000000000203', '00000000-0000-0000-0000-000000000001', 'REC-2026-003', 'TEN-01', 'T001', 'Grace Wanjiru Ndungu', 'PROP-01', 'Chania Falls View Courts', 'A-01', 37525.00, 'M-Pesa Paybill', NULL, '522522', 'MPX-SK981240', '2026-10-03 14:22:00+00', 'October Rent, Service Charge, and Water settlement', 'DEAN')
ON CONFLICT (id) DO NOTHING;
