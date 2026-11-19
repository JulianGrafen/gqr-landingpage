import type { ReactNode } from 'react';

type LandingProseSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  /** `muted` = dunkler Hintergrund (Standard Silo); `raised` = leicht abgesetzte Fläche */
  variant?: 'muted' | 'raised';
  /**
   * `prose` = Fließtext mit Artikel-Typografie (Standard);
   * `blocks` = eigene Komponenten (Tabellen, Diagramme, Karten) ohne Prose-Styles, volle Containerbreite.
   */
  layout?: 'prose' | 'blocks';
};

export function LandingProseSection({
  id,
  eyebrow,
  title,
  intro,
  children,
  variant = 'muted',
  layout = 'prose',
}: LandingProseSectionProps) {
  const surfaceClass =
    variant === 'raised'
      ? 'scroll-mt-28 border-b border-white/[0.07] bg-gqr-raised/40 py-14 lg:py-20'
      : 'scroll-mt-28 border-b border-white/[0.07] py-14 lg:py-20';

  const header = (
    <>
      <p className="gqr-kicker">{eyebrow}</p>
      <h2 id={`${id}-title`} className="gqr-post-section-title mt-3">
        {title}
      </h2>
      {intro ? <p className="gqr-post-section-sub mt-4">{intro}</p> : null}
    </>
  );

  return (
    <section id={id} className={surfaceClass} aria-labelledby={`${id}-title`}>
      <div className="gqr-container">
        {layout === 'prose' ? (
          <div className="mx-auto max-w-3xl">
            {header}
            <div className="gqr-post-content mt-8">{children}</div>
          </div>
        ) : (
          <>
            <div className="mx-auto max-w-3xl">{header}</div>
            <div className="mx-auto mt-10 max-w-5xl">{children}</div>
          </>
        )}
      </div>
    </section>
  );
}
