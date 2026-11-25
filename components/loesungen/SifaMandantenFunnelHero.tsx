import { IndustrySlugHero } from '@/components/loesungen/IndustrySlugHero';
import { LoesungenSifaMobileExampleButton } from '@/components/loesungen/LoesungenSifaMobileExampleButton';
import { SdbTrustFeatureList } from '@/components/programmatic-seo/SdbTrustFeatureList';
import { SdbLivePreviewDropzone } from '@/components/sdb-preview';
import { PSEO_CONTAINER, PSEO_PROSE } from '@/components/programmatic-seo';
import { PRICING_PAGE_SIFA_TAB_HREF } from '@/config/home-sections/pricing-audience';
import { HOME_LIVE_DEMO_HREF, LIVE_DEMO_ANCHOR_ID } from '@/config/home-sections/hero';
import type { IndustrySolution } from '@/config/industry-solutions';

type Props = {
  data: IndustrySolution;
};

/**
 * SiFa-CRO: Dropzone im ersten Viewport, SiFa-Preise, Mobile-Beispiel-SDB.
 */
export function SifaMandantenFunnelHero({ data }: Props) {
  return (
    <section
      className="overflow-x-clip border-b border-white/[0.07] pb-12 pt-8 lg:pb-16 lg:pt-12"
      aria-labelledby="industry-hero-title"
    >
      <div className={`${PSEO_CONTAINER} ${PSEO_PROSE} min-w-0`}>
        <IndustrySlugHero data={data} />
        <div className="mt-6 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={HOME_LIVE_DEMO_HREF}
            className="gqr-cta-primary gqr-cta-primary--md inline-flex min-h-[48px] min-w-0 flex-1 items-center justify-center text-center no-underline sm:flex-initial"
          >
            Livetest auf der Startseite
          </a>
          <a
            href={PRICING_PAGE_SIFA_TAB_HREF}
            className="inline-flex min-h-[48px] min-w-0 flex-1 items-center justify-center rounded-xl border border-[#ff6b35]/40 bg-[#162340]/80 px-4 py-3 text-center text-sm font-semibold text-[#f0f6ff] no-underline transition hover:border-[#ff6b35]/70 hover:bg-[#162340] sm:flex-initial sm:px-6"
          >
            SiFa Multi-Mandant Preise ansehen
          </a>
          <LoesungenSifaMobileExampleButton anchorId={LIVE_DEMO_ANCHOR_ID} />
        </div>
      </div>
      <div className={`${PSEO_CONTAINER} ${PSEO_PROSE} mt-8`} id={LIVE_DEMO_ANCHOR_ID}>
        <SdbLivePreviewDropzone variant="next" />
        <SdbTrustFeatureList />
      </div>
    </section>
  );
}