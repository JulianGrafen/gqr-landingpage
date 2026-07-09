import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.07] bg-gqr-bg py-12">
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:flex-wrap md:items-start md:justify-between">
          <div>
            <p className="text-lg font-black text-gqr-text">Gefahrstoff-QR</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-gqr-muted">
              Rechtssicheres Gefahrstoffverzeichnis nach §&nbsp;6 GefStoffV — mit
              KI aus dem Sicherheitsdatenblatt.
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gqr-muted"
            aria-label="Footer-Navigation"
          >
            <Link href="/gefahrstoffverzeichnis-excel-vorlage/" className="no-underline hover:text-gqr-text">
              Excel-Vorlage
            </Link>
            <Link href="/trgs-510-zusammenlagerungs-check/" className="no-underline hover:text-gqr-text">
              TRGS-510-Checker
            </Link>
            <Link href="/blog/" className="no-underline hover:text-gqr-text">
              Blog
            </Link>
            <Link href="/impressum" className="no-underline hover:text-gqr-text">
              Impressum
            </Link>
            <Link href="/datenschutz" className="no-underline hover:text-gqr-text">
              Datenschutz
            </Link>
            <Link href="/agb" className="no-underline hover:text-gqr-text">
              AGB
            </Link>
          </nav>
        </div>
        <p className="mt-10 text-center text-xs text-gqr-muted md:text-left">
          © {new Date().getFullYear()} Gefahrstoff-QR · Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
