import type { ReactNode } from 'react';
import type { TrustPageConfig } from '@/config/trust/types';
import { JsonLd } from '@/components/seo/JsonLd';
import { SiteBreadcrumb } from '@/components/seo/SiteBreadcrumb';
import { LandingFaqSection } from '@/components/seo-silo/LandingFaqSection';
import { DecisionCtaBox } from '@/components/trust/DecisionCtaBox';
import { DecisionPageCrossLinks } from '@/components/trust/DecisionPageCrossLinks';
import type { DecisionPageId } from '@/config/trust/types';
import { buildArticleSchema } from '@/lib/seo/build-article-schema';
import { buildBreadcrumbSchema, type BreadcrumbItem } from '@/lib/seo/build-breadcrumb-schema';
import { buildFaqPageSchema } from '@/lib/seo/build-faq-page-schema';
import { marketingHomeBreadcrumbItem } from '@/lib/seo/marketing-home-breadcrumb';

type TrustPageShellProps = {
  config: TrustPageConfig;
  /** Eigene Seite in der Decision-Layer-Registry → wird aus den Querverweisen ausgeblendet. */
  pageId?: DecisionPageId;
  faqTitle?: string;
  /** Optionaler Inhalt rechts/unter dem AEO-Antwortblock (z. B. Projekt-Steckbrief). */
  heroAside?: ReactNode;
  children: ReactNode;
};

function buildBreadcrumbItems(config: TrustPageConfig): BreadcrumbItem[] {
  return [
    marketingHomeBreadcrumbItem(),
    ...(config.breadcrumbParent ? [config.breadcrumbParent] : []),
    { label: config.breadcrumbLabel },
  ];
}

/**
 * Gemeinsame Hülle aller Decision-Layer-Seiten:
 * Breadcrumb → Hero mit AEO-Antwortblock → Sektionen → FAQ → CTA → Querverweise.
 * JSON-LD: Article + FAQPage + BreadcrumbList aus derselben Config wie das sichtbare UI.
 */
export function TrustPageShell({ config, pageId, faqTitle, heroAside, children }: TrustPageShellProps) {
  const breadcrumbItems = buildBreadcrumbItems(config);
  const schemas = [
    buildArticleSchema({
      path: config.path,
      headline: config.hero.h1,
      description: config.seo.description,
      datePublished: config.datePublished,
      dateModified: config.dateModified,
    }),
    ...(config.faq.length > 0 ? [buildFaqPageSchema(config.faq)] : []),
    buildBreadcrumbSchema(breadcrumbItems),
  ];

  return (
    <main className="pb-8">
      <JsonLd data={schemas} />

      <div className="gqr-container pt-6">
        <SiteBreadcrumb items={breadcrumbItems} />
      </div>

      <header
        className="border-b border-white/[0.07] bg-gradient-to-b from-gqr-surface/90 to-gqr-bg py-12 sm:py-16 lg:py-20"
        aria-labelledby="trust-hero-title"
      >
        <div className="gqr-container">
          <p className="gqr-kicker">{config.hero.eyebrow}</p>
          <h1
            id="trust-hero-title"
            className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight text-gqr-text sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12]"
          >
            {config.hero.h1}
          </h1>
          <div className={heroAside ? 'mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start' : 'mt-8'}>
            <section
              aria-label="Kurzantwort"
              className="max-w-3xl rounded-2xl border border-gqr-trust/20 bg-gqr-trust/5 p-5 sm:p-6"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-gqr-trust">Kurz beantwortet</p>
              <p className="mt-2 text-base leading-relaxed text-gqr-soft sm:text-lg">{config.hero.answer}</p>
            </section>
            {heroAside}
          </div>
        </div>
      </header>

      {children}

      {config.faq.length > 0 ? (
        <LandingFaqSection faq={[...config.faq]} id="trust-faq" title={faqTitle} />
      ) : null}

      <DecisionCtaBox cta={config.closingCta} />

      <DecisionPageCrossLinks excludeId={pageId} />
    </main>
  );
}
