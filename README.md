<div align="center">

![Metrocosmo Logo](MC_logo.jpg)

# MC ERP — Metrocosmo Ltd Enterprise Operating System

**Next-generation property management & financial operations platform for Metrocosmo Ltd (Kenya).**

Multi-branch workflows · Kenyan statutory tax compliance · M-Pesa C2B reconciliation · Utility sub-meter billing

*[TanStack Start rebuild in progress — see branches below]*

</div>

---

## Overview

**MC ERP** is the consolidated enterprise system for Metrocosmo Ltd's property management business. It replaces legacy monolithic web forms with a modern, high-performance interface built around:

- **Multi-branch operations** — Nairobi Head Office, Thika, Westlands, and Mombasa Coastal branches
- **Kenyan statutory tax compliance** — 7.5% Monthly Rental Income (MRI) withholding tax and 16% VAT on agency commission
- **Automated utility sub-meter billing** — previous vs. current readings, volume consumption, per-property tariffs
- **M-Pesa C2B Paybill reconciliation** — instant payment matching alongside bank deposits

The full architecture and module roadmap are documented in [`MASTER_PLAN.md`](MASTER_PLAN.md).

## Repository Layout / Branches

This repository contains two generations of the app side by side:

| Surface | Location | Description |
|---|---|---|
| **Legacy vanilla JS app** | `index.html`, `modules/`, `js/`, `css/` | Zero-build static SPA with 16 HTML module pages (Registration, Tenants, Landlords, Repairs, Agency, Valuation, Finance, Ops, Settings…) |
| **Modern rebuild (`grok` branch)** | `src/` | TanStack Start + React 19 file-based routes (`src/routes/*`) |
| **Desktop shell** | `src-tauri/` | Tauri v2 configuration packaging the app as a native Windows/macOS desktop app (`com.metrocosmo.mcerp`) |
| **Backend / database** | `supabase/` | Supabase project config, 16 SQL migrations, and seed data |
| **Demo dataset** | `mc_erp_6month_showcase_seed.sql`, `js/seed_data.js` | 6-month production showcase portfolio (landlords, properties, units, tenants, leases, meter readings, receipts) generated from `supabase/seed.sql` for instant offline hydration |

## Tech Stack

### Modern rebuild (`src/`)
- **[TanStack Start](https://tanstack.com/start)** (React 19 + Vite 8, file-based routing via `@tanstack/react-router`)
- **[TanStack Query](https://tanstack.com/query)** — server-state caching
- **Zustand** — persisted local state + seed hydration
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Recharts** (dashboards), **Lucide** (icons), **Sonner** (toasts), **cmdk** (command palette)
- **Zod** — schema validation; **date-fns** — date handling; **PGlite** (`@electric-sql/pglite`) — embedded Postgres

### Backend & data
- **Supabase (PostgreSQL)** — schema migrations under `supabase/migrations/`, RLS policies enabled
- Core formula logic mirrored in SQL (`...000007_core_formulas.sql`) and `js/formulas.js`

### Desktop
- **Tauri v2** — native window with mica/acrylic blur effects, dark theme

## Modules & Status

Per the master plan architecture tree:

```
01. Estate Management
│   ├── 1.1 Registration (Properties, Units, Landlords, Tenants)   [Complete]
│   ├── 1.2 Tenants (Leases, Metering, Rent & Service Charge)      [Complete]
│   ├── 1.3 Landlords (Mandates, Commissions, Tax, Remittances)    [Complete]
│   ├── 1.4 Repairs & Maintenance (Requests, Work Orders, LPOs)    [Complete]
│   └── 1.5 Admin (Billing Periods, Tariffs, Notices, Audit Logs)
02. Agency CRM          — listings, lead pipeline, agent commissions
03. Valuation           — appraisals, field inspections, certified reports
04. Administration      — HR, fleet, asset inventory
05. Finance             — multi-branch GL, AP/AR, financial statements
06. Workplace Operations — facilities, room booking, document archive
07. Settings            — themes, branch hierarchy, integration gateways [Active]
```

### Feature highlights
- **Board dashboard** — occupancy, collections, arrears, remit KPIs with charts
- **Tenant desk** — live receipt waterfall, tenant statement ledgers, printable rent slips, demand letters
- **Landlord statements** — commission splits, 16% agency VAT, 7.5% MRI withholding, remittance payouts
- **Repairs** — incident ticketing, work orders & LPOs, 3-way cost allocation (landlord offset / tenant damage recovery / service charge pool)
- **Mobile-first shell** with night/day theming, multi-theme engine, and a global command palette

### Integration gateways (Settings)
Safaricom Daraja (M-Pesa C2B) · KRA eTIMS · MobileSasa SMS Gateway · Google Drive Cloud Storage

## Getting Started

### Prerequisites
- Node.js 20+ (React 19 / Vite 8 toolchain)
- Optional: Supabase CLI (database work), Rust + Tauri prerequisites (desktop builds)

### Web app (modern rebuild)

```bash
npm install
npm run dev        # Vite dev server on http://0.0.0.0:8080
```

Other scripts:

```bash
npm run build      # Production build
npm run preview    # Preview the production build
npm run typecheck  # tsc --noEmit (strict mode)
```

### Legacy static app

Open `index.html` directly in a browser, or serve the repo root with any static server (e.g. `npx serve .`). The app hydrates synchronously from `js/seed_data.js` — no backend required for demos.

### Database (Supabase)

```bash
cd supabase
supabase db reset   # applies migrations/ then seeds seed.sql
```

Migrations cover registration, tenants, landlords, repairs, RLS policies, core formulas, landlord rules (Promatrix), bank/M-Pesa accounts, tenant invoicing & billing periods, and receipts.

### Desktop (Tauri)

```bash
npx @tauri-apps/cli dev    # or: npm run tauri dev (once script added)
```

Frontend dist points at the repo root (`src-tauri/tauri.conf.json` → `"frontendDist": "../"`).

## Project Structure

```
.
├── index.html              # Legacy vanilla-JS app shell
├── MASTER_PLAN.md          # Living architecture & module master plan
├── modules/                # 16 legacy module pages (1_1 … 08_admin)
├── js/                     # Legacy app logic (app.js, formulas.js, receipts.js, seed_data.js…)
├── css/main.css            # Legacy styles
├── src/                    # TanStack Start rebuild
│   ├── router.tsx          # Route tree
│   ├── routes/             # index, tenants, people, repairs, agency, valuation, finance, ops, settings
│   ├── components/         # shell.tsx, ui.tsx
│   └── lib/                # metrics, formulas, portfolio, types, utils
├── supabase/               # Config, migrations (16), seed.sql
├── src-tauri/              # Tauri v2 desktop shell config & icons
├── assets/ · public/       # Logos, favicon
└── mc_erp_6month_showcase_seed.sql   # Full 6-month demo portfolio dump
```

## Configuration Notes

- **Path alias:** `@/*` → `./src/*` (see `tsconfig.json`; strict TypeScript, `checkJs` enabled)
- **Branding:** company name, slogan, and logo hydrate from the `mc_erp_company_profile` localStorage key before first paint (flash-free rebranding)
- **Themes:** Developer Plain (default high-contrast), Frosted Iridescent, Cobalt Bloom, Modern SaaS Iris, Obsidian & Emerald Executive

## Status

This is an active progressive rewrite: completed estate-management modules (1.1–1.4) exist in both the legacy app and the new route tree, while Agency CRM, Valuation, Finance, and Workplace Operations are being migrated. See [`MASTER_PLAN.md`](MASTER_PLAN.md) for authoritative scope and status.

---

*© Metrocosmo Ltd — internal enterprise system.*
