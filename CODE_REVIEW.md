# MC ERP — Technical Review & Improvement Plan

**Scope reviewed:** whole repo at `09becee` — 4 HTML entry points, 6 JS files (~14k lines), 23 SQL migrations, Tauri shell.
**Verdict:** The domain modelling is genuinely strong (Kenyan statutory tax, landlord settlement math, payable catalogue, RLS scaffolding). What's holding it back is **delivery engineering**, not business logic: no build, no tests, no auth, no server-side data authority, and a lot of copy-paste UI code.

Three tiers below: **P0** (fix before anyone outside the office touches it), **P1** (fix before the codebase grows further), **P2** (quality-of-life).

---

## P0 — Correctness & security

### 1. There is no authentication, and the database is writable by anyone with the anon key
- `js/app.js:1-4` hardcodes the Supabase URL + anon key. That key is also in the public GitHub repo, so it's effectively public.
- The app never calls `signIn`. `grep -rn "signIn\|auth\."` returns **zero** results. Every request is made as the `anon` role.
- Supabase RLS is enabled on all 23 tables, but **7 migrations punch holes in it** with `FOR ALL TO anon USING (true) WITH CHECK (true)`:

  | Table | Policies (`supabase/migrations/*`) |
  |---|---|
  | `company_profile` | `Public Read Access`, `Public Modify Access` — `…00011` |
  | `company_bank_accounts` | `bank_accounts_anon_select`, `bank_accounts_anon_all` — `…00012` |
  | `company_mpesa_paybills` | `mpesa_paybills_anon_select`, `mpesa_paybills_anon_all` — `…00012` |
  | `accounting_periods` | `accounting_periods_anon_*` — `…00013` |
  | `tenant_invoices` | `tenant_invoices_anon_*` — `…00013` |
  | `tenant_receipts` | `tenant_receipts_anon_*` — `…00014` |

  Practical impact: anyone on the internet can `DELETE`/`UPDATE` tenant invoices, receipts and accounting periods, or overwrite bank/MPesa details used on printed statements. That is financial-data exposure, not a theoretical risk.
- Meanwhile tables like `tenants`, `landlords`, `properties` only have `TO authenticated` policies keyed off `auth.jwt() -> app_metadata ->> organization_id` — so the "proper" path is designed but never used.

**Fix:** add real Supabase Auth (email+password or magic link), put `organization_id` in `app_metadata` on user creation, drop every `anon` policy, keep `anon` read-only on *nothing* (or at most a public `company_profile` view without bank details), and use the Supabase JS client with a session instead of raw `fetch` + bare headers.

### 2. Writes fail silently — 20 of 27 REST calls never check `res.ok`
`js/app.js` has 20 `fetch(SUPABASE_CONFIG.url/…)` calls; only **7** inspect `res.ok` (`app.js:3378, 8150, 8371, 8463, 8708, 8956`). The rest `await fetch(...)` and continue as if it succeeded. Combined with the 11 empty `catch (e) {}` blocks, a rejected insert (RLS denial, constraint violation, network drop) shows the user a green toast and a receipt number that exists only in `localStorage`.

**Fix:** one thin data-access layer — `api.select(table, params)`, `api.insert(table, row)`, `api.update(...)`, `api.remove(...)` — that throws on non-2xx with the Postgres error message, plus a single `showError()` surface. This also deletes ~600 lines of repeated header boilerplate.

### 3. Deleted records come back after refresh (seed data resurrects them)
`js/seed_data.js:43964-44010` merges three sources on every boot: cached → state → **seed**. Because seed items are re-added whenever a key is absent from the other two, a delete is indistinguishable from "not cached yet":

> delete a tenant → `persistAllAppState` writes the list without it → reload → `hydrateAllAppState` re-inserts it from `SEED_DATA`.

This is exactly the bug class that destroys trust in an ERP. Also `js/seed_data.js` is **1.5 MB** of hardcoded demo data loaded synchronously on every page, blocking first paint, and `mc_erp_6month_showcase_seed.sql` is another 1.1 MB committed at root.

**Fix:** separate *demo* from *production* explicitly — a `DEMO_MODE` flag; seed only when the DB is empty (`select count(*)`), never merge; record tombstones (`deletedAt`) if you need offline merges; move the 1.5 MB seed to a lazy-loaded JSON fetched only in demo mode.

