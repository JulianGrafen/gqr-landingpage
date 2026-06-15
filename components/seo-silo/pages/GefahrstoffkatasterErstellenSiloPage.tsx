import Link from 'next/link';
import { ManualVsGqrComparison } from '@/components/deepinfo/ManualVsGqrComparison';
import { LandingHeroWithMedia } from '@/components/seo-silo/LandingHeroWithMedia';
import { LandingPageWrapper } from '@/components/seo-silo/LandingPageWrapper';
import { LandingProseSection } from '@/components/seo-silo/LandingProseSection';
import { LandingStepsSection } from '@/components/seo-silo/LandingStepsSection';
import {
  KATASTER_ERSTELLEN_COMPARISON,
  KATASTER_ERSTELLEN_SILO_CONFIG,
  KATASTER_ERSTELLEN_STEPS,
} from '@/config/seo-silo/pages/gefahrstoffkataster-erstellen';

export function GefahrstoffkatasterErstellenSiloPage() {
  return (
    <LandingPageWrapper
      config={KATASTER_ERSTELLEN_SILO_CONFIG}
      heroSlot={
        <LandingHeroWithMedia
          hero={KATASTER_ERSTELLEN_SILO_CONFIG.hero}
          image={{
            src: '/images/aktivitätsprotokoll.jpeg',
            alt: 'Aktivitäten-Protokoll in Gefahrstoff-QR: revisionssichere Nachweise beim Gefahrstoffkataster erstellen',
            width: 1180,
            height: 665,
          }}
        />
      }
    >
      <LandingStepsSection
        id="schritte"
        title="6 Schritte zum Gefahrstoffkataster — nach TRGS und GefStoffV"
        subline="Reihenfolge, die SiFa, BG und Behörden erwarten — unabhängig davon, ob Sie Excel, Papier oder Software nutzen."
        steps={KATASTER_ERSTELLEN_STEPS}
      />

      <LandingProseSection
        id="fehler"
        eyebrow="Typische Fehler"
        title="Warum Kataster-Projekte scheitern — bevor das erste Audit kommt"
        intro="Nicht aus Unwissenheit, sondern weil Werkzeuge und Prozesse nicht zusammenpassen."
      >
        <p>
          <strong>Fehler 1 — Mit Excel starten ohne Exit-Strategie:</strong> Die Liste wächst,
          SDB-PDFs liegen im Ordner, die Tabelle kennt keine Versionen. Nach dem zweiten
          Lieferantenwechsel ist niemand sicher, welche Zeile stimmt.
        </p>
        <p>
          <strong>Fehler 2 — GB und Verzeichnis getrennt pflegen:</strong> TRGS 400 verlangt
          kohärente Information. Wenn die GB auf veralteten Mengen basiert, ist der ganze Aufwand
          rechtlich wacklig.
        </p>
        <p>
          <strong>Fehler 3 — Unterweisung ohne Nachweis:</strong> § 14 GefStoffV ist kein
          Vortrag ohne Protokoll. Wer unterweist, muss dokumentieren — idealerweise auf dem
          Datenstand, den Beschäftigte am Arbeitsplatz auch abrufen können.
        </p>
        <p>
          <strong>Fehler 4 — CLP-Umstellung ignorieren:</strong> Bis{' '}
          <strong>Mai 2026</strong> müssen Gemische an neue H-/P-Sätze angepasst werden. Ein
          Kataster ohne Update-Prozess dokumentiert das nicht — Prüfer schon.
        </p>
      </LandingProseSection>

      <div className="gqr-container py-14 lg:py-20">
        <ManualVsGqrComparison
          targetAudience={KATASTER_ERSTELLEN_COMPARISON.targetAudience}
          comparison={{
            leftColumnTitle: 'Manuell (Excel / Word / Ordner)',
            rightColumnTitle: 'Gefahrstoff-QR (Prozess)',
            rows: [...KATASTER_ERSTELLEN_COMPARISON.rows],
          }}
        />
      </div>

      <LandingProseSection
        id="ressourcen"
        eyebrow="Weiterführend"
        title="Vorlagen, Software und externe Hilfe — was wann sinnvoll ist"
        variant="raised"
      >
        <h3>Einstieg mit Excel-Vorlage</h3>
        <p>
          Für die Erstaufnahme weniger Stoffe:{' '}
          <Link href="/gefahrstoffverzeichnis-excel-vorlage/" className="gqr-link">
            gratis Excel-Vorlage
          </Link>{' '}
          mit Pflichtfeld-Struktur — wissen Sie aber, wo Excel rechtlich endet.
        </p>

        <h3>Software für laufenden Betrieb</h3>
        <p>
          Ab regelmäßigen SDB-Updates und mehreren Standorten:{' '}
          <Link href="/gefahrstoffkataster-software/" className="gqr-link">
            Gefahrstoffkataster Software
          </Link>{' '}
          mit ROI- und Audit-Fokus — statt Tabellenpflege.
        </p>

        <h3>Information am Einsatzort</h3>
        <p>
          Schritt 5 und 6 brauchen Abrufbarkeit vor Ort:{' '}
          <Link href="/gefahrstoff-app/" className="gqr-link">
            Gefahrstoff App
          </Link>{' '}
          mit QR-Notfallpass am Gebinde.
        </p>

        <h3>Extern erstellen lassen?</h3>
        <p>
          Einmalige Beraterleistung vs. eigener Prozess:{' '}
          <Link href="/wissen/gefahrstoffkataster-erstellen-lassen/" className="gqr-link">
            Kataster erstellen lassen — Abwägung
          </Link>
          .
        </p>
      </LandingProseSection>
    </LandingPageWrapper>
  );
}
