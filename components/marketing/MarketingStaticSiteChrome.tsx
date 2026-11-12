import { HomeNavigation } from '@/components/home/HomeNavigation';
import { GQR_BRAND_LOGO_SRC } from '@/components/GqrBrandLogo';
import { HOME_HERO } from '@/config/home-sections/hero';

/** Header + Mobilmenü der statischen Marketing-LP (identisch zu index.html, Pfade ab Site-Root). */
export function MarketingStaticSiteChrome() {
  return (
    <>
      <header className="site-header" id="siteHeader">
        <a className="logo" href="/" aria-label="Gefahrstoff-QR Startseite">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="gqr-brand-logo"
            src={GQR_BRAND_LOGO_SRC}
            alt="Gefahrstoff-QR"
            width={431}
            height={108}
          />
        </a>

        <nav className="nav-desktop" aria-label="Hauptnavigation">
          <HomeNavigation variant="desktop" homePathPrefix="/" />
        </nav>

        <button
          id="navOpenBtn"
          className="nav-toggle flex flex-wrap items-center justify-center"
          type="button"
          aria-expanded="false"
          aria-controls="mobileMenu"
          aria-label="Menü öffnen"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
          </svg>
        </button>
      </header>

      <div className="header-sticky-cta-bar" data-header-sticky-cta hidden>
        <a className="header-sticky-cta-bar__action" href="https://app.gefahrstoff-qr.de/register">
          Kostenlos testen <span aria-hidden="true">→</span>
        </a>
        <p className="header-sticky-cta-bar__microcopy">{HOME_HERO.microcopy}</p>
      </div>

      <div
        className="nav-mobile"
        id="mobileMenu"
        role="dialog"
        aria-modal="true"
        aria-hidden="true"
        aria-label="Mobilmenü"
      >
        <div className="nav-mobile-inner">
          <button id="navCloseBtn" className="nav-close" type="button" aria-label="Schließen">
            &#x2715; Schließen
          </button>
          <nav className="mobile-links">
            <HomeNavigation variant="mobile" homePathPrefix="/" />
          </nav>
        </div>
      </div>
    </>
  );
}

/** Inline-Boot (Mobilmenü) — gleiche Logik wie index.html. */
export const MARKETING_STATIC_NAV_BOOT_SCRIPT = `(function () {
 var openBtn = document.getElementById('navOpenBtn');
 var closeBtn = document.getElementById('navCloseBtn');
 var menu = document.getElementById('mobileMenu');
 if (!openBtn || !closeBtn || !menu) return;

 function openMenu() {
 document.body.classList.add('nav-open');
 menu.setAttribute('aria-hidden', 'false');
 openBtn.setAttribute('aria-expanded', 'true');
 closeBtn.focus();
 }

 function closeMenu() {
 document.body.classList.remove('nav-open');
 menu.setAttribute('aria-hidden', 'true');
 openBtn.setAttribute('aria-expanded', 'false');
 openBtn.focus();
 }

 openBtn.addEventListener('click', openMenu);
 closeBtn.addEventListener('click', closeMenu);
 document.addEventListener('keydown', function (e) {
 if (e.key === 'Escape') closeMenu();
 });
 menu.querySelectorAll('.nav-link, .btn').forEach(function (el) {
 el.addEventListener('click', closeMenu);
 });
})();`;
