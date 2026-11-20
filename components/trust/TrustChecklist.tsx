import type { ChecklistItem, ChecklistTone } from '@/config/trust/types';

type TrustChecklistProps = {
  items: readonly ChecklistItem[];
  tone: ChecklistTone;
  /** Für Screenreader, z. B. „Zusagen für den Einkauf“. */
  ariaLabel: string;
};

const TONE_MARK: Record<ChecklistTone, { symbol: string; className: string; srLabel: string }> = {
  included: { symbol: '✓', className: 'text-gqr-trust', srLabel: 'Ja:' },
  excluded: { symbol: '✕', className: 'text-gqr-accent', srLabel: 'Nicht:' },
};

/** Liste mit Häkchen (Zusagen) oder Kreuzen (ausdrückliche Ausschlüsse) im Kartenstil der Startseite. */
export function TrustChecklist({ items, tone, ariaLabel }: TrustChecklistProps) {
  const mark = TONE_MARK[tone];

  return (
    <ul className="m-0 grid list-none gap-4 p-0" aria-label={ariaLabel}>
      {items.map((item) => (
        <li key={item.title} className="gqr-card gqr-card--flat flex gap-4 p-5 sm:p-6">
          <span className={`mt-0.5 shrink-0 text-lg font-black leading-none ${mark.className}`} aria-hidden="true">
            {mark.symbol}
          </span>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-gqr-text">
              <span className="sr-only">{mark.srLabel} </span>
              {item.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-gqr-muted">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
