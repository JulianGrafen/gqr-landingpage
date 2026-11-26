import Link from 'next/link';
import type { BlogPost } from '@/lib/blog/types';
import type { DeepinfoSummary } from '@/lib/wissen/deepinfo-loader';
import { WissenCard } from '@/components/wissen/WissenCard';
import { WissenHubActionPanel } from '@/components/wissen/WissenHubActionPanel';
import { WISSEN_HUB_GEMINI_CRO } from '@/config/seo/gemini-cro-2026-11-26';

type WissenHubPageProps = {
 deepinfoPages: DeepinfoSummary[];
 blogPosts: BlogPost[];
};

function formatGermanDate(dateStr: string): string {
 const [y, m, d] = dateStr.split('-').map(Number);
 return new Date(y, m - 1, d).toLocaleDateString('de-DE', {
 day: 'numeric',
 month: 'long',
 year: 'numeric',
 });
}

export function WissenHubPage({ deepinfoPages, blogPosts }: WissenHubPageProps) {
 return (
 <main>
 <section className="gqr-blog-hero" aria-labelledby="wissen-hero-title">
 <div className="gqr-container">
 <p className="gqr-kicker">Wissen · Blog · Deepinfo</p>
 <h1 id="wissen-hero-title" className="gqr-post-headline gqr-hub-title">
 {WISSEN_HUB_GEMINI_CRO.h1}
 </h1>
 <WissenHubActionPanel />
 <p className="gqr-post-section-sub mt-8 max-w-3xl">
 Themen rund um §&nbsp;6 Kataster, TRGS&nbsp;555, TRGS&nbsp;510 und SDB-Pflege bündeln wir in
 Leitfäden und Blogartikeln. Wer von der Übersicht zur Umsetzung wechseln will, findet auf der{' '}
 <Link href="/" className="text-teal-300 underline-offset-2 hover:underline">
 Startseite
 </Link>{' '}
 Anknüpfungspunkte für{' '}
 <Link href="/" className="text-teal-300 underline-offset-2 hover:underline">
 Gefahrstoffmanagement Software
 </Link>
 ,{' '}
 <Link href="/" className="text-teal-300 underline-offset-2 hover:underline">
 Gefahrstoffverzeichnis Software
 </Link>{' '}
 und{' '}
 <Link href="/" className="text-teal-300 underline-offset-2 hover:underline">
 Sicherheitsdatenblätter digital verwalten
 </Link>
 .
 </p>
 <div className="mt-6">
 <a href="#wissen-deepinfo-heading" className="gqr-btn-secondary">
 Zu den Leitfäden
 </a>
 </div>
 </div>
 </section>

 <section className="gqr-wissen-section" aria-labelledby="wissen-deepinfo-heading">
 <div className="gqr-container">
 <header className="max-w-2xl">
 <p className="gqr-kicker">Deepinfo</p>
 <h2 id="wissen-deepinfo-heading" className="gqr-post-section-title">
 Fachleitfäden & Landingpages
 </h2>
 <p className="gqr-post-section-sub">
 Vertiefende Guides zu Gefahrstoffkataster Software, Verzeichnis-Mustern und
 Online-Erstellung — mit interaktiven Checks und GQR-Upgrade-Pfad.
 </p>
 </header>

 <div className="gqr-post-grid">
 {deepinfoPages.map((page, index) => (
 <WissenCard
 key={page.slug}
 href={page.href}
 title={page.title}
 excerpt={page.excerpt}
 category={page.category}
 featured={index === 0}
 />
 ))}
 </div>
 </div>
 </section>

 <section
 id="wissen-blog"
 className="gqr-wissen-section gqr-wissen-section--muted"
 aria-labelledby="wissen-blog-heading"
 >
 <div className="gqr-container">
 <header className="max-w-2xl">
 <p className="gqr-kicker">Blog</p>
 <h2 id="wissen-blog-heading" className="gqr-post-section-title">
 Alle Blog-Beiträge
 </h2>
 <p className="gqr-post-section-sub">
 Aktuelle Artikel zu GefStoffV, BG-Prüfungen, Excel-Alternativen und digitalem
 Gefahrstoffverzeichnis.
 </p>
 </header>

 <div className="gqr-post-grid">
 {blogPosts.map((post) => (
 <WissenCard
 key={post.url}
 href={post.url}
 title={post.title}
 excerpt={post.excerpt}
 category={post.category}
 meta={`${formatGermanDate(post.date)} · ${post.author}`}
 />
 ))}
 </div>
 </div>
 </section>

 <section className="gqr-wissen-section" aria-label="Handlungsaufruf">
 <div className="gqr-container">
 <div className="gqr-sidebar-card gqr-sidebar-card--cta mx-auto max-w-3xl px-6 py-10 text-center sm:px-10 sm:py-12">
 <h2 className="gqr-post-section-title">Bereit für strukturiertes Gefahrstoffmanagement?</h2>
 <p className="gqr-post-section-sub">
 Starten Sie kostenlos — erste Stoffe ohne Kreditkarte anlegen.
 </p>
 <Link
 href="https://app.gefahrstoff-qr.de/register"
 className="gqr-cta-primary gqr-cta-primary--lg mt-6 no-underline"
 >
 Jetzt kostenlos starten →
 </Link>
 </div>
 </div>
 </section>
 </main>
 );
}
