import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteBreadcrumb } from '@/components/seo/SiteBreadcrumb';
import { getAllBetriebsanweisungEntries } from '@/config/betriebsanweisung/registry';
import { BETRIEBSANWEISUNG_HERO_DISCLAIMER } from '@/config/legal/site-copy';
import { SITE_URL } from '@/config/site-seo';
import { groupEntriesAlphabetically } from '@/lib/betriebsanweisung/group-entries-alphabetically';
import { buildBreadcrumbSchema, type BreadcrumbItem } from '@/lib/seo/build-breadcrumb-schema';

const canonical = `${SITE_URL}/betriebsanweisung/`;
const pageTitle = 'Betriebsanweisungen nach TRGS 555 von A bis Z: Entwurf aus Ihrem SDB';
const pageDescription =
  'Betriebsanweisungen für über 100 Gefahrstoffe von Aceton bis Xylol: KI-gestützter Entwurf (gemäß TRGS 555) aus Ihrem Sicherheitsdatenblatt, Freigabe durch die SiFa. Kostenlos testen.';

const BREADCRUMBS: BreadcrumbItem[] = [{ label: 'Startseite', href: '/' }, { label: 'Betriebsanweisungen' }];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    siteName: 'Gefahrstoff-QR',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function BetriebsanweisungIndexPage() {
  const entries = getAllBetriebsanweisungEntries();
  const groups = groupEntriesAlphabetically(entries);
  const schemas = [
    buildBreadcrumbSchema(BREADCRUMBS),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: pageTitle,
      description: pageDescription,
      inLanguage: 'de-DE',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: entries.length,
        itemListElement: entries.map((entry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `Betriebsanweisung ${entry.substanceName}`,
          url: `${SITE_URL}/betriebsanweisung/${entry.slug}/`,
        })),
      },
    },
  ];

  return (
    <main>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="border-b border-white/[0.07] bg-gradient-to-b from-[#0f1e35]/90 to-[#0a1628] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <SiteBreadcrumb items={BREADCRUMBS} className="mb-6 text-xs sm:text-sm" />
          <p className="text-xs font-bold uppercase tracking-wider text-[#ff6b35]">TRGS 555 · {entries.length} Stoffe</p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-[#f0f6ff] sm:text-4xl">
            Betriebsanweisungen für Gefahrstoffe von A bis Z
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#c8d4e6]">
            Eine Betriebsanweisung nach TRGS 555 beschreibt für einen Gefahrstoff, welche Gefahren am Arbeitsplatz
            bestehen, welche Schutzmaßnahmen gelten und was im Notfall zu tun ist. Sie ist nach § 14 GefStoffV Pflicht
            und muss auf dem Sicherheitsdatenblatt des tatsächlich verwendeten Produkts beruhen.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#8fa4c0]">
            {BETRIEBSANWEISUNG_HERO_DISCLAIMER} Diese Übersicht enthält bewusst keine CAS-, GHS- oder H/P-Angaben.
            Maßgeblich sind die Angaben im Sicherheitsdatenblatt Ihres Lieferanten.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#stoffe-a-z" className="gqr-cta-secondary gqr-cta-secondary--md inline-flex justify-center">
              Stoff auswählen ↓
            </a>
            <Link
              href="https://app.gefahrstoff-qr.de/register"
              className="gqr-cta-primary gqr-cta-primary--md inline-flex justify-center"
            >
              Eigenes SDB kostenlos auslesen
            </Link>
          </div>
          <p className="mt-3 text-xs text-[#8fa4c0]">
            Ihr Stoff fehlt? Der Entwurf funktioniert mit jedem Sicherheitsdatenblatt, nicht nur mit den Stoffen dieser
            Liste.
          </p>
        </div>
      </section>

      <section id="stoffe-a-z" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Alle Stoffe und Produkte</h2>
          <nav aria-label="Stoffe nach Anfangsbuchstabe" className="mt-6">
            <ul className="flex flex-wrap gap-2" role="list">
              {groups.map((group) => (
                <li key={group.anchorId}>
                  <a
                    href={`#${group.anchorId}`}
                    className="inline-flex min-w-[2.25rem] justify-center rounded-lg border border-slate-200 px-2 py-1 text-sm font-semibold text-slate-700 hover:border-[#ff6b35]/40 hover:text-[#ff6b35]"
                  >
                    {group.letter}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {groups.map((group) => (
            <div key={group.anchorId} id={group.anchorId} className="mt-10 scroll-mt-24">
              <h3 className="border-b border-slate-200 pb-2 text-lg font-bold text-slate-900">{group.letter}</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2" role="list">
                {group.entries.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={`/betriebsanweisung/${entry.slug}/`}
                      className="flex h-full flex-col rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-4 transition hover:border-[#ff6b35]/40 hover:bg-white hover:shadow-sm"
                    >
                      <span className="font-semibold text-slate-900">Betriebsanweisung {entry.substanceName}</span>
                      <span className="mt-1 text-xs leading-relaxed text-slate-500">
                        {entry.typicalIndustries.slice(0, 3).join(' · ')}
                      </span>
                      <span className="mt-2 text-sm text-[#ff6b35]">Entwurf erstellen →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
