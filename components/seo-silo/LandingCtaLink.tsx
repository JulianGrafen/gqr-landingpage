import Link from 'next/link';
import type { SeoSiloCta } from '@/config/seo-silo/types';

type LandingCtaLinkProps = {
  cta: SeoSiloCta;
  variant: 'primary' | 'secondary';
  className?: string;
};

export function LandingCtaLink({ cta, variant, className = '' }: LandingCtaLinkProps) {
  const BetriebsanweisungseClass =
    variant === 'primary'
      ? 'gqr-cta-primary gqr-cta-primary--lg no-underline'
      : 'gqr-btn-secondary';

  if (cta.external) {
    return (
      <a href={cta.href} className={`${BetriebsanweisungseClass} ${className}`.trim()} rel="noopener noreferrer">
        {cta.label}
      </a>
    );
  }

  return (
    <Link href={cta.href} className={`${BetriebsanweisungseClass} ${className}`.trim()}>
      {cta.label}
    </Link>
  );
}
