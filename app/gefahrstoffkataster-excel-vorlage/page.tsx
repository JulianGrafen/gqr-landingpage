import type { Metadata } from 'next';
import Link from 'next/link';
import { ComparisonTable, type ComparisonRow } from '@/components/expert-blog/ComparisonTable';
import { ExpertCallout } from '@/components/expert-blog/ExpertCallout';
import { ExpertCard } from '@/components/expert-blog/ExpertCard';
import { ExpertHeading } from '@/components/expert-blog/ExpertHeading';
import { LeadMagnetCta } from '@/components/expert-blog/LeadMagnetCta';
import { RoiEstimator } from '@/components/expert-blog/RoiEstimator';

/**
 * Statische Kopie für GitHub Pages: `gefahrstoffkataster-excel-vorlage/index.html`
 * (dasselbe Thema; `out/` wird nicht deployt).
 */
const siteUrl = 'https://gefahrstoff-qr.de';
const path = '/gefahrstoffkataster-excel-vorlage/';

/** Fokus-Keywords (organische Platzierung hängt u. a. von Inhalt, Signale & Wettbewerb ab — Metadaten unterstützen Relevanz & Klickrate) */
const SEO_TITLE =
  'Gefahrstoffkataster Excel · Gefahrstoffverzeichnis Vorlage – Vergleich';
const SEO_DESCRIPTION =
  'Gefahrstoffkataster in Excel führen oder eine Gefahrstoffverzeichnis-Vorlage nutzen? Aufwand, Tippfehler-Risiko, Revisionssicherheit und Kosten im Vergleich zur strukturierten Datenübernahme aus Sicherheitsdatenblättern – sachlicher Ratgeber für Betriebe.';

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  keywords: [
    'gefahrstoffkataster excel',
    'gefahrstoffverzeichnis vorlage',
    'gefahrstoffkataster vorlage',
    'gefahrstoffverzeichnis excel',
    'excel gefahrstoffkataster',
    'gefahrstoffkataster vorlage excel',
    'SDB Extraktion',
    'GefStoffV Kataster',
  ],
  alternates: { canonical: `${siteUrl}${path}` },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: `${siteUrl}${path}`,
    siteName: 'Gefahrstoff-QR',
    locale: 'de_DE',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gefahrstoffkataster Excel und Gefahrstoffverzeichnis Vorlage – Vergleich und Alternativen',
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
      'Große Teile der Stammdaten lassen sich gebündelt übernehmen; Sie konzentrieren sich auf Prüfung und Abweichungen.',
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

export default function GefahrstoffkatasterExcelVorlagePage() {
  return (
    <article>
      <section
        className="border-b border-white/[0.07] bg-gradient-to-b from-[#0f1e35]/90 to-[#0a1628] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        aria-labelledby="excel-vorlage-hero-title"
      >
        <div className="mx-auto max-w-3xl">
          <nav className="text-sm text-[#8fa4c0]" aria-label="Brotkrumen">
            <Link className="font-medium text-[#2dd4bf] hover:underline" href="/blog/">
              Blog
            </Link>
            <span className="mx-2 text-white/30" aria-hidden>
              /
            </span>
            <span className="text-[#8fa4c0]">Expertise</span>
          </nav>
          <p className="mt-6 text-xs font-bold uppercase tracking-wider text-[#ff6b35] sm:text-sm">
            Gefahrstoffkataster · Prozessoptimierung
          </p>
          <h1
            id="excel-vorlage-hero-title"
            className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#f0f6ff] sm:text-4xl lg:text-[2.35rem] lg:leading-[1.15]"
          >
            Gefahrstoffkataster in Excel führen: Zeitersparnis oder verstecktes
            Haftungsrisiko?
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#8fa4c0]">
            Viele Betriebe pflegen den Gefahrstoffkataster in Excel oder setzen
            auf eine Gefahrstoffverzeichnis-Vorlage — verständliche Einstiege,
            zunächst oft mit geringen Softwarekosten. Ob sich das für Ihren
            Betrieb rechnet, hängt weniger von der Tabellenoptik ab als von
            Datenpflege, Fehlerquote und Nachweisbarkeit bei Audits. Hier ein
            sachlicher Vergleich zur strukturierten Übernahme aus
            Sicherheitsdatenblättern — ohne überzogene Versprechen.
          </p>
        </div>
      </section>

      <section
        className="border-b border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
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
                H- und P-Sätze, Konzentrationsgrenzen oder Wassergefährdungsklasse
                falsch abzuschreiben hat keine dramatische Bühne — aber{' '}
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
                Revisionssicherheit entsteht nicht durch die Dateiendung, sondern
                durch definierte Freigaben und nachvollziehbare Änderungen.
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
            subtitle="Ein interaktiver Grob-Vergleich: dieselbe Stückzahl, zwei unterschiedliche Prozessschritte. Die Freigabe durch Fachkräfte bleibt in beiden Fällen Ihre Aufgabe."
          />
          <div className="mt-10">
            <RoiEstimator />
          </div>
        </div>
      </section>

      <section
        className="border-b border-slate-200 bg-slate-100 px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
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
                In der Praxis bedeutet das: Sie investieren die Zeit dort, wo sie
                arbeitsschutzlich wirkt — in Abweichungen, Betriebsanweisungen und
                Freigaben — statt in abtippen.
              </p>
              <ul>
                <li>
                  <strong>~95&nbsp;% Routinearbeit</strong> an der strukturierten
                  Erfassung können oft dem System überlassen werden, abhängig von
                  Dokumentqualität und Produkt.
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
          <LeadMagnetCta />
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
  );
}
