import Link from 'next/link';
import type { DeepinfoPage } from '@/lib/wissen/types';
import { DeepinfoFaq } from '@/components/deepinfo/DeepinfoFaq';
import { DeepinfoProse } from '@/components/deepinfo/DeepinfoProse';
import { DeepinfoStickyCta } from '@/components/deepinfo/DeepinfoStickyCta';
import { FaqJsonLd } from '@/components/deepinfo/FaqJsonLd';
import { ManualVsGqrComparison } from '@/components/deepinfo/ManualVsGqrComparison';

type DeepinfoPageTemplateProps = {
  page: DeepinfoPage;
};

export function DeepinfoPageTemplate({ page }: DeepinfoPageTemplateProps) {
  const { meta, mdxSource } = page;

  return (
    <main className="pb-20 lg:pb-0">
      <FaqJsonLd faq={meta.faq} />

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

              <DeepinfoProse source={mdxSource} />
              <ManualVsGqrComparison
                targetAudience={meta.targetAudience}
                comparison={meta.comparison}
              />
              <DeepinfoFaq faq={meta.faq} />
            </div>
          </article>

          <aside className="gqr-post-sidebar" aria-label="Sidebar">
            <DeepinfoStickyCta text={meta.stickyCtaText} ctaText={meta.ctaText} variant="sidebar" />
          </aside>
        </div>
      </div>

      <DeepinfoStickyCta text={meta.stickyCtaText} ctaText={meta.ctaText} variant="mobile" />
    </main>
  );
}
