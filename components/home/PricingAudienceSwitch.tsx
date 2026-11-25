import {
  HOME_PRICING_AUDIENCE_TABS,
  type HomePricingAudienceId,
} from '@/config/home-sections/pricing-audience';

const TAB_IDS = Object.keys(HOME_PRICING_AUDIENCE_TABS) as HomePricingAudienceId[];

/** KMU / SiFa-Umschalter über dem Abrechnungs-Toggle (#preise). Steuerung per scripts/pricing-billing.js. */
export function PricingAudienceSwitch() {
  return (
    <div className="pricing-audience" data-pricing-audience-root>
      <div
        className="roi-mode pricing-audience__switch"
        role="tablist"
        aria-label="Tarifgruppe wählen"
        data-pricing-audience-switch
      >
        <span className="roi-mode__thumb" data-pricing-audience-thumb aria-hidden="true" />
        {TAB_IDS.map((id) => {
          const tab = HOME_PRICING_AUDIENCE_TABS[id];
          return (
            <button
              key={id}
              type="button"
              className={`roi-mode__btn${id === 'kmu' ? ' is-active' : ''}`}
              data-pricing-audience={id}
              role="tab"
              aria-selected={id === 'kmu'}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}