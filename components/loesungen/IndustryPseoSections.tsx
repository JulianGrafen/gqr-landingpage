import { PSEO_CONTAINER, PSEO_PROSE, PSEO_SECTION, PSEO_SECTION_MUTED } from '@/components/programmatic-seo';
import type { IndustrySolution } from '@/config/industry-solutions';

type Props = {
  data: IndustrySolution;
};

export function IndustryPseoSections({ data }: Props) {
  const pseo = data.pseo;
  if (!pseo) return null;

  return (
    <>
      <section
        className="border-b border-[#e5e7eb] bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        aria-labelledby="products-table-heading"
      >
        <div className={`${PSEO_CONTAINER}`}>
          <div className={PSEO_PROSE}>
            <h2 id="products-table-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Typische Gefahrstoffe in Ihrem Betrieb
            </h2>
            <p className="mt-3 text-slate-600">
              Beispiele aus der Praxis — ergänzen Sie alle Produkte, die Sie tatsächlich beziehen, lagern oder einsetzen.
            </p>
          </div>
          <div className="-mx-4 mt-8 min-w-0 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm text-slate-800">
              <caption className="sr-only">
                Typische Produkte, Gebinde, Gefahrenart und betriebliche Pflichten
              </caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Typisches Produkt
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Typisches Gebinde
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Gefahrenart in Worten
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Konkrete Pflicht im Betrieb
                  </th>
                </tr>
              </thead>
              <tbody>
                {pseo.typicalProducts.map((row) => (
                  <tr key={row.product} className="border-b border-slate-100">
                    <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                      {row.product}
                    </th>
                    <td className="px-4 py-3 text-slate-700">{row.gebinde}</td>
                    <td className="px-4 py-3 text-slate-700">{row.hazardKind}</td>
                    <td className="px-4 py-3 text-slate-700">{row.workplaceDuty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={`${PSEO_SECTION} bg-[#0f1e35]/30 text-left`} aria-labelledby="inspection-heading">
        <div className={`${PSEO_CONTAINER} ${PSEO_PROSE}`}>
          <h2 id="inspection-heading" className="text-2xl font-bold text-[#f0f6ff] sm:text-3xl">
            Häufige Mängel bei Begehungen der {pseo.berufsgenossenschaft}
          </h2>
          <ol className="mt-6 list-decimal space-y-4 pl-5 text-sm leading-relaxed text-[#c8d4e6]">
            {pseo.inspectionDeficiencies.map((item) => (
              <li key={item.slice(0, 48)}>{item}</li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="border-b border-[#e5e7eb] bg-slate-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        aria-labelledby="excel-compare-heading"
      >
        <div className={PSEO_CONTAINER}>
          <div className={PSEO_PROSE}>
            <h2 id="excel-compare-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Excel-Ordner vs. Gefahrstoff-QR
            </h2>
          </div>
          <div className="-mx-4 mt-8 min-w-0 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="pricing-compare__table w-full min-w-[640px]">
              <caption className="sr-only">Vergleich manueller Dokumentation und Gefahrstoff-QR</caption>
              <thead>
                <tr>
                  <th scope="col">Thema</th>
                  <th scope="col">Excel-Ordner</th>
                  <th scope="col" className="pricing-compare__col--highlight">
                    Gefahrstoff-QR
                  </th>
                </tr>
              </thead>
              <tbody>
                {pseo.excelComparison.map((row) => (
                  <tr key={row.topic}>
                    <th scope="row">{row.topic}</th>
                    <td>{row.excelWorkflow}</td>
                    <td className="pricing-compare__col--highlight">{row.gqrWorkflow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={`${PSEO_SECTION_MUTED} text-left`} aria-labelledby="industry-faq-heading">
        <div className={`${PSEO_CONTAINER} ${PSEO_PROSE}`}>
          <h2 id="industry-faq-heading" className="text-2xl font-bold text-[#f0f6ff] sm:text-3xl">
            Fragen aus der Praxis
          </h2>
          <div className="mt-8 space-y-8">
            {pseo.faqItems.map((item) => (
              <article key={item.question}>
                <h3 className="text-base font-bold text-[#f0f6ff] sm:text-lg">{item.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8fa4c0]">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}