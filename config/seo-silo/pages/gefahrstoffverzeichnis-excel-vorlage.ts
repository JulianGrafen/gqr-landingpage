import type { SeoSiloPageConfig } from '@/config/seo-silo/types';
import { VORLAGE_LANDING_PATH } from '@/config/vorlage-landing';

export const EXCEL_VORLAGE_SILO_CONFIG: SeoSiloPageConfig = {
 slug: 'gefahrstoffverzeichnis-excel-vorlage',
 path: VORLAGE_LANDING_PATH,
 intent: 'excel-intercept',
 seo: {
 title: 'Gefahrstoffverzeichnis Excel-Vorlage: Gratis Download & Grenzen | GQR',
 description:
 'Gratis Excel-Vorlage für § 6 GefStoffV und TRGS 400 — plus faktenbasiert, warum Tabellen bei BG-Audits scheitern und wann digitales Gefahrstoffmanagement sinnvoller ist.',
 ogImageAlt:
 'Excel-Vorlage Gefahrstoffverzeichnis — audit-tauglicher Einstieg und Upgrade zu Gefahrstoff-QR',
 canonicalPath: VORLAGE_LANDING_PATH,
 },
 breadcrumb: [
 { label: 'Start', href: '/' },
 { label: 'Excel-Vorlage Gefahrstoffverzeichnis', href: VORLAGE_LANDING_PATH },
 ],
 hero: {
 eyebrow: 'Gratis Excel-Vorlage · § 6 GefStoffV · TRGS 400',
 h1: 'Gefahrstoffverzeichnis Excel-Vorlage — strukturiert starten, Grenzen kennen',
 lead:
 'Sie suchen eine Vorlage für Ihr Gefahrstoffverzeichnis? Unsere XLSX deckt die Pflichtfelder ab, die SiFa und Prüfer typischerweise erwarten — als pragmatischer Einstieg vor dem nächsten BG-Audit.',
 proofLine:
 'Wichtig vorab: Excel erfüllt die Informationspflicht nach § 6 GefStoffV nicht automatisch. Ohne revisionssichere Sicherheitsdatenblatt-Historie und nachvollziehbare Änderungen riskieren Betriebe Nachweise bei Behörden- und BG-Kontrollen — besonders seit der CLP-Anpassungspflicht für Gemische (Übergangsfrist bis Mai 2026).',
 primaryCta: {
 label: 'Gratis Vorlage sichern',
 href: '#vorlage-download',
 external: false,
 },
 trustBullets: [
 'Keine Kreditkarte',
 'Sofort in Excel nutzbar',
 'Struktur für Gefährdungsbeurteilung nach TRGS 400',
 ],
 },
 features: {
 sectionTitle: 'Was die Vorlage abdeckt — und was Sie selbst pflegen müssen',
 sectionSubline:
 'Die XLSX ersetzt keine Sicherheitsfachkraft. Sie liefert Spalten und Logik für den Start — die inhaltliche Pflege bleibt bei Ihnen.',
 items: [
 {
 id: 'pflichtfelder',
 title: 'Pflichtfelder nach § 6 GefStoffV',
 description:
 'Produktbezeichnung, Hersteller, H- und P-Sätze, Verwendungszweck, Lagerort und Mengen — strukturiert statt freier Zellen.',
 },
 {
 id: 'trgs400',
 title: 'Bezug zur Gefährdungsbeurteilung (TRGS 400)',
 description:
 'Das Verzeichnis ist die Datenbasis für die GB chemischer Stoffe. Die Vorlage trennt Erfassung und Bewertungsschritte nachvollziehbar.',
 },
 {
 id: 'trgs510',
 title: 'Lagerklassen-Spalte für TRGS 510',
 description:
 'Platz für Lagerklassen und Hinweise zur Zusammenlagerung — die eigentliche Konfliktprüfung erfolgt bei Ihnen manuell oder in GQR automatisch.',
 },
 {
 id: 'unterweisung',
 title: 'Unterweisungs-Referenz (§ 14 GefStoffV)',
 description:
 'Spalte für letzte Unterweisung und Verantwortliche — Excel warnt nicht, wenn der jährliche Unterweisungsrhythmus reißt.',
 },
 ],
 },
 faq: [
 {
 question: 'Reicht eine Excel-Vorlage für ein rechtssicheres Gefahrstoffverzeichnis?',
 answer:
 'Als Übergangslösung für wenige Stoffe ja — als dauerhaftes System selten. § 6 GefStoffV verlangt aktuelle Informationen aus Sicherheitsdatenblättern. Excel speichert keine revisionssichere Historie: Wer welche Zelle wann geändert hat, lässt sich bei Audits kaum belegen. Fehlt die Sicherheitsdatenblatt-Version hinter einem Eintrag, entsteht Haftungsrisiko — nicht wegen der Vorlage, sondern wegen fehlender Nachweiskette.',
 },
 {
 question: 'Warum scheitern Betriebe bei BG-Kontrollen trotz Excel-Liste?',
 answer:
 'Typische Mängel: veraltete Sicherheitsdatenblatt-PDFs ohne Bezug zur Tabellenzeile, fehlende Dokumentation von Rezepturänderungen, keine Historie bei CLP-Umstellung (H-/P-Sätze bis Mai 2026 für Gemische), fehlende Unterweisungsnachweise nach § 14 GefStoffV. Prüfer fragen nicht nach der Dateiendung — sie prüfen Nachvollziehbarkeit und Aktualität.',
 },
 {
 question: 'Was muss in die Gefährdungsbeurteilung nach TRGS 400 einfließen?',
 answer:
 'Die GB chemischer Arbeitsstoffe baut auf dem Verzeichnis auf: Exposition, Mengen, Verwendungsart, Schutzmaßnahmen, Substitution. Die Excel-Vorlage hilft bei der Stoffliste — die Bewertung und Dokumentation der Maßnahmen bleiben separate Pflichten. Word-Vorlagen für Betriebsanweisungen kosten SiFa oft hunderte Stunden pro Jahr, wenn Daten aus dem Sicherheitsdatenblatt erneut abgetippt werden.',
 },
 {
 question: 'Ab wann lohnt sich Gefahrstoff-QR statt Excel?',
 answer:
 'Faustregel ab 15–20 Stoffen, mehreren Standorten oder wechselnden Lieferanten: Dann übersteigt die manuelle Pflege die Softwarekosten. GQR extrahiert Daten aus dem Sicherheitsdatenblatt per KI, führt ein Aktivitätsprotokoll und prüft TRGS-510-Lagerkonflikte — mit QR-Notfallpass am Gebinde für Ersthelfer.',
 },
 {
 question: 'Ist die Vorlage kostenlos und DSGVO-konform?',
 answer:
 'Ja. Der Download ist unverbindlich, ohne Kreditkarte. Für den Versand benötigen wir Ihre E-Mail; Verarbeitung gemäß Datenschutzerklärung. Sie erhalten die XLSX und optional praxisnahe Hinweise zum Gefahrstoffmanagement — Abmeldung jederzeit.',
 },
 {
 question: 'Wie geht es nach dem Excel-Start mit GQR weiter?',
 answer:
 'Viele Betriebe nutzen die Vorlage für die Erstaufnahme und wechseln bei wachsendem Bestand zu GQR: Sicherheitsdatenblatt hochladen, Felder prüfen, Verzeichnis exportieren — ohne erneutes Abtippen. Der kostenlose Einstieg umfasst die ersten Stoffe ohne Zahlungsdaten.',
 },
 ],
 closingCta: {
 headline: 'Excel war der Start — GQR hält Sie audit-sicher',
 subline:
 'Wenn Sicherheitsdatenblatt-Revisionen, CLP-Anpassungen und BG-Nachweise mehr Zeit kosten als Ihre SiFa einplanen kann: testen Sie die automatisierte Alternative.',
 primaryCta: {
 label: 'GQR kostenlos testen',
 href: 'https://app.gefahrstoff-qr.de/register',
 external: true,
 },
 disclaimer: 'Unverbindlich · Keine Kreditkarte · KI-Sicherheitsdatenblatt-Import',
 },
};

