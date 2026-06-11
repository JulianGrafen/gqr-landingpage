import Link from 'next/link';

type DeepinfoBreadcrumbProps = {
  label: string;
};

export function DeepinfoBreadcrumb({ label }: DeepinfoBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-[#8fa4c0]">
        <li>
          <Link href="/" className="font-semibold text-[#2dd4bf] no-underline hover:underline">
            Home
          </Link>
        </li>
        <li aria-hidden className="text-white/25">/</li>
        <li>
          <Link href="/wissen/" className="font-semibold text-[#2dd4bf] no-underline hover:underline">
            Wissen
          </Link>
        </li>
        <li aria-hidden className="text-white/25">/</li>
        <li>
          <span className="font-semibold text-[#f0f6ff]">{label}</span>
        </li>
      </ol>
    </nav>
  );
}
