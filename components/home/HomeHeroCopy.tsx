import { HOME_HERO } from '@/config/home-sections/hero';

/**
 * Textblock des Heros. Die Klassenstruktur (h1#heroHeadline, CTA-Div, Microcopy-<p>) ist
 * Vertrag mit scripts/generate-kfz-werkstatt-landing.mjs, das diesen Block ersetzt.
 */
export function HomeHeroCopy() {
  return (
    <>
      <h1
        id="heroHeadline"
        className="sds-hero__title flex w-full flex-col flex-wrap items-center justify-center md:items-start"
      >
        <span className="text-center md:text-left">{HOME_HERO.headline}</span>
        <span className="block text-center text-[#ff5e00] md:text-left">{HOME_HERO.headlineAccent}</span>
      </h1>
      <p className="sds-hero__subtitle mt-5 text-center text-lg text-[#c8d4e6] md:text-left">{HOME_HERO.subheadline}</p>
      <div className="sds-hero__cta-row mt-8 flex w-full flex-col flex-wrap justify-center gap-4 sm:flex-row md:justify-start">
        <a className="btn-cta-orange sds-hero__cta" href={HOME_HERO.primaryCta.href}>
          {HOME_HERO.primaryCta.label}
        </a>
        <a className="sds-secondary-link sds-hero__cta" href={HOME_HERO.secondaryCta.href}>
          {HOME_HERO.secondaryCta.label}
        </a>
      </div>
      <p className="mt-4 w-full text-center text-sm text-[#8fa4c0] md:text-left">{HOME_HERO.microcopy}</p>
    </>
  );
}
