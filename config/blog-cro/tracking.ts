/**
 * Data-Attribute für CTA-Klick-Tracking in statischen Blog-Artikeln. Gesetzt von
 * `ArticleCtaButton`, ausgelesen von `scripts/article-cta-tracking-mount.ts`.
 * Eigene Datei ohne JSX, damit das Browser-Bundle kein React mitzieht.
 */
export const ARTICLE_CTA_DATA_ATTRIBUTES = {
  location: 'data-cta-location',
  target: 'data-cta-target',
} as const;

/** Bundle-Pfad; einmal pro Artikel vor `</body>` einbinden. */
export const ARTICLE_CTA_TRACKING_SCRIPT_SRC = '/scripts/article-cta-tracking.js';
