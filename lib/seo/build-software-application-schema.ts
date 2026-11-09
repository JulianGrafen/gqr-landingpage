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

function buildOffer(plan: PricingPlan) {
  const price = String(plan.monthlyPriceEur);
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
    operatingSystem: 'Web, Browser-based',
    description: `${PRODUCT_ENTITY.summary} ${HUMAN_IN_THE_LOOP_NOTICE}`,
    featureList: CORE_FEATURES.map((feature) => feature.term),
    audience: {
      '@type': 'BusinessAudience',
      audienceType: BUSINESS_AUDIENCE_TYPES.join(', '),
      geographicArea: { '@type': 'Country', name: 'Deutschland' },
    },
    provider: { '@id': ORGANIZATION_ID },
    offers: PRICING_PLANS.map(buildOffer),
  };
}
