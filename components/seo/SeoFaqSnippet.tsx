import Script from 'next/script';
import { buildFaqPageSchema } from '@/lib/seo/build-faq-page-schema';
import type { SeoFaqItem } from '@/lib/seo/seo-faq-types';

export type SeoFaqSnippetProps = {
  /** FAQ-Paare — prop-gesteuert für verschiedene Landingpages. */
  items: SeoFaqItem[];
  /** Eindeutige Script-ID (wichtig bei mehreren Snippets pro Seite). */
  id?: string;
};

/**
 * FAQPage JSON-LD für B2B-Compliance-Landingpages.
 * Rendert ein einzelnes, Google-kompatibles FAQPage-Schema (@type pro Block).
 */
export function SeoFaqSnippet({ items, id = 'gqr-seo-faq-page-jsonld' }: SeoFaqSnippetProps) {
  if (items.length === 0) {
    return null;
  }

  const schema = buildFaqPageSchema(items);

  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Alternative für Server Components ohne next/script (z. B. Layout-Head). */
export function SeoFaqJsonLdInline({ items, id = 'gqr-seo-faq-page-jsonld' }: SeoFaqSnippetProps) {
  if (items.length === 0) {
    return null;
  }

  const schema = buildFaqPageSchema(items);

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
