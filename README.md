# Metrocosmo ERP — Grok rebuild (`grok` branch)

Modern TanStack Start rebuild of the Metrocosmo Ltd property management ERP.

## Stack
- TanStack Start (React Router + Vite)
- Zustand (persisted local state + seed)
- Tailwind CSS v4
- Recharts, Lucide, Sonner, cmdk

## Features
- Board dashboard (occupancy, collections, arrears, remit)
- Tenant desk with live receipt waterfall + print slip
- Landlords statements (commission, 16% VAT, 7.5% MRI)
- Registration, Tenants, Repairs, Agency, Valuation, Finance, Ops, Settings
- Mobile-first shell, night/day theme, command palette

## Run
```bash
npm install
npm run dev
```

Original vanilla JS app remains on `main`. This branch is the progressive rewrite.

Seed data: `src/data/seed.json` (demo portfolio for Metrocosmo).
