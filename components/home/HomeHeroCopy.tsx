import { HOME_HERO } from '@/config/home-sections/hero';

/**
 * Textblock des Heros. Die Klassenstruktur (h1#heroHeadline, CTA-Div, Microcopy-<p>) ist
 * Vertrag mit scripts/generate-kfz-werkstatt-landing.mjs, das diesen Block ersetzt.
 */
export function HomeHeroCopy() {
  return (
    <>
      <p className="sds-hero__eyebrow">{HOME_HERO.eyebrow}</p>
      <h1 id="heroHeadline" className="sds-hero__title">
        <span className="sds-hero__title-line">{HOME_HERO.headline}</span>
        <span className="sds-hero__title-accent">{HOME_HERO.headlineAccent}</span>
      </h1>
      <div className="sds-hero__subtitle">
        {HOME_HERO.subheadlineParagraphs.map((paragraph) => (
          <p key={paragraph} className="m-0">
            {paragraph}
          </p>
        ))}
      </div>
    </>
  );
}
