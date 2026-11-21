import Link from 'next/link';
import type { DeepinfoPage } from '@/lib/wissen/types';
import { DeepinfoFaq } from '@/components/deepinfo/DeepinfoFaq';
import { DEEPINFO_PAGE_EXTENSIONS } from '@/components/deepinfo/deepinfo-page-extensions';
import { DeepinfoProse } from '@/components/deepinfo/DeepinfoProse';
import { DeepinfoStickyCta } from '@/components/deepinfo/DeepinfoStickyCta';
import { FaqJsonLd } from '@/components/deepinfo/FaqJsonLd';
import { ManualVsGqrComparison } from '@/components/deepinfo/ManualVsGqrComparison';
import { JsonLd } from '@/components/seo/JsonLd';
import { TurnkeyAuditSection } from '@/components/TurnkeyAuditSection';
import { APP_REGISTER_URL } from '@/config/aeo-config';
import { TURNKEY_AUDIT } from '@/config/home-sections/turnkey-audit';
import { getDeepinfoCanonicalPath, type DeepinfoSlug } from '@/lib/wissen/deepinfo-loader';
import { buildDeepinfoBreadcrumbs } from '@/lib/wissen/build-deepinfo-breadcrumbs';
import { buildBreadcrumbSchema } from '@/lib/seo/build-breadcrumb-schema';
import { getEditorialSolutionCallout } from '@/lib/seo/internalLinks';
import { InternalSolutionBanner } from '@/components/seo/InternalSolutionBanner';
import { buildSoftwareApplicationSchema } from '@/lib/seo/build-software-application-schema';

type DeepinfoPageTemplateProps = {
  page: DeepinfoPage;
};

export function DeepinfoPageTemplate({ page }: DeepinfoPageTemplateProps) {
  const { meta, mdxSource } = page;
  const stickyCtaHref = meta.showTurnkeyAudit ? TURNKEY_AUDIT.cta.href : APP_REGISTER_URL;
  const extension = DEEPINFO_PAGE_EXTENSIONS[meta.slug as DeepinfoSlug];
  const faqSchemaItems = [...meta.faq, ...(extension?.extraFaqSchemaItems ?? [])];
  const canonicalPath = getDeepinfoCanonicalPath(meta.slug as DeepinfoSlug);
  const primaryCallout = getEditorialSolutionCallout(canonicalPath, 'primary');
  const closingCallout = getEditorialSolutionCallout(canonicalPath, 'closing');

  return (
    <main className="pb-20 lg:pb-0">
      <FaqJsonLd faq={faqSchemaItems} />
      <JsonLd data={buildBreadcrumbSchema(buildDeepinfoBreadcrumbs(meta.breadcrumbLabel))} />
      {extension?.includeSoftwareApplicationSchema ? <JsonLd data={buildSoftwareApplicationSchema()} /> : null}

      {meta.showTurnkeyAudit ? (
        <div className="border-b border-white/[0.07] bg-[#0a1628] py-10 lg:py-14">
          <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-10">
            <TurnkeyAuditSection className="mt-0" context="wissen" />
          </div>
        </div>
      ) : null}

      <div className="gqr-container">
        <div className="gqr-post-wrapper">
          <article className="gqr-post-article">
            <Link href="/wissen/" className="gqr-post-back">
              ← Zurück zu Wissen
            </Link>
            <span className="gqr-post-tag">{meta.targetAudience}</span>

            <h1 className="gqr-post-headline">{meta.title}</h1>

            <div className="gqr-post-meta">
              <span>Fachleitfaden</span>
              <span aria-hidden>·</span>
              <span>Deepinfo</span>
            </div>

            <div id="deepinfo-content" className="gqr-post-content">
              <p className="gqr-post-lead">{meta.subheadline}</p>
              <p>
                <strong>Typisches Problem:</strong> {meta.painPoint}
              </p>
              {primaryCallout ? <InternalSolutionBanner callout={primaryCallout} className="my-8" /> : null}

              <DeepinfoProse source={mdxSource} />
              {extension?.sectionsBeforeComparison}
              {extension?.comparison ?? (
                <ManualVsGqrComparison targetAudience={meta.targetAudience} comparison={meta.comparison} />
              )}
              {extension?.sectionsAfterComparison}
              {closingCallout ? <InternalSolutionBanner callout={closingCallout} className="my-10" /> : null}
              <DeepinfoFaq faq={meta.faq} />
            </div>
          </article>

          <aside className="gqr-post-sidebar" aria-label="Sidebar">
            <DeepinfoStickyCta
              text={meta.stickyCtaText}
              ctaText={meta.ctaText}
              ctaHref={stickyCtaHref}
              variant="sidebar"
            />
          </aside>
        </div>
      </div>

      <DeepinfoStickyCta
        text={meta.stickyCtaText}
        ctaText={meta.ctaText}
        ctaHref={stickyCtaHref}
        variant="mobile"
      />
    </main>
  );
}
