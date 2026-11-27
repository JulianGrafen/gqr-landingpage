import {
  BA_OG_IMAGE_ALT,
  BA_SERP_DESCRIPTION_CANDIDATES,
  BA_SERP_TITLE_CANDIDATES,
} from '@/config/betriebsanweisung/serp-snippet';
import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import { SITE_URL } from '@/config/site-seo';
import { fitDescription, fitTitle, type SeoMetaInput } from '@/lib/seo/buildMetadata';
import { buildBreadcrumbSchema, type BreadcrumbItem } from '@/lib/seo/build-breadcrumb-schema';
import { buildFaqPageSchema } from '@/lib/seo/build-faq-page-schema';
import type { SeoFaqItem } from '@/lib/seo/seo-faq-types';
import type { JsonLdObject } from '@/lib/seo/serialize-json-ld';
import { marketingHomeBreadcrumbItem } from '@/lib/seo/marketing-home-breadcrumb';
import { resolveBetriebsanweisungGeminiCroTitle } from '@/lib/betriebsanweisung/resolve-gemini-cro-ba-override';

/** Stand der Template-Inhalte (für dateModified); bei inhaltlichen Template-Änderungen anpassen. */
export const BETRIEBSANWEISUNG_CONTENT_UPDATED = '2026-11-19';

export function buildBetriebsanweisungCanonical(entry: HazardousSubstanceSeoEntry): string {
  return `${SITE_URL}${buildBetriebsanweisungPath(entry)}`;
}

export function buildBetriebsanweisungPath(entry: HazardousSubstanceSeoEntry): `/${string}/` {
  return `/betriebsanweisung/${entry.slug}/`;
}

/** SERP-Title (≤ 58 Zeichen) aus der gemeinsamen Kandidaten-Kaskade. */
export function buildBetriebsanweisungTitle(entry: HazardousSubstanceSeoEntry): string {
  const geminiTitle = resolveBetriebsanweisungGeminiCroTitle(entry.slug);
  if (geminiTitle) return geminiTitle;
  return fitTitle(BA_SERP_TITLE_CANDIDATES.map((candidate) => candidate(entry.substanceName)));
}

/**
 * Meta- und OG-Description (≤ 155 Zeichen), identisch für alle Stoffseiten.
 * Der rechtliche Hinweis (KI-gestützter Entwurf, Freigabe nach § 14 GefStoffV) bleibt sichtbar auf der Seite.
 */
export function buildBetriebsanweisungMetaDescription(entry: HazardousSubstanceSeoEntry): string {
  return fitDescription(BA_SERP_DESCRIPTION_CANDIDATES.map((candidate) => candidate(entry.substanceName)));
}

/** Eingabe für `buildMetadata` — Title, Description und Canonical aus einer Quelle. */
export function buildBetriebsanweisungSeoMeta(entry: HazardousSubstanceSeoEntry): SeoMetaInput {
  return {
    path: buildBetriebsanweisungPath(entry),
    title: buildBetriebsanweisungTitle(entry),
    description: buildBetriebsanweisungMetaDescription(entry),
    ogImageAlt: BA_OG_IMAGE_ALT(entry.substanceName),
    ogType: 'article',
  };
}

export function buildBetriebsanweisungBreadcrumbs(entry: HazardousSubstanceSeoEntry): BreadcrumbItem[] {
  return [
    marketingHomeBreadcrumbItem(),
    { label: 'Betriebsanweisungen', href: '/betriebsanweisung/' },
    { label: entry.substanceName },
  ];
}

/** Alle JSON-LD-Objekte der Stoffseite (WebPage, BreadcrumbList, FAQPage). */
export function buildBetriebsanweisungSchemas(
  entry: HazardousSubstanceSeoEntry,
  faqItems: readonly SeoFaqItem[],
): JsonLdObject[] {
  const canonical = buildBetriebsanweisungCanonical(entry);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: buildBetriebsanweisungTitle(entry),
      description: buildBetriebsanweisungMetaDescription(entry),
      inLanguage: 'de-DE',
      dateModified: BETRIEBSANWEISUNG_CONTENT_UPDATED,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      about: { '@type': 'Thing', name: `Betriebsanweisung ${entry.substanceName}` },
      audience: { '@type': 'BusinessAudience', audienceType: entry.typicalIndustries.join(', ') },
    },
    buildBreadcrumbSchema(buildBetriebsanweisungBreadcrumbs(entry)),
    buildFaqPageSchema(faqItems),
  ];
}
