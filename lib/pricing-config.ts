import { APP_REGISTER_URL, INDUSTRIE_INQUIRY_MAILTO, SIFA_GROSS_INQUIRY_MAILTO } from '@/config/aeo-config';
import {
  KMU_BASIS_SUBSTANCE_LIMIT,
  KMU_PRO_SUBSTANCE_LIMIT,
  PRICING_CURRENCY,
} from '@/config/pricing-plans';
import { PRICING_SECTION_LEGAL_LINE } from '@/config/pricing-vat';
import { SIFA_MANDANT_BLOCK_PRICE_MONTHLY_EUR, SIFA_MANDANT_BLOCK_SIZE, SIFA_MANDANT_INCLUDED } from '@/config/sifa-mandant-pricing';

export type PricingPersonaId = 'betriebe' | 'sifa';

export type PricingBillingInterval = 'monthly' | 'yearly';

export type PricingTierId =
  | 'kmu-basis'
  | 'kmu-pro'
  | 'industrie'
  | 'sifa-multi-mandant'
  | 'beratungshaus-gross-sifa';

export type PricingCardCtaVariant = 'primary' | 'secondary';

export type PricingCardCta =
  | { kind: 'register'; label: string; href: string; variant: PricingCardCtaVariant }
  | { kind: 'inquiry'; label: string; href: string; variant: PricingCardCtaVariant };

export interface PricingTierPriceFixed {
  kind: 'fixed';
  monthlyEur: number;
  yearlyMonthlyEur: number;
  yearlyTotalEur: number;
}

export interface PricingTierPriceFrom {
  kind: 'from';
  fromMonthlyEur: number;
}

export type PricingTierPrice = PricingTierPriceFixed | PricingTierPriceFrom;

export interface PricingTierConfig {
  id: PricingTierId;
  name: string;
  description: string;
  badge?: string;
  highlighted: boolean;
  price: PricingTierPrice;
  features: readonly string[];
  cta: PricingCardCta;
}

export const PRICING_SECTION_MARKETING = {
  kicker: 'Preise',
  headline: 'Klare Preise ohne versteckte Kosten',
  subheadline:
    'Jeden Tarif kostenlos mit 3 eigenen SDBs testen. Fertige Betriebsanweisung direkt im Browser prüfen, keine Kreditkarte nötig.',
  personaLabels: {
    betriebe: 'Für Betriebe',
    sifa: 'Für externe SiFas',
  } as const satisfies Record<PricingPersonaId, string>,
  billingLabels: {
    yearly: 'Jährlich: 2 Monate gratis',
    monthly: 'Monatlich',
  } as const satisfies Record<PricingBillingInterval, string>,
} as const;

/** PAngV-Hinweis unter dem Tarif-Grid (re-export aus pricing-vat, ein Wortlaut). */
export const PRICING_GRID_LEGAL_LINE = PRICING_SECTION_LEGAL_LINE;

const REGISTER_TRIAL_CTA = {
  kind: 'register' as const,
  label: 'Kostenlos testen',
  href: APP_REGISTER_URL,
};

const INQUIRY_INDUSTRY_CTA = {
  kind: 'inquiry' as const,
  label: 'Angebot anfragen',
  href: INDUSTRIE_INQUIRY_MAILTO,
  variant: 'secondary' as const,
};

const INQUIRY_SIFA_GROSS_CTA = {
  kind: 'inquiry' as const,
  label: 'Angebot anfragen',
  href: SIFA_GROSS_INQUIRY_MAILTO,
  variant: 'secondary' as const,
};

const SIFA_EXTENSION_BULLET = `Flexibel erweiterbar: +${SIFA_MANDANT_BLOCK_SIZE} Mandanten für ${SIFA_MANDANT_BLOCK_PRICE_MONTHLY_EUR} EUR/Monat`;

/** SiFa Multi-Mandant: zentral, damit Hero-Copy („ab … EUR/Monat“) und Preiskarte nicht auseinanderlaufen. */
export const SIFA_MULTI_MANDANT_PRICE: PricingTierPriceFixed = {
  kind: 'fixed',
  monthlyEur: 189,
  yearlyMonthlyEur: 159,
  yearlyTotalEur: 1908,
};

