import type { ArticleCtaBannerCopy } from '@/config/blog-cro/types';
import { ArticleCtaButton } from './ArticleCtaButton';

type ArticleCtaBannerProps = {
  copy: ArticleCtaBannerCopy;
  /**
   * `callout`: kompakte Box im Artikelfluss (Überschrift als h3).
   * `closing`: Abschluss-Block, Überschrift als h2 (ersetzt die bisherige Abschluss-H2).
   */
  variant: 'callout' | 'closing';
};

/** CTA-Box für statische Blog-Artikel; Stil: `.post-cta-box` aus `blog/gqr-blog.css`. */
export function ArticleCtaBanner({ copy, variant }: ArticleCtaBannerProps) {
  const Heading = variant === 'closing' ? 'h2' : 'h3';

  return (
    <aside className={`post-cta-box article-cta article-cta--${variant}`} aria-label={copy.headline}>
      <Heading className="article-cta__headline">{copy.headline}</Heading>
      <p>{copy.body}</p>
      <div className="article-cta__actions">
        <ArticleCtaButton cta={copy.primaryCta} variant="primary" />
        {copy.secondaryCta ? <ArticleCtaButton cta={copy.secondaryCta} variant="ghost" /> : null}
      </div>
      <p className="article-cta__trust">{copy.trustItems.join(' · ')}</p>
    </aside>
  );
}
