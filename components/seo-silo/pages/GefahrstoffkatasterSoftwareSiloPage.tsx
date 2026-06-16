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
        subline="Die manuelle Pflege von Sicherheitsdatenblättern ist der teuerste Ineffizienz-Faktor im Arbeitsschutz. Berechnen Sie objektiv, ab wie vielen Gefahrstoffen der Einsatz einer Software die Personalkosten Ihrer Sicherheitsfachkraft signifikant senkt und das Haftungsrisiko der Geschäftsführung minimiert."
      />

      <LandingProseSection
        id="betriebswirtschaftliche-realitaet"
        eyebrow="Wirtschaftlichkeit & ROI"
        title="Die betriebswirtschaftliche Realität der manuellen SDB-Pflege"
        intro="Gefahrstoffmanagement wird oft isoliert als reines Compliance-Thema betrachtet. In der Praxis ist es jedoch ein massiver, oft unbemerkter Kostentreiber. Die Arbeitszeit hochqualifizierter Sicherheitsfachkräfte verpufft in administrativen Routineaufgaben, anstatt in die tatsächliche Gefahrenprävention zu fließen."
      >
        <p>
          Lassen Sie uns eine rationale Kosten-Nutzen-Rechnung aufmachen. Eine interne oder externe Sicherheitsfachkraft (SiFa) kostet ein Unternehmen, realistisch kalkuliert, zwischen 60 und 100 Euro pro Stunde. Die manuelle Aktualisierung eines einzelnen Gefahrstoffes in einem klassischen Excel- oder Word-System umfasst mehrere Schritte: Das neue Sicherheitsdatenblatt (SDB) muss beim Hersteller angefragt oder auf dessen Website gesucht werden. Anschließend müssen die 16 Abschnitte des PDFs manuell nach Änderungen gescannt werden – haben sich die H-Sätze (Gefahrenhinweise) geändert? Sind neue P-Sätze (Sicherheitshinweise) hinzugekommen? Hat sich die Wassergefährdungsklasse (WGK) oder die Lagerklasse (LGK) verschoben? 
        </p>
        <p>
          Diese Daten müssen händisch in das Excel-Kataster übertragen werden. Danach muss das Word-Dokument der Betriebsanweisung (BA) geöffnet, das alte Datum überschrieben, die neuen Piktogramme eingefügt und das Dokument neu als PDF exportiert und im Intranet abgelegt werden. Im Durchschnitt kostet dieser Vorgang pro Stoff zwischen 20 und 40 Minuten reine Arbeitszeit. Bei einem mittelständischen Kataster von nur 150 Stoffen und einer jährlichen Aktualisierungsrate von rund 30 Prozent sprechen wir von knapp 30 bis 60 Stunden rein administrativer Fleißarbeit pro Jahr. Das entspricht Kosten von bis zu 6.000 Euro – Jahr für Jahr, Tendenz steigend durch zunehmende regulatorische Dynamik.
        </p>
        <p>
          <strong>Der Hebel der Software:</strong> Eine dedizierte Gefahrstoffkataster-Software transformiert diese variablen und extrem hohen Personalkosten in einen planbaren, deutlich niedrigeren Fixkostenblock. Das System automatisiert die Datenextraktion und Dokumentengenerierung. Der ROI (Return on Investment) eines solchen Systems setzt in der Regel bereits ab dem 50. Gefahrstoff ein, da die eingesparte Arbeitszeit der SiFa sofort in wertschöpfende Tätigkeiten – wie Arbeitsplatzbegehungen, Substitutionsprüfungen oder gezielte Unterweisungen – reinvestiert werden kann. Wer im Mittelstand heute noch auf Excel setzt, zahlt nicht keine Lizenzgebühren, sondern finanziert ein hochgradig ineffizientes Zeitgrab.
        </p>
      </LandingProseSection>

      <LandingProseSection
        id="audit-sicherheit"
        eyebrow="Compliance & Haftung"
        title="Beweislastumkehr bei Audits: Warum Dateiformate keine Rechtssicherheit bieten"
        variant="raised"
        intro="Bei einer Betriebsprüfung durch die Berufsgenossenschaft, die Gewerbeaufsicht oder nach einem Arbeitsunfall greift fast immer das Prinzip des Organisationsverschuldens. Behörden prüfen nicht nur, ob Sie eine Liste führen, sondern ob Ihr Dokumentationsprozess lückenlos, historisiert und manipulationssicher ist."
      >
        <p>
          Ein <strong>Gefahrstoffverzeichnis nach § 6 GefStoffV</strong> ist in seiner juristischen Natur ein lebendes, aber gleichzeitig streng historisiertes Dokument. Die fundamentale rechtliche Schwachstelle von Excel-Tabellen oder einfachen Intranet-Wiki-Systemen liegt in der fehlenden Revisionssicherheit. Wenn ein Hersteller die Zusammensetzung eines Industriereinigers ändert und die SiFa die bestehende Tabellenzeile einfach mit den neuen Daten überschreibt, wird der historische Datenstand unwiederbringlich vernichtet. 
        </p>
        <p>
          <strong>Das Szenario der Berufskrankheit:</strong> Kommt es fünf oder zehn Jahre später zu einer Meldung einer Berufskrankheit (beispielsweise ein chronisches Atemwegsleiden durch jahrelange Exposition), wird die Berufsgenossenschaft ermitteln. Dem Unternehmen obliegt dann die Pflicht nachzuweisen, unter welchen exakten Expositionsbedingungen (welche Stoffzusammensetzung, welche H-Sätze, welche damalige Betriebsanweisung) der betroffene Mitarbeiter zu jenem Zeitpunkt gearbeitet hat. Ohne ein manipulationssicheres System, das jeden Upload, jede Änderung und jede Version mit einem unveränderlichen Zeitstempel und einem Benutzernamen versieht, fehlt dem Unternehmen der gerichtsfeste Nachweis. Sie stehen faktisch ohne Verteidigungsgrundlage in der vollen Haftung.
        </p>
        <p>
          <strong>Die Kausalkette der TRGS 400:</strong> Arbeitsschutz ist ein interdependentes System, keine Sammlung isolierter Akten. Eine Änderung der Einstufung im Sicherheitsdatenblatt erfordert gesetzlich zwingend eine Neuüberprüfung der Gefährdungsbeurteilung (GB). Diese geänderte GB muss wiederum in eine aktualisierte Betriebsanweisung münden, welche die direkte Basis für die erneute Unterweisung der Beschäftigten nach <strong>§ 14 GefStoffV</strong> bildet. Manuelle Systeme trennen diese Daten in gefährliche Datensilos. Eine spezialisierte Gefahrstoffkataster-Software synchronisiert diese Kette: Ein SDB-Update im System triggert vollautomatisiert den Revisionsbedarf für alle verknüpften Dokumente, Abteilungen und Lagerorte. Das System zwingt den Betreiber in die Konformität.
        </p>
      </LandingProseSection>

      <LandingProseSection
        id="clp-verordnung-2026"
        eyebrow="Regulatorische Dringlichkeit"
        title="Der CLP-Stichtag Mai 2026: Warum der Bestand jetzt auditiert werden muss"
        intro="Mit dem 1. Mai 2026 ist eine der gravierendsten Änderungen im europäischen Chemikalienrecht vollumfänglich wirksam geworden. Betriebe, die ihr Kataster jetzt nicht systematisch und systemgestützt auditieren, operieren de facto in einer rechtlichen Grauzone."
      >
        <p>
          Die delegierte Verordnung zur Änderung der europäischen CLP-Verordnung (Classification, Labelling and Packaging) hat den Umgang mit Chemikalien drastisch verschärft. Der Gesetzgeber hat völlig neue Gefahrenklassen eingeführt. Der primäre Fokus lag hierbei auf endokrinen Disruptoren (Stoffe, die in das menschliche Hormonsystem eingreifen), PBT-Stoffen (persistent, bioakkumulierbar und toxisch) sowie vPvB-Stoffen (sehr persistent und sehr bioakkumulierbar), PMT- und vPvM-Stoffen. Während für reine Stoffe die Fristen bereits früher griffen, endete die entscheidende, harte Übergangsfrist für <strong>Gemische am 1. Mai 2026</strong>.
        </p>
        <p>
          Für die betriebliche Praxis bedeutet dieser Stichtag eine Zäsur: Tausende alltägliche Produkte – von der Wandfarbe über den Konstruktionsklebstoff und den Kühlschmierstoff an der CNC-Fräse bis hin zum Spezialreiniger in der Instandhaltung – müssen von den Herstellern nach den neuen Kriterien neu eingestuft, neu gekennzeichnet und mit neuen Sicherheitsdatenblättern versehen werden. 
        </p>
        <p>
          <strong>Das Risiko des manuellen Abgleichs:</strong> Es ist eine Illusion zu glauben, dass eine einzelne Sicherheitsfachkraft im Mittelstand die Kapazität hat, Hunderte von 40-seitigen SDB-PDFs händisch zu öffnen, jede Zeile in Abschnitt 2 (Mögliche Gefahren) und Abschnitt 3 (Zusammensetzung) auf die neuen endokrinen Gefahrenklassen zu prüfen und diese fehlerfrei in Excel-Tabellen abzuändern. Ein übersehener hormonell wirksamer Stoff, der nicht in die zwingende Substitutionsprüfung nach TRGS 600 überführt wird oder für den keine verschärften persönlichen Schutzmaßnahmen (PSA) angeordnet werden, stellt einen massiven, sanktionierbaren Verstoß dar. GQR löst dieses Problem durch systemgestützte Massen-Abgleiche und zwingt den alten Datenbestand durch KI-gestützte Extraktion strukturiert in die neue gesetzliche Norm.
        </p>
      </LandingProseSection>

      <LandingProseSection
        id="ki-prozess-grenzen"
        eyebrow="Technologie-Check"
        title="KI-Extraktion: Faktenbasierte Automatisierung vs. blinder Autopilot"
        variant="raised"
        intro="Künstliche Intelligenz im Arbeitsschutz wird oft als magische Lösung vermarktet. Die rechtliche Realität ist jedoch unerbittlich: Keine KI der Welt befreit den Arbeitgeber von seiner Betreiberverantwortung. KI ist kein Autopilot, der die SiFa ersetzt, sondern ein hochspezialisierter Assistent."
      >
        <p>
          Der Versuch, ein Gefahrstoffmanagement zu 100 Prozent zu automatisieren, ist juristisch extrem riskant. Algorithmen machen Fehler, PDFs von Herstellern sind fehlerhaft formatiert, und OCR-Scans können Sonderzeichen falsch interpretieren. Wenn eine Software eine falsche Lagerklasse einliest und daraufhin ein Brand ausbricht, haftet nicht der Softwarehersteller, sondern der Geschäftsführer des Anwenderunternehmens. 
        </p>
        <p>
          <strong>Der realistische, rechtssichere Software-Prozess:</strong> GQR nutzt modernste Natural Language Processing (NLP) und OCR-Technologien, um unstrukturierte Hersteller-SDBs in wenigen Sekunden auszulesen. Das System extrahiert zuverlässig CAS-Nummern, H-Sätze, P-Sätze, Wassergefährdungsklassen (WGK) und Lagerklassen (LGK) nach TRGS 510. Aber – und das ist der entscheidende Unterschied zwischen einem gefährlichen Spielzeug und einer Audit-Software – das System übernimmt "nur" die Fleißarbeit der Dateneingabe. Bevor ein Stoff im System "scharf" geschaltet wird, Betriebsanweisungen generiert oder Notfall-QR-Codes aktiviert werden, erzwingt das System einen "Human-in-the-Loop"-Prozess. Die Sicherheitsfachkraft sieht die extrahierten Daten neben dem Original-PDF, validiert diese mit einem Klick und übernimmt die rechtliche Freigabe. Die SiFa behält die absolute Kontrollinstanz.
        </p>
        <p>
          <strong>Der Hebel bei TRGS 600 (Substitutionsprüfung):</strong> Ein gewaltiger Vorteil digitaler, strukturierter Datenbanken zeigt sich bei der Ersatzstoffprüfung. Das System flaggt kritische Substanzen, insbesondere CMR-Stoffe (krebserzeugend, mutagen, reprotoxisch)