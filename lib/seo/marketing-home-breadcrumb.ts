import { resolveMarketingHomeHref } from '@/config/site-seo';
import type { BreadcrumbItem } from '@/lib/seo/build-breadcrumb-schema';

/** Erster Breadcrumb auf allen Next-Slugs → statische Marketing-Startseite. */
export function marketingHomeBreadcrumbItem(): BreadcrumbItem {
  return { label: 'Startseite', href: resolveMarketingHomeHref() };
}
