import Link from 'next/link';
import { BA_PILL_LIST, BA_PROSE } from '@/components/betriebsanweisung/ba-page-layout';
import { BetriebsanweisungHeroUspSection } from '@/components/betriebsanweisung/BetriebsanweisungHeroUspSection';
import { SlugHeroSubheadline } from '@/components/programmatic-seo/SlugHeroSubheadline';
import { SLUG_HERO_PROOF_LINE } from '@/config/programmatic-seo/defaults';
import { buildBetriebsanweisungHeroSubheadlineParagraphs } from '@/config/betriebsanweisung/hero-copy';
import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import type { BreadcrumbItem } from '@/lib/seo/build-breadcrumb-schema';
import { SiteBreadcrumb } from '@/components/seo/SiteBreadcrumb';

type Props = {
  entry: HazardousSubstanceSeoEntry;
  breadcrumbs: readonly BreadcrumbItem[];
  registerUrl: string;
};

/** Hero aller Betriebsanweisungs-Slugs — Änderungen gelten automatisch für neue Stoffe. */
export function BetriebsanweisungSlugHero({ entry, breadcrumbs, registerUrl }: Props) {
  const heroSubheadlineParagraphs = buildBetriebsanweisungHeroSubheadlineParagraphs(entry.substanceName);

  return (
    <>
      <SiteBreadcrumb items={breadcrumbs} className="mb-6 text-xs sm:text-sm" />
      <p className="gqr-kicker">TRGS 555 · KI-gestützter Entwurf</p>
      <h1
        id="ba-hero-title"
        className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#f0f6ff] sm:text-4xl lg:text-[2.35rem]"
      >
        Betriebsanweisung {entry.substanceName} nach TRGS 555: Entwurf aus Ihrem Sicherheitsdatenblatt
      </h1>
      <SlugHeroSubheadline id="ba-hero-subheadline" paragraphs={heroSubheadlineParagraphs} />
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a href="#ba-sdb-dropzone" className="gqr-cta-primary gqr-cta-primary--md inline-flex justify-center">
          Sicherheitsdatenblatt hochladen ↓
        </a>
        <Link href={registerUrl} className="gqr-cta-secondary gqr-cta-secondary--md inline-flex justify-center">
          Kostenlos registrieren
        </Link>
      </div>
      <p className="mt-3 text-xs text-[#8fa4c0]">{SLUG_HERO_PROOF_LINE}</p>
      <BetriebsanweisungHeroUspSection className="mt-8" />
      {entry.typicalIndustries.length > 0 ? (
        <div className={`${BA_PROSE} mt-6`}>
          <p className="text-xs font-medium text-[#8fa4c0]">Typische Branchen:</p>
          <ul className={`${BA_PILL_LIST} mt-2`} role="list">
            {entry.typicalIndustries.map((industry) => (
              <li
                key={industry}
                className="m-0 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-medium text-[#c8d4e6]"
              >
                {industry}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
