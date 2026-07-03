import type { FaqPageJsonLd, SeoFaqItem } from '@/lib/seo/seo-faq-types';

/** Baut valides FAQPage JSON-LD aus einem FAQ-Array. */
export function buildFaqPageSchema(items: SeoFaqItem[]): FaqPageJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/** Serialisiert FAQPage JSON-LD für statische HTML-Einbettung oder Tests. */
export function serializeFaqPageSchema(items: SeoFaqItem[], indent = 2): string {
  return JSON.stringify(buildFaqPageSchema(items), null, indent);
}
