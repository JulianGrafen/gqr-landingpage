import type { SeoSiloFaqItem } from '@/config/seo-silo/types';
import { buildFaqPageSchema } from '@/lib/seo/build-faq-page-schema';
import { buildSoftwareApplicationSchema } from '@/lib/seo/build-software-application-schema';
import type { JsonLdObject } from '@/lib/seo/serialize-json-ld';

/**
 * JSON-LD einer Produkt-/Silo-Landingpage: FAQPage (gekoppelt an die sichtbaren FAQs)
 * plus die zentrale SoftwareApplication-Entität.
 */
export function buildLandingSchemaBundle(faq: SeoSiloFaqItem[]): JsonLdObject[] {
  return [buildFaqPageSchema(faq), buildSoftwareApplicationSchema()];
}
