import { SITE_URL } from '@/config/site-seo';

/** Ein Breadcrumb-Schritt; `href` fehlt beim aktuellen (letzten) Element. */
export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbListJsonLd = {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: {
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }[];
};

function toAbsoluteUrl(href: string): string {
  return href.startsWith('http') ? href : `${SITE_URL}${href}`;
}

/** Schema.org BreadcrumbList, 1:1 synchron mit der sichtbaren Breadcrumb-Navigation. */
export function buildBreadcrumbSchema(items: readonly BreadcrumbItem[]): BreadcrumbListJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: toAbsoluteUrl(item.href) } : {}),
    })),
  };
}
