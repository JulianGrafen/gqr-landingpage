import type { Metadata } from 'next';
import Link from 'next/link';
import { ComparisonTable, type ComparisonRow } from '@/components/expert-blog/ComparisonTable';
import { ExpertCallout } from '@/components/expert-blog/ExpertCallout';
import { ExpertCard } from '@/components/expert-blog/ExpertCard';
import { ExpertHeading } from '@/components/expert-blog/ExpertHeading';
import { LeadMagnetCta } from '@/components/expert-blog/LeadMagnetCta';
import { RoiEstimator } from '@/components/expert-blog/RoiEstimator';
import { EXCEL_VORLAGE_SEO, GSC_TARGET_KEYWORDS, SITE_URL } from '@/config/site-seo';

/**
 * Dokumentation: Statische Kopie für GitHub Pages unter
 * `gefahrstoffkataster-excel-vorlage/index.html`.
 */
const pageUrl = `${SITE_URL}${EXCEL_VORLAGE_SEO.path}`;

const SEO_TITLE = EXCEL_VORLAGE_SEO.title;
const SEO_DESCRIPTION = EXCEL_VORLAGE_SEO.description;
const OG_IMAGE_ALT = EXCEL_VORLAGE_SEO.ogImageAlt;

const STRUC_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: SEO_TITLE,
      description: SEO_DESCRIPTION,
      isPartOf: { '@type': 'WebSite', name: 'Gefahrstoff-QR', url: SITE_URL },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.png`,
      },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Gefahrstoff-QR',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Gefahrstoffkataster Software mit SDB-Extraktion und digitalem Gefahrstoffverzeichnis nach § 6 GefStoffV – Alternative zur reinen Excel-Vorlage.',
      url: pageUrl,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        description: 'Kostenloser Einstieg zum Testen',
      },
      featureList: [
        'SDB Extraktion',
        'Gefahrstoffliste strukturiert pflegen',
        'Revisionssichere Nutzung im Team',
      ],
    },
    {
      '@type': 'HowTo',
      name: 'Wie erstelle ich ein Gefahrstoffverzeichnis?',
      description:
        'Überblick: Von der Excel-Vorlage zur strukturierten Gefahrstoffliste mit automatischer Datenübernahme aus Sicherheitsdatenblättern.',
      totalTime: 'PT1H',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Stoffe und SDBs erfassen',
          text: 'Sammeln Sie alle eingesetzten Gefahrstoffe und die zugehörigen Sicherheitsdatenblätter; legen Sie eine klare Liste als Basis für Ihr Verzeichnis an.',
        },
        {
          '@type': 'HowToStep',
          name: 'Stammdaten übernehmen',
          text: 'Übertragen Sie H- und P-Sätze, Kennzeichnung und weitere Pflichtfelder – manuell in einer Gefahrstoffverzeichnis-Vorlage oder per SDB Extraktion in eine Gefahrstoffkataster Software.',
        },
        {
          '@type': 'HowToStep',
          name: 'Fachlich prüfen und freigeben',
          text: 'SiFa oder andere Fachkräfte prüfen die Angaben, korrigieren Abweichungen und geben das Verzeichnis für den Betrieb frei.',
        },
        {
          '@type': 'HowToStep',
          name: 'Pflegen und nachhalten',
          text: 'Bei neuen SDB-Versionen Daten aktualisieren und Änderungen nachvollziehbar dokumentieren – das reduziert Haftungsrisiko und Prüfungsstress.',
        },
      ],
    },
  ],
} as const;

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  keywords: [...GSC_TARGET_KEYWORDS, 'SDB Extraktion', 'GefStoffV', 'Excel Gefahrstoffliste'],
  alternates: { canonical: pageUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: pageUrl,
    siteName: 'Gefahrstoff-QR',
    locale: 'de_DE',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: ['/og-image.png'],
  },
};

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    criterion: 'Erfassungsdauer',
    excel: 'Steigt linear: jede neue Version eines SDB erzeugt erneuten manuellen Aufwand.',
    extraction:
      'Typisch ca. 2 Min. pro SDB inkl. KI-Import und fachlicher Freigabe — statt Abtippen konzentrieren Sie sich auf Abweichungen.',
  },
  {
    criterion: 'Fehlerrate / Datengenauigkeit',
    excel:
      'Tippfehler bei H- und P-Sätzen, CAS-Nummern oder Grenzwerten sind die Regel, nicht die Ausnahme.',
    extraction:
      'Weniger manuelle Transferschritte reduzieren Fehlerquellen. Fachliche Endkontrolle bleibt unerlässlich.',
  },
  {
    criterion: 'Revisionssicherheit',
    excel:
      'Hängt von Datei-Disziplin, Freigaben und Nachvollziehbarkeit „wer hat wann geändert“ ab.',
    extraction:
      'Strukturierte Ausgangsdaten erleichtern Nachweise; Umsetzung im Produkt bestimmt Audittrail und Freigaben.',
  },
  {
    criterion: 'Kosten',
    excel:
      'Geringe direkte Softwarekosten — dafür hohe interne Personalkosten und Fehlerfolgekosten.',
    extraction:
      'Softwarekosten stehen Einsparungen in Bearbeitungszeit und geringerem Korrekturaufwand gegenüber.',
  },
];

const REGISTER_HREF = 'https://app.gefahrstoff-qr.de/register';

export default function GefahrstoffkatasterExcelVorlagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUC_DATA) }}
      />
      <article>
        <section
          className="border-b border-white/[0.07] bg-gradient-to-b from-[#0f1e35]/90 to-[#0a1628] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
          aria-labelledby="excel-vorlage-hero-title"
        >
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr),minmax(0,380px)] lg:items-center">
            <div>
              <nav className="text-sm text-[#8fa4c0]" aria-label="Brotkrumen">
                <Link
                  className="font-medium text-[#2dd4bf] hover:underline"
                  href="/blog/"
                >
                  Blog
                </Link>
                <span className="mx-2 text-white/30" aria-hidden>
                  /
                </span>
                <span className="text-[#8fa4c0]">Expertise</span>
              </nav>
              <p className="mt-6 text-xs font-bold uppercase tracking-wider text-[#ff6b35] sm:text-sm">
                Gefahrstoffkataster Excel · Gefahrstoffverzeichnis Vorlage
              </p>
              <h1
                id="excel-vorlage-hero-title"
                className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#f0f6ff] sm:text-4xl lg:text-[2.35rem] lg:leading-[1.15]"
              >
                {EXCEL_VORLAGE_SEO.h1}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[#8fa4c0]">
                Wer nach{' '}
                <strong className="font-semibold text-[#c8d4e6]">
                  Gefahrstoffkataster Excel
                </strong>
                ,{' '}
                <strong className="font-semibold text-[#c8d4e6]">
                  Gefahrstoffverzeichnis Vorlage Excel
                </strong>{' '}
                oder{' '}
                <strong className="font-semibold text-[#c8d4e6]">
                  Gefahrstoffverzeichnis Muster
                </strong>{' '}
                sucht, startet oft bewusst mit Tabellen: niedrige
                Einstiegskosten, schnell erklärt, überall verfügbar. Viele
                Suchanfragen nach{' '}
                <strong className="font-semibold text-[#c8d4e6]">
                  Gefahrstoffkataster Software kostenlos
                </strong>{' '}
                sind genau dieser Logik geschuldet — erst strukturieren, später
                optimieren. Der sachliche Nachteil: manuelles Abtippen aus dem
                SDB skaliert schlecht, erzeugt{' '}
                <strong className="font-semibold text-[#c8d4e6]">
                  Haftungsrisiko
                </strong>{' '}
                bei Tippfehlern und frißt Zeit, die Ihre Fachkraft für
                Bewertung und Freigabe braucht.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-[#8fa4c0]">
                Mit{' '}
                <strong className="font-semibold text-[#c8d4e6]">
                  SDB Extraktion
                </strong>{' '}
                lässt sich dieselbe{' '}
                <strong className="font-semibold text-[#c8d4e6]">
                  Gefahrstoffliste
                </strong>{' '}
                typischerweise in wenigen Sekunden pro Dokument vorabfüllen —
                die{' '}
                <strong className="font-semibold text-[#c8d4e6]">
                  Gefahrstoffliste Lösungen
                </strong>{' '}
                im Betrieb bleiben nachvollziehbar, während Sie den Kopf für die
                inhaltlich kniffligen Fälle freibekommen.
              </p>
              <Link
                href={REGISTER_HREF}
                className="gqr-cta-primary gqr-cta-primary--lg mt-8 inline-flex"
              >
                Jetzt kostenlos testen &amp; SDB-Auto-Check
              </Link>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src="/images/gefahrstoffverzeichnis-app.svg"
                width={380}
                height={320}
                className="max-h-72 w-auto max-w-full drop-shadow-lg"
                loading="eager"
                decoding="async"
                alt="Gefahrstoffkataster Software und Gefahrstoffverzeichnis Excel – digitale Übersicht statt reiner Tabelle"
              />
            </div>
          </div>
        </section>

        <section
          className="border-b border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
          aria-labelledby="excel-muster-heading"
        >
          <div className="mx-auto max-w-3xl">
            <ExpertHeading
              id="excel-muster-heading"
              eyebrow="Einstieg"
              title="Gefahrstoffverzeichnis Excel Muster"
              subtitle="Ein Muster in Excel oder als exportierbare Liste gibt Orientierung für Spalten, die in Audits oft nachgefragt werden — von Stoffbezeichnung über Kennzeichnung bis zur Quelle des SDB. Eine Vorlage ersetzt aber weder die fachliche Bewertung noch eine belastbare Historie von Änderungen."
            />
            <div className="mt-8 space-y-4 leading-relaxed text-slate-600">
              <p>
                Nutzen Sie eine{' '}
                <strong className="font-semibold text-slate-800">
                  Gefahrstoffverzeichnis Vorlage Excel kostenlos
                </strong>{' '}
                oder ein internes{' '}
                <strong className="font-semibold text-slate-800">
                  Gefahrstoffverzeichnis Muster
                </strong>
                , um Konsens im Team zu schaffen: Welche Mindestfelder pflegen
                wir? Wer trägt die Verantwortung bei neuen Lieferanten? Sobald die
                Struktur steht, wird der Engpass sichtbar — nämlich die
                wiederkehrende{' '}
                <strong className="font-semibold text-slate-800">
                  SDB Extraktion
                </strong>{' '}
                für jede Produktaktualisierung.
              </p>
              <p>
                Genau hier lohnt der Vergleich: dauerhaft manuell oder einmalig
                Software einführen, die Rohdaten zuverlässig aus dem PDF liest
                und Ihre Freigabeprozesse unterstützt. Beides ist mit{' '}
                <strong className="font-semibold text-slate-800">
                  Gefahrstoffliste Lösungen
                </strong>{' '}
                vereinbar — entscheidend ist die Transparenz für Prüfer und
                Geschäftsführung.
              </p>
            </div>
            <div className="mt-10 text-center">
              <Link
                href={REGISTER_HREF}
                className="gqr-cta-primary gqr-cta-primary--md inline-flex text-center"
              >
                Jetzt kostenlos testen &amp; SDB-Auto-Check
              </Link>
            </div>
          </div>
        </section>

        <section
          className="border-b border-slate-200 bg-slate-100 px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
          aria-labelledby="pain-heading"
        >
          <div className="mx-auto max-w-[1160px]">
            <ExpertHeading
              id="pain-heading"
              eyebrow="Praxis"
              title="Warum Excel in vielen Betrieben an Grenzen stößt"
              subtitle="Drei wiederkehrende Muster aus Beratungsprojekten — nicht als Schlussurteil, sondern als Checkliste für Ihre eigene Situation."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <ExpertCard index={1} title="Manueller Aufwand">
                <p>
                  Wer SDB-Inhalte in Zeilen und Spalten überträgt, landet schnell
                  bei <strong>ca. 15–25 Minuten pro Dokument</strong> — je nach
                  Layout, Sprache und wie tief Sie chemikalienrechtlich auswerten.
                </p>
                <p>
                  Skaliert auf dreißig oder fünfzig Stoffe ist das kein
                  „Nebenbei“-Task mehr, sondern ein fester Block in der
                  Arbeitssicherheits-Routine.
                </p>
              </ExpertCard>
              <ExpertCard index={2} title="Tippfehler bei Kennzeichnung">
                <p>
                  H- und P-Sätze, Konzentrationsgrenzen oder
                  Wassergefährdungsklasse falsch abzuschreiben hat keine
                  dramatische Bühne — aber{' '}
                  <strong>Konsequenzen bei Prüfung und Haftung</strong>.
                </p>
                <p>
                  Das Risiko wächst, wenn mehrere Personen dieselbe Datei pflegen
                  oder Versionen per E-Mail kursieren.
                </p>
              </ExpertCard>
              <ExpertCard index={3} title="Veraltete Datenstände">
                <p>
                  Lieferanten aktualisieren SDBs regelmäßig. In Excel bleibt oft
                  unklar, <strong>welche PDF-Version</strong> der Zeile zugrunde
                  liegt.
                </p>
                <p>
                  Revisionssicherheit entsteht nicht durch die Dateiendung,
                  sondern durch definierte Freigaben und nachvollziehbare
                  Änderungen.
                </p>
              </ExpertCard>
            </div>
          </div>
        </section>

        <section
          className="border-b border-white/[0.07] bg-[#0a1628] px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
          aria-labelledby="roi-heading"
        >
          <div className="mx-auto max-w-[1160px]">
            <ExpertHeading
              id="roi-heading"
              tone="dark"
              eyebrow="Größenordnung"
              title="Vom Stunden-Berg zur fokussierten Prüfphase rechnen"
              subtitle="Ein interaktiver Grob-Vergleich: dieselbe Stückzahl, zwei Wege zur vollständigen Erfassung — jeweils inkl. fachlicher Freigabe."
            />
            <div className="mt-10">
              <RoiEstimator />
            </div>
          </div>
        </section>

        <section
          className="border-b border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
          aria-labelledby="compare-heading"
        >
          <div className="mx-auto max-w-[1160px]">
            <ExpertHeading
              id="compare-heading"
              eyebrow="Entscheidungsgrundlage"
              title="Excel-Vorlage und KI-gestützte Extraktion im Vergleich"
              subtitle="Kein „Gewinner um jeden Preis“ — sondern Kriterien, nach denen Sie intern abwägen können: Zeit, Datengenauigkeit, Revision und Gesamtkosten."
            />
            <div className="mt-10">
              <ComparisonTable
                leftColumnTitle="Excel-Vorlage"
                rightColumnTitle="KI-gestützte Extraktion"
                rows={COMPARISON_ROWS}
              />
            </div>
          </div>
        </section>

        <section
          className="border-b border-slate-200 bg-slate-100 px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
          aria-labelledby="app-vorteile-heading"
        >
          <div className="mx-auto max-w-3xl">
            <ExpertHeading
              id="app-vorteile-heading"
              eyebrow="Digitale Gefahrstoffkataster Software"
              title="Vorteile einer Gefahrstoff-App oder -Software"
              subtitle="Wenn der Katalog wächst, zählen Wiederholbarkeit, Geschwindigkeit und Nachweisbarkeit — nicht nur die Tabellenoptik."
            />
            <ul className="mt-8 list-none space-y-4 text-slate-600">
              <li className="flex gap-3">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ff6b35]"
                  aria-hidden
                />
                <span>
                  <strong className="text-slate-800">SDB Extraktion</strong> in
                  Sekunden statt handschriftlichem Übertrag — konsistentere
                  Stammdaten für Ihr{' '}
                  <strong className="text-slate-800">Gefahrstoffkataster</strong>
                  .
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ff6b35]"
                  aria-hidden
                />
                <span>
                  Weniger Suchzeit bei{' '}
                  <strong className="text-slate-800">
                    Gefahrstoffliste Lösungen
                  </strong>{' '}
                  im Schichtbetrieb; Informationen bleiben am Einsatzort nutzbar.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ff6b35]"
                  aria-hidden
                />
                <span>
                  Revisionssichere Dokumentation von Freigaben — wertvoll, wenn
                  Behörden oder BG nach „Stand heute“ fragen.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ff6b35]"
                  aria-hidden
                />
                <span>
                  Kombinierbar mit Ihrem bestehenden Mentalmodell: viele Teams
                  behalten eine{' '}
                  <strong className="text-slate-800">
                    Gefahrstoffverzeichnis Vorlage Excel
                  </strong>{' '}
                  für Ad-hoc-Exporte, pflegen die „Wahrheit“ aber zentral.
                </span>
              </li>
            </ul>
            <div className="mt-10 flex justify-center">
              <img
                src="/images/sicherheitsdatenblatt-digital.svg"
                width={400}
                height={220}
                className="max-h-56 w-auto max-w-full"
                loading="lazy"
                decoding="async"
                alt="Gefahrstoffverzeichnis Excel und digitale SDB-Extraktion – Sicherheitsdatenblatt strukturiert erfassen"
              />
            </div>
          </div>
        </section>

        <section
          className="border-b border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
          aria-labelledby="truth-heading"
        >
          <div className="mx-auto max-w-3xl">
            <ExpertHeading
              id="truth-heading"
              eyebrow="Realismus-Check"
              title="Die Wahrheit über Automatisierung im Gefahrstoffmanagement"
              subtitle="Prozessoptimierung ersetzt keine Compliance-Verantwortung — sie verschiebt den Schwerpunkt von Roharbeit auf Bewertung."
            />
            <div className="mt-8">
              <ExpertCallout title="Menschliche Endkontrolle bleibt Pflicht">
                <p>
                  SDBs sind komplex; Ausnahmen, proprietäre Gemische und
                  firmenspezifische Bewertungen können nicht blind übernommen
                  werden. Was Automatisierung realistisch leistet, ist die{' '}
                  <strong>Entlastung bei großer Datenmenge</strong>: Standardfelder,
                  Kennzeichnung und wiederkehrende Strukturen werden mit hoher
                  Trefferquote vorbefüllt.
                </p>
                <p>
                  In der Praxis bedeutet das: Sie investieren die Zeit dort, wo
                  sie arbeitsschutzlich wirkt — in Abweichungen,
                  Betriebsanweisungen und Freigaben — statt in abtippen.
                </p>
                <ul>
                  <li>
                    <strong>~95&nbsp;% Routinearbeit</strong> an der strukturierten
                    Erfassung können oft dem System überlassen werden, abhängig
                    von Dokumentqualität und Produkt.
                  </li>
                  <li>
                    <strong>Die restlichen Prozent</strong> sind genau der Grund,
                    warum Ihre SiFa oder externe Fachkraft weiterhin signiert.
                  </li>
                  <li>
                    <strong>Rechtssicherheit</strong> entsteht durch den
                    dokumentierten Prozess — nicht durch das Versprechen
                    fehlerfreier Software.
                  </li>
                </ul>
              </ExpertCallout>
            </div>
          </div>
        </section>

        <section
          className="bg-[#0f1e35] px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
          aria-label="Handlungsaufruf"
        >
          <div className="mx-auto max-w-[1160px]">
            <LeadMagnetCta
              title="Excel-Einstieg behalten — Automatisierung dazu nutzen"
              body="Starten Sie kostenlos: Struktur wie bei einer Vorlage, plus automatische Übernahme aus echten SDBs. Keine Kreditkarte."
              ctaLabel="Jetzt kostenlos testen & SDB-Auto-Check"
            />
            <p className="mt-10 text-center text-sm text-[#8fa4c0]">
              <Link
                href="/blog/"
                className="font-semibold text-teal-300 underline-offset-2 hover:underline"
              >
                Zurück zur Blog-Übersicht
              </Link>
            </p>
          </div>
        </section>
      </article>
    </>
  );
}
