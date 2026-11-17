import { SdbLivePreviewDropzone } from '@/components/sdb-preview';
import { LandingHeroSection } from '@/components/seo-silo/LandingHeroSection';
import { LandingPageWrapper } from '@/components/seo-silo/LandingPageWrapper';
import { LandingProseSection } from '@/components/seo-silo/LandingProseSection';
import {
  ETIKETTEN_FORMATS,
  ETIKETTEN_INTENT_CARDS,
  ETIKETTEN_PROBLEMS,
  ETIKETTEN_SILO_CONFIG,
} from '@/config/seo-silo/pages/etikettensoftware-gefahrstoffe';

const CELL = 'border-b border-white/10 px-4 py-3 align-top text-sm leading-relaxed';

/** Landingpage "Etikettensoftware Gefahrstoffe" im Silo-Layout. */
export function EtikettensoftwareSiloPage() {
  return (
    <LandingPageWrapper
      config={ETIKETTEN_SILO_CONFIG}
      heroSlot={<LandingHeroSection {...ETIKETTEN_SILO_CONFIG.hero} />}
    >
      <section className="gqr-container py-10 sm:py-14" aria-label="SDB Live-Vorschau">
        <SdbLivePreviewDropzone variant="next" className="mx-auto max-w-3xl" />
      </section>

      <LandingProseSection
        id={ETIKETTEN_PROBLEMS.id}
        eyebrow={ETIKETTEN_PROBLEMS.eyebrow}
        title={ETIKETTEN_PROBLEMS.title}
        intro={ETIKETTEN_PROBLEMS.intro}
      >
        {ETIKETTEN_PROBLEMS.items.map((item) => (
          <p key={item.title}>
            <strong>{item.title}:</strong> {item.body}
          </p>
        ))}
      </LandingProseSection>

      <LandingProseSection
        id={ETIKETTEN_FORMATS.id}
        eyebrow={ETIKETTEN_FORMATS.eyebrow}
        title={ETIKETTEN_FORMATS.title}
        variant="raised"
      >
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" tabIndex={0} role="region" aria-label={ETIKETTEN_FORMATS.caption}>
          <table className="w-full min-w-[36rem] border-collapse text-left text-[#c8d4e6]">
            <caption className="sr-only">{ETIKETTEN_FORMATS.caption}</caption>
            <thead className="bg-[#162340] text-[#f0f6ff]">
              <tr>
                <th scope="col" className={`${CELL} font-bold`}>Format</th>
                <th scope="col" className={`${CELL} font-bold`}>Maß</th>
                <th scope="col" className={`${CELL} font-bold`}>Einsatz</th>
              </tr>
            </thead>
            <tbody>
              {ETIKETTEN_FORMATS.rows.map((row) => (
                <tr key={row.name}>
                  <th scope="row" className={`${CELL} font-semibold text-[#f0f6ff]`}>{row.name}</th>
                  <td className={CELL}>{row.size}</td>
                  <td className={CELL}>{row.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LandingProseSection>

      <section
        id={ETIKETTEN_INTENT_CARDS.id}
        className="scroll-mt-28 border-b border-white/[0.07] py-14 lg:py-20"
        aria-labelledby={`${ETIKETTEN_INTENT_CARDS.id}-title`}
      >
        <div className="gqr-container">
          <h2 id={`${ETIKETTEN_INTENT_CARDS.id}-title`} className="gqr-section-title text-center">
            {ETIKETTEN_INTENT_CARDS.title}
          </h2>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {ETIKETTEN_INTENT_CARDS.cards.map((card) => (
              <article key={card.id} className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#0f1e35]/60 p-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#ff6b35] sm:text-sm">{card.eyebrow}</p>
                <h3 className="text-lg font-bold text-[#f0f6ff]">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#8fa4c0]">{card.body}</p>
                <a href={card.cta.href} className="btn-cta-orange mt-6 inline-flex justify-center px-6 py-3 text-white">
                  {card.cta.label}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </LandingPageWrapper>
  );
}
