#!/usr/bin/env node
/**
 * Blog + root static landing cleanup (UWG / compliance wording).
 * Run before validate:legal-copy; idempotent where possible.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['node_modules', '.git', '_next', 'out', '.next', 'pdfjs']);
const EXT = new Set(['.html', '.mdx', '.json']);

const SCAN_ROOTS = [
  'blog',
  'gefahrstoffmanagement-reinigungsfirma',
  'gefahrstoffkataster-excel-vorlage',
  'gefahrstoffverzeichnis-excel-vorlage',
  'gefahrstoff-software-sicherheitsfachkraft-selbstständig',
  'trgs-510-zusammenlagerungs-check',
  'pricing',
];

/** Longest / most specific first. */
const REPLACEMENTS = [
  [/Prüfungssicher:\s*Wie Sie dem Kontrolleur der Gewerbeaufsicht mit einem Lächeln begegnen/g, 'Gut vorbereitet auf Prüfungen durch Gewerbeaufsicht und BG'],
  [/Prüfungssicher:/g, 'Gut vorbereitet:'],
  [/prüfungssicher/gi, 'gut vorbereitet'],
  [/REACH-konform, DGUV-ready, prüfungssicher\./g, 'Unterstützt Ihre Dokumentation nach GefStoffV – Freigabe durch SiFa oder Arbeitgeber.'],
  [/REACH-konform/gi, 'REACH-orientiert'],
  [/DGUV-ready/gi, 'für BG-Prüfungen vorbereitet'],
  [/ESPR-konform/gi, 'ESPR-orientiert'],
  [/rechtskonformen Batteriepass/gi, 'dokumentierten Batteriepass'],
  [/rechtskonformen/gi, 'dokumentierten'],
  [/Volle Kontrolle, hoher Zeitaufwand/g, 'Hoher manueller Aufwand'],
  [/Volle Kontrolle/g, 'Volle Übersicht im Prozess'],
  [/Der 2-Sekunden-Check: Wie Ersthelfer im Ernstfall direkt die richtigen Maßnahmen finden/g, 'Gefahrstoff-Infos per QR-Code: schneller Zugriff für Ersthelfer'],
  [/Der 2-Sekunden-Check: Ersthelfer im Ernstfall sofort handlungsfähig/g, 'Gefahrstoff-Infos per QR-Code: schneller Zugriff für Ersthelfer'],
  [/Der 2-Sekunden-Check: Wie Ersthelfer im Ernstfall direkt die richtigen Maßnahmen finden/g, 'Gefahrstoff-Infos per QR-Code: schneller Zugriff für Ersthelfer'],
  [/2-Sekunden-Check im Notfall/g, 'QR-Zugriff im Notfall'],
  [/2-Sekunden-Check: Ersthelfer im Notfall/g, 'QR-Zugriff für Ersthelfer im Notfall'],
  [/2-Sekunden-Check:/g, 'QR-Zugriff:'],
  [/Erste-Hilfe-Maßnahmen in unter 3 Sekunden/g, 'Erste-Hilfe-Angaben aus dem SDB (Abschnitt 4) per Scan'],
  [/Notfall-Ansicht in unter 3 Sekunden/g, 'Notfall-Ansicht per QR-Scan'],
  [/Notfallsicher in 15 Minuten/g, 'QR-Codes für Ihre Gefahrstoffe'],
  [/In 15 Minuten legen Sie Ihre ersten 5 Gefahrstoffe an\./g, 'Legen Sie Ihre ersten 5 Gefahrstoffe kostenlos an.'],
  [/In 15 Minuten zum digitalen Verzeichnis/g, 'Schritt für Schritt zum digitalen Verzeichnis'],
  [/In 15 Minuten einsatzbereit\./g, 'Kostenlos starten – erste 5 Stoffe ohne Kreditkarte.'],
  [/Prüfungsvorbereitung in 15 Minuten/g, 'Prüfungsvorbereitung unterstützen'],
  [/in den nächsten 15 Minuten Ihre kritischsten Stoffe an/g, 'zuerst Ihre kritischsten Stoffe an'],
  [/Gefahrstoffe in 15 Minuten digitalisieren/g, 'Gefahrstoffe digital erfassen'],
  [/in unter 5 Minuten\./g, 'in der App.'],
  [/Erste 5 Gefahrstoffe kostenlos anlegen &mdash; in unter 5 Minuten\./g, 'Erste 5 Gefahrstoffe kostenlos anlegen.'],
  [/Erste 5 Gefahrstoffe kostenlos anlegen — in unter 5 Minuten\./g, 'Erste 5 Gefahrstoffe kostenlos anlegen.'],
  [/in Sekunden vorlegen/g, 'strukturiert vorlegen'],
  [/Jede Sekunde zählt — und ein QR-Code am Gefahrstoff kann Leben retten\./g, 'Ein QR-Code am Gefahrstoff erleichtert den Zugriff auf hinterlegte Informationen vor Ort.'],
  [/Jede Sekunde zählt — und ein QR-Code am Gefahrstoff kann Leben retten/g, 'Ein QR-Code erleichtert den Zugriff auf Gefahrstoffinformationen vor Ort'],
  [/Im Notfall zählt jede Sekunde\. Ein QR-Code am Gefahrstoffbehälter liefert Erste-Hilfe-Maßnahmen in unter 3 Sekunden — ohne Ordnersuche, ohne Wartezeit\./g, 'Im Notfall brauchen Ersthelfer schnell die hinterlegten SDB- und Betriebsanweisungs-Informationen – per QR-Scan am Arbeitsplatz, ohne Ordnersuche.'],
  [/sofort einsatzbereit/gi, 'zum Einstieg vorbereitet'],
  [/sofort handlungsfähig/gi, 'schneller informiert'],
  [/Sofortige Handlungssicherheit im Ernstfall/gi, 'Schneller Zugriff auf hinterlegte Informationen im Ernstfall'],
  [/sofortige Erste-Hilfe-Infos/gi, 'Erste-Hilfe-Angaben aus dem hinterlegten SDB'],
  [/Günstiger als das erste Bußgeld\./g, 'Planbarer als Excel-Pflege und Ordnerchaos.'],
  [/Günstiger als das erste Bußgeld/g, 'Planbarer als Excel-Pflege'],
  [/Kein Risiko\. Keine Kreditkarte\. Erste 5 Stoffe kostenlos\./g, 'Keine Kreditkarte. Erste 5 Stoffe kostenlos.'],
  [/Unbegrenzte Stoffe, automatische Warnungen, exportierbare PDFs\. Günstiger als das erste Bußgeld\./g, 'Unbegrenzte Stoffe, Erinnerungen an SDB-Revisionen, exportierbare PDFs.'],
  [/Was ein Bußgeld wirklich kostet/g, 'Ordnungswidrigkeiten nach GefStoffV: was Unternehmen wissen sollten'],
  [/1\.500 Euro Bußgeld für 3 veraltete Sicherheitsdatenblatt — das ist ein realistisches Szenario aus der Praxis\./g, 'Veraltete Sicherheitsdatenblätter können als Ordnungswidrigkeit geahndet werden (§ 22 GefStoffV) – je nach Schwere des Verstoßes.'],
  [/Bereits ein einziger Bußgeldbescheid übersteigt die Jahreskosten für den Pro-Plan von Gefahrstoff-QR um ein Vielfaches\./g, 'Die Kosten für Nachbesserung und interne Zeit steigen oft über die Software-Investition hinaus.'],
  [/„Nicht die Software kostet Geld — die Zeit, der Fehler und das Bußgeld kosten Geld\. Software ist die Investition, die all das verhindert\."/g, '„Nicht die Software ist der Hauptkostenfaktor — Zeit, Fehler und fehlende Nachweise binden Ressourcen. Software unterstützt Struktur und Aktualität.“'],
  [/das Bußgeld kosten Geld\. Software ist die Investition, die all das verhindert/g, 'fehlende Nachweise binden Ressourcen. Software unterstützt Struktur und Aktualität'],
  [/Bußgelder im vierstelligen Bereich/g, 'Ordnungswidrigkeiten nach § 22 GefStoffV'],
  [/direkter Bußgeldtatbestand/g, 'möglicher Ordnungswidrigkeit'],
  [/Nie wieder ein abgelaufenes SDB übersehen/g, 'Erinnerungen an SDB-Revisionen einrichten'],
  [/Bußgelder, Haftungsrisiko, Präventionslücke/g, 'Haftungsrisiko, Präventionslücke, fehlende Nachweise'],
  [/Ordnungswidrigkeit vermeiden: Was passiert, wenn das Sicherheitsdatenblatt älter als 3 Jahre ist\?/g, 'SDB-Revision: Was gilt, wenn das Sicherheitsdatenblatt älter als drei Jahre ist?'],
  [/4 Stunden pro Woche sparen/g, 'Routineaufwand im Verzeichnis reduzieren'],
  [/Wie SiFas mit digitalen Verzeichnissen 4 Stunden pro Woche sparen/g, 'Wie SiFas mit digitalen Verzeichnissen Routineaufwand reduzieren'],
  [/Mandanten in 15 Minuten migrieren/g, 'Mandanten schrittweise migrieren'],
  [/danach läuft es automatisch/g, 'danach bleibt die Freigabe bei der SiFa'],
  [/legt den Eintrag automatisch an/g, 'erstellt einen KI-gestützten Entwurf zum Prüfen'],
  [/Was danach passiert — automatisch/g, 'Was danach passiert — nach Ihrer Freigabe'],
  [/Was danach passiert &mdash; automatisch/g, 'Was danach passiert &mdash; nach Ihrer Freigabe'],
  [/Schritt 1: Registrieren \(5 Min\)/g, 'Schritt 1: Registrieren'],
  [/Schritt 2: Ersten Stoff anlegen \(2 Min\)/g, 'Schritt 2: Ersten Stoff anlegen'],
  [/Schritt 3: QR-Code drucken \(1 Min pro Stoff\)/g, 'Schritt 3: QR-Code drucken'],
  [/Schritt 4: Team informieren \(3 Min\)/g, 'Schritt 4: Team informieren'],
  [/vollständig einsatzbereit/gi, 'zum Einstieg vorbereitet'],
  [/Automatisches Gefahrstoffverzeichnis nach § 6 GefStoffV/g, 'KI-gestütztes Gefahrstoffverzeichnis (§ 6 GefStoffV) mit Freigabe-Workflow'],
  [/liest .* vollautomatisch aus/gi, 'unterstützt die Datenerfassung aus dem SDB'],
  [/Datenextraktion in Sekunden/g, 'KI-gestützte Datenerfassung'],
  [/spart aber 90% d/g, 'reduziert Abtippaufwand'],
  [/90% weniger Zeit pro Produkt/g, 'deutlich weniger manueller Aufwand pro Produkt'],
  [/90%\+ Reduktion/g, 'deutliche Reduktion'],
  [/85-90%/g, 'deutlich'],
  [/87-90%/g, 'deutlich'],
  [/99% Genauigkeit/g, 'hohe Trefferquote bei manueller Prüfung'],
  [/80% Kostenersparnis/g, 'potenzielle Kosteneinsparung'],
  [/Sparen Sie 60%/g, 'Kosten im Blick behalten'],
  [/bis zu 5% Jahresumsatz/g, 'Sanktionen nach ESPR-Rahmen'],
  [/Betriebsanweisungen in einer Minute erstellen/g, 'KI-gestützten Betriebsanweisungs-Entwurf (gemäß TRGS 555) zur fachlichen Freigabe erstellen'],
  [/Anlegen von Gefahrstoffen in 30 Sekunden/g, 'Gefahrstoffe per SDB-Upload anlegen'],
  [/Verzeichnis in 2 Minuten/g, 'Gefahrstoffverzeichnis digital aufbauen'],
  [/Vom Sicherheitsdatenblatt zum QR-Code in Sekunden/g, 'Vom Sicherheitsdatenblatt zum QR-Code'],
  [/extrahiert GHS-Piktogramme, H-\/P-Sätze und Schutzmaßnahmen in Sekunden/g, 'schlägt Kennzeichnung und Schutzmaßnahmen aus dem SDB als Entwurf vor'],
  [/Automatischer TRGS510 Check/g, 'Hinweise zu möglichen Lagerkonflikten (TRGS 510)'],
  [/Automatische TRGS-510-Prüfung mit Lagerkonflikt-Warnung/g, 'Hinweise auf mögliche Lagerkonflikte (TRGS 510)'],
  [/prüft, ob korrekt gelagert/g, 'weist auf mögliche Zusammenlagerungskonflikte hin'],
  [/sofortige Audit-Sicherheit/gi, 'bessere Nachweisführung für Audits'],
  [/Audit-Sicherheit/gi, 'Nachweisführung'],
  [/immer aktuell/gi, 'mit Revisionsverlauf gepflegt'],
  [/Erste Gefahrstoffe in wenigen Minuten anlegen/g, 'Erste Gefahrstoffe kostenlos anlegen'],
  [/Unwissenheit schützt vor Strafe nicht/g, 'Fehlende Dokumentation fällt in Prüfungen auf'],
  [/Jetzt 5-Minuten-Demo sichern/g, 'Pilot-Phase in der App testen'],
  [/schnell, sicher und ESPR-konform/g, 'strukturiert und ESPR-orientiert'],
  [/Arbeitsplatzgrenzwerte \(AGW\), Lagerklassen \(LGK\) nach TRGS 510, H-Sätze und Abfallschlüssel \(AVV\) per Hand abtippt/g, 'Pflichtfelder aus dem SDB per Hand abtippt'],
  [/Ein Zahlendreher beim Flammpunkt in der Liste kann das gesamte Brandschutzkonzept des Lagers verfälschen\./g, 'Tippfehler in SDB-Feldern können Lager- und Brandschutzplanung verfälschen.'],
  [/zieht weitgehend automatisch Hersteller, AGW, Lagerklasse und Piktogramme heraus/g, 'schlägt Hersteller, Kennzeichnung und Piktogramme aus dem SDB vor'],
  [/die nötige Schutzausrüstung \(PSA\) und die aktuelle Betriebsanweisung/g, 'Hinweise aus der freigegebenen Betriebsanweisung und dem SDB'],
  [/Mit Wasser abspülen\? Neutralisieren\? Augenspülung\? Wie lange\?/g, 'Welche Angaben gelten laut SDB Abschnitt 4?'],
  [/innerhalb von Minuten bleibende Schäden hinterlassen\. Die DGUV-Grundsätze für Erste Hilfe gehen davon aus, dass ein Ersthelfer innerhalb von maximal 3 Minuten handlungsfähig ist\. Wer in dieser Zeit erst den richtigen Ordner findet, hat bereits verloren\./g, 'Ersthelfer brauchen schnell die freigegebenen Informationen – ein QR-Scan am Arbeitsplatz erspart die Ordnersuche.'],
  [/Bußgelder bis 25\.000&nbsp;Euro sind im Gespräch, je nach Tatbestand und Schwere\./g, 'Bußgelder sind gesetzlich vorgesehen (§ 22 GefStoffV); Höhe und Tatbestand hängen vom Einzelfall ab.'],
  [/Die Spülzeit aus dem aktuellen SDB wäre länger/g, 'Die Erste-Hilfe-Angaben im aktuellen SDB waren geändert'],
  [/sofort vorlegbar/gi, 'schnell vorlegbar'],
  [/lückenlos dokumentiert/gi, 'nachvollziehbar dokumentiert'],
  [/in Minuten statt Stunden/g, 'schneller als mit Ordnern'],
  [/muss sofort aktualisiert werden/g, 'sollte zeitnah aktualisiert werden'],
  [/neuer AGW/g, 'geänderte Angaben im SDB'],
  [/Erste-Hilfe-Hinweise sofort verfügbar/g, 'Erste-Hilfe-Angaben aus dem SDB am Arbeitsplatz abrufbar'],
  [/10x effizienter als Excel/gi, 'strukturierter als Excel-Listen'],
  [/DSGVO-konform/g, 'Hosting in Deutschland (inkl. AVV)'],
  [/Sicherheitsdatenblätter automatisch auslesen/g, 'Sicherheitsdatenblätter KI-gestützt aus dem SDB übernehmen'],
  [/automatisch auslesen/gi, 'KI-gestützt aus dem SDB übernehmen'],
  [/in Sekunden parat/gi, 'direkt parat'],
  [/Extraktion<\/strong> in Sekunden/g, 'Extraktion</strong> aus dem SDB'],
  [/In einer Minute/g, 'Per KI-Entwurf'],
  [/in einer Minute/g, 'per KI-Entwurf'],
  [/So migrieren Sie Ihre Mandanten in 15 Minuten/g, 'So migrieren Sie Ihre Mandanten schrittweise'],
  [/In 15 Minuten zum digitalen Gefahrstoffverzeichnis/g, 'Schritt für Schritt zum digitalen Gefahrstoffverzeichnis'],
  [/ungefähr 15 Minuten\./g, 'überschaubarer Zeitaufwand.'],
  [/In 15 Minuten zum Einstieg vorbereitet\./g, 'Zum Einstieg vorbereitet.'],
  [/In 15 Minuten fertig/g, 'Schrittweise startklar'],
  [/Notfall-Ansicht in 3 Sekunden\./g, 'Notfall-Ansicht per QR-Scan.'],
  [/50% weniger Datenaufbereitung/g, 'Weniger manuelle Datenaufbereitung'],
  [/kann automatische Updates/g, 'kann Erinnerungen an SDB-Revisionen'],
  [/Betriebsanweisungen sowie Notfallinfos direkt am Arbeitsplatz bereitstellen/g, 'freigegebene Betriebsanweisungs-Entwürfe und SDB-Links am Arbeitsplatz bereitstellen'],
];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (EXT.has(path.extname(name))) out.push(full);
  }
  return out;
}

const files = [];
for (const rel of SCAN_ROOTS) files.push(...walk(path.join(ROOT, rel)));

let updated = 0;
for (const file of [...new Set(files)]) {
  let t = fs.readFileSync(file, 'utf8');
  let n = t;
  for (const [re, rep] of REPLACEMENTS) n = n.replace(re, rep);
  if (n !== t) {
    fs.writeFileSync(file, n);
    updated += 1;
    console.log('updated', path.relative(ROOT, file));
  }
}
console.log(`Done (${updated} file(s) changed).`);
