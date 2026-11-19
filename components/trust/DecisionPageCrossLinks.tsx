import Link from 'next/link';
import { getDecisionPages } from '@/config/trust/decision-pages';
import type { DecisionPageId } from '@/config/trust/types';

type DecisionPageCrossLinksProps = {
  excludeId?: DecisionPageId;
};

/** Querverweise innerhalb des Decision-Layers + Rückweg zu den Preisen. */
export function DecisionPageCrossLinks({ excludeId }: DecisionPageCrossLinksProps) {
  const pages = getDecisionPages().filter((page) => page.id !== excludeId);

  return (
    <nav className="pb-14 lg:pb-20" aria-labelledby="decision-cross-links-title">
      <div className="gqr-container">
        <h2 id="decision-cross-links-title" className="gqr-kicker text-center">
          Weitere Entscheidungsgrundlagen
        </h2>
        <ul className="mx-auto mt-6 grid max-w-5xl list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <li key={page.id}>
              <Link href={page.href} className="gqr-card gqr-card--flat block h-full no-underline">
                <span className="block text-base font-bold text-gqr-text">{page.teaserTitle}</span>
                <span className="mt-2 block text-sm leading-relaxed text-gqr-muted">{page.teaserText}</span>
              </Link>
            </li>
          ))}
          <li>
            <a href="/#preise" className="gqr-card gqr-card--flat block h-full no-underline">
              <span className="block text-base font-bold text-gqr-text">Preise & Tarife</span>
              <span className="mt-2 block text-sm leading-relaxed text-gqr-muted">
                Alle Tarife zzgl. MwSt., Jahreslizenz auf Rechnung.
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
