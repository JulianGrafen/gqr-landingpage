/**
 * Zentrale AEO-Konfiguration (Answer Engine Optimization).
 * Single Source of Truth für Entitätsbeschreibung, Zielgruppen, Funktionsbegriffe, Trust-Signale
 * und wichtige URLs. Konsumenten: SoftwareApplication JSON-LD, /llms.txt, /pricing.md und die
 * statisch gerenderten Startseiten-Sektionen (scripts/sync-home-aeo.tsx).
 *
 * Copy-Regeln (UWG, § 14 BGB, AGENTS.md): kein "rechtssicher", keine Zeitversprechen, keine absoluten
 * Garantien, keine Gedankenstriche. KI-Ergebnisse sind immer Entwürfe zur fachlichen Freigabe.
 */
import { SITE_URL } from '@/config/site-seo';

export const APP_URL = 'https://app.gefahrstoff-qr.de';
export const APP_REGISTER_URL = `${APP_URL}/register`;
export const APP_LOGIN_URL = `${APP_URL}/login`;
export const CONTACT_EMAIL = 'info@gefahrstoff-qr.de';

/** Stand der AEO-Inhalte (dateModified, llms.txt); bei inhaltlichen Änderungen anpassen. */
export const AEO_CONTENT_UPDATED = '2026-11-09';

/** Pflichtformulierung Human-in-the-Loop (AGENTS.md, § 14 GefStoffV). */
export const HUMAN_IN_THE_LOOP_NOTICE =
  'Jeder KI-gestützte Entwurf (gemäß TRGS 555) ist eine Vorprüfung zur fachlichen Freigabe durch die SiFa / den Arbeitgeber (§ 14 GefStoffV).';

/** B2B-Einschränkung des Angebots. */
export const B2B_NOTICE =
  'Das Angebot richtet sich ausschließlich an Unternehmen, Gewerbetreibende und freiberufliche Sicherheitsfachkräfte (§ 14 BGB).';

export const PRODUCT_ENTITY = {
  name: 'Gefahrstoff-QR',
  url: `${SITE_URL}/`,
  /** Zitierfähige Kurzdefinition (Entity Summary), erster Satz nennt Marke und Kategorie. */
  summary:
    'Gefahrstoff-QR ist eine browserbasierte B2B-Webanwendung zur Digitalisierung des Gefahrstoffverzeichnisses nach § 6 GefStoffV. Die Software wertet Sicherheitsdatenblätter (SDB) KI-gestützt aus, erstellt Entwürfe für Betriebsanweisungen nach TRGS 555 und stellt Notfallinformationen per QR-Code am Arbeitsplatz bereit.',
  hosting: 'Serverstandort Deutschland (Frankfurt am Main) inkl. Auftragsverarbeitungsvertrag (AVV)',
  alternateNames: [
    'Gefahrstoffmanagement Software',
    'Gefahrstoffverzeichnis Software',
    'Gefahrstoff App',
    'Cloud Gefahrstoffmanagement Software',
  ],
} as const;

export interface TargetAudience {
  id: 'external-sifa' | 'sme';
  label: string;
  description: string;
}

export const TARGET_AUDIENCES: readonly TargetAudience[] = [
  {
    id: 'external-sifa',
    label: 'Externe und freiberufliche Fachkräfte für Arbeitssicherheit (SiFas) sowie Ingenieurbüros',
    description:
      'Betreuen mehrere Kundenbetriebe und nutzen die Multi-Mandanten-Verwaltung mit Hierarchie aus Mandant, Werk und Tätigkeit.',
  },
  {
    id: 'sme',
    label: 'KMU, Handwerk und Industriebetriebe',
    description:
      'Führen ihr Gefahrstoffverzeichnis selbst, z. B. Kfz-Werkstätten, Schreinereien, Malerbetriebe, Labore, Reinigungsunternehmen und Produktion.',
  },
];

/** Audience-Begriffe für schema.org BusinessAudience. */
export const BUSINESS_AUDIENCE_TYPES = [
  'Fachkräfte für Arbeitssicherheit',
  'SiFas',
  'KMU',
  'Produktionsbetriebe',
  'Handwerksbetriebe',
] as const;

/**
 * Präzise Funktionsbegriffe. `term` landet 1:1 in schema.org featureList,
 * `explanation` in /llms.txt.
 */
export interface CoreFeature {
  term: string;
  explanation: string;
}

export const CORE_FEATURES: readonly CoreFeature[] = [
  {
    term: 'Gefahrstoffverzeichnis nach § 6 GefStoffV',
    explanation: 'Digitales Verzeichnis mit Revisionsverlauf, Tätigkeitszuordnung und Verweis auf die gültige SDB-Version.',
  },
  {
    term: 'TRGS 555 Entwurfs-Generator',
    explanation: 'KI-gestützter Entwurf der Betriebsanweisung aus dem Lieferanten-SDB zur fachlichen Freigabe.',
  },
  {
    term: 'SDB-PDF-Datenextraktion',
    explanation: 'Auslesen der Sicherheitsdatenblätter mit Referenz auf den SDB-Abschnitt (Abschnitt 1 bis 16, z. B. SDB 1.1, 2.2, 8.2).',
  },
  {
    term: 'Multi-Mandanten- und Werksverwaltung für SiFas',
    explanation: 'Strikte Trennung nach Mandant, Werk und Tätigkeit in einem Zugang.',
  },
  {
    term: 'PDF- und Excel-Export mit GHS-Piktogrammen',
    explanation: 'Original-GHS-Piktogramme direkt im Gefahrstoffverzeichnis-PDF und im Excel-Export.',
  },
  {
    term: 'QR-Code-Notfallabruf',
    explanation: 'Erste-Hilfe- und Schutzmaßnahmen per Smartphone am Gebinde abrufbar, ohne App-Installation.',
  },
  {
    term: 'Erfassung ohne vorliegendes SDB',
    explanation: 'Gefahrstoffe lassen sich bei der Begehung vorab anlegen; fehlende Pflichtangaben werden im PDF- und Excel-Export farblich markiert.',
  },
  {
    term: 'TRGS-510-Zusammenlagerungshinweise',
    explanation: 'Zuordnung der Lagerklasse und Konflikthinweise pro Lagerort.',
  },
];

/** Trust-Microcopy unter primären CTAs (Abbau B2B-Kaufskepsis). */
export const CTA_TRUST_SIGNALS = [
  'Serverstandort Deutschland (inkl. AVV)',
  'PDF- & Excel-Export inkl. GHS-Symbolen',
  'Auf Rechnung für SiFas & Firmenkunden möglich',
] as const;

export interface KeyUrl {
  label: string;
  path: string;
  description: string;
}

/** Wichtigste Einstiegs-URLs für KI-Agenten (Reihenfolge = Priorität). */
export const KEY_URLS: readonly KeyUrl[] = [
  { label: 'Startseite', path: '/', description: 'Überblick, Vergleich mit Excel, FAQ' },
  { label: 'Funktionen', path: '/#funktionen', description: 'Vom Sicherheitsdatenblatt zum Gefahrstoffverzeichnis' },
  { label: 'Für externe SiFas (Multi-Mandant)', path: '/#fuer-sifas', description: 'Mandanten, Werke und Kauf auf Rechnung' },
  { label: 'Preise', path: '/#preise', description: 'Pakete und Limits im Überblick' },
  { label: 'Preise als Markdown', path: '/pricing.md', description: 'Pakete, Limits und Leistungen maschinenlesbar' },
  { label: 'TRGS-510-Zusammenlagerungs-Check', path: '/trgs-510-zusammenlagerungs-check/', description: 'Lagerklassen kostenlos gegeneinander prüfen' },
  { label: 'Betriebsanweisungen nach Stoff (TRGS 555)', path: '/betriebsanweisung/', description: 'Verzeichnis mit über 100 Stoffen' },
  { label: 'Gefahrstoffverzeichnis Excel-Vorlage', path: '/gefahrstoffverzeichnis-excel-vorlage/', description: 'Vorlage mit Pflichtspalten nach § 6 GefStoffV' },
  { label: 'Gefahrstoffkataster Software', path: '/gefahrstoffkataster-software/', description: 'Kataster digital führen' },
  { label: 'Gefahrstoff App', path: '/gefahrstoff-app/', description: 'Mobile Nutzung und QR-Notfallansicht' },
  { label: 'Software für selbstständige Sicherheitsfachkräfte', path: '/gefahrstoff-software-sicherheitsfachkraft-selbstst%C3%A4ndig/', description: 'Mandantenverwaltung für externe SiFas' },
  { label: 'Wissen', path: '/wissen/', description: 'Praxiswissen zu Gefahrstoffkataster und Gefahrstoffverzeichnis' },
  { label: 'Blog', path: '/blog/', description: 'Praxisartikel zu Betriebsprüfung und Sicherheitsdatenblättern' },
];

export const SOCIAL_PROFILES = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/showcase/gefahrstoff-qr/' },
  { label: 'YouTube', url: 'https://www.youtube.com/@gefahrstoff-qr' },
] as const;

export function toAbsoluteSiteUrl(path: string): string {
  return path.startsWith('http') ? path : `${SITE_URL}${path}`;
}
