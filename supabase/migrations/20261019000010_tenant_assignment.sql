-- Migration: 20261019000010_tenant_assignment.sql
-- Sub-Module 1.1: Unified Tenant Details & Property Assignment Architecture
-- Aligned with ProMatrix Master Architecture (Image image_7043c0.png)

-- 1. Create Sequence for Auto-Generating Tenant Codes (e.g. T001, T002)
CREATE SEQUENCE IF NOT EXISTS tenant_code_seq START 1;

-- 2. Add ProMatrix Legacy Tenant Assignment Columns to tenants table
ALTER TABLE tenants
    ADD COLUMN IF NOT EXISTS tenant_code VARCHAR(20) DEFAULT ('T' || lpad(nextval('tenant_code_seq')::text, 3, '0')),
    ADD COLUMN IF NOT EXISTS tenant_name VARCHAR(255),
    ADD COLUMN IF NOT EXISTS id_number VARCHAR(100),
    ADD COLUMN IF NOT EXISTS date_in DATE DEFAULT CURRENT_DATE,
    ADD COLUMN IF NOT EXISTS tel_no VARCHAR(50),
    ADD COLUMN IF NOT EXISTS address VARCHAR(255),
    ADD COLUMN IF NOT EXISTS postal_code VARCHAR(50),
    ADD COLUMN IF NOT EXISTS work_place VARCHAR(255),
    ADD COLUMN IF NOT EXISTS work_contacts VARCHAR(100),
    ADD COLUMN IF NOT EXISTS next_of_kin VARCHAR(150),
    ADD COLUMN IF NOT EXISTS kin_contacts VARCHAR(100),
    ADD COLUMN IF NOT EXISTS relationship VARCHAR(50),
    ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- 3. Relax older constraints to support unified legacy form inputs safely
ALTER TABLE tenants ALTER COLUMN first_name DROP NOT NULL;
ALTER TABLE tenants ALTER COLUMN surname DROP NOT NULL;
ALTER TABLE tenants ALTER COLUMN id_or_passport DROP NOT NULL;
ALTER TABLE tenants ALTER COLUMN phone_primary DROP NOT NULL;

-- 4. Backfill existing records with generated tenant codes and combined names
UPDATE tenants
SET tenant_code = ('T' || lpad(nextval('tenant_code_seq')::text, 3, '0'))
WHERE tenant_code IS NULL;

UPDATE tenants
SET tenant_name = COALESCE(tenant_name, TRIM(CONCAT(COALESCE(first_name, ''), ' ', COALESCE(middle_name, ''), ' ', COALESCE(surname, ''))))
WHERE tenant_name IS NULL OR tenant_name = '';

UPDATE tenants
SET id_number = id_or_passport
WHERE id_number IS NULL AND id_or_passport IS NOT NULL;

UPDATE tenants
SET tel_no = phone_primary
WHERE tel_no IS NULL AND phone_primary IS NOT NULL;

-- 5. Indexes for fast tenant lookup & tenancy isolation
CREATE INDEX IF NOT EXISTS idx_tenants_org_code ON tenants (organization_id, tenant_code);
CREATE INDEX IF NOT EXISTS idx_tenants_org_active ON tenants (organization_id, is_active);
