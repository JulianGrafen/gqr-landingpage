import type { Metadata } from 'next';
import { SITE_URL } from '@/config/site-seo';

/**
 * Zentrale Meta-Tag-Logik für alle Marketing-Seiten (Next.js-Routen und statisches HTML).
 *
 * Grundsätze (CTR-Optimierung, GSC 11/2026):
 * - Titles werden als `absolute` ausgegeben: Die Länge im SERP ist exakt steuerbar; das
 *   Layout-Template („%s | Gefahrstoff-QR“) würde sonst 17 Zeichen anhängen und kürzen lassen.
 * - Titel/Beschreibung entstehen aus Kandidatenlisten: der erste Kandidat, der ins Limit passt, gewinnt.
 * - Keine Emojis (B2B-Arbeitsschutz; Google schreibt solche Snippets häufig um).
 */

export const SEO_LIMITS = {
  /** Sicher unter der Pixelbreite (~580 px) für deutsche Titel. */
  titleMax: 58,
  descriptionMin: 140,
  descriptionMax: 155,
} as const;

export const BRAND_NAME = 'Gefahrstoff-QR';
const BRAND_SUFFIX = ` | ${BRAND_NAME}`;
const OG_IMAGE_PATH = '/og-image.png';

const EMOJI_PATTERN = /\p{Extended_Pictographic}/u;

export interface SeoMetaInput {
  /** Pfad mit führendem und abschließendem Slash, z. B. `/loesungen/kfz-werkstatt/` (Startseite: `/`). */
  path: string;
  /** Vollständiger Dokumenttitel (wird nicht mehr durch ein Template ergänzt). */
  title: string;
  description: string;
  ogImageAlt: string;
  /** Optional abweichender Titel für Social Cards (ohne Längenlimit der SERP). */
  socialTitle?: string;
  ogType?: 'article' | 'website';
  /** false → noindex (z. B. Entwürfe). */
  indexable?: boolean;
}

/** Aufgelöste, absolut referenzierte Werte — gemeinsame Basis für Next-Metadata und statisches HTML. */
export interface ResolvedSeoMeta {
  canonical: string;
  title: string;
  socialTitle: string;
  description: string;
  ogImageUrl: string;
  ogImageAlt: string;
  ogType: 'article' | 'website';
  indexable: boolean;
}

/** Erster Kandidat, der in `max` Zeichen passt; sonst der kürzeste Kandidat. */
export function pickFirstFitting(candidates: readonly string[], max: number): string {
  if (candidates.length === 0) throw new Error('pickFirstFitting: keine Kandidaten');
  const fitting = candidates.find((candidate) => candidate.length <= max);
  if (fitting) return fitting;
  return [...candidates].sort((a, b) => a.length - b.length)[0];
}

/** Titel-Kaskade gegen `SEO_LIMITS.titleMax`. */
export function fitTitle(candidates: readonly string[]): string {
  return pickFirstFitting(candidates, SEO_LIMITS.titleMax);
}

/**
 * Beschreibung: bevorzugt der erste Kandidat im Zielkorridor (min–max),
 * sonst der erste, der das Maximum einhält.
 */
export function fitDescription(candidates: readonly string[]): string {
  const inCorridor = candidates.find(
    (candidate) => candidate.length >= SEO_LIMITS.descriptionMin && candidate.length <= SEO_LIMITS.descriptionMax,
  );
  return inCorridor ?? pickFirstFitting(candidates, SEO_LIMITS.descriptionMax);
}

/** Hängt die Marke an, wenn sie noch ins Limit passt (für Seiten ohne eigenen Marken-Bezug). */
export function withBrandSuffix(title: string): string {
  const branded = `${title}${BRAND_SUFFIX}`;
  return branded.length <= SEO_LIMITS.titleMax ? branded : title;
}

function assertNoEmoji(field: string, value: string): void {
  if (EMOJI_PATTERN.test(value)) {
    throw new Error(`SEO ${field} enthält ein Emoji: "${value}"`);
  }
}

export function toCanonicalUrl(path: string): string {
  if (!path.startsWith('/')) throw new Error(`SEO path muss mit "/" beginnen: ${path}`);
  return `${SITE_URL}${path}`;
}

export function resolveSeoMeta(input: SeoMetaInput): ResolvedSeoMeta {
  assertNoEmoji('title', input.title);
  assertNoEmoji('description', input.description);

  return {
    canonical: toCanonicalUrl(input.path),
    title: input.title,
    socialTitle: input.socialTitle ?? input.title,
    description: input.description,
    ogImageUrl: `${SITE_URL}${OG_IMAGE_PATH}`,
    ogImageAlt: input.ogImageAlt,
    ogType: input.ogType ?? 'article',
    indexable: input.indexable ?? true,
  };
}

/** Next.js-Metadata (Canonical, Open Graph, Twitter, Robots) aus einer Quelle. */
export function buildMetadata(input: SeoMetaInput): Metadata {
  const meta = resolveSeoMeta(input);

  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: meta.canonical },
    openGraph: {
      title: meta.socialTitle,
      description: meta.description,
      url: meta.canonical,
      siteName: BRAND_NAME,
      locale: 'de_DE',
      type: meta.ogType,
      images: [{ url: meta.ogImageUrl, width: 1200, height: 630, alt: meta.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.socialTitle,
      description: meta.description,
      images: [meta.ogImageUrl],
    },
    robots: { index: meta.indexable, follow: true },
  };
}
