import { ARTICLE_CTA_DATA_ATTRIBUTES } from '@/config/blog-cro/tracking';
import type { ArticleCtaLink } from '@/config/blog-cro/types';

type ArticleCtaButtonProps = {
  cta: ArticleCtaLink;
  variant: 'primary' | 'ghost';
};

const VARIANT_CLASS: Record<ArticleCtaButtonProps['variant'], string> = {
  primary: 'btn btn-primary article-cta__button',
  ghost: 'btn btn-ghost article-cta__button',
};

/** Button-Link im bestehenden Glas-Button-Stil mit Tracking-Attributen. */
export function ArticleCtaButton({ cta, variant }: ArticleCtaButtonProps) {
  const trackingAttributes = {
    [ARTICLE_CTA_DATA_ATTRIBUTES.location]: cta.location,
    [ARTICLE_CTA_DATA_ATTRIBUTES.target]: cta.target,
  };

  return (
    <a className={VARIANT_CLASS[variant]} href={cta.href} {...trackingAttributes}>
      {cta.label}
      {variant === 'primary' ? <span aria-hidden="true"> →</span> : null}
    </a>
  );
}
