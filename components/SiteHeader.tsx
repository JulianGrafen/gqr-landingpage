'use client';

import Link from 'next/link';
import { GqrBrandLogo } from '@/components/GqrBrandLogo';
import { APP_LOGIN_URL } from '@/config/aeo-config';
import { HOME_HERO, HOME_NAVIGATION } from '@/config/home-sections/hero';
import { useHeaderStickyCta } from '@/hooks/useHeaderStickyCta';
import { SITE_HEADER_ELEMENT_ID } from '@/lib/marketing/sticky-header-cta';

const nav = [
  { href: '/#funktionen', label: 'Produkt' },
  { href: '/#funktionen', label: 'Funktionen' },
  { href: '/#preise', label: 'Preise' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/blog/', label: 'Blog' },
] as const;

const { label: headerCtaLabel, href: headerCtaHref } = HOME_NAVIGATION.primaryCta;

export function SiteHeader() {
  const stickyCtaVisible = useHeaderStickyCta();

  return (
    <>
      <header
        id={SITE_HEADER_ELEMENT_ID}
        className={`gqr-site-header sticky top-0 z-[100] border-b border-white/[0.07] bg-gqr-bg/90 backdrop-blur-md${
          stickyCtaVisible ? ' is-sticky-cta-active' : ''
        }`}
      >
        <div className="mx-auto flex max-w-[1160px] items-center gap-6 px-4 py-3.5 sm:px-6 lg:px-10">
          <GqrBrandLogo priority />

          <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-gqr-muted no-underline transition hover:bg-white/[0.05] hover:text-gqr-text"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={APP_LOGIN_URL}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-gqr-muted no-underline transition hover:bg-white/[0.05] hover:text-gqr-text"
            >
              {HOME_NAVIGATION.login.label}
            </Link>
            <Link
              href={headerCtaHref}
              data-nav-primary-cta=""
              className="gqr-cta-primary gqr-cta-primary--compact ml-2 no-underline"
            >
              {headerCtaLabel}
            </Link>
          </nav>

          <details className="relative ml-auto lg:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-white/[0.12] text-gqr-text marker:content-none">
              ☰
            </summary>
            <div className="absolute right-0 top-full z-[99] mt-2 min-w-[16rem] rounded-xl border border-white/[0.08] bg-gqr-surface p-3 shadow-gqr">
              <nav className="flex flex-col gap-1" aria-label="Mobilnavigation">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-3 text-base font-semibold text-gqr-text no-underline hover:bg-white/[0.06]"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={APP_LOGIN_URL}
                  className="rounded-lg px-3 py-3 text-base font-semibold text-gqr-text no-underline hover:bg-white/[0.06]"
                >
                  {HOME_NAVIGATION.login.label}
                </Link>
                <Link
                  href={headerCtaHref}
                  className="gqr-cta-primary gqr-cta-primary--md mt-2 w-full justify-center no-underline"
                >
                  {headerCtaLabel}
                </Link>
              </nav>
            </div>
          </details>
        </div>
      </header>

      <div
        data-header-sticky-cta=""
        hidden={!stickyCtaVisible}
        className={`header-sticky-cta-bar${stickyCtaVisible ? ' is-visible' : ''}`}
      >
        <Link href={headerCtaHref} className="header-sticky-cta-bar__action">
          {headerCtaLabel} <span aria-hidden="true">→</span>
        </Link>
        <p className="header-sticky-cta-bar__microcopy">{HOME_HERO.microcopy}</p>
      </div>
    </>
  );
}
