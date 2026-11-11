import { PSEO_PROSE } from '@/components/programmatic-seo/slug-page-layout';

type SlugHeroSubheadlineProps = {
  id: string;
  paragraphs: readonly string[];
  className?: string;
};

/** Hero-Lead als Absätze (einheitlich auf allen pSEO-Slug-Heros). */
export function SlugHeroSubheadline({ id, paragraphs, className = '' }: SlugHeroSubheadlineProps) {
  return (
    <div
      id={id}
      className={`${PSEO_PROSE} mt-4 space-y-3 text-sm leading-relaxed text-[#8fa4c0] sm:text-base ${className}`.trim()}
    >
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="m-0">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
