import { TARIF_VORSCHAU_PLAN_DISPLAY_NAME } from '@/config/pricing-plans';
import { SITE_URL } from '@/config/site-seo';
import type { SeoMetaInput } from '@/lib/seo/buildMetadata';

/**
 * /pricing/ leitet auf die Startseiten-Ankersektion #preise (Legacy-URL nach Domain-Migration).
 * Kein DPP-Flash-Erbe: Meta, Texte und Canonical spiegeln Gefahrstoff-QR.
 */
export const PRICING_REDIRECT_TARGET_HREF = '/#preise' as const;

export const PRICING_REDIRECT_CANONICAL = `${SITE_URL}${PRICING_REDIRECT_TARGET_HREF}` as const;

export const PRICING_REDIRECT_SEO: SeoMetaInput = {
  path: '/pricing/',
  title: 'Preise & Tarife | Gefahrstoff-QR',
  description: `Transparente Festpreise für Gefahrstoff-QR: ${TARIF_VORSCHAU_PLAN_DISPLAY_NAME} kostenlos, KMU Basis, KMU Pro und SiFa Multi-Mandant. Jährliche Abrechnung Standard, monatlich kündbar.`,
  ogImageAlt: 'Gefahrstoff-QR Preise: KMU Basis, Pro und SiFa Multi-Mandant',
  ogType: 'website',
  /** Zwischenseite nur Weiterleitung; keine Indexierung neben #preise (Legacy /pricing/ nach Domain-Umzug). */
  indexable: false,
};