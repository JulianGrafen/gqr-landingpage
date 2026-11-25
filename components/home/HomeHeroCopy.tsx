import { HOME_HERO, HOME_HERO_H1_UNBROKEN_COMPOUND, type HeroCopy } from '@/config/home-sections/hero';

type HomeHeroCopyProps = {
  /** Standard: Startseite. Statische Branchenseiten übergeben ihre eigene Copy. */
  copy?: HeroCopy;
};

function HeroHeadlineLine({ headline }: { headline: string }) {
  const compoundIndex = headline.indexOf(HOME_HERO_H1_UNBROKEN_COMPOUND);
  if (compoundIndex === -1) {
    return headline;
  }

  return (
    <>
      {headline.slice(0, compoundIndex)}
      <span className="sds-hero__title-compound">{HOME_HERO_H1_UNBROKEN_COMPOUND}</span>
      {headline.slice(compoundIndex + HOME_HERO_H1_UNBROKEN_COMPOUND.length)}
    </>
  );
}

/**
 * Textblock des Heros innerhalb des Markers `AEO:HERO_COPY`.
 * Die SDB-Dropzone direkt darunter bleibt unverändert und ist der Primär-CTA.
 */
export function HomeHeroCopy({ copy = HOME_HERO }: HomeHeroCopyProps) {
  return (
    <>
      <p className="sds-hero__eyebrow">{copy.eyebrow}</p>
      <h1 id="heroHeadline" className="sds-hero__title">
        <span className="sds-hero__title-line">
          <HeroHeadlineLine headline={copy.headline} />
        </span>
        <span className="sds-hero__title-accent">{copy.headlineAccent}</span>
      </h1>
      <div className="sds-hero__subtitle">
        {copy.subheadlineParagraphs.map((paragraph) => (
          <p key={paragraph} className="m-0">
            {paragraph}
          </p>
        ))}
      </div>
      {copy.outcomeBullets?.length ? (
        <ul className="sds-hero__outcomes" aria-label="Ergebnis">
          {copy.outcomeBullets.map((bullet) => (
            <li key={bullet}>
              <span className="sds-hero__outcomes-mark" aria-hidden="true">
                ✓
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {copy.ctaRow ? (
        <div className="sds-hero__buy-row">
          <a className="btn-glass-outline sds-hero__buy-primary" href={copy.ctaRow.primary.href}>
            {copy.ctaRow.primary.label}
          </a>
          <a className="sds-hero__buy-link" href={copy.ctaRow.secondary.href}>
            {copy.ctaRow.secondary.label}
          </a>
        </div>
      ) : null}
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
