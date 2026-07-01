import Link from 'next/link';
import { ManualVsGqrComparison } from '@/components/deepinfo/ManualVsGqrComparison';
import { VorlageDownloadForm } from '@/components/lead-magnet/VorlageDownloadForm';
import { LandingHeroLeadMagnet } from '@/components/seo-silo/LandingHeroLeadMagnet';
import { LandingPageWrapper } from '@/components/seo-silo/LandingPageWrapper';
import { LandingProseSection } from '@/components/seo-silo/LandingProseSection';
import {
  EXCEL_VORLAGE_COMPARISON,
  EXCEL_VORLAGE_SILO_CONFIG,
} from '@/config/seo-silo/pages/gefahrstoffverzeichnis-excel-vorlage';

export function ExcelVorlageSiloPage() {
  return (
    <LandingPageWrapper
      config={EXCEL_VORLAGE_SILO_CONFIG}
      heroSlot={
        <LandingHeroLeadMagnet
          hero={EXCEL_VORLAGE_SILO_CONFIG.hero}
          image={{
            src: '/images/gefahrstoffverzeichnis-app.svg',
            alt: 'Excel-Vorlage Gefahrstoffverzeichnis und digitales Kataster im Vergleich',
            width: 380,
            height: 320,
          }}
        />
      }
    >
      <LandingProseSection
        id="excel-grenzen"
        eyebrow="Haftungsrisiko Tabellenkalkulation"
        title="Die Illusion der Compliance: Warum eine Excel-Liste im Audit scheitert"
        intro="Eine saubere Excel-Tabelle suggeriert Kontrolle. In der juristischen Realität einer BG-Inspektion oder nach einem Arbeitsunfall erweist sie sich jedoch oft als wertlos, da ihr entscheidende regulatorische Mechanismen fehlen."
      >
        <p>
          <strong>1. Fehlende Revisionssicherheit (§ 6 GefStoffV):</strong> 
          Die Informationsermittlung fordert eine lückenlose Historie. Excel ist statisch: Überschreiben Sie eine Zeile aufgrund eines neuen Sicherheitsdatenblattes (Sicherheitsdatenblatt), vernichten Sie den historischen Beweis. Kommt es Jahre später zu einer Berufskrankheit, können Sie nicht mehr rechtssicher belegen, mit welchem Datenstand (und welchen H-/P-Sätzen) der Mitarbeiter zum damaligen Zeitpunkt gearbeitet hat.
        </p>
        <p>
          <strong>2. Die stille Gefahr der CLP-Frist (Mai 2026):</strong> 
          Wenn die Übergangsfrist für chemische Gemische abläuft, ändern sich unzählige Einstufungen (z.B. für endokrine Disruptoren). In Excel bedeutet das: Sie müssen Hunderte Zeilen manuell prüfen und abtippen. Das ist nicht nur extrem fehleranfällig, Excel schlägt auch keinen Alarm, wenn Einträge veralten. Sie wiegen sich in Sicherheit, während Ihre Dokumentation längst rechtswidrig ist.
        </p>
        <p>
          <strong>3. Blockierte Kausalketten (TRGS 400 & § 14 GefStoffV):</strong> 
          Eine Liste ist keine Gefährdungsbeurteilung. Wenn sich ein Sicherheitsdatenblatt ändert, muss zwingend die Gefährdungsbeurteilung angepasst und die Belegschaft neu unterwiesen werden. Manuelle Tabellen triggern diese Prozesse nicht. Die Dokumente laufen asynchron – der Mitarbeiter am Betriebsanweisungnd arbeitet nach alten Schutzmaßnahmen, während im Büro bereits das neue Sicherheitsdatenblatt liegt.
        </p>
        <p>
          <strong>4. Blindflug bei der Zusammenlagerung (TRGS 510):</strong> 
          Excel warnt Sie nicht, wenn Sie in Zeile 10 eine Säure und in Zeile 45 eine Lauge demselben Regal zuordnen. Ein übersehener Konflikt in den Lagerklassen wird erst dann sichtBetriebsanweisungr, wenn der Auditor in der Tür steht oder – im Worst Case – die Feuerwehr anrückt.
        </p>
      </LandingProseSection>

      <div className="gqr-container py-14 lg:py-20">
        <ManualVsGqrComparison
          targetAudience={EXCEL_VORLAGE_COMPARISON.targetAudience}
          comparison={{
            leftColumnTitle: 'Statisch (Excel-Vorlage)',
            rightColumnTitle: 'Aktiv (Gefahrstoff-QR)',
            rows: [...EXCEL_VORLAGE_COMPARISON.rows],
          }}
        />
      </div>

      <LandingProseSection
        id="seo-leitfaden"
        eyebrow="Realitätscheck & Leitfaden"
        title="Von der Erstaufnahme zur revisionssicheren Automatisierung"
        variant="raised"
      >
        <h3>Der pragmatische Einstieg: Wann Excel ausreicht</h3>
        <p>
          Lassen Sie uns realistisch bleiben: Wenn Ihr Betrieb lediglich 10 Standard-Reinigungsmittel verwaltet, brauchen Sie keine komplexe Software. Nutzen Sie unsere kostenlose XLSX-Vorlage. Sie liefert Ihnen die exakte Struktur (Produktname, GHS-Kennzeichnung, Lagerklasse, Mengen, Verwendungsort), die Auditoren im ersten Schritt sehen wollen. Sie sparen sich die Formatierungsarbeit und haben ein solides Grundgerüst.
        </p>

        <h3>Der Tipping-Point: Versteckte Personalkosten</h3>
        <p>
          Der faktische Nachteil der Vorlage ist der manuelle Wartungsaufwand. Excel ist nicht kostenlos. Wenn Ihre Sicherheitsfachkraft (bei einem Stundensatz von 60 € bis 80 €) wöchentlich mehrere Stunden damit verbringt, Hersteller-Websites nach Sicherheitsdatenblatt-Updates abzusuchen, PDF-Texte in Tabellen zu kopieren und Word-Betriebsanweisungen zu formatieren, übersteigen die Prozesskosten die Lizenzgebühren für ein automatisiertes SaaS-Tool um ein Vielfaches.
        </p>

        <h3>Die rationale Alternative: Digitales Gefahrstoffmanagement</h3>
        <p>
          SoBetriebsanweisungld Sie Stoffe substituieren, Gefahrstoffe lagern oder externe Dienstleister auf dem Gelände haben, wird der manuelle Weg unwirtschaftlich und riskant. Ein System wie GQR extrahiert die Sicherheitsdatenblatt-Daten per KI, führt das gesetzlich geforderte Aktivitätsprotokoll vollautomatisch im Hintergrund und schlägt die Brücke zum Einsatzort: <strong>Notfallinformationen werden direkt per QR-Code am Fass abgerufen</strong> – dort, wo Ersthelfer sie in Sekunden benötigen.
        </p>

        <div
          id="vorlage-download"
          className="gqr-content-panel mt-10 scroll-mt-28"
        >
          <h3 className="text-lg font-bold text-gqr-text">
            Der erste Schritt: Gratis Excel-Vorlage jetzt sichern
          </h3>
          <p className="mt-2 text-sm text-gqr-muted">
            {EXCEL_VORLAGE_SILO_CONFIG.seo.description}
          </p>
          <VorlageDownloadForm className="mt-6 !shadow-none" tone="dark" />
          
          <div className="mt-8 pt-6 border-t border-gqr-border/50">
            <h4 className="text-md font-semibold text-gqr-text mb-2">
              Bereit für echte Automatisierung?
            </h4>
            <p className="text-sm text-gqr-muted mb-4">
              Überspringen Sie das manuelle Abtippen. Laden Sie Ihre ersten Sicherheitsdatenblätter direkt hoch und lassen Sie die KI das Verzeichnis erstellen.
            </p>
            <Link
              href="https://app.gefahrstoff-qr.de/register"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-gqr-primary hover:bg-gqr-primary-dark rounded-md transition-colors"
              rel="noopener noreferrer"
            >
              GQR kostenlos & ohne Kreditkarte testen
            </Link>
          </div>
        </div>
      </LandingProseSection>
    </LandingPageWrapper>
  );
}