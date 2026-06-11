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
        className={`sticky top-24 rounded-2xl border border-[#2dd4bf]/25 bg-gradient-to-br from-[#2dd4bf]/12 to-white p-5 shadow-lg shadow-black/10 transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-60'
        }`}
        aria-label="Handlungsaufruf"
      >
        <p className="text-xs font-bold uppercase tracking-wider text-[#0d9488]">
          Digitalisieren
        </p>
        <p className="mt-2 text-base font-black leading-snug text-slate-900">
          {text}
        </p>
        <Link
          href="https://app.gefahrstoff-qr.de/register"
          className="gqr-cta-primary gqr-cta-primary--md mt-5 w-full no-underline"
        >
          GQR kostenlos testen
        </Link>
        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          Unverbindlich · Keine Kreditkarte · KI-SDB-Import
        </p>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0f1e35]/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-label="Mobiler Handlungsaufruf"
    >
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <p className="min-w-0 flex-1 text-xs font-semibold leading-snug text-[#c8d4e6]">
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
