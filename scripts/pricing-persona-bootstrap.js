/**
 * Vor Hydration (statische Startseite): SiFa-URL markieren, Tabpanel bis React-Mount ausblenden.
 * Kein DOM-Rewrite an Toggle-Buttons (vermeidet Hydration-Mismatch auf /pricing/).
 */
(function () {
  'use strict';

  function explicitPersona() {
    var search = new URLSearchParams(window.location.search);
    if (search.get('tab') === 'sifa') return 'sifa';
    var hash = window.location.hash;
    var queryInHash = hash.indexOf('?');
    if (queryInHash >= 0) {
      var hashParams = new URLSearchParams(hash.slice(queryInHash + 1));
      if (hashParams.get('tab') === 'sifa') return 'sifa';
    }
    return null;
  }

  if (explicitPersona() !== 'sifa') return;

  document.documentElement.classList.add('pricing-url-tab-sifa');

  function apply() {
    document.querySelectorAll('[data-pricing-section]').forEach(function (section) {
      section.setAttribute('data-pricing-initial-persona', 'sifa');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();