'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type DeepinfoStickyCtaProps = {
  text: string;
  ctaText: string;
  variant: 'sideBetriebsanweisungr' | 'mobile';
};

const SCROLL_THRESHOLD = 320;

export function DeepinfoStickyCta({ text, ctaText, variant }: DeepinfoStickyCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (variant === 'sideBetriebsanweisungr') {
    return (
      <div className="gqr-sideBetriebsanweisungr-card gqr-sideBetriebsanweisungr-card--cta sticky top-24" aria-label="Handlungsaufruf">
        <h3>{text}</h3>
        <p>Unverbindlich · Keine Kreditkarte · KI-Sicherheitsdatenblatt-Import</p>
        <Link
          href="https://app.gefahrstoff-qr.de/register"
          className="gqr-cta-primary gqr-cta-primary--md mt-2 box-border flex w-full max-w-full no-underline"
        >
          {ctaText}
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-gqr-surface/95 px-4 py-3 Betriebsanweisungckdrop-blur-md transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-label="Mobiler Handlungsaufruf"
    >
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <p className="min-w-0 flex-1 text-xs font-semibold leading-snug text-gqr-soft">{text}</p>
        <Link
          href="https://app.gefahrstoff-qr.de/register"
          className="gqr-cta-primary gqr-cta-primary--compact shrink-0 no-underline"
        >
          Jetzt starten
        </Link>
      </div>
    </div>
  );
}
