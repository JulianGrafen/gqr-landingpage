import type { PipelineStage } from '@/config/trust/types';

type PipelineDiagramProps = {
  stages: readonly PipelineStage[];
  /** Beschriftung für Screenreader. */
  ariaLabel: string;
};

/**
 * Pfeil im Abstand vor einer Stufe: mobil nach unten (über der Karte), ab lg nach rechts (links der Karte).
 * Rein dekorativ, absolut positioniert — die Liste bleibt semantisch sauber.
 */
function StageConnector() {
  return (
    <span
      className="pointer-events-none absolute -top-6 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center text-gqr-trust/60 lg:-left-6 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0"
      aria-hidden="true"
    >
      <svg className="h-5 w-5 rotate-90 lg:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" focusable="false">
        <path d="M4 12h15" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    </span>
  );
}

/**
 * Prozessdiagramm als geordnete Liste (semantisch korrekt, ohne Bild-Abhängigkeit).
 * Mobil vertikal gestapelt, ab lg vier Spalten; Pfeile liegen im Spaltenabstand.
 */
export function PipelineDiagram({ stages, ariaLabel }: PipelineDiagramProps) {
  return (
    <ol
      className="m-0 grid list-none gap-6 p-0 lg:grid-cols-4"
      aria-label={ariaLabel}
    >
      {stages.map((stage, index) => (
        <li key={stage.id} className="relative">
          {index > 0 ? <StageConnector /> : null}
          <article
            className="gqr-card gqr-card--flat flex h-full flex-col p-5"
            aria-labelledby={`pipeline-${stage.id}-title`}
          >
            <span className="inline-flex w-fit items-center rounded-full bg-gqr-trust/15 px-2.5 py-1 text-xs font-bold tracking-wider text-gqr-trust">
              {stage.label}
            </span>
            <h3 id={`pipeline-${stage.id}-title`} className="mt-3 text-lg font-bold leading-snug text-gqr-text">
              {stage.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gqr-muted">{stage.description}</p>
            <ul className="mt-4 flex list-none flex-wrap gap-1.5 p-0" aria-label={`Prüfgegenstände ${stage.label}`}>
              {stage.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-white/[0.08] bg-gqr-surface/60 px-2 py-0.5 text-xs font-semibold text-gqr-soft"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ol>
  );
}
