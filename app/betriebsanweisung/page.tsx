import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBetriebsanweisungEntries } from '@/config/betriebsanweisung/registry';
import { BETRIEBSANWEISUNG_HERO_DISCLAIMER } from '@/config/legal/site-copy';
import { SITE_URL } from '@/config/site-seo';

const canonical = `${SITE_URL}/betriebsanweisung/`;

export const metadata: Metadata = {
  title: 'Betriebsanweisungen nach TRGS 555 — Stoffübersicht',
  description:
    'Betriebsanweisung-Entwürfe für typische Gefahrstoffe: Aceton, Isopropanol, Bremsenreiniger und mehr — KI-gestützter TRGS-555-Entwurf mit SDB-Upload in Gefahrstoff-QR.',
  alternates: { canonical },
  openGraph: {
    title: 'Betriebsanweisungen nach TRGS 555 — Stoffübersicht',
    description:
      'Programmatic SEO-Übersicht: Betriebsanweisung-Entwürfe für häufige Stoffe und Produkte — Struktur im Web, Inhalte aus Ihrem Lieferanten-SDB.',
    url: canonical,
    siteName: 'Gefahrstoff-QR',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function BetriebsanweisungIndexPage() {
  const entries = getAllBetriebsanweisungEntries();

  return (
    <main>
      <section className="border-b border-white/[0.07] bg-gradient-to-b from-[#0f1e35]/90 to-[#0a1628] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-wider text-[#ff6b35]">TRGS 555 · Programmatic SEO</p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-[#f0f6ff] sm:text-4xl">
            Betriebsanweisungen für typische Gefahrstoffe
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#8fa4c0]">{BETRIEBSANWEISUNG_HERO_DISCLAIMER}</p>
          <p className="mt-4 text-lg leading-relaxed text-[#8fa4c0]">
            KI-gestützter TRGS-555-Entwurf mit SDB-Live-Vorschau — ohne veröffentlichte CAS-, GHS- oder H/P-Angaben auf
            dieser Übersicht.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Alle Stoffe & Produkte</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2" role="list">
            {entries.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={`/betriebsanweisung/${entry.slug}/`}
                  className="flex flex-col rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-4 transition hover:border-[#ff6b35]/40 hover:bg-white hover:shadow-sm"
                >
                  <span className="font-semibold text-slate-900">{entry.substanceName}</span>
                  <span className="mt-2 text-sm text-[#ff6b35]">Entwurf ansehen →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
