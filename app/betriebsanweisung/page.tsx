import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { SiteBreadcrumb } from '@/components/seo/SiteBreadcrumb';
import { getAllBetriebsanweisungEntries } from '@/config/betriebsanweisung/registry';
import { BETRIEBSANWEISUNG_HERO_DISCLAIMER } from '@/config/legal/site-copy';
import { SITE_URL } from '@/config/site-seo';
import { marketingHomeBreadcrumbItem } from '@/lib/seo/marketing-home-breadcrumb';
import { groupEntriesAlphabetically } from '@/lib/betriebsanweisung/group-entries-alphabetically';
import {
  BA_CONTAINER,
  BA_PAGE_MAIN,
  BA_PILL_LIST,
  BA_PROSE,
  BA_SECTION,
  BA_SECTION_HERO,
} from '@/components/betriebsanweisung/ba-page-layout';
import { buildBreadcrumbSchema, type BreadcrumbItem } from '@/lib/seo/build-breadcrumb-schema';

const canonical = `${SITE_URL}/betriebsanweisung/`;
const pageTitle = 'Betriebsanweisungen nach TRGS 555 von A bis Z: Entwurf aus Ihrem SDB';
const pageDescription =
  'Betriebsanweisungen für über 100 Gefahrstoffe von Aceton bis Xylol: KI-gestützter Entwurf (gemäß TRGS 555) aus Ihrem Sicherheitsdatenblatt, Freigabe durch die SiFa. Kostenlos testen.';

const BREADCRUMBS: BreadcrumbItem[] = [marketingHomeBreadcrumbItem(), { label: 'Betriebsanweisungen' }];

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
    <main className={BA_PAGE_MAIN}>
      <JsonLd data={schemas} />

      <section className={`${BA_SECTION_HERO} lg:py-20`}>
        <div className={BA_CONTAINER}>
          <div className={BA_PROSE}>
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
        </div>
      </section>

      <section id="stoffe-a-z" className={`${BA_SECTION} scroll-mt-24 lg:py-16`}>
        <div className={BA_CONTAINER}>
          <h2 className="m-0 text-2xl font-bold text-[#f0f6ff]">Alle Stoffe und Produkte</h2>
          <nav aria-label="Stoffe nach Anfangsbuchstabe" className="mt-6">
            <ul className={BA_PILL_LIST} role="list">
              {groups.map((group) => (
                <li key={group.anchorId} className="m-0 p-0">
                  <a
                    href={`#${group.anchorId}`}
                    className="inline-flex min-w-[2.25rem] justify-center rounded-lg border border-white/15 bg-white/[0.04] px-2 py-1 text-sm font-semibold text-[#c8d4e6] no-underline transition hover:border-[#ff6b35]/40 hover:text-[#ff6b35]"
                  >
                    {group.letter}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {groups.map((group) => (
            <div key={group.anchorId} id={group.anchorId} className="mt-10 scroll-mt-24">
              <h3 className="m-0 border-b border-white/[0.08] pb-2 text-lg font-bold text-[#f0f6ff]">
                {group.letter}
              </h3>
              <ul className="m-0 mt-4 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3" role="list">
                {group.entries.map((entry) => (
                  <li key={entry.slug} className="m-0 p-0">
                    <Link href={`/betriebsanweisung/${entry.slug}/`} className="ba-hub-link-card">
                      <span className="font-semibold text-[#f0f6ff]">Betriebsanweisung {entry.substanceName}</span>
                      <span className="mt-1 text-xs leading-relaxed text-[#8fa4c0]">
                        {entry.typicalIndustries.slice(0, 3).join(' · ')}
                      </span>
                      <span className="mt-2 text-sm font-semibold text-[#ff6b35]">Entwurf erstellen →</span>
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
