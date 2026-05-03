import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#0a1628] py-12">
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:flex-wrap md:items-start md:justify-between">
          <div>
            <p className="text-lg font-black text-[#f0f6ff]">Gefahrstoff-QR</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#8fa4c0]">
              Rechtssicheres Gefahrstoffverzeichnis nach §&nbsp;6 GefStoffV — mit
              KI aus dem Sicherheitsdatenblatt.
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#8fa4c0]"
            aria-label="Footer-Navigation"
          >
            <Link href="/blog/" className="no-underline hover:text-[#f0f6ff]">
              Blog
            </Link>
            <Link href="/impressum" className="no-underline hover:text-[#f0f6ff]">
              Impressum
            </Link>
            <Link href="/datenschutz" className="no-underline hover:text-[#f0f6ff]">
              Datenschutz
            </Link>
            <Link href="/agb" className="no-underline hover:text-[#f0f6ff]">
              AGB
            </Link>
          </nav>
        </div>
        <p className="mt-10 text-center text-xs text-[#8fa4c0] md:text-left">
          © {new Date().getFullYear()} Gefahrstoff-QR · Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
