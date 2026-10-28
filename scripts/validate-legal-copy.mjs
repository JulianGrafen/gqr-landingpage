#!/usr/bin/env node
/**
 * Fail CI/build if banned absolute legal / UWG wording reappears in user-facing source.
 *
 * Scanned: app/, components/, config/, content/, lib/, blog/*.mdx, root index.html,
 * public/static-pages/*.{json,html}
 *
 * Also scans committed static export HTML: betriebsanweisung/, wissen/, loesungen/, out/ (no _next).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SKIP_DIRS = new Set(['node_modules', '.git', '_next', '.next', 'pdfjs']);

const SKIP_FILES = new Set([
  path.join(ROOT, 'scripts/validate-legal-copy.mjs'),
  path.join(ROOT, 'scripts/strip-legal-claims.mjs'),
  path.join(ROOT, 'scripts/apply-uwg-compliance.mjs'),
  path.join(ROOT, 'scripts/apply-legal-copy-bulk.mjs'),
  path.join(ROOT, 'config/gqr-theme.ts'),
  path.join(ROOT, 'config/betriebsanweisung/README.md'),
]);

/** Scan roots relative to repo root */
const SOURCE_SCAN_ROOTS = [
  'app',
  'components',
  'config',
  'content',
  'lib',
  'public/static-pages',
  'blog',
];

/** Root-level static landing HTML (GitHub Pages). */
const SOURCE_STATIC_DIRS = [
  'pricing',
  'gefahrstoffkataster-excel-vorlage',
  'gefahrstoffverzeichnis-excel-vorlage',
  'gefahrstoffmanagement-reinigungsfirma',
  'gefahrstoff-software-sicherheitsfachkraft-selbstständig',
  'trgs-510-zusammenlagerungs-check',
];

/** Post–GitHub-Pages sync: committed static HTML export. */
const EXPORT_SCAN_ROOTS = [
  'betriebsanweisung',
  'wissen',
  'loesungen',
  'blog',
  'pricing',
  'gefahrstoffkataster-excel-vorlage',
  'gefahrstoffverzeichnis-excel-vorlage',
  'gefahrstoffmanagement-reinigungsfirma',
  'gefahrstoff-software-sicherheitsfachkraft-selbstständig',
  'trgs-510-zusammenlagerungs-check',
  'out',
];

const exportOnly = process.argv.includes('--export');

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
  { id: 'nx-effizienter', re: /\d+\s*x\s*effizienter|10x\s*effizienter/i, hint: 'No numeric comparative superlatives' },
  { id: 'effizienter-als-excel', re: /effizienter als Excel/i },
  { id: 'prozent-weniger', re: /\d+\s*%\s*weniger|\d+\s*%\s*der administrativen/i },
  { id: 'dsgvo-konform-badge', re: /DSGVO-konform/i, hint: 'Use "Hosting in Deutschland (inkl. AVV)"' },
  { id: 'konform-mit', re: /Konform mit/i, hint: 'Use "Orientiert an …"' },
  { id: 'automatisch-auslesen', re: /automatisch auslesen/i },
  { id: 'volle-kontrolle', re: /[Vv]olle Kontrolle/ },
  {
    id: 'extraktion-in-sekunden',
    re: /(extrahiert|Datenextraktion|Extraktion).{0,40}\bin Sekunden\b|\bin Sekunden parat\b/i,
  },
  { id: 'wir-melden-uns', re: /Wir melden uns/i, hint: 'Self-serve only — link to app register' },
  { id: 'termin-vereinbaren', re: /Termin vereinbaren/i },
  {
    id: 'in-einer-minute-product',
    re: /\bin (?:einer Minute|30 Sekunden|\d+ Sekunden)\b/i,
    hint: 'No fixed-duration product promises',
  },
  {
    id: 'signalwort-value-public',
    re: /Signalwort[^<]{0,40}(Gefahr|Achtung)<\/span>/i,
    hint: 'No signal word values on public BA pages',
  },
  { id: 'pruefungssicher', re: /prüfungssicher/i },
  { id: 'reach-konform', re: /REACH-konform/i },
  { id: 'dguv-ready', re: /DGUV-ready/i },
  { id: 'espr-konform', re: /ESPR-konform/i },
  { id: 'in-15-minuten', re: /\bin 15 Minuten\b/i, hint: 'No fixed-duration promises' },
  { id: 'in-unter-minuten', re: /\bin unter \d+ Minuten\b/i },
  {
    id: 'sekunden-check-brand',
    re: /\d+-Sekunden-Check(?!-[a-z])/i,
    hint: 'No second-based product claims (URL slugs exempt)',
    skipInHref: true,
  },
  { id: 'unter-n-sekunden', re: /\bunter \d+ Sekunden\b/i },
  { id: 'prozent-sparen', re: /\d+\s*%\s*(weniger|sparen|Kostenersparnis|Reduktion|Genauigkeit)/i },
  { id: 'guenstiger-bussgeld', re: /Günstiger als.*Bußgeld/i },
  { id: 'bussgeld-verhindert', re: /Bußgeld.*verhindert|verhindert.*Bußgeld/i },
  { id: 'notfallsicher-minuten', re: /Notfallsicher in \d+ Minuten/i },
  { id: 'volle-kontrolle-comma', re: /Volle Kontrolle,/i },
  { id: 'agw-detail', re: /Arbeitsplatzgrenzwerte \(AGW\)/i, hint: 'No AGW/PSA detail in marketing copy' },
  { id: 'flammpunkt-detail', re: /Flammpunkt/i, hint: 'No safety numeric detail in marketing' },
  { id: 'psa-klammer', re: /Schutzausrüstung \(PSA\)/i },
  { id: 'audit-sicherheit', re: /Audit-Sicherheit/i },
  { id: 'sofortige-audit', re: /sofortige Audit/i },
  { id: 'vollautomatisch-aus', re: /vollautomatisch aus/i },
  { id: '90-prozent-marketing', re: /\b90\s*%\s*(weniger|sparen|Reduktion|Genauigkeit)|spart aber 90\s*%/i },
];

