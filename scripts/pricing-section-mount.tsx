import { createRoot } from 'react-dom/client';
import { PricingSection } from '@/components/pricing/PricingSection';
import type { PricingPersonaId } from '@/lib/pricing-config';

function mountPricingSections() {
  document.querySelectorAll<HTMLElement>('[data-pricing-section]').forEach((host) => {
    if (host.dataset.pricingMounted === 'true') return;
    host.dataset.pricingMounted = 'true';
    const sectionId = host.id || 'preise';
    const initialPersona: PricingPersonaId | undefined =
      host.dataset.pricingInitialPersona === 'sifa' ? 'sifa' : undefined;
    const root = createRoot(host);
    root.render(<PricingSection sectionId={sectionId} embedded initialPersona={initialPersona} />);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountPricingSections);
} else {
  mountPricingSections();
}