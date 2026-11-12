/**
 * Zentrale Paketdaten (Single Source of Truth für JSON-LD-Offers, /llms.txt und /pricing.md).
 * Preiskarten: index.html #preise; Stripe-Links: config/pricing-stripe-checkout.ts + scripts/pricing-billing.js.
 */

import {
  SIFA_MANDANT_EXTENSION_LABEL,
  SIFA_MANDANT_LIMITS_LABEL,
} from '@/config/sifa-mandant-pricing';

export const PRICING_CURRENCY = 'EUR';
/** Ankerpreis in der UI: durchgestrichen, Summe = angezeigter Monatspreis + Offset (Marketing). */
export const PRICING_DISPLAY_ANCHOR_OFFSET_EUR = 20;
/** Label über der Preiskarten-Matrix (durchgestrichene Ankerpreise). */
export const PRICING_INTRO_OFFER_LABEL = 'Exklusive Einführungspreise';
/** Einheitlicher Button-Text auf den Preiskarten (Startseite). */
export const PRICING_CARD_CTA_LABEL = 'Jetzt Starten';
/** Sichtbare Feature-Zeilen pro Preiskarte (Rest: „Weitere Details“). */
export const PRICING_VISIBLE_FEATURE_COUNT = 3;
/** Begehungserfassung ohne vorliegendes SDB (alle bezahlten Pakete). */
export const PRICING_FEATURE_BEGEHUNGS_MODUS =
  'Erfassung auch ohne SDB (Begehungs-Modus)' as const;
/** B2B-Zahlungsart auf allen Preiskarten (Startseite #preise). */
export const PRICING_FEATURE_INVOICE_SEPA =
  'Kauf auf Rechnung / SEPA-Überweisung' as const;
/** Legacy-Hilfswert; jährliche Preise sind in `yearlyMonthlyPriceEur` fest definiert. */
export const YEARLY_DISCOUNT_PERCENT = 15;
export const PRICING_UPDATED_LABEL = 'November 2026';

export type PricingPlanId =
  | 'tarif-vorschau'
  | 'kmu-basis'
  | 'kmu-pro'
  | 'sifa-multi-mandant'
  | 'industrie';

export interface PricingPlan {
  id: PricingPlanId;
  name: string;
  /** Kurzbeschreibung der Zielgruppe (Pricing-Karten). */
  audience: string;
  /** Monatlicher Nettopreis in Euro (monatliche Abrechnung). */
  monthlyPriceEur: number;
  /** Effektiver Monatspreis bei jährlicher Vorauszahlung (`null` bei 0 €). */
  yearlyMonthlyPriceEur: number | null;
  /** Jahresgesamtbetrag bei Vorauszahlung (`null` bei 0 €). */
  yearlyTotalPriceEur: number | null;
  limits: string;
  features: readonly string[];
  ctaLabel: string;
  isRecommended?: boolean;
}

