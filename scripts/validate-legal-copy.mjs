#!/usr/bin/env node
/**
 * Fail CI/build if banned absolute legal / UWG wording reappears in user-facing source.
 *
 * Scanned: app/, components/, config/, content/, lib/, blog/*.mdx, root index.html,
 * public/static-pages/*.{json,html}
 *
 * Skipped: node_modules, .next, out, _next, exported route HTML trees (regenerated on build).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SKIP_DIRS = new Set(['node_modules', '.git', '_next', 'out', '.next']);

const SKIP_FILES = new Set([
  path.join(ROOT, 'scripts/validate-legal-copy.mjs'),
  path.join(ROOT, 'scripts/strip-legal-claims.mjs'),
  path.join(ROOT, 'scripts/apply-uwg-compliance.mjs'),
  path.join(ROOT, 'scripts/apply-legal-copy-bulk.mjs'),
  path.join(ROOT, 'config/gqr-theme.ts'),
]);

/** Scan roots relative to repo root */
const SCAN_ROOTS = [
  'app',
  'components',
  'config',
  'content',
  'lib',
  'public/static-pages',
];

const SCAN_FILES = ['index.html'];

const EXT = new Set(['.ts', '.tsx', '.mdx', '.md', '.json', '.html', '.mjs']);

/** @type {{ id: string, re: RegExp, hint?: string }[]} */
const BANNED = [
  { id: 'rechtssicher', re: /rechtssicher/i },
  { id: 'revisionssicher', re: /revisionssicher/i },
  { id: 'audit-sicher', re: /audit-sicher/i },
  { id: 'behördenfest', re: /behördenfest/i },
  { id: 'behördenkonform', re: /behördenkonform/i },
  { id: 'gefstoffv-konform', re: /GefStoffV-konform/i },
  { id: '100-prozent', re: /100\s*Prozent|\b100\s*%/i, htmlCssOnly: true },
  { id: 'garantiert', re: /garantiert/i },
  { id: 'sofort-download', re: /sofort\s+download/i },
  {
    id: 'in-n-sekunden',
    re: /\bin\s+\d+\s+Sekunden\b/i,
    hint: 'Use "schneller" / no fixed duration',
  },
  {
    id: 'exakte-werte',
    re: /exakt(en|e)?\s+(Werte|Angaben)/i,
  },
  { id: 'zuverlaessig-extrahiert', re: /zuverlässig extrahiert/i },
  { id: 'vollautomat', re: /vollautomat/i },
  { id: 'eliminiert-risiko', re: /eliminiert das Risiko/i },
  {
    id: 'kompletter-entwurf',
    re: /Kompletten\s+Entwurf|Vollständigen\s+TRGS-555-Entwurf|vollständige\s+Dokument/i,
  },
  { id: 'extraktion-abgeschlossen', re: /Extraktion abgeschlossen/i },
];

/**
 * Line-level allow: `// legal-copy:allow <id>` on the line before, or same line after match.
 * File-level: first line `/* legal-copy:allow-file *\/`
 */
function isAllowed(content, matchIndex, ruleId) {
  const before = content.slice(Math.max(0, matchIndex - 120), matchIndex);
  if (/\/\*\s*legal-copy:allow-file\s*\*\//.test(content.slice(0, 200))) return true;
  if (new RegExp(`legal-copy:allow\\s+${ruleId}`, 'i').test(before)) return true;
  return false;
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = path.join(dir, name);
    if (SKIP_FILES.has(full)) continue;
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (EXT.has(path.extname(name))) out.push(full);
  }
  return out;
}

function collectFiles() {
  const files = [];
  for (const rel of SCAN_ROOTS) {
    files.push(...walk(path.join(ROOT, rel)));
  }
  for (const rel of SCAN_FILES) {
    const full = path.join(ROOT, rel);
    if (fs.existsSync(full)) files.push(full);
  }
  const blogDir = path.join(ROOT, 'blog');
  if (fs.existsSync(blogDir)) {
    for (const name of fs.readdirSync(blogDir)) {
      if (name.endsWith('.mdx')) files.push(path.join(blogDir, name));
    }
  }
  return [...new Set(files)];
}

const violations = [];

for (const file of collectFiles()) {
  const content = fs.readFileSync(file, 'utf8');
  for (const rule of BANNED) {
    if (rule.htmlCssOnly && file.endsWith('.html')) continue;
    const re = new RegExp(rule.re.source, rule.re.flags.includes('g') ? rule.re.flags : `${rule.re.flags}g`);
    let m;
    while ((m = re.exec(content)) !== null) {
      if (isAllowed(content, m.index, rule.id)) continue;
      const line = content.slice(0, m.index).split('\n').length;
      violations.push({
        file: path.relative(ROOT, file),
        line,
        rule: rule.id,
        snippet: m[0],
        hint: rule.hint,
      });
    }
  }
}

if (violations.length > 0) {
  console.error(`Legal copy validation failed: ${violations.length} banned term(s)\n`);
  for (const v of violations.slice(0, 80)) {
    console.error(`  ${v.file}:${v.line} [${v.rule}] "${v.snippet}"${v.hint ? ` — ${v.hint}` : ''}`);
  }
  if (violations.length > 80) {
    console.error(`  … and ${violations.length - 80} more`);
  }
  process.exit(1);
}

console.log('Legal copy validation OK (no banned terms in scanned sources).');
