import type { SeoSiloPageConfig, SeoSiloStep } from '@/config/seo-silo/types';

export const KATASTER_ERSTELLEN_SILO_PATH = '/wissen/gefahrstoffkataster-erstellen/';

export const KATASTER_ERSTELLEN_STEPS: SeoSiloStep[] = [
 {
 id: 'struktur',
 number: 1,
 title: 'Betriebsstruktur abbilden',
 regulatoryRef: 'Organisation',
 description:
 'Erfassen Sie Standorte, Werke, Abteilungen, Arbeitsbereiche und Lagerorte — so wie sie physisch existieren. Ohne diese Hierarchie wird jedes Verzeichnis zur flachen Liste, die bei Audits nicht erklärbar ist.',
 gqrHint:
 'Werkstrennung mit Compliance-KPIs pro Bereich — mehrere Standorte und Mandanten in einer Struktur.',
 },
 {
 id: 'verzeichnis',
 number: 2,
 title: 'Stoffe erfassen — Verzeichnis nach § 6 GefStoffV',
 regulatoryRef: '§ 6 GefStoffV · Informationsermittlung',
 description:
 'Pro Stoff: Produktbezeichnung, Hersteller, Verwendungszweck, Mengen, Lagerort, H-/P-Sätze und Bezug zum aktuellen Sicherheitsdatenblatt. Die Informationsermittlung ist Pflicht — nicht die Tabellenform.',
 gqrHint:
 'Sicherheitsdatenblatt-PDF hochladen, KI extrahiert Pflichtfelder — Sie prüfen und geben frei statt abzutippen.',
 },
 {
 id: 'gb',
 number: 3,
 title: 'Gefährdungsbeurteilung chemischer Stoffe',
 regulatoryRef: 'TRGS 400',
 description:
 'Auf Basis des Verzeichnisses bewerten Sie Exposition, Mengen, Verwendungsart, Schutzmaßnahmen und Substitution. Das Verzeichnis allein ist keine GB — aber ohne aktuelles Verzeichnis ist die GB nicht belastbar.',
 gqrHint:
 'Strukturierte Stoffdaten aus dem Kataster als GB-Grundlage — weniger Excel-Fragmente, klarer Sicherheitsdatenblatt-Bezug.',
 },
 {
 id: 'lagerung',
 number: 4,
 title: 'Lagerung prüfen — TRGS 510',
 regulatoryRef: 'TRGS 510',
 description:
 'Lagerklassen zuordnen und Zusammenlagerung prüfen. Konflikte zwischen Stoffen im selben Regal sind ein häufiger Mangel bei Feuerwehr- und Umweltbegehungen — Excel erkennt sie nicht zuverlässig.',
 gqrHint:
 'Automatische Lagerkonflikt-Warnung pro Lagerort mit Regeltext — statt manueller Matrix.',
 },
 {
 id: 'ba',
 number: 5,
 title: 'Betriebsanweisungen erstellen und bereitstellen',
 regulatoryRef: 'TRGS 555',
 description:
 'Betriebsspezifische Ergänzungen zu Daten aus dem Sicherheitsdatenblatt: Schutzausrüstung, Arbeitsverfahren, Notfallmaßnahmen am Einsatzort. Word-Vorlagen ohne Sicherheitsdatenblatt-Verknüpfung kosten SiFa hunderte Stunden pro Jahr.',
 gqrHint:
 'Betriebsanweisung-Grundlage aus Sicherheitsdatenblatt-Feldern — Ergänzungsmaske für betriebsspezifische Inhalte, digital am Gebinde abrufbar.',
 },
 {
 id: 'unterweisung',
 number: 6,
 title: 'Unterweisen und nachweisen',
 regulatoryRef: '§ 14 GefStoffV',
 description:
 'Beschäftigte müssen über Gefahren und Schutzmaßnahmen unterwiesen werden — bei Einstellung, bei wesentlichen Änderungen, mindestens jährlich. Nachweis führen: wer, wann, welcher Stoff.',
 gqrHint:
 'Aktuelle Stoffinfos per QR am Arbeitsplatz — Unterweisung baut auf demselben Datenstand wie das Verzeichnis.',
 },
];

export const KATASTER_ERSTELLEN_SILO_CONFIG: SeoSiloPageConfig = {
 slug: 'gefahrstoffkataster-erstellen',
 path: KATASTER_ERSTELLEN_SILO_PATH,
 intent: 'how-to-guide',
 seo: {
 title: 'Gefahrstoffkataster erstellen: Schritt-für-Schritt nach TRGS | GQR',
 description:
 'Gefahrstoffkataster erstellen nach § 6 GefStoffV, TRGS 400, TRGS 510 und § 14 — How-To mit Checkliste und GQR als Beschleuniger statt Excel-Chaos.',
 ogImageAlt:
 'Gefahrstoffkataster erstellen — Schrittfolge von Verzeichnis bis Unterweisung mit Gefahrstoff-QR',
 canonicalPath: KATASTER_ERSTELLEN_SILO_PATH,
 },
 breadcrumb: [
 { label: 'Start', href: '/' },
 { label: 'Wissen', href: '/wissen/' },
 { label: 'Gefahrstoffkataster erstellen', href: KATASTER_ERSTELLEN_SILO_PATH },
 ],
 hero: {
 eyebrow: 'How-To · TRGS 400 · § 6 GefStoffV · § 14 GefStoffV',
 h1: 'Gefahrstoffkataster erstellen — in der richtigen Reihenfolge',
 lead:
 'Wer „Gefahrstoffkataster erstellen“ sucht, braucht keine Marketing-Checkliste, sondern eine belastbare Schrittfolge: Verzeichnis, Gefährdungsbeurteilung, Lagerung, Betriebsanweisung, Unterweisung — mit Nachweisen, die Audits standhalten.',
 proofLine:
 'Typischer Fehler: mit Excel starten, GB vergessen, Betriebsanweisung in Word parallel pflegen — nach dem ersten Lieferantenwechsel sind Verzeichnis, Sicherheitsdatenblatt und Unterweisungsnachweis nicht mehr synchron. CLP-Anpassungen bis Mai 2026 verschärfen das.',
 primaryCta: {
 label: 'Mit GQR starten',
 href: 'https://app.gefahrstoff-qr.de/register',
 external: true,
 },
 secondaryCta: {
 label: 'Zur Schrittfolge',
 href: '#schritte',
 external: false,
 },
 trustBullets: [
 '6 Schritte nach TRGS-Logik',
 'Revisionssicher von Anfang an',
 'Kostenloser Einstieg ohne Kreditkarte',
 ],
 },
 features: {
 sectionTitle: 'Was in jedem Schritt dokumentiert sein muss',
 sectionSubline:
 'Pflichtinhalte kompakt — ohne Anspruch auf Vollständigkeit aller Einzelfragen Ihrer SiFa.',
 items: [
 {
 id: 'sdb-bezug',
 title: 'Sicherheitsdatenblatt-Bezug je Stoff',
 description:
 'Jeder Katastereintrag muss auf ein aktuelles Sicherheitsdatenblatt zurückführbar sein — Version und Datum nachweisbar.',
 },
 {
 id: 'historie',
 title: 'Änderungshistorie',
 description:
 'Wer wann welche Daten geändert hat — bei Unfällen und BG-Kontrollen entscheidend, in Excel praktisch nicht lösbar.',
 },
 {
 id: 'lagerklassen',
 title: 'Lagerklassen & Konflikte',
 description:
 'TRGS 510 verlangt sachgerechte Lagerung — dokumentierte Prüfung der Zusammenlagerung, nicht nur Spalte „Lagerort“.',
 },
 {
 id: 'ba-link',
 title: 'Betriebsanweisung am Einsatzort',
 description:
 'Betriebsanweisung muss für Beschäftigte verfügbar sein — Ausdruck oder digital, aber aktuell und auffindbar.',
 },
 ],
 },
 faq: [
 {
 question: 'Muss ich zuerst das Verzeichnis oder die Gefährdungsbeurteilung erstellen?',
 answer:
 'Das Verzeichnis nach § 6 GefStoffV ist die Datenbasis — die Gefährdungsbeurteilung nach TRGS 400 baut darauf auf. Ohne vollständiges, aktuelles Verzeichnis fehlen der GB belastbare Eingangsdaten. In der Praxis parallel starten ist möglich, aber die GB darf nicht auf unvollständigen Listen basieren.',
 },
 {
 question: 'Reicht Excel zum Gefahrstoffkataster erstellen?',
 answer:
 'Als Erstaufsetzen mit wenigen Stoffen zeitweise ja — als dauerhaftes System selten. Excel ist nicht revisionssicher, warnt nicht bei Sicherheitsdatenblatt-Updates und verknüpft keine PDF-Historie. Nach dem ersten Audit mit Beanstandungen suchen viele Betriebe Software — siehe auch unsere Excel-Vorlage als Übergang.',
 },
 {
 question: 'Was gehört mindestens ins Gefahrstoffverzeichnis?',
 answer:
 'Mindestens: Bezeichnung des Stoffs, Hersteller/Lieferant, Verwendungszweck, Mengen oder Mengenbereiche, Arbeits-/Lagerbereich, Kennzeichnung (H-/P-Sätze, GHS), Bezug zum Sicherheitsdatenblatt. Ergänzend je Betrieb: KMR-Hinweise, Substitutionsprüfung, Unterweisungsstatus.',
 },
 {
 question: 'Wie oft muss das Kataster aktualisiert werden?',
 answer:
 'Bei jedem neuen Stoff, jeder Sicherheitsdatenblatt-Revision, Rezepturänderung, Standortwechsel oder nach wesentlichen GB-Anpassungen. Statische Jahresaktualisierung reicht nicht — § 6 verlangt aktuelle Information, nicht eine einmalige Liste.',
 },
 {
 question: 'Kann ich das Kataster extern erstellen lassen?',
 answer:
 'Ja, bei komplexem Erstaufsetzen — liefert aber oft nur eine Momentaufnahme. Ohne laufenden Prozess veralten extern erstellte Kataster genauso schnell wie Excel. Vergleich: Leitfaden „Kataster erstellen lassen“ unter Wissen.',
 },
 {
 question: 'Wo beschleunigt GQR den Ablauf konkret?',
 answer:
 'Schritt 2 und 4: Sicherheitsdatenblatt-Import per KI, Lagerkonflikt-Prüfung, Aktivitätsprotokoll, QR-Abruf für Betriebsanweisung und Notfallinfos. SiFa-Zeit fließt in Freigabe und Bewertung — nicht in Abtippen und Ordnerpflege.',
 },
 ],
 closingCta: {
 headline: 'Kataster erstellen — einmal richtig statt dreimal nacharbeiten',
 subline:
 'Starten Sie mit Ihren echten Sicherheitsdatenblätter im kostenlosen Test. Schrittfolge oben, Beschleuniger in GQR.',
 primaryCta: {
 label: 'GQR kostenlos testen',
 href: 'https://app.gefahrstoff-qr.de/register',
 external: true,
 },
 disclaimer: 'Unverbindlich · Keine Kreditkarte · Revisionssicheres Aktivitätsprotokoll',
 },
};

export const KATASTER_ERSTELLEN_COMPARISON = {
 targetAudience: 'SiFa und Betriebsleitung beim Erstaufsetzen',
 rows: [
 {
 criterion: 'Schritt 2: Stoffe erfassen',
 manual: 'Sicherheitsdatenblatt öffnen, Felder abtippen — 15–20 Min. pro Stoff',
 gqr: 'Upload, KI-Extraktion, Freigabe — wenige Minuten',
 },
 {
 criterion: 'Schritt 4: TRGS 510',
 manual: 'Matrix manuell, Konflikte leicht übersehen',
 gqr: 'Automatische Warnung pro Lagerort',
 },
 {
 criterion: 'Schritt 5: Betriebsanweisung',
 manual: 'Word-Vorlage pro Stoff neu befüllen',
 gqr: 'Sicherheitsdatenblatt-Felder als Betriebsanweisung-Grundlage, Ergänzung im System',
 },
 {
 criterion: 'Nachweiskette',
 manual: 'Excel + Ordner + Word — drei Quellen',
 gqr: 'Ein Kataster mit Protokoll und Export',
 },
 {
 criterion: 'Nach Lieferantenwechsel',
 manual: 'Alles manuell nachziehen — Fehlerquote steigt',
 gqr: 'Neues Sicherheitsdatenblatt hochladen, Diff sichtbar',
 },
 ],
} as const;
