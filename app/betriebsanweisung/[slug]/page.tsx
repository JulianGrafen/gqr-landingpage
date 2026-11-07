import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BetriebsanweisungClosingCtaCard } from '@/components/betriebsanweisung/BetriebsanweisungClosingCtaCard';
import { BetriebsanweisungContrastSection } from '@/components/betriebsanweisung/BetriebsanweisungContrastSection';
import { BetriebsanweisungExpertSeoSection } from '@/components/betriebsanweisung/BetriebsanweisungExpertSeoSection';
import { BetriebsanweisungQuickFacts } from '@/components/betriebsanweisung/BetriebsanweisungQuickFacts';
import { BetriebsanweisungRelatedLinks } from '@/components/betriebsanweisung/BetriebsanweisungRelatedLinks';
import { BetriebsanweisungSdbSidebar } from '@/components/betriebsanweisung/BetriebsanweisungSdbSidebar';
import { BetriebsanweisungTeaserDocument } from '@/components/betriebsanweisung/BetriebsanweisungTeaserDocument';
import { BetriebsanweisungSdbUploadProvider } from '@/components/betriebsanweisung/betriebsanweisung-sdb-upload-context';
import { SiteBreadcrumb } from '@/components/seo/SiteBreadcrumb';
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
    <main className="bg-[#0a1628]">
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section
        className="border-b border-white/[0.07] bg-gradient-to-b from-[#0f1e35]/90 to-[#0a1628] px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
        aria-labelledby="ba-hero-title"
      >
        <div className="mx-auto max-w-6xl">
          <SiteBreadcrumb items={buildBetriebsanweisungBreadcrumbs(entry)} className="mb-6 text-xs sm:text-sm" />
          <p className="gqr-kicker">TRGS 555 · KI-gestützter Entwurf</p>
          <h1
            id="ba-hero-title"
            className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#f0f6ff] sm:text-4xl lg:text-[2.35rem]"
          >
            Betriebsanweisung {entry.substanceName} nach TRGS 555: Entwurf aus Ihrem Sicherheitsdatenblatt
          </h1>
          <p
            id="ba-hero-subheadline"
            className="mt-4 max-w-3xl text-sm leading-relaxed text-[#8fa4c0] sm:text-base"
          >
            Schluss mit Abtippen: Laden Sie das Lieferanten-SDB für {entry.substanceName} hoch. Die Software übernimmt
            relevante Angaben aus Ihrem PDF als strukturierten Textvorschlag in einen TRGS-555-Entwurf. Die Vorprüfung
            und Freigabe erfolgt durch die SiFa / den Arbeitgeber (§ 14 GefStoffV).
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#ba-sdb-dropzone" className="gqr-cta-primary gqr-cta-primary--md inline-flex justify-center">
              Sicherheitsdatenblatt hochladen ↓
            </a>
            <Link href={registerUrl} className="gqr-cta-secondary gqr-cta-secondary--md inline-flex justify-center">
              Kostenlos registrieren
            </Link>
          </div>
          <p className="mt-3 text-xs text-[#8fa4c0]">Kostenlos für 5 Stoffe · ohne Kreditkarte · Hosting in Deutschland</p>
          {entry.typicalIndustries.length > 0 ? (
            <div className="mt-6">
              <p className="text-xs font-medium text-[#8fa4c0]">Typische Branchen:</p>
              <ul className="mt-2 flex flex-wrap gap-2" role="list">
                {entry.typicalIndustries.map((industry) => (
                  <li
                    key={industry}
                    className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-medium text-[#c8d4e6]"
                  >
                    {industry}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <BetriebsanweisungSdbUploadProvider>
        <section className="border-b border-white/[0.07] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <BetriebsanweisungTeaserDocument entry={entry} />
            </div>
            <div className="order-1 lg:order-2 lg:col-span-5">
              <BetriebsanweisungSdbSidebar substanceName={entry.substanceName} registerUrl={registerUrl} />
            </div>
          </div>
        </section>

        <BetriebsanweisungQuickFacts entry={entry} />

        <BetriebsanweisungContrastSection entry={entry} />

        <section className="border-b border-white/[0.07] bg-[#0f1e35]/50 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <BetriebsanweisungExpertSeoSection entry={entry} faqItems={faqItems} />
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
