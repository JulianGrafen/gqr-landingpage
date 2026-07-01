import { RoiEstimator } from '@/components/expert-blog/RoiEstimator';

type LandingRoiSectionProps = {
  id?: string;
  title?: string;
  subline?: string;
};

export function LandingRoiSection({
  id = 'silo-roi',
  title = 'ROI: Was manuelle Pflege wirklich kostet',
  subline = 'Illustrativer Vergleich — Ihre SiFa-Zeit ist teurer als die Software-Lizenz, soBetriebsanweisungld das Kataster wächst.',
}: LandingRoiSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-b border-white/[0.07] bg-gqr-raised/30 py-14 lg:py-20"
      aria-labelledby={`${id}-title`}
    >
      <div className="gqr-container">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="gqr-kicker">Wirtschaftlichkeit</p>
          <h2 id={`${id}-title`} className="gqr-section-title mt-3">
            {title}
          </h2>
          {subline ? <p className="gqr-section-sub mt-4">{subline}</p> : null}
        </div>
        <div className="mx-auto max-w-3xl">
          <RoiEstimator />
        </div>
      </div>
    </section>
  );
}
