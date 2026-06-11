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
      className={`group flex flex-col gap-3 rounded-[var(--radius-lg,1.25rem)] border p-6 transition duration-250 ${
        featured
          ? 'border-[#ff6b35]/35 bg-gradient-to-br from-[#ff6b35]/10 to-[#162340]/90 shadow-[0_12px_40px_rgba(0,0,0,0.35)]'
          : 'border-white/[0.08] bg-[#162340]/75 hover:-translate-y-1 hover:border-[#ff6b35]/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]'
      }`}
    >
      <span className="text-xs font-bold uppercase tracking-wider text-[#ff6b35]">
        {category}
      </span>
      <h2 className="text-xl font-extrabold leading-snug text-[#f0f6ff]">
        <Link href={href} className="no-underline hover:text-[#ff9a6b]">
          {title}
        </Link>
      </h2>
      <p className="flex-grow text-sm leading-relaxed text-[#8fa4c0]">{excerpt}</p>
      {meta ? (
        <p className="text-xs text-[#8fa4c0]">{meta}</p>
      ) : null}
      <Link
        href={href}
        className="text-sm font-bold text-[#ff6b35] no-underline group-hover:underline"
      >
        Weiterlesen →
      </Link>
    </article>
  );
}
