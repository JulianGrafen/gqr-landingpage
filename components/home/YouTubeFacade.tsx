import { youtubeNoCookieEmbedUrl, youtubeThumbnailUrl } from '@/lib/video/youtube';

type YouTubeFacadeProps = {
  youtubeId: string;
  title: string;
  playLabelPrefix: string;
};

/**
 * Leichter Click-to-Play-Player: Vorschaubild + Play-Button, das iframe (youtube-nocookie)
 * wird erst nach dem Klick von `/scripts/home-demo-tabs.js` eingesetzt. Kein Exit-Link zu YouTube.
 */
export function YouTubeFacade({ youtubeId, title, playLabelPrefix }: YouTubeFacadeProps) {
  return (
    <div className="video-embed video-embed--cinema video-facade">
      <button
        type="button"
        className="video-facade__button"
        data-youtube-facade
        data-youtube-src={youtubeNoCookieEmbedUrl(youtubeId)}
        data-youtube-title={title}
        aria-label={`${playLabelPrefix} ${title}`}
      >
        <img
          className="video-facade__thumb"
          src={youtubeThumbnailUrl(youtubeId)}
          alt=""
          width={480}
          height={360}
          loading="lazy"
          decoding="async"
        />
        <span className="video-facade__play" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" focusable="false">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </span>
      </button>
    </div>
  );
}
