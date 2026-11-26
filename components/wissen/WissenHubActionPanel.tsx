import Link from 'next/link';
import { WISSEN_HUB_ACTION_PANEL } from '@/config/seo/gemini-cro-2026-11-26';

export function WissenHubActionPanel() {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="navigation" aria-label="Schnelleinstieg Wissen">
      {WISSEN_HUB_ACTION_PANEL.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="gqr-sidebar-card flex flex-col gap-2 border-white/[0.08] bg-gqr-raised/80 p-5 no-underline transition hover:border-[#ff6b35]/30 hover:shadow-lg"
        >
          <span className="text-base font-bold text-gqr-text">{card.title}</span>
          <span className="text-sm leading-relaxed text-gqr-muted">{card.description}</span>
        </Link>
      ))}
    </div>
  );
}