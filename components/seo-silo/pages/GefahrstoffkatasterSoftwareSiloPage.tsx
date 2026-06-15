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
        title="ROI-Rechner: Excel-Pflege vs. KI-SDB-Import"
        subline="Schieben Sie die Stoffanzahl — der Unterschied zwischen manuellem Abtippen und GQR inklusive fachlicher Freigabe wird schnell sichtbar."
      />

      <LandingProseSection
        id="audit-sicherheit"
        eyebrow="Audit & Haftung"
        title="Was Prüfer sehen — und was Excel nicht liefern kann"
        intro="BG-Inspektionen und Behördenbegehungen fokussieren auf Nachvollziehbarkeit, nicht auf Dateiformate."
      >
        <p>
          Ein <strong>Gefahrstoffverzeichnis nach § 6 GefStoffV</strong> muss aktuell sein und auf
          die zugrunde liegenden Sicherheitsdatenblätter zurückführbar sein. In Excel fehlt die
          Kette: Welche PDF-Version stand hinter Zeile 47 am Tag der Unterweisung? Wer hat den
          P-Satz nach der CLP-Umstellung geändert — und wann? Diese Lücken sind bei
          Arbeitsunfällen Haftungsthemen, nicht nur Formalia.
        </p>
        <p>
          Das <strong>Aktivitätsprotokoll in GQR</strong> dokumentiert Uploads, Feldänderungen und
          Nutzeraktionen. Für die <strong>Gefährdungsbeurteilung nach TRGS 400</strong> bedeutet
          das: weniger Zeit für Datensammlung, mehr Zeit für Bewertung. Für{' '}
          <strong>§ 14 GefStoffV</strong> bleibt die Unterweisungspflicht — aber die Informationsbasis
          ist konsistent, statt aus veralteten Word- und Excel-Fragmenten zusammengesucht.
        </p>
        <p>
          Wer lagert, braucht <strong>TRGS 510</strong> im Blick. Software warnt bei
          Zusammenlagerungskonflikten pro Lagerort — Excel nicht. Und am Regal zählt der{' '}
          <strong>QR-Notfallpass</strong>: Ersthelfer brauchen P-Sätze in Sekunden, nicht Ordner im
          Büro.
        </p>
      </LandingProseSection>

      <div className="gqr-container py-14 lg:py-20">
        <ManualVsGqrComparison
          targetAudience={KATASTER_SOFTWARE_COMPARISON.targetAudience}
          comparison={{
            leftColumnTitle: 'Excel / manuelle Pflege',
            rightColumnTitle: 'Gefahrstoff-QR (GQR)',
            rows: [...KATASTER_SOFTWARE_COMPARISON.rows],
          }}
        />
      </div>

      <LandingProseSection
        id="auswahl"
        eyebrow="Entscheidungshilfe"
        title="Gefahrstoffkataster Software auswählen — ohne Buzzword-Checklisten"
        variant="raised"
      >
        <h3>Minimum für kaufbereite Betriebe</h3>
        <p>
          Vier Kriterien, die sich in Audits bewährt haben: (1) automatisierte SDB-Extraktion mit
          manueller Freigabe, (2) revisionssichere Historie, (3) TRGS-510-Bezug bei Lagerung,
          (4) Export und mobile Abrufbarkeit am Einsatzort. Alles andere ist Nice-to-have — ohne
          diese Basis bleibt Excel die teurere Option.
        </p>

        <h3>Umstieg ohne IT-Projekt</h3>
        <p>
          Typischer Rollout: SDB-Bestand hochladen, Felder prüfen, Lagerorte und Verantwortliche
          zuordnen, erste Exporte für interne Audits. Kein ERP-Zwang am Tag eins. SiFa-Zeit fließt
          in Freigabe und GB — nicht in Formatierung und Abtippen.
        </p>

        <h3>Verwandte Themen</h3>
        <p>
          Noch in Excel? Starten Sie mit der{' '}
          <Link href="/gefahrstoffverzeichnis-excel-vorlage/" className="gqr-link">
            gratis Excel-Vorlage
          </Link>{' '}
          und vergleichen Sie den Pflegeaufwand. Für Fachtiefe:{' '}
          <Link href="/wissen/gefahrstoffkataster-software/" className="gqr-link">
            Leitfaden Gefahrstoffkataster Software
          </Link>
          . Lagerkonflikte prüfen:{' '}
          <Link href="/trgs-510-zusammenlagerungs-check/" className="gqr-link">
            TRGS-510-Checker
          </Link>
          .
        </p>
      </LandingProseSection>
    </LandingPageWrapper>
  );
}
