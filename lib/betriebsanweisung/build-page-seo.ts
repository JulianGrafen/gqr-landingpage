import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import { SITE_URL } from '@/config/site-seo';
import { buildBreadcrumbSchema, type BreadcrumbItem } from '@/lib/seo/build-breadcrumb-schema';
import { buildFaqPageSchema } from '@/lib/seo/build-faq-page-schema';
import type { SeoFaqItem } from '@/lib/seo/seo-faq-types';
import type { JsonLdObject } from '@/lib/seo/serialize-json-ld';
import { marketingHomeBreadcrumbItem } from '@/lib/seo/marketing-home-breadcrumb';

/** Stand der Template-Inhalte (für dateModified); bei inhaltlichen Template-Änderungen anpassen. */
export const BETRIEBSANWEISUNG_CONTENT_UPDATED = '2026-11-07';

const META_DESCRIPTION_MAX = 158;

export function buildBetriebsanweisungCanonical(entry: HazardousSubstanceSeoEntry): string {
  return `${SITE_URL}/betriebsanweisung/${entry.slug}/`;
}

/** Title ohne Marken-Suffix (das ergänzt das Root-Layout-Template). */
export function buildBetriebsanweisungTitle(entry: HazardousSubstanceSeoEntry): string {
  return `Betriebsanweisung ${entry.substanceName} (TRGS 555): Entwurf aus Ihrem SDB`;
}

function describeWithIndustries(substanceName: string, industries: readonly string[], withCta: boolean): string {
  const context = industries.length > 0 ? ` für ${industries.join(' und ')}` : '';
  const cta = withCta ? ' Kostenlos testen.' : '';
  return `Betriebsanweisung ${substanceName} (TRGS 555)${context}: KI-gestützter Entwurf aus Ihrem SDB, Freigabe durch die SiFa.${cta}`;
}

/**
 * Meta-Description mit Branchenbezug, damit sich die Seiten im Snippet unterscheiden.
 * Bevorzugt mehr Branchen vor dem CTA-Zusatz; Fallback ist die gepflegte `metaDescription`.
 */
export function buildBetriebsanweisungMetaDescription(entry: HazardousSubstanceSeoEntry): string {
  for (const count of [2, 1, 0]) {
    for (const withCta of [true, false]) {
      const industries = entry.typicalIndustries.slice(0, count);
      const description = describeWithIndustries(entry.substanceName, industries, withCta);
      if (description.length <= META_DESCRIPTION_MAX) return description;
    }
  }
  return entry.metaDescription;
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
      name: `${buildBetriebsanweisungTitle(entry)} | Gefahrstoff-QR`,
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
