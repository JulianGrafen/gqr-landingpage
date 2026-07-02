/*!
 * Gefahrstoff-QR — Hero Product Demo
 * Timeline-driven animation: Dashboard → AI Extraction → Detail → Mobile QR
 */
(function () {
  'use strict';

  var LOOP_MS = 22000;
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initDemo(wrapper) {
    var screen   = wrapper.querySelector('.hd-screen');
    var scenes   = [].slice.call(wrapper.querySelectorAll('.hd-scene'));
    var cursor   = wrapper.querySelector('.hd-cursor');
    var aiOverlay = wrapper.querySelector('.hd-ai-overlay');
    var aiFill   = wrapper.querySelector('.hd-ai-fill');
    var aiStep   = wrapper.querySelector('.hd-ai-step');
    var phone    = wrapper.querySelector('.hd-phone');
    var phoneImg = phone ? phone.querySelector('.hd-phone-scroll') : null;
    var caption  = wrapper.querySelector('.hd-caption');
    var captions = [].slice.call(wrapper.querySelectorAll('[data-caption]'));
    var dotEls   = [].slice.call(wrapper.querySelectorAll('.hd-dot'));

    if (!screen || scenes.length === 0) return;

    // ── Helpers ─────────────────────────────────────────────────────────
    function setScene(idx, instant) {
      scenes.forEach(function (s, i) {
        if (instant) {
          s.style.transition = 'none';
        } else {
          s.style.transition = 'opacity 0.55s ease';
        }
        s.style.opacity   = i === idx ? '1' : '0';
        s.style.zIndex    = i === idx ? '2' : '1';
      });
      dotEls.forEach(function (d, i) {
        d.classList.toggle('is-active', i === idx);
      });
    }

    function showCaption(key) {
      if (!caption) return;
      var target = wrapper.querySelector('[data-caption="' + key + '"]');
      captions.forEach(function (c) { c.style.opacity = '0'; });
      if (target) {
        target.style.opacity = '1';
      }
    }

    function cursorMove(xPct, yPct, ms) {
      if (REDUCED) return;
      cursor.style.transition = 'left ' + ms + 'ms cubic-bezier(.4,0,.2,1), top ' + ms + 'ms cubic-bezier(.4,0,.2,1)';
      cursor.style.left = xPct + '%';
      cursor.style.top  = yPct + '%';
    }

    function cursorClick() {
      if (REDUCED) return;
      cursor.classList.add('hd-cursor--click');
      var ripple = document.createElement('span');
      ripple.className = 'hd-ripple';
      ripple.style.left = cursor.style.left;
      ripple.style.top  = cursor.style.top;
      screen.appendChild(ripple);
      setTimeout(function () {
        cursor.classList.remove('hd-cursor--click');
        if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
      }, 700);
    }

    function scrollScene(idx, pct, ms) {
      var img = scenes[idx] ? scenes[idx].querySelector('.hd-scene-img') : null;
      if (!img) return;
      var t = REDUCED ? 0 : ms;
      img.style.transition = 'transform ' + t + 'ms cubic-bezier(.4,0,.2,1)';
      img.style.transform  = 'translateY(-' + pct + '%)';
    }

    function resetScroll(idx) {
      var img = scenes[idx] ? scenes[idx].querySelector('.hd-scene-img') : null;
      if (!img) return;
      img.style.transition = 'none';
      img.style.transform  = 'translateY(0)';
    }

    var aiRunning = false;
    function showAI(visible, stepText) {
      if (!aiOverlay) return;
      aiOverlay.style.transition = 'opacity 0.3s ease';
      aiOverlay.style.opacity    = visible ? '1' : '0';
      aiOverlay.style.pointerEvents = visible ? 'auto' : 'none';
      if (visible && !aiRunning) {
        aiRunning = true;
        if (aiStep && stepText) aiStep.textContent = stepText;
        if (aiFill) {
          aiFill.style.transition = 'none';
          aiFill.style.width = '0%';
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              aiFill.style.transition = 'width 2.4s cubic-bezier(.4,0,.2,1)';
              aiFill.style.width = '92%';
            });
          });
          setTimeout(function () {
            aiFill.style.transition = 'width 0.5s ease';
            aiFill.style.width = '100%';
          }, 2500);
        }
      } else if (!visible) {
        aiRunning = false;
      }
    }

    function showPhone(visible, ms) {
      if (!phone) return;
      var t = REDUCED ? 0 : (ms || 600);
      phone.style.transition = 'opacity ' + t + 'ms ease, transform ' + t + 'ms cubic-bezier(.4,0,.2,1)';
      phone.style.opacity    = visible ? '1' : '0';
      phone.style.transform  = visible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.93)';
      phone.style.pointerEvents = visible ? 'auto' : 'none';
    }

    function scrollPhone(pct, ms) {
      if (!phoneImg) return;
      var t = REDUCED ? 0 : ms;
      phoneImg.style.transition = 'transform ' + t + 'ms cubic-bezier(.4,0,.2,1)';
      phoneImg.style.transform  = 'translateY(-' + pct + '%)';
    }

    // ── Timeline ────────────────────────────────────────────────────────
    // [startMs, fn] — executed once per loop iteration when elapsed >= startMs
    var TL = [
      // ─ SCENE 0: Dashboard ────────────────────────────────────────────
      [0, function () {
        setScene(0, true);
        resetScroll(0); resetScroll(1); resetScroll(2);
        showAI(false);
        showPhone(false, 0);
        if (phoneImg) { phoneImg.style.transition = 'none'; phoneImg.style.transform = 'translateY(0)'; }
        if (cursor) {
          cursor.style.transition = 'none';
          cursor.style.opacity = '0';
          cursor.style.left    = '8%';
          cursor.style.top     = '24%';
        }
        showCaption('dashboard');
      }],
      [350, function () {
        if (cursor) cursor.style.opacity = '1';
      }],
      // Cursor moves to "+ Neuer Gefahrstoff" button (top-right ~80% x, ~11% y)
      [600, function () { cursorMove(80, 11, 1500); }],
      [2200, function () { cursorClick(); }],

      // ─ SCENE 1: AI Extraction ────────────────────────────────────────
      [2850, function () {
        setScene(1);
        resetScroll(1);
        if (cursor) cursor.style.opacity = '0';
        showAI(true, 'KI liest Sicherheitsdatenblatt aus …');
        showCaption('ai');
      }],
      [5400, function () {
        showAI(false);
      }],
      [5900, function () {
        showCaption('form');
        scrollScene(1, 38, 4200);
      }],

      // ─ SCENE 2: Detail View ──────────────────────────────────────────
      [10400, function () {
        setScene(2);
        resetScroll(2);
        showCaption('detail');
      }],
      [10900, function () {
        scrollScene(2, 45, 5800);
      }],

      // ─ SCENE 3 / Phone: QR-Notfall ───────────────────────────────────
      [17000, function () {
        setScene(0, false);       // dashboard as background
        showPhone(true, 650);
        showCaption('qr');
      }],
      [17800, function () {
        scrollPhone(36, 3000);
      }],

      // ─ FADE OUT / RESET ──────────────────────────────────────────────
      [21200, function () {
        showPhone(false, 450);
        if (cursor) cursor.style.opacity = '0';
      }],
    ];

    // ── Tick ────────────────────────────────────────────────────────────
    var startTs  = null;
    var lastLoop = -1;
    var fired    = {};

    function tick(ts) {
      if (!startTs) startTs = ts;
      var elapsed  = (ts - startTs) % LOOP_MS;
      var loopNum  = Math.floor((ts - startTs) / LOOP_MS);

      if (loopNum !== lastLoop) {
        lastLoop = loopNum;
        fired    = {};
      }

      for (var i = 0; i < TL.length; i++) {
        if (elapsed >= TL[i][0] && !fired[i]) {
          fired[i] = true;
          TL[i][1]();
        }
      }

      requestAnimationFrame(tick);
    }

    // ── Boot ────────────────────────────────────────────────────────────
    setScene(0, true);
    if (cursor) { cursor.style.opacity = '0'; cursor.style.left = '8%'; cursor.style.top = '24%'; }
    showPhone(false, 0);
    showCaption('dashboard');
    requestAnimationFrame(tick);
  }

  function boot() {
    document.querySelectorAll('.hero-demo').forEach(initDemo);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
