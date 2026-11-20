type CaseStudyFactsCardProps = {
  facts: readonly { label: string; value: string }[];
  isAnonymized: boolean;
};

/** Projekt-Steckbrief im Hero einer Fallstudie. */
export function CaseStudyFactsCard({ facts, isAnonymized }: CaseStudyFactsCardProps) {
  return (
    <aside className="gqr-card gqr-card--flat p-5" aria-label="Projekt-Steckbrief">
      <dl className="m-0 grid gap-3">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-xs font-bold uppercase tracking-wider text-gqr-muted">{fact.label}</dt>
            <dd className="m-0 mt-0.5 text-sm font-semibold text-gqr-text">{fact.value}</dd>
          </div>
        ))}
      </dl>
      {isAnonymized ? (
        <p className="mt-4 border-t border-white/[0.08] pt-3 text-xs leading-relaxed text-gqr-muted">
          Auf Wunsch des Betriebs anonymisiert.
        </p>
      ) : null}
    </aside>
  );
}
