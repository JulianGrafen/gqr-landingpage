import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import { GEMINI_CRO_BA_OVERRIDES } from '@/config/seo/gemini-cro-2026-11-24';
import { BETRIEBSANWEISUNG_STRIKING_OVERRIDES } from '@/config/seo/striking-distance-2026-11-23';
import type { HazardousSubstanceSlug } from '@/config/betriebsanweisung/entries';
import { SITE_URL } from '@/config/site-seo';
import { fitDescription, fitTitle, type SeoMetaInput } from '@/lib/seo/buildMetadata';
import { buildBreadcrumbSchema, type BreadcrumbItem } from '@/lib/seo/build-breadcrumb-schema';
import { buildFaqPageSchema } from '@/lib/seo/build-faq-page-schema';
import type { SeoFaqItem } from '@/lib/seo/seo-faq-types';
import type { JsonLdObject } from '@/lib/seo/serialize-json-ld';
import { marketingHomeBreadcrumbItem } from '@/lib/seo/marketing-home-breadcrumb';

/** Stand der Template-Inhalte (für dateModified); bei inhaltlichen Template-Änderungen anpassen. */
export const BETRIEBSANWEISUNG_CONTENT_UPDATED = '2026-11-19';

export function buildBetriebsanweisungCanonical(entry: HazardousSubstanceSeoEntry): string {
  return `${SITE_URL}${buildBetriebsanweisungPath(entry)}`;
}

export function buildBetriebsanweisungPath(entry: HazardousSubstanceSeoEntry): `/${string}/` {
  return `/betriebsanweisung/${entry.slug}/`;
}

/**
 * SERP-Title (Suchintention „Betriebsanweisung <Stoff>“ = fertige Vorlage).
 * Kaskade: Klammer-Variante → Gedankenstrich-Variante → Kurzform, jeweils ≤ SEO_LIMITS.titleMax.
 */
function geminiCroOverride(entry: HazardousSubstanceSeoEntry) {
  return GEMINI_CRO_BA_OVERRIDES[entry.slug as HazardousSubstanceSlug];
}

function strikingOverride(entry: HazardousSubstanceSeoEntry) {
  return BETRIEBSANWEISUNG_STRIKING_OVERRIDES[entry.slug as HazardousSubstanceSlug];
}

export function buildBetriebsanweisungTitle(entry: HazardousSubstanceSeoEntry): string {
  const gemini = geminiCroOverride(entry);
  if (gemini?.title) return fitTitle([gemini.title]);
  const override = strikingOverride(entry);
  if (override?.title) return fitTitle([override.title]);
  const name = entry.substanceName;
  return fitTitle([
    `Betriebsanweisung ${name} (TRGS 555) – Muster & PDF`,
    `Betriebsanweisung ${name} – TRGS 555 Vorlage & PDF`,
    `Betriebsanweisung ${name} – TRGS 555 Muster`,
    `Betriebsanweisung ${name} (TRGS 555)`,
  ]);
}

/**
 * Meta-Description (Ziel 140–155 Zeichen): Muster sofort sichtbar + eigenes SDB als KI-Entwurf.
 * Bewusst ohne Zeit- oder Automatik-Versprechen (UWG, AGENTS.md § 3: Entwurf zur Freigabe).
 */
export function buildBetriebsanweisungMetaDescription(entry: HazardousSubstanceSeoEntry): string {
  const gemini = geminiCroOverride(entry);
  if (gemini?.description) return fitDescription([gemini.description]);
  const override = strikingOverride(entry);
  if (override?.description) return fitDescription([override.description]);
  const name = entry.substanceName;
  return fitDescription([
    `Muster-Betriebsanweisung für ${name} nach TRGS 555. Vorschau prüfen oder eigenes SDB-PDF in einen KI-Entwurf umwandeln.`,
    `Betriebsanweisung ${name} nach TRGS 555: Muster-Vorschau prüfen oder eigenes SDB-PDF in einen KI-Entwurf umwandeln.`,
    `Muster-Betriebsanweisung ${name} nach TRGS 555. Eigenes SDB-PDF hochladen und KI-Entwurf ansehen.`,
    entry.metaDescription,
  ]);
}

/** Eingabe für `buildMetadata` — Title, Description und Canonical aus einer Quelle. */
export function buildBetriebsanweisungSeoMeta(entry: HazardousSubstanceSeoEntry): SeoMetaInput {
  return {
    path: buildBetriebsanweisungPath(entry),
    title: buildBetriebsanweisungTitle(entry),
    description: buildBetriebsanweisungMetaDescription(entry),
    ogImageAlt: `Muster-Betriebsanweisung ${entry.substanceName} nach TRGS 555`,
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
