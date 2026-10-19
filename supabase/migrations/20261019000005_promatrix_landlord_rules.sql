-- Migration: 20261019000005_promatrix_landlord_rules.sql
-- ProMatrix Legacy Business Rules: Auto-generating Landlord Codes, Soft Deletes, and Cascading Deactivations

-- 1. Auto-generate Landlord Codes (e.g., L001, L067)
CREATE SEQUENCE IF NOT EXISTS landlord_code_seq START 1;
ALTER TABLE landlords ALTER COLUMN landlord_code SET DEFAULT 'L' || lpad(nextval('landlord_code_seq')::text, 3, '0');

-- Backfill any existing landlords missing a landlord_code
UPDATE landlords
SET landlord_code = 'L' || lpad(nextval('landlord_code_seq')::text, 3, '0')
WHERE landlord_code IS NULL;

-- 2. Add landlord_id and is_active to properties for cascading soft-deletes
ALTER TABLE properties ADD COLUMN IF NOT EXISTS landlord_id UUID REFERENCES landlords(id) ON DELETE SET NULL;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

CREATE INDEX IF NOT EXISTS idx_properties_landlord ON properties (organization_id, landlord_id);
CREATE INDEX IF NOT EXISTS idx_properties_is_active ON properties (organization_id, is_active);

-- Backfill landlord_id from existing management mandates if available
UPDATE properties p
SET landlord_id = m.landlord_id
FROM management_mandates m
WHERE m.property_id = p.id AND p.landlord_id IS NULL;

-- 3. Create Trigger Function: Deactivating a landlord deactivates their properties
CREATE OR REPLACE FUNCTION cascade_landlord_deactivation()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_active = false AND OLD.is_active = true THEN
    UPDATE properties SET is_active = false WHERE landlord_id = NEW.id;
    UPDATE properties SET is_active = false WHERE id IN (SELECT property_id FROM management_mandates WHERE landlord_id = NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Attach Trigger to landlords table
DROP TRIGGER IF EXISTS trigger_deactivate_landlord_properties ON landlords;
CREATE TRIGGER trigger_deactivate_landlord_properties
AFTER UPDATE OF is_active ON landlords
FOR EACH ROW EXECUTE FUNCTION cascade_landlord_deactivation();
