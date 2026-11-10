#!/usr/bin/env node
/** Repairs broken German from naive revisionssicher → mit Revisionsverlauf replacements. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIRS = [
  'app',
  'components',
  'config',
  'content',
  'lib',
  'public/static-pages',
  'blog',
  'gefahrstoffkataster-excel-vorlage',
  'gefahrstoffkataster-software',
  'gefahrstoffverzeichnis-excel-vorlage',
  'gefahrstoffmanagement-reinigungsfirma',
  'gefahrstoff-software-sicherheitsfachkraft-selbstständig',
  'trgs-510-zusammenlagerungs-check',
  'pricing',
  'static-loesungen',
  'wissen',
  'loesungen',
];
const EXTRA = ['index.html'];
const EXT = new Set(['.ts', '.tsx', '.mdx', '.md', '.json', '.html', '.txt']);
const SKIP = new Set(['node_modules', '.git', '_next']);

/** Order matters: specific patterns before generic fallbacks. */
const FIXES = [
  [/mit Revisionsverlaufes Aktivitäten-Protokoll/gi, 'Aktivitäten-Protokoll mit Revisionsverlauf'],
  [/mit Revisionsverlaufes Protokoll/gi, 'Protokoll mit Revisionsverlauf'],
  [/mit Revisionsverlaufes PDF/gi, 'PDF mit Revisionsverlauf'],
  [/mit Revisionsverlaufes Dokumentenmanagementsystem/gi, 'Dokumentenmanagementsystem mit Revisionsverlauf'],
  [
    /mit Revisionsverlaufes Führen des Gefahrstoffverzeichnisses/gi,
    'ein Gefahrstoffverzeichnis mit Revisionsverlauf zu führen',
  ],
  [/mit Revisionsverlaufe Nachweise/gi, 'Nachweise mit Revisionsverlauf'],
  [/mit Revisionsverlaufe Backups/gi, 'Backups mit Revisionsverlauf'],
  [/mit Revisionsverlaufe QR-Codes/gi, 'nachvollziehbare QR-Codes'],
  [/mit Revisionsverlaufe Sicherheitsdatenblatt/gi, 'Sicherheitsdatenblatt-Historie mit Revisionsverlauf'],
  [/Keine mit Revisionsverlaufe/gi, 'Keine Sicherheitsdatenblatt-Historie mit'],
  [/Ohne mit Revisionsverlaufe/gi, 'Ohne Sicherheitsdatenblatt-Historie mit'],
  [/mit Revisionsverlaufe Speicherung/gi, 'Speicherung mit Revisionsverlauf'],
  [/mit Revisionsverlaufe Antwort/gi, 'belastbare Antwort'],
  [/mit Revisionsverlaufe /gi, 'mit Revisionsverlauf '],
  [/mit Revisionsverlaufem Verzeichnis/gi, 'Verzeichnis mit Revisionsverlauf'],
  [/mit mit Revisionsverlaufem/gi, 'mit'],
  [/mit mit Revisionsverlauf/gi, 'mit Revisionsverlauf'],
  [/mit Revisionsverlaufen Nachweis/gi, 'nachvollziehbaren Nachweis'],
  [/mit Revisionsverlaufen Automatisierung/gi, 'Automatisierung mit Revisionsverlauf'],
  [/Ohne mit Revisionsverlaufen/gi, 'Ohne nachvollziehbaren'],
  [/mit Revisionsverlaufen /gi, 'mit Revisionsverlauf '],
  [/mit Revisionsverlaufer Export/gi, 'Export mit Revisionsverlauf'],
  [/Historie der Revisionen Ihrer Revisionen/gi, 'nachvollziehbare Änderungshistorie'],
  [/Strukturiertes,\s*Verzeichnis/gi, 'Strukturiertes Verzeichnis'],
  [
    /nachvollziehbares und nachvollziehbares Verzeichnis/gi,
    'aktuelles, nachvollziehbares Verzeichnis',
  ],
  [
    /GQR strukturiert die Sicherheitsdatenblatt-Inhalte orientiert sich an diesen Vorgaben/gi,
    'GQR strukturiert die Pflichtangaben aus dem Sicherheitsdatenblatt nach § 6 GefStoffV',
  ],
  [
    /und macht das Kataster mit Revisionsverlauf\./gi,
    'und führt einen Revisionsverlauf im Kataster.',
  ],
  [/Archivierung mit Revisionsverlauf mit Prüfsummen/gi, 'Archivierung mit Revisionsverlauf und Prüfsummen'],
  [/Änderungen mit Revisionsverlauf mit Zeitstempel/gi, 'Änderungen mit Revisionsverlauf und Zeitstempel'],
  [/mit Revisionsverlauf mit /gi, 'mit Revisionsverlauf und '],
  [/aktuelles, aktuelles, nachvollziehbares/gi, 'aktuelles, nachvollziehbares'],
  [/mit Revisionsverlaufes /gi, ''],
];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (EXT.has(path.extname(name))) out.push(full);
  }
  return out;
}

const files = [];
for (const d of DIRS) files.push(...walk(path.join(ROOT, d)));
for (const e of EXTRA) {
  const f = path.join(ROOT, e);
  if (fs.existsSync(f)) files.push(f);
}

let changed = 0;
for (const f of [...new Set(files)]) {
  let t = fs.readFileSync(f, 'utf8');
  let n = t;
  for (const [re, rep] of FIXES) n = n.replace(re, rep);
  if (n !== t) {
    fs.writeFileSync(f, n);
    changed += 1;
    console.log('fixed', path.relative(ROOT, f));
  }
}
console.log(`Done. ${changed} file(s) updated.`);
