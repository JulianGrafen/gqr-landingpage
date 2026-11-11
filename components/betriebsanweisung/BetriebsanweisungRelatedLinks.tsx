import Link from 'next/link';
import { BA_CONTAINER, BA_PROSE } from '@/components/betriebsanweisung/ba-page-layout';
import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import type { IndustrySolution } from '@/config/industry-solutions';

type Props = {
  substanceName: string;
  relatedEntries: readonly HazardousSubstanceSeoEntry[];
  industrySolutions: readonly IndustrySolution[];
};

/** Interne Verlinkung: Stoffe mit ähnlichen Einsatzbranchen + passende Branchenlösungen + Hub. */
export function BetriebsanweisungRelatedLinks({ substanceName, relatedEntries, industrySolutions }: Props) {
  return (
    <section
      className="border-t border-white/[0.07] px-4 py-12 text-left sm:px-6 lg:px-8 lg:py-14"
      aria-labelledby="ba-related-heading"
    >
      <div className={`${BA_CONTAINER} space-y-10`}>
        <div className={`${BA_PROSE} space-y-4`}>
          <h2 id="ba-related-heading" className="m-0 text-lg font-bold text-[#f0f6ff] sm:text-xl">
            Betriebsanweisungen für ähnliche Einsatzbereiche
          </h2>
          <p className="m-0 text-sm leading-relaxed text-[#8fa4c0]">
            Stoffe, die in denselben Branchen wie {substanceName} häufig vorkommen.
          </p>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0" role="list">
            {relatedEntries.map((related) => (
              <li key={related.slug} className="m-0 p-0">
                <Link
                  href={`/betriebsanweisung/${related.slug}/`}
                  className="inline-flex rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-[#c8d4e6] no-underline transition hover:border-[#ff6b35]/40 hover:text-[#f0f6ff]"
                >
                  Betriebsanweisung {related.substanceName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {industrySolutions.length > 0 ? (
          <div className={`${BA_PROSE} space-y-4 border-t border-white/[0.07] pt-10`}>
            <h3 className="m-0 text-base font-bold text-[#f0f6ff] sm:text-lg">
              Gefahrstoffmanagement für Ihre Branche
            </h3>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0" role="list">
              {industrySolutions.map((industry) => (
                <li key={industry.slug} className="m-0 p-0">
                  <Link
                    href={`/loesungen/${industry.slug}/`}
                    className="inline-flex rounded-full border border-[#ff6b35]/35 bg-[#ff6b35]/10 px-3 py-1.5 text-sm font-semibold text-[#ff6b35] no-underline transition hover:border-[#ff6b35]/55 hover:bg-[#ff6b35]/15"
                  >
                    {industry.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <p className={`m-0 ${BA_PROSE} border-t border-white/[0.07] pt-10 text-sm`}>
          <Link
            href="/betriebsanweisung/"
            className="font-semibold text-[#ff6b35] no-underline hover:underline"
          >
            Alle Betriebsanweisungen von A bis Z
          </Link>
        </p>
      </div>
    </section>
  );
}
