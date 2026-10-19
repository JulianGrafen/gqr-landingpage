import { SITE_URL } from '@/config/site-seo';

const SITE_HOST = new URL(SITE_URL).host;

export type ParsedPageMeta = {
  canonical: string | null;
  noindex: boolean;
};

export function parsePageMeta(html: string): ParsedPageMeta {
  const robotsMatch = html.match(
    /<meta\s+[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i,
  );
  const robotsContent = robotsMatch?.[1]?.toLowerCase() ?? '';
  const noindex = /\bnoindex\b/.test(robotsContent);

  const canonicalMatch =
    html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ??
    html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);

  const rawCanonical = canonicalMatch?.[1]?.trim() ?? null;
  if (!rawCanonical) {
    return { canonical: null, noindex };
  }

  try {
    const url = new URL(rawCanonical, SITE_URL);
    if (url.host !== SITE_HOST) {
      // Foreign canonical: not indexable on gefahrstoff-qr.de.
      return { canonical: null, noindex: true };
    }
    return { canonical: normalizeSitemapLoc(url.href), noindex };
  } catch {
    return { canonical: null, noindex };
  }
}

/** Canonical sitemap URL: https://gefahrstoff-qr.de/path/ (root and *.html paths exempt from trailing slash). */
export function normalizeSitemapLoc(href: string): string {
  const url = new URL(href);
  if (url.pathname === '/' || url.pathname === '') {
    return `${url.origin}/`;
  }
  if (url.pathname.endsWith('.html')) {
    return `${url.origin}${url.pathname}`;
  }
  const path = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
  return `${url.origin}${path}`;
}

export function pathnameToLoc(pathname: string): string {
  return normalizeSitemapLoc(`${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`);
}
