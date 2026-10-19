#!/usr/bin/env node
/** One-shot bulk replacements for legal-copy audit (source only). */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIRS = ['app', 'components', 'config', 'content', 'lib', 'public/static-pages', 'blog'];
const EXTRA = ['index.html'];
const EXT = new Set(['.ts', '.tsx', '.mdx', '.md', '.json', '.html']);
const SKIP = new Set(['node_modules', '.git', 'apply-legal-copy-bulk.mjs', 'validate-legal-copy.mjs']);

const REPLACEMENTS = [
  [/revisionssicheres Verzeichnis/gi, 'Verzeichnis mit Revisionsverlauf'],
  [/revisionssicheres Gefahrstoffverzeichnis/gi, 'Gefahrstoffverzeichnis mit Revisionsverlauf'],
  [/revisionssichere Historie/gi, 'Historie mit Revisionsverlauf'],
  [/revisionssichere Archivierung/gi, 'Archivierung mit Revisionsverlauf'],
  [/revisionssichere Änderungsdokumentation/gi, 'dokumentierte Änderungen'],
  [/revisionssichere SDB-Verknüpfungen/gi, 'nachvollziehbare SDB-Verknüpfungen'],
  [/revisionssichere Nutzung/gi, 'Nachvollziehbare Nutzung'],
  [/revisionssichere Dokumentation/gi, 'Dokumentation mit Revisionsverlauf'],
  [/revisionssichere PDF/gi, 'exportierbare PDF'],
  [/revisionssicher archiviert/gi, 'mit Revisionsverlauf archiviert'],
  [/revisionssicher im Kataster/gi, 'mit Revisionsverlauf im Kataster'],
  [/revisionssicher von Anfang an/gi, 'mit Revisionsverlauf von Anfang an'],
  [/Revisionssicheres Aktivitätsprotokoll/gi, 'Aktivitätsprotokoll zur Nachverfolgung'],
  [/Revisionssicheres Audit-Log/gi, 'Audit-Log zur Nachverfolgung'],
  [/Revisionssichere Nutzung im Team/gi, 'Nachvollziehbare Nutzung im Team'],
  [/Revisionssicherheit/gi, 'Nachweisführung mit Revisionsverlauf'],
  [/revisionssicher/gi, 'mit Revisionsverlauf'],
  [/Revisionssicher/gi, 'Mit Revisionsverlauf'],
  [/audit-sicheres Verzeichnis/gi, 'Verzeichnis mit Revisionsverlauf'],
  [/audit-sicher statt Excel/gi, 'Nachweisführung statt Excel'],
  [/audit-sicher/gi, 'nachweisorientiert'],
  [/Audit-sicher/gi, 'Nachweisführung'],
  [/Audit-Sicherheit/gi, 'Nachweisführung'],
  [/behördenfest exportierbar/gi, 'für Audits exportierbar'],
  [/behördenfest/gi, 'für Audits geeignet'],
  [/GefStoffV-konform, sofort downloaden/gi, 'Pflichtfelder-orientiert · Download ohne Registrierung'],
  [/GefStoffV-konform/gi, 'nach § 6 GefStoffV strukturiert'],
  [/sofort downloaden/gi, 'Download ohne Registrierung'],
  [/vollautomatisch im Hintergrund/gi, 'im Hintergrund protokolliert'],
  [/vollautomatisiert/gi, 'weitgehend automatisiert'],
  [/vollautomatisch/gi, 'weitgehend automatisch'],
  [/zuverlässig extrahiert/gi, 'schlägt vor'],
  [/eliminiert das Risiko/gi, 'reduziert das Risiko'],
  [/überlebenswichtigen H- und P-Sätze/gi, 'Hinweise aus dem freigegebenen Datensatz'],
  [/die exakte Betriebsanweisung/gi, 'den freigegebenen Betriebsanweisungs-Entwurf'],
  [/exakte Struktur/gi, 'strukturierte Vorlage'],
  [/exakt nach diesen Vorgaben/gi, 'orientiert sich an diesen Vorgaben'],
  [/exakten Angaben/gi, 'Angaben'],
  [/exakten Werte/gi, 'Vorschläge'],
  [/exakte Werte/gi, 'Vorschläge'],
  [/Die exakte Vorgehensweise/gi, 'Die typische Vorgehensweise'],
  [/Die exakte Bezeichnung/gi, 'Die Bezeichnung'],
  [/den exakten Lagerort/gi, 'den Lagerort'],
  [/in 30 Sekunden\./gi, 'schneller strukturieren.'],
  [/in 30 Sekunden/gi, 'schnell'],
  [/in 15 Sekunden/gi, 'schnell'],
  [/in wenigen Sekunden auszulesen/gi, 'auszulesen'],
  [/100 Prozent zu automatisieren/gi, 'vollständig zu automatisieren'],
  [/One-Click-Export für Behördenkontrollen/gi, 'Export für Audits und interne Nachweise'],
  [/liefert Nachweise, die BG- und Behördenprüfungen erwarten/gi, 'liefert Exports für Ihre Nachweisführung bei Prüfungen'],
  [/Sind die Daten audit- und behördenfest exportierbar\?/gi, 'Sind Exporte für Audits und interne Dokumentation möglich?'],
  [/Das System zwingt den Betreiber in die Konformität/gi, 'Das System unterstützt Revisions-Workflows und Erinnerungen'],
  [/rechtskonformen, automatisierten/gi, 'strukturierten'],
  [/Warum Excel die Audit-Sicherheit kostet/gi, 'Warum Excel die Nachweisführung erschwert'],
  [/Excel war der Start — GQR hält Sie audit-sicher/gi, 'Excel war der Start — GQR unterstützt Ihre Nachweisführung'],
  [/Strukturiertes, revisionssicheres Verzeichnis ab Tag 1/gi, 'Strukturiertes Verzeichnis mit Revisionsverlauf ab Tag 1'],
  [/Sie erhalten ein revisionssicheres Verzeichnis/gi, 'Sie erhalten ein Verzeichnis mit Revisionsverlauf'],
  [/minimiert menschliche Fehler/gi, 'reduziert Abtippaufwand'],
  [/macht das Kataster revisionssicher/gi, 'führt einen Revisionsverlauf im Kataster'],
  [/bevor die Behörde ihn findet/gi, 'frühzeitig im System prüfen'],
  [/warnt automatisch bei verbotenen/gi, 'weist auf mögliche Konflikte bei'],
  [/den Nachweis revisionssicher vorlegen können/gi, 'Nachweise für Audits besser dokumentieren können'],
  [/Wie dokumentiere ich die Zusammenlagerungsprüfung nach TRGS 510 revisionssicher\?/gi, 'Wie dokumentiere ich die Zusammenlagerungsprüfung nach TRGS 510 mit Revisionsverlauf?'],
  [/Gefahrstoffe in 30 Sekunden digitalisieren/gi, 'Gefahrstoffe schnell digitalisieren'],
  [/Anlegen von Gefahrstoffen in 30 Sekunden/gi, 'Gefahrstoffe schnell erfassen'],
  [/Vollständigen Planvergleich anzeigen/gi, 'Planvergleich anzeigen'],
  [/vollständige Historie/gi, 'Historie der Revisionen'],
  [/vollständige Erfassung/gi, 'Erfassung nach Freigabe'],
  [/vollständiges, aktuelles/gi, 'aktuelles, nachvollziehbares'],
  [/optisch vollständig/gi, 'optisch lückenlos'],
  [/Pflichtinhalte kompakt — ohne Anspruch auf Vollständigkeit/gi, 'Pflichtinhalte kompakt — ohne Anspruch auf alle Einzelfragen'],
  [/Automatische Warnung pro Lagerort/gi, 'Hinweise zu Konflikten pro Lagerort'],
  [/Automatischer Sicherheitsdatenblatt-Workflow/gi, 'KI-gestützter Sicherheitsdatenblatt-Workflow'],
  [/Automatische Sicherheitsdatenblatt-Extraktion/gi, 'KI-gestützte Sicherheitsdatenblatt-Extraktion'],
  [/Automatische Lagerkonflikt-Warnung/gi, 'Hinweise zu Lagerkonflikten'],
  [/GHS, H- und P-Sätze sofort/gi, 'GHS und Hinweise aus freigegebenem Datensatz'],
  [/sofort die/gi, 'direkt die'],
  [/Sofort in Excel nutzbar/gi, 'Direkt in Excel nutzbar'],
  [/Sofort startklar/gi, 'Schnell startklar'],
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
for (const f of [...new Set(files)]) {
  if (f.endsWith('landing-home-seo-faq.ts')) continue;
  let t = fs.readFileSync(f, 'utf8');
  let n = t;
  for (const [re, rep] of REPLACEMENTS) n = n.replace(re, rep);
  if (n !== t) {
    fs.writeFileSync(f, n);
    console.log('updated', path.relative(ROOT, f));
  }
}
