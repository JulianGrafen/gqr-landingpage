'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type DeepinfoStickyCtaProps = {
  text: string;
  variant: 'sidebar' | 'mobile';
};

const SCROLL_THRESHOLD = 320;

export function DeepinfoStickyCta({ text, variant }: DeepinfoStickyCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (variant === 'sidebar') {
    return (
      <div
        className={`gqr-pitch-box sticky top-24 p-5 transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-60'
        }`}
        aria-label="Handlungsaufruf"
      >
        <p className="gqr-kicker text-gqr-trust">Digitalisieren</p>
        <p className="mt-2 text-base font-black leading-snug text-gqr-text">{text}</p>
        <Link
          href="https://app.gefahrstoff-qr.de/register"
          className="gqr-cta-primary gqr-cta-primary--md mt-5 w-full no-underline"
        >
          GQR kostenlos testen
        </Link>
        <p className="mt-3 text-xs leading-relaxed text-gqr-muted">
          Unverbindlich · Keine Kreditkarte · KI-SDB-Import
        </p>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-gqr-surface/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-label="Mobiler Handlungsaufruf"
    >
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <p className="min-w-0 flex-1 text-xs font-semibold leading-snug text-gqr-soft">
          {text}
        </p>
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
