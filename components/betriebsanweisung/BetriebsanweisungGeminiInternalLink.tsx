import Link from 'next/link';
import { BA_CONTAINER, BA_PROSE, BA_SECTION } from '@/components/betriebsanweisung/ba-page-layout';
import type { GeminiCroInternalLink } from '@/config/seo/gemini-cro-2026-11-24';

type BetriebsanweisungGeminiInternalLinkProps = {
  link: GeminiCroInternalLink;
};

/** Per-Seite interner Link (Gemini CRO Reinigungs-Cluster), oberes Drittel der BA-Seite. */
export function BetriebsanweisungGeminiInternalLink({ link }: BetriebsanweisungGeminiInternalLinkProps) {
  return (
    <section className={BA_SECTION} aria-label="Weiterführender Reinigungs-Leitfaden">
      <div className={BA_CONTAINER}>
        <p className={`${BA_PROSE} m-0 text-sm leading-relaxed text-[#c8d4e6]`}>
          Auch relevant für Reinigungsbetriebe:{' '}
          <Link
            href={link.href}
            className="font-semibold text-[#f0f6ff] underline decoration-[#ff6b35]/60 underline-offset-4 transition hover:decoration-[#ff6b35]"
          >
            {link.label}
          </Link>
        </p>
      </div>
    </section>
  );
}