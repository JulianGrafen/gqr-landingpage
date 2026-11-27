import Link from 'next/link';
import { BA_CONTAINER, BA_PROSE, BA_SECTION } from '@/components/betriebsanweisung/ba-page-layout';
import type { GeminiCroDualMidCta, GeminiCroProseLink } from '@/config/seo/gemini-cro-2026-11-27';

const linkClass =
  'font-semibold text-[#f0f6ff] underline decoration-[#ff6b35]/60 underline-offset-4 transition hover:decoration-[#ff6b35]';

type ProseLinksProps = {
  links: readonly GeminiCroProseLink[];
  intro?: string;
  ariaLabel: string;
};

/** Eine oder mehrere Textlinks im BA-Fließtext (oberes / unteres Drittel). */
export function BetriebsanweisungGeminiCroProseLinks({ links, intro, ariaLabel }: ProseLinksProps) {
  if (links.length === 0) return null;

  return (
    <section className={BA_SECTION} aria-label={ariaLabel}>
      <div className={BA_CONTAINER}>
        <p className={`${BA_PROSE} m-0 text-sm leading-relaxed text-[#c8d4e6]`}>
          {intro ? <span>{intro} </span> : null}
          {links.map((link, index) => (
            <span key={link.href}>
              {index > 0 ? (
                <span className="text-[#8fa4c0]" aria-hidden="true">
                  {' · '}
                </span>
              ) : null}
              <Link href={link.href} className={linkClass}>
                {link.label}
              </Link>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

type ComplianceNoticeProps = {
  text: string;
};

export function BetriebsanweisungGeminiCroComplianceNotice({ text }: ComplianceNoticeProps) {
  return (
    <p
      className="mt-4 rounded-xl border border-teal-400/20 bg-teal-400/[0.06] px-4 py-3 text-sm leading-relaxed text-[#c8d4e6]"
      role="note"
    >
      {text}
    </p>
  );
}

type HomeContextLinkProps = {
  link: GeminiCroProseLink;
};

export function BetriebsanweisungGeminiCroHomeContextLink({ link }: HomeContextLinkProps) {
  return (
    <BetriebsanweisungGeminiCroProseLinks
      links={[link]}
      intro="Mehr zur digitalen Plattform:"
      ariaLabel="Kontextlink Startseite"
    />
  );
}

type DualMidCtaProps = {
  copy: GeminiCroDualMidCta;
};

/** Kompakter Doppel-CTA vor der Seitenmitte: Live-Demo + SiFa-Tarif. */
export function BetriebsanweisungGeminiCroDualMidCta({ copy }: DualMidCtaProps) {
  return (
    <section className={BA_SECTION} aria-label="SDB-Test und SiFa-Tarif">
      <div className={BA_CONTAINER}>
        <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center sm:justify-start">
          <a
            href={copy.primaryHref}
            className="gqr-cta-primary gqr-cta-primary--md inline-flex justify-center no-underline sm:w-auto"
          >
            {copy.primaryLabel}
          </a>
          <Link
            href={copy.secondaryHref}
            className="text-center text-sm font-semibold text-[#f0f6ff] underline decoration-[#ff6b35]/60 underline-offset-4 transition hover:decoration-[#ff6b35] sm:text-left"
          >
            {copy.secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}