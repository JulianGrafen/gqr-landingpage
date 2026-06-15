import type { ReactNode } from 'react';

type LandingProseSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  /** `muted` = dunkler Hintergrund (Standard Silo); `raised` = leicht abgesetzte Fläche */
  variant?: 'muted' | 'raised';
};

export function LandingProseSection({
  id,
  eyebrow,
  title,
  intro,
  children,
  variant = 'muted',
}: LandingProseSectionProps) {
  const surfaceClass =
    variant === 'raised'
      ? 'border-b border-white/[0.07] bg-gqr-raised/40 py-14 lg:py-20'
      : 'border-b border-white/[0.07] py-14 lg:py-20';

  return (
    <section className={surfaceClass} aria-labelledby={`${id}-title`}>
      <div className="gqr-container">
        <div className="mx-auto max-w-3xl">
          <p className="gqr-kicker">{eyebrow}</p>
          <h2 id={`${id}-title`} className="gqr-post-section-title mt-3">
            {title}
          </h2>
          {intro ? <p className="gqr-post-section-sub mt-4">{intro}</p> : null}
          <div className="gqr-post-content mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
