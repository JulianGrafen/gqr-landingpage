import Link from 'next/link';
import { Lock } from 'lucide-react';
import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import { formatCasDisplay } from '@/config/betriebsanweisung/registry';
import { GhsPictogramGrid } from '@/components/betriebsanweisung/GhsPictogramGrid';
import {
  BETRIEBSANWEISUNG_REGISTER_URL,
  buildBetriebsanweisungRegisterUrl,
} from '@/lib/betriebsanweisung/build-register-url';

type Props = {
  entry: HazardousSubstanceSeoEntry;
};

const BLUR_PLACEHOLDER = `Schutzmaßnahmen und Verhaltensregeln — PSA, Lüftung, Arbeitsverfahren.
Verhalten im Gefahrfall — Leckage, Brand, Kontakt.
Erste Hilfe — Haut, Augen, Einatmen.
Sachgerechte Entsorgung — Abfall, Kanalisation.`;

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
        <p className="mt-1 text-sm text-[#8fa4c0]">
          {entry.chemicalFormula ? (
            <>
              Summenformel: {entry.chemicalFormula} · CAS: {casLabel}
            </>
          ) : (
            <>CAS / Produkt: {casLabel}</>
          )}
        </p>
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

      <div className="space-y-0 bg-[#0f1e35]/60 text-sm leading-relaxed text-[#c8d4e6]">
        <section className="border-b border-white/10 px-5 py-4">
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#ff6b35]">
            1. Anwendungsbereich &amp; Arbeitsplatz
          </h3>
          <p className="mt-2">{entry.applicationAreaWorkplace}</p>
        </section>

        <section className="border-b border-white/10 px-5 py-4">
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#ff6b35]">
            2. Gefahren für Mensch und Umwelt
          </h3>
          <ul className="mt-2 space-y-1" role="list">
            {entry.typicalHStatements.map((h) => (
              <li key={h.code}>
                <strong className="text-[#f0f6ff]">{h.code}:</strong> {h.text}
              </li>
            ))}
          </ul>
        </section>

        <div className="relative">
          <div
            className="pointer-events-none select-none space-y-0 opacity-40 backdrop-blur-md"
            aria-hidden="true"
          >
            {[3, 4, 5, 6].map((num) => (
              <section key={num} className="border-b border-white/10 px-5 py-4">
                <h3 className="text-xs font-bold uppercase tracking-wide text-[#ff6b35]">
                  {num}. {num === 3 ? 'Schutzmaßnahmen & PSA' : num === 4 ? 'Verhalten im Gefahrfall' : num === 5 ? 'Erste Hilfe' : 'Sachgerechte Entsorgung'}
                </h3>
                <p className="mt-2 whitespace-pre-line">{BLUR_PLACEHOLDER}</p>
              </section>
            ))}
            <section className="px-5 py-6 text-center">
              <img
                src="/images/qr-gefahrstoff-einsatzort.svg"
                alt=""
                width={96}
                height={96}
                className="mx-auto opacity-70"
              />
              <p className="mt-2 text-xs text-[#8fa4c0]">Notfall-QR (Vorschau)</p>
            </section>
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="max-w-sm rounded-2xl border border-white/15 bg-[#0f1e35]/95 p-6 text-center shadow-xl backdrop-blur-sm">
              <Lock className="mx-auto h-8 w-8 text-teal-300" aria-hidden />
              <h3 className="mt-3 text-lg font-bold text-[#f0f6ff]">Vollständigen TRGS-555-Entwurf freischalten</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#8fa4c0]">
                Enthält spezifische PSA-Vorgaben, Erste-Hilfe-Schritte, Notfallmaßnahmen und QR-Code zur
                Vorprüfung zur fachlichen Freigabe durch die SiFa / den Arbeitgeber.
              </p>
              <Link href={registerUrl} className="gqr-cta-primary gqr-cta-primary--md mt-5 inline-flex w-full justify-center">
                Muster-Entwurf jetzt freischalten (Sofort-Download)
              </Link>
              <p className="mt-3 text-[11px] text-[#8fa4c0]">
                KI-gestützter Entwurf (gemäß TRGS 555) · Registrierung unter{' '}
                <span className="text-teal-300">{BETRIEBSANWEISUNG_REGISTER_URL.replace('https://', '')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
