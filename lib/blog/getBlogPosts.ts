import fs from 'fs';
import path from 'path';
import type { BlogPost } from './types';

const POSTS_PATH = path.join(process.cwd(), 'blog/posts.json');

/** Branchen-Artikel (statische HTML) — ergänzen posts.json für vollständige Wissen-Übersicht. */
const BRANCHEN_BLOG_POSTS: BlogPost[] = [
  {
    title: 'Gefahrstoffmanagement in der Schreinerei',
    url: '/blog/schreinerei-gefahrstoff-blog.html',
    date: '2026-04-04',
    author: 'Gefahrstoff-QR Redaktion',
    category: 'Schreinerei',
    excerpt: 'Holzstaub, Leime und Lacke — was Schreinereien im Gefahrstoffverzeichnis dokumentieren müssen.',
  },
  {
    title: 'Gefahrstoffmanagement im Laborbetrieb',
    url: '/blog/laborbetrieb-gefahrstoff-blog.html',
    date: '2026-04-04',
    author: 'Gefahrstoff-QR Redaktion',
    category: 'Labor',
    excerpt: 'Reagenzien, Lösungsmittel und Sicherheitsstufen — Verzeichnis und Lagerung im Labor.',
  },
  {
    title: 'Gefahrstoffmanagement im Malerbetrieb',
    url: '/blog/malerbetrieb-gefahrstoff-blog.html',
    date: '2026-04-04',
    author: 'Gefahrstoff-QR Redaktion',
    category: 'Malerbetrieb',
    excerpt: 'Lacke, Lösemittel und Spritzkabine — typische Stoffe und Dokumentationspflichten.',
  },
  {
    title: 'Gefahrstoffmanagement in der Kfz-Werkstatt',
    url: '/blog/kfz-werkstatt-gefahrstoff-blog.html',
    date: '2026-04-04',
    author: 'Gefahrstoff-QR Redaktion',
    category: 'KFZ-Werkstatt',
    excerpt: 'Öle, Reiniger und DME — Gefahrstoffverzeichnis für Werkstätten.',
  },
  {
    title: 'Gefahrstoffmanagement in der Gebäudereinigung',
    url: '/blog/reinigungsunternehmen-gefahrstoff-blog.html',
    date: '2026-04-04',
    author: 'Gefahrstoff-QR Redaktion',
    category: 'Gebäudereinigung',
    excerpt: 'Säuren, Laugen und Industriereiniger — sicher dokumentieren und lagern.',
  },
];

export function getBlogPosts(): BlogPost[] {
  const raw = fs.readFileSync(POSTS_PATH, 'utf8');
  const fromJson = JSON.parse(raw) as BlogPost[];
  const urls = new Set(fromJson.map((p) => p.url));

  const merged = [...fromJson];
  for (const post of BRANCHEN_BLOG_POSTS) {
    if (!urls.has(post.url)) merged.push(post);
  }

  return merged.sort((a, b) => b.date.localeCompare(a.date));
}
