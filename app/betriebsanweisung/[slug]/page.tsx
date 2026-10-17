import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BetriebsanweisungFaqSection } from '@/components/betriebsanweisung/BetriebsanweisungFaqSection';
import { BetriebsanweisungSampleDocument } from '@/components/betriebsanweisung/BetriebsanweisungSampleDocument';
import { BetriebsanweisungSubstanceTable } from '@/components/betriebsanweisung/BetriebsanweisungSubstanceTable';
import { SdbLivePreviewDropzone } from '@/components/sdb-preview';
import { HAZARDOUS_SUBSTANCE_SLUGS } from '@/config/betriebsanweisung/entries';
import type { HazardousSubstanceSlug } from '@/config/betriebsanweisung/entries';
import { getAllBetriebsanweisungEntries, getBetriebsanweisungEntry } from '@/config/betriebsanweisung/registry';
import { SITE_URL } from '@/config/site-seo';
import { buildFaqPageSchema } from '@/lib/seo/build-faq-page-schema';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams(): { slug: HazardousSubstanceSlug }[] {
  return HAZARDOUS_SUBSTANCE_SLUGS.map((slug) => ({ slug }));
}

function buildMetaDescription(substanceName: string): string {
  return `Betriebsanweisung ${substanceName}: KI-gestützter TRGS-555-Entwurf in 15 Sekunden, Muster-PDF-Layout, H-Sätze & PSA — SDB hochladen für Lieferantenwerte. Vorprüfung durch SiFa.`;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const entry = getBetriebsanweisungEntry(params.slug);
  if (!entry) return { title: 'Seite nicht gefunden' };

  const title = `Betriebsanweisung ${entry.substanceName} nach TRGS 555`;
  const description = buildMetaDescription(entry.substanceName);
  const canonical = `${SITE_URL}/betriebsanweisung/${entry.slug}/`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Gefahrstoff-QR',
      locale: 'de_DE',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function BetriebsanweisungSlugPage({ params }: PageProps) {
  const entry = getBetriebsanweisungEntry(params.slug);
  if (!entry) notFound();

  const allEntries = getAllBetriebsanweisungEntries();
  const related = allEntries.filter((e) => e.slug !== entry.slug).slice(0, 4);
  const faqSchema = buildFaqPageSchema(entry.faqItems);
  const sdbIntro = `Haben Sie das aktuelle Hersteller-Sicherheitsdatenblatt für ${entry.substanceName} vorliegen? Laden Sie das PDF hier hoch, um die exakten Werte Ihres Lieferanten auszulesen.`;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section
        className="border-b border-white/[0.07] bg-gradient-to-b from-[#0f1e35]/90 to-[#0a1628] px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        aria-labelledby="ba-hero-title"
      >
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-wider text-[#ff6b35]">Betriebsanweisung · TRGS 555</p>
          <h1
            id="ba-hero-title"
            className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#f0f6ff] sm:text-4xl lg:text-[2.35rem]"
          >
            Betriebsanweisung {entry.substanceName} nach TRGS 555 – Entwurf in 15 Sekunden erstellen
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#8fa4c0]">
            {entry.classificationBasis} Die unten gezeigten H-Sätze und Piktogramme sind typische
            Beispielwerte — für Ihre rechtssichere Dokumentation immer das aktuelle Sicherheitsdatenblatt
            Ihres Lieferanten verwenden.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {entry.typicalIndustries.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-medium text-[#c8d4e6]"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-100 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Interaktive Muster-Betriebsanweisung</h2>
            <p className="mt-3 text-sm text-slate-600">
              Klassisches TRGS-555-Layout (HTML/CSS) — dynamisch mit CAS, GHS, H-Sätzen und PSA für{' '}
              {entry.substanceName}.
            </p>
          </div>
          <BetriebsanweisungSampleDocument entry={entry} />
        </div>
      </section>

      <section className="border-b border-white/[0.07] bg-[#0f1e35] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-[#f0f6ff]">Sicherheitsdatenblatt auslesen</h2>
          <SdbLivePreviewDropzone variant="next" className="mt-6" uploadIntro={sdbIntro} />
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Stoffdaten & PSA in der Praxis</h2>
          <p className="mt-3 text-slate-600">
            Synonyme: {entry.synonyms.join(', ')}. Signalwort (typisch):{' '}
            <strong className="text-slate-800">{entry.signalWord}</strong>.
          </p>
          <div className="mt-8">
            <BetriebsanweisungSubstanceTable entry={entry} />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Häufige Fragen zu {entry.substanceName}</h2>
          <div className="mt-8">
            <BetriebsanweisungFaqSection items={entry.faqItems} />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-lg font-bold text-slate-900">Weitere Betriebsanweisungen</h2>
          <ul className="mt-4 flex flex-wrap gap-2" role="list">
            <li>
              <Link href="/betriebsanweisung/" className="text-sm font-semibold text-[#ff6b35] hover:underline">
                Alle Stoffe
              </Link>
            </li>
            {related.map((rel) => (
              <li key={rel.slug}>
                <Link
                  href={`/betriebsanweisung/${rel.slug}/`}
                  className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 hover:border-[#ff6b35]/40"
                >
                  {rel.substanceName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/[0.07] bg-[#0f1e35] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Link href="https://app.gefahrstoff-qr.de/register" className="gqr-cta-primary gqr-cta-primary--lg">
            Betriebsanweisung-Entwurf kostenlos testen
          </Link>
          <p className="mt-4 text-sm text-[#8fa4c0]">
            KI-gestützter Entwurf (gemäß TRGS 555) — fachliche Freigabe durch SiFa / Arbeitgeber.
          </p>
        </div>
      </section>
    </main>
  );
}
