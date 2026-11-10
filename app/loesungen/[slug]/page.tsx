import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IndustrySlugHero } from '@/components/loesungen/IndustrySlugHero';
import { PSEO_CONTAINER, PSEO_PAGE_MAIN, PSEO_PROSE, PSEO_SECTION_HERO } from '@/components/programmatic-seo';
import { SdbTrustFeatureList } from '@/components/programmatic-seo/SdbTrustFeatureList';
import { SdbLivePreviewDropzone } from '@/components/sdb-preview';
import {
  getIndustry,
  INDUSTRY_SLUGS,
  type IndustrySlug,
} from '@/config/industry-solutions';
import { SITE_URL } from '@/config/site-seo';

type PageProps = {
  params: { slug: string };
};

/** Kfz-Werkstatt: vollständige statische Landingpage (scripts/generate-kfz-werkstatt-landing.mjs). */
const STATIC_INDUSTRY_LANDINGS: IndustrySlug[] = ['kfz-werkstatt'];

export function generateStaticParams(): { slug: IndustrySlug }[] {
  return INDUSTRY_SLUGS.filter((slug) => !STATIC_INDUSTRY_LANDINGS.includes(slug)).map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = getIndustry(params.slug);
  if (!data) return { title: 'Seite nicht gefunden' };

  const canonical = `${SITE_URL}/loesungen/${data.slug}/`;

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: canonical,
      siteName: 'Gefahrstoff-QR',
      locale: 'de_DE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.metaTitle,
      description: data.metaDescription,
    },
  };
}

export default function IndustryPage({ params }: PageProps) {
  const data = getIndustry(params.slug);
  if (!data) notFound();

  return (
    <main className={PSEO_PAGE_MAIN}>
      <section className={`${PSEO_SECTION_HERO} lg:py-24`} aria-labelledby="industry-hero-title">
        <div className={`${PSEO_CONTAINER} ${PSEO_PROSE}`}>
          <IndustrySlugHero data={data} />
        </div>
        {data.showSdbPreview ? (
          <div className={`${PSEO_CONTAINER} ${PSEO_PROSE} mt-12`}>
            <SdbLivePreviewDropzone variant="next" />
            <SdbTrustFeatureList />
          </div>
        ) : null}
      </section>

      <section
        className="border-b border-[#e5e7eb] bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        aria-labelledby="stoffe-heading"
      >
        <div className="mx-auto max-w-3xl">
          <h2 id="stoffe-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Häufige Gefahrstoffe in Ihrer Branche
          </h2>
          <p className="mt-3 text-slate-600">
            Beispiele aus der Praxis — ergänzen Sie im Betrieb alle Stoffe, die Sie tatsächlich einsetzen, lagern oder
            abgeben.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2" role="list">
            {data.typischeStoffe.map((stoff) => (
              <li
                key={stoff}
                className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-800"
              >
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#ff6b35]" aria-hidden />
                <span>{stoff}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-slate-100 px-4 py-16 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="vorteil-heading">
        <div className="mx-auto max-w-3xl">
          <h2 id="vorteil-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Wie Gefahrstoff-QR Ihr {data.brancheGenitiv} erleichtert
          </h2>
          <p className="mt-6 text-lg font-semibold leading-relaxed text-slate-800">{data.spezifischerVorteil}</p>
          <p className="mt-6 leading-relaxed text-slate-600">{data.handwerkAbsatz}</p>
          <p className="mt-6 text-sm leading-relaxed text-slate-500">
            Gefahrstoff-QR unterstützt Sie bei einem{' '}
            <strong className="font-semibold text-slate-700">Gefahrstoffverzeichnis nach §&nbsp;6 GefStoffV</strong> und
            bei <strong className="font-semibold text-slate-700">Betriebsanweisungen</strong>, die Sie fachlich prüfen
            und freigeben. KI extrahiert strukturierte Angaben aus dem Sicherheitsdatenblatt — Sie behalten die
            Verantwortung für Bewertung und Dokumentation.
          </p>
        </div>
      </section>

      <section className="border-t border-white/[0.07] bg-[#0f1e35] px-4 py-16 sm:px-6 lg:px-8" aria-label="Handlungsaufruf">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-[#f0f6ff] sm:text-3xl">
            Gefahrstoffverzeichnis und Betriebsanweisungen ohne Excel-Chaos
          </h2>
          <p className="mt-4 text-[#8fa4c0]">
            Legen Sie mit Ihren echten Sicherheitsdatenblättern los — unverbindlich testen, ohne Kreditkarte.
          </p>
          <Link href="https://app.gefahrstoff-qr.de/register" className="gqr-cta-primary gqr-cta-primary--lg mt-8">
            Jetzt kostenlos testen
          </Link>
          <p className="mt-4 text-sm text-[#8fa4c0]">
            Fragen?{' '}
            <a
              href="mailto:info@gefahrstoff-qr.de"
              className="font-semibold text-teal-300 underline-offset-2 hover:underline"
            >
              info@gefahrstoff-qr.de
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
