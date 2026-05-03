import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllIndustries } from '@/config/industry-solutions';

export const metadata: Metadata = {
  title: 'Gefahrstoff-QR',
  description:
    'Hinweis: Die Haupt-Landingpage liegt als statische index.html im Projektroot. Diese Route dient dem Next.js-Build und Branchen-Unterseiten.',
  robots: { index: false, follow: true },
};

/**
 * Platzhalter-Root für `next dev` / `next build`.
 * Produktions-Landing bleibt vorerst als statische `index.html`; `out/` ergänzt `/loesungen/*`.
 */
export default function NextHomePage() {
  const industries = getAllIndustries();
  return (
    <main className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-[#f0f6ff]">Gefahrstoff-QR</h1>
      <p className="mt-4 text-sm leading-relaxed text-[#8fa4c0]">
        Vollständige Marketingseite: statische{' '}
        <code className="rounded bg-white/10 px-1 text-teal-300">index.html</code>{' '}
        im Repository-Root. Hier die dynamischen Branchen-Landingpages:
      </p>
      <ul className="mt-8 space-y-2 text-left text-sm text-[#8fa4c0]">
        {industries.map((i) => (
          <li key={i.slug}>
            <Link
              href={`/loesungen/${i.slug}/`}
              className="font-semibold text-teal-300 no-underline hover:underline"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
