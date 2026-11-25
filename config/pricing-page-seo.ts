import { SITE_URL } from '@/config/site-seo';
import type { SeoMetaInput } from '@/lib/seo/buildMetadata';

/** Dedizierte Preisseite (/pricing/): gleiche Tarife wie #preise auf der Startseite. */
export const PRICING_PAGE_PATH = '/pricing/' as const;

export const PRICING_PAGE_SEO: SeoMetaInput = {
  path: PRICING_PAGE_PATH,
  title: 'Preise & Tarife | Gefahrstoff-QR',
  description:
    'Nettopreise für Betriebe und SiFas: KMU Basis ab 49 EUR/Monat (jährlich), SiFa Multi-Mandant ab 189 EUR. 3 SDBs im Browser testen.',
  ogImageAlt: 'Gefahrstoff-QR Preise für Betriebe und externe SiFas',
  ogType: 'website',
  indexable: true,
};

export const PRICING_PAGE_CANONICAL = `${SITE_URL}${PRICING_PAGE_PATH}` as const;