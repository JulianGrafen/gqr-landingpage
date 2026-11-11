'use client';

import { useEffect, useState } from 'react';
import { STICKY_CTA_OBSTRUCT_SELECTOR } from '@/lib/marketing/sticky-header-cta';

const DESKTOP_MIN_WIDTH_PX = 768;
const SCROLL_FALLBACK_PX = 80;

/**
 * Desktop: Glas-Banner unter der Navbar, wenn weder Hero noch Abschluss-CTA sichtbar sind (1:1 zu sticky-cta-bars.js).
 */
export function useHeaderStickyCta(): boolean {
  const [barVisible, setBarVisible] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const targets = Array.from(document.querySelectorAll(STICKY_CTA_OBSTRUCT_SELECTOR));
    const visible = new Set<Element>();
    const desktopMq = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH_PX}px)`);

    const update = () => {
      let obstructed: boolean;
      if (targets.length > 0) {
        obstructed = visible.size > 0;
      } else {
        obstructed = window.scrollY < SCROLL_FALLBACK_PX;
      }
      setBarVisible(!obstructed && desktopMq.matches);
    };

    let observer: IntersectionObserver | undefined;
    let removeScroll: (() => void) | undefined;

    if (targets.length > 0) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) visible.add(entry.target);
            else visible.delete(entry.target);
          });
          update();
        },
        { threshold: 0.01 },
      );
      targets.forEach((el) => observer!.observe(el));
    } else {
      const onScroll = () => update();
      window.addEventListener('scroll', onScroll, { passive: true });
      removeScroll = () => window.removeEventListener('scroll', onScroll);
    }

    const onMq = () => update();
    desktopMq.addEventListener('change', onMq);
    update();

    return () => {
      observer?.disconnect();
      removeScroll?.();
      desktopMq.removeEventListener('change', onMq);
    };
  }, []);

  return barVisible;
}
