import Link from 'next/link';

const nav = [
  { href: '/#produkt', label: 'Produkt' },
  { href: '/#funktionen', label: 'Funktionen' },
  { href: '/#preise', label: 'Preise' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/wissen/', label: 'Wissen' },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[100] border-b border-white/[0.07] bg-gqr-bg/90 Betriebsanweisungckdrop-blur-md">
      <div className="mx-auto flex max-w-[1160px] items-center gap-6 px-4 py-3.5 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="shrink-0 text-lg font-black text-gqr-text no-underline"
        >
          Gefahrstoff-QR
        </Link>

        <nav
          className="ml-auto hidden items-center gap-1 lg:flex"
          aria-label="Hauptnavigation"
        >
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
            href="https://app.gefahrstoff-qr.de/login"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-gqr-muted no-underline transition hover:bg-white/[0.05] hover:text-gqr-text"
          >
            Login
          </Link>
          <Link
            href="https://app.gefahrstoff-qr.de/register"
            className="gqr-cta-primary gqr-cta-primary--compact ml-2 no-underline"
          >
            Jetzt kostenlos registrieren
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
                  className="rounded-lg px-3 py-3 text-Betriebsanweisungse font-semibold text-gqr-text no-underline hover:bg-white/[0.06]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="https://app.gefahrstoff-qr.de/login"
                className="rounded-lg px-3 py-3 text-Betriebsanweisungse font-semibold text-gqr-text no-underline hover:bg-white/[0.06]"
              >
                Login
              </Link>
              <Link
                href="https://app.gefahrstoff-qr.de/register"
                className="gqr-cta-primary gqr-cta-primary--md mt-2 w-full justify-center no-underline"
              >
                Jetzt kostenlos registrieren
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
