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
        subline="Die exakte Vorgehensweise, die Auditoren und die Berufsgenossenschaft erwarten — unabhängig davon, ob Sie manuell starten oder den Prozess digitalisieren."
        steps={KATASTER_ERSTELLEN_STEPS}
      />

      <LandingProseSection
        id="fehler"
        eyebrow="Haftungsrisiken & Prozessfehler"
        title="Warum manuell erstellte Kataster bei Audits scheitern"
        intro="Ein Gefahrstoffverzeichnis ist kein starres Dokument, sondern ein lebender Compliance-Prozess. Die meisten Projekte scheitern nicht an mangelnder Fachkenntnis der SiFa, sondern an Werkzeugen, die nicht skalieren."
      >
        <p>
          <strong>1. Das Excel-Paradoxon (Fehlende Revisionssicherheit):</strong> 
          § 6 GefStoffV fordert eine lückenlose Informationsermittlung. Eine Excel-Tabelle wächst zwar schnell, kennt aber keine Historie. Wenn ein Lieferant das Sicherheitsdatenblatt (SDB) aktualisiert und Sie die Zeile überschreiben, löschen Sie den historischen Nachweis. Kommt es Jahre später zu einer Berufskrankheit, können Sie nicht mehr rechtssicher belegen, mit welchem Datenstand der Mitarbeiter damals gearbeitet hat.
        </p>
        <p>
          <strong>2. Trennung von Verzeichnis und Gefährdungsbeurteilung (TRGS 400):</strong> 
          Ein häufiger Fehler ist die isolierte Pflege. Das Verzeichnis listet Stoffe, aber die Gefährdungsbeurteilung (GB) liegt als totes Word-Dokument auf dem Server. Nach TRGS 400 bedingt jede Änderung an Einstufung oder Menge zwingend eine Prüfung der GB. Manuelle Systeme können diese kausale Kette nicht automatisiert triggern — die Dokumente laufen asynchron.
        </p>
        <p>
          <strong>3. Unterweisungs-Lücken (§ 14 GefStoffV):</strong> 
          Eine Betriebsanweisung zu schreiben ist der erste Schritt; die nachweisliche Unterweisung der Belegschaft der zweite. Wenn H- und P-Sätze angepasst werden, muss nachgeschult werden. Ohne ein System, das Änderungen protokolliert und die SiFa alarmiert, arbeiten Mitarbeiter schnell nach veralteten Schutzmaßnahmen.
        </p>
        <p>
          <strong>4. Die CLP-Übergangsfrist unterschätzen (Mai 2026):</strong> 
          Bis zum 1. Mai 2026 müssen alle chemischen Gemische auf die neuen CLP-Vorgaben (inkl. endokriner Disruptoren) umgestellt sein. Es ist eine Illusion zu glauben, dass eine einzelne Sicherheitsfachkraft Hunderte SDB-PDFs manuell öffnen, sichten und die alten H-Sätze fehlerfrei in Betriebsanweisungen abändern kann. Ohne automatisierte Extraktion wird dieser Stichtag für viele Betriebe zum Haftungsrisiko.
        </p>
      </LandingProseSection>

      <div className="gqr-container py-14 lg:py-20">
        <ManualVsGqrComparison
          targetAudience={KATASTER_ERSTELLEN_COMPARISON.targetAudience}
          comparison={{
            leftColumnTitle: 'Manuell (Excel / Word / Ordner)',
            rightColumnTitle: 'Digital (Gefahrstoff-QR)',
            rows: [...KATASTER_ERSTELLEN_COMPARISON.rows],
          }}
        />
      </div>

      <LandingProseSection
        id="ressourcen"
        eyebrow="Ressourcenplanung & Realitätscheck"
        title="Vorlagen, Software und externe Hilfe — Was ist rational sinnvoll?"
        variant="raised"
      >
        <h3>1. Der Einstieg: Kostenlose Excel-Vorlage</h3>
        <p>
          Wenn Ihr Betrieb weniger als 15 ungefährliche Stoffe (z.B. einfache Reinigungsmittel) führt, ist ein massives Software-Rollout betriebswirtschaftlich oft nicht darstellbar. Nutzen Sie unsere{' '}
          <Link href="/gefahrstoffverzeichnis-excel-vorlage/" className="gqr-link">
            strukturierte Excel-Vorlage
          </Link>{' '}
          für die Erstaufnahme. <strong>Der faktische Nachteil:</strong> Sie tragen die volle Verantwortung für die händische Nachverfolgung von SDB-Aktualisierungen. 
        </p>

        <h3>2. Der Skalierer: Gefahrstoffkataster Software</h3>
        <p>
          Sobald Sie die Schwelle zu komplexeren Zusammenlagerungen (TRGS 510) überschreiten oder mehrere Standorte verwalten, fressen manuelle Word-Templates die Zeit der SiFa auf. Eine spezialisierte{' '}
          <Link href="/gefahrstoffkataster-software/" className="gqr-link">
            Gefahrstoffkataster Software
          </Link>{' '}
          automatisiert den SDB-Import und sichert Audits ab. <strong>Der Realitätscheck:</strong> Software zaubert nicht. Die initiale Überführung historisch gewachsener Ordnerstrukturen in das System erfordert einmalig Zeit und Disziplin. Der Return on Investment (Zeitersparnis und Rechtssicherheit) setzt erst nach dem initialen Setup ein.
        </p>

        <h3>3. Die letzte Meile: Information am Einsatzort</h3>
        <p>
          Das beste Kataster nützt nichts, wenn die Information das Büro nicht verlässt. Für Werkstätten und Baustellen löst die{' '}
          <Link href="/gefahrstoff-app/" className="gqr-link">
            Gefahrstoff App
          </Link>{' '}
          das Problem der Ad-hoc-Informationsbeschaffung. Ersthelfer scannen den QR-Code am Gebinde und erhalten sofort die Erste-Hilfe-Maßnahmen.
        </p>

        <h3>4. Outtasking: Externe Erstellung</h3>
        <p>
          Fehlen intern die Kapazitäten komplett, können Sie das initial{' '}
          <Link href="/wissen/gefahrstoffkataster-erstellen-lassen/" className="gqr-link">
            Kataster extern erstellen lassen
          </Link>
          . Das verlagert die Arbeitslast kurzfristig, entbindet die Geschäftsführung aber langfristig nicht von der gesetzlichen Betreiberverantwortung.
        </p>
      </LandingProseSection>
    </LandingPageWrapper>
  );
}