import { HOME_HERO, type HeroCopy } from '@/config/home-sections/hero';

type HomeHeroCopyProps = {
  /** Standard: Startseite. Statische Branchenseiten übergeben ihre eigene Copy. */
  copy?: HeroCopy;
};

/**
 * Textblock des Heros innerhalb des Markers `AEO:HERO_COPY`.
 * Die SDB-Dropzone direkt darunter bleibt unverändert und ist der Primär-CTA.
 */
export function HomeHeroCopy({ copy = HOME_HERO }: HomeHeroCopyProps) {
  return (
    <>
      <p className="sds-hero__eyebrow">{copy.eyebrow}</p>
      <h1 id="heroHeadline" className="sds-hero__title">
        <span className="sds-hero__title-line">{copy.headline}</span>
        <span className="sds-hero__title-accent">{copy.headlineAccent}</span>
      </h1>
      <div className="sds-hero__subtitle">
        {copy.subheadlineParagraphs.map((paragraph) => (
          <p key={paragraph} className="m-0">
            {paragraph}
          </p>
        ))}
      </div>
      {copy.secondaryLinks?.length ? (
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {copy.secondaryLinks.map((link) => (
            <a key={link.href} className="sds-secondary-link" href={link.href}>
              {link.label}
            </a>
          ))}
        </p>
      ) : null}
    </>
  );
}
