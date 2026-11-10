/**
 * Zentrale Paketdaten (Single Source of Truth für JSON-LD-Offers, /llms.txt und /pricing.md).
 * Die sichtbaren Preiskarten in index.html müssen bei Änderungen manuell nachgezogen werden.
 */

export const PRICING_CURRENCY = 'EUR';
/** Legacy-Hilfswert; jährliche Preise sind in `yearlyMonthlyPriceEur` fest definiert. */
export const YEARLY_DISCOUNT_PERCENT = 15;
export const PRICING_UPDATED_LABEL = 'November 2026';

export type PricingPlanId = 'tarif-vorschau' | 'kmu-basis' | 'kmu-pro' | 'sifa-multi-mandant';

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
    ],
    ctaLabel: 'Im Browser testen',
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
      'KI-gestützte BA-Entwürfe',
      'PDF- & Excel-Export (ohne Wasserzeichen)',
      'Aktive QR-Notfallansicht am Arbeitsplatz',
    ],
    ctaLabel: 'Mit Basis starten',
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
      'Batch-Upload (mehrere SDBs gleichzeitig)',
      'Mehrere Nutzer-Logins',
      'KI-gestützte BA-Entwürfe & PDF/Excel-Export',
      'SDB-Aktualitäts-Alerts',
    ],
    ctaLabel: 'KMU Pro wählen',
    isRecommended: true,
  },
  {
    id: 'sifa-multi-mandant',
    name: 'SiFa Multi-Mandant',
    audience: 'Speziell für externe SiFas & Ingenieurbüros.',
    monthlyPriceEur: 189,
    yearlyMonthlyPriceEur: 159,
    yearlyTotalPriceEur: 1908,
    limits: 'unbegrenzte Mandanten & Werke (Fair-Use)',
    features: [
      'Saubere Mandanten-, Werks- & Tätigkeitstrennung',
      'Erfassung auch ohne SDB (Begehungs-Modus)',
      'Batch-Upload & alle PDF/Excel-Exporte inkl. GHS',
      'Direktkauf auf monatliche PDF-Rechnung möglich',
    ],
    ctaLabel: 'Als SiFa starten (auch auf Rechnung)',
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
