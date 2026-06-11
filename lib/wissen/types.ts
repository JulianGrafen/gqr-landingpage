/**
 * Deepinfo Landingpages — zentrale Typen für MDX-Frontmatter und UI.
 * Eine Datei pro Slug unter content/wissen/{slug}.mdx
 */

export interface DeepinfoFaqItem {
  question: string;
  answer: string;
}

export interface DeepinfoComparisonRow {
  criterion: string;
  manual: string;
  gqr: string;
}

export interface DeepinfoComparisonConfig {
  leftColumnTitle?: string;
  rightColumnTitle?: string;
  rows?: DeepinfoComparisonRow[];
}

/**
 * YAML-Frontmatter jeder Deepinfo-MDX-Datei.
 * `title` = H1; `slug` muss dem Dateinamen (ohne .mdx) entsprechen.
 */
export interface DeepinfoPageMeta {
  slug: string;
  title: string;
  metaDescription: string;
  subheadline: string;
  targetAudience: string;
  painPoint: string;
  ctaText: string;
  stickyCtaText: string;
  breadcrumbLabel: string;
  comparison?: DeepinfoComparisonConfig;
  faq: DeepinfoFaqItem[];
}

export interface DeepinfoPage {
  meta: DeepinfoPageMeta;
  mdxSource: string;
}
