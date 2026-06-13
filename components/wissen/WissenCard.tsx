import Link from 'next/link';

type WissenCardProps = {
  href: string;
  title: string;
  excerpt: string;
  category: string;
  meta?: string;
  featured?: boolean;
};

export function WissenCard({
  href,
  title,
  excerpt,
  category,
  meta,
  featured = false,
}: WissenCardProps) {
  return (
    <article
      className={`gqr-post-card ${featured ? 'gqr-post-card--featured' : ''}`}
    >
      <span className="gqr-post-tag">{category}</span>
      <h2 className="gqr-post-card-title">
        <Link href={href}>{title}</Link>
      </h2>
      <p className="gqr-post-card-excerpt">{excerpt}</p>
      {meta ? <p className="gqr-post-card-meta">{meta}</p> : null}
      <Link href={href} className="gqr-post-card-cta">
        Weiterlesen →
      </Link>
    </article>
  );
}
