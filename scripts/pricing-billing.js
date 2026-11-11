/**
 * Preis-Toggle (monatlich/jährlich), Anzeige wie app.gefahrstoff-qr.de/pricing, Stripe-Checkout-CTAs.
 * Stripe-URLs: config/pricing-stripe-checkout.ts (SSoT)
 */
(function () {
  'use strict';

  /** @type {Record<string, { monthly: string, yearly: string }>} */
  var STRIPE_CHECKOUT = {
    "kmu-basis": {
      "monthly": "https://buy.stripe.com/9B68wOduzesC0jz2asdAk06",
      "yearly": "https://buy.stripe.com/00wbJ03TZ70a8Q5cP6CUdAk03"
    },
    "kmu-pro": {
      "monthly": "https://buy.stripe.com/3cI9AS3TZ0BM4zP5mEdAk05",
      "yearly": "https://buy.stripe.com/bJecN4gGLbgq4zP9CUdAk02"
    },
    "sifa-multi-mandant": {
      "monthly": "https://buy.stripe.com/6oU14m9ej1FQ5DT16odAk04",
      "yearly": "https://buy.stripe.com/eVqcN43TZ84e4zPaGYdAk01"
    }
  };

  var billingRoot = document.querySelector('[data-pricing-billing]');
  if (!billingRoot) return;

  var billingSwitch = billingRoot.querySelector('.pricing-billing__switch');
  var billingThumb = billingSwitch && billingSwitch.querySelector('.pricing-billing__thumb');
  var billingButtons = billingRoot.querySelectorAll('[data-billing]');
  var billingHint = billingRoot.querySelector('[data-pricing-billing-hint]');
  var priceBlocks = document.querySelectorAll('[data-pricing-price]');
  var compareCells = document.querySelectorAll('[data-pricing-compare-price]');
  var footnote = document.querySelector('[data-pricing-footnote]');
  var checkoutLinks = document.querySelectorAll('[data-pricing-cta]');

  var hints = {
    monthly: 'Monatliche Abrechnung, monatlich kündbar.',
    yearly: 'Jährliche Abrechnung (Standard) — effektiv bis zu 17 % günstiger.',
  };

  var footnotes = {
    monthly: 'Alle Preise zzgl. MwSt., monatliche Abrechnung',
    yearly: 'Alle Preise zzgl. MwSt., jährliche Vorauszahlung (Standard)',
  };

  function formatAmount(value, decimals) {
    return value.toLocaleString('de-DE', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  function getYearlyMonthly(el, monthly) {
    var yearly = el.getAttribute('data-yearly');
    if (yearly) return parseFloat(yearly, 10);
    return monthly;
  }

  function getYearlyTotal(el, monthly) {
    var total = el.getAttribute('data-yearly-total');
    if (total) return parseFloat(total, 10);
    return Math.round(monthly * 12);
  }

  function formatComparePrice(el, monthly, mode, prefix) {
    var prefixText = prefix ? prefix + ' ' : '';
    if (mode === 'yearly') {
      var yMonthly = getYearlyMonthly(el, monthly);
      var yTotal = getYearlyTotal(el, monthly);
      return (
        prefixText +
        formatAmount(yTotal, 0) +
        '\u00a0\u20ac/Jahr · ' +
        formatAmount(yMonthly, 0) +
        '\u00a0\u20ac/Monat'
      );
    }
    return prefixText + formatAmount(monthly, 0) + '\u00a0\u20ac/Monat';
  }

  function positionBillingThumb() {
    if (!billingSwitch || !billingThumb) return;
    var active = billingSwitch.querySelector('.pricing-billing__option.is-active');
    if (!active) return;
    billingThumb.style.width = active.offsetWidth + 'px';
    billingThumb.style.left = active.offsetLeft + 'px';
  }

  var preiseSection = document.getElementById('preise');

  function updateCheckoutLinks(mode) {
    checkoutLinks.forEach(function (link) {
      var planId = link.getAttribute('data-pricing-plan');
      if (!planId || !STRIPE_CHECKOUT[planId]) return;
      link.setAttribute('href', STRIPE_CHECKOUT[planId][mode]);
    });
  }

  function setBilling(mode) {
    billingButtons.forEach(function (button) {
      var isActive = button.getAttribute('data-billing') === mode;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    if (preiseSection) {
      preiseSection.setAttribute('data-billing-mode', mode);
      preiseSection.classList.add('is-pricing-billing-transition');
      window.setTimeout(function () {
        preiseSection.classList.remove('is-pricing-billing-transition');
      }, 480);
    }

    requestAnimationFrame(positionBillingThumb);

    if (billingHint) {
      billingHint.textContent = hints[mode];
    }

    priceBlocks.forEach(function (block) {
      var monthly = parseFloat(block.getAttribute('data-monthly'), 10);
      var prefix = block.getAttribute('data-price-prefix') || '';
      var amountEl = block.querySelector('[data-pricing-amount]');
      var periodEl = block.querySelector('[data-pricing-period]');
      var prefixEl = block.querySelector('[data-pricing-prefix]');
      var anchorEl = block.querySelector('[data-pricing-anchor]');
      var anchorOffset = parseFloat(block.getAttribute('data-anchor-offset') || '20', 10);
      var noteEl = block.parentElement.querySelector('[data-pricing-note]');

      if (!amountEl || !periodEl) return;

      if (prefixEl) {
        prefixEl.textContent = prefix ? prefix + ' ' : '';
      }

      if (mode === 'yearly') {
        var yMonthly = getYearlyMonthly(block, monthly);
        var yTotal = getYearlyTotal(block, monthly);
        block.classList.add('is-pricing-updating');
        amountEl.textContent = formatAmount(yTotal, 0);
        periodEl.textContent = '/Jahr';
        if (anchorEl) {
          anchorEl.hidden = true;
        }
        if (noteEl && !noteEl.classList.contains('pricing-tier__price-note--spacer')) {
          noteEl.textContent =
            'Entspricht ' +
            formatAmount(yMonthly, 0) +
            ' \u20ac/Monat \u00b7 Standard bei Jahreszahlung';
          noteEl.hidden = false;
        }
      } else {
        block.classList.add('is-pricing-updating');
        amountEl.textContent = formatAmount(monthly, 0);
        periodEl.textContent = '/Monat';
        if (anchorEl) {
          anchorEl.hidden = false;
          anchorEl.textContent = formatAmount(monthly + anchorOffset, 0) + '\u00a0\u20ac';
        }
        if (noteEl && !noteEl.classList.contains('pricing-tier__price-note--spacer')) {
          noteEl.textContent = '';
          noteEl.hidden = true;
        }
      }
    });

    requestAnimationFrame(function () {
      priceBlocks.forEach(function (block) {
        block.classList.remove('is-pricing-updating');
      });
    });

    compareCells.forEach(function (cell) {
      var monthly = parseFloat(cell.getAttribute('data-monthly'), 10);
      var prefix = cell.getAttribute('data-price-prefix') || '';
      cell.textContent = formatComparePrice(cell, monthly, mode, prefix);
    });

    if (footnote) {
      footnote.innerHTML =
        footnotes[mode] +
        ' &middot; <a href="https://app.gefahrstoff-qr.de/register" class="font-semibold text-teal-300 underline-offset-2 hover:underline">Kostenlos starten</a>, ohne Kreditkarte.';
    }

    updateCheckoutLinks(mode);
  }

  billingButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      setBilling(button.getAttribute('data-billing'));
    });
  });

  window.addEventListener('resize', positionBillingThumb);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      setBilling('yearly');
    });
  } else {
    setBilling('yearly');
  }
})();
