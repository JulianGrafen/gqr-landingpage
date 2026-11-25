import type { IndustrySubstanceLink } from '@/config/industry-solutions';

const TABLE_WRAP_CLASS = 'pricing-compare__scroll mt-8';
const TABLE_CLASS = 'pricing-compare__table w-full';

type Props = {
  items: readonly IndustrySubstanceLink[];
  caption: string;
  footnote?: string;
};

/** Typische Werkstatt-Stoffe als scanbare Tabelle (Gefährdung, Lagerklasse, Muster-BA). */
export function IndustryWerkstattKatasterTable({ items, caption, footnote }: Props) {
  const showStorageClass = items.some((item) => item.typicalStorageClass);

  return (
    <>
      <div className={TABLE_WRAP_CLASS} tabIndex={0} role="region" aria-label={caption}>
        <table className={TABLE_CLASS}>
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              <th scope="col">Stoff</th>
              <th scope="col">Typische Gefährdung / Einsatzort</th>
              {showStorageClass ? <th scope="col">Lagerklasse (TRGS 510)</th> : null}
              <th scope="col">Muster-Betriebsanweisung</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.baSlug}>
                <th scope="row">{item.label}</th>
                <td>{item.note}</td>
                {showStorageClass ? <td>{item.typicalStorageClass ?? 'laut SDB'}</td> : null}
                <td>
                  <a
                    href={`/betriebsanweisung/${item.baSlug}/`}
                    className="font-semibold text-teal-300 underline-offset-2 hover:underline"
                  >
                    TRGS 555 (Muster)
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footnote ? <p className="mt-3 text-xs leading-relaxed text-[#8fa4c0]">{footnote}</p> : null}
    </>
  );
}
