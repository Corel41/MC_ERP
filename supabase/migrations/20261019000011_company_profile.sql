-- Migration: 20261019000011_company_profile.sql
-- Sub-Module 08: Global Administration & Company Profile Setup
-- Aligned with ProMatrix Master Architecture (image_713764.png)

CREATE TABLE IF NOT EXISTS company_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    slogan VARCHAR(255),
    address1 VARCHAR(255),
    address2 VARCHAR(255),
    postal_code VARCHAR(50),
    city_town VARCHAR(100),
    phone VARCHAR(100),
    nhif_no VARCHAR(100),
    nssf_no VARCHAR(100),
    pin_no VARCHAR(100),
    email VARCHAR(255),
    logo_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_company_profile_org UNIQUE (organization_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE company_profile ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Tenant Isolation Policy" ON company_profile;
CREATE POLICY "Tenant Isolation Policy" ON company_profile
    AS PERMISSIVE FOR ALL
    TO authenticated
    USING (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)
    WITH CHECK (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid);

-- Public fallback for demo / development environments without active JWT session
DROP POLICY IF EXISTS "Public Read Access" ON company_profile;
CREATE POLICY "Public Read Access" ON company_profile
    FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Public Modify Access" ON company_profile;
CREATE POLICY "Public Modify Access" ON company_profile
    FOR ALL TO anon USING (true) WITH CHECK (true);

-- Index for organization lookup
CREATE INDEX IF NOT EXISTS idx_company_profile_org ON company_profile (organization_id);

-- Initial seed data matching ProMatrix legacy screenshot
INSERT INTO company_profile (
    organization_id,
    company_name,
    slogan,
    address1,
    address2,
    postal_code,
    city_town,
    phone,
    nhif_no,
    nssf_no,
    pin_no,
    email,
    logo_url
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'METROCOSMO LTD - THIKA',
    '',
    '40656',
    'Hughes Building, 7th Floor',
    '00100',
    'Nairobi',
    '020 2244218, 0723 422555',
    '',
    '',
    '',
    'info@metrocosmo.com',
    ''
) ON CONFLICT (organization_id) DO NOTHING;
