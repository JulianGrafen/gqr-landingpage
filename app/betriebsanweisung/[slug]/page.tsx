import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BetriebsanweisungExpertSeoSection } from '@/components/betriebsanweisung/BetriebsanweisungExpertSeoSection';
import { BetriebsanweisungSdbSidebar } from '@/components/betriebsanweisung/BetriebsanweisungSdbSidebar';
import { BetriebsanweisungTeaserDocument } from '@/components/betriebsanweisung/BetriebsanweisungTeaserDocument';
import { HAZARDOUS_SUBSTANCE_SLUGS } from '@/config/betriebsanweisung/entries';
import type { HazardousSubstanceSlug } from '@/config/betriebsanweisung/entries';
import { getAllBetriebsanweisungEntries, getBetriebsanweisungEntry } from '@/config/betriebsanweisung/registry';
import { REGISTER_CTA_LABEL } from '@/config/legal/site-copy';
import { SITE_URL } from '@/config/site-seo';
import { buildBetriebsanweisungRegisterUrl } from '@/lib/betriebsanweisung/build-register-url';
import { buildBetriebsanweisungFaqItems } from '@/lib/betriebsanweisung/build-substance-faq';
import { buildFaqPageSchema } from '@/lib/seo/build-faq-page-schema';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams(): { slug: HazardousSubstanceSlug }[] {
  return HAZARDOUS_SUBSTANCE_SLUGS.map((slug) => ({ slug }));
}

function buildMetaDescription(substanceName: string): string {
  return `Betriebsanweisung ${substanceName}: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt — Vorprüfung zur fachlichen Freigabe durch SiFa / Arbeitgeber (§ 14 GefStoffV).`;
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
  const faqSchema = buildFaqPageSchema(buildBetriebsanweisungFaqItems(entry.substanceName));
  const registerUrl = buildBetriebsanweisungRegisterUrl(entry.slug);

  return (
    <main className="bg-[#0a1628]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section
        className="border-b border-white/[0.07] bg-gradient-to-b from-[#0f1e35]/90 to-[#0a1628] px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
        aria-labelledby="ba-hero-title"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-wider text-[#ff6b35]">Betriebsanweisung · TRGS 555</p>
          <h1
            id="ba-hero-title"
            className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#f0f6ff] sm:text-4xl lg:text-[2.35rem]"
          >
            Betriebsanweisung {entry.substanceName} nach TRGS 555 – Entwurf in 15 Sekunden erstellen
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#8fa4c0]">
            KI-gestützter Entwurf (gemäß TRGS 555) mit SDB-Upload — Vorprüfung zur fachlichen Freigabe durch die
            SiFa / den Arbeitgeber (§ 14 GefStoffV).
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
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

      <section className="border-b border-white/[0.07] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <BetriebsanweisungTeaserDocument entry={entry} />
          </div>
          <div className="lg:col-span-5">
            <BetriebsanweisungSdbSidebar substanceName={entry.substanceName} />
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.07] bg-[#0f1e35]/50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <BetriebsanweisungExpertSeoSection entry={entry} />
        </div>
      </section>

      <section className="border-t border-white/[0.07] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-lg font-bold text-[#f0f6ff]">Weitere Betriebsanweisungen</h2>
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
                  className="rounded-full border border-white/15 px-3 py-1 text-sm text-[#c8d4e6] hover:border-[#ff6b35]/40"
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
          <Link href={registerUrl} className="gqr-cta-primary gqr-cta-primary--lg">
            {REGISTER_CTA_LABEL}
          </Link>
          <p className="mt-4 text-sm text-[#8fa4c0]">
            KI-gestützter Entwurf (gemäß TRGS 555) — Vorprüfung zur fachlichen Freigabe durch SiFa / Arbeitgeber.
          </p>
        </div>
      </section>
    </main>
  );
}
