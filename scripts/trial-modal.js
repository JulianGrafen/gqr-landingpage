/**
 * "Kostenlos testen"-Modal für die Landingpage.
 * Öffnet ein Popup-Formular (Vorname, Nachname, E-Mail, Telefon) und sendet
 * die Anfrage per FormSubmit.co direkt als E-Mail an den Betreiber.
 *
 * Empfänger ändern: FORM_ENDPOINT anpassen (oder eigenen Endpoint hinterlegen).
 * Hinweis: Bei der allerersten Übermittlung verschickt FormSubmit eine
 * Bestätigungs-Mail an den Empfänger – Link einmalig klicken, danach laufen
 * alle Anfragen automatisch ein.
 */
(function () {
  'use strict';

  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/info@gefahrstoff-qr.de';
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var modal = document.getElementById('trialModal');
  if (!modal) return;

  var form = document.getElementById('trialForm');
  var errorEl = document.getElementById('trialFormError');
  var successEl = document.getElementById('trialSuccess');
  var lastFocused = null;

  function onKeydown(e) {
    if (e.key === 'Escape') closeModal();
  }

  function openModal() {
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('trial-modal-open');
    var firstInput = form && form.querySelector('input');
    if (firstInput) firstInput.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('trial-modal-open');
    document.removeEventListener('keydown', onKeydown);
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function showError(message) {
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-trial-open]'), function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  Array.prototype.forEach.call(modal.querySelectorAll('[data-trial-close]'), function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      closeModal();
    });
  });

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (errorEl) errorEl.hidden = true;

    var payload = {
      Vorname: (form.Vorname.value || '').trim(),
      Nachname: (form.Nachname.value || '').trim(),
      'E-Mail': (form['E-Mail'].value || '').trim(),
      Telefon: (form.Telefon.value || '').trim(),
      _subject: 'Neue kostenlose Test-Anfrage über gefahrstoff-qr.de',
      _template: 'table',
    };

    if (!payload.Vorname || !payload.Nachname || !payload.Telefon) {
      showError('Bitte füllen Sie alle Felder aus.');
      return;
    }
    if (!EMAIL_RE.test(payload['E-Mail'])) {
      showError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }

    var submitBtn = form.querySelector('button[type="submit"]');
    var originalLabel = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wird gesendet…';
    }

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Unerwarteter Status ' + res.status);
        return res.json();
      })
      .then(function () {
        form.hidden = true;
        if (successEl) successEl.hidden = false;
      })
      .catch(function () {
        showError('Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder schreiben Sie an info@gefahrstoff-qr.de.');
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        }
      });
  });
})();
