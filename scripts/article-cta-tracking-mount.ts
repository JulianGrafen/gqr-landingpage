/**
 * Klick-Tracking für CTAs in statischen Blog-Artikeln (Bundle: `scripts/article-cta-tracking.js`).
 * Liest `data-cta-location` / `data-cta-target` (siehe `components/blog-cro/ArticleCtaButton.tsx`)
 * und sendet `article_cta_click` über das anonyme Funnel-Tracking.
 */
import { trackFunnelEvent } from '../lib/analytics/funnel';
import { ARTICLE_CTA_DATA_ATTRIBUTES } from '../config/blog-cro/tracking';

function readRefParam(href: string): string | null {
  try {
    return new URL(href, window.location.origin).searchParams.get('ref');
  } catch {
    return null;
  }
}

function handleDocumentClick(event: MouseEvent): void {
  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
    `a[${ARTICLE_CTA_DATA_ATTRIBUTES.location}]`,
  );
  if (!link) return;

  trackFunnelEvent('article_cta_click', {
    cta_location: link.getAttribute(ARTICLE_CTA_DATA_ATTRIBUTES.location),
    cta_target: link.getAttribute(ARTICLE_CTA_DATA_ATTRIBUTES.target),
    ref: readRefParam(link.href),
  });
}

document.addEventListener('click', handleDocumentClick);
