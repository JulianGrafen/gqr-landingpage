/**
 * 3D-Neigung für `.ba-preview-tilt[data-ba-tilt]`.
 * Tracking per window.mousemove (läuft weiter über dem PDF-iframe; kein mouseleave-Abbruch).
 */
(function () {
  'use strict';

  function init() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    document.querySelectorAll('.ba-preview-tilt[data-ba-tilt]').forEach(function (el) {
      var inner = el.querySelector('.ba-preview-tilt__inner');
      if (!inner) return;

      var raf = 0;
      var active = false;

      function parseMaxTilt() {
        var raw = getComputedStyle(el).getPropertyValue('--ba-tilt-max').trim();
        var n = parseFloat(raw);
        return isFinite(n) ? n : 12;
      }

      function pointInside(clientX, clientY) {
        var rect = el.getBoundingClientRect();
        var pad = 12;
        return (
          clientX >= rect.left - pad &&
          clientX <= rect.right + pad &&
          clientY >= rect.top - pad &&
          clientY <= rect.bottom + pad
        );
      }

      function reset() {
        active = false;
        cancelAnimationFrame(raf);
        inner.style.transform = '';
        window.removeEventListener('mousemove', onMove);
      }

      function applyTilt(clientX, clientY) {
        var rect = el.getBoundingClientRect();
        var px = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
        var py = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
        var max = parseMaxTilt();
        var rotateY = (px - 0.5) * 2 * max;
        var rotateX = (0.5 - py) * 2 * max;
        inner.style.transform =
          'rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg)';
      }

      function onMove(e) {
        if (!active) return;
        if (!pointInside(e.clientX, e.clientY)) {
          reset();
          return;
        }
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          applyTilt(e.clientX, e.clientY);
        });
      }

      el.addEventListener(
        'mouseenter',
        function (e) {
          active = true;
          window.addEventListener('mousemove', onMove, { passive: true });
          applyTilt(e.clientX, e.clientY);
        },
        { passive: true },
      );

      el.addEventListener(
        'touchstart',
        function (e) {
          if (!e.touches.length) return;
          active = true;
          var t = e.touches[0];
          applyTilt(t.clientX, t.clientY);
        },
        { passive: true },
      );

      el.addEventListener(
        'touchmove',
        function (e) {
          if (!active || !e.touches.length) return;
          var t = e.touches[0];
          if (!pointInside(t.clientX, t.clientY)) {
            reset();
            return;
          }
          applyTilt(t.clientX, t.clientY);
        },
        { passive: true },
      );

      el.addEventListener('touchend', reset, { passive: true });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
