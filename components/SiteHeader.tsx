'use client';

import Link from 'next/link';
import { useState } from 'react';

const nav = [
  { href: '/#produkt', label: 'Produkt' },
  { href: '/#funktionen', label: 'Funktionen' },
  { href: '/#preise', label: 'Preise' },
  { href: '/blog/', label: 'Wissen' },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] flex items-center gap-6 border-b border-white/[0.07] bg-[#0a1628]/90 px-4 py-3.5 backdrop-blur-md sm:px-6 lg:px-10">
      <Link
        href="/"
        className="shrink-0 text-lg font-black text-[#f0f6ff] no-underline"
      >
        Gefahrstoff-QR
      </Link>

      <nav
        className="ml-auto hidden items-center gap-1 md:flex"
        aria-label="Hauptnavigation"
      >
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-[#8fa4c0] no-underline transition hover:bg-white/[0.05] hover:text-[#f0f6ff]"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="https://app.gefahrstoff-qr.de/register"
          className="gqr-cta-primary gqr-cta-primary--compact ml-3 no-underline"
        >
          Kostenlos starten
        </Link>
      </nav>

      <button
        type="button"
        className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.12] text-[#f0f6ff] md:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? '✕' : '☰'}
      </button>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-[57px] z-[99] border-b border-white/[0.07] bg-[#0f1e35] p-4 shadow-lg md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobilnavigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-base font-semibold text-[#f0f6ff] no-underline hover:bg-white/[0.06]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="https://app.gefahrstoff-qr.de/register"
              className="gqr-cta-primary gqr-cta-primary--md mt-2 w-full justify-center no-underline"
              onClick={() => setOpen(false)}
            >
              Kostenlos starten
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
