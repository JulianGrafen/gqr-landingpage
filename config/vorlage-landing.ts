/**
 * Lead-Magnet: Gratis Gefahrstoffverzeichnis Excel-Vorlage
 * URL: /gefahrstoffverzeichnis-excel-vorlage/
 */

export const VORLAGE_LANDING_PATH = '/gefahrstoffverzeichnis-excel-vorlage/';

/** Pfad zur XLSX */
export const VORLAGE_DOWNLOAD_FILE = '/downloads/gefahrstoffverzeichnis-vorlage.xlsx';

/** Lead-Endpoint: vorlage-lead-config.json (Google Apps Script Web-App-URL) */
export const VORLAGE_LEAD_CONFIG_PATH = '/vorlage-lead-config.json';

export const VORLAGE_LANDING_SEO = {
  title: 'Excel-Vorlage Gefahrstoffverzeichnis: Gratis Download | GQR',
  description:
    'Gratis Excel-Vorlage: Gefahrstoffverzeichnis für Audit & Gefährdungsbeurteilung. GefStoffV-konform, sofort downloaden.',
  ogImageAlt:
    'Gratis Excel-Vorlage Gefahrstoffverzeichnis — audit-tauglich für Gefährdungsbeurteilung nach GefStoffV',
} as const;

export const VORLAGE_GQR_BENEFITS = [
  {
    title: 'Automatische Sicherheitsdatenblatt-Extraktion',
    description: 'Nie wieder manuell tippen — KI liest Sicherheitsdatenblätter und füllt Pflichtfelder.',
  },
  {
    title: 'Rechtssichere Archivierung mit Prüfsummen',
    description: 'Revisionssichere Historie: jede Sicherheitsdatenblatt-Version nachvollziehBetriebsanweisungr für Audits und BG-Prüfungen.',
  },
  {
    title: 'QR-Code für Notfallinfos am Arbeitsplatz',
    description: 'H- und P-Sätze, Lagerklasse und Erste-Hilfe-Infos direkt am Einsatzort per Scan.',
  },
  {
    title: 'Mandanten- und Standortverwaltung',
    description: 'Komplexe Betriebskontexte: mehrere Standorte und Mandanten in einem Compliance-Cockpit.',
  },
] as const;
