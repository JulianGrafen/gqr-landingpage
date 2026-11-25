import { IndustrySlugHero } from '@/components/loesungen/IndustrySlugHero';
import { LoesungenSifaMobileExampleButton } from '@/components/loesungen/LoesungenSifaMobileExampleButton';
import { SdbTrustFeatureList } from '@/components/programmatic-seo/SdbTrustFeatureList';
import { SdbLivePreviewDropzone } from '@/components/sdb-preview';
import { PSEO_CONTAINER, PSEO_PROSE } from '@/components/programmatic-seo';
import { HOME_PRICING_SIFA_TAB_HREF } from '@/config/home-sections/pricing-audience';
import { LIVE_DEMO_ANCHOR_ID } from '@/config/home-sections/hero';
import type { IndustrySolution } from '@/config/industry-solutions';

type Props = {
  data: IndustrySolution;
};

/**
 * SiFa-CRO: Dropzone im ersten Viewport, SiFa-Preise, Mobile-Beispiel-SDB.
 */
export function SifaMandantenFunnelHero({ data }: Props) {
  return (
    <section className="border-b border-white/[0.07] pb-12 pt-8 lg:pb-16 lg:pt-12" aria-labelledby="industry-hero-title">
      <div className={`${PSEO_CONTAINER} ${PSEO_PROSE}`}>
        <IndustrySlugHero data={data} />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={HOME_PRICING_SIFA_TAB_HREF}
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-[#ff6b35]/40 bg-[#162340]/80 px-6 py-3 text-center text-sm font-semibold text-[#f0f6ff] no-underline transition hover:border-[#ff6b35]/70 hover:bg-[#162340]"
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