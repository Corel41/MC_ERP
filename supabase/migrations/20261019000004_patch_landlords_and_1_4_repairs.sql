-- Migration: 20261019000004_patch_landlords_and_1_4_repairs.sql
-- Part A: Patch Existing Tables (Legacy ProMatrix Alignment)
-- Part B: Sub-Module 1.4 Repairs & Maintenance (Tickets, Vendors, Work Orders/LPOs, Cost Allocation)

-- A. Patch Existing Tables
ALTER TABLE landlords 
  ADD COLUMN IF NOT EXISTS landlord_code VARCHAR(50),
  ADD COLUMN IF NOT EXISTS postal_code VARCHAR(50),
  ADD COLUMN IF NOT EXISTS next_of_kin_name VARCHAR(150),
  ADD COLUMN IF NOT EXISTS next_of_kin_phone VARCHAR(50),
  ADD COLUMN IF NOT EXISTS next_of_kin_relationship VARCHAR(100),
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

ALTER TABLE management_mandates 
  ADD COLUMN IF NOT EXISTS commission_type VARCHAR(20) DEFAULT 'Percentage' CHECK (commission_type IN ('Percentage', 'Fixed')),
  ADD COLUMN IF NOT EXISTS management_fee_fixed_amount NUMERIC(14, 2);

-- B. Vendors Registry (Maintenance Contractors & Suppliers - dbo_Vendor / dbo_Vendor_Creditor)
CREATE TABLE IF NOT EXISTS vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    trade_category VARCHAR(100) NOT NULL,
    contact_person VARCHAR(150),
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    kra_pin VARCHAR(50),
    payment_details TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vendors_org ON vendors (organization_id);

-- C. Maintenance Requests / Incident Tickets (dbo_Pro_Tasks)
CREATE TABLE IF NOT EXISTS maintenance_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    ticket_number VARCHAR(50) NOT NULL,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    unit_id UUID REFERENCES property_units(id) ON DELETE SET NULL,
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Plumbing', 'Electrical', 'Carpentry', 'Masonry', 'Painting', 'Roofing', 'Appliance', 'General')),
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('Low', 'Medium', 'High', 'Emergency')) DEFAULT 'Medium',
    description TEXT NOT NULL,
    reported_by VARCHAR(50) NOT NULL DEFAULT 'Tenant',
    status VARCHAR(30) NOT NULL CHECK (status IN ('Reported', 'Assigned', 'In_Progress', 'Completed', 'Cancelled')) DEFAULT 'Reported',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_ticket_org_num UNIQUE (organization_id, ticket_number)
);

CREATE INDEX IF NOT EXISTS idx_maintenance_requests_org ON maintenance_requests (organization_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_requests_prop ON maintenance_requests (organization_id, property_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_requests_unit ON maintenance_requests (organization_id, unit_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_requests_status ON maintenance_requests (organization_id, status);

-- D. Maintenance Work Orders & Local Purchase Orders (dbo_PR_LPO)
CREATE TABLE IF NOT EXISTS maintenance_work_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    lpo_number VARCHAR(50) NOT NULL,
    ticket_id UUID REFERENCES maintenance_requests(id) ON DELETE SET NULL,
    vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    unit_id UUID REFERENCES property_units(id) ON DELETE SET NULL,
    scope_of_work TEXT NOT NULL,
    estimated_cost NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    actual_cost NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    cost_allocation VARCHAR(50) NOT NULL CHECK (cost_allocation IN ('Landlord Deductible', 'Tenant Damage Recovery', 'Common Service Charge Pool')) DEFAULT 'Landlord Deductible',
    approval_status VARCHAR(30) NOT NULL CHECK (approval_status IN ('Draft', 'Approved', 'Rejected', 'Fulfilled')) DEFAULT 'Approved',
    approved_by VARCHAR(150),
    issued_date DATE NOT NULL DEFAULT CURRENT_DATE,
    completion_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_lpo_org_num UNIQUE (organization_id, lpo_number)
);

CREATE INDEX IF NOT EXISTS idx_work_orders_org ON maintenance_work_orders (organization_id);
CREATE INDEX IF NOT EXISTS idx_work_orders_prop ON maintenance_work_orders (organization_id, property_id);
CREATE INDEX IF NOT EXISTS idx_work_orders_vendor ON maintenance_work_orders (organization_id, vendor_id);
CREATE INDEX IF NOT EXISTS idx_work_orders_allocation ON maintenance_work_orders (organization_id, cost_allocation);
CREATE INDEX IF NOT EXISTS idx_work_orders_status ON maintenance_work_orders (organization_id, approval_status);

-- E. Row-Level Security (RLS) & Multi-Tenant Isolation Policies
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Tenant Isolation Policy" ON vendors;
CREATE POLICY "Tenant Isolation Policy" ON vendors
    AS PERMISSIVE FOR ALL
    TO authenticated
    USING (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)
    WITH CHECK (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid);

ALTER TABLE maintenance_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Tenant Isolation Policy" ON maintenance_requests;
CREATE POLICY "Tenant Isolation Policy" ON maintenance_requests
    AS PERMISSIVE FOR ALL
    TO authenticated
    USING (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)
    WITH CHECK (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid);

ALTER TABLE maintenance_work_orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Tenant Isolation Policy" ON maintenance_work_orders;
CREATE POLICY "Tenant Isolation Policy" ON maintenance_work_orders
    AS PERMISSIVE FOR ALL
    TO authenticated
    USING (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)
    WITH CHECK (organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid);
