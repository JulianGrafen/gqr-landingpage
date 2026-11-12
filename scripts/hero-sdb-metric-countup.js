/*!
 * Hero #live-demo: Count-up für SDB-Systemmetrik (einmal bei Sichtbarkeit).
 */
(function () {
  'use strict';

  var counter = document.querySelector('[data-sdb-metric-count]');
  if (!counter) return;

  var target = parseInt(counter.getAttribute('data-count-target'), 10);
  if (!Number.isFinite(target) || target <= 0) return;

  var suffix = counter.getAttribute('data-count-suffix') || '';
  var duration = 1600;
  var started = false;

  function formatDe(value) {
    return value.toLocaleString('de-DE');
  }

  function finish(value) {
    counter.textContent = formatDe(value) + suffix;
  }

  function animate() {
    if (started) return;
    started = true;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish(target);
      return;
    }

    var startTime = performance.now();

    function tick(now) {
      var progress = Math.min(1, (now - startTime) / duration);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(target * eased);
      counter.textContent = formatDe(current) + (progress >= 1 ? suffix : '');
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  var root = counter.closest('.sds-hero__metric') || counter;

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25, rootMargin: '0px 0px -5% 0px' }
    );
    observer.observe(root);
  } else {
    animate();
  }
})();
