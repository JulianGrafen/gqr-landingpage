import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { notFound } from 'next/navigation';
import { BetriebsanweisungClosingCtaCard } from '@/components/betriebsanweisung/BetriebsanweisungClosingCtaCard';
import { BetriebsanweisungContrastSection } from '@/components/betriebsanweisung/BetriebsanweisungContrastSection';
import { BetriebsanweisungExpertSeoSection } from '@/components/betriebsanweisung/BetriebsanweisungExpertSeoSection';
import { BetriebsanweisungSlugHero } from '@/components/betriebsanweisung/BetriebsanweisungSlugHero';
import { BetriebsanweisungQuickFacts } from '@/components/betriebsanweisung/BetriebsanweisungQuickFacts';
import { BetriebsanweisungRelatedLinks } from '@/components/betriebsanweisung/BetriebsanweisungRelatedLinks';
import { BetriebsanweisungSdbSidebar } from '@/components/betriebsanweisung/BetriebsanweisungSdbSidebar';
import { BetriebsanweisungTeaserDocument } from '@/components/betriebsanweisung/BetriebsanweisungTeaserDocument';
import {
  BA_CONTAINER,
  BA_PAGE_MAIN,
  BA_PROSE,
  BA_SECTION,
  BA_SECTION_HERO,
  BA_SECTION_MUTED,
} from '@/components/betriebsanweisung/ba-page-layout';
import { BetriebsanweisungSdbUploadProvider } from '@/components/betriebsanweisung/betriebsanweisung-sdb-upload-context';
import { HAZARDOUS_SUBSTANCE_SLUGS } from '@/config/betriebsanweisung/entries';
import type { HazardousSubstanceSlug } from '@/config/betriebsanweisung/entries';
import { getAllBetriebsanweisungEntries, getBetriebsanweisungEntry } from '@/config/betriebsanweisung/registry';
import { buildBetriebsanweisungRegisterUrl } from '@/lib/betriebsanweisung/build-register-url';
import {
  buildBetriebsanweisungBreadcrumbs,
  buildBetriebsanweisungCanonical,
  buildBetriebsanweisungMetaDescription,
  buildBetriebsanweisungSchemas,
  buildBetriebsanweisungTitle,
} from '@/lib/betriebsanweisung/build-page-seo';
import { buildBetriebsanweisungFaqItems } from '@/lib/betriebsanweisung/build-substance-faq';
import { findMatchingIndustrySolutions, findRelatedEntries } from '@/lib/betriebsanweisung/related-entries';
import { stickyCtaObstructProps } from '@/lib/marketing/sticky-header-cta';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams(): { slug: HazardousSubstanceSlug }[] {
  return HAZARDOUS_SUBSTANCE_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const entry = getBetriebsanweisungEntry(params.slug);
  if (!entry) return { title: 'Seite nicht gefunden' };

  const title = buildBetriebsanweisungTitle(entry);
  const description = buildBetriebsanweisungMetaDescription(entry);
  const canonical = buildBetriebsanweisungCanonical(entry);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Gefahrstoff-QR',
      locale: 'de_DE',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function BetriebsanweisungSlugPage({ params }: PageProps) {
  const entry = getBetriebsanweisungEntry(params.slug);
  if (!entry) notFound();

  const faqItems = buildBetriebsanweisungFaqItems(entry.substanceName);
  const schemas = buildBetriebsanweisungSchemas(entry, faqItems);
  const relatedEntries = findRelatedEntries(entry, getAllBetriebsanweisungEntries());
  const industrySolutions = findMatchingIndustrySolutions(entry);
  const registerUrl = buildBetriebsanweisungRegisterUrl(entry.slug);

  return (
    <main className={BA_PAGE_MAIN}>
      <JsonLd data={schemas} />

      <section className={BA_SECTION_HERO} aria-labelledby="ba-hero-title" {...stickyCtaObstructProps}>
        <div className={BA_CONTAINER}>
          <BetriebsanweisungSlugHero
            entry={entry}
            breadcrumbs={buildBetriebsanweisungBreadcrumbs(entry)}
            registerUrl={registerUrl}
          />
        </div>
      </section>

      <BetriebsanweisungSdbUploadProvider>
        <section className={`${BA_SECTION} lg:py-16`}>
          <div className={`${BA_CONTAINER} grid grid-cols-1 items-start gap-8 lg:grid-cols-12`}>
            <div className="order-2 lg:order-1 lg:col-span-7">
              <BetriebsanweisungTeaserDocument entry={entry} />
            </div>
            <div className="order-1 lg:order-2 lg:col-span-5">
              <BetriebsanweisungSdbSidebar substanceName={entry.substanceName} />
            </div>
          </div>
        </section>

        <BetriebsanweisungQuickFacts entry={entry} />

        <BetriebsanweisungContrastSection entry={entry} />

        <section className={BA_SECTION_MUTED}>
          <div className={BA_CONTAINER}>
            <div className={BA_PROSE}>
              <BetriebsanweisungExpertSeoSection entry={entry} faqItems={faqItems} />
            </div>
          </div>
        </section>

        <BetriebsanweisungRelatedLinks
          substanceName={entry.substanceName}
          relatedEntries={relatedEntries}
          industrySolutions={industrySolutions}
        />

        <BetriebsanweisungClosingCtaCard substanceName={entry.substanceName} registerUrl={registerUrl} />
      </BetriebsanweisungSdbUploadProvider>
    </main>
  );
}
