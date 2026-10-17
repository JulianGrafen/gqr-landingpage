import type { SubstanceFaqTuple } from '@/config/betriebsanweisung/types';

type Props = {
  items: SubstanceFaqTuple;
  variant?: 'light' | 'dark';
};

export function BetriebsanweisungFaqSection({ items, variant = 'light' }: Props) {
  const detailsClass =
    variant === 'dark'
      ? 'group rounded-xl border border-white/10 bg-[#162340]/50 px-4 py-3 open:border-teal-400/30'
      : 'group rounded-xl border border-slate-200 bg-white px-4 py-3 open:shadow-sm';
  const summaryClass =
    variant === 'dark'
      ? 'cursor-pointer list-none font-semibold text-[#f0f6ff] marker:content-none [&::-webkit-details-marker]:hidden'
      : 'cursor-pointer list-none font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden';
  const answerClass =
    variant === 'dark' ? 'mt-3 text-sm leading-relaxed text-[#8fa4c0]' : 'mt-3 text-sm leading-relaxed text-slate-600';

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.question} className={detailsClass}>
          <summary className={summaryClass}>
            <span className="flex items-start justify-between gap-3">
              {item.question}
              <span className="text-[#ff6b35] transition group-open:rotate-45" aria-hidden>
                +
              </span>
            </span>
          </summary>
          <p className={answerClass}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
