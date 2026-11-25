import { createRoot } from 'react-dom/client';
import { PricingSection } from '@/components/pricing/PricingSection';

function mountPricingSections() {
  document.querySelectorAll<HTMLElement>('[data-pricing-section]').forEach((host) => {
    if (host.dataset.pricingMounted === 'true') return;
    host.dataset.pricingMounted = 'true';
    const sectionId = host.id || 'preise';
    const root = createRoot(host);
    root.render(<PricingSection sectionId={sectionId} embedded />);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountPricingSections);
} else {
  mountPricingSections();
}