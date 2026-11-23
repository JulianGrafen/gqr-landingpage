import type { HazardousSubstanceSlug } from '@/config/betriebsanweisung/entries';
import type { StrikingDistanceMidPageCtaCopy } from '@/components/marketing/StrikingDistanceMidPageCta';

export const STRIKING_DISTANCE_GSC_PERIOD = '2026-10-24 bis 2026-11-20' as const;

export type StrikingDistanceGscBaseline = {
  position: number;
  impressions: number;
  ctrPercent: number;
};

export type BetriebsanweisungStrikingOverride = {
  title: string;
  description: string;
  midPageCta: StrikingDistanceMidPageCtaCopy;
};

export const BETRIEBSANWEISUNG_STRIKING_OVERRIDES: Partial<
  Record<HazardousSubstanceSlug, BetriebsanweisungStrikingOverride>
> = {
  'isopropanol-trgs-555': {
    title: 'Betriebsanweisung Isopropanol (TRGS 555): Muster & PDF',
    description:
      'Betriebsanweisung Isopropanol nach TRGS 555: Muster prüfen oder eigenes SDB-PDF in einen KI-Entwurf zur Freigabe umwandeln. Jetzt kostenlos testen.',
    midPageCta: {
      headline: 'Isopropanol: eigenes SDB in einen TRGS-555-Entwurf übernehmen',
      body: 'Laden Sie Ihr Lieferanten-PDF hoch. Gefahrstoff-QR strukturiert einen Entwurf zur fachlichen Prüfung und Freigabe durch SiFa oder Arbeitgeber, ohne Login-Pflicht für den ersten Test.',
      primaryLabel: 'SDB-Livetest auf der Startseite öffnen',
      secondaryLabel: 'Zur Dropzone auf dieser Seite',
    },
  },
  'aceton-trgs-555': {
    title: 'Betriebsanweisung Aceton (TRGS 555): Vorlage & PDF',
    description:
      'Betriebsanweisung Aceton nach TRGS 555: Muster ansehen oder SDB-PDF in einen KI-Entwurf zur Freigabe umwandeln. Kostenlos starten, ohne Verkaufsgespräch.',
    midPageCta: {
      headline: 'Aceton: Muster sehen, dann Ihr SDB-PDF testen',
      body: 'Die Vorschau zeigt den Aufbau nach TRGS 555. Für Ihr Produkt gilt das Lieferanten-SDB: Upload unterstützt den Entwurf, die Freigabe bleibt beim Betrieb.',
      primaryLabel: 'Livetest mit eigener SDB-Datei',
      secondaryLabel: 'Zur Dropzone auf dieser Seite',
    },
  },
  'sekundenkleber-trgs-555': {
    title: 'Betriebsanweisung Sekundenkleber (TRGS 555): Muster',
    description:
      'Betriebsanweisung Sekundenkleber nach TRGS 555: Muster prüfen oder SDB in einen KI-Entwurf zur Freigabe umwandeln. Kostenloser Einstieg für wenige Stoffe.',
    midPageCta: {
      headline: 'Sekundenkleber: Entwurf aus dem Hersteller-SDB',
      body: 'Kunststoffreparatur und Montage brauchen eine betriebliche Betriebsanweisung. Gefahrstoff-QR unterstützt den Entwurf aus Ihrem PDF, SiFa und Meister geben frei.',
      primaryLabel: 'SDB auf der Startseite hochladen',
      secondaryLabel: 'Zur Dropzone auf dieser Seite',
    },
  },
  'argon-trgs-555': {
    title: 'Betriebsanweisung Argon (TRGS 555): Vorlage prüfen',
    description:
      'Betriebsanweisung Argon nach TRGS 555: Muster ansehen oder SDB-PDF in einen KI-Entwurf zur Freigabe umwandeln. Maßnahmen aus Ihrem Lieferanten-PDF.',
    midPageCta: {
      headline: 'Argon: Betriebsanweisung aus Ihrem Lieferanten-PDF',
      body: 'Schweißgas-Angaben variieren je Gebinde. Der Entwurf orientiert sich an Ihrem Sicherheitsdatenblatt und dient der Vorprüfung vor der betrieblichen Freigabe.',
      primaryLabel: 'Livetest ohne Kreditkarte',
      secondaryLabel: 'Zur Dropzone auf dieser Seite',
    },
  },
  'kaliumpermanganat-trgs-555': {
    title: 'Betriebsanweisung Kaliumpermanganat (TRGS 555): Muster',
    description:
      'Betriebsanweisung Kaliumpermanganat nach TRGS 555: Muster prüfen oder SDB in einen KI-Entwurf zur Freigabe. Verzeichnis und BA an einem Ort pflegen.',
    midPageCta: {
      headline: 'Kaliumpermanganat: Vorschau plus eigener SDB-Upload',
      body: 'Labor und Wasseraufbereitung nutzen unterschiedliche Konzentrationen. Der Entwurf unterstützt SiFa und Betriebsleitung bei der Freigabe nach § 14 GefStoffV.',
      primaryLabel: 'Startseiten-Livetest öffnen',
      secondaryLabel: 'Zur Dropzone auf dieser Seite',
    },
  },
  'grundierung-trgs-555': {
    title: 'Betriebsanweisung Grundierung (TRGS 555): Muster & PDF',
    description:
      'Betriebsanweisung Grundierung nach TRGS 555: Muster ansehen oder SDB-PDF in einen KI-Entwurf zur Freigabe umwandeln. Vorschau prüfen und testen.',
    midPageCta: {
      headline: 'Grundierung: TRGS-555-Entwurf aus Ihrem SDB',
      body: 'Bindemittel und Lösemittel unterscheiden sich je Produkt. Laden Sie Ihr Sicherheitsdatenblatt hoch und prüfen Sie den strukturierten Entwurf vor der Freigabe.',
      primaryLabel: 'Livetest auf gefahrstoff-qr.de',
      secondaryLabel: 'Zur Dropzone auf dieser Seite',
    },
  },
};

export const KFZ_WERKSTATT_STRIKING = {
  title: 'Gefahrstoffverzeichnis Kfz-Werkstatt: Kataster & QR',
  description:
    'Gefahrstoffverzeichnis Kfz-Werkstatt: SDB einlesen, Betriebsanweisungen und QR-Codes an Schrank und Hebebühne. Kostenlos testen, ohne Excel.',
} as const;

export const WISSEN_KFZ_MUSTER_STRIKING = {
  documentTitle: 'Gefahrstoffverzeichnis Kfz-Werkstatt: Muster & Pflichten',
  description:
    'Gefahrstoffverzeichnis Kfz-Werkstatt (§ 6 GefStoffV): Pflichten, typische Stoffe und Excel-Limits. Mit Software-Lösung für Kataster, BA und QR-Codes. Jetzt durchlesen.',
} as const;