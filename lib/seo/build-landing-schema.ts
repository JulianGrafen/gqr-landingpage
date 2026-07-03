import type {
  SeoSiloFaqItem,
  SeoSiloSchemaBundle,
  SoftwareApplicationSchemaConfig,
} from '@/config/seo-silo/types';
import schemaBase from '@/config/seo-silo/schema-base.json';
import { buildFaqPageSchema as buildFaqPageSchemaFromItems } from '@/lib/seo/build-faq-page-schema';
import { SITE_URL } from '@/config/site-seo';

type SchemaBase = typeof schemaBase;

const baseSoftware = schemaBase.softwareApplication;

/** FAQPage JSON-LD aus FAQ-Array */
export function buildFaqPageSchema(faq: SeoSiloFaqItem[]): SeoSiloSchemaBundle['faqPage'] {
  return buildFaqPageSchemaFromItems(faq);
}

/** SoftwareApplication JSON-LD — Basis aus schema-base.json, optional page-spezifisch erweitert */
export function buildSoftwareApplicationSchema(
  overrides?: Partial<SoftwareApplicationSchemaConfig> & {
    pageUrl?: string;
    pageDescription?: string;
  },
): SeoSiloSchemaBundle['softwareApplication'] {
  const merged = { ...baseSoftware, ...overrides };
  const operatingSystem = Array.isArray(merged.operatingSystem)
    ? merged.operatingSystem.join(', ')
    : merged.operatingSystem;

  const schema: SeoSiloSchemaBundle['softwareApplication'] = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: merged.name,
    applicationCategory: merged.applicationCategory,
    operatingSystem,
    description: overrides?.pageDescription ?? merged.description,
    url: merged.url,
    offers: {
      '@type': 'Offer',
      price: merged.offers.price,
      priceCurrency: merged.offers.priceCurrency,
      description: merged.offers.description,
    },
  };

  const features = merged.featureList ?? baseSoftware.featureList;
  if (features?.length) {
    schema.featureList = features.join('; ');
  }

  const audience = merged.audience ?? baseSoftware.audience;
  if (audience) {
    schema.audience = {
      '@type': 'Audience',
      audienceType: audience.audienceType,
      geographicArea: {
        '@type': 'AdministrativeArea',
        name: audience.geographicArea,
      },
    };
  }

  if (overrides?.pageUrl) {
    schema.url = overrides.pageUrl.startsWith('http')
      ? overrides.pageUrl
      : `${SITE_URL}${overrides.pageUrl}`;
  }

  return schema;
}

/** Kombiniertes Schema-Bundle für eine Silo-Landingpage */
export function buildLandingSchemaBundle(
  faq: SeoSiloFaqItem[],
  softwareOverrides?: Parameters<typeof buildSoftwareApplicationSchema>[0],
): SeoSiloSchemaBundle {
  return {
    faqPage: buildFaqPageSchema(faq),
    softwareApplication: buildSoftwareApplicationSchema(softwareOverrides),
  };
}
