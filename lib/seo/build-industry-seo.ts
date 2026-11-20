import type { IndustrySolution } from '@/config/industry-solutions';
import type { BreadcrumbItem } from '@/lib/seo/build-breadcrumb-schema';
import { withBrandSuffix, type SeoMetaInput } from '@/lib/seo/buildMetadata';
import { marketingHomeBreadcrumbItem } from '@/lib/seo/marketing-home-breadcrumb';

export function buildIndustryPath(industry: IndustrySolution): `/${string}/` {
  return `/loesungen/${industry.slug}/`;
}

/** Meta-Eingabe für Branchenseiten (Next-Route und statische Kfz-Landingpage). */
export function buildIndustrySeoMeta(industry: IndustrySolution): SeoMetaInput {
  return {
    path: buildIndustryPath(industry),
    title: withBrandSuffix(industry.metaTitle),
    socialTitle: industry.metaTitle,
    description: industry.metaDescription,
    ogImageAlt: `${industry.title} mit Gefahrstoff-QR`,
    ogType: 'website',
  };
}

/** Startseite › Branche (kein Lösungen-Hub). Kurzlabel → kompakter SERP-Pfad. */
export function buildIndustryBreadcrumbs(industry: IndustrySolution): BreadcrumbItem[] {
  return [marketingHomeBreadcrumbItem(), { label: industry.label }];
}
