#!/usr/bin/env node
/**
 * Remove absolute legal-guarantee wording (UWG) across source + static HTML.
 * Skips: node_modules, .git, _next, out, .next, scripts/apply-uwg-compliance.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_FILES = new Set([
  path.join(ROOT, 'scripts/apply-uwg-compliance.mjs'),
  path.join(ROOT, 'scripts/strip-legal-claims.mjs'),
]);

const SKIP_DIRS = new Set(['node_modules', '.git', '_next', 'out', '.next']);

/** Longest / most specific first. */
const REPLACEMENTS = [
  [/Rechtssicheres Gefahrstoffverzeichnis/g, 'Gefahrstoffverzeichnis nach Vorgaben von § 6 GefStoffV & TRGS'],
  [/rechtssicheres Gefahrstoffverzeichnis/gi, 'Gefahrstoffverzeichnis nach Vorgaben von § 6 GefStoffV & TRGS'],
  [/rechtssicheres Gefahrstoffmanagement/gi, 'strukturiertes Gefahrstoffmanagement'],
  [/Bereit für rechtssicheres Gefahrstoffmanagement\?/gi, 'Bereit für strukturiertes Gefahrstoffmanagement?'],
  [/Rechtssichere Archivierung/g, 'Revisionssichere Archivierung'],
  [/rechtssichere Archivierung/gi, 'revisionssichere Archivierung'],
  [/Der realistische, rechtssichere Software-Prozess/g, 'Der realistische Software-Prozess'],
  [/rechtssichere Software-Prozess/gi, 'strukturierte Software-Prozess'],
  [/garantierte Rechtssicherheit/gi, 'planbare Zeitersparnis und bessere Nachweise'],
  [/Garantierte Aktualität/g, 'Aktualität'],
  [/Vom Muster zur Rechtssicherheit/g, 'Vom Muster zur prüfbaren Dokumentation'],
  [/Rechtssicherheit kann so einfach sein/g, 'Strukturierte Nachweise können so einfach sein'],
  [/Rechtssicherheit im Betrieb/g, 'Dokumentation im Betrieb'],
  [/Sie entscheiden über Freigaben und Rechtssicherheit im Betrieb/g, 'Sie entscheiden über Freigaben und Dokumentation im Betrieb'],
  [/vollständigen Rechtssicherheit/gi, 'besserer Nachweisführung'],
  [/Warum Dateiformate keine Rechtssicherheit bieten/g, 'Warum Dateiformate allein keine Prüfnachweise ersetzen'],
  [/Rechtssicherheit entsteht/g, 'Prüfbare Nachweise entstehen'],
  [/und Rechtssicherheit/g, 'und nachvollziehbare Dokumentation'],
  [/die Rechtssicherheit/gi, 'die nachvollziehbare Dokumentation'],
  [/Rechtssicherheit/g, 'prüfbare Dokumentation'],
  [/Rechtssichere/g, 'Revisionssichere'],
  [/rechtssichere PDF/gi, 'freigegebene PDF'],
  [/rechtssichere Unternehmen/gi, 'Betriebe mit Gefahrstoffpflichten'],
  [/rechtssichere Pflege/gi, 'lückenlose Pflege'],
  [/rechtssicher archiviert/gi, 'revisionssicher archiviert'],
  [/rechtssicher dokumentiert/gi, 'nachvollziehbar dokumentiert'],
  [/rechtssicher abgelegt/gi, 'revisionssicher dokumentiert'],
  [/rechtssicher zu agieren/gi, 'ohne strukturierten Prozess zu dokumentieren'],
  [/rechtssicher belegen/gi, 'nachvollziehbar belegen'],
  [/Ein rechtssicheres Kataster/gi, 'Ein vollständiges Kataster nach § 6 GefStoffV'],
  [/ein rechtssicheres Kataster/gi, 'ein vollständiges Kataster nach § 6 GefStoffV'],
  [/ESPR-konform & rechtssicher/g, 'ESPR-orientiert & dokumentiert'],
  [/rechtssicher nach §/gi, 'nach Vorgaben von §'],
  [/rechtssicher statt/gi, 'strukturiert statt'],
  [/BG-konform und sofort einsatzbereit/gi, 'für den Einstieg vorbereitet und einsatzbereit'],
  [/BG-konform in/gi, 'Prüfungsvorbereitung in'],
  [/BG-Konformität/g, 'Dokumentation für BG-Prüfungen'],
  [/BG-konform/gi, 'für BG-Prüfungen vorbereitet'],
  [/100 % DSGVO-konform/g, 'Serverstandort Deutschland (DSGVO-konform)'],
  [/100% DSGVO-konform/g, 'Serverstandort Deutschland (DSGVO-konform)'],
  [/Muster-Entwurf jetzt freischalten \(Sofort-Download\)/g, 'Muster-Entwurf jetzt in der App freischalten'],
  [/Sofort-Download/g, 'Freischaltung in der App'],
  [/rechtssicheres/gi, 'strukturiertes'],
  [/rechtssichere/gi, 'strukturierte'],
  [/rechtssicher/gi, 'nachvollziehbar'],
  [/garantiert rechtssicher/gi, 'ohne SiFa-Freigabe'],
];

const EXT = new Set(['.html', '.json', '.mdx', '.md', '.tsx', '.ts', '.jsx', '.js']);

function walk(dir, out = []) {
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

let changed = 0;
for (const file of walk(ROOT)) {
  let text = fs.readFileSync(file, 'utf8');
  let next = text;
  for (const [re, rep] of REPLACEMENTS) {
    next = next.replace(re, rep);
  }
  if (next !== text) {
    fs.writeFileSync(file, next);
    changed += 1;
    console.log('updated', path.relative(ROOT, file));
  }
}
console.log(`Done. ${changed} file(s) updated.`);
