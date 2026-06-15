import Link from 'next/link';
import { ManualVsGqrComparison } from '@/components/deepinfo/ManualVsGqrComparison';
import { LandingHeroWithMedia } from '@/components/seo-silo/LandingHeroWithMedia';
import { LandingPageWrapper } from '@/components/seo-silo/LandingPageWrapper';
import { LandingProseSection } from '@/components/seo-silo/LandingProseSection';
import { LandingRoiSection } from '@/components/seo-silo/LandingRoiSection';
import {
  KATASTER_SOFTWARE_COMPARISON,
  KATASTER_SOFTWARE_SILO_CONFIG,
} from '@/config/seo-silo/pages/gefahrstoffkataster-software';

export function GefahrstoffkatasterSoftwareSiloPage() {
  return (
    <LandingPageWrapper
      config={KATASTER_SOFTWARE_SILO_CONFIG}
      heroSlot={
        <LandingHeroWithMedia
          hero={KATASTER_SOFTWARE_SILO_CONFIG.hero}
          image={{
            src: '/images/app-screenshot-dashboard.png',
            alt: 'Gefahrstoffkataster Software: Dashboard mit SDB-Status, Filtern und Compliance-KPIs',
            width: 2940,
            height: 1656,
          }}
        />
      }
    >
      <LandingRoiSection
        title="ROI-Rechner: Versteckte Personalkosten vs. KI-Automatisierung"
        subline="Berechnen Sie den teuersten Kostenblock Ihres Gefahrstoffmanagements: Die Arbeitszeit Ihrer Sicherheitsfachkraft. Vergleichen Sie den Aufwand für manuelles Abtippen von SDB-Daten mit dem automatisierten KI-Import von GQR."
      />

      <LandingProseSection
        id="audit-sicherheit"
        eyebrow="Compliance & Haftung"
        title="Was Auditoren sehen wollen — und warum Excel ein Haftungsrisiko darstellt"
        intro="Bei Betriebsprüfungen durch die Berufsgenossenschaft oder Gewerbeaufsicht geht es nicht um Dateiformate, sondern um die lückenlose Beweiskette Ihrer Betreiberverantwortung."
      >
        <p>
          Ein <strong>Gefahrstoffverzeichnis nach § 6 GefStoffV</strong> ist nur dann rechtssicher, wenn es auf die zugrunde liegenden Sicherheitsdatenblätter (SDB) lückenlos zurückführbar ist. Genau hier scheitert Excel strukturell: Tabellen kennen keine Historie. Wenn ein Lieferant Rezepturen ändert und die SiFa die Zeile überschreibt, wird der alte Datenstand vernichtet. Kommt es Jahre später zur Meldung einer Berufskrankheit, fehlt Ihnen der revisionssichere Nachweis, unter welchen Bedingungen der Mitarbeiter damals gearbeitet hat. 
        </p>
        <p>
          <strong>Der Stichtag Mai 2026:</strong> Mit dem Ablauf der CLP-Übergangsfrist für Gemische müssen Hunderte bestehende H- und P-Sätze (z.B. für endokrine Disruptoren) im Bestand aktualisiert werden. Wer dies manuell in Excel und Word-Dokumenten versucht, provoziert Übertragungsfehler. GQR extrahiert diese Änderungen automatisiert, protokolliert jede Version und zwingt das System in die gesetzliche Konformität.
        </p>
        <p>
          <strong>Die Kausalkette der TRGS 400:</strong> Eine Änderung im SDB muss zwingend eine Überprüfung der Gefährdungsbeurteilung (GB) und eine Anpassung der Unterweisung (<strong>§ 14 GefStoffV</strong>) auslösen. Eine spezialisierte Software verknüpft diese Prozesse. Die SiFa investiert ihre Zeit in die fachliche Risikobewertung – nicht in das Formatieren von Dokumenten. Parallel prüft das System vollautomatisch im Hintergrund die <strong>TRGS 510</strong>, um fatale Zusammenlagerungskonflikte pro Standort präventiv zu blockieren.
        </p>
      </LandingProseSection>

      <div className="gqr-container py-14 lg:py-20">
        <ManualVsGqrComparison
          targetAudience={KATASTER_SOFTWARE_COMPARISON.targetAudience}
          comparison={{
            leftColumnTitle: 'Manuelle Pflege (Excel / Word)',
            rightColumnTitle: 'Automatisierung (GQR)',
            rows: [...KATASTER_SOFTWARE_COMPARISON.rows],
          }}
        />
      </div>

      <LandingProseSection
        id="auswahl"
        eyebrow="Investitionsentscheidung"
        title="Software-Auswahl für den Mittelstand: Schlanke Compliance statt schwerfälliger IT-Projekte"
        variant="raised"
      >
        <h3>Das Minimum für audit-sichere Betriebe</h3>
        <p>
          Eine moderne Software für Arbeitssicherheit darf kein Selbstzweck sein. Verlangen Sie von Ihrem System drei nicht verhandelbare Kernfunktionen: (1) Die automatisierte Extraktion von SDB-Daten zur Entlastung teurer Fachkräfte, (2) ein revisionssicheres Aktivitätsprotokoll für BG-Audits und (3) die mobile Bereitstellung von Notfallmaßnahmen am Ort der Gefahr. Fehlt nur eine dieser Säulen, ist die Software ihr Geld nicht wert.
        </p>

        <h3>Integration ohne IT-Blockaden</h3>
        <p>
          Mittelständische Betriebe haben keine Zeit für 12-monatige Software-Einführungen. GQR ist als "Low-Friction"-System konzipiert. Der Rollout erfordert keine Anbindung an komplexe ERP-Systeme. Sie laden Ihren SDB-Bestand hoch, die KI übernimmt das initiale Mapping, Sie geben die Daten fachlich frei und generieren sofort TRGS-konforme Betriebsanweisungen. 
        </p>

        <h3>Nächste rationale Schritte</h3>
        <p>
          Wenn Ihr Betrieb noch tief in der Zettelwirtschaft steckt, evaluieren Sie Ihren aktuellen Schmerzpunkt mit unserer{' '}
          <Link href="/gefahrstoffverzeichnis-excel-vorlage/" className="gqr-link">
            kostenlosen Excel-Vorlage
          </Link>
          . Reicht diese nicht mehr aus, um Ihre Haftung zu minimieren, lesen Sie unseren detaillierten{' '}
          <Link href="/wissen/gefahrstoffkataster-software/" className="gqr-link">
            Leitfaden zur Software-Evaluation
          </Link>
          . Für den direkten Abgleich im Lager nutzen Sie begleitend unseren{' '}
          <Link href="/trgs-510-zusammenlagerungs-check/" className="gqr-link">
            TRGS-510-Checker
          </Link>
          , um kritische Lagerkonflikte sofort aufzudecken.
        </p>
      </LandingProseSection>
    </LandingPageWrapper>
  );
}