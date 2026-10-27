#!/usr/bin/env node
/**
 * Stage a deployable public/ directory for Cloudflare Workers static assets.
 *
 * The Tauri config points at the repo root (`frontendDist: "../"`), which is
 * fine for a desktop bundle but would publish seed SQL, migrations and the
 * Tauri sources to the internet. This script builds an explicit allowlist
 * instead, so what ships is exactly what the browser needs.
 *
 * Usage: npm run build:public
 *
 * CommonJS (.cjs) because package.json declares "type": "commonjs".
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'public');

// Everything the browser loads. Add deliberately, never with a glob of the repo.
const INCLUDE = ['index.html', 'landlords.html', 'receipts.html', 'landlord-statements.html', 'css', 'js', 'assets', 'modules'];

// Files that live in an included folder but must not ship.
const EXCLUDE_FILES = new Set([]);

function copy(src, destRel) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(src)) {
      if (entry === '.DS_Store' || entry === 'node_modules') continue;
      copy(path.join(src, entry), path.join(destRel, entry));
    }
    return;
  }
  if (EXCLUDE_FILES.has(destRel.split(path.sep).join('/'))) return;
  const dest = path.join(OUT, destRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function main() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const missing = [];
  for (const item of INCLUDE) {
    const src = path.join(ROOT, item);
    if (!fs.existsSync(src)) { missing.push(item); continue; }
    copy(src, item);
  }
  if (missing.length) {
    console.error(`✗ Missing expected source(s): ${missing.join(', ')}`);
    process.exit(1);
  }

  // Cloudflare-specific files live in cloudflare/ in the repo, but must end up
  // at the root of the asset directory.
  for (const f of ['_headers', '404.html']) {
    fs.copyFileSync(path.join(ROOT, 'cloudflare', f), path.join(OUT, f));
  }

  // Belt-and-braces: never upload anything that looks like a secret or a dump.
  fs.writeFileSync(
    path.join(OUT, '.assetsignore'),
    ['**/node_modules', '**/.DS_Store', '**/.git', '*.sql', '**/*.sql', '*.bak', '*.env', '.env*'].join('\n') + '\n'
  );

  // Report what shipped.
  let files = 0, bytes = 0;
  (function walk(dir) {
    for (const e of fs.readdirSync(dir)) {
      const p = path.join(dir, e);
      const s = fs.statSync(p);
      if (s.isDirectory()) walk(p);
      else { files++; bytes += s.size; }
    }
  })(OUT);

  console.log(`✓ public/ staged — ${files} files, ${(bytes / 1024 / 1024).toFixed(2)} MB`);
  for (const banned of ['.sql', '.env', 'package.json', 'src-tauri', 'supabase', 'MASTER_PLAN.md']) {
    const hit = fs.existsSync(path.join(OUT, banned));
    if (hit) { console.error(`✗ Refusing to ship: ${banned} found in public/`); process.exit(1); }
  }
  console.log('✓ no SQL / env / tooling files in the publish set');
}

main();