/**
 * Line-level allow: `// legal-copy:allow <id>` on the line before, or same line after match.
 * File-level: first line `/* legal-copy:allow-file *\/`
 */
function isInsideHrefOrJsonUrl(content, matchIndex) {
  const windowStart = Math.max(0, matchIndex - 200);
  const slice = content.slice(windowStart, matchIndex + 80);
  if (/href=["'][^"']*$/.test(slice)) return true;
  if (/"@id"\s*:\s*"[^"]*$/.test(slice)) return true;
  if (/"url"\s*:\s*"[^"]*$/.test(slice)) return true;
  return false;
}

/** Julian-approved overlay copy on BA skeleton teaser (exact wording). */
const ALLOWED_SUBSTRINGS = [
  'Schutzmaßnahmen, GHS-Einstufung und Notfall-Regeln hängen zwingend von der Konzentration Ihres Lieferanten ab. Laden Sie Ihr SDB hoch, um die exakten Daten rechtssicher in diesen Entwurf zu extrahieren.',
];

function allowedPhraseRegex(phrase) {
  const parts = phrase.trim().split(/\s+/).map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return new RegExp(parts.join('\\s+'), 'g');
}

function isInAllowedSubstring(content, matchIndex) {
  for (const phrase of ALLOWED_SUBSTRINGS) {
    const re = allowedPhraseRegex(phrase);
    let m;
    while ((m = re.exec(content)) !== null) {
      if (matchIndex >= m.index && matchIndex < m.index + m[0].length) return true;
    }
  }
  return false;
}

function isAllowed(content, matchIndex, ruleId) {
  if (isInAllowedSubstring(content, matchIndex)) return true;
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
  if (exportOnly) {
    for (const rel of EXPORT_SCAN_ROOTS) {
      files.push(...walk(path.join(ROOT, rel)));
    }
  } else {
    for (const rel of SOURCE_SCAN_ROOTS) {
      files.push(...walk(path.join(ROOT, rel)));
    }
    const kfzLanding = path.join(ROOT, 'loesungen/kfz-werkstatt');
    if (fs.existsSync(kfzLanding)) {
      files.push(...walk(kfzLanding));
    }
    for (const rel of SOURCE_STATIC_DIRS) {
      files.push(...walk(path.join(ROOT, rel)));
    }
  }
  for (const rel of SCAN_FILES) {
    const full = path.join(ROOT, rel);
    if (fs.existsSync(full)) files.push(full);
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
      if (rule.skipInHref && isInsideHrefOrJsonUrl(content, m.index)) continue;
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

console.log(
  exportOnly
    ? 'Legal copy export validation OK (no banned terms in synced static HTML).'
    : 'Legal copy validation OK (no banned terms in scanned sources).',
);
