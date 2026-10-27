# Where MC ERP gets hosted

**Short answer: it's already hosted, in two of its three parts.**

| Piece | What it is | Where it lives | Cost |
|---|---|---|---|
| **Backend** | Postgres + REST + Storage + Auth | **Supabase Cloud** — already provisioned (`uwkqihhvkegiadelowft`) | Free → **$25/mo Pro** |
| **Web front-end** | 4 static HTML pages + `js/*.js` | **Cloudflare Workers static assets** (recommended) | $0 |
| **Desktop app** | Tauri shell wrapping the same files | **GitHub Releases** (`.msi` / `.exe` / `.dmg`) | $0 |

There is **no Node server, no build step, no Docker image** to host. All asset paths are relative and routing is hash-based (`js/app.js:9259-9266`), so it runs on any static host at any sub-path. That keeps hosting cheap and boring — the right answer for a 3–20 person Kenyan property firm.

---

## 1. Recommended stack

```
                    ┌──────────────────────────────┐
  Staff browser ───▶│ Cloudflare Pages             │
                    │ erp.metrocosmo.co.ke         │
                    │ (static, CDN, CSP headers)   │
                    └──────────────┬───────────────┘
                                   │ HTTPS REST
                    ┌──────────────▼───────────────┐
                    │ Supabase (managed Postgres)  │
                    │ region: eu-central-1         │
                    └──────────────────────────────┘

  Office PCs ──────▶ Tauri installer from GitHub Releases
                     (same files, native window, offline-capable)
```

**Why Cloudflare, and why Workers rather than Pages**
- Requests for **static assets are free** on both Pages and Workers — unlike Netlify/Vercel free tiers, which meter bandwidth (a landlord PDF month could burn through it).
- Cloudflare's current guidance is that **new** projects should use **Workers static assets**, with Pages positioned for maintaining existing Pages projects ([static assets docs](https://developers.cloudflare.com/workers/static-assets/), [Pages→Workers migration](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/index.md)). This repo is a new project, so it gets a `wrangler.jsonc` — already committed — not a Pages project.
- Supports **`_headers`** → we can finally set the CSP that `tauri.conf.json` currently leaves as `null`.
- Free custom domain + auto SSL, deploys straight from this GitHub repo.
- **Cloudflare Access (Zero Trust) is free for up to 50 users** — you can put the whole app behind email OTP *today*, as a stopgap before real Supabase Auth exists. Given review finding #1 (no auth, `anon` write policies), this is the single cheapest security win available.