export const PRICING_TIERS_BY_PERSONA: Record<PricingPersonaId, readonly PricingTierConfig[]> = {
  betriebe: [
    {
      id: 'kmu-basis',
      name: 'KMU Basis',
      description: 'Für kleine Betriebe und Werkstätten mit einem Standort.',
      highlighted: false,
      price: {
        kind: 'fixed',
        monthlyEur: 59,
        yearlyMonthlyEur: 49,
        yearlyTotalEur: 588,
      },
      features: [
        `Bis zu ${KMU_BASIS_SUBSTANCE_LIMIT} Gefahrstoffe`,
        'SDB-Extraktion in das Gefahrstoffkataster',
        '§ 6 Gefahrstoffkataster mit Historie',
        'Betriebsanweisungs-Entwurf (gemäß TRGS 555)',
        'QR-Codes und Etiketten inkl. 100x50 mm',
        'TRGS-510-Vorprüfung zur fachlichen Freigabe',
      ],
      cta: { ...REGISTER_TRIAL_CTA, variant: 'secondary' },
    },
    {
      id: 'kmu-pro',
      name: 'KMU Pro',
      description: 'Für wachsende Betriebe mit mehreren Lagerorten und GBU-Pflicht.',
      badge: 'Beliebt bei Betrieben',
      highlighted: true,
      price: {
        kind: 'fixed',
        monthlyEur: 119,
        yearlyMonthlyEur: 99,
        yearlyTotalEur: 1188,
      },
      features: [
        `Bis zu ${KMU_PRO_SUBSTANCE_LIMIT} Gefahrstoffe`,
        'Alles aus KMU Basis',
        'GBU-Assistent (Beta) nach § 6 GefStoffV / TRGS 400',
        'Multi-Lagerorte und Teilmengen',
        'Team-Rollen und Rechte',
        'Audit-Historie und PDF-Prüfberichte',
      ],
      cta: { ...REGISTER_TRIAL_CTA, variant: 'primary' },
    },
    {
      id: 'industrie',
      name: 'Industrie',
      description: 'Für Produktionswerke und Konzernstandorte mit individuellen Anforderungen.',
      highlighted: false,
      price: { kind: 'from', fromMonthlyEur: 399 },
      features: [
        'Unbegrenzte Werke und Nutzer',
        'SSO / SAML und Rollenmodell',
        'Individueller AVV und Datenschutz-Paket',
        'API-Anbindung und Migration',
        'Persönlicher Ansprechpartner',
      ],
      cta: INQUIRY_INDUSTRY_CTA,
    },
  ],
  sifa: [
    {
      id: 'sifa-multi-mandant',
      name: 'SiFa Multi-Mandant',
      description: 'Zentrale Verwaltung für selbstständige Fachkräfte für Arbeitssicherheit.',
      badge: 'Für externe SiFas',
      highlighted: true,
      price: SIFA_MULTI_MANDANT_PRICE,
      features: [
        `Inklusive ${SIFA_MANDANT_INCLUDED} Mandanten`,
        'Schneller Mandantenwechsel und getrennte Kataster',
        'GBU-Assistent (Beta) und TRGS-510-Prüfung',
        'Mandanten-Export und QR-Notfallpässe',
        SIFA_EXTENSION_BULLET,
      ],
      cta: { ...REGISTER_TRIAL_CTA, variant: 'primary' },
    },
    {
      id: 'beratungshaus-gross-sifa',
      name: 'Beratungshaus / Groß-SiFa',
      description: 'Für überbetriebliche Dienste und SiFa-Teams ab 35 Mandanten.',
      highlighted: false,
      price: { kind: 'from', fromMonthlyEur: 399 },
      features: [
        'Unbegrenzte SiFa-Team-Zugänge',
        'Individuelle Mandanten-Kontingente',
        'White-Label-Berichte auf Anfrage',
        'Individueller AVV und Onboarding',
        'Priorisierter Support',
      ],
      cta: INQUIRY_SIFA_GROSS_CTA,
    },
  ],
} as const;

export const PRICING_DEFAULT_BILLING: PricingBillingInterval = 'yearly';

export const PRICING_DEFAULT_PERSONA: PricingPersonaId = 'betriebe';

const EURO_INTEGER = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 });
const EURO_TOTAL = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 });

export function formatPricingAmountEur(amount: number): string {
  return `${EURO_INTEGER.format(amount)} EUR`;
}

export function formatYearlyTotalNote(totalEur: number): string {
  return `${EURO_TOTAL.format(totalEur)} EUR jährlich abgerechnet`;
}

export function resolveDisplayedMonthlyEur(
  price: PricingTierPrice,
  billing: PricingBillingInterval,
): number | null {
  if (price.kind === 'from') return price.fromMonthlyEur;
  return billing === 'yearly' ? price.yearlyMonthlyEur : price.monthlyEur;
}

export function pricingPricePrefix(price: PricingTierPrice): string {
  return price.kind === 'from' ? 'ab ' : '';
}

export function pricingCurrencyLabel(): string {
  return PRICING_CURRENCY;
}