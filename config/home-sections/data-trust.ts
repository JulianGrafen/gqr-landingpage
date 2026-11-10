/**
 * 3-Spalten-Trust-Box (Datenhoheit, Hosting, KI-Verarbeitung).
 * Konsument: <DataTrustSection> · Sync: npm run sync:home
 */

export interface DataTrustPillar {
  title: string;
  description: string;
}

export const HOME_DATA_TRUST = {
  sectionId: 'daten-trust',
  eyebrow: 'Datenhoheit & Datenschutz',
  headline: 'Ihre Daten gehören Ihnen.',
  pillars: [
    {
      title: 'Kein KI-Training mit Kundendaten',
      description:
        'Hochgeladene PDFs und Katasterdaten werden ausschließlich zur Extraktion verarbeitet (Zero-Data-Retention bei Subprozessoren).',
    },
    {
      title: 'Serverstandort Frankfurt (AWS/Supabase EU)',
      description:
        'DSGVO-konforme Speicherung in Deutschland inkl. vorab unterzeichnetem AVV nach Art. 28 DSGVO.',
    },
    {
      title: 'Jederzeitige Datenhoheit',
      description:
        'Vollständiger Export aller Katasterdaten als Excel/PDF und SDB-Archiv zu jedem Zeitpunkt, ohne Vendor-Lock-in.',
    },
  ] satisfies DataTrustPillar[],
} as const;
