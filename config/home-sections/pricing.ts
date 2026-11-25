import { APP_REGISTER_URL } from '@/config/aeo-config';
import { COMPANY } from '@/config/company';
import {
  PRICING_TRIAL_BROWSER_FOOTNOTE,
  PRICING_TRIAL_VALUE_PROPOSITION,
} from '@/config/pricing-trial-copy';
import {
  GBU_MODULE_FEATURE,
  PRICING_DISPLAY_ANCHOR_OFFSET_EUR,
  PRICING_PLANS,
  type PricingPlan,
  type PricingPlanId,
} from '@/config/pricing-plans';
import { PRICING_VAT_SUFFIX } from '@/config/pricing-vat';

/** Tarifkarten auf der Startseite (#preise): ohne TarifVorschau-Karte und ohne Industrie-Karte. */
export const HOME_PRICING_CARD_IDS = ['kmu-basis', 'kmu-pro', 'sifa-multi-mandant'] as const;

export type HomePricingCardId = (typeof HOME_PRICING_CARD_IDS)[number];

export const HOME_PRICING_RECOMMENDED_ID: HomePricingCardId = 'kmu-pro';

/** Badges über den Tarifkarten (nur Karten mit Eintrag zeigen ein Badge). */
export const HOME_PRICING_CARD_BADGES: Partial<Record<HomePricingCardId, string>> = {
  'kmu-pro': 'Beliebt bei Betrieben',
  'sifa-multi-mandant': 'Für externe SiFas',
};

export const HOME_PRICING_SECTION_MARKETING = {
  kicker: 'Preise',
  headline: 'Transparente Preise für jedes Unternehmen',
  subheadline:
    'KMU Basis, KMU Pro oder SiFa Multi-Mandant: wählen Sie den passenden Tarif. Alle Preise sind Nettopreise zzgl. MwSt. Jährliche Abrechnung ist Standard und günstiger, monatliche Abrechnung jederzeit kündbar. QR-Notfallzugriff ist in den bezahlten Plänen inklusive.',
  billingHintYearly:
    'Jährliche Abrechnung (Standard): effektiv bis zu 17 % günstiger. Kauf auf Rechnung immer möglich.',
  billingHintMonthly: 'Monatliche Abrechnung, monatlich kündbar. Kauf auf Rechnung immer möglich.',
  trialHeadline: {
    text: 'Jeden Tarif kostenlos mit 3 eigenen SDBs testen, keine Kreditkarte nötig.',
    href: APP_REGISTER_URL,
  },
  industryBar: {
    summary: 'Industrie & Multi-Werk ab 399 €/Monat: unbegrenzte Werke, SSO & individueller AVV',
    ctaLabel: 'Direkt anfragen',
    href: `mailto:${COMPANY.contactEmail}?subject=${encodeURIComponent('Anfrage Industrie-Tarif (Multi-Werk)')}`,
  },
  compareTrialFootnote: PRICING_TRIAL_BROWSER_FOOTNOTE,
  compareIndustryFootnote:
    'Konzerne & Werksverbünde: ab 250 Gefahrstoffen, SSO und dedizierter AVV-Support.',
} as const;

/** Sichtbare Feature-Zeilen pro Preiskarte (1:1 wie bisheriges index.html #preise). */
export const HOME_PRICING_CARD_BULLETS: Record<
  HomePricingCardId,
  readonly { text: string; positive?: boolean }[]
> = {
  'kmu-basis': [
    { text: 'Bis 30 Gefahrstoffe' },
    { text: '1 Werk, unbegrenzt Lagerorte' },
    { text: 'KI-gestützte BA-Entwürfe' },
    { text: 'PDF- & Excel-Export' },
    { text: 'Aktive QR-Notfallansicht am Arbeitsplatz' },
    { text: 'Erfassung auch ohne SDB (Begehungs-Modus)' },
    { text: 'Kauf auf Rechnung / SEPA-Überweisung' },
  ],
  'kmu-pro': [
    { text: 'Bis 250 Gefahrstoffe' },
    { text: 'Bis 3 Werke, unbegrenzt Lagerorte' },
    { text: 'Batch-Upload (mehrere SDBs gleichzeitig)' },
    { text: 'Mehrere Nutzer-Logins' },
    { text: 'KI-gestützte BA-Entwürfe & PDF/Excel-Export' },
    { text: GBU_MODULE_FEATURE },
    { text: 'SDB-Aktualitäts-Alerts' },
    { text: 'Erfassung auch ohne SDB (Begehungs-Modus)' },
    { text: 'Kauf auf Rechnung / SEPA-Überweisung' },
  ],
  'sifa-multi-mandant': [
    { text: GBU_MODULE_FEATURE },
    { text: 'Unbegrenzte Werke je Mandant (Fair-Use)' },
    { text: 'Saubere Mandanten-, Werks- & Tätigkeitstrennung' },
    { text: 'Erfassung auch ohne SDB (Begehungs-Modus)' },
    { text: 'Batch-Upload & alle PDF/Excel-Exporte inkl. GHS' },
    { text: 'Kauf auf Rechnung / SEPA-Überweisung' },
  ],
};

export function getHomePricingPlan(id: HomePricingCardId): PricingPlan {
  const plan = PRICING_PLANS.find((p) => p.id === id);
  if (!plan) throw new Error(`Unbekannter Home-Pricing-Plan: ${id}`);
  return plan;
}

export function isHomePricingRecommended(id: PricingPlanId): boolean {
  return id === HOME_PRICING_RECOMMENDED_ID;
}

export function pricingCardAnchorEur(monthlyPriceEur: number): number {
  return monthlyPriceEur + PRICING_DISPLAY_ANCHOR_OFFSET_EUR;
}

export function formatYearlyBilledNote(yearlyTotalPriceEur: number): string {
  return `${yearlyTotalPriceEur.toLocaleString('de-DE')} € jährlich abgerechnet`;
}

export { PRICING_VAT_SUFFIX };