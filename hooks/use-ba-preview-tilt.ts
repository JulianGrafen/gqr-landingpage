'use client';

import { useEffect, type RefObject } from 'react';

function parseMaxTilt(el: HTMLElement): number {
  const raw = getComputedStyle(el).getPropertyValue('--ba-tilt-max').trim();
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 12;
}

function pointInside(el: HTMLElement, clientX: number, clientY: number): boolean {
  const rect = el.getBoundingClientRect();
  const pad = 12;
  return (
    clientX >= rect.left - pad &&
    clientX <= rect.right + pad &&
    clientY >= rect.top - pad &&
    clientY <= rect.bottom + pad
  );
}

/**
 * 3D-Neigung für `.ba-preview-tilt[data-ba-tilt]` (wie `scripts/output-preview-ba-tilt.js`).
 */
export function useBaPreviewTilt(rootRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !el.hasAttribute('data-ba-tilt')) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const inner = el.querySelector<HTMLElement>('.ba-preview-tilt__inner');
    if (!inner) return;

    let raf = 0;
    let active = false;

    const reset = () => {
      active = false;
      cancelAnimationFrame(raf);
      inner.style.transform = '';
      window.removeEventListener('mousemove', onMove);
    };

    const applyTilt = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const px = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const py = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
      const max = parseMaxTilt(el);
      const rotateY = (px - 0.5) * 2 * max;
      const rotateX = (0.5 - py) * 2 * max;
      inner.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    };

    const onMove = (e: MouseEvent) => {
      if (!active) return;
      if (!pointInside(el, e.clientX, e.clientY)) {
        reset();
        return;
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        applyTilt(e.clientX, e.clientY);
      });
    };

    const onMouseEnter = (e: MouseEvent) => {
      active = true;
      window.addEventListener('mousemove', onMove, { passive: true });
      applyTilt(e.clientX, e.clientY);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches.length) return;
      active = true;
      const t = e.touches[0]!;
      applyTilt(t.clientX, t.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!active || !e.touches.length) return;
      const t = e.touches[0]!;
      if (!pointInside(el, t.clientX, t.clientY)) {
        reset();
        return;
      }
      applyTilt(t.clientX, t.clientY);
    };

    el.addEventListener('mouseenter', onMouseEnter, { passive: true });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', reset, { passive: true });

    return () => {
      reset();
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', reset);
    };
  }, [rootRef]);
}