import Link from 'next/link';
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
    <section className="border-t border-white/[0.07] px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="ba-related-heading">
      <div className="mx-auto max-w-3xl">
        <h2 id="ba-related-heading" className="text-lg font-bold text-[#f0f6ff]">
          Betriebsanweisungen für ähnliche Einsatzbereiche
        </h2>
        <p className="mt-2 text-sm text-[#8fa4c0]">
          Stoffe, die in denselben Branchen wie {substanceName} häufig vorkommen.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2" role="list">
          {relatedEntries.map((related) => (
            <li key={related.slug}>
              <Link
                href={`/betriebsanweisung/${related.slug}/`}
                className="inline-flex rounded-full border border-white/15 px-3 py-1 text-sm text-[#c8d4e6] hover:border-[#ff6b35]/40"
              >
                Betriebsanweisung {related.substanceName}
              </Link>
            </li>
          ))}
        </ul>

        {industrySolutions.length > 0 ? (
          <>
            <h3 className="mt-8 text-base font-bold text-[#f0f6ff]">Gefahrstoffmanagement für Ihre Branche</h3>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2" role="list">
              {industrySolutions.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={`/loesungen/${industry.slug}/`}
                    className="text-sm font-semibold text-[#ff6b35] hover:underline"
                  >
                    {industry.label}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <p className="mt-8 text-sm">
          <Link href="/betriebsanweisung/" className="font-semibold text-[#ff6b35] hover:underline">
            Alle Betriebsanweisungen von A bis Z
          </Link>
        </p>
      </div>
    </section>
  );
}
