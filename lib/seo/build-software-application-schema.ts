import {
  BUSINESS_AUDIENCE_TYPES,
  CORE_FEATURES,
  HUMAN_IN_THE_LOOP_NOTICE,
  PRODUCT_ENTITY,
} from '@/config/aeo-config';
import { PRICING_CURRENCY, PRICING_PLANS, type PricingPlan } from '@/config/pricing-plans';
import { SITE_URL } from '@/config/site-seo';

export const SOFTWARE_APPLICATION_ID = `${SITE_URL}/#software`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Kernbeschreibung des Clusters "Gefahrstoffmanagement Software" (GSC-Fokus, siehe AGENTS.md für Compliance). */
const SOFTWARE_SCHEMA_DESCRIPTION =
  'Gefahrstoffmanagement Software und digitales Gefahrstoffkataster nach § 6 GefStoffV für KMU und externe SiFas.';

/** Ganze Beträge ohne Nachkommastellen ("0", "49"), sonst zwei Stellen — schema.org akzeptiert beides. */
function formatSchemaPrice(amountEur: number): string {
  return Number.isInteger(amountEur) ? String(amountEur) : amountEur.toFixed(2);
}

function buildOffer(plan: PricingPlan) {
  const price = formatSchemaPrice(plan.monthlyPriceEur);
  return {
    '@type': 'Offer',
    name: plan.name,
    description: `${plan.limits}. ${plan.features.join(', ')}`,
    price,
    priceCurrency: PRICING_CURRENCY,
    ...(plan.monthlyPriceEur > 0
      ? {
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price,
            priceCurrency: PRICING_CURRENCY,
            unitText: 'MONTH',
          },
        }
      : {}),
  };
}

/** Preisspanne aller Pakete (monatliche Abrechnung) als AggregateOffer mit den Einzelangeboten. */
function buildAggregateOffer() {
  const monthlyPrices = PRICING_PLANS.map((plan) => plan.monthlyPriceEur);
  return {
    '@type': 'AggregateOffer',
    priceCurrency: PRICING_CURRENCY,
    lowPrice: formatSchemaPrice(Math.min(...monthlyPrices)),
    highPrice: formatSchemaPrice(Math.max(...monthlyPrices)),
    offerCount: PRICING_PLANS.length,
    offers: PRICING_PLANS.map(buildOffer),
  };
}

/**
 * schema.org SoftwareApplication (B2B SaaS) aus der zentralen AEO-Konfiguration.
 * Startseite und Produktseiten geben dieselbe Entität (`@id`) identisch aus, damit Suchmaschinen
 * und KI-Systeme keine widersprüchlichen Angaben zum Produkt sehen.
 */
export function buildSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': SOFTWARE_APPLICATION_ID,
    name: PRODUCT_ENTITY.name,
    alternateName: [...PRODUCT_ENTITY.alternateNames],
    url: PRODUCT_ENTITY.url,
    inLanguage: 'de-DE',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Gefahrstoffmanagement Software',
    operatingSystem: 'Web browser',
    description: `${SOFTWARE_SCHEMA_DESCRIPTION} ${PRODUCT_ENTITY.summary} ${HUMAN_IN_THE_LOOP_NOTICE}`,
    featureList: CORE_FEATURES.map((feature) => feature.term),
    audience: {
      '@type': 'BusinessAudience',
      audienceType: BUSINESS_AUDIENCE_TYPES.join(', '),
      geographicArea: { '@type': 'Country', name: 'Deutschland' },
    },
    provider: { '@id': ORGANIZATION_ID },
    offers: buildAggregateOffer(),
  };
}
