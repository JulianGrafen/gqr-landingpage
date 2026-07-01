import type { SeoSiloPageConfig } from '@/config/seo-silo/types';

export const GEFAHrstoff_APP_SILO_PATH = '/gefahrstoff-app/';

export const GEFAHrstoff_APP_SILO_CONFIG: SeoSiloPageConfig = {
 slug: 'gefahrstoff-app',
 path: GEFAHrstoff_APP_SILO_PATH,
 intent: 'mobile-app',
 seo: {
 title: 'Gefahrstoff App: QR-Scan am Gebinde & Notfallinfos | GQR',
 description:
 'Gefahrstoff App für Werkstatt und Baustelle: QR-Code am Fass scannen, GHS, P-Sätze und Erste-Hilfe sofort — § 6 GefStoffV Information am Arbeitsplatz.',
 ogImageAlt:
 'Gefahrstoff App Gefahrstoff-QR — mobile Notfallansicht mit GHS-Piktogrammen am Einsatzort',
 canonicalPath: GEFAHrstoff_APP_SILO_PATH,
 },
 breadcrumb: [
 { label: 'Start', href: '/' },
 { label: 'Gefahrstoff App', href: GEFAHrstoff_APP_SILO_PATH },
 ],
 hero: {
 eyebrow: 'Mobil am Einsatzort · QR-Notfallpass · § 6 GefStoffV',
 h1: 'Gefahrstoff App — Information dort, wo Unfälle passieren',
 lead:
 'Ein Sicherheitsdatenblatt auf dem Büro-Server schützt niemanden am Regal. Mit Gefahrstoff-QR scannen Beschäftigte und Ersthelfer den QR-Code am Gebinde und sehen sofort GHS-Kennzeichnung, P-Sätze und Erste-Hilfe-Maßnahmen auf dem Smartphone.',
 proofLine:
 'Pflicht aus TRGS 400: Beschäftigte müssen wirksam informiert werden — nicht irgendwann, sondern am Arbeitsplatz. Wer im Ernstfall erst Ordner sucht, verliert Sekunden mit Haftungsfolgen.',
 primaryCta: {
 label: 'GQR kostenlos testen',
 href: 'https://app.gefahrstoff-qr.de/register',
 external: true,
 },
 secondaryCta: {
 label: 'Scan-Demo ansehen',
 href: '#qr-scan-demo',
 external: false,
 },
 trustBullets: [
 'Kein App-Store-Zwang — mobil im Browser',
 'Notfallinfos in Sekunden',
 'Betriebsanweisung digital am Gebinde',
 ],
 },
 features: {
 sectionTitle: 'Was eine Gefahrstoff-App am Arbeitsplatz leisten muss',
 sectionSubline:
 'Checkliste für Lager, Werkstatt und Baustelle — abgeleitet aus § 6 GefStoffV, TRGS 400 und Ersthelfer-Praxis.',
 items: [
 {
 id: 'qr-scan',
 title: 'QR-Scan am Gebinde',
 description:
 'Code am Fass, Kanister oder Regal — kein Suchen in Ordnern. Verknüpfung direkt zur tagesaktuellen Stoffansicht.',
 },
 {
 id: 'ghs',
 title: 'GHS, H- und P-Sätze sofort',
 description:
 'Kennzeichnung und Handlungshinweise aus dem hinterlegten Sicherheitsdatenblatt — relevant bei CLP-Anpassungen bis Mai 2026.',
 },
 {
 id: 'erste-hilfe',
 title: 'Erste-Hilfe für Ersthelfer',
 description:
 'Maßnahmen nach Sicherheitsdatenblatt Abschnitt 4 — strukturiert statt Blättern in 15-seitigen PDFs unter Zeitdruck.',
 },
 {
 id: 'ba',
 title: 'Betriebsanweisung greifbar',
 description:
 'Digitale Betriebsanweisung am Einsatzort statt ausgedruckter Word-Version, die seit dem letzten Lieferantenwechsel veraltet ist.',
 },
 {
 id: 'kataster-mobil',
 title: 'Kataster mobil durchsuchen',
 description:
 'SiFa und Vorarbeiter prüfen Stoffe, Lagerorte und Sicherheitsdatenblatt-Status unterwegs — nicht nur am Desktop.',
 },
 {
 id: 'notruf',
 title: 'Notfall-Kontext',
 description:
 'Signalwort, Herstellerkontakt und relevante Schutzmaßnahmen gebündelt — für Ersthelfer und Einsatzleitung.',
 },
 ],
 },
 faq: [
 {
 question: 'Brauchen Mitarbeiter eine native App aus dem Store?',
 answer:
 'Nein. GQR läuft mobil im Browser — QR-Code scannen, Stoffansicht öffnen. Das senkt die Hürde auf Baustellen und in Werkstätten, wo keine zentrale App-Verteilung existiert. Voraussetzung ist Netzempfang am Scan-Ort für den Abruf der hinterlegten Daten.',
 },
 {
 question: 'Reicht ein Sicherheitsdatenblatt-Ausdruck im Ordner am Lager?',
 answer:
 'Als Minimum oft vorhanden — aber unzureichend bei Rezepturwechsel, fehlenden Revisionen oder wenn der Ordner nicht am exakten Einsatzort liegt. § 6 GefStoffV verlangt aktuelle Information. Ein veralteter Ausdruck ist bei Unfällen ein Haftungsthema — unabhängig davon, ob ein neueres Sicherheitsdatenblatt irgendwo auf dem Server liegt.',
 },
 {
 question: 'Wie hilft die App Ersthelfern im Ernstfall?',
 answer:
 'Scan am betroffenen Gebinde → strukturierte Notfallansicht mit GHS, Erste-Hilfe-Maßnahmen und P-Sätzen. Ziel: keine Suche im Büro, kein Blättern in PDFs. Ersthelfer handeln nach sichtbaren Maßnahmen — Geschwindigkeit reduziert Schaden.',
 },
 {
 question: 'Funktioniert das auf der Baustelle und in der Werkstatt?',
 answer:
 'Ja, überall wo ein QR-Code am Gebinde oder Regal angebracht ist und mobiles Netz verfügbar ist. Typische Einsätze: Lackiererei, Kfz-Werkstatt, Baucontainer-Lager, Reinigungsmittel in Gebäudereinigung. Die Information folgt dem Stoff — nicht dem Standort des Papierordners.',
 },
 {
 question: 'Was ist der Unterschied zur Gefahrstoffkataster-Software?',
 answer:
 'Das Kataster ist das Compliance-Rückgrat — die App-Ansicht ist der Abruf vor Ort. GQR verbindet beides: SiFa pflegt zentral per KI-Sicherheitsdatenblatt-Import, Mitarbeiter und Ersthelfer nutzen mobilen QR-Zugang. Wer nur ein Desktop-Verzeichnis hat, löst den Einsatzort nicht.',
 },
 {
 question: 'Wie starte ich mit QR-Codes am Gebinde?',
 answer:
 'Stoff im Kataster anlegen, Sicherheitsdatenblatt importieren, QR-Label generieren und am Gebinde anbringen. Im kostenlosen Test können Sie den Workflow mit ersten Stoffen prüfen — ohne Kreditkarte.',
 },
 ],
 closingCta: {
 headline: 'Sicherheit am Regal — nicht im Server-Raum',
 subline:
 'Testen Sie QR-Notfallpass und mobile Stoffansicht mit Ihren realen Gebinden.',
 primaryCta: {
 label: 'Jetzt kostenlos starten',
 href: 'https://app.gefahrstoff-qr.de/register',
 external: true,
 },
 disclaimer: 'Unverbindlich · Keine Kreditkarte · QR-Labels aus dem Kataster',
 },
};

