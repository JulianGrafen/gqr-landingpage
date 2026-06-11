import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { DeepinfoFaqItem, DeepinfoPage, DeepinfoPageMeta } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content/wissen');

export const DEEPINFO_SLUGS = [
  'gefahrstoffverzeichnis-arztpraxis-muster',
  'gefahrstoffkataster-was-muss-rein',
  'gefahrstoffverzeichnis-muster-kfz-werkstatt',
  'gefahrstoffmanagement-software',
  'gefahrstoffverzeichnis-online-erstellen',
  'gefahrstoffkataster-erstellen-lassen',
  'gefahrstoffkataster-software',
] as const;

export type DeepinfoSlug = (typeof DEEPINFO_SLUGS)[number];

const REQUIRED_META_KEYS: (keyof DeepinfoPageMeta)[] = [
  'slug',
  'title',
  'metaDescription',
  'subheadline',
  'targetAudience',
  'painPoint',
  'ctaText',
  'stickyCtaText',
  'breadcrumbLabel',
  'faq',
];

function isDeepinfoSlug(slug: string): slug is DeepinfoSlug {
  return (DEEPINFO_SLUGS as readonly string[]).includes(slug);
}

function assertMeta(data: Record<string, unknown>, fileSlug: string): DeepinfoPageMeta {
  for (const key of REQUIRED_META_KEYS) {
    if (data[key] === undefined || data[key] === null || data[key] === '') {
      throw new Error(`Deepinfo ${fileSlug}: fehlendes Frontmatter-Feld „${key}“`);
    }
  }

  if (data.slug !== fileSlug) {
    throw new Error(
      `Deepinfo ${fileSlug}: slug im Frontmatter („${data.slug}“) stimmt nicht mit Dateiname überein`,
    );
  }

  const faq = data.faq as DeepinfoFaqItem[];
  if (!Array.isArray(faq) || faq.length === 0) {
    throw new Error(`Deepinfo ${fileSlug}: mindestens ein FAQ-Eintrag erforderlich`);
  }

  return data as unknown as DeepinfoPageMeta;
}

export function getAllDeepinfoSlugs(): DeepinfoSlug[] {
  return DEEPINFO_SLUGS.filter((slug) =>
    fs.existsSync(path.join(CONTENT_DIR, `${slug}.mdx`)),
  );
}

export function getDeepinfoPage(slug: string): DeepinfoPage | null {
  if (!isDeepinfoSlug(slug)) return null;

  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const meta = assertMeta(data as Record<string, unknown>, slug);

  return {
    meta,
    mdxSource: content.trim(),
  };
}

export function getDeepinfoCanonicalPath(slug: DeepinfoSlug): string {
  return `/wissen/${slug}/`;
}
