import { HOME_NAVIGATION } from '@/config/home-sections/hero';

type HomeNavigationProps = {
  /** Desktop-Leiste nutzt die kompakte CTA-Variante, das Mobilmenü die Standard-Variante. */
  variant: 'desktop' | 'mobile';
};

/** Kopfnavigation der Startseite (Desktop und Mobil aus derselben Konfiguration). */
export function HomeNavigation({ variant }: HomeNavigationProps) {
  const ctaClassName = variant === 'desktop' ? 'btn btn-primary nav-cta' : 'btn btn-primary';

  return (
    <>
      {HOME_NAVIGATION.anchorLinks.map((link) => (
        <a key={link.href} className="nav-link" href={link.href}>
          {link.label}
        </a>
      ))}
      <a className="nav-link" href={HOME_NAVIGATION.login.href}>
        {HOME_NAVIGATION.login.label}
      </a>
      <a
        className={ctaClassName}
        href={HOME_NAVIGATION.primaryCta.href}
        {...(variant === 'desktop' ? { 'data-nav-primary-cta': true } : {})}
      >
        {HOME_NAVIGATION.primaryCta.label}
      </a>
    </>
  );
}
