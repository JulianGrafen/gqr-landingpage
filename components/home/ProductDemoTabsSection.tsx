import { HeroRegelwerkStrip } from '@/components/home/HeroRegelwerkStrip';
import { HOME_SECTION_STYLES as styles } from '@/components/home/home-section-styles';
import { YouTubeFacade } from '@/components/home/YouTubeFacade';
import { PRODUCT_DEMO_TABS, type ProductDemoTab } from '@/config/home-sections/product-demo-tabs';

function tabButtonId(tab: ProductDemoTab): string {
  return `demo-tab-${tab.id}`;
}

function tabPanelId(tab: ProductDemoTab): string {
  return `demo-panel-${tab.id}`;
}

function DemoTabPanel({ tab, isActive }: { tab: ProductDemoTab; isActive: boolean }) {
  return (
    <div
      id={tabPanelId(tab)}
      className="demo-tabs__panel"
      role="tabpanel"
      aria-labelledby={tabButtonId(tab)}
      data-demo-tab-panel={tab.id}
      hidden={!isActive}
    >
      <div className="demo-tabs__media">
        <YouTubeFacade
          youtubeId={tab.video.youtubeId}
          title={tab.video.title}
          playLabelPrefix={PRODUCT_DEMO_TABS.playLabelPrefix}
        />
      </div>
      <div className="demo-tabs__copy">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-teal-400">{tab.kicker}</p>
        <h3 className="text-xl font-bold text-[#f0f6ff] sm:text-2xl">{tab.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-[#8fa4c0]">{tab.lead}</p>
        <ul className="mt-4 list-none space-y-2.5 p-0">
          {tab.points.map((point) => (
            <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-[#c5d0e2] sm:text-base">
              <span className={styles.checkmark} aria-hidden="true">
                ✓
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
        {tab.download ? (
          <a className={`${styles.primaryCta} mt-6`} href={tab.download.href} download={tab.download.download}>
            {tab.download.label}
          </a>
        ) : null}
      </div>
    </div>
  );
}

/**
 * 3-Tab Produkt- & Video-Demo (AEO:PRODUCT_DEMO_TABS) inkl. Konformitäts-Leiste.
 * Alle Panels stehen im DOM (SEO); `/scripts/home-demo-tabs.js` schaltet Tabs und Inline-Player.
 */
export function ProductDemoTabsSection() {
  const { tabs } = PRODUCT_DEMO_TABS;

  return (
    <section
      id={PRODUCT_DEMO_TABS.sectionId}
      className={styles.sectionRaised}
      aria-labelledby={PRODUCT_DEMO_TABS.headlineId}
      data-demo-tabs
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{PRODUCT_DEMO_TABS.eyebrow}</p>
          <h2 id={PRODUCT_DEMO_TABS.headlineId} className={styles.headline}>
            {PRODUCT_DEMO_TABS.headline}
          </h2>
          <p className={styles.lead}>{PRODUCT_DEMO_TABS.lead}</p>
        </header>

        <div className="mb-8 flex justify-center">
          <div className="pricing-persona-toggle demo-tabs__list" role="tablist" aria-label={PRODUCT_DEMO_TABS.tabListLabel}>
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                id={tabButtonId(tab)}
                type="button"
                role="tab"
                className={`pricing-persona-toggle__btn${index === 0 ? ' is-active' : ''}`}
                aria-selected={index === 0}
                aria-controls={tabPanelId(tab)}
                tabIndex={index === 0 ? 0 : -1}
                data-demo-tab={tab.id}
              >
                {tab.tabLabel}
              </button>
            ))}
          </div>
        </div>

        {tabs.map((tab, index) => (
          <DemoTabPanel key={tab.id} tab={tab} isActive={index === 0} />
        ))}

        <div className="mt-12">
          <HeroRegelwerkStrip />
        </div>
      </div>
    </section>
  );
}
