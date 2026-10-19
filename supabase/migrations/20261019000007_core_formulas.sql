-- Migration: 20261019000007_core_formulas.sql
-- ProMatrix Core Mathematical Formulas, Triggers, and Views

-- 1. Ensure market_rent column exists on property_units
ALTER TABLE property_units 
  ADD COLUMN IF NOT EXISTS market_rent NUMERIC(14, 2) DEFAULT 0.00;

-- 2. Bulk Unit Auto-Generation Trigger
CREATE OR REPLACE FUNCTION generate_property_units()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.no_of_units > 0 THEN
    FOR i IN 1..NEW.no_of_units LOOP
      INSERT INTO property_units (
        organization_id,
        property_id,
        unit_code,
        market_rent,
        baseline_rent,
        service_charge,
        occupancy_status
      )
      VALUES (
        NEW.organization_id,
        NEW.id,
        i::text,
        0.00,
        0.00,
        0.00,
        'VACANT'
      )
      ON CONFLICT (organization_id, property_id, unit_code) DO NOTHING;
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_generate_units ON properties;
CREATE TRIGGER trigger_generate_units
AFTER INSERT ON properties
FOR EACH ROW EXECUTE FUNCTION generate_property_units();

-- 3. Core Mathematical Views for Property & Unit Financials
CREATE OR REPLACE VIEW property_financial_summary_view AS
SELECT 
    p.id AS property_id,
    p.organization_id,
    p.property_id_code,
    p.property_name,
    p.lr_number,
    p.property_type,
    p.office_branch,
    p.total_sq_ft,
    p.parking_spaces,
    p.price_per_parking,
    COALESCE(p.parking_spaces * p.price_per_parking, 0.00) AS potential_parking_revenue,
    p.no_of_units,
    COUNT(pu.id) AS total_units_count,
    COUNT(CASE WHEN pu.occupancy_status = 'OCCUPIED' THEN 1 END) AS occupied_units_count,
    COUNT(CASE WHEN pu.occupancy_status = 'VACANT' THEN 1 END) AS vacant_units_count,
    CASE 
        WHEN COUNT(pu.id) > 0 THEN 
            ROUND((COUNT(CASE WHEN pu.occupancy_status = 'OCCUPIED' THEN 1 END)::NUMERIC / COUNT(pu.id)::NUMERIC) * 100, 2)
        ELSE 0.00 
    END AS occupancy_rate_pct,
    COALESCE(SUM(COALESCE(pu.market_rent, pu.baseline_rent, 0)), 0.00) AS total_gross_potential_rent,
    COALESCE(SUM(pu.service_charge), 0.00) AS total_service_charge_budget,
    CASE 
        WHEN COALESCE(p.total_sq_ft, 0) > 0 THEN 
            ROUND(COALESCE(SUM(COALESCE(pu.market_rent, pu.baseline_rent, 0)), 0) / p.total_sq_ft, 2)
        ELSE 0.00 
    END AS rent_per_sq_ft,
    p.is_active
FROM properties p
LEFT JOIN property_units pu ON p.id = pu.property_id
GROUP BY 
    p.id, 
    p.organization_id, 
    p.property_id_code, 
    p.property_name, 
    p.lr_number, 
    p.property_type, 
    p.office_branch, 
    p.total_sq_ft, 
    p.parking_spaces, 
    p.price_per_parking, 
    p.no_of_units, 
    p.is_active;

GRANT SELECT ON property_financial_summary_view TO authenticated;