/** Vergleichstabelle — Excel vs. GQR für Seite 1 */
export const EXCEL_VORLAGE_COMPARISON = {
 targetAudience: 'Betriebe mit Excel-Vorlage oder Tabellenkalkulation',
 rows: [
 {
 criterion: 'Sicherheitsdatenblatt-Historie & Revisionssicherheit',
 manual: 'Dateiversionen auf Laufwerk — keine gerichtsfeste Änderungskette',
 gqr: 'Aktivitätsprotokoll: wer, wann, welche Sicherheitsdatenblatt-Felder geändert hat',
 },
 {
 criterion: 'CLP-Anpassung (Gemische bis Mai 2026)',
 manual: 'H-/P-Sätze manuell in jeder Zeile nachziehen',
 gqr: 'Extraktion aus aktuellem Sicherheitsdatenblatt — tagesaktuelle P-Sätze im Verzeichnis',
 },
 {
 criterion: 'TRGS 510 Zusammenlagerung',
 manual: 'Matrix manuell — Konflikte leicht übersehen',
 gqr: 'Lagerklassen-Check mit Warnung pro Lagerort',
 },
 {
 criterion: 'BG- und Behördenaudit',
 manual: 'Export ohne Herkunftsnachweis der Daten',
 gqr: 'One-Click-Export mit Sicherheitsdatenblatt-Bezug und Dokumentation',
 },
 {
 criterion: 'Information am Arbeitsplatz',
 manual: 'Sicherheitsdatenblatt im Büro — am Regal nicht abrufbar',
 gqr: 'QR-Notfallpass: GHS, Erste-Hilfe, P-Sätze per Scan am Gebinde',
 },
 ],
} as const;
