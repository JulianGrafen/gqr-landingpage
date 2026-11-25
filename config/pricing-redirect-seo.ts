/**
 * Legacy: /pricing/ war eine Weiterleitung auf /#preise.
 * Aktuelle Preisseite: app/pricing/page.tsx und config/pricing-page-seo.ts.
 */
export {
  PRICING_PAGE_CANONICAL as PRICING_REDIRECT_CANONICAL,
  PRICING_PAGE_SEO as PRICING_REDIRECT_SEO,
} from '@/config/pricing-page-seo';

export const PRICING_REDIRECT_TARGET_HREF = '/pricing/' as const;