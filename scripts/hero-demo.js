/*!
 * Gefahrstoff-QR — Hero Product Demo  (v2 — 3D transitions)
 * Dashboard → AI extraction → detail scroll → mobile QR phone
 */
(function () {
  'use strict';

  var LOOP_MS     = 22000;
  var IN_MS       = 700;   // entering animation duration
  var OUT_MS      = 500;   // exiting animation duration
  var REDUCED     = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initDemo(wrapper) {
    var screen    = wrapper.querySelector('.hd-screen');
    var scenes    = [].slice.call(wrapper.querySelectorAll('.hd-scene'));
    var cursor    = wrapper.querySelector('.hd-cursor');
    var aiOverlay = wrapper.querySelector('.hd-ai-overlay');
    var aiFill    = wrapper.querySelector('.hd-ai-fill');
    var phone     = wrapper.querySelector('.hd-phone');
    var phoneImg  = phone ? phone.querySelector('.hd-phone-scroll') : null;
    var dotEls    = [].slice.call(wrapper.querySelectorAll('.hd-dot'));
    var captions  = [].slice.call(wrapper.querySelectorAll('[data-caption]'));

    if (!screen || scenes.length === 0) return;

    var currentIdx = 0;

    // ── Scene transition ──────────────────────────────────────────────
    function setScene(toIdx, instant) {
      var fromIdx = currentIdx;
      currentIdx  = toIdx;

      // Update dots
      dotEls.forEach(function (d, i) { d.classList.toggle('is-active', i === toIdx); });

      if (REDUCED || instant) {
        scenes.forEach(function (s, i) {
          s.style.cssText = 'opacity:' + (i === toIdx ? '1' : '0') + ';z-index:' + (i === toIdx ? '2' : '1') + ';animation:none';
          s.classList.remove('hd-scene--entering', 'hd-scene--exiting');
        });
        return;
      }

      var oldScene = fromIdx !== toIdx ? scenes[fromIdx] : null;
      var newScene = scenes[toIdx];

      // Exit old scene
      if (oldScene) {
        oldScene.classList.remove('hd-scene--entering');
        oldScene.style.zIndex = '2';
        oldScene.classList.add('hd-scene--exiting');
        setTimeout(function () {
          oldScene.classList.remove('hd-scene--exiting');
          oldScene.style.opacity = '0';
          oldScene.style.zIndex  = '1';
        }, OUT_MS);
      }

      // Enter new scene (tiny delay so exit leads visually)
      setTimeout(function () {
        newScene.style.opacity = '1';
        newScene.style.zIndex  = '3';
        newScene.classList.remove('hd-scene--exiting');
        newScene.classList.add('hd-scene--entering');
        setTimeout(function () {
          newScene.classList.remove('hd-scene--entering');
          newScene.style.zIndex = '2';
        }, IN_MS);
      }, 60);
    }

    // ── Caption ───────────────────────────────────────────────────────
    function showCaption(key) {
      captions.forEach(function (c) {
        c.style.transition = 'opacity 0.4s ease';
        c.style.opacity    = c.getAttribute('data-caption') === key ? '1' : '0';
      });
    }

    // ── Cursor ────────────────────────────────────────────────────────
    function cursorMove(xPct, yPct, ms) {
      if (REDUCED) return;
      cursor.style.transition =
        'left '   + ms + 'ms cubic-bezier(.42,0,.2,1.08),' +
        'top '    + ms + 'ms cubic-bezier(.42,0,.2,1.08),' +
        'opacity 0.25s ease';
      cursor.style.left    = xPct + '%';
      cursor.style.top     = yPct + '%';
    }

    function cursorVisible(v) {
      cursor.style.transition = 'opacity 0.3s ease';
      cursor.style.opacity    = v ? '1' : '0';
    }

    function cursorClick() {
      if (REDUCED) return;
      cursor.classList.add('hd-cursor--click');
      var ripple = document.createElement('span');
      ripple.className  = 'hd-ripple';
      ripple.style.left = cursor.style.left;
      ripple.style.top  = cursor.style.top;
      screen.appendChild(ripple);
      setTimeout(function () {
        cursor.classList.remove('hd-cursor--click');
        if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
      }, 700);
    }

    // ── Scroll ────────────────────────────────────────────────────────
    function scrollScene(idx, pct, ms) {
      var img = scenes[idx] && scenes[idx].querySelector('.hd-scene-img');
      if (!img) return;
      img.style.transition = 'transform ' + (REDUCED ? 0 : ms) + 'ms cubic-bezier(.4,0,.2,1)';
      img.style.transform  = 'translateY(-' + pct + '%)';
    }

    function resetScroll(idx) {
      var img = scenes[idx] && scenes[idx].querySelector('.hd-scene-img');
      if (!img) return;
      img.style.transition = 'none';
      img.style.transform  = 'translateY(0)';
    }

    // ── AI overlay ────────────────────────────────────────────────────
    var aiActive = false;
    function showAI(visible) {
      if (!aiOverlay) return;
      aiOverlay.style.transition = 'opacity 0.4s ease';
      aiOverlay.style.opacity    = visible ? '1' : '0';
      aiOverlay.style.pointerEvents = visible ? 'auto' : 'none';

      if (visible && !aiActive) {
        aiActive = true;
        if (aiFill) {
          aiFill.style.transition = 'none';
          aiFill.style.width      = '0%';
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              aiFill.style.transition = 'width 2.4s cubic-bezier(.4,0,.2,1)';
              aiFill.style.width      = '91%';
            });
          });
          setTimeout(function () {
            aiFill.style.transition = 'width 0.45s ease';
            aiFill.style.width      = '100%';
          }, 2550);
        }
      }
      if (!visible) aiActive = false;
    }

    // ── Phone ─────────────────────────────────────────────────────────
    function showPhone(visible, ms) {
      if (!phone) return;
      var d = REDUCED ? 0 : (ms || 650);
      phone.style.transition    = 'opacity ' + d + 'ms ease, transform ' + d + 'ms cubic-bezier(.22,1,.36,1)';
      phone.style.opacity       = visible ? '1' : '0';
      phone.style.transform     = visible
        ? 'translate(-50%,-50%) scale(1) translateY(0)'
        : 'translate(-50%,-50%) scale(0.88) translateY(60px)';
      phone.style.pointerEvents = visible ? 'auto' : 'none';
    }

    function scrollPhone(pct, ms) {
      if (!phoneImg) return;
      phoneImg.style.transition = 'transform ' + (REDUCED ? 0 : ms) + 'ms cubic-bezier(.4,0,.2,1)';
      phoneImg.style.transform  = 'translateY(-' + pct + '%)';
    }

    // ── Timeline ──────────────────────────────────────────────────────
    var TL = [
      // SCENE 0 — Dashboard
      [0, function () {
        setScene(0, true);
        resetScroll(0); resetScroll(1); resetScroll(2);
        showAI(false);
        showPhone(false, 0);
        if (phoneImg) { phoneImg.style.transition = 'none'; phoneImg.style.transform = 'translateY(0)'; }
        cursor.style.transition = 'none';
        cursor.style.opacity    = '0';
        cursor.style.left       = '10%';
        cursor.style.top        = '22%';
        showCaption('dashboard');
      }],
      [380,  function () { cursorVisible(true); }],
      // Move cursor to "+ Neuer Gefahrstoff" (top-right button)
      [620,  function () { cursorMove(80.5, 10.5, 1600); }],
      [2320, function () { cursorClick(); }],

      // SCENE 1 — AI extraction
      [2950, function () {
        setScene(1);
        resetScroll(1);
        cursorVisible(false);
        showAI(true);
        showCaption('ai');
      }],
      [5600, function () { showAI(false); showCaption('form'); }],
      [6200, function () { scrollScene(1, 38, 4400); }],

      // SCENE 2 — Detail view (slow vertical scroll)
      [10800, function () {
        setScene(2);
        resetScroll(2);
        showCaption('detail');
      }],
      [11500, function () { scrollScene(2, 42, 5800); }],

      // SCENE 3 — Mobile phone QR overlay
      [17400, function () {
        setScene(0, false);
        showPhone(true, 700);
        showCaption('qr');
      }],
      [18300, function () { scrollPhone(36, 3400); }],

      // Reset before next loop
      [21200, function () {
        showPhone(false, 450);
        cursorVisible(false);
      }],
    ];

    // ── Tick loop ─────────────────────────────────────────────────────
    var startTs  = null;
    var lastLoop = -1;
    var fired    = {};

    function tick(ts) {
      if (!startTs) startTs = ts;
      var elapsed = (ts - startTs) % LOOP_MS;
      var loopNum = Math.floor((ts - startTs) / LOOP_MS);

      if (loopNum !== lastLoop) { lastLoop = loopNum; fired = {}; }

      for (var i = 0; i < TL.length; i++) {
        if (elapsed >= TL[i][0] && !fired[i]) {
          fired[i] = true;
          TL[i][1]();
        }
      }
      requestAnimationFrame(tick);
    }

    // ── Boot ──────────────────────────────────────────────────────────
    setScene(0, true);
    cursor.style.opacity = '0';
    cursor.style.left    = '10%';
    cursor.style.top     = '22%';
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
