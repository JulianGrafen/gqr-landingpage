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
        eyebrow="Ad-hoc Informationsbeschaffung"
        title="Im Ernstfall entscheidet die Reaktionszeit, nicht die Ablage im Büro"
        lead="Ein Gefahrstoffaustritt wartet nicht, bis das richtige Sicherheitsdatenblatt auf dem Firmenserver gefunden ist. Der Scan am Gebinde liefert Ersthelfern sofort die überlebenswichtigen H- und P-Sätze – ohne Betriebsanweisungrriere, direkt am Gefahrenherd."
        bullets={[
          'Sekundenschneller Scan an Regalen, IBC-Containern oder Werkstattwagen',
          'Direkter Zugriff auf Erste-Hilfe-Maßnahmen (Sicherheitsdatenblatt Abschnitt 4) ohne Login',
          'Garantierte Aktualität durch Echtzeit-Synchronisation mit dem Hauptkataster',
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
          label: 'QR-Notfall-Workflow testen',
          href: 'https://app.gefahrstoff-qr.de/register',
          external: true,
        }}
      />

      <LandingProseSection
        id="regulatorik-haftung"
        eyebrow="Compliance nach TRGS 400 & § 6 GefStoffV"
        title="Die Illusion der digitalen Ablage: Warum Server-Sicherheitsdatenblatts rechtlich oft wertlos sind"
        intro="Arbeitsschutzinformationen müssen am Arbeitsplatz wirksam sein. Ein PDF im Intranet nützt dem Mechaniker an der Hebebühne nichts, wenn er mit einem ätzenden Stoff in Kontakt kommt."
      >
        <p>
          Der Gesetzgeber ist eindeutig: <strong>§ 6 der Gefahrstoffverordnung (GefStoffV)</strong> verpflichtet den Arbeitgeber zur aktiven Bereitstellung von Gefahrstoffinformationen. Die <strong>TRGS 400</strong> präzisiert diesen Anspruch: Unterweisung und Information müssen für die Beschäftigten verständlich und vor allem am jeweiligen Arbeitsplatz jederzeit zugänglich sein. Ein zentrales Netzlaufwerk erfüllt diese Anforderung in der Praxis dezentraler Teams nicht.
        </p>
        <p>
          Der Versuch, dieses Problem mit Papierausdrucken zu lösen, führt unweigerlich in eine Haftungsfalle. Papier veraltet stillschweigend. Durch Lieferantenwechsel, Rezepturanpassungen oder die <strong>Ablauffrist der CLP-Verordnung für Gemische im Mai 2026</strong> ändern sich Gefahrenklassen und Schutzmaßnahmen kontinuierlich. Der laminierte Ausdruck am Regal zeigt alte, teils gefährliche P-Sätze, während die Sicherheitsfachkraft (SiFa) die neue Sicherheitsdatenblatt-Version längst im Büro abgelegt hat. Bei BG-Kontrollen oder nach Arbeitsunfällen wird genau diese Diskrepanz geprüft.
        </p>
        <p>
          <strong>Der First-Responder-Faktor:</strong> Ersthelfer benötigen im Notfall sofortige, unmissverständliche Anweisungen. Wer in einer Stresssituation erst Vorgesetzte anrufen oder in Leitz-Ordnern blättern muss, verliert wertvolle Zeit. Ein QR-Code-Betriebsanweisungsierter Ansatz schließt diese Lücke, indem er die tagesaktuellen Notfallmaßnahmen physisch an das Gebinde bindet – ohne den administrativen Overhead einer parallelen Papierpflege.
        </p>
      </LandingProseSection>

      <div className="gqr-container py-14 lg:py-20">
        <ManualVsGqrComparison
          targetAudience={GEFAHrstoff_APP_COMPARISON.targetAudience}
          comparison={{
            leftColumnTitle: 'Klassischer Ordner / Papier am Lager',
            rightColumnTitle: 'Gefahrstoff-QR (Mobile Ansicht)',
            rows: [...GEFAHrstoff_APP_COMPARISON.rows],
          }}
        />
      </div>

      <LandingProseSection
        id="einsatzszenarien"
        eyebrow="Praxisanwendung"
        title="Werkstatt, Betriebsanweisungustelle, Produktion: Eine Architektur für jeden Einsatzort"
        variant="raised"
      >
        <h3>Betriebsanweisungustellen und temporäre Arbeitsplätze</h3>
        <p>
          Auf Betriebsanweisungustellen fehlt oft die grundlegende IT-Infrastruktur für klassische Softwarelösungen. Gefahrstoffe wandern mit den Subunternehmern und Teams. QR-Labels, die direkt auf die Behälter geklebt werden, lösen die Ortsbindung auf. Die SiFa pflegt die Daten zentral und revisionssicher im Kataster; die Teams vor Ort scannen das Gebinde mit jedem handelsüblichen Smartphone, ohne dicke Excel-Mappen mitschleppen zu müssen.
        </p>

        <h3>Produktion und Werkstätten</h3>
        <p>
          Im Umgang mit Schmierstoffen, Industriereinigern oder Lacken ist die Unfallwahrscheinlichkeit hoch. Eine verschmutzte Arbeitsumgebung zerstört Papierdokumente schnell. Die mobile Ansicht liefert hier nicht nur Erste-Hilfe-Maßnahmen, sondern auch die exakte <strong>Betriebsanweisung nach § 14 GefStoffV</strong>. Das eliminiert das Risiko, dass Mitarbeiter nach veralteten Word-Dokumenten arbeiten, die seit dem letzten Sicherheitsdatenblatt-Update nicht mehr manuell ausgetauscht wurden.
        </p>

        <h3>Das Fundament: Verknüpfung zum digitalen Kataster</h3>
        <p>
          Die mobile App-Ansicht ist keine isolierte Insellösung. Sie ist das Frontend für das zentrale{' '}
          <Link href="/gefahrstoffkataster-software/" className="gqr-link">
            Gefahrstoffkataster
          </Link>
          . Jede Änderung, die durch den KI-gestützten Sicherheitsdatenblatt-Import vorgenommen wird, synchronisiert sich in Echtzeit auf alle QR-Codes. Dies ermöglicht zudem einen rechtskonformen, automatisierten{' '}
          <Link href="/trgs-510-zusammenlagerungs-check/" className="gqr-link">
            TRGS-510-Check
          </Link>
          . Für Unternehmen, die den ersten Schritt aus der Zettelwirtschaft machen wollen, bietet unsere{' '}
          <Link href="/gefahrstoffverzeichnis-excel-vorlage/" className="gqr-link">
            kostenlose Vorlage
          </Link>{' '}
          einen Einstieg – der Wechsel zum mobilen QR-System ist danach das logische Upgrade zur vollständigen Rechtssicherheit.
        </p>
      </LandingProseSection>
    </LandingPageWrapper>
  );
}