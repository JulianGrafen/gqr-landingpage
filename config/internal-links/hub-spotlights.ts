import type { IndustrySlug } from '@/config/industry-solutions';
import type { BlogPost } from '@/lib/blog/types';
import { SIFA_SELBSTSTAENDIG_PATH } from '@/config/silo-pages/sifa-selbststaendig';

export type HubSpotlightLink = {
  readonly label: string;
  readonly href: `/${string}/`;
};

/** Orphan-Landingpages: kontextuelle Hero-Links auf passenden Branchen-Hubs. */
export const ORPHAN_HUB_INDUSTRY_LINKS: Partial<Record<IndustrySlug, HubSpotlightLink>> = {
  reinigungsunternehmen: {
    label: 'Gefahrstoffmanagement für Reinigungsfirmen',
    href: '/gefahrstoffmanagement-reinigungsfirma/',
  },
  'sifa-mehrere-mandanten': {
    label: 'Gefahrstoff Software für selbstständige SiFas',
    href: SIFA_SELBSTSTAENDIG_PATH,
  },
};

export function getOrphanHubIndustryLink(slug: IndustrySlug): HubSpotlightLink | undefined {
  return ORPHAN_HUB_INDUSTRY_LINKS[slug];
}

/** Blog-Beiträge, die im Wissen- und Blog-Hub prominent verlinkt werden (zusätzlich zu posts.json). */
export const ORPHAN_HUB_BLOG_SPOTLIGHTS: readonly BlogPost[] = [
  {
    title: 'Gefahrstoffkataster Excel: Grenzen von Vorlagen im Betrieb',
    url: '/blog/gefahrstoffkataster-in-excel-/',
    date: '2026-04-23',
    author: 'Gefahrstoff-QR Redaktion',
    category: 'Digitalisierung',
    excerpt:
      'Warum Excel-Listen bei Aktualität und Nachweisen schnell Lücken hinterlassen und welche Schritte SiFa und Betriebsleitung statt Abtippen setzen.',
  },
] as const;

export function renderBlogHubSpotlightCard(post: BlogPost): string {
  const [y, m, d] = post.date.split('-').map(Number);
  const formatted = new Date(y, m - 1, d).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const category = post.category.replace(/&/g, '&amp;');
  const title = post.title.replace(/&/g, '&amp;');
  const excerpt = post.excerpt.replace(/&/g, '&amp;');
  return `<article class="blog-list-card" data-blog-card data-category="digitalisierung roi">
<span class="post-category-tag">${category}</span>
<h3><a href="${post.url}">${title}</a></h3>
<p>${excerpt}</p>
<div class="post-card-meta">${formatted} &middot; 7 Min.</div>
<a class="blog-read-more" href="${post.url}">Weiterlesen →</a>
</article>`;
}