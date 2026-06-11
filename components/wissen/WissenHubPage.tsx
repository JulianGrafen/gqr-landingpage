import Link from 'next/link';
import type { BlogPost } from '@/lib/blog/types';
import type { DeepinfoSummary } from '@/lib/wissen/deepinfo-loader';
import { WissenCard } from '@/components/wissen/WissenCard';

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
      <section
        className="border-b border-white/[0.07] bg-gradient-to-b from-gqr-surface/95 to-gqr-bg px-4 py-14 sm:px-6 sm:py-20 lg:px-10"
        aria-labelledby="wissen-hero-title"
      >
        <div className="mx-auto max-w-[1160px]">
          <p className="gqr-kicker">Wissen · Blog · Deepinfo</p>
          <h1
            id="wissen-hero-title"
            className="mt-3 text-3xl font-black leading-tight tracking-tight text-gqr-text sm:text-4xl lg:text-[2.75rem]"
          >
            Gefahrstoff-Wissen für Betrieb, SiFa und Compliance
          </h1>
          <p className="gqr-section-sub mt-5 max-w-3xl">
            Praxisnahe Artikel, SEO-Leitfäden und Deepinfo-Landingpages zu §&nbsp;6
            GefStoffV, SDB-Pflege, TRGS&nbsp;510 und digitalem Gefahrstoffmanagement.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="https://app.gefahrstoff-qr.de/register"
              className="gqr-cta-primary gqr-cta-primary--lg no-underline"
            >
              GQR kostenlos testen
            </Link>
            <a href="#wissen-blog" className="gqr-btn-secondary">
              Zum Blog
            </a>
          </div>
        </div>
      </section>

      <section
        className="border-b border-white/[0.07] px-4 py-14 sm:px-6 sm:py-16 lg:px-10"
        aria-labelledby="wissen-deepinfo-heading"
      >
        <div className="mx-auto max-w-[1160px]">
          <header className="max-w-3xl">
            <p className="gqr-kicker">Deepinfo</p>
            <h2 id="wissen-deepinfo-heading" className="gqr-section-title mt-2">
              Fachleitfäden & Landingpages
            </h2>
            <p className="gqr-section-sub mt-3">
              Vertiefende Guides zu Keywords wie Gefahrstoffkataster Software,
              Verzeichnis-Muster und Online-Erstellung — mit interaktiven Checks und
              GQR-Upgrade-Pfad.
            </p>
          </header>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        className="border-b border-white/[0.07] bg-gqr-surface/40 px-4 py-14 sm:px-6 sm:py-16 lg:px-10"
        aria-labelledby="wissen-blog-heading"
      >
        <div className="mx-auto max-w-[1160px]">
          <header className="max-w-3xl">
            <p className="gqr-kicker">Blog</p>
            <h2 id="wissen-blog-heading" className="gqr-section-title mt-2">
              Alle Blog-Beiträge
            </h2>
            <p className="gqr-section-sub mt-3">
              Aktuelle Artikel zu GefStoffV, BG-Prüfungen, Excel-Alternativen und
              digitalem Gefahrstoffverzeichnis.
            </p>
          </header>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-10" aria-label="Handlungsaufruf">
        <div className="gqr-pitch-box mx-auto max-w-[1160px] px-6 py-10 text-center sm:px-10 sm:py-12">
          <h2 className="gqr-section-title">Bereit für rechtssicheres Gefahrstoffmanagement?</h2>
          <p className="gqr-section-sub mt-3">
            Starten Sie kostenlos — erste Stoffe ohne Kreditkarte anlegen.
          </p>
          <Link
            href="https://app.gefahrstoff-qr.de/register"
            className="gqr-cta-primary gqr-cta-primary--lg mt-8 no-underline"
          >
            Jetzt kostenlos starten →
          </Link>
        </div>
      </section>
    </main>
  );
}
