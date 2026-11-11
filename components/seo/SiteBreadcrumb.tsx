import Link from 'next/link';
import type { BreadcrumbItem } from '@/lib/seo/build-breadcrumb-schema';

type SiteBreadcrumbProps = {
  items: readonly BreadcrumbItem[];
  className?: string;
};

/** Sichtbare Breadcrumb-Navigation; Schema via `buildBreadcrumbSchema` mit denselben Items erzeugen. */
export function SiteBreadcrumb({ items, className = 'text-sm' }: SiteBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`block w-full text-left ${className}`.trim()}>
      <ol className="m-0 flex w-full list-none flex-wrap items-center justify-start gap-x-2 gap-y-1 p-0 text-left text-gqr-muted">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? (
              <span aria-hidden className="text-white/25">
                /
              </span>
            ) : null}
            {item.href ? (
              item.href.startsWith('http') ? (
                <a
                  href={item.href}
                  className="font-semibold text-gqr-trust no-underline hover:underline"
                >
                  {item.label}
                </a>
              ) : (
                <Link href={item.href} className="font-semibold text-gqr-trust no-underline hover:underline">
                  {item.label}
                </Link>
              )
            ) : (
              <span className="font-semibold text-gqr-text" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