export const GEFAHrstoff_APP_COMPARISON = {
 targetAudience: 'Werkstatt, Baustelle und Lager mit mobilem Gefahrstoffeinsatz',
 rows: [
 {
 criterion: 'Information am Einsatzort',
 manual: 'Sicherheitsdatenblatt-Ordner im Büro oder veralteter Ausdruck am Regal',
 gqr: 'QR-Scan am Gebinde — aktuelle Ansicht auf dem Smartphone',
 },
 {
 criterion: 'Ersthelfer-Reaktionszeit',
 manual: 'Suchen, blättern, Rückfrage an SiFa — Minuten Verzug',
 gqr: 'Notfallscreen in Sekunden nach Scan',
 },
 {
 criterion: 'Aktualität bei Sicherheitsdatenblatt-Wechsel',
 manual: 'Neuer Ausdruck vergessen — alte H-/P-Sätze am Regal',
 gqr: 'Zentrale Pflege, mobile Ansicht folgt dem Kataster',
 },
 {
 criterion: 'Betriebsanweisung vor Ort',
 manual: 'Word-Ausdruck, oft nicht am Gebinde',
 gqr: 'Digitale Betriebsanweisung über dieselbe QR-Verknüpfung erreichbar',
 },
 {
 criterion: 'Baustelle / wechselnde Standorte',
 manual: 'Ordner pro Container — Pflege skaliert schlecht',
 gqr: 'QR am Gebinde wandert mit dem Stoff',
 },
 ],
} as const;
