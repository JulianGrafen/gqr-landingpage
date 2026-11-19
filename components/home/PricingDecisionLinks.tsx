import { getDecisionPages } from '@/config/trust/decision-pages';

/**
 * Entscheidungs-Links unter dem Tarif-Grid (index.html, Marker AEO:PRICING_DECISION_LINKS).
 * Quelle: Decision-Layer-Registry — neue Trust-Seiten erscheinen hier automatisch.
 */
export function PricingDecisionLinks() {
  const pages = getDecisionPages();

  return (
    <nav className="mx-auto mt-8 max-w-[1160px]" aria-labelledby="pricing-decision-links-title">
      <h3 id="pricing-decision-links-title" className="mb-4 text-center text-xs font-bold uppercase tracking-wider text-[#8fa4c0]">
        Vor der Bestellung
      </h3>
      <ul className={`m-0 grid list-none gap-4 p-0 ${pages.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
        {pages.map((page) => (
          <li key={page.id}>
            <a
              href={page.href}
              className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#0f1e35]/60 p-5 no-underline transition-colors hover:border-teal-400/30"
            >
              <span className="text-base font-bold text-[#f0f6ff]">{page.teaserTitle}</span>
              <span className="mt-1.5 text-sm leading-relaxed text-[#8fa4c0]">{page.teaserText}</span>
              <span className="mt-3 text-sm font-semibold text-teal-300" aria-hidden="true">
                Ansehen →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
