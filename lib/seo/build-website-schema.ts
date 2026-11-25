import { PRODUCT_ENTITY } from '@/config/aeo-config';
import { SITE_URL } from '@/config/site-seo';
import { ORGANIZATION_ID } from '@/lib/seo/build-software-application-schema';

export const WEBSITE_ID = `${SITE_URL}/#website`;

/** schema.org WebSite der Marketing-Domain (Suchaktion auf den Blog). */
export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: PRODUCT_ENTITY.name,
    url: PRODUCT_ENTITY.url,
    inLanguage: 'de-DE',
    publisher: { '@id': ORGANIZATION_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}