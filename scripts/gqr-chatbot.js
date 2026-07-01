/**
 * Globaler Mini-Chatbot für statische Seiten.
 * Sendet Besucherantworten per FormSubmit direkt an info@gefahrstoff-qr.de.
 */
(function () {
  'use strict';

  if (window.__gqrChatbotLoaded) return;
  window.__gqrChatbotLoaded = true;

  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/info@gefahrstoff-qr.de';
  var STORAGE_KEY = 'gqr-chatbot-opened';
  var FOLLOW_UP = 'Was genau willst du wissen?';

  function getGreeting() {
    var hour = new Date().getHours();
    if (hour < 10) return 'Schon im Büro?';
    if (hour < 12) return 'Was führt dich auf unsere Seite?';
    if (hour < 17) return 'Schon Mittagspause gehabt?';
    return 'noch im Büro?';
  }

  function injectStyles() {
    var css = [
      '.gqr-chatbot{position:fixed;right:18px;bottom:18px;z-index:1200;font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:#f0f6ff}',
      '.gqr-chatbot *{box-sizing:border-box}',
      '.gqr-chatbot__teaser{position:absolute;right:76px;bottom:9px;width:max-content;max-width:270px;border:1px solid rgba(255,255,255,.12);border-radius:18px 18px 4px 18px;background:#162340;padding:12px 14px;box-shadow:0 16px 40px rgba(0,0,0,.34);font-size:14px;line-height:1.35;color:#f0f6ff;cursor:pointer;animation:gqrChatIn .26s ease-out}',
      '.gqr-chatbot__teaser small{display:block;margin-top:3px;color:#8fa4c0;font-size:11px}',
      '.gqr-chatbot__bubble{width:62px;height:62px;border:0;border-radius:999px;background:linear-gradient(135deg,#ff6b35,#ff8a5c);box-shadow:0 16px 42px rgba(255,107,53,.36),0 8px 28px rgba(0,0,0,.32);color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .18s ease,box-shadow .18s ease}',
      '.gqr-chatbot__bubble:hover{transform:translateY(-2px);box-shadow:0 18px 48px rgba(255,107,53,.42),0 10px 30px rgba(0,0,0,.36)}',
      '.gqr-chatbot__bubble svg{width:29px;height:29px}',
      '.gqr-chatbot__panel{position:absolute;right:0;bottom:78px;width:min(380px,calc(100vw - 28px));overflow:hidden;border:1px solid rgba(255,107,53,.22);border-radius:22px;background:linear-gradient(160deg,#162340 0%,#0f1e35 58%,#0a1628 100%);box-shadow:0 24px 74px rgba(0,0,0,.48);animation:gqrChatIn .22s ease-out}',
      '.gqr-chatbot__header{display:flex;align-items:center;gap:12px;padding:16px 16px 13px;border-bottom:1px solid rgba(255,255,255,.08)}',
      '.gqr-chatbot__avatar{width:38px;height:38px;border-radius:14px;background:rgba(255,107,53,.16);display:flex;align-items:center;justify-content:center;color:#ff9a6b;flex:none}',
      '.gqr-chatbot__avatar svg{width:22px;height:22px}',
      '.gqr-chatbot__title{margin:0;font-size:15px;font-weight:800;color:#f0f6ff}',
      '.gqr-chatbot__subtitle{margin:1px 0 0;font-size:12px;color:#8fa4c0}',
      '.gqr-chatbot__close{margin-left:auto;width:32px;height:32px;border:0;border-radius:999px;background:rgba(255,255,255,.08);color:#c5d0e2;cursor:pointer;font-size:18px;line-height:1}',
      '.gqr-chatbot__close:hover{background:rgba(255,255,255,.14);color:#fff}',
      '.gqr-chatbot__messages{display:flex;flex-direction:column;gap:10px;max-height:330px;overflow-y:auto;padding:16px}',
      '.gqr-chatbot__message{max-width:88%;border-radius:16px;padding:10px 12px;font-size:14px;line-height:1.42}',
      '.gqr-chatbot__message--bot{align-self:flex-start;background:rgba(255,255,255,.08);color:#dce7f7;border-bottom-left-radius:5px}',
      '.gqr-chatbot__message--user{align-self:flex-end;background:#ff6b35;color:white;border-bottom-right-radius:5px}',
      '.gqr-chatbot__form{display:grid;gap:9px;border-top:1px solid rgba(255,255,255,.08);padding:13px}',
      '.gqr-chatbot__input{width:100%;min-height:78px;resize:none;border:1px solid rgba(255,255,255,.13);border-radius:14px;background:rgba(10,22,40,.74);padding:12px;color:#f0f6ff;font:inherit;font-size:14px;line-height:1.4}',
      '.gqr-chatbot__input::placeholder{color:#6b7d99}',
      '.gqr-chatbot__input:focus{outline:none;border-color:rgba(255,107,53,.62);box-shadow:0 0 0 3px rgba(255,107,53,.2)}',
      '.gqr-chatbot__submit{min-height:44px;border:0;border-radius:13px;background:linear-gradient(135deg,#ff6b35,#ff8a5c);color:white;font-weight:800;cursor:pointer;box-shadow:0 10px 26px rgba(255,107,53,.24)}',
      '.gqr-chatbot__submit:disabled{cursor:not-allowed;opacity:.68}',
      '.gqr-chatbot__hint{margin:0;text-align:center;font-size:11px;line-height:1.4;color:#8fa4c0}',
      '.gqr-chatbot__hint a{color:#2dd4bf;text-underline-offset:2px}',
      '@keyframes gqrChatIn{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}',
      '@media (max-width:640px){.gqr-chatbot{right:12px;bottom:12px}.gqr-chatbot__teaser{right:0;bottom:76px;max-width:calc(100vw - 24px);border-radius:18px 18px 18px 4px}.gqr-chatbot__panel{position:fixed;left:10px;right:10px;bottom:88px;width:auto;max-height:calc(100vh - 110px)}.gqr-chatbot__messages{max-height:calc(100vh - 345px);min-height:160px}.gqr-chatbot__bubble{width:58px;height:58px}}'
    ].join('');

    var style = document.createElement('style');
    style.id = 'gqr-chatbot-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function iconSvg() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 0 1-3.5-.64L3 21l1.55-4.15A7.2 7.2 0 0 1 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z"/></svg>';
  }

  function createWidget() {
    var greeting = getGreeting();
    var root = document.createElement('div');
    root.className = 'gqr-chatbot';
    root.innerHTML =
      '<div class="gqr-chatbot__teaser" data-gqr-chat-teaser role="button" tabindex="0">' +
        '<strong>' + greeting + '</strong><small>Kurze Frage? Ich helfe weiter.</small>' +
      '</div>' +
      '<section class="gqr-chatbot__panel" data-gqr-chat-panel hidden aria-label="Gefahrstoff-QR Chat">' +
        '<header class="gqr-chatbot__header">' +
          '<div class="gqr-chatbot__avatar">' + iconSvg() + '</div>' +
          '<div><p class="gqr-chatbot__title">Gefahrstoff-QR</p><p class="gqr-chatbot__subtitle">Antwort per Mail an Julian</p></div>' +
          '<button class="gqr-chatbot__close" type="button" data-gqr-chat-close aria-label="Chat schließen">×</button>' +
        '</header>' +
        '<div class="gqr-chatbot__messages" data-gqr-chat-messages>' +
          '<div class="gqr-chatbot__message gqr-chatbot__message--bot">' + greeting + '</div>' +
          '<div class="gqr-chatbot__message gqr-chatbot__message--bot">' + FOLLOW_UP + '</div>' +
        '</div>' +
        '<form class="gqr-chatbot__form" data-gqr-chat-form>' +
          '<textarea class="gqr-chatbot__input" data-gqr-chat-input rows="3" required placeholder="Schreib deine Frage hier rein. Für eine Antwort bitte E-Mail oder Telefon dazuschreiben."></textarea>' +
          '<button class="gqr-chatbot__submit" type="submit">Absenden</button>' +
          '<p class="gqr-chatbot__hint">Wird direkt an <strong>info@gefahrstoff-qr.de</strong> gesendet. <a href="/datenschutz/">Datenschutz</a></p>' +
        '</form>' +
      '</section>' +
      '<button class="gqr-chatbot__bubble" type="button" data-gqr-chat-open aria-label="Chat öffnen">' + iconSvg() + '</button>';

    document.body.appendChild(root);
    return { root: root, greeting: greeting };
  }

  function addMessage(messagesEl, text, type) {
    var message = document.createElement('div');
    message.className = 'gqr-chatbot__message gqr-chatbot__message--' + type;
    message.textContent = text;
    messagesEl.appendChild(message);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function submitMessage(text, greeting) {
    return fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: 'Neue Chatbot-Anfrage über gefahrstoff-qr.de',
        _template: 'table',
        _captcha: 'false',
        Einstiegsfrage: greeting,
        FollowUp: FOLLOW_UP,
        Nachricht: text,
        Seite: window.location.href,
        Zeitstempel: new Date().toISOString(),
        Browser: navigator.userAgent
      })
    }).then(function (response) {
      if (!response.ok) throw new Error('Mailversand fehlgeschlagen');
      return response.json();
    });
  }

  function init() {
    injectStyles();
    var widget = createWidget();
    var root = widget.root;
    var panel = root.querySelector('[data-gqr-chat-panel]');
    var teaser = root.querySelector('[data-gqr-chat-teaser]');
    var openBtn = root.querySelector('[data-gqr-chat-open]');
    var closeBtn = root.querySelector('[data-gqr-chat-close]');
    var form = root.querySelector('[data-gqr-chat-form]');
    var input = root.querySelector('[data-gqr-chat-input]');
    var messages = root.querySelector('[data-gqr-chat-messages]');
    var submitBtn = form.querySelector('button[type="submit"]');

    function openChat() {
      panel.hidden = false;
      teaser.hidden = true;
      try { window.localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
      setTimeout(function () { input.focus(); }, 50);
    }

    function closeChat() {
      panel.hidden = true;
    }

    openBtn.addEventListener('click', openChat);
    teaser.addEventListener('click', openChat);
    teaser.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openChat();
      }
    });
    closeBtn.addEventListener('click', closeChat);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var text = (input.value || '').trim();
      if (!text) return;

      input.value = '';
      addMessage(messages, text, 'user');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wird gesendet...';

      submitMessage(text, widget.greeting)
        .then(function () {
          addMessage(messages, 'Danke! Deine Nachricht ist direkt bei Julian gelandet. Wenn du keine E-Mail oder Telefonnummer genannt hast, schreib sie bitte kurz dazu.', 'bot');
        })
        .catch(function () {
          addMessage(messages, 'Das Senden hat gerade nicht geklappt. Schreib bitte direkt an info@gefahrstoff-qr.de.', 'bot');
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Absenden';
        });
    });

    try {
      if (window.localStorage.getItem(STORAGE_KEY)) teaser.hidden = true;
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
