import Link from 'next/link';

type DeepinfoBreadcrumbProps = {
  label: string;
};

export function DeepinfoBreadcrumb({ label }: DeepinfoBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-gqr-muted">
        <li>
          <Link href="/" className="font-semibold text-gqr-trust no-underline hover:underline">
            Home
          </Link>
        </li>
        <li aria-hidden className="text-white/25">
          /
        </li>
        <li>
          <Link href="/wissen/" className="font-semibold text-gqr-trust no-underline hover:underline">
            Wissen
          </Link>
        </li>
        <li aria-hidden className="text-white/25">
          /
        </li>
        <li>
          <span className="font-semibold text-gqr-text">{label}</span>
        </li>
      </ol>
    </nav>
  );
}
