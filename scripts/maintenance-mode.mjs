/**
 * Wartungsmodus für die statische GitHub-Pages-Site.
 *
 *   node scripts/maintenance-mode.mjs on   — Redirect in alle HTML-Seiten (außer /maintenance/)
 *   node scripts/maintenance-mode.mjs off  — Redirect entfernen
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
/** Case-insensitive FS: nicht „MAINTENANCE“ — kollidiert mit /maintenance/. */
const FLAG_FILE = path.join(ROOT, '.gqr-maintenance');
const MARKER_START = '<!-- gqr-maintenance-mode -->';
const MARKER_END = '<!-- /gqr-maintenance-mode -->';

const INJECT = `${MARKER_START}
<meta name="robots" content="noindex, nofollow">
<meta http-equiv="refresh" content="0;url=/maintenance/">
<script>(function(){var p=location.pathname;if(p.indexOf('/maintenance')===0)return;location.replace('/maintenance/');})();</script>
${MARKER_END}
`;

const SKIP_DIRS = new Set([
  'node_modules',
  'out',
  '.git',
  'maintenance',
  '.next',
]);

function shouldSkipDir(name) {
  return SKIP_DIRS.has(name) || name.startsWith('.');
}

function collectHtmlFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (shouldSkipDir(name)) continue;
      collectHtmlFiles(full, acc);
      continue;
    }
    if (name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

function stripMaintenance(html) {
  const start = html.indexOf(MARKER_START);
  if (start === -1) return html;
  const end = html.indexOf(MARKER_END, start);
  if (end === -1) return html;
  return html.slice(0, start) + html.slice(end + MARKER_END.length);
}

function injectMaintenance(html) {
  if (html.includes(MARKER_START)) return html;
  const headMatch = html.match(/<head[^>]*>/i);
  if (!headMatch) return html;
  const insertAt = headMatch.index + headMatch[0].length;
  return html.slice(0, insertAt) + '\n' + INJECT + html.slice(insertAt);
}

function set404Maintenance(on) {
  const dest404 = path.join(ROOT, '404.html');
  const srcMaintenance = path.join(ROOT, 'maintenance', 'index.html');
  const backup404 = path.join(ROOT, '404.html.pre-maintenance');

  if (on) {
    if (fs.existsSync(dest404) && !fs.existsSync(backup404)) {
      fs.copyFileSync(dest404, backup404);
    }
    fs.copyFileSync(srcMaintenance, dest404);
    return;
  }

  if (fs.existsSync(backup404)) {
    fs.copyFileSync(backup404, dest404);
    fs.unlinkSync(backup404);
  } else if (fs.existsSync(dest404)) {
    fs.unlinkSync(dest404);
  }
}

const mode = process.argv[2];
if (mode !== 'on' && mode !== 'off') {
  console.error('Usage: node scripts/maintenance-mode.mjs on|off');
  process.exit(1);
}

const htmlFiles = collectHtmlFiles(ROOT).filter((f) => {
  if (f.includes(`${path.sep}maintenance${path.sep}`)) return false;
  if (path.basename(f) === '404.html') return false;
  return true;
});

let changed = 0;
for (const file of htmlFiles) {
  const before = fs.readFileSync(file, 'utf8');
  const after = mode === 'on' ? injectMaintenance(before) : stripMaintenance(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
}

if (mode === 'on') {
  fs.writeFileSync(FLAG_FILE, `${new Date().toISOString()}\n`, 'utf8');
  set404Maintenance(true);
  console.log(`Wartungsmodus AN — ${changed} HTML-Datei(en) angepasst, .gqr-maintenance gesetzt.`);
} else {
  if (fs.existsSync(FLAG_FILE)) fs.unlinkSync(FLAG_FILE);
  set404Maintenance(false);
  console.log(`Wartungsmodus AUS — ${changed} HTML-Datei(en) bereinigt.`);
}
