/**
 * Lead-Magnet: Gratis Gefahrstoffverzeichnis Excel-Vorlage
 * URL: /gefahrstoffverzeichnis-excel-vorlage/
 */

export const VORLAGE_LANDING_PATH = '/gefahrstoffverzeichnis-excel-vorlage/';

/** Pfad zur XLSX — Datei vom Kunden noch einzubinden unter public/downloads/ */
export const VORLAGE_DOWNLOAD_FILE = '/downloads/gefahrstoffverzeichnis-vorlage.xlsx';

export const VORLAGE_LANDING_SEO = {
  title: 'Gefahrstoffverzeichnis Excel-Vorlage gratis | GQR',
  description:
    'Kostenlose Gefahrstoffverzeichnis-Vorlage Excel: rechtssicher für Audit & Gefährdungsbeurteilung. Sofort downloaden – Upgrade auf GQR möglich.',
  ogImageAlt:
    'Kostenlose Excel-Vorlage Gefahrstoffverzeichnis für Audit und Gefährdungsbeurteilung nach GefStoffV',
} as const;

export const VORLAGE_GQR_BENEFITS = [
  {
    title: 'Automatische SDB-Extraktion',
    description: 'Nie wieder manuell tippen — KI liest Sicherheitsdatenblätter und füllt Pflichtfelder.',
  },
  {
    title: 'Rechtssichere Archivierung mit Prüfsummen',
    description: 'Revisionssichere Historie: jede SDB-Version nachvollziehbar für Audits und BG-Prüfungen.',
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
