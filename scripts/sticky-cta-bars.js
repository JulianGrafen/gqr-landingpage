/*!
 * Mobile bottom + desktop header sticky CTA: sichtbar, wenn weder #hero noch #gratis-vorlage im Viewport.
 * Desktop: Navbar-Primär-CTA ausblenden, solange der Orange-Balken sichtbar ist.
 */
(function () {
  'use strict';

  if (!('IntersectionObserver' in window)) return;

  var mobileBar = document.querySelector('[data-mobile-sticky-cta]');
  var headerBar = document.querySelector('[data-header-sticky-cta]');
  var siteHeader = document.getElementById('siteHeader');
  if (!mobileBar && !headerBar) return;

  var hero = document.getElementById('hero');
  var finalCta = document.getElementById('gratis-vorlage');
  var visible = new Set();
  var desktopMq = window.matchMedia('(min-width: 768px)');

  function updateBars() {
    var obstructed = visible.size > 0;

    if (mobileBar) mobileBar.hidden = obstructed;

    if (headerBar) {
      var showHeader = !obstructed && desktopMq.matches;
      headerBar.hidden = !showHeader;
      headerBar.classList.toggle('is-visible', showHeader);
      if (siteHeader) {
        siteHeader.classList.toggle('is-sticky-cta-active', showHeader);
      }
    } else if (siteHeader) {
      siteHeader.classList.remove('is-sticky-cta-active');
    }
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      updateBars();
    },
    { threshold: 0.01 }
  );

  [hero, finalCta].forEach(function (el) {
    if (el) observer.observe(el);
  });

  if (typeof desktopMq.addEventListener === 'function') {
    desktopMq.addEventListener('change', updateBars);
  } else if (typeof desktopMq.addListener === 'function') {
    desktopMq.addListener(updateBars);
  }

  updateBars();
})();
