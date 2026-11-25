import { TRGS510_SEO_FAQ } from '@/config/trgs510/trgs510-seo-faq';
import { TRGS510_WEB_APPLICATION_SCHEMA } from '@/config/trgs510/trgs510-web-application-schema';
import { buildBreadcrumbSchema } from '@/lib/seo/build-breadcrumb-schema';
import { buildFaqPageSchema } from '@/lib/seo/build-faq-page-schema';
import { marketingHomeBreadcrumbItem } from '@/lib/seo/marketing-home-breadcrumb';
import type { JsonLdObject } from '@/lib/seo/serialize-json-ld';

const TRGS510_BREADCRUMB = [marketingHomeBreadcrumbItem(), { label: 'Check' }] as const;

export function buildTrgs510PageSchemas(): JsonLdObject[] {
  return [
    TRGS510_WEB_APPLICATION_SCHEMA,
    buildBreadcrumbSchema(TRGS510_BREADCRUMB),
    buildFaqPageSchema(TRGS510_SEO_FAQ),
  ];
}