import type { BreadcrumbItem } from '@/lib/seo/build-breadcrumb-schema';
import { marketingHomeBreadcrumbItem } from '@/lib/seo/marketing-home-breadcrumb';

/** Startseite › Wissen › Artikel — gemeinsame Quelle für sichtbare Breadcrumb und BreadcrumbList JSON-LD. */
export function buildDeepinfoBreadcrumbs(label: string): BreadcrumbItem[] {
  return [marketingHomeBreadcrumbItem(), { label: 'Wissen', href: '/wissen/' }, { label }];
}
