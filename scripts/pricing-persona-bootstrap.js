/**
 * Vor Hydration: SiFa-Tab aus URL (`?tab=sifa`, `/#preise?tab=sifa`, `/pricing/?tab=sifa`)
 * an Preissektion und Toggle koppeln, falsche Karten bis React-Mount ausblenden.
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

  function applyToPricingSection(section) {
    section.setAttribute('data-pricing-initial-persona', 'sifa');
    var toggleButtons = section.querySelectorAll('.pricing-persona-toggle__btn');
    if (toggleButtons.length < 2) return;
    toggleButtons[0].classList.remove('is-active');
    toggleButtons[0].setAttribute('aria-selected', 'false');
    toggleButtons[1].classList.add('is-active');
    toggleButtons[1].setAttribute('aria-selected', 'true');
  }

  function apply() {
    document.querySelectorAll('[data-pricing-section]').forEach(applyToPricingSection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();