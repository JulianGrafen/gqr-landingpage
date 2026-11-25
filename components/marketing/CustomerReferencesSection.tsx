import { HOME_SECTION_STYLES as styles } from '@/components/home/home-section-styles';
import { CUSTOMER_REFERENCES, type CustomerReference } from '@/config/references';

export type CustomerReferencesLayout = 'standalone' | 'pricing-sifa';

const DEFAULT_PHOTO_SIZE = 56;

function ReferenceCard({ reference }: { reference: CustomerReference }) {
  const roleLine = [reference.rolle, reference.buro].filter(Boolean).join(' · ');

  const cardInner = (
    <>
      <div className="flex items-center gap-3">
        {reference.fotoSrc ? (
          <img
            src={reference.fotoSrc}
            alt=""
            width={DEFAULT_PHOTO_SIZE}
            height={DEFAULT_PHOTO_SIZE}
            loading="lazy"
            decoding="async"
            className="h-14 w-14 shrink-0 rounded-full border border-white/15 object-cover"
          />
        ) : (
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-teal-300/30 bg-teal-300/10 text-lg font-black text-teal-300"
            aria-hidden="true"
          >
            {reference.name.trim().charAt(0)}
          </span>
        )}
        <div>
          <p className="text-base font-bold text-[#f0f6ff]">{reference.name}</p>
          <p className="text-xs text-[#8fa4c0]">{roleLine}</p>
        </div>
      </div>
      {reference.zitat ? (
        <blockquote className="m-0 mt-3 text-sm leading-relaxed text-[#c5d0e2]">„{reference.zitat}“</blockquote>
      ) : null}
    </>
  );

  if (reference.url) {
    return (
      <li className={`${styles.card} flex h-full flex-col`}>
        <a
          href={reference.url}
          className="flex h-full flex-col no-underline text-inherit hover:text-[#f0f6ff]"
          target="_blank"
          rel="noopener noreferrer"
        >
          {cardInner}
        </a>
      </li>
    );
  }

  return <li className={`${styles.card} flex h-full flex-col`}>{cardInner}</li>;
}

type Props = {
  layout?: CustomerReferencesLayout;
};

/** Rendert nichts bei leerer Config (kein Wrapper, keine Überschrift). */
export function CustomerReferencesSection({ layout = 'standalone' }: Props) {
  if (CUSTOMER_REFERENCES.length === 0) {
    return null;
  }

  const grid = (
    <ul
      className={[
        'grid list-none gap-6 p-0',
        layout === 'pricing-sifa' ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3',
      ].join(' ')}
    >
      {CUSTOMER_REFERENCES.map((reference) => (
        <ReferenceCard key={`${reference.name}-${reference.buro}`} reference={reference} />
      ))}
    </ul>
  );

  if (layout === 'pricing-sifa') {
    return <div className="mt-10 border-t border-white/[0.07] pt-10">{grid}</div>;
  }

  return (
    <section className={styles.section} aria-label="Referenzen">
      <div className={styles.container}>{grid}</div>
    </section>
  );
}