import type { IndustrySubstanceLink } from '@/config/industry-solutions';

const TABLE_WRAP_CLASS = 'pricing-compare__scroll mt-8';
const TABLE_CLASS = 'pricing-compare__table w-full';

type Props = {
  items: readonly IndustrySubstanceLink[];
  caption: string;
};

/** Acht typische Werkstatt-Stoffe als scanbare Tabelle (statt Kartenraster). */
export function IndustryWerkstattKatasterTable({ items, caption }: Props) {
  return (
    <div className={TABLE_WRAP_CLASS} tabIndex={0} role="region" aria-label={caption}>
      <table className={TABLE_CLASS}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Stoff</th>
            <th scope="col">Typische Gefährdung / Einsatzort</th>
            <th scope="col">Muster-Betriebsanweisung</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.baSlug}>
              <th scope="row">{item.label}</th>
              <td>{item.note}</td>
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
  );
}