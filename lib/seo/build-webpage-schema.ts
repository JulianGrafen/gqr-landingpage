import { SITE_URL } from '@/config/site-seo';
import { resolveSeoMeta, type SeoMetaInput } from '@/lib/seo/buildMetadata';
import { ORGANIZATION_ID, SOFTWARE_APPLICATION_ID } from '@/lib/seo/build-software-application-schema';

export interface WebPageSchemaOptions {
  dateModified: string;
  /** CSS-Selektoren für schema.org Speakable (AEO / Sprachassistenten). */
  speakableSelectors?: readonly string[];
}

/** schema.org WebPage je URL (eigene `@id` pro Seite, verknüpft mit WebSite, Software und Organisation). */
export function buildWebPageSchema(input: SeoMetaInput, options: WebPageSchemaOptions) {
  const meta = resolveSeoMeta(input);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${meta.canonical}#webpage`,
    url: meta.canonical,
    name: meta.title,
    description: meta.description,
    inLanguage: 'de-DE',
    dateModified: options.dateModified,
    isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'Gefahrstoff-QR', url: `${SITE_URL}/` },
    about: { '@id': SOFTWARE_APPLICATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    ...(options.speakableSelectors
      ? { speakable: { '@type': 'SpeakableSpecification', cssSelector: [...options.speakableSelectors] } }
      : {}),
  };
}
