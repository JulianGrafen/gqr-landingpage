import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { BetriebsanweisungHubHero } from '@/components/betriebsanweisung/BetriebsanweisungHubHero';
import { getAllBetriebsanweisungEntries } from '@/config/betriebsanweisung/registry';
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
  BA_SECTION_MUTED,
} from '@/components/betriebsanweisung/ba-page-layout';
import { buildBreadcrumbSchema, type BreadcrumbItem } from '@/lib/seo/build-breadcrumb-schema';
import { stickyCtaObstructProps } from '@/lib/marketing/sticky-header-cta';

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

      <section
        className={`${BA_SECTION_HERO} lg:py-20`}
        aria-labelledby="ba-hub-hero-title"
        {...stickyCtaObstructProps}
      >
        <div className={`${BA_CONTAINER} ${BA_PROSE}`}>
          <BetriebsanweisungHubHero breadcrumbs={BREADCRUMBS} substanceCount={entries.length} />
        </div>
      </section>

      <section id="stoffe-a-z" className={`${BA_SECTION_MUTED} scroll-mt-24 lg:py-16`}>
        <div className={BA_CONTAINER}>
          <div className={BA_PROSE}>
            <h2 className="m-0 text-2xl font-bold text-[#f0f6ff] sm:text-3xl">Alle Stoffe und Produkte</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#8fa4c0]">
              Alphabetische Übersicht — jeder Link führt zur TRGS-555-Vorlage mit eigener SDB-Dropzone.
            </p>
          </div>
          <nav aria-label="Stoffe nach Anfangsbuchstabe" className="mt-6">
            <ul className={BA_PILL_LIST} role="list">
              {groups.map((group) => (
                <li key={group.anchorId} className="m-0 p-0">
                  <a
                    href={`#${group.anchorId}`}
                    className="inline-flex min-w-[2.25rem] justify-center rounded-lg border border-white/20 bg-white/[0.06] px-2.5 py-1.5 text-sm font-semibold text-[#f0f6ff] no-underline transition hover:border-[#ff6b35]/45 hover:bg-white/[0.1] hover:text-[#ff6b35]"
                  >
                    {group.letter}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {groups.map((group) => (
            <div key={group.anchorId} id={group.anchorId} className="mt-10 scroll-mt-24">
              <h3 className="m-0 border-b border-white/[0.1] pb-2 text-lg font-bold text-[#f0f6ff]">{group.letter}</h3>
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
