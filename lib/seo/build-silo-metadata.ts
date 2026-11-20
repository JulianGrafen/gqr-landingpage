import type { Metadata } from 'next';
import type { SeoSiloPageConfig } from '@/config/seo-silo/types';
import { buildMetadata } from '@/lib/seo/buildMetadata';

/**
 * Metadata der SEO-Silo-Seiten. `seo.title` enthält die Marke bereits („… | GQR“) und wird daher
 * absolut ausgegeben — vorher hängte das Layout-Template zusätzlich „| Gefahrstoff-QR“ an.
 */
export function buildSiloMetadata(config: SeoSiloPageConfig): Metadata {
  return buildMetadata({
    path: config.seo.canonicalPath,
    title: config.seo.title,
    description: config.seo.description,
    ogImageAlt: config.seo.ogImageAlt,
    ogType: 'website',
  });
}
