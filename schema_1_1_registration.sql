CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS landlords (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    entity_type VARCHAR(20) NOT NULL CHECK (entity_type IN ('INDIVIDUAL', 'CORPORATE')),
    first_name VARCHAR(100),
    middle_name VARCHAR(100),
    last_name VARCHAR(100),
    company_name VARCHAR(255),
    id_or_reg_number VARCHAR(100) NOT NULL,
    kra_pin VARCHAR(50) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    remittance_method VARCHAR(20) NOT NULL CHECK (remittance_method IN ('BANK', 'MPESA_B2C')),
    bank_name VARCHAR(100),
    bank_branch VARCHAR(100),
    bank_account_number VARCHAR(100),
    mpesa_b2c_phone VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_landlord_org_kra UNIQUE (organization_id, kra_pin),
    CONSTRAINT uq_landlord_org_id_reg UNIQUE (organization_id, id_or_reg_number)
);

CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    surname VARCHAR(100) NOT NULL,
    id_or_passport VARCHAR(100) NOT NULL,
    kra_pin VARCHAR(50),
    phone_primary VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    emergency_contact_name VARCHAR(150),
    emergency_contact_phone VARCHAR(50),
    physical_workplace_details TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_tenant_org_id_passport UNIQUE (organization_id, id_or_passport)
);

CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    property_name VARCHAR(255) NOT NULL,
    lr_number VARCHAR(100) NOT NULL,
    county VARCHAR(100) NOT NULL,
    sub_county VARCHAR(100),
    property_type VARCHAR(30) NOT NULL CHECK (property_type IN ('RESIDENTIAL', 'COMMERCIAL', 'MIXED_USE', 'INDUSTRIAL')),
    paybill_prefix VARCHAR(50) NOT NULL,
    caretaker_name VARCHAR(150),
    caretaker_phone VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_property_org_lr UNIQUE (organization_id, lr_number)
);

CREATE TABLE IF NOT EXISTS property_units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    unit_code VARCHAR(50) NOT NULL,
    floor_number VARCHAR(20),
    room_config VARCHAR(50),
    plinth_area_sqm NUMERIC(10, 2),
    baseline_rent NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    service_charge NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    water_meter_serial VARCHAR(100),
    water_initial_reading NUMERIC(12, 2) DEFAULT 0.00,
    electricity_meter_serial VARCHAR(100),
    occupancy_status VARCHAR(20) NOT NULL DEFAULT 'VACANT' CHECK (occupancy_status IN ('VACANT', 'OCCUPIED', 'RESERVED', 'MAINTENANCE')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_property_unit_code UNIQUE (organization_id, property_id, unit_code)
);

CREATE TABLE IF NOT EXISTS property_payables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    payable_name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('UTILITIES', 'TAX_RATES', 'SECURITY', 'CLEANING', 'INSURANCE', 'REPAIRS_RESERVE', 'OTHER')),
    provider_account VARCHAR(100) NOT NULL,
    default_amount NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    billing_frequency VARCHAR(20) NOT NULL CHECK (billing_frequency IN ('MONTHLY', 'QUARTERLY', 'SEMI_ANNUAL', 'ANNUAL', 'AD_HOC')),
    allocation_rule VARCHAR(30) NOT NULL CHECK (allocation_rule IN ('LANDLORD_DEDUCTIBLE', 'SERVICE_CHARGE_POOL', 'SPLIT_PROPORTIONAL')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS management_mandates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    landlord_id UUID NOT NULL REFERENCES landlords(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    effective_date DATE NOT NULL,
    expiry_date DATE,
    management_fee_pct NUMERIC(5, 2) NOT NULL CHECK (management_fee_pct >= 0 AND management_fee_pct <= 100),
    vat_applicable BOOLEAN NOT NULL DEFAULT TRUE,
    mri_withholding_applicable BOOLEAN NOT NULL DEFAULT TRUE,
    disbursing_account_info VARCHAR(255),
    assigned_property_manager VARCHAR(150),
    mandate_status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (mandate_status IN ('ACTIVE', 'PENDING_APPROVAL', 'EXPIRED', 'TERMINATED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_mandate_org_landlord_property UNIQUE (organization_id, landlord_id, property_id)
);

CREATE INDEX IF NOT EXISTS idx_landlords_org ON landlords (organization_id);
CREATE INDEX IF NOT EXISTS idx_tenants_org ON tenants (organization_id);
CREATE INDEX IF NOT EXISTS idx_tenants_phone ON tenants (organization_id, phone_primary);
CREATE INDEX IF NOT EXISTS idx_properties_org ON properties (organization_id);
CREATE INDEX IF NOT EXISTS idx_property_units_org ON property_units (organization_id, property_id);
CREATE INDEX IF NOT EXISTS idx_property_payables_org ON property_payables (organization_id, property_id);
CREATE INDEX IF NOT EXISTS idx_management_mandates_org ON management_mandates (organization_id, landlord_id, property_id);
