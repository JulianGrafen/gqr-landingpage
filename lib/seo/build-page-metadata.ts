import type { Metadata } from 'next';
import { SITE_URL } from '@/config/site-seo';

export interface PageMetadataInput {
  path: string;
  title: string;
  description: string;
  ogImageAlt: string;
  ogType?: 'article' | 'website';
  /** false → noindex (z. B. unveröffentlichte Praxisbeispiele). */
  indexable?: boolean;
}

const OG_IMAGE = '/og-image.png';

/** Einheitliche Next.js-Metadata (Canonical, Open Graph, Twitter, Robots) für Marketing-Unterseiten. */
export function buildPageMetadata({
  path,
  title,
  description,
  ogImageAlt,
  ogType = 'article',
  indexable = true,
}: PageMetadataInput): Metadata {
  const canonical = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Gefahrstoff-QR',
      locale: 'de_DE',
      type: ogType,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
    robots: { index: indexable, follow: true },
  };
}
