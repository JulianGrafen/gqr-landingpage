/*!
 * Scroll story — interactive scrolling showcase (21st.dev pattern).
 * Desktop: self-contained scroll area, sticky viewport, scrubbed image track.
 * Mobile: vertical feature cards with normal page scroll + sticky progress bar.
 */
(function () {
  'use strict';

  var ROOT_SELECTOR = '[data-scroll-story]';
  var SCROLLER_SELECTOR = '[data-scroll-story-scroller]';
  var SPACER_SELECTOR = '[data-scroll-story-spacer]';
  var STICKY_SELECTOR = '[data-scroll-story-sticky]';
  var VIEWPORT_SELECTOR = '.scroll-story__visual-viewport';
  var TRACK_SELECTOR = '[data-scroll-story-track]';
  var PROGRESS_SELECTOR = '[data-scroll-story-progress]';
  var SLIDE_SELECTOR = '.scroll-story__slide';
  var FRAME_SLIDE_SELECTOR = '.scroll-story__frame-slide';
  var MOBILE_QUERY = '(max-width: 1023px)';

  var PARALLAX_DISTANCE_REM = 2.5;
  var SMOOTHING_FACTOR = 0.18;
  var SETTLE_THRESHOLD = 0.0008;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function isMobileViewport() {
    return window.matchMedia(MOBILE_QUERY).matches;
  }

  /** Smooth bell-curve fade: one dominant slide, brief handoff at boundaries. */
  function getSlideOpacity(progress, index) {
    var dist = Math.abs(progress - index);
    if (dist >= 0.5) return 0;
    return Math.max(0, Math.cos(dist * Math.PI));
  }

  function getScrollSegment(scroller, slideCount) {
    if (slideCount <= 1) return 0;
    return (scroller.scrollHeight - scroller.clientHeight) / slideCount;
  }

  function getScrollProgress(scroller, slideCount) {
    var segment = getScrollSegment(scroller, slideCount);
    if (segment <= 0) return 0;
    return clamp(scroller.scrollTop / segment, 0, slideCount - 1);
  }

  function scrollToSlide(scroller, slideCount, index, smooth) {
    var segment = getScrollSegment(scroller, slideCount);
    scroller.scrollTo({
      top: segment * index,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }

  function scrollToMobileSlide(slide, smooth) {
    slide.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'center',
    });
  }

  function resetInlineStyles(state) {
    state.slides.forEach(function (slide) {
      slide.style.opacity = '';
      slide.style.transform = '';
      slide.style.visibility = '';
      slide.style.zIndex = '';
      slide.classList.remove('is-in-view');
    });

    if (state.track) state.track.style.transform = '';
    if (state.spacer) state.spacer.style.height = '';
    if (state.sticky) state.sticky.style.backgroundColor = '';
    var copy = state.root.querySelector('.scroll-story__copy');
    if (copy) copy.style.minHeight = '';
  }

  function setActiveIndex(state, index) {
    if (index === state.activeIndex) return;
    state.activeIndex = index;

    state.dots.forEach(function (dot, dotIndex) {
      dot.classList.toggle('is-active', dotIndex === index);
      dot.setAttribute('aria-selected', dotIndex === index ? 'true' : 'false');
    });

    if (state.sticky && state.mode === 'desktop') {
      var background = state.slides[index].getAttribute('data-bg');
      if (background) {
        state.sticky.style.backgroundColor = background;
      }
    }
  }

  function buildProgressDots(state) {
    state.progress.innerHTML = '';

    state.slides.forEach(function (_slide, index) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'scroll-story__dot' + (index === 0 ? ' is-active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Schritt ' + (index + 1));
      dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      dot.addEventListener('click', function () {
        if (state.mode === 'mobile') {
          scrollToMobileSlide(state.slides[index], !state.reducedMotion);
          return;
        }
        scrollToSlide(state.scroller, state.slideCount, index, !state.reducedMotion);
      });
      state.progress.appendChild(dot);
    });

    state.dots = state.progress.querySelectorAll('.scroll-story__dot');
  }

  function measureCopyHeight(state) {
    var copy = state.root.querySelector('.scroll-story__copy');
    if (!copy || state.mode !== 'desktop') return;

    var maxHeight = 0;

    state.slides.forEach(function (slide) {
      slide.style.position = 'static';
      slide.style.visibility = 'hidden';
      slide.style.opacity = '0';
      slide.style.height = 'auto';
      slide.style.transform = 'none';
      maxHeight = Math.max(maxHeight, slide.offsetHeight);
      slide.style.position = 'absolute';
      slide.style.inset = '0';
      slide.style.height = '';
    });

    copy.style.minHeight = maxHeight + 'px';
  }

  function renderProgress(state, progress) {
    state.renderedProgress = progress;
    var nearestIndex = clamp(Math.round(progress), 0, state.slideCount - 1);

    if (state.frameOffset > 0 && state.track) {
      var trackOffset = progress * state.frameOffset;
      state.track.style.transform = 'translate3d(0, -' + trackOffset.toFixed(2) + 'px, 0)';
    }

    var parallaxDistance = state.reducedMotion ? 0 : PARALLAX_DISTANCE_REM;

    state.slides.forEach(function (slide, index) {
      var opacity = getSlideOpacity(progress, index);
      var fadeAmount = 1 - opacity;
      slide.style.opacity = opacity.toFixed(3);
      slide.style.visibility = opacity > 0.04 ? 'visible' : 'hidden';
      slide.style.zIndex = opacity > 0.04 ? String(Math.round(opacity * 10)) : '0';
      slide.style.transform = 'translate3d(0, ' + (fadeAmount * parallaxDistance).toFixed(2) + 'rem, 0)';
      slide.classList.toggle('is-active', index === nearestIndex);
    });

    setActiveIndex(state, nearestIndex);
  }

  function syncFrameSlides(state) {
    if (!state.frame || state.frameSlides.length === 0) return;

    var frameHeight = state.frame.clientHeight;
    if (frameHeight <= 0) return;

    state.frameSlides.forEach(function (slide) {
      slide.style.height = frameHeight + 'px';
    });
    state.track.style.height = frameHeight * state.slideCount + 'px';
    state.frameOffset = frameHeight;
    renderProgress(state, state.renderedProgress);
  }

  function tickSmoothing(state) {
    var delta = state.targetProgress - state.renderedProgress;

    if (Math.abs(delta) > SETTLE_THRESHOLD) {
      renderProgress(state, state.renderedProgress + delta * SMOOTHING_FACTOR);
    } else if (state.renderedProgress !== state.targetProgress) {
      renderProgress(state, state.targetProgress);
    }

    state.rafId = requestAnimationFrame(function () {
      tickSmoothing(state);
    });
  }

  function startSmoothingLoop(state) {
    if (state.rafId !== null) return;
    state.rafId = requestAnimationFrame(function () {
      tickSmoothing(state);
    });
  }

  function stopSmoothingLoop(state) {
    if (state.rafId === null) return;
    cancelAnimationFrame(state.rafId);
    state.rafId = null;
  }

  function destroyScrollStory(root) {
    var state = root._scrollStoryState;
    if (!state) return;

    stopSmoothingLoop(state);

    if (state.scrollHandler && state.scroller) {
      state.scroller.removeEventListener('scroll', state.scrollHandler);
    }

    if (state.resizeHandler) {
      window.removeEventListener('resize', state.resizeHandler);
    }

    if (state.visibilityObserver) {
      state.visibilityObserver.disconnect();
    }

    if (state.mobileObserver) {
      state.mobileObserver.disconnect();
    }

    if (state.frameObserver) {
      state.frameObserver.disconnect();
    }

    resetInlineStyles(state);
    root.classList.remove('scroll-story--mobile');
    root._scrollStoryState = null;
  }

  function initMobileScrollStory(root, shared) {
    root.classList.add('scroll-story--mobile');

    var state = Object.assign({}, shared, {
      mode: 'mobile',
      activeIndex: 0,
      mobileObserver: null,
    });

    state.slides.forEach(function (slide, index) {
      slide.classList.toggle('is-active', index === 0);
      slide.classList.toggle('is-in-view', index === 0);
    });

    setActiveIndex(state, 0);

    state.mobileObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle('is-in-view', entry.isIntersecting);

        if (entry.isIntersecting) {
          var index = Array.prototype.indexOf.call(state.slides, entry.target);
          if (index >= 0) {
            setActiveIndex(state, index);
          }
        }
      });
    }, {
      root: null,
      rootMargin: '-42% 0px -42% 0px',
      threshold: 0,
    });

    state.slides.forEach(function (slide) {
      state.mobileObserver.observe(slide);
    });

    root._scrollStoryState = state;
  }

  function initDesktopScrollStory(root, shared) {
    var scroller = root.querySelector(SCROLLER_SELECTOR);
    var spacer = root.querySelector(SPACER_SELECTOR);
    var sticky = root.querySelector(STICKY_SELECTOR);
    var viewport = root.querySelector(VIEWPORT_SELECTOR);
    var track = root.querySelector(TRACK_SELECTOR);

    if (!scroller || !spacer || !sticky) return;

    spacer.style.height = shared.slideCount * 100 + 'vh';

    var state = Object.assign({}, shared, {
      mode: 'desktop',
      scroller: scroller,
      spacer: spacer,
      sticky: sticky,
      frame: viewport,
      track: track,
      activeIndex: -1,
      targetProgress: 0,
      renderedProgress: 0,
      frameOffset: 0,
      rafId: null,
      scrollHandler: null,
      resizeHandler: null,
      visibilityObserver: null,
    });

    if (state.reducedMotion && track) {
      track.style.transition = 'none';
    }

    state.scrollHandler = function () {
      state.targetProgress = getScrollProgress(state.scroller, state.slideCount);

      if (state.reducedMotion) {
        renderProgress(state, state.targetProgress);
      }
    };

    state.resizeHandler = function () {
      measureCopyHeight(state);
      syncFrameSlides(state);
    };

    scroller.addEventListener('scroll', state.scrollHandler, { passive: true });
    window.addEventListener('resize', state.resizeHandler);

    if (state.frame && window.ResizeObserver) {
      state.frameObserver = new ResizeObserver(function () {
        measureCopyHeight(state);
        syncFrameSlides(state);
      });
      state.frameObserver.observe(state.frame);
    }

    state.visibilityObserver = new IntersectionObserver(function (entries) {
      var isVisible = entries[entries.length - 1].isIntersecting;
      if (isVisible) {
        state.scrollHandler();
        if (!state.reducedMotion) startSmoothingLoop(state);
      } else {
        stopSmoothingLoop(state);
      }
    }, { threshold: 0 });

    state.visibilityObserver.observe(root);

    measureCopyHeight(state);
    renderProgress(state, 0);
    syncFrameSlides(state);
    root._scrollStoryState = state;
  }

  function initScrollStory(root) {
    destroyScrollStory(root);

    var slides = root.querySelectorAll(SLIDE_SELECTOR);
    var progress = root.querySelector(PROGRESS_SELECTOR);

    if (!progress || slides.length === 0) return;

    var shared = {
      root: root,
      progress: progress,
      slides: slides,
      frameSlides: root.querySelectorAll(FRAME_SLIDE_SELECTOR),
      slideCount: slides.length,
      dots: [],
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    };

    buildProgressDots(shared);

    if (isMobileViewport()) {
      initMobileScrollStory(root, shared);
    } else {
      initDesktopScrollStory(root, shared);
    }
  }

  function boot() {
    document.querySelectorAll(ROOT_SELECTOR).forEach(initScrollStory);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.matchMedia(MOBILE_QUERY).addEventListener('change', boot);
})();
