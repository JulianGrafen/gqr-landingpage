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
        title="ROI-Rechner: Versteckte Personalkosten vs. Systemgestützte Prozesse"
        subline="Die manuelle Pflege von Sicherheitsdatenblättern ist der teuerste Ineffizienz-Faktor im Arbeitsschutz. Berechnen Sie objektiv, ab wie vielen Gefahrstoffen der Einsatz einer Software die Personalkosten Ihrer Sicherheitsfachkraft signifikant senkt."
      />

      <LandingProseSection
        id="audit-sicherheit"
        eyebrow="Compliance & Haftung"
        title="Beweislastumkehr bei Audits: Warum Dateiformate keine Rechtssicherheit bieten"
        intro="Bei einer Betriebsprüfung oder nach einem Arbeitsunfall greift oft das Prinzip des Organisationsverschuldens. Behörden prüfen nicht, ob Sie eine Liste führen, sondern ob Ihr Prozess lückenlos und manipulationssicher ist."
      >
        <p>
          Ein <strong>Gefahrstoffverzeichnis nach § 6 GefStoffV</strong> ist ein lebendes Dokument. Die rechtliche Schwachstelle von Excel oder internen Wiki-Systemen liegt in der fehlenden Historisierung. Wenn ein Hersteller die Zusammensetzung eines Reinigers ändert und die SiFa die bestehende Tabellenzeile überschreibt, wird der historische Datenstand vernichtet. Kommt es zu einer Berufskrankheits-Meldung, fehlt dem Unternehmen der revisionssichere Nachweis der damaligen Expositionsbedingungen.
        </p>
        <p>
          <strong>Die Kausalkette der TRGS 400:</strong> Arbeitsschutz ist interdependent. Eine Änderung der H-Sätze im Sicherheitsdatenblatt (SDB) erfordert zwingend eine Neuüberprüfung der Gefährdungsbeurteilung (GB) und ein Update der Betriebsanweisung für die Unterweisung (<strong>§ 14 GefStoffV</strong>). Manuelle Systeme trennen diese Daten in Datensilos. Eine spezialisierte Gefahrstoffkataster-Software synchronisiert diese Kette: Ein SDB-Update triggert automatisiert den Revisionsbedarf für alle verknüpften Dokumente und Lagerorte.
        </p>
        <p>
          <strong>Der Stichtag Mai 2026:</strong> Der Ablauf der CLP-Übergangsfrist zwingt Unternehmen, bestehende Gemische auf neue Gefahrenklassen (z. B. endokrine Disruptoren) zu prüfen. Die manuelle Sichtung hunderter PDFs ist in der Praxis fehleranfällig und bindet enorme Ressourcen. GQR zwingt den Bestand durch automatisierte Abgleiche in die neue gesetzliche Norm.
        </p>
      </LandingProseSection>

      <LandingProseSection
        id="ki-prozess-grenzen"
        eyebrow="Technologie-Check"
        title="KI-Extraktion: Faktenbasierte Automatisierung mit SiFa-Freigabe"
        variant="raised"
        intro="Künstliche Intelligenz im Arbeitsschutz ist kein Autopilot, der die SiFa ersetzt. Sie ist ein hochspezialisierter Assistent für die Datenaufbereitung."
      >
        <p>
          Der Versuch, Gefahrstoffmanagement zu 100 % zu automatisieren, scheitert an der rechtlichen Realität: Die Betreiberverantwortung bleibt beim Unternehmen. GQR nutzt KI, um H-Sätze, P-Sätze, CAS-Nummern und Lagerklassen aus unstrukturierten Hersteller-SDBs in Sekunden zu extrahieren. <strong>Der realistische Prozess:</strong> Das System übernimmt die Fleißarbeit der Dateneingabe, aber die Sicherheitsfachkraft behält die Kontrollinstanz. Ein Stoff wird erst durch die fachliche Freigabe im System "scharf" geschaltet.
        </p>
        <p>
          <strong>TRGS 600 & Substitutionsprüfung:</strong> Ein Kernvorteil digitaler Datenbanken ist die proaktive Identifikation von Gefahrstoffen. Das System flaggt CMR-Stoffe (krebserzeugend, mutagen, reprotoxisch) automatisch. Dadurch liefert die Software der Geschäftsführung belastbare Daten für die gesetzlich geforderte Ersatzstoffprüfung, die in unübersichtlichen Tabellen oft jahrelang ignoriert wird.
        </p>
      </LandingProseSection>

      <div className="gqr-container py-14 lg:py-20">
        <ManualVsGqrComparison
          targetAudience={KATASTER_SOFTWARE_COMPARISON.targetAudience}
          comparison={{
            leftColumnTitle: 'Manuelle Pflege (Excel / Ordner)',
            rightColumnTitle: 'Systemgestützt (Gefahrstoff-QR)',
            rows: [...KATASTER_SOFTWARE_COMPARISON.rows],
          }}
        />
      </div>

      <LandingProseSection
        id="auswahl-nachteile"
        eyebrow="Investitionsentscheidung"
        title="Evaluation: Wann sich der Umstieg lohnt — und wann nicht"
        intro="Eine ehrliche Betrachtung der Voraussetzungen für die Einführung einer Arbeitsschutz-Software im Mittelstand."
      >
        <h3>Die harten Fakten: Der Setup-Aufwand</h3>
        <p>
          Software zaubert nicht. Der initiale Wechsel von einer historisch gewachsenen Papier- oder Excel-Ablage in ein strukturiertes System erfordert Zeit und Disziplin. Bestehende SDBs müssen einmalig hochgeladen und verifiziert werden. Der Return on Investment entsteht nicht an Tag 1, sondern ab dem ersten Aktualisierungszyklus oder dem nächsten Audit, wenn die revisionssicheren Daten auf Knopfdruck bereitstehen.
        </p>

        <h3>Fokus auf den Kernprozess</h3>
        <p>
          Achten Sie bei der Auswahl darauf, keine überdimensionierten ERP-Suiten einzukaufen, wenn Sie lediglich Ihr Gefahrstoff-Compliance-Problem lösen wollen. GQR ist als "Low-Friction"-System konzipiert. Es verzichtet auf langwierige IT-Integrationsprojekte. Die Kernfunktionen beschränken sich auf das Wesentliche: (1) Automatisierte SDB-Extraktion, (2) TRGS-510-Konfliktprüfung für Lagerorte und (3) die Bereitstellung von Notfallmaßnahmen via QR-Code direkt am Einsatzort.
        </p>

        <h3>Nächste rationale Schritte</h3>
        <p>
          Um zu prüfen, ob Ihre aktuelle Tabellenlösung rechtlichen Standards standhält, nutzen Sie unsere{' '}
          <Link href="/gefahrstoffverzeichnis-excel-vorlage/" className="gqr-link">
            Struktur-Vorlage für Excel
          </Link>
          . Reicht diese für Ihr Volumen nicht mehr aus, hilft unser{' '}
          <Link href="/wissen/gefahrstoffkataster-software/" className="gqr-link">
            Leitfaden zur System-Evaluation
          </Link>
          . Für die direkte Identifikation von Lager-Risiken empfehlen wir vorab den{' '}
          <Link href="/trgs-510-zusammenlagerungs-check/" className="gqr-link">
            TRGS-510-Checker
          </Link>
          .
        </p>
      </LandingProseSection>
    </LandingPageWrapper>
  );
}