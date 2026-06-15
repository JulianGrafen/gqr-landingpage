import type { SeoSiloStep } from '@/config/seo-silo/types';

type LandingStepsSectionProps = {
  id?: string;
  title: string;
  subline?: string;
  steps: SeoSiloStep[];
};

export function LandingStepsSection({
  id = 'silo-steps',
  title,
  subline,
  steps,
}: LandingStepsSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-b border-white/[0.07] bg-gqr-raised/30 py-14 lg:py-20"
      aria-labelledby={`${id}-title`}
    >
      <div className="gqr-container">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="gqr-kicker">Schritt für Schritt</p>
          <h2 id={`${id}-title`} className="gqr-section-title mt-3">
            {title}
          </h2>
          {subline ? <p className="gqr-section-sub mt-4">{subline}</p> : null}
        </div>

        <ol className="mx-auto max-w-3xl space-y-4" role="list">
          {steps.map((step) => (
            <li
              key={step.id}
              className="gqr-card gqr-card--flat flex gap-4 p-5 sm:gap-5 sm:p-6"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gqr-trust/15 text-lg font-black text-gqr-trust"
                aria-hidden="true"
              >
                {step.number}
              </span>
              <div className="min-w-0">
                {step.regulatoryRef ? (
                  <p className="text-xs font-bold uppercase tracking-wider text-gqr-accent">
                    {step.regulatoryRef}
                  </p>
                ) : null}
                <h3 className="mt-1 text-lg font-bold text-gqr-text">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gqr-muted">{step.description}</p>
                {step.gqrHint ? (
                  <p className="mt-3 rounded-lg border border-gqr-trust/20 bg-gqr-trust/5 px-3 py-2 text-sm leading-relaxed text-gqr-soft">
                    <span className="font-semibold text-gqr-trust">Mit GQR: </span>
                    {step.gqrHint}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
