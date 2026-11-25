import { HomeFaqItems } from '@/components/home/HomeFaqItems';
import { LANDING_HOME_EXPERT_FAQ } from '@/config/landing-home-seo-faq';

const FAQ_LIST_CLASS = 'divide-y divide-white/10 rounded-2xl border border-white/[0.08] bg-[#0f1e35]/50 px-4 sm:px-6';

/**
 * Eingeklappte Fachfragen unter den Kauf-FAQs (AEO:FAQ_EXPERT_ITEMS).
 * Natives <details>: Inhalt bleibt im gerenderten HTML (SEO) und im FAQPage-Schema, ohne JavaScript.
 * Benannte Tailwind-Gruppe (`group/more`), damit die +/– Marker der inneren FAQ-Items unabhängig bleiben.
 */
export function HomeFaqExpertToggle() {
  const count = LANDING_HOME_EXPERT_FAQ.length;

  return (
    <details className="group/more mt-6" id="weitere-fachfragen">
      <summary className="btn-glass-outline mx-auto flex w-fit cursor-pointer list-none marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="group-open/more:hidden">Weitere Fachfragen anzeigen ({count})</span>
        <span className="hidden group-open/more:inline">Weitere Fachfragen ausblenden</span>
      </summary>
      <div className={`mt-6 ${FAQ_LIST_CLASS}`}>
        <HomeFaqItems items={LANDING_HOME_EXPERT_FAQ} openFirstItem={false} />
      </div>
    </details>
  );
}
