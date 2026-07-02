import { createRoot } from 'react-dom/client';
import { FeatureShowcaseAccordion } from '../components/FeatureShowcaseAccordion';
import {
  getDefaultOpenIndex,
  parseFeatureShowcaseFromGrid,
} from '../config/feature-showcase';

function mountFeatureAccordions() {
  document.querySelectorAll('.sds-entry-grid').forEach((grid) => {
    if (grid.getAttribute('data-feature-accordion-mounted') === 'true') {
      return;
    }

    const items = parseFeatureShowcaseFromGrid(grid);
    if (items.length === 0) {
      return;
    }

    const defaultOpenIndex = getDefaultOpenIndex(grid);
    grid.innerHTML = '';
    grid.setAttribute('data-feature-accordion-mounted', 'true');

    createRoot(grid).render(
      <FeatureShowcaseAccordion items={items} defaultOpenIndex={defaultOpenIndex} />,
    );
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountFeatureAccordions);
} else {
  mountFeatureAccordions();
}
