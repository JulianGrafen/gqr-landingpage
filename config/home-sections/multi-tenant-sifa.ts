import { APP_REGISTER_URL, CONTACT_EMAIL } from '@/config/aeo-config';

/**
 * Conversion-Sektion für externe SiFas und Arbeitsschutz-Büros (Multi-Mandant).
 * Konsument: <MultiTenantSifaSection>.
 */

export interface SellingPoint {
  title: string;
  description: string;
}

const INVOICE_REQUEST_SUBJECT = 'Multi-Mandanten-Zugang auf Rechnung';

export const MULTI_TENANT_SIFA = {
  sectionId: 'fuer-sifas',
  eyebrow: 'Für externe SiFas & Arbeitsschutz-Büros (Multi-Mandant)',
  headline: 'Betreuen Sie mehrere Betriebe? Alle Mandanten und Werke in einem Zugang.',
  intro:
    'Für freiberufliche Fachkräfte für Arbeitssicherheit und Ingenieurbüros, die Gefahrstoffverzeichnisse für mehrere Kundenbetriebe führen.',
  sellingPoints: [
    {
      title: 'Saubere Mandanten- & Werkstrennung',
      description:
        'Verwalten Sie mehrere Kundenbetriebe, Standorte (Werke) und spezifische Tätigkeiten strikt getrennt in einem Account.',
    },
    {
      title: 'Begehungs-Modus (Erfassung ohne SDB)',
      description:
        'Nehmen Sie Gefahrstoffe schon beim Rundgang ohne SDB oder Mengenangabe auf. Offene Felder markiert das System im Export farblich zur späteren Nachpflege.',
    },
    {
      title: 'Exporte für die Betriebsprüfung',
      description:
        'Exportieren Sie das Gefahrstoffverzeichnis nach § 6 GefStoffV inkl. echter GHS-Piktogramme und Tätigkeitenzuordnung als PDF oder Excel.',
    },
    {
      title: 'Klassischer Kauf auf Rechnung',
      description:
        'Für SiFas, Ingenieurbüros und Firmenkunden bieten wir im Multi-Mandanten-Tarif die gewohnte Abrechnung per monatlicher PDF-Rechnung und Überweisung an.',
    },
  ] satisfies SellingPoint[],
  primaryCta: { label: 'Multi-Mandanten-Zugang anfragen / testen →', href: APP_REGISTER_URL },
  secondaryCta: {
    label: 'Kauf auf Rechnung per E-Mail anfragen',
    href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(INVOICE_REQUEST_SUBJECT)}`,
  },
} as const;
