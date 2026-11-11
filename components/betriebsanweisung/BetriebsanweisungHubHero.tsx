import Link from 'next/link';
import { BetriebsanweisungHeroUspSection } from '@/components/betriebsanweisung/BetriebsanweisungHeroUspSection';
import { SlugHeroSubheadline } from '@/components/programmatic-seo/SlugHeroSubheadline';
import { SLUG_HERO_PROOF_LINE } from '@/config/programmatic-seo/defaults';
import { BETRIEBSANWEISUNG_HUB_HERO_LEAD } from '@/config/betriebsanweisung/hero-copy';
import type { BreadcrumbItem } from '@/lib/seo/build-breadcrumb-schema';
import { SiteBreadcrumb } from '@/components/seo/SiteBreadcrumb';

type Props = {
  breadcrumbs: readonly BreadcrumbItem[];
  substanceCount: number;
};

export function BetriebsanweisungHubHero({ breadcrumbs, substanceCount }: Props) {
  return (
    <>
      <SiteBreadcrumb items={breadcrumbs} className="mb-6 text-xs sm:text-sm" />
      <p className="gqr-kicker">TRGS 555 · {substanceCount} Stoffe</p>
      <h1
        id="ba-hub-hero-title"
        className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#f0f6ff] sm:text-4xl lg:text-[2.35rem]"
      >
        Betriebsanweisungen für Gefahrstoffe von A bis Z
      </h1>
      <SlugHeroSubheadline id="ba-hub-hero-subheadline" paragraphs={BETRIEBSANWEISUNG_HUB_HERO_LEAD} />
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a href="#stoffe-a-z" className="gqr-cta-secondary gqr-cta-secondary--md inline-flex justify-center">
          Stoff auswählen ↓
        </a>
        <Link
          href="https://app.gefahrstoff-qr.de/register"
          className="gqr-cta-primary gqr-cta-primary--md inline-flex justify-center"
        >
          Eigenes SDB kostenlos auslesen
        </Link>
      </div>
      <p className="mt-3 text-xs text-[#8fa4c0]">{SLUG_HERO_PROOF_LINE}</p>
      <p className="mt-2 text-xs text-[#8fa4c0]">
        Ihr Stoff fehlt? Der Entwurf funktioniert mit jedem Sicherheitsdatenblatt, nicht nur mit den Stoffen dieser
        Liste.
      </p>
      <BetriebsanweisungHeroUspSection className="mt-8" />
    </>
  );
}
