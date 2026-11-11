type HeroBenefitBulletsProps = {
  bullets: readonly string[];
  /** ID für aria-labelledby am section-Element */
  headingId: string;
  /** Sichtbarer Titel (screenreader) */
  title?: string;
  className?: string;
};

/** Checkliste „Zentrale Vorteile“ (Landing + pSEO-Hero). */
export function HeroBenefitBullets({
  bullets,
  headingId,
  title = 'Zentrale Vorteile',
  className = '',
}: HeroBenefitBulletsProps) {
  return (
    <section
      className={`sds-hero__trust-section ${className}`.trim()}
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="sr-only">
        {title}
      </h2>
      <ul className="sds-hero__checks sds-hero__checks--stacked" aria-label={title}>
        {bullets.map((bullet) => (
          <li key={bullet}>
            <span aria-hidden="true">✓</span>
            {bullet}
          </li>
        ))}
      </ul>
    </section>
  );
}
