import { SITE_URL } from '@/config/site-seo';
import type { SeoMetaInput } from '@/lib/seo/buildMetadata';

/** Dedizierte Preisseite (/pricing/): gleiche Tarife wie #preise auf der Startseite. */
export const PRICING_PAGE_PATH = '/pricing/' as const;

export const PRICING_PAGE_SEO: SeoMetaInput = {
  path: PRICING_PAGE_PATH,
  title: 'Preise & Tarife | Gefahrstoff-QR',
  description:
    'Klare Nettopreise für Betriebe und externe SiFas: KMU Basis ab 49 EUR/Monat (jährlich), KMU Pro, SiFa Multi-Mandant und Enterprise ab 399 EUR/Monat. Kostenlos mit 3 SDBs testen.',
  ogImageAlt: 'Gefahrstoff-QR Preise für Betriebe und externe SiFas',
  ogType: 'website',
  indexable: true,
};

export const PRICING_PAGE_CANONICAL = `${SITE_URL}${PRICING_PAGE_PATH}` as const;