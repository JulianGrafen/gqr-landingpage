import Link from 'next/link';
import { Lock } from 'lucide-react';
import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import {
  TEASER_LOCKED_SECTION_PLACEHOLDER,
  TEASER_QR_PLACEHOLDER,
} from '@/config/betriebsanweisung/teaser-placeholder-copy';
import { formatCasDisplay } from '@/config/betriebsanweisung/registry';
import { GhsPictogramGrid } from '@/components/betriebsanweisung/GhsPictogramGrid';
import { REGISTER_CTA_LABEL } from '@/config/legal/site-copy';
import {
  BETRIEBSANWEISUNG_REGISTER_URL,
  buildBetriebsanweisungRegisterUrl,
} from '@/lib/betriebsanweisung/build-register-url';

type Props = {
  entry: HazardousSubstanceSeoEntry;
};

const BLUR_SECTIONS = [
  { num: 2, title: 'Gefahren für Mensch und Umwelt' },
  { num: 3, title: 'Schutzmaßnahmen & PSA' },
  { num: 4, title: 'Verhalten im Gefahrfall' },
  { num: 5, title: 'Erste Hilfe' },
  { num: 6, title: 'Sachgerechte Entsorgung' },
] as const;

function classificationDisclaimer(entry: HazardousSubstanceSeoEntry): string {
  const basis =
    entry.casNumber.kind === 'mixture'
      ? 'harmonisierten bzw. typischen Standardwerten'
      : 'harmonisierten Standardwerten';
  return `Hinweis: Die angezeigten Piktogramme und das Signalwort basieren auf ${basis}. Maßgeblich für Ihren Betrieb ist stets das Sicherheitsdatenblatt Ihres konkreten Lieferanten.`;
}

export function BetriebsanweisungTeaserDocument({ entry }: Props) {
  const registerUrl = buildBetriebsanweisungRegisterUrl(entry.slug);
  const casLabel = formatCasDisplay(entry.casNumber);

  return (
    <article
      className="mx-auto max-w-[520px] overflow-hidden rounded-2xl border border-white/10 bg-[#162340]/90 shadow-2xl shadow-black/30"
      aria-label={`Muster-Betriebsanweisung ${entry.substanceName}`}
    >
      <header className="border-b-4 border-[#ff6b35] bg-gradient-to-r from-[#0f1e35] to-[#162340] px-5 py-4 text-[#f0f6ff]">
        <p className="text-[11px] font-bold uppercase leading-snug tracking-wide text-teal-300">
          Betriebsanweisung gemäß § 14 GefStoffV / TRGS 555 (Muster-Entwurf)
        </p>
        <h2 className="mt-2 text-lg font-black sm:text-xl">{entry.documentDisplayName}</h2>
        <p className="mt-1 text-sm text-[#8fa4c0]">CAS / Produkt: {casLabel}</p>
        <p className="mt-2 text-sm">
          Signalwort:{' '}
          <span className={entry.signalWord === 'Gefahr' ? 'font-bold text-red-400' : 'font-bold text-amber-300'}>
            {entry.signalWord}
          </span>
        </p>
        <div className="mt-3">
          <GhsPictogramGrid codes={entry.ghsPictograms} variant="dark" size="sm" />
        </div>
      </header>

      <p className="border-b border-white/10 bg-[#0a1628]/40 px-5 py-3 text-xs leading-relaxed text-[#8fa4c0]">
        {classificationDisclaimer(entry)}
      </p>

      <div className="space-y-0 bg-[#0f1e35]/60 text-sm leading-relaxed text-[#c8d4e6]">
        <section className="border-b border-white/10 px-5 py-4">
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#ff6b35]">
            1. Anwendungsbereich &amp; Arbeitsplatz
          </h3>
          <p className="mt-2">{entry.applicationAreaWorkplace}</p>
        </section>

        <div className="relative min-h-[320px]">
          <div
            className="pointer-events-none select-none space-y-0 opacity-40 backdrop-blur-md"
            aria-hidden="true"
          >
            {BLUR_SECTIONS.map(({ num, title }) => (
              <section key={num} className="border-b border-white/10 px-5 py-4">
                <h3 className="text-xs font-bold uppercase tracking-wide text-[#ff6b35]">
                  {num}. {title}
                </h3>
                <p className="mt-2 whitespace-pre-line text-[#c8d4e6]">
                  {TEASER_LOCKED_SECTION_PLACEHOLDER[num]}
                </p>
              </section>
            ))}
            <section className="border-b border-white/10 px-5 py-6 text-center">
              <img
                src="/images/qr-gefahrstoff-einsatzort.svg"
                alt=""
                width={96}
                height={96}
                className="mx-auto opacity-70"
              />
              <p className="mt-2 text-xs text-[#8fa4c0]">{TEASER_QR_PLACEHOLDER}</p>
            </section>
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="max-w-sm rounded-2xl border border-white/15 bg-[#0f1e35]/95 p-6 text-center shadow-xl backdrop-blur-sm">
              <Lock className="mx-auto h-8 w-8 text-teal-300" aria-hidden />
              <h3 className="mt-3 text-lg font-bold text-[#f0f6ff]">Vollständigen TRGS-555-Entwurf freischalten</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#8fa4c0]">
                Schutzmaßnahmen, PSA-Vorgaben und Notfallmaßnahmen werden automatisiert aus dem Sicherheitsdatenblatt
                Ihres Lieferanten ausgelesen — zur Prüfung durch die SiFa / den Arbeitgeber.
              </p>
              <Link
                href={registerUrl}
                className="gqr-cta-primary gqr-cta-primary--md mt-5 inline-flex w-full justify-center"
              >
                {REGISTER_CTA_LABEL}
              </Link>
              <p className="mt-3 text-[11px] text-[#8fa4c0]">
                KI-gestützter Entwurf (gemäß TRGS 555) · Registrierung unter{' '}
                <span className="text-teal-300">{BETRIEBSANWEISUNG_REGISTER_URL.replace('https://', '')}</span>
              </p>
              <a
                href="#ba-sdb-dropzone"
                className="mt-4 inline-block text-sm font-semibold text-teal-300 hover:underline"
              >
                Eigenes SDB hochladen →
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
