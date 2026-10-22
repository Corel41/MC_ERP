-- =============================================================================
-- Migration: 20261022000015_truncate_test_data.sql
-- Purpose:   Wipe all test/demo transactional records in FK-safe order.
--            Strictly PRESERVES:
--              - master_payables_catalog (ProMatrix standard codes - seeded in 000009)
--              - company_bank_accounts   (Admin Payment Channels)
--              - company_mpesa_paybills  (Admin Payment Channels)
--            Run this once before loading the production showcase seed.
-- =============================================================================

-- ── Step 1: Transactional leaves (no children) ────────────────────────────────
TRUNCATE TABLE tenant_receipts              RESTART IDENTITY CASCADE;
TRUNCATE TABLE tenant_invoice_lines         RESTART IDENTITY CASCADE;
TRUNCATE TABLE tenant_ledger_entries        RESTART IDENTITY CASCADE;
TRUNCATE TABLE accounting_periods           RESTART IDENTITY CASCADE;

-- ── Step 2: Invoice headers ───────────────────────────────────────────────────
-- Note: two tenant_invoices tables exist (migration 000001 and 000013).
-- Both are wiped here.
TRUNCATE TABLE tenant_invoices              RESTART IDENTITY CASCADE;

-- ── Step 3: Landlord financial outputs ───────────────────────────────────────
TRUNCATE TABLE landlord_remittance_payouts  RESTART IDENTITY CASCADE;
TRUNCATE TABLE landlord_statements          RESTART IDENTITY CASCADE;

-- ── Step 4: Utility & metering ───────────────────────────────────────────────
TRUNCATE TABLE utility_readings             RESTART IDENTITY CASCADE;

-- ── Step 5: Repairs & maintenance ────────────────────────────────────────────
TRUNCATE TABLE maintenance_work_orders      RESTART IDENTITY CASCADE;
TRUNCATE TABLE maintenance_requests         RESTART IDENTITY CASCADE;
TRUNCATE TABLE vendors                      RESTART IDENTITY CASCADE;

-- ── Step 6: Leases (tenant-to-unit assignments) ───────────────────────────────
TRUNCATE TABLE leases                       RESTART IDENTITY CASCADE;

-- ── Step 7: Property-level config (payables matrix per property) ──────────────
TRUNCATE TABLE property_payables_config     RESTART IDENTITY CASCADE;
-- NOTE: master_payables_catalog is NOT truncated — it is a static lookup table.

-- ── Step 8: Property & unit data ─────────────────────────────────────────────
TRUNCATE TABLE management_mandates          RESTART IDENTITY CASCADE;
TRUNCATE TABLE property_payables            RESTART IDENTITY CASCADE;
TRUNCATE TABLE property_units               RESTART IDENTITY CASCADE;
TRUNCATE TABLE properties                   RESTART IDENTITY CASCADE;

-- ── Step 9: People (tenants & landlords) ──────────────────────────────────────
TRUNCATE TABLE tenants                      RESTART IDENTITY CASCADE;
TRUNCATE TABLE landlords                    RESTART IDENTITY CASCADE;

-- ── PRESERVED (do NOT truncate) ───────────────────────────────────────────────
-- master_payables_catalog  → 19 standard ProMatrix codes (001, 002, 009, 035, VAT …)
-- company_bank_accounts    → Admin Payment Channels (ABSA RUIRU, PETTY CASH …)
-- company_mpesa_paybills   → Admin M-Pesa Paybills  (522522, 247247 …)
-- company_profile          → Company identity & branding

SELECT 'Truncation complete. Ready for 6-month production showcase seed.' AS status;
