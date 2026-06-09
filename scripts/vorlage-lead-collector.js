/**
 * Lead-Sammlung für statische Vorlagen-Landingpage (GitHub Pages).
 * Lädt Endpoint aus /vorlage-lead-config.json
 */
(function () {
  'use strict';

  var CONFIG_PATH = '/vorlage-lead-config.json';
  var DEFAULT_SOURCE = 'gefahrstoffverzeichnis-excel-vorlage';
  var DOWNLOAD_PATH = '/downloads/gefahrstoffverzeichnis-vorlage.xlsx';
  var DOWNLOAD_NAME = 'Gefahrstoffverzeichnis-Mustervorlage.xlsx';
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var cachedEndpoint;

  function loadEndpoint() {
    if (cachedEndpoint !== undefined) return Promise.resolve(cachedEndpoint);
    return fetch(CONFIG_PATH, { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) {
          cachedEndpoint = '';
          return '';
        }
        return res.json();
      })
      .then(function (data) {
        cachedEndpoint = (data && data.endpoint && String(data.endpoint).trim()) || '';
        return cachedEndpoint;
      })
      .catch(function () {
        cachedEndpoint = '';
        return '';
      });
  }

  function submitLead(email) {
    return loadEndpoint().then(function (endpoint) {
      if (!endpoint) return;
      var payload = {
        email: email,
        source: DEFAULT_SOURCE,
        page: window.location.href,
        submittedAt: new Date().toISOString(),
      };
      return fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(function (err) {
        console.warn('[GQR] Vorlagen-Lead konnte nicht gespeichert werden:', err);
      });
    });
  }

  function triggerDownload() {
    var a = document.createElement('a');
    a.href = DOWNLOAD_PATH;
    a.download = DOWNLOAD_NAME;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function wireForm(formId, emailId, errorId, successId) {
    var form = document.getElementById(formId);
    var emailInput = document.getElementById(emailId);
    var errorEl = document.getElementById(errorId);
    var successEl = document.getElementById(successId);
    if (!form || !emailInput) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = (emailInput.value || '').trim().toLowerCase();
      if (!EMAIL_RE.test(email)) {
        errorEl.textContent = 'Bitte gib eine gültige E-Mail-Adresse ein.';
        errorEl.hidden = false;
        return;
      }
      errorEl.hidden = true;

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird gesendet…';
      }

      submitLead(email).finally(function () {
        form.hidden = true;
        successEl.hidden = false;
        triggerDownload();
      });
    });
  }

  wireForm('vorlage-form', 'vorlage-email', 'vorlage-form-error', 'vorlage-success');
  wireForm('vorlage-form-bottom', 'vorlage-email-bottom', 'vorlage-form-bottom-error', 'vorlage-success-bottom');
})();