### 4. XSS surface is wide open, and the Tauri CSP is `null`
160 `innerHTML` assignments, many interpolating tenant/landlord names, addresses, notes, and free-text repair descriptions straight into template strings. `src-tauri/tauri.conf.json` sets `"csp": null`, so a payload in a tenant name executes with full app privileges — including filesystem/system access on the desktop build.

**Fix:** an `esc()` helper applied at every interpolation boundary (or `textContent` + `document.createElement` for dynamic rows), and a real CSP: `default-src 'self'; connect-src 'self' https://<project>.supabase.co; img-src 'self' data:; style-src 'self' 'unsafe-inline'`. Also vendor the `@supabase/supabase-js` CDN script locally — the app currently requires jsdelivr at runtime, which contradicts the "native desktop app" premise (offline = broken).

---

## P1 — Architecture & maintainability

### 5. `js/app.js` is 9,270 lines in one file, and `receipts.js` is a fork of it
- `js/app.js` — 9,270 lines, 8 responsibilities (routing, theme, company profile, bank/MPesa admin, tenant billing, receipts, landlord statements, toasts).
- Largest functions are 530 / 408 / 282 / 249 / 245 lines (`executeGenerateLandlordStatement`, `executePaymentReceipt`, `generateTenantStatement`, `executeSingleTenantBilling`, `executeBulkTenantsBilling`).
- `js/receipts.js` (1,898 lines) and `js/landlords.js` (1,318) share **zero** function names with `app.js` yet contain ~182 near-identical lines of receipt/allocation logic. They're copy-paste forks — a bug fixed in one won't be fixed in the other. (`receipts.html` is a standalone page that duplicates the in-app receipt screen.)
- `js/landlords.js` + `js/landlords_hub.js` = 2,251 lines for one domain, plus `landlords.html`, `landlord-statements.html`, `modules/1_3_landlords.html`, `modules/1_4_landlords.html` all rendering landlord screens.

**Fix:** split by domain (`db.js`, `state.js`, `ui.js`, `modules/tenants.js`, `modules/landlords.js`, `modules/receipts.js`, `modules/admin.js`) as ES modules — no bundler needed initially, just `<script type="module">`. Extract the duplicated receipt/allocation/billing logic into shared functions *before* any new feature work. Aim: no function over ~80 lines.

### 6. Duplicate and dead module files
- `modules/08_admin.html` and `modules/8_admin.html` are **byte-identical** (md5 `0cc4972d`).
- `moduleFileMap` (`js/app.js:321-342`) carries 4 aliases for the same admin file, 3 for landlords, 2 for the ledger — hiding which is canonical.
- `modules/02_agency.html`, `03_valuation.html`, `04_admin.html`, `05_finance.html`, `06_operations.html`, `1_5_admin.html` are 5-line placeholders, yet `MASTER_PLAN.md` marks **1.5 Admin [Complete]**. The plan overstates reality — 6 of 7 modules are stubs.

**Fix:** delete `8_admin.html`, prune aliases to one name per view, and correct `MASTER_PLAN.md` so status badges are honest (add `[Stub]`).

### 7. The DB schema is far ahead of the app
23 tables exist (`leases`, `utility_readings`, `maintenance_requests`, `maintenance_work_orders`, `vendors`, `landlord_statements`, `landlord_remittance_payouts`, `tenant_ledger_entries`…), but the app only talks to **6** via REST (`accounting_periods`, `company_bank_accounts`, `company_mpesa_paybills`, `company_profile`, `tenant_invoices`, `tenant_receipts`). Everything else — tenants, landlords, properties, units, leases, repairs, statements, payouts — lives only in `localStorage`. Two sources of truth, and the financial ones (statements, payouts) are the in-browser ones.

**Fix:** pick the direction. Recommended: DB is authoritative, `localStorage` is a read cache; migrate module by module, starting with landlords + statements (highest money risk).

### 8. No safety net: no tests, no lint, no build, no README
- `package.json` has `"test": "echo \"Error: no test specified\" && exit 1"`.
- No README, no LICENSE file (Cargo says "Proprietary"), no ESLint/Prettier, no CI workflow, no `.editorconfig`.
- The money math — 7.5% MRI, 16% VAT, commission splits, 3-way repair allocation — is pure functions in `js/formulas.js`, ideal for unit tests, and it's untested.
- `supabase/migrations/20261022000015_truncate_test_data.sql` is a destructive script sitting in the normal migration path. A `supabase db push` on production would wipe data.

