/*!
 * Produkt-Demo-MP4: erst abspielen, wenn #produkt-demo im Viewport ist (spart Ladezeit & Autoplay-Policies oben auf der Seite).
 */
(function () {
  'use strict';

  var section = document.getElementById('produkt-demo');
  var video = section && section.querySelector('[data-product-demo-video]');
  if (!video || !('IntersectionObserver' in window)) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  function playMuted() {
    video.muted = true;
    var attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(function () {});
    }
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) playMuted();
        else video.pause();
      });
    },
    { threshold: 0.35 }
  );

  observer.observe(section);
})();
