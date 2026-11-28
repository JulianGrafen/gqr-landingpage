import type { ScreenshotGalleryItem } from '@/config/blog-cro/types';

type ProductScreenshotGalleryProps = {
  items: readonly ScreenshotGalleryItem[];
};

/**
 * Echte App-Screenshots (WebP mit PNG/JPG-Fallback). Feste `width`/`height` reservieren den
 * Platz vor dem Laden, `loading="lazy"` hält die Seite unterhalb des Folds leicht.
 */
export function ProductScreenshotGallery({ items }: ProductScreenshotGalleryProps) {
  return (
    <div className="product-screenshots">
      {items.map(({ screenshot, caption }) => (
        <figure
          key={screenshot.src}
          className={`product-screenshots__item product-screenshots__item--${screenshot.orientation}`}
        >
          <picture>
            <source srcSet={screenshot.webpSrc} type="image/webp" />
            <img
              src={screenshot.src}
              alt={screenshot.alt}
              width={screenshot.width}
              height={screenshot.height}
              loading="lazy"
              decoding="async"
            />
          </picture>
          <figcaption>{caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
