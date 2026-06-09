/**
 * Zentrale SEO-Texte (GSC-Strategie: Excel/Vorlage-Intent → SaaS-Upgrade).
 * Statische HTML-Seiten spiegeln diese Werte manuell in index.html bzw. gefahrstoffkataster-excel-vorlage/.
 */

export const SITE_URL = 'https://gefahrstoff-qr.de';

/** Homepage — Title 1 + Description 2 */
export const HOME_SEO = {
  title: 'Gefahrstoffkataster Software statt Excel | Gefahrstoff-QR',
  description:
    'Gefahrstoffkataster & App: Excel-Alternative mit KI-SDB-Import, QR-Notfallpass und Revisionsverlauf nach § 6. Kostenlos testen.',
  h1: 'Gefahrstoffkataster Software – die nächste Stufe nach Excel',
  heroSubline:
    'Statt fehleranfälliger Excel-Vorlagen: KI extrahiert SDB-Daten automatisch, führt Ihr Verzeichnis revisionssicher und spart Stunden Abtipp-Arbeit.',
  softwareDescription:
    'Gefahrstoffkataster Software: KI extrahiert Sicherheitsdatenblätter automatisch — die nächste Stufe nach Excel mit revisionssicherem Verzeichnis, Revisionsverlauf und QR-Notfallpass inklusive.',
} as const;

/** Expert-Landing Excel-Intent — Title 2 + Description 1 */
export const EXCEL_VORLAGE_SEO = {
  path: '/gefahrstoffkataster-excel-vorlage/',
  title: 'Gefahrstoffverzeichnis: Schluss mit Excel-Vorlagen | GQR',
  description:
    'Excel Gefahrstoffverzeichnis-Vorlage: Grenzen bei Revisionen und Prüfungen – KI-Kataster als nächster Schritt nach § 6.',
  ogImageAlt:
    'Gefahrstoffverzeichnis Software statt Excel-Vorlage – KI-SDB-Extraktion und digitales Kataster',
  h1: 'Gefahrstoffverzeichnis: Von der Excel-Vorlage zur KI-gestützten Software',
} as const;

/** Next.js-Default / Branchen-Unterseiten — Title 3 + Description 3 */
export const SITE_DEFAULT_SEO = {
  title: 'Digitales Gefahrstoffkataster – SDB per KI, nicht Excel',
  description:
    'Digitales Gefahrstoffkataster: KI-SDB-Import, Revisionsverlauf und QR-Notfallpass statt fehleranfälliger Excel-Listen.',
} as const;

export const GSC_TARGET_KEYWORDS = [
  'gefahrstoffkataster software',
  'gefahrstoffkataster excel',
  'gefahrstoffverzeichnis vorlage excel',
  'gefahrstoff app',
  'gefahrstoffverzeichnis excel',
  'gefahrstoffkataster software kostenlos',
  'gefahrstoffkataster erstellen lassen',
  'gefahrstoffkataster vorlage',
] as const;
