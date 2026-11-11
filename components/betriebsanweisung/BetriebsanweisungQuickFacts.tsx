import { BA_CONTAINER, BA_PROSE, BA_SECTION } from '@/components/betriebsanweisung/ba-page-layout';
import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';

type Props = {
  entry: HazardousSubstanceSeoEntry;
};

/** Stoffneutrale Eckdaten nach § 14 GefStoffV / TRGS 555, keine Einstufungs- oder Schutzdaten. */
const QUICK_FACTS = [
  { term: 'Rechtsgrundlage', detail: '§ 14 GefStoffV, Aufbau nach TRGS 555' },
  { term: 'Datengrundlage', detail: 'Sicherheitsdatenblatt Ihres Lieferanten für das konkrete Produkt' },
  {
    term: 'Aufbau',
    detail: 'Anwendungsbereich, Gefahren, Schutzmaßnahmen, Verhalten im Gefahrfall, Erste Hilfe, Entsorgung',
  },
  { term: 'Unterweisung', detail: 'Vor Aufnahme der Tätigkeit, danach mindestens jährlich' },
  { term: 'Freigabe', detail: 'Durch die SiFa / den Arbeitgeber, KI liefert nur den Entwurf' },
] as const;

export function BetriebsanweisungQuickFacts({ entry }: Props) {
  return (
    <section className={BA_SECTION} aria-labelledby="ba-quickfacts-heading">
      <div className={BA_CONTAINER}>
        <p className="gqr-kicker">Kurz erklärt</p>
        <h2 id="ba-quickfacts-heading" className="mt-3 text-2xl font-bold text-[#f0f6ff] sm:text-3xl">
          Betriebsanweisung {entry.substanceName}: das Wichtigste in Kürze
        </h2>
        <p id="ba-quickfacts-answer" className={`mt-4 ${BA_PROSE} text-base leading-relaxed text-[#c8d4e6]`}>
          Eine Betriebsanweisung für {entry.substanceName} ist nach § 14 GefStoffV Pflicht, sobald Beschäftigte
          Tätigkeiten mit dem Gefahrstoff ausüben. Sie beruht auf dem Sicherheitsdatenblatt Ihres Lieferanten, folgt dem
          Aufbau der TRGS 555 und muss vor Arbeitsbeginn vorliegen. Gefahrstoff-QR erstellt daraus einen KI-gestützten
          Entwurf zur fachlichen Freigabe durch die SiFa / den Arbeitgeber.
        </p>
        <dl className="ba-quickfacts-grid mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5 lg:items-stretch">
          {QUICK_FACTS.map(({ term, detail }) => (
            <div key={term} className="ba-quickfacts-card flex h-full min-w-0 flex-col">
              <dt className="m-0 text-left text-xs font-bold uppercase tracking-wider text-[#2dd4bf]">{term}</dt>
              <dd className="m-0 mt-2 flex-1 text-left text-sm leading-snug text-[#c8d4e6] [overflow-wrap:anywhere]">
                {detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
