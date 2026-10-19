-- Migration: Align property_units with legacy ProMatrix columns
-- Reference: ProMatrix "Unit Details Bulk" (Category, Type, Floor Level, Status, Water Acct, Elec Acct, Other Acct, Sq Ft, Active)

ALTER TABLE property_units
  ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT '1 Bedroom',
  ADD COLUMN IF NOT EXISTS unit_type VARCHAR(50) DEFAULT 'Residential',
  ADD COLUMN IF NOT EXISTS water_acct VARCHAR(100) DEFAULT '-',
  ADD COLUMN IF NOT EXISTS elec_acct VARCHAR(100) DEFAULT '-',
  ADD COLUMN IF NOT EXISTS other_acct VARCHAR(100) DEFAULT '',
  ADD COLUMN IF NOT EXISTS sq_ft NUMERIC(12, 2) DEFAULT 0.00,
  ADD COLUMN IF NOT EXISTS is_unit_active VARCHAR(20) DEFAULT 'Active';
