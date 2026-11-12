export interface HomeVideoDemo {
  youtubeId: string;
  iframeTitle: string;
  kicker: string;
  title: string;
  description: string;
}

export const VIDEO_DEMOS = {
  sectionId: 'videos',
  headlineId: 'youtubeHeadline',
  eyebrow: 'Video-Demos',
  headline: 'Gefahrstoff-QR in Aktion',
  intro:
    'Sehen Sie den Workflow live: Gefahrstoffverzeichnis per KI-Sicherheitsdatenblatt-Import und Betriebsanweisung als KI-gestützter Entwurf, ohne Abtipp-Marathon.',
  videos: [
    {
      youtubeId: 'XMn6NKrqlMY',
      iframeTitle: 'Gefahrstoffmanagement Software 4.0: Verzeichnis in 2 Minuten | Gefahrstoff-QR',
      kicker: 'Verzeichnis',
      title: 'Gefahrstoffverzeichnis digital führen',
      description:
        'Vom Sicherheitsdatenblatt zum strukturierten Gefahrstoffverzeichnis: KI-Extraktion und Kataster-Workflow in der Praxis.',
    },
    {
      youtubeId: 'psEuup9DlXQ',
      iframeTitle: 'Betriebsanweisung für Gefahrstoffe: KI-gestützter Entwurf (TRGS 555)',
      kicker: 'Betriebsanweisung',
      title: 'Betriebsanweisung digital anlegen',
      description:
        'Betriebsanweisung aus den Daten des Sicherheitsdatenblatts: weniger Word-Pflege, schneller am Einsatzort verfügbar.',
    },
    {
      youtubeId: 'AVU3FRRn5mQ',
      iframeTitle: 'TRGS-510-Lagerprüfung und QR-Scan in der Praxis | Gefahrstoff-QR',
      kicker: 'Lager & Notfall',
      title: 'TRGS-510-Lagerprüfung & QR-Scan in der Praxis',
      description:
        'Lagerklassen und Zusammenlagerung vor Ort prüfen: QR am Regal scannen, Stoffdaten und Notfallinfos direkt am Gefahrstoffschrank.',
    },
  ] satisfies HomeVideoDemo[],
} as const;

export function youtubeWatchUrl(youtubeId: string): string {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}

export function youtubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`;
}
