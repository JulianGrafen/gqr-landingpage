import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import { BetriebsanweisungFaqSection } from '@/components/betriebsanweisung/BetriebsanweisungFaqSection';
import { buildBetriebsanweisungFaqItems } from '@/lib/betriebsanweisung/build-substance-faq';

type Props = {
  entry: HazardousSubstanceSeoEntry;
};

export function BetriebsanweisungExpertSeoSection({ entry }: Props) {
  const faqItems = buildBetriebsanweisungFaqItems(entry.substanceName);

  return (
    <div className="space-y-12">
      <section aria-labelledby="compliance-heading">
        <h2 id="compliance-heading" className="text-2xl font-bold text-[#f0f6ff]">
          Warum eine Betriebsanweisung immer hersteller- und arbeitsplatzbezogen sein muss
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#c8d4e6]">
          <p>
            Universelle Sicherheits- und Schutzangaben aus dem Internet sind nach § 14 GefStoffV unzulässig.
            Schutzmaßnahmen (wie Atemschutz, Handschuhmaterial oder Lüftung) hängen zwingend von der konkreten
            Konzentration Ihres Lieferanten, der Einsatzmenge und den Lüftungsverhältnissen vor Ort ab. Keine
            verbindlichen Schutzmaßnahmen auf dieser Seite — maßgeblich ist das freigegebene Sicherheitsdatenblatt.
          </p>
          <p>
            Gefahrstoff-QR unterstützt beim Übernehmen von Angaben aus Ihrem herstellerspezifischen
            Sicherheitsdatenblatt in einen strukturierten TRGS-555-Entwurf.
          </p>
        </div>
      </section>

      <section aria-labelledby="legal-frame-heading">
        <h2 id="legal-frame-heading" className="text-2xl font-bold text-[#f0f6ff]">
          Rechtlicher Rahmen (§ 14 GefStoffV)
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#c8d4e6]">
          <p>
            Für Tätigkeiten mit {entry.substanceName} muss vor Aufnahme der Arbeit eine schriftliche
            Betriebsanweisung vorliegen. Sie muss verständlich sein, den Arbeitsplatz berücksichtigen und auf
            das Sicherheitsdatenblatt des verwendeten Produkts Bezug nehmen.
          </p>
          <p>
            Der KI-gestützte Entwurf (gemäß TRGS 555) unterstützt bei der Erstellung — ersetzt aber nicht die
            Vorprüfung zur fachlichen Freigabe durch die SiFa / den Arbeitgeber (§ 14 GefStoffV). Freigabe,
            Unterweisung und Dokumentation im Gefahrstoffverzeichnis bleiben betriebliche Pflichten.
          </p>
        </div>
      </section>

      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-bold text-[#f0f6ff]">
          Häufige Fragen zu {entry.substanceName}
        </h2>
        <div className="mt-6">
          <BetriebsanweisungFaqSection items={faqItems} variant="dark" />
        </div>
      </section>
    </div>
  );
}
