import { HOME_SECTION_STYLES as styles } from '@/components/home/home-section-styles';
import {
  VIDEO_DEMOS,
  youtubeEmbedUrl,
  youtubeWatchUrl,
} from '@/config/home-sections/video-demos';

/** Eingebettete YouTube-Demos + Direktlinks (kein Klick-Facade mehr). */
export function VideoDemosSection() {
  return (
    <section
      id={VIDEO_DEMOS.sectionId}
      className={styles.sectionRaisedTight}
      aria-labelledby={VIDEO_DEMOS.headlineId}
    >
      <div className={styles.container}>
        <header className={styles.headerTight}>
          <p className={styles.eyebrow}>{VIDEO_DEMOS.eyebrow}</p>
          <h2 id={VIDEO_DEMOS.headlineId} className={styles.headline}>
            {VIDEO_DEMOS.headline}
          </h2>
          <p className={styles.lead}>{VIDEO_DEMOS.intro}</p>
        </header>

        <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEO_DEMOS.videos.map((video) => (
            <li key={video.youtubeId}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0f1e35]/50 shadow-lg">
                <div className="video-embed">
                  <iframe
                    src={youtubeEmbedUrl(video.youtubeId)}
                    title={video.iframeTitle}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 lg:p-6">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-teal-400">
                    {video.kicker}
                  </p>
                  <h3 className="mb-3 text-xl font-bold text-[#f0f6ff]">{video.title}</h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-[#8fa4c0]">
                    {video.description}
                  </p>
                  <a
                    className={`${styles.secondaryLink} text-sm font-semibold`}
                    href={youtubeWatchUrl(video.youtubeId)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Auf YouTube ansehen →
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
