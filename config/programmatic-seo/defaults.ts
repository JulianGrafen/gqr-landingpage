import { HOME_HERO } from '@/config/home-sections/hero';
import { DSGVO_HOSTING_BADGE } from '@/config/legal/site-copy';

/** Standard-USP unter dem Hero (Startseite + Branchen-Slugs ohne eigene Liste). */
export const DEFAULT_SLUG_HERO_USP_BULLETS = HOME_HERO.benefitBullets;

/** Vertrauensmerkmale unter der SDB-Dropzone (überall gleich). */
export const SDB_DROPZONE_TRUST_FEATURES = [
  DSGVO_HOSTING_BADGE,
  'Keine Installation',
  'Extraktion aus Ihrem SDB-PDF',
] as const;

/** Microcopy unter Hero-CTAs auf Produkt-Slugs. */
export const SLUG_HERO_PROOF_LINE = 'Kostenlos für 5 Stoffe · ohne Kreditkarte · Hosting in Deutschland';
