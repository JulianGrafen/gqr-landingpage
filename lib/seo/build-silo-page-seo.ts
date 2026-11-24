import type { BreadcrumbItem } from '@/lib/seo/build-breadcrumb-schema';
import { withBrandSuffix, type SeoMetaInput } from '@/lib/seo/buildMetadata';
import { marketingHomeBreadcrumbItem } from '@/lib/seo/marketing-home-breadcrumb';

type SiloSeoSource = {
  path: `/${string}/`;
  metaTitle: string;
  metaDescription: string;
  breadcrumbLabel: string;
};

export function buildSiloPageSeoMeta(source: SiloSeoSource): SeoMetaInput {
  return {
    path: source.path,
    title: withBrandSuffix(source.metaTitle),
    socialTitle: source.metaTitle,
    description: source.metaDescription,
    ogImageAlt: `${source.metaTitle} mit Gefahrstoff-QR`,
    ogType: 'website',
  };
}

export function buildSiloBreadcrumbs(label: string): BreadcrumbItem[] {
  return [marketingHomeBreadcrumbItem(), { label }];
}