import type { IndustrySolution } from '@/config/industry-solutions';

const SECTION_CLASS = 'border-t border-white/[0.07] py-14 lg:py-24';
const CONTAINER_CLASS = 'mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-10';
const KICKER_CLASS = 'mb-3 text-xs font-bold uppercase tracking-wider text-[#ff6b35] sm:text-sm';
const HEADING_CLASS = 'text-2xl font-black leading-tight text-[#f0f6ff] sm:text-3xl';

type SectionProps = {
  industry: IndustrySolution;
};

/** „Typische Gefahrstoffe auf einen Blick“: Stoffkarten mit Links auf die TRGS-555-Betriebsanweisungen. */
function IndustrySubstanceOverviewSection({ industry }: SectionProps) {
  const overview = industry.substanceOverview;
  if (!overview) return null;

  return (
    <section id="werkstatt-stoffe" className={`${SECTION_CLASS} bg-white/[0.02]`} aria-labelledby="stoffe-heading">
      <div className={CONTAINER_CLASS}>
        <div className="max-w-3xl">
          <p className={KICKER_CLASS}>{industry.label}</p>
          <h2 id="stoffe-heading" className={HEADING_CLASS}>
            {overview.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#8fa4c0]">{overview.intro}</p>
        </div>
        <ul className="mt-8 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {overview.items.map((item) => (
            <li
              key={item.baSlug}
              className="flex flex-col rounded-xl border border-white/[0.08] bg-[#0f1e35]/70 px-4 py-4"
            >
              <span className="flex items-center gap-3 text-base font-bold text-[#f0f6ff]">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#ff6b35]" aria-hidden="true" />
                {item.label}
              </span>
              <span className="mt-1.5 text-sm leading-relaxed text-[#8fa4c0]">{item.note}</span>
              <a
                href={`/betriebsanweisung/${item.baSlug}/`}
                className="mt-3 text-sm font-semibold text-teal-300 underline-offset-2 hover:underline"
              >
                Betriebsanweisung {item.label} (TRGS 555)
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-[#8fa4c0]">
          <a href="/betriebsanweisung/" className="font-semibold text-[#ff6b35] underline-offset-2 hover:underline">
            Alle Muster-Betriebsanweisungen von A bis Z
          </a>
        </p>
      </div>
    </section>
  );
}

/** Branchennutzen aus `spezifischerVorteil` und `handwerkAbsatz` (gleiche Quelle wie die Next-Branchenseiten). */
function IndustryAdvantageSection({ industry }: SectionProps) {
  return (
    <section className={`${SECTION_CLASS} bg-[#0f1e35]/30`} aria-labelledby="vorteil-heading">
      <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-10">
        <h2 id="vorteil-heading" className={HEADING_CLASS}>
          Wie Gefahrstoff-QR Ihre {industry.brancheGenitiv} entlastet
        </h2>
        <p className="mt-6 text-lg font-semibold leading-relaxed text-[#f0f6ff]">{industry.spezifischerVorteil}</p>
        <p className="mt-6 leading-relaxed text-[#c5d0e2]">{industry.handwerkAbsatz}</p>
        <p className="mt-6 text-sm leading-relaxed text-[#8fa4c0]">
          Gefahrstoff-QR liefert einen KI-gestützten Entwurf (gemäß TRGS 555) für das{' '}
          <strong className="font-semibold text-[#c5d0e2]">Gefahrstoffverzeichnis nach §&nbsp;6 GefStoffV</strong> und die{' '}
          <strong className="font-semibold text-[#c5d0e2]">Betriebsanweisungen</strong>. Er dient als Vorprüfung zur
          fachlichen Freigabe durch die SiFa / den Arbeitgeber (§&nbsp;14 GefStoffV).
        </p>
      </div>
    </section>
  );
}

/** Branchenspezifische Abschnitte, die der Generator vor „Einstiege“ in die Startseiten-Kopie einsetzt. */
export function IndustryStaticLandingSections({ industry }: SectionProps) {
  return (
    <>
      <IndustrySubstanceOverviewSection industry={industry} />
      <IndustryAdvantageSection industry={industry} />
    </>
  );
}
