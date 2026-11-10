import { APP_REGISTER_URL } from '@/config/aeo-config';
import {
  formatEuroAmount,
  SIFA_MANDANT_BLOCK_PRICE_MONTHLY_EUR,
  SIFA_MANDANT_INCLUDED,
  SIFA_MANDANT_BLOCK_SIZE,
  SIFA_MANDANT_PRICE_EXAMPLES,
} from '@/config/sifa-mandant-pricing';
import { PRICING_PLANS } from '@/config/pricing-plans';

/**
 * Conversion-Sektion für externe SiFas und Arbeitsschutz-Büros (Multi-Mandant).
 * Konsument: <MultiTenantSifaSection>.
 */

export interface SellingPoint {
  title: string;
  description: string;
}

export const MULTI_TENANT_SIFA = {
  sectionId: 'fuer-sifas',
  eyebrow: 'Für externe SiFas & Arbeitsschutz-Büros (Multi-Mandant)',
  headlineLead: 'Betreuen Sie mehrere Betriebe?',
  headlineRest: 'Alle Mandanten und Werke in einem Zugang.',
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
  primaryCta: { label: 'Als SiFa kostenlos starten →', href: APP_REGISTER_URL },
  pricingCallout: (() => {
    const plan = PRICING_PLANS.find((p) => p.id === 'sifa-multi-mandant');
    const yearly = plan?.yearlyMonthlyPriceEur ?? 159;
    const monthly = plan?.monthlyPriceEur ?? 189;
    return {
      headline: `SiFa Multi-Mandant: ${formatEuroAmount(yearly)}/Monat bei Jahreszahlung · ${formatEuroAmount(monthly)}/Monat monatlich`,
      paragraphs: [
        `Bis zu ${SIFA_MANDANT_INCLUDED} Mandantenbetriebe sind im Grundpreis enthalten.`,
        `Damit decken Sie rund 90 % aller freiberuflichen Einzel-SiFas ab. Bei voller Auslastung wirkt der Tarif wie eine echte Flatrate ohne Reibung (ca. ${formatEuroAmount(yearly / SIFA_MANDANT_INCLUDED)} pro betreutem Betrieb bei Jahreszahlung).`,
        `Ab dem ${SIFA_MANDANT_INCLUDED + 1}. Mandanten (für große Ingenieurbüros mit mehreren SiFas): +${formatEuroAmount(SIFA_MANDANT_BLOCK_PRICE_MONTHLY_EUR)}/Monat je ${SIFA_MANDANT_BLOCK_SIZE}er-Block weiterer Mandanten.`,
      ],
      examples: SIFA_MANDANT_PRICE_EXAMPLES,
      footnote:
        'Alle Preise zzgl. MwSt. Rechenbeispiele bei Jahreszahlung zum reduzierten Monatspreis.',
      preiseHref: '#preise',
    };
  })(),
} as const;
