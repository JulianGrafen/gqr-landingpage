import { HOME_SECTION_STYLES as styles } from '@/components/home/home-section-styles';
import { PRODUCT_DEMO_VIDEO } from '@/config/home-sections/product-demo-video';

/** Eigenständige Sektion für das gehostete Haupt-Produktvideo (MP4). */
export function ProductDemoVideoSection() {
  return (
    <section
      id={PRODUCT_DEMO_VIDEO.sectionId}
      className={styles.sectionRaised}
      aria-labelledby={PRODUCT_DEMO_VIDEO.headlineId}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{PRODUCT_DEMO_VIDEO.eyebrow}</p>
          <h2 id={PRODUCT_DEMO_VIDEO.headlineId} className={styles.headline}>
            {PRODUCT_DEMO_VIDEO.headline}
          </h2>
          <p className={styles.lead}>{PRODUCT_DEMO_VIDEO.lead}</p>
        </header>

        <div className="product-demo-video mx-auto max-w-[960px]">
          <div className="product-demo-video__frame video-embed video-embed--cinema">
            <video
              data-product-demo-video
              muted
              loop
              controls
              preload="metadata"
              playsInline
              title={PRODUCT_DEMO_VIDEO.videoTitle}
            >
              <source src={PRODUCT_DEMO_VIDEO.mp4Src} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
