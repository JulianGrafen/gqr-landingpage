/*!
 * Scroll presentation — sticky image stack synced to text via IntersectionObserver
 */
(function () {
  'use strict';

  function initScrollPresentation(root) {
    var textSections = root.querySelectorAll('.text-section');
    var stackImages = root.querySelectorAll('.stack-image');

    if (textSections.length === 0 || stackImages.length === 0) return;

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function activateSection(section) {
      var targetId = section.getAttribute('data-target');
      if (!targetId) return;

      textSections.forEach(function (sec) {
        sec.classList.toggle('active', sec === section);
      });

      stackImages.forEach(function (img) {
        img.classList.toggle('active', img.id === targetId);
      });
    }

    if (reducedMotion) {
      activateSection(textSections[0]);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            activateSection(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      }
    );

    textSections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function boot() {
    document.querySelectorAll('[data-scroll-presentation]').forEach(initScrollPresentation);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