**Fix:** (a) `node --test` over `formulas.js` — the repo already runs on Node 22, zero dependencies; (b) move the truncate script to `supabase/scripts/` so `db push` can't execute it; (c) ESLint + Prettier + a GitHub Actions job running `node --check`, lint and tests on every push; (d) a README with setup, env vars and the migration order.

### 9. Config is hardcoded instead of environment-driven
Supabase URL/key, company defaults (`METROCOSMO LTD - THIKA`, three bank accounts, two paybills) and 22 payables are literals in `js/app.js:1-120` / `AppState`. Changing environments (local Supabase CLI vs staging vs prod) means editing source. `supabase/config.toml` already supports `env(...)` — use it.

**Fix:** `js/config.js` generated from `.env` (or a tiny build step), with a documented `VITE_`-style convention. Note: the anon key in the bundle is fine **once #1 is fixed** — it is designed to be public; the policies are the problem.

---

## P2 — Quality and UX

### 10. UX consistency
- **21 `alert()` calls** and 55 `console.*` — blocking browser dialogs in a Tauri app. A `toast` system exists in `app.js`; route everything through it.
- 145 inline `onclick=`/`onchange=` handlers and 109 `onclick` attributes: untestable, CSP-hostile, and impossible to trace. Replace with a single delegated listener + `data-action`.
- Zero `aria-*` attributes anywhere; 34 unlabelled `<input>`s in `modules/1_2_tenants.html`. Keyboard users can't navigate the invoice/receipt matrices.
- Login gate, session timeout and "who did this" attribution are all absent — the `Audit Logs` pillar in `MASTER_PLAN.md` has no implementation.

### 11. Performance
- 1.13 MB of seed data in `localStorage` across 22 keys, re-parsed on every load (`hydrateAllAppState`) and fully re-serialised on every save (`persistAllAppState` writes *all* keys unless a subset is passed). That's a synchronous main-thread stall on low-end office hardware.
- `loadModule` fetches with `?v=Date.now()`, defeating HTTP cache entirely and re-downloading up to 68 KB of HTML per view switch (`moduleCache` exists but is bypassed by the cache-buster).
- No pagination or virtualisation anywhere: 1,215 invoice lines are rendered into the DOM in one shot.

### 12. Formulæ worth a second look
`js/formulas.js` implements 29 procedures (good). Two things to verify against KRA rules and lock with tests: the 7.5% MRI should apply to **gross rent**, excluding service charge and other payables — confirm the base; and 16% VAT is applied to agency commission, not rent. Tests + a comment per formula citing the statute would make audit season painless.

---

## Suggested sequence

| Step | Work | Why first |
|---|---|---|
| 1 | Auth + drop all `anon` write policies | Blocks financial-data exposure |
| 2 | `api.js` layer with error propagation | Turns silent corruption into visible errors |
| 3 | Fix seed/state/delete precedence, add `DEMO_MODE` | Stops "my record came back" reports |
| 4 | Escape helper + CSP + vendor supabase-js | Closes XSS in browser *and* desktop build |
| 5 | Test harness on `formulas.js` + CI + move truncate script | Cheap, protects the money math |
| 6 | Split `app.js`, de-duplicate `receipts.js` | Prerequisite for scaling the team |
| 7 | DB-authoritative migration (landlords → statements → tenants) | Removes dual source of truth |
| 8 | UX pass: toasts over alerts, a11y labels, pagination | Perceived quality |

Steps 1–5 are days of work, not months, and they convert a promising prototype into something you can put in front of a landlord without a lawyer in the room.

---

## What's already good — don't lose it

- **Domain modelling is the hard part and it's done.** The 22-entry payable catalogue with `isCommissionable` / `isAgentHold` / `rateOnRent` flags, per-property overrides (`propertyPayablesConfig`), and the 3-way repair allocation are real-world accurate.
- **Migrations are numbered, idempotent (`IF NOT EXISTS` / `DROP POLICY IF EXISTS`) and indexed** — `supabase/migrations` is clean apart from the truncate script.
- **RLS scaffolding with `organization_id` in JWT `app_metadata`** is the correct multi-tenant design; it just needs to be switched on.
- **`formulas.js` as a separate pure-function layer** is exactly the right instinct.
- **The Tauri shell is correct** (v2, mica/acrylic, proper icons, capability files) — it needs a CSP and offline assets, not a rewrite.
