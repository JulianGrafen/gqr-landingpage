import Link from 'next/link';
import { SlugHeroSubheadline } from '@/components/programmatic-seo/SlugHeroSubheadline';
import { SlugHeroUspSection } from '@/components/programmatic-seo/SlugHeroUspSection';
import {
  DEFAULT_SLUG_HERO_USP_BULLETS,
  SLUG_HERO_PROOF_LINE,
} from '@/config/programmatic-seo/defaults';
import type { IndustrySolution } from '@/config/industry-solutions';
import { resolveMarketingHomeHref } from '@/config/site-seo';

type Props = {
  data: IndustrySolution;
};

function industryHeroLeadParagraphs(data: IndustrySolution): readonly string[] {
  return data.heroLeadParagraphs?.length ? data.heroLeadParagraphs : [data.heroText];
}

/** Hero aller `loesungen/[slug]`-Seiten (außer statischer Kfz-Werkstatt-Export). */
export function IndustrySlugHero({ data }: Props) {
  const marketingHome = resolveMarketingHomeHref();

  return (
    <>
      <p className="gqr-kicker">Branchenlösung</p>
      <h1
        id="industry-hero-title"
        className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#f0f6ff] sm:text-4xl lg:text-[2.35rem] lg:leading-[1.15]"
      >
        {data.title}
      </h1>
      <SlugHeroSubheadline id="industry-hero-subheadline" paragraphs={industryHeroLeadParagraphs(data)} />
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="https://app.gefahrstoff-qr.de/register" className="gqr-cta-primary gqr-cta-primary--md">
          Jetzt kostenlos testen
        </Link>
        <a
          href={marketingHome}
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-[#f0f6ff] no-underline transition hover:border-white/35 hover:bg-white/[0.06]"
        >
          Zur Startseite
        </a>
      </div>
      <p className="mt-3 text-xs text-[#8fa4c0]">{SLUG_HERO_PROOF_LINE}</p>
      <SlugHeroUspSection
        bullets={data.heroUspBullets ?? DEFAULT_SLUG_HERO_USP_BULLETS}
        headingId="industry-hero-benefits-title"
        className="mt-8"
      />
    </>
  );
}
