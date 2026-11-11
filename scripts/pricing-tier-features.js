/**
 * Preiskarten: erste N Feature-Zeilen sichtbar, Rest per Toggle.
 * SSoT-Zahl: config/pricing-plans.ts → PRICING_VISIBLE_FEATURE_COUNT
 */
(function () {
  var VISIBLE_COUNT = 3;
  var LABEL_MORE = 'Weitere Details anzeigen';
  var LABEL_LESS = 'Weniger anzeigen';

  function initPricingFeatureToggles() {
    document.querySelectorAll('.pricing-tier-grid > article').forEach(function (article) {
      var ul = article.querySelector(':scope > ul.mt-6');
      if (!ul || ul.dataset.pricingFeaturesReady === 'true') return;

      var wrap = document.createElement('div');
      wrap.className = 'pricing-tier__features';
      ul.classList.remove('mt-6');
      ul.classList.add('pricing-tier__feature-list');
      article.insertBefore(wrap, ul);
      wrap.appendChild(ul);

      var featureItems = [];
      var hasExtra = false;
      ul.querySelectorAll(':scope > li').forEach(function (li) {
        if (li.classList.contains('pricing-tier__pitch')) {
          li.classList.add('pricing-tier__feature-item--extra');
          hasExtra = true;
          return;
        }
        featureItems.push(li);
      });

      featureItems.forEach(function (li, index) {
        if (index >= VISIBLE_COUNT) {
          li.classList.add('pricing-tier__feature-item--extra');
          hasExtra = true;
        }
      });

      if (hasExtra) {
        var toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'pricing-tier__feature-toggle';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = LABEL_MORE;
        toggle.addEventListener('click', function () {
          var expanded = wrap.classList.toggle('is-expanded');
          toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
          toggle.textContent = expanded ? LABEL_LESS : LABEL_MORE;
        });
        wrap.appendChild(toggle);
      } else {
        wrap.classList.add('pricing-tier__features--no-more');
      }

      ul.dataset.pricingFeaturesReady = 'true';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPricingFeatureToggles);
  } else {
    initPricingFeatureToggles();
  }
})();
