-- Migration: 20261019000006_patch_properties.sql
-- ProMatrix Legacy Property Architecture Alignment

-- 1. Auto-generate Property ID Code (e.g., P001, P002)
CREATE SEQUENCE IF NOT EXISTS property_id_seq START 1;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS property_id_code VARCHAR DEFAULT 'P' || lpad(nextval('property_id_seq')::text, 3, '0');

-- Backfill any existing properties missing property_id_code
UPDATE properties
SET property_id_code = 'P' || lpad(nextval('property_id_seq')::text, 3, '0')
WHERE property_id_code IS NULL;

-- 2. Add missing ProMatrix columns
ALTER TABLE properties 
  ADD COLUMN IF NOT EXISTS total_sq_ft NUMERIC,
  ADD COLUMN IF NOT EXISTS caretaker_name VARCHAR,
  ADD COLUMN IF NOT EXISTS office_branch VARCHAR,
  ADD COLUMN IF NOT EXISTS remittance_type VARCHAR CHECK (remittance_type IN ('Expected', 'Collected')),
  ADD COLUMN IF NOT EXISTS bank_name VARCHAR,
  ADD COLUMN IF NOT EXISTS bank_branch VARCHAR,
  ADD COLUMN IF NOT EXISTS bank_account_no VARCHAR,
  ADD COLUMN IF NOT EXISTS bank_account_name VARCHAR,
  ADD COLUMN IF NOT EXISTS payment_date VARCHAR,
  ADD COLUMN IF NOT EXISTS parking_spaces INTEGER,
  ADD COLUMN IF NOT EXISTS price_per_parking NUMERIC,
  ADD COLUMN IF NOT EXISTS contract_date DATE,
  ADD COLUMN IF NOT EXISTS no_of_units INTEGER,
  ADD COLUMN IF NOT EXISTS mode_of_billing VARCHAR,
  ADD COLUMN IF NOT EXISTS property_officer VARCHAR,
  ADD COLUMN IF NOT EXISTS payable_to_ll_account BOOLEAN DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_properties_property_id_code ON properties (organization_id, property_id_code);
