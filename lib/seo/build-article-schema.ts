import { COMPANY } from '@/config/company';
import { SITE_URL } from '@/config/site-seo';
import { ORGANIZATION_ID } from '@/lib/seo/build-software-application-schema';

export interface ArticleSchemaInput {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
}

export type ArticleJsonLd = {
  '@context': 'https://schema.org';
  '@type': 'Article';
  '@id': string;
  headline: string;
  description: string;
  inLanguage: 'de-DE';
  datePublished: string;
  dateModified: string;
  mainEntityOfPage: { '@type': 'WebPage'; '@id': string };
  author: { '@type': 'Organization'; '@id': string; name: string };
  publisher: { '@type': 'Organization'; '@id': string; name: string; url: string };
};

/** schema.org Article für Fach- und Vertrauensseiten (AEO-Zitierbarkeit, Autor = Organisation). */
export function buildArticleSchema(input: ArticleSchemaInput): ArticleJsonLd {
  const url = `${SITE_URL}${input.path}`;
  const organization = { '@type': 'Organization' as const, '@id': ORGANIZATION_ID, name: COMPANY.brandName };

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: input.headline,
    description: input.description,
    inLanguage: 'de-DE',
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: organization,
    publisher: { ...organization, url: `${SITE_URL}/` },
  };
}
