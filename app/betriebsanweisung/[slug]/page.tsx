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
import { resolveSubstanceCluster } from '@/lib/betriebsanweisung/resolve-substance-cluster';
import { MOBILE_UPLOAD_FALLBACK } from '@/config/betriebsanweisung/conversion-copy';
import { LIVE_PREVIEW_COPY } from '@/config/betriebsanweisung/live-preview-copy';
import {
  buildBetriebsanweisungBreadcrumbs,
  buildBetriebsanweisungSchemas,
  buildBetriebsanweisungSeoMeta,
} from '@/lib/betriebsanweisung/build-page-seo';
import { buildBetriebsanweisungFaqItems } from '@/lib/betriebsanweisung/build-substance-faq';
import { findMatchingIndustrySolutions, findRelatedEntries } from '@/lib/betriebsanweisung/related-entries';
import { buildMetadata } from '@/lib/seo/buildMetadata';
import { getBetriebsanweisungSolutionCallout } from '@/lib/seo/internalLinks';
import { InternalSolutionBanner } from '@/components/seo/InternalSolutionBanner';
import { stickyCtaObstructProps } from '@/lib/marketing/sticky-header-cta';
import { BetriebsanweisungGeminiInternalLink } from '@/components/betriebsanweisung/BetriebsanweisungGeminiInternalLink';
import {
  BetriebsanweisungGeminiCroDualMidCta,
  BetriebsanweisungGeminiCroHomeContextLink,
  BetriebsanweisungGeminiCroProseLinks,
} from '@/components/betriebsanweisung/BetriebsanweisungGeminiCroBlocks';
import { BetriebsanweisungStrikingMidPageCta } from '@/components/betriebsanweisung/BetriebsanweisungStrikingMidPageCta';
import { BETRIEBSANWEISUNG_STRIKING_OVERRIDES } from '@/config/seo/striking-distance-2026-11-23';
import { getBetriebsanweisungGeminiCroOverride } from '@/lib/betriebsanweisung/resolve-gemini-cro-ba-override';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams(): { slug: HazardousSubstanceSlug }[] {
  return HAZARDOUS_SUBSTANCE_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const entry = getBetriebsanweisungEntry(params.slug);
  if (!entry) return { title: 'Seite nicht gefunden' };
  return buildMetadata(buildBetriebsanweisungSeoMeta(entry));
}

export default function BetriebsanweisungSlugPage({ params }: PageProps) {
  const entry = getBetriebsanweisungEntry(params.slug);
  if (!entry) notFound();

  const faqItems = buildBetriebsanweisungFaqItems(entry.substanceName);
  const schemas = buildBetriebsanweisungSchemas(entry, faqItems);
  const relatedEntries = findRelatedEntries(entry, getAllBetriebsanweisungEntries());
  const industrySolutions = findMatchingIndustrySolutions(entry);
  const solutionCallout = getBetriebsanweisungSolutionCallout(entry.slug);
  const registerUrl = buildBetriebsanweisungRegisterUrl(entry.slug);
  const cluster = resolveSubstanceCluster(entry);
  const mobileRegisterUrl = buildBetriebsanweisungRegisterUrl(entry.slug, {
    utmContent: MOBILE_UPLOAD_FALLBACK.utmContent,
  });
  const demoRegisterUrl = buildBetriebsanweisungRegisterUrl(entry.slug, {
    utmContent: LIVE_PREVIEW_COPY.demoRegisterUtmContent,
  });
  const geminiOverride = getBetriebsanweisungGeminiCroOverride(entry.slug as HazardousSubstanceSlug);
  const strikingOverride = BETRIEBSANWEISUNG_STRIKING_OVERRIDES[entry.slug as HazardousSubstanceSlug];

  return (
    <main className={BA_PAGE_MAIN}>
      <JsonLd data={schemas} />

      <section className={BA_SECTION_HERO} aria-labelledby="ba-hero-title" {...stickyCtaObstructProps}>
        <div className={BA_CONTAINER}>
          <BetriebsanweisungSlugHero
            entry={entry}
            breadcrumbs={buildBetriebsanweisungBreadcrumbs(entry)}
            registerUrl={registerUrl}
            h1={geminiOverride?.h1}
            heroPrimaryCta={geminiOverride?.heroPrimaryCta}
            complianceNotice={geminiOverride?.complianceNotice}
          />
        </div>
      </section>

      <BetriebsanweisungSdbUploadProvider
        slug={entry.slug}
        cluster={cluster}
        fallbackRegisterUrl={demoRegisterUrl}
      >
        <section className={`${BA_SECTION} lg:py-16`}>
          <div className={`${BA_CONTAINER} grid grid-cols-1 items-start gap-8 lg:grid-cols-12`}>
            <div className="order-2 lg:order-1 lg:col-span-7">
              <BetriebsanweisungTeaserDocument entry={entry} />
            </div>
            <div className="order-1 lg:order-2 lg:col-span-5">
              <BetriebsanweisungSdbSidebar
                substanceName={entry.substanceName}
                cluster={cluster}
                mobileRegisterUrl={mobileRegisterUrl}
              />
            </div>
          </div>
        </section>

        <BetriebsanweisungQuickFacts entry={entry} />

        {geminiOverride?.earlyProseLinks ? (
          <BetriebsanweisungGeminiCroProseLinks
            links={geminiOverride.earlyProseLinks}
            ariaLabel="Branchen- und SiFa-Links"
          />
        ) : null}

        {geminiOverride?.homeContextLink ? (
          <BetriebsanweisungGeminiCroHomeContextLink link={geminiOverride.homeContextLink} />
        ) : null}

        {geminiOverride?.dualMidCta ? <BetriebsanweisungGeminiCroDualMidCta copy={geminiOverride.dualMidCta} /> : null}

        {geminiOverride?.internalLink ? <BetriebsanweisungGeminiInternalLink link={geminiOverride.internalLink} /> : null}

        {strikingOverride ? <BetriebsanweisungStrikingMidPageCta override={strikingOverride} /> : null}

        {solutionCallout ? (
          <section className={BA_SECTION}>
            <div className={BA_CONTAINER}>
              <InternalSolutionBanner callout={solutionCallout} className={BA_PROSE} />
            </div>
          </section>
        ) : null}

        <BetriebsanweisungContrastSection entry={entry} />

        <section className={BA_SECTION_MUTED}>
          <div className={BA_CONTAINER}>
            <div className={BA_PROSE}>
              <BetriebsanweisungExpertSeoSection entry={entry} faqItems={faqItems} />
            </div>
          </div>
        </section>

        {geminiOverride?.lowerThirdProseLinks ? (
          <BetriebsanweisungGeminiCroProseLinks
            links={geminiOverride.lowerThirdProseLinks}
            ariaLabel="Lagerung, Branche und Software"
          />
        ) : null}

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
