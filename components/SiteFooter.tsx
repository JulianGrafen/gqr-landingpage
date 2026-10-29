import Link from 'next/link';
import { FOOTER_COPYRIGHT, FOOTER_TAGLINE } from '@/config/legal/site-copy';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.07] bg-gqr-bg py-12">
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:flex-wrap md:items-start md:justify-between">
          <div>
            <p className="text-lg font-black text-gqr-text">Gefahrstoff-QR</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-gqr-muted">{FOOTER_TAGLINE}</p>
          </div>
          <nav
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gqr-muted"
            aria-label="Footer-Navigation"
          >
            <Link href="/gefahrstoffverzeichnis-excel-vorlage/" className="gqr-footer-link">
              Excel-Vorlage
            </Link>
            <Link href="/trgs-510-zusammenlagerungs-check/" className="gqr-footer-link">
              TRGS-510-Checker
            </Link>
            <Link href="/blog/" className="gqr-footer-link">
              Blog
            </Link>
            <Link href="/impressum" className="gqr-footer-link">
              Impressum
            </Link>
            <Link href="/datenschutz" className="gqr-footer-link">
              Datenschutz
            </Link>
            <Link href="/agb" className="gqr-footer-link">
              AGB
            </Link>
          </nav>
        </div>
        <p className="mt-10 text-center text-xs leading-relaxed text-gqr-muted md:text-left">{FOOTER_COPYRIGHT}</p>
      </div>
    </footer>
  );
}
