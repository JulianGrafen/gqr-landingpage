import type { DeepinfoPage } from '@/lib/wissen/types';
import { DeepinfoBreadcrumb } from '@/components/deepinfo/DeepinfoBreadcrumb';
import { DeepinfoFaq } from '@/components/deepinfo/DeepinfoFaq';
import { DeepinfoHero } from '@/components/deepinfo/DeepinfoHero';
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

      <div className="border-b border-white/[0.07] bg-[#0a1628] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <DeepinfoBreadcrumb label={meta.breadcrumbLabel} />
        </div>
      </div>

      <DeepinfoHero
        title={meta.title}
        subheadline={meta.subheadline}
        targetAudience={meta.targetAudience}
        painPoint={meta.painPoint}
        ctaText={meta.ctaText}
      />

      <section
        className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-label="Fachinhalt"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
          <div className="min-w-0">
            <DeepinfoProse source={mdxSource} />
            <ManualVsGqrComparison
              targetAudience={meta.targetAudience}
              comparison={meta.comparison}
            />
            <DeepinfoFaq faq={meta.faq} />
          </div>

          <aside className="hidden lg:block" aria-label="Sidebar CTA">
            <DeepinfoStickyCta text={meta.stickyCtaText} variant="sidebar" />
          </aside>
        </div>
      </section>

      <DeepinfoStickyCta text={meta.stickyCtaText} variant="mobile" />
    </main>
  );
}
