/**
 * Zentrale Paketdaten (Single Source of Truth für JSON-LD-Offers, /llms.txt und /pricing.md).
 * Preiskarten: index.html #preise; Stripe-Links: config/pricing-stripe-checkout.ts + scripts/pricing-billing.js.
 */

import {
  SIFA_MANDANT_EXTENSION_LABEL,
  SIFA_MANDANT_LIMITS_LABEL,
} from '@/config/sifa-mandant-pricing';
import { PRICING_TRIAL_VALUE_PROPOSITION } from '@/config/pricing-trial-copy';

export { PRICING_VAT_FOOTNOTE_BILLING, PRICING_VAT_SUFFIX } from '@/config/pricing-vat';

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
/** GBU-Modul (Gefährdungsbeurteilung nach § 6 GefStoffV): KMU Pro und SiFa Multi-Mandant. */
export const GBU_MODULE_LABEL = 'GBU-Modul (§ 6 GefStoffV)' as const;
export const GBU_MODULE_FEATURE = `Neu: ${GBU_MODULE_LABEL}` as const;
/** Legacy-Hilfswert; jährliche Preise sind in `yearlyMonthlyPriceEur` fest definiert. */
export const YEARLY_DISCOUNT_PERCENT = 15;
export const PRICING_UPDATED_LABEL = 'November 2026';

/** Sichtbare Schreibweise des 0-€-Tests (JSON-LD, Preiskarten, Meta). */
export const TARIF_VORSCHAU_PLAN_DISPLAY_NAME = 'Tarif Vorschau' as const;

/** Stoff-Limits der KMU-Pakete (Preiskarten + ROI-Tarifwahl). */
/** Kostenlose SDB-Uploads im Tarif Vorschau (Hero-CTA, Preiskarte). */
export const TARIF_VORSCHAU_SDB_UPLOAD_LIMIT = 3;

export const KMU_BASIS_SUBSTANCE_LIMIT = 30;
export const KMU_PRO_SUBSTANCE_LIMIT = 250;

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
    name: TARIF_VORSCHAU_PLAN_DISPLAY_NAME,
    audience: 'Unverbindlicher Funktionstest im Browser.',
    monthlyPriceEur: 0,
    yearlyMonthlyPriceEur: 0,
    yearlyTotalPriceEur: 0,
    limits: `bis zu ${TARIF_VORSCHAU_SDB_UPLOAD_LIMIT} SDB-Uploads`,
    features: [
      PRICING_TRIAL_VALUE_PROPOSITION,
      'KI-Auswertung und BA-Entwürfe im Browser prüfen',
      'PDF- und Excel-Export ab KMU-Tarif',
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
    limits: `bis ${KMU_BASIS_SUBSTANCE_LIMIT} Gefahrstoffe, 1 Werk, unbegrenzt Lagerorte`,
    features: [
      PRICING_FEATURE_BEGEHUNGS_MODUS,
      'KI-gestützte BA-Entwürfe',
      'PDF- & Excel-Export',
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
    limits: `bis ${KMU_PRO_SUBSTANCE_LIMIT} Gefahrstoffe, bis 3 Werke, unbegrenzt Lagerorte`,
    features: [
      PRICING_FEATURE_BEGEHUNGS_MODUS,
      'Werks- & Lagerorttrennung (bis 3 Werke)',
      'Batch-Upload (mehrere SDBs gleichzeitig)',
      'Mehrere Nutzer-Logins',
      'KI-gestützte BA-Entwürfe & PDF/Excel-Export',
      GBU_MODULE_FEATURE,
      'SDB-Aktualitäts-Alerts',
      PRICING_FEATURE_INVOICE_SEPA,
    ],
    ctaLabel: PRICING_CARD_CTA_LABEL,
    isRecommended: true,
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
      GBU_MODULE_FEATURE,
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
    yearlyMonthlyPriceEur: 339,
    yearlyTotalPriceEur: 4068,
    limits: `ab ${KMU_PRO_SUBSTANCE_LIMIT} Gefahrstoffen, ab 4 Werken (Fair-Use)`,
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
