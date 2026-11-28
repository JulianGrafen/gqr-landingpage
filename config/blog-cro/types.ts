/**
 * Typen für Conversion-Bausteine in statischen Blog-Artikeln (`blog/<slug>/index.html`).
 * Copy liegt pro Artikel in `config/blog-cro/<artikel>.ts`, gerendert wird über
 * `scripts/sync-blog-article-cro.tsx` zwischen `<!--AEO:ARTICLE_CRO_*-->`-Markern.
 */
import type { ComparisonRow } from '@/components/expert-blog/ComparisonTable';
import type { GhsPictogramCode } from '@/lib/ghs/ghs-types';

/** Messpunkt eines CTAs, landet als `cta_location` im Funnel-Event `article_cta_click`. */
export type ArticleCtaLocation = 'top_callout' | 'mid_comparison' | 'footer_primary' | 'footer_pricing';

/** Wohin der CTA führt; erlaubt die Auswertung „Dropzone vs. Pricing“. */
export type ArticleCtaTarget = 'live_demo' | 'pricing';

export type ArticleCtaLink = {
  label: string;
  href: string;
  location: ArticleCtaLocation;
  target: ArticleCtaTarget;
};

export type ArticleCtaBannerCopy = {
  headline: string;
  body: string;
  primaryCta: ArticleCtaLink;
  secondaryCta?: ArticleCtaLink;
  /** Kurze, belegbare Vertrauenspunkte (werden mit „·“ verbunden). */
  trustItems: readonly string[];
};

export type ExcelVsQrComparisonCopy = {
  heading: string;
  caption: string;
  excelColumnTitle: string;
  qrColumnTitle: string;
  rows: readonly ComparisonRow[];
  cta?: ArticleCtaLink;
};

export type OutputPreviewField = {
  label: string;
  value: string;
};

export type OutputPreviewCopy = {
  eyebrow: string;
  productName: string;
  /** Bild und Alt-Text kommen aus `lib/ghs/ghs-assets.ts`. */
  pictogramCode: GhsPictogramCode;
  fields: readonly OutputPreviewField[];
  draftBadges: readonly string[];
  reviewNote: string;
};

export type ProductScreenshot = {
  /** Fallback-Bild (PNG/JPG), Pfad relativ zur Site-Root. */
  src: string;
  webpSrc: string;
  alt: string;
  width: number;
  height: number;
  /** `portrait` begrenzt die Breite (Smartphone-Screens). */
  orientation: 'landscape' | 'portrait';
};

export type ScreenshotGalleryItem = {
  screenshot: ProductScreenshot;
  caption: string;
};

/** Alle CRO-Bausteine eines Artikels; fehlende Blöcke werden nicht gerendert. */
export type ArticleCroPage = {
  /** Ordner der statischen Seite, z. B. `blog/reinigung-gefahrstoffkataster-vorlage`. */
  sourcePath: string;
  topCallout?: ArticleCtaBannerCopy;
  comparison?: ExcelVsQrComparisonCopy;
  outputPreview?: OutputPreviewCopy;
  screenshots?: readonly ScreenshotGalleryItem[];
  closingCta?: ArticleCtaBannerCopy;
};
