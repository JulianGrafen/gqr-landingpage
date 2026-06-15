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
        eyebrow="Haftung & Praxis"
        title="Warum Excel rechtlich nicht mehr reicht — auch mit guter Vorlage"
        intro="Eine saubere Tabelle ist kein Ersatz für ein Gefahrstoffmanagement-System. Diese Lücken sehen Prüfer regelmäßig."
      >
        <p>
          Die <strong>Informationsermittlung nach § 6 GefStoffV</strong> verlangt, dass Sie
          Gefahrstoffinformationen aktuell halten — nicht nur einmal erfassen. Excel speichert
          weder, welche SDB-Version einem Eintrag zugrunde liegt, noch wer eine Zelle geändert
          hat. Bei einem Arbeitsunfall oder einer BG-Inspektion müssen Sie das Gegenteil beweisen.
        </p>
        <p>
          Hinzu kommt die <strong>CLP-Übergangsfrist für Gemische bis Mai 2026</strong>: Alte
          H- und P-Sätze müssen angepasst werden. In einer Tabellenkalkulation pflegen das
          Sicherheitsfachkräfte Zeile für Zeile — fehleranfällig und ohne Alarm bei veralteten
          Einträgen.
        </p>
        <p>
          Für die <strong>Gefährdungsbeurteilung nach TRGS 400</strong> reicht die Liste allein
          nicht: Exposition, Schutzmaßnahmen und Substitution brauchen Verknüpfung zum SDB.
          Betriebsanweisungen aus Word-Templates zu pflegen, kostet viele SiFa-Stunden pro Jahr —
          vor allem, wenn Rezepturen und Lieferanten wechseln.
        </p>
        <p>
          Wer Stoffe lagert, muss <strong>TRGS 510</strong> beachten. Excel kann
          Zusammenlagerungsverbote nicht zuverlässig prüfen — ein übersehener Konflikt zwischen
          Lagerklassen wird erst bei Feuerwehr- oder Umweltbegehung sichtbar.
        </p>
      </LandingProseSection>

      <div className="gqr-container py-14 lg:py-20">
        <ManualVsGqrComparison
          targetAudience={EXCEL_VORLAGE_COMPARISON.targetAudience}
          comparison={{
            leftColumnTitle: 'Excel-Vorlage / Tabellenkalkulation',
            rightColumnTitle: 'Gefahrstoff-QR (GQR)',
            rows: [...EXCEL_VORLAGE_COMPARISON.rows],
          }}
        />
      </div>

      <LandingProseSection
        id="seo-leitfaden"
        eyebrow="Leitfaden"
        title="Gefahrstoffverzeichnis erstellen: Vorlage, Pflichten, nächster Schritt"
        variant="raised"
      >
        <h3>Gefahrstoffverzeichnis Vorlage Excel — der pragmatische Einstieg</h3>
        <p>
          Wer nach „Gefahrstoffverzeichnis Vorlage Excel“ oder „Gefährdungsbeurteilung
          Gefahrstoffe Excel“ sucht, braucht zuerst Struktur: Produktname, Kennzeichnung,
          Lagerklasse, Mengen, Verwendungsort, Verantwortliche. Unsere kostenlose XLSX spart
          Formatierungszeit und orientiert sich an Feldern, die interne Audits und externe Prüfer
          typischerweise abfragen.
        </p>

        <h3>Gefährdungsbeurteilung und Unterweisung — was die Vorlage nicht automatisiert</h3>
        <p>
          Die <strong>Gefährdungsbeurteilung</strong> nach GefStoffV und TRGS 400 verlangt
          nachvollziehbare Bewertung der Exposition — nicht nur eine Stoffliste.{' '}
          <strong>§ 14 GefStoffV</strong> verpflichtet zu regelmäßiger Unterweisung; die Vorlage
          bietet dafür Spalten, erinnert aber nicht an Fristen. Fehlende Unterweisungsnachweise
          sind ein häufiger Audit-Befund — unabhängig davon, ob die Liste in Excel oder Papier
          geführt wird.
        </p>

        <h3>Wann digitales Gefahrstoffmanagement die bessere Rechnung ist</h3>
        <p>
          Sobald SDB-Versionen wechseln, Standorte hinzukommen oder Mandanten getrennt geführt
          werden, skaliert manuelle Pflege nicht mehr wirtschaftlich. GQR übernimmt die
          Extraktion aus dem Sicherheitsdatenblatt, führt ein revisionssicheres{' '}
          <strong>Aktivitätsprotokoll</strong> und stellt{' '}
          <strong>Notfallinformationen per QR-Code am Gebinde</strong> bereit — dort, wo Ersthelfer
          sie brauchen, nicht im Büro-Ordner.
        </p>

        <div
          id="vorlage-download"
          className="gqr-content-panel mt-10 scroll-mt-28"
        >
          <h3 className="text-lg font-bold text-gqr-text">
            Audit-Vorbereitung: Gratis-Vorlage jetzt sichern
          </h3>
          <p className="mt-2 text-sm text-gqr-muted">
            {EXCEL_VORLAGE_SILO_CONFIG.seo.description}
          </p>
          <VorlageDownloadForm className="mt-6 !shadow-none" tone="dark" />
          <p className="mt-6 text-sm text-gqr-muted">
            Bereits überzeugt vom digitalen Weg?{' '}
            <Link
              href="https://app.gefahrstoff-qr.de/register"
              className="gqr-link"
              rel="noopener noreferrer"
            >
              GQR kostenlos testen
            </Link>{' '}
            — erste Stoffe ohne Kreditkarte, SDB-Import in Minuten.
          </p>
        </div>
      </LandingProseSection>
    </LandingPageWrapper>
  );
}
