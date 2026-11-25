/**
 * YouTube-Hilfen für datensparsame Inline-Player (Facade-Pattern).
 * Bis zum Klick wird nur das Vorschaubild geladen; das iframe kommt von youtube-nocookie.com.
 */

const YOUTUBE_NOCOOKIE_EMBED_BASE = 'https://www.youtube-nocookie.com/embed';
const YOUTUBE_THUMBNAIL_BASE = 'https://i.ytimg.com/vi';

/** Embed-URL für den Inline-Player; `autoplay=1` startet direkt nach dem Klick auf die Facade. */
export function youtubeNoCookieEmbedUrl(youtubeId: string): string {
  return `${YOUTUBE_NOCOOKIE_EMBED_BASE}/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;
}

/** `hqdefault` existiert für jedes Video (480 × 360), anders als `maxresdefault`. */
export function youtubeThumbnailUrl(youtubeId: string): string {
  return `${YOUTUBE_THUMBNAIL_BASE}/${youtubeId}/hqdefault.jpg`;
}
