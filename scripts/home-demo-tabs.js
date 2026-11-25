/**
 * Startseite #produkt-demo: Tab-Umschaltung (ARIA Tabs) und Click-to-Play YouTube-Facade.
 * Markup: components/home/ProductDemoTabsSection.tsx + YouTubeFacade.tsx (npm run sync:home).
 */
(function () {
  'use strict';

  function activateFacade(button) {
    var src = button.getAttribute('data-youtube-src');
    if (!src) return;
    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = button.getAttribute('data-youtube-title') || '';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    button.replaceWith(iframe);
    iframe.focus();
  }

  /** Laufende Videos stoppen, wenn ihr Tab ausgeblendet wird (iframe zurück auf die Facade). */
  function resetPanelVideos(panel, facadeTemplates) {
    panel.querySelectorAll('.video-facade iframe').forEach(function (iframe) {
      var template = facadeTemplates.get(iframe.parentElement);
      if (template) iframe.replaceWith(template.cloneNode(true));
    });
  }

  function initTabs(root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[data-demo-tab]'));
    var panels = Array.prototype.slice.call(root.querySelectorAll('[data-demo-tab-panel]'));
    var facadeTemplates = new Map();

    root.querySelectorAll('[data-youtube-facade]').forEach(function (button) {
      facadeTemplates.set(button.parentElement, button.cloneNode(true));
    });

    function select(tab, moveFocus) {
      var id = tab.getAttribute('data-demo-tab');
      tabs.forEach(function (candidate) {
        var isActive = candidate === tab;
        candidate.classList.toggle('is-active', isActive);
        candidate.setAttribute('aria-selected', isActive ? 'true' : 'false');
        candidate.tabIndex = isActive ? 0 : -1;
      });
      panels.forEach(function (panel) {
        var isActive = panel.getAttribute('data-demo-tab-panel') === id;
        if (!isActive && !panel.hidden) resetPanelVideos(panel, facadeTemplates);
        panel.hidden = !isActive;
      });
      if (moveFocus) tab.focus();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        select(tab, false);
      });
      tab.addEventListener('keydown', function (event) {
        var nextIndex = null;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        select(tabs[nextIndex], true);
      });
    });

    root.addEventListener('click', function (event) {
      var button = event.target.closest('[data-youtube-facade]');
      if (button && root.contains(button)) activateFacade(button);
    });
  }

  function init() {
    document.querySelectorAll('[data-demo-tabs]').forEach(initTabs);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
