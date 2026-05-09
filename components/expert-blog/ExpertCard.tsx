type ExpertCardProps = {
  title: string;
  children: React.ReactNode;
  /** Optionale Nummerierung für „Problem 1–3“ */
  index?: number;
};

/**
 * Kachel für Argumentations-Punkte (Pain Points, Fakten-Boxen).
 */
export function ExpertCard({ title, children, index }: ExpertCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/90 p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md sm:p-7">
      <div className="flex items-start gap-3">
        {index != null ? (
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ff6b35]/15 text-sm font-bold text-[#ff6b35]"
            aria-hidden
          >
            {index}
          </span>
        ) : null}
        <h3 className="text-lg font-bold leading-snug text-slate-900">{title}</h3>
      </div>
      <div className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem] [&_strong]:font-semibold [&_strong]:text-slate-800">
        {children}
      </div>
    </article>
  );
}