**Supabase region:** Supabase has **no African region** — 17 AWS regions, none in `af-south-1` ([docs](https://supabase.com/docs/guides/platform/regions)). Closest options from Nairobi are **Frankfurt (eu-central-1)** and **Mumbai (ap-south-1)**; measure both with `ping` before committing. The current project's region should be verified in the dashboard — if it landed in `us-east-1`, recreate it in Frankfurt now, while there are ~23 migrations and no real data, rather than later.

---

## 2. Alternatives, if you'd rather not use Cloudflare

| Option | Verdict |
|---|---|
| **Netlify / Vercel** | Fine, but bandwidth is metered on free tiers and you don't need their serverless functions. Netlify's DX is slightly nicer than Pages. |
| **GitHub Pages** | Free and zero-config, **but**: the repo is public, Pages on free plans can't set custom headers (no CSP), and it would publish `mc_erp_6month_showcase_seed.sql` at a guessable URL. Only acceptable as a throwaway demo. |
| **Firebase Hosting** | Works; no advantage over Pages here. |
| **VPS in Nairobi (Angani, Safaricom Cloud, Truehost) + nginx** | Choose this only if you need the *database* on Kenyan soil — see §5. Adds patching, backups and TLS to your plate for zero functional gain. |
| **Self-hosted Supabase on a VPS (Johannesburg/Hetzner)** | Possible and removes vendor cost, but you own backups, upgrades and uptime. Not worth it below ~50 users. |

---

## 3. Publish directory — one thing to fix first

Tauri's `frontendDist` is `"../"` (repo root). If Pages publishes the repo root, these become **publicly downloadable**:

- `mc_erp_6month_showcase_seed.sql` (1.1 MB of demo tenants)
- `supabase/migrations/*.sql` (full schema, RLS policy names)
- `src-tauri/*`, `package.json`, `MASTER_PLAN.md`

Create a `public/` (or `dist/`) directory holding only what the browser needs — `index.html`, `landlords.html`, `receipts.html`, `landlord-statements.html`, `modules/`, `js/`, `css/`, `assets/` — and point both Pages and Tauri at it. Keeps the publish surface honest and shaves 1.2 MB off the deploy.

---

## 4. Deploy mechanics

Deployment is already configured in this repo: `wrangler.jsonc` declares an **assets-only Worker** (`name: mc-erp`, no `main` script, `assets.directory: ./public`, `not_found_handling: 404-page`). There is no build step — `scripts/stage-public.cjs` copies an explicit allowlist into `public/`.

```
npm ci
npm run build:public     # stages public/, refuses to ship .sql/.env/tooling
npm run deploy           # wrangler deploy
npm run preview          # local: wrangler dev
```

A GitHub Actions workflow (`.github/workflows/deploy-cloudflare.yml`) runs the same steps on push to `main`, and deploys `mc-erp-preview` for pull requests. It needs two repo secrets: `CLOUDFLARE_API_TOKEN` (scope: Workers Scripts → Edit) and `CLOUDFLARE_ACCOUNT_ID`.

Headers live in `cloudflare/_headers` and are copied to the asset root at stage time:

```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://uwkqihhvkegiadelowft.supabase.co; frame-ancestors 'self'

/*.html
  Cache-Control: no-cache

/js/*
  Cache-Control: public, max-age=300
```

> `'unsafe-inline'` in `script-src` is only needed because `index.html:11-60` has an inline branding script. Move that to `js/branding.js` (review item #4) and drop it. Ideally also self-host `@supabase/supabase-js` so `cdn.jsdelivr.net` isn't in the CSP at all — the app should not need the public internet to boot, especially the desktop build.

**Desktop** — GitHub Actions with `tauri-apps/tauri-action` on tag push, uploading `targets: "all"` artifacts (already configured in `tauri.conf.json`) to a Release. Windows `.msi` + `.exe` are what the office will actually run. **Sign the Windows build** or users get SmartScreen warnings; add the Tauri updater later so installers don't have to be re-sent by WhatsApp.

**Environments:** two Supabase projects (`mcerp-staging`, `mcerp-prod`) and two Pages environments. Right now `js/app.js:1-4` hardcodes one URL, so this requires the `js/config.js` change from review item #9 before you can have a safe staging target.

---

## 5. Compliance note (worth a 10-minute conversation with counsel)

Tenant records here contain **KRA PINs, national ID numbers and phone numbers** — personal data under the **Kenya Data Protection Act 2019**, which restricts transfers outside Kenya unless adequate safeguards are in place (§48). Storing it in Supabase Frankfurt is a cross-border transfer; in practice this is normally handled with a documented transfer basis and the processor's DPA, but that is a legal call, not an engineering one. If Metrocosmo's clients (banks, institutional landlords) require Kenyan residency, that's the one scenario where a Nairobi-hosted Postgres outweighs every other consideration in this document.

---

## 6. Cost of the whole thing

| Item | Monthly |
|---|---|
| Cloudflare Pages + Access (≤50 users) | **$0** |
| `.co.ke` domain (~KES 1,300/yr via KeNIC registrar) | ~$1 |
| Supabase **Pro** (daily backups, no inactivity pause, 8 GB DB) | **$25** |
| GitHub private repo + Actions | $0 |
| **Total** | **≈ $26/mo** |

Staying on Supabase **Free** is tempting but wrong for this workload: free projects **pause after ~7 days of inactivity** and have limited backup retention. A property ERP that's read heavily at month-end and then idle is exactly the profile that gets paused — and it has no backups to restore from. Budget the $25.

---

## 7. Go-live checklist

- [ ] Supabase Auth implemented; **all `anon` policies dropped** (review item #1)
- [ ] `api.js` error propagation so failed writes are visible (item #2)
- [ ] Seed/delete precedence fixed; `DEMO_MODE` flag (item #3)
- [ ] `esc()` + CSP + supabase-js self-hosted (item #4)
- [x] `public/` publish dir created; seed `.sql` and migrations excluded (`npm run build:public`)
- [x] `wrangler.jsonc` + `_headers` + deploy workflow committed; dry-run validated
- [ ] `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` secrets added to the repo
- [ ] Supabase project confirmed in `eu-central-1` (migrate now if not)
- [ ] `_headers` deployed; verify with [securityheaders.com](https://securityheaders.com)
- [ ] Cloudflare Access policy → staff emails only (until #1 ships)
- [ ] Supabase Auth redirect URLs updated (currently `site_url = http://127.0.0.1:3000` in `supabase/config.toml:160`)
- [ ] Signed Windows installer attached to a GitHub Release
- [ ] Uptime check (Cloudflare Health Check or BetterStack free) + a documented restore-from-backup drill

---

## 8. Troubleshooting: "Asset too large" (seen 2026-10-27)

**Symptom**

```
Detected Project Settings:
 - Worker Name: mc-erp
 - Output Directory: .
...
✨ Read 2227 files from the assets directory /opt/buildhome/repo
✘ [ERROR] Asset too large.
  ... node_modules/workerd/bin/workerd with a size of 137 MiB
```

**What happened.** The Workers Builds project tracks `main`. At the time of that
build, `wrangler.jsonc` existed only on the feature branch, so wrangler found no
config, auto-generated one with `assets.directory: "."`, and tried to upload the
entire repo — dependencies included — against the **25 MiB per-asset limit**.

**Two independent fixes, both now committed:**

1. `wrangler.jsonc` points assets at `./public`, so the repo root is never the
   asset directory.
2. `postinstall` runs `node scripts/stage-public.cjs`, so `public/` is populated
   by `npm clean-install` alone. This makes *any* deploy command safe, including
   a bare `npx wrangler deploy`, without depending on dashboard settings.
3. A root `.assetsignore` is the backstop if the asset directory is ever
   misconfigured back to `.`.

Verified by cloning the branch clean and re-running the exact failing command:

```
$ npm clean-install --progress=false      # postinstall stages public/
$ npx wrangler deploy --dry-run
✨ Read 35 files from the assets directory /tmp/cfbuild/public
No bindings found.
```

**Workers Builds settings to use** (dashboard → Worker → Settings → Build):

| Setting | Value |
|---|---|
| Production branch | `main` — **must contain `wrangler.jsonc`** |
| Root directory | `/` (empty) |
| Build command | `npm run build:public` (optional — `postinstall` already does it) |
| Deploy command | `npx wrangler deploy` |
| Output directory | leave blank; `wrangler.jsonc` wins |

If the project still holds an auto-generated config from the failed build, delete
it in the dashboard so the committed `wrangler.jsonc` is authoritative.

**Rule of thumb:** never let the asset directory be the repo root. `node_modules`
alone exceeds the upload limits, and `mc_erp_6month_showcase_seed.sql` would be
publicly downloadable.
