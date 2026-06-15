import Link from 'next/link';
import { ManualVsGqrComparison } from '@/components/deepinfo/ManualVsGqrComparison';
import { LandingHeroWithMedia } from '@/components/seo-silo/LandingHeroWithMedia';
import { LandingPageWrapper } from '@/components/seo-silo/LandingPageWrapper';
import { LandingProseSection } from '@/components/seo-silo/LandingProseSection';
import { LandingSplitMediaSection } from '@/components/seo-silo/LandingSplitMediaSection';
import {
  GEFAHrstoff_APP_COMPARISON,
  GEFAHrstoff_APP_SILO_CONFIG,
} from '@/config/seo-silo/pages/gefahrstoff-app';

export function GefahrstoffAppSiloPage() {
  return (
    <LandingPageWrapper
      config={GEFAHrstoff_APP_SILO_CONFIG}
      heroSlot={
        <LandingHeroWithMedia
          hero={GEFAHrstoff_APP_SILO_CONFIG.hero}
          imageVariant="portrait"
          image={{
            src: '/images/app-gefahrstoff-detail-mobile.jpg',
            webpSrc: '/images/app-gefahrstoff-detail-mobile.webp',
            alt: 'Gefahrstoff App: mobile Ansicht mit GHS-Piktogrammen, P-Sätzen und Notfall-Buttons',
            width: 390,
            height: 844,
          }}
        />
      }
    >
      <LandingSplitMediaSection
        id="qr-scan-demo"
        eyebrow="Scan am Fass"
        title="Im Ernstfall zählt jede Sekunde — nicht der Ordner im Büro"
        lead="QR-Code am Gebinde öffnet die Notfallansicht auf dem Smartphone: Signalwort, GHS, Erste-Hilfe und Herstellerkontakt — ohne Login für Ersthelfer."
        bullets={[
          'Scan am Regal, Container oder Werkstattwagen',
          'Strukturierte Notfallinfos statt PDF-Blättern',
          'Verknüpfung zum tagesaktuellen Katastereintrag',
        ]}
        media={{
          src: '/images/notfall-qr-scan-demo.gif?v=2',
          alt: 'Demonstration: Smartphone scannt Gefahrstoff-QR-Code am Gebinde und öffnet die Notfallansicht',
          width: 473,
          height: 1024,
        }}
        mediaVariant="portrait"
        reverse
        cta={{
          label: 'QR-Workflow testen',
          href: 'https://app.gefahrstoff-qr.de/register',
          external: true,
        }}
      />

      <LandingProseSection
        id="einsatzort"
        eyebrow="TRGS 400 & § 6 GefStoffV"
        title="Warum Server-SDBs am Lager nichts bringen"
        intro="Information muss am Arbeitsplatz wirksam sein — nicht nur archiviert sein."
      >
        <p>
          <strong>§ 6 GefStoffV</strong> verpflichtet zur Bereitstellung von Gefahrstoffinformationen
          für Beschäftigte. <strong>TRGS 400</strong> präzisiert: Unterweisung und Information müssen
          verständlich und am Arbeitsplatz verfügbar sein. Ein Sicherheitsdatenblatt auf dem
          Intranet erfüllt das nicht, wenn die Mechanikerin am Hebebühne-Standort steht und im
          Ernstfall H- und P-Sätze braucht.
        </p>
        <p>
          Papierausdrucke sind besser als nichts — veralten aber still: Lieferantenwechsel,
          CLP-Anpassung bis <strong>Mai 2026</strong>, neue Rezepturen. Der Ausdruck am Regal zeigt
          alte P-Sätze, während die SiFa die neue Version bereits im Büro abgelegt hat. Das ist
          kein theoretisches Risiko — BG-Kontrollen prüfen <em>wirksame</em> Information vor Ort.
        </p>
        <p>
          <strong>Ersthelfer</strong> brauchen Maßnahmen aus SDB Abschnitt 4 in Sekunden. Wer
          zuerst den SiFa anruft, statt zu handeln, verliert Zeit. Eine Gefahrstoff-App mit
          QR-Notfallpass adressiert genau diese Lücke — ohne parallele Papierpflege.
        </p>
      </LandingProseSection>

      <div className="gqr-container py-14 lg:py-20">
        <ManualVsGqrComparison
          targetAudience={GEFAHrstoff_APP_COMPARISON.targetAudience}
          comparison={{
            leftColumnTitle: 'Ordner / Ausdruck am Lager',
            rightColumnTitle: 'Gefahrstoff-QR (mobil)',
            rows: [...GEFAHrstoff_APP_COMPARISON.rows],
          }}
        />
      </div>

      <LandingProseSection
        id="baustelle"
        eyebrow="Praxis"
        title="Werkstatt, Baustelle, Lager — ein Muster für mobile Gefahrstoff-Info"
        variant="raised"
      >
        <h3>Baustelle und wechselnde Standorte</h3>
        <p>
          Container-Lager und temporäre Baustellen haben selten ein festes Büro mit SDB-Ordner.
          QR-Labels am Gebinde wandern mit dem Stoff — die Information bleibt verknüpft. SiFa pflegt
          zentral im Kataster; Teams vor Ort scannen ohne Excel-Listen mitzuschleppen.
        </p>

        <h3>Werkstatt und Produktion</h3>
        <p>
          Öle, Reiniger, Lackierungsmittel: viele Gebinde, hohe Unfallwahrscheinlichkeit. Mobile
          Ansicht zeigt neben Notfallinfos auch die <strong>Betriebsanweisung</strong> — ohne
          ausgedruckte Word-Version, die seit dem letzten SDB-Update nicht ersetzt wurde.
        </p>

        <h3>Verbindung zum digitalen Kataster</h3>
        <p>
          Die App-Ansicht ist kein Insellösung. Sie hängt am{' '}
          <Link href="/gefahrstoffkataster-software/" className="gqr-link">
            Gefahrstoffkataster
          </Link>{' '}
          mit KI-SDB-Import und revisionssicherem{' '}
          <Link href="/trgs-510-zusammenlagerungs-check/" className="gqr-link">
            TRGS-510-Check
          </Link>
          . Wer noch in Excel startet:{' '}
          <Link href="/gefahrstoffverzeichnis-excel-vorlage/" className="gqr-link">
            gratis Vorlage
          </Link>{' '}
          — der mobile QR-Schritt ist das Upgrade für den Einsatzort.
        </p>
      </LandingProseSection>
    </LandingPageWrapper>
  );
}
