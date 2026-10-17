import type { SubstanceFaqTuple } from '@/config/betriebsanweisung/types';

type Props = {
  items: SubstanceFaqTuple;
};

export function BetriebsanweisungFaqSection({ items }: Props) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-xl border border-slate-200 bg-white px-4 py-3 open:shadow-sm"
        >
          <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-3">
              {item.question}
              <span className="text-[#ff6b35] transition group-open:rotate-45" aria-hidden>
                +
              </span>
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