export const PRICING_PLANS: readonly PricingPlan[] = [
  {
    id: 'tarif-vorschau',
    name: 'TarifVorschau',
    audience: 'Unverbindlicher Funktionstest im Browser.',
    monthlyPriceEur: 0,
    yearlyMonthlyPriceEur: 0,
    yearlyTotalPriceEur: 0,
    limits: 'bis zu 3 SDB-Uploads',
    features: [
      'KI-Auswertung im Browser ansehen',
      'PDF-Vorschau nur mit „MUSTER“-Wasserzeichen',
      'Kein Excel-Export, keine dauerhaften QR-Links',
      PRICING_FEATURE_INVOICE_SEPA,
    ],
    ctaLabel: PRICING_CARD_CTA_LABEL,
  },
  {
    id: 'kmu-basis',
    name: 'KMU Basis',
    audience: 'Für kleine Betriebe, Werkstätten & Handwerk.',
    monthlyPriceEur: 59,
    yearlyMonthlyPriceEur: 49,
    yearlyTotalPriceEur: 588,
    limits: 'bis 30 Gefahrstoffe, 1 Werk, unbegrenzt Lagerorte',
    features: [
      PRICING_FEATURE_BEGEHUNGS_MODUS,
      'KI-gestützte BA-Entwürfe',
      'PDF- & Excel-Export (ohne Wasserzeichen)',
      'Aktive QR-Notfallansicht am Arbeitsplatz',
      PRICING_FEATURE_INVOICE_SEPA,
    ],
    ctaLabel: PRICING_CARD_CTA_LABEL,
  },
  {
    id: 'kmu-pro',
    name: 'KMU Pro',
    audience: 'Für Mittelstand & Produktion mit vielen Stoffen.',
    monthlyPriceEur: 119,
    yearlyMonthlyPriceEur: 99,
    yearlyTotalPriceEur: 1188,
    limits: 'bis 250 Gefahrstoffe, bis 3 Werke, unbegrenzt Lagerorte',
    features: [
      PRICING_FEATURE_BEGEHUNGS_MODUS,
      'Werks- & Lagerorttrennung (bis 3 Werke)',
      'Batch-Upload (mehrere SDBs gleichzeitig)',
      'Mehrere Nutzer-Logins',
      'KI-gestützte BA-Entwürfe & PDF/Excel-Export',
      'SDB-Aktualitäts-Alerts',
      PRICING_FEATURE_INVOICE_SEPA,
    ],
    ctaLabel: PRICING_CARD_CTA_LABEL,
  },
  {
    id: 'sifa-multi-mandant',
    name: 'SiFa Multi-Mandant',
    audience: 'Speziell für externe SiFas & Ingenieurbüros.',
    monthlyPriceEur: 189,
    yearlyMonthlyPriceEur: 159,
    yearlyTotalPriceEur: 1908,
    limits: SIFA_MANDANT_LIMITS_LABEL,
    features: [
      SIFA_MANDANT_EXTENSION_LABEL,
      'Unbegrenzte Werke je Mandant (Fair-Use)',
      'Saubere Mandanten-, Werks- & Tätigkeitstrennung',
      PRICING_FEATURE_BEGEHUNGS_MODUS,
      'Batch-Upload & alle PDF/Excel-Exporte inkl. GHS',
      PRICING_FEATURE_INVOICE_SEPA,
    ],
    ctaLabel: PRICING_CARD_CTA_LABEL,
  },
  {
    id: 'industrie',
    name: 'Industrie',
    audience: 'Für Konzerne, Werksverbünde & hohe Stoffzahlen.',
    monthlyPriceEur: 399,
    yearlyMonthlyPriceEur: 399,
    yearlyTotalPriceEur: 4788,
    limits: 'ab 250 Gefahrstoffen, ab 4 Werken (Fair-Use)',
    features: [
      'Alles aus KMU Pro',
      'SSO (Single Sign-On)',
      'Dedizierter AVV-Support',
      'Individuelle Einführung & Jahresvertrag auf Anfrage',
      PRICING_FEATURE_INVOICE_SEPA,
    ],
    ctaLabel: PRICING_CARD_CTA_LABEL,
  },
];

const EURO_FORMATTER = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 2 });

export function formatEuro(amount: number): string {
  return `${EURO_FORMATTER.format(amount)} €`;
}

/** "0 €", "59 €/Monat" */
export function formatPlanPrice(plan: PricingPlan, mode: 'monthly' | 'yearly' = 'yearly'): string {
  if (plan.monthlyPriceEur === 0) return formatEuro(0);
  const amount = mode === 'yearly' ? (plan.yearlyMonthlyPriceEur ?? plan.monthlyPriceEur) : plan.monthlyPriceEur;
  return `${formatEuro(amount)}/Monat`;
}

export function yearlyMonthlyPrice(plan: PricingPlan): number {
  if (plan.yearlyMonthlyPriceEur != null) return plan.yearlyMonthlyPriceEur;
  return Math.round(plan.monthlyPriceEur * (1 - YEARLY_DISCOUNT_PERCENT / 100) * 100) / 100;
}

export function yearlyTotalPrice(plan: PricingPlan): number {
  if (plan.yearlyTotalPriceEur != null) return plan.yearlyTotalPriceEur;
  return Math.round(yearlyMonthlyPrice(plan) * 12);
}
