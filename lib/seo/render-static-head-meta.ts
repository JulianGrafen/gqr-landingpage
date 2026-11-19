import { BRAND_NAME, resolveSeoMeta, type SeoMetaInput } from '@/lib/seo/buildMetadata';

/** Minimales HTML-Attribut-Escaping für Meta-Inhalte. */
function escapeAttribute(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Head-Meta-Block für statische HTML-Seiten (index.html, /loesungen/kfz-werkstatt/).
 * Gleiche Quelle wie `buildMetadata` → Next-Routen und statisches HTML können nicht auseinanderlaufen.
 * Wird zwischen <!--AEO:HEAD_META--> … <!--/AEO:HEAD_META--> eingesetzt.
 */
export function renderStaticHeadMeta(input: SeoMetaInput): string {
  const meta = resolveSeoMeta(input);
  const robots = meta.indexable
    ? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    : 'noindex, follow';

  return [
    `<title>${escapeAttribute(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttribute(meta.description)}">`,
    `<link rel="canonical" href="${meta.canonical}" />`,
    `<link rel="alternate" hreflang="de-DE" href="${meta.canonical}" />`,
    `<meta property="og:title" content="${escapeAttribute(meta.socialTitle)}">`,
    `<meta property="og:description" content="${escapeAttribute(meta.description)}">`,
    `<meta property="og:type" content="${meta.ogType}">`,
    `<meta property="og:url" content="${meta.canonical}">`,
    `<meta property="og:image" content="${meta.ogImageUrl}">`,
    `<meta property="og:image:alt" content="${escapeAttribute(meta.ogImageAlt)}">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:locale" content="de_DE">',
    `<meta property="og:site_name" content="${BRAND_NAME}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:site" content="@gefahrstoff_qr">',
    `<meta name="twitter:title" content="${escapeAttribute(meta.socialTitle)}">`,
    `<meta name="twitter:description" content="${escapeAttribute(meta.description)}">`,
    `<meta name="twitter:image" content="${meta.ogImageUrl}">`,
    `<meta name="robots" content="${robots}">`,
  ].join('\n ');
}
