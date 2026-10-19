-- Migration: 20261019000009_property_payables.sql
-- Sub-Module 1.1: Property Payables Configuration Matrix & Priority Waterfall Allocation Engine
-- Aligned with ProMatrix Master Architecture (Image image_1f7429.png)

-- 1. MASTER PAYABLES CATALOG (ProMatrix Standard Charges)
CREATE TABLE IF NOT EXISTS master_payables_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) NOT NULL UNIQUE,
    description VARCHAR(100) NOT NULL,
    is_compulsory BOOLEAN DEFAULT false,
    is_refundable BOOLEAN DEFAULT false,
    is_agent_hold BOOLEAN DEFAULT false,
    is_commissionable BOOLEAN DEFAULT false,
    is_percentage BOOLEAN DEFAULT false,
    is_recurring BOOLEAN DEFAULT false,
    is_fixed_amount BOOLEAN DEFAULT false,
    default_rate_on_rent NUMERIC(8, 2) DEFAULT 0.00,
    default_priority INTEGER DEFAULT 99,
    default_overpayment_routing VARCHAR(50) DEFAULT 'Advance Rent Credit',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pre-populate ProMatrix 19 Standard Master Payables exactly as shown in reference image
INSERT INTO master_payables_catalog 
    (code, description, is_compulsory, is_refundable, is_agent_hold, is_commissionable, is_percentage, is_recurring, is_fixed_amount, default_rate_on_rent, default_priority)
VALUES
    ('001', 'Rent', true, false, false, true, false, true, true, 0.00, 10),
    ('002', 'Water Bill', false, false, true, false, false, false, false, 0.00, 20),
    ('003', 'Electricity Bill', false, false, true, false, false, false, false, 0.00, 20),
    ('004', 'Rent Deposit', true, false, false, false, false, false, true, 0.00, 30),
    ('005', 'Water Deposit', true, true, false, false, false, false, true, 0.00, 30),
    ('006', 'Electricity Deposit', true, true, false, false, false, false, false, 0.00, 30),
    ('009', 'Service Charge', true, false, false, false, false, true, true, 0.00, 15),
    ('VAT', 'VAT', false, false, false, false, true, false, true, 0.00, 25),
    ('011', 'Unpaid Cheque Charges', false, false, true, false, false, false, false, 0.00, 5),
    ('035', 'Penalty', false, false, true, false, true, false, false, 0.00, 5),
    ('008', 'Tenancy Agreement', true, false, true, false, false, false, false, 0.00, 40),
    ('015', 'Security', true, false, true, false, false, true, true, 0.00, 18),
    ('016', 'Recovery Charges', false, false, true, false, false, false, false, 0.00, 5),
    ('017', 'Garbage', true, false, true, false, false, true, true, 0.00, 19),
    ('010', 'Letting Fee', false, false, true, false, false, false, false, 0.00, 45),
    ('018', 'Auction Fees', true, false, true, false, false, false, false, 0.00, 5),
    ('013', 'Branch', true, false, true, false, false, false, false, 0.00, 50),
    ('019', 'Shifting Fee', true, false, true, false, false, false, false, 0.00, 50),
    ('021', 'Goodwill', true, true, false, false, false, false, false, 0.00, 60)
ON CONFLICT (code) DO UPDATE SET
    description = EXCLUDED.description,
    is_compulsory = EXCLUDED.is_compulsory,
    is_refundable = EXCLUDED.is_refundable,
    is_agent_hold = EXCLUDED.is_agent_hold,
    is_commissionable = EXCLUDED.is_commissionable,
    is_percentage = EXCLUDED.is_percentage,
    is_recurring = EXCLUDED.is_recurring,
    is_fixed_amount = EXCLUDED.is_fixed_amount,
    default_rate_on_rent = EXCLUDED.default_rate_on_rent,
    default_priority = EXCLUDED.default_priority;

-- 2. PROPERTY SPECIFIC PAYABLES CONFIGURATION MATRIX
CREATE TABLE IF NOT EXISTS property_payables_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    payable_code VARCHAR(20) NOT NULL,
    description VARCHAR(100) NOT NULL,
    is_compulsory BOOLEAN DEFAULT false,
    is_refundable BOOLEAN DEFAULT false,
    is_agent_hold BOOLEAN DEFAULT false,
    is_commissionable BOOLEAN DEFAULT false,
    is_percentage BOOLEAN DEFAULT false,
    is_recurring BOOLEAN DEFAULT false,
    is_fixed_amount BOOLEAN DEFAULT false,
    rate_on_rent NUMERIC(8, 2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT true,
    priority_order INTEGER DEFAULT 99,
    overpayment_routing VARCHAR(50) DEFAULT 'Advance Rent Credit',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT uq_prop_payable_matrix UNIQUE (organization_id, property_id, payable_code)
);

-- Enable RLS
ALTER TABLE master_payables_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_payables_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Catalog Read Access" ON master_payables_catalog;
CREATE POLICY "Public Catalog Read Access" ON master_payables_catalog
    FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Tenant Isolation Policy" ON property_payables_config;
CREATE POLICY "Tenant Isolation Policy" ON property_payables_config
    AS PERMISSIVE FOR ALL
    TO authenticated
    USING (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)
    WITH CHECK (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid);

-- 3. FUNCTION TO SEED DEFAULT PAYABLES MATRIX FOR A PROPERTY
CREATE OR REPLACE FUNCTION seed_property_payables(
    p_organization_id UUID,
    p_property_id UUID
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO property_payables_config (
        organization_id,
        property_id,
        payable_code,
        description,
        is_compulsory,
        is_refundable,
        is_agent_hold,
        is_commissionable,
        is_percentage,
        is_recurring,
        is_fixed_amount,
        rate_on_rent,
        is_active,
        priority_order,
        overpayment_routing
    )
    SELECT
        p_organization_id,
        p_property_id,
        m.code,
        m.description,
        m.is_compulsory,
        m.is_refundable,
        m.is_agent_hold,
        m.is_commissionable,
        m.is_percentage,
        m.is_recurring,
        m.is_fixed_amount,
        m.default_rate_on_rent,
        true,
        m.default_priority,
        m.default_overpayment_routing
    FROM master_payables_catalog m
    ON CONFLICT (organization_id, property_id, payable_code) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- 4. PAYMENT WATERFALL ALLOCATION ENGINE IN SQL
-- Prioritizes high-priority penalties/recovery, clears recurring payables, routes overpayment
CREATE OR REPLACE FUNCTION allocate_tenant_payment_waterfall(
    p_organization_id UUID,
    p_property_id UUID,
    p_amount NUMERIC
)
RETURNS TABLE (
    payable_code VARCHAR,
    description VARCHAR,
    priority_order INTEGER,
    allocated_amount NUMERIC,
    overpayment_remainder NUMERIC
) AS $$
DECLARE
    v_remaining NUMERIC := p_amount;
    r RECORD;
BEGIN
    FOR r IN 
        SELECT 
            c.payable_code, 
            c.description, 
            c.priority_order
        FROM property_payables_config c
        WHERE c.organization_id = p_organization_id
          AND c.property_id = p_property_id
          AND c.is_active = true
        ORDER BY c.priority_order ASC, c.payable_code ASC
    LOOP
        -- Returns record of waterfall priority order
        payable_code := r.payable_code;
        description := r.description;
        priority_order := r.priority_order;
        allocated_amount := 0;
        overpayment_remainder := v_remaining;
        RETURN NEXT;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
