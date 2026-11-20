import type { Metadata } from 'next';
import type { TrustPageConfig } from '@/config/trust/types';
import { buildMetadata, withBrandSuffix } from '@/lib/seo/buildMetadata';

/** Metadata der Decision-Layer-Seiten aus derselben Config wie Hero und JSON-LD. */
export function buildTrustPageMetadata(config: TrustPageConfig, options: { indexable?: boolean } = {}): Metadata {
  return buildMetadata({
    path: config.path,
    title: withBrandSuffix(config.seo.title),
    socialTitle: config.seo.title,
    description: config.seo.description,
    ogImageAlt: config.seo.ogImageAlt,
    ogType: 'article',
    indexable: options.indexable,
  });
}
