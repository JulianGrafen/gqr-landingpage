/**
 * ROI-Rechner (Hero): KMU vs. externe SiFa.
 * Logik spiegelt lib/roi-calculator/computeTimeSavings.ts
 */
(function () {
  var MINUTES_MANUAL = 20;
  var MINUTES_DIGITAL = 3;
  var SIFA_HOURLY_EUR = 100;

  function roundOneDecimal(hours) {
    return Math.round(hours * 10) / 10;
  }

  function formatDecimalDe(value) {
    return value.toFixed(1).replace('.', ',');
  }

  function formatEuro(value) {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  }

  function totalSubstances(mode, substances, clients) {
    return mode === 'sifa' ? substances * clients : substances;
  }

  function compute(mode, substances, clients) {
    var count = totalSubstances(mode, substances, clients);
    var traditionalMinutes = count * MINUTES_MANUAL;
    var digitalMinutes = count * MINUTES_DIGITAL;
    var savedMinutes = traditionalMinutes - digitalMinutes;
    var savedHours = roundOneDecimal(savedMinutes / 60);
    var traditionalHours = roundOneDecimal(traditionalMinutes / 60);

    return {
      count: count,
      traditionalHours: formatDecimalDe(traditionalHours),
      digitalMinutes: Math.ceil(digitalMinutes),
      savedHours: formatDecimalDe(savedHours),
      honorEur: mode === 'sifa' ? Math.round(savedHours * SIFA_HOURLY_EUR) : null,
    };
  }

  function syncModeThumb(modeRoot) {
    var thumb = modeRoot.querySelector('[data-roi-mode-thumb]');
    var active = modeRoot.querySelector('.roi-mode__btn.is-active');
    if (!thumb || !active) return;

    var rootRect = modeRoot.getBoundingClientRect();
    var activeRect = active.getBoundingClientRect();
    thumb.style.width = activeRect.width + 'px';
    thumb.style.transform =
      'translate3d(' + (activeRect.left - rootRect.left) + 'px, 0, 0)';
  }

  function initCard(card) {
    var modeRoot = card.querySelector('.roi-mode');
    var modeButtons = card.querySelectorAll('[data-roi-mode]');
    var substanceSlider = card.querySelector('[data-roi-substance-slider]');
    var clientSlider = card.querySelector('[data-roi-client-slider]');
    var clientsWrap = card.querySelector('[data-roi-clients-wrap]');
    var honorWrap = card.querySelector('[data-roi-honor-wrap]');
    var substanceLabel = card.querySelector('[data-roi-substance-label]');
    var substanceValue = card.querySelector('[data-roi-substance-value]');
    var clientValue = card.querySelector('[data-roi-client-value]');
    var traditionalHoursEl = card.querySelector('[data-roi-traditional-hours]');
    var digitalMinutesEl = card.querySelector('[data-roi-digital-minutes]');
    var savedHoursEl = card.querySelector('[data-roi-saved-hours]');
    var honorEl = card.querySelector('[data-roi-honor-value]');
    var ctaHoursEls = card.querySelectorAll('[data-roi-cta-hours]');

    if (!substanceSlider) return;

    var mode = 'kmu';

    function setMode(nextMode) {
      mode = nextMode;
      modeButtons.forEach(function (btn) {
        var active = btn.getAttribute('data-roi-mode') === mode;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      if (substanceLabel) {
        substanceLabel.textContent =
          mode === 'sifa' ? 'Ø Gefahrstoffe pro Mandant' : 'Gefahrstoffe im Betrieb';
      }
      if (clientsWrap) {
        clientsWrap.hidden = mode !== 'sifa';
      }
      if (honorWrap) {
        honorWrap.hidden = mode !== 'sifa';
      }
      if (modeRoot) {
        requestAnimationFrame(function () {
          syncModeThumb(modeRoot);
        });
      }
      update();
    }

    function update() {
      var substances = parseInt(substanceSlider.value, 10);
      var clients = clientSlider ? parseInt(clientSlider.value, 10) : 1;
      var result = compute(mode, substances, clients);

      if (substanceValue) substanceValue.textContent = String(substances);
      if (clientValue) clientValue.textContent = String(clients);
      if (traditionalHoursEl) traditionalHoursEl.textContent = result.traditionalHours;
      if (digitalMinutesEl) digitalMinutesEl.textContent = String(result.digitalMinutes);
      if (savedHoursEl) savedHoursEl.textContent = result.savedHours;
      if (honorEl && result.honorEur !== null) {
        honorEl.textContent = formatEuro(result.honorEur);
      }
      ctaHoursEls.forEach(function (el) {
        el.textContent = '\u00a0' + result.savedHours + '\u00a0';
      });
    }

    modeButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setMode(btn.getAttribute('data-roi-mode') || 'kmu');
      });
    });

    substanceSlider.addEventListener('input', update);
    if (clientSlider) clientSlider.addEventListener('input', update);

    if (modeRoot) {
      var resizeTimer;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          syncModeThumb(modeRoot);
        }, 100);
      });
    }

    setMode('kmu');
  }

  document.querySelectorAll('[data-roi-calculator]').forEach(initCard);
})();
