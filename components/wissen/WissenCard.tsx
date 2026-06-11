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
    <article className={`group gqr-card flex flex-col gap-3 ${featured ? 'gqr-card--featured' : ''}`}>
      <span className="gqr-kicker">{category}</span>
      <h2 className="text-xl font-extrabold leading-snug text-gqr-text">
        <Link href={href} className="no-underline hover:text-gqr-accent-soft">
          {title}
        </Link>
      </h2>
      <p className="flex-grow text-sm leading-relaxed text-gqr-muted">{excerpt}</p>
      {meta ? <p className="text-xs text-gqr-muted">{meta}</p> : null}
      <Link href={href} className="text-sm font-bold text-gqr-accent no-underline group-hover:underline">
        Weiterlesen →
      </Link>
    </article>
  );
}
