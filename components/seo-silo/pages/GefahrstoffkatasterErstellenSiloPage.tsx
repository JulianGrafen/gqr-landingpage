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
        id="rechtliche-anatomie"
        eyebrow="Gesetzliches Fundament & Betreiberverantwortung"
        title="Die rechtliche Anatomie des Gefahrstoffverzeichnisses: Mehr als nur eine Bestandsliste"
        intro="Ein Gefahrstoffkataster wird oft als bürokratische Pflichtübung missverstanden. In der juristischen und operativen Realität ist es jedoch das zentrale Fundament der betrieblichen Arbeitssicherheit und der primäre Hebel zur Minimierung der Geschäftsführerhaftung."
      >
        <p>
          Die Erstellung eines Gefahrstoffkatasters leitet sich direkt aus dem Arbeitsschutzgesetz (ArbSchG) und spezifisch aus <strong>§ 6 der Gefahrstoffverordnung (GefStoffV)</strong> ab. Der Gesetzgeber fordert hier die sogenannte "Informationsermittlung und Gefährdungsbeurteilung". Bevor ein Mitarbeiter auch nur in die Nähe eines potenziell gefährlichen Stoffes kommt, muss der Arbeitgeber Art, Ausmaß und Dauer der Exposition ermitteln. Das Gefahrstoffverzeichnis ist der zwingende erste Schritt dieser Kette. Ohne ein vollständiges, aktuelles Verzeichnis ist jede nachfolgende Gefährdungsbeurteilung nach <strong>TRGS 400</strong> rechtlich nichtig, da sie auf einer unvollständigen Datenbasis operiert.
        </p>
        <p>
          Auditoren der Berufsgenossenschaften (BG) und der Gewerbeaufsicht prüfen heute nicht mehr nur das Vorhandensein eines Aktenordners. Sie prüfen die <strong>Kausalität und Revisionssicherheit</strong>. Ein rechtskonformes Verzeichnis muss zwingend folgende Parameter abbilden: Die exakte Bezeichnung des Stoffes, die Einstufung (Gefahrenklassen, H- und P-Sätze nach CLP-Verordnung), die im Betrieb verwendeten Mengenbereiche, die spezifischen Arbeitsbereiche, in denen der Stoff genutzt wird, sowie den direkten Verweis auf das entsprechende, aktuelle Sicherheitsdatenblatt (SDB). 
        </p>
        <p>
          Das juristische Risiko für Geschäftsführer und Sicherheitsfachkräfte (SiFas) liegt in der <strong>Beweislastumkehr bei Arbeitsunfällen oder Berufskrankheiten</strong>. Erkrankt ein Mitarbeiter an einem chronischen Atemwegsleiden, wird die BG prüfen, welchen Expositionen er vor fünf oder zehn Jahren ausgesetzt war. Wenn Ihr System (z. B. eine überschriebene Excel-Tabelle) nicht mehr nachweisen kann, welche H-Sätze ein bestimmter Industriereiniger im Jahr 2021 hatte, stehen Sie in der vollen Haftung. Ein Kataster ist demnach kein statisches Dokument, sondern ein historisiertes Beweismittel.
        </p>
      </LandingProseSection>

      <LandingProseSection
        id="clp-stichtag-konsequenzen"
        eyebrow="Regulatorische Dringlichkeit"
        title="Der abgelaufene CLP-Stichtag (Mai 2026) und die Folgen für den Bestand"
        variant="raised"
        intro="Mit dem 1. Mai 2026 ist eine der gravierendsten Änderungen im europäischen Chemikalienrecht wirksam geworden. Betriebe, die ihr Kataster jetzt nicht systematisch auditieren, operieren in einer Grauzone."
      >
        <p>
          Die delegierte Verordnung zur Änderung der CLP-Verordnung (Classification, Labelling and Packaging) hat neue Gefahrenklassen eingeführt. Der Fokus lag hierbei insbesondere auf endokrinen Disruptoren (hormonschädigenden Stoffen) sowie auf PBT- (persistent, bioakkumulierbar, toxisch) und vPvB-Stoffen. Während für reine Stoffe die Fristen bereits früher griffen, endete die entscheidende Übergangsfrist für <strong>Gemische am 1. Mai 2026</strong>. Für den Mittelstand bedeutet dies: Tausende Produkte wie Farben, Lacke, Klebstoffe, Kühlschmierstoffe und Spezialreiniger müssen nun nach den neuen Kriterien eingestuft und gekennzeichnet sein.
        </p>
        <p>
          <strong>Die operative Realität für die Sicherheitsfachkraft:</strong> Es reicht nicht aus, darauf zu warten, dass der Lieferant ein neues Fass mit einem neuen Etikett auf den Hof stellt. Die SiFa muss aktiv sicherstellen, dass die neuen Sicherheitsdatenblätter (SDB) im Betrieb vorliegen, die neuen H-Sätze (Gefahrenhinweise) in das Gefahrstoffkataster übernommen werden und – das ist der kritische Punkt – die bestehenden Betriebsanweisungen sowie die Gefährdungsbeurteilungen aktualisiert werden.
        </p>
        <p>
          Wer sein Gefahrstoffkataster manuell in Word oder Excel führt, steht nun vor einer Herkulesaufgabe. Jedes einzelne der oft hunderten PDFs muss geöffnet, auf das Revisionsdatum geprüft und händisch mit der eigenen Tabelle abgeglichen werden. Ein übersehener endokriner Disruptor, der nicht in die Substitution (TRGS 600) überführt wird oder für den keine verschärften PSA-Maßnahmen (Persönliche Schutzausrüstung) angeordnet werden, stellt einen massiven Verstoß gegen das Arbeitsschutzgesetz dar. Die Automatisierung dieses Abgleichs ist heute keine Frage des Komforts mehr, sondern die einzige rationale Methode, um dieser regulatorischen Flut Herr zu werden.
        </p>
      </LandingProseSection>

      <LandingProseSection
        id="fehler"
        eyebrow="Haftungsrisiken & Prozessfehler"
        title="Warum manuell erstellte Kataster bei Audits scheitern"
        intro="Ein Gefahrstoffverzeichnis ist kein starres Dokument, sondern ein lebender Compliance-Prozess. Die meisten Projekte scheitern nicht an mangelnder Fachkenntnis der SiFa, sondern an Werkzeugen, die nicht skalieren."
      >
        <p>
          <strong>1. Das Excel-Paradoxon (Fehlende Revisionssicherheit):</strong> 
          § 6 GefStoffV fordert eine lückenlose Informationsermittlung. Eine Excel-Tabelle wächst zwar schnell und bietet anfänglich eine gute Übersicht, kennt aber systembedingt keine unmanipulierbare Historie. Wenn ein Lieferant das Sicherheitsdatenblatt aktualisiert und Sie die bestehende Zeile überschreiben, löschen Sie unwiederbringlich den historischen Nachweis. Kommt es Jahre später zu einem Rechtsstreit, können Sie nicht mehr gerichtsfest belegen, mit welchem Datenstand der betroffene Mitarbeiter damals gearbeitet hat. Excel ist ein Kalkulationsprogramm, kein revisionssicheres Dokumentenmanagementsystem.
        </p>
        <p>
          <strong>2. Trennung von Verzeichnis und Gefährdungsbeurteilung (TRGS 400):</strong> 
          Ein extrem häufiger Audit-Befund ist die isolierte Pflege von Dokumenten. Das Gefahrstoffverzeichnis listet die Stoffe zwar penibel auf, aber die eigentliche Gefährdungsbeurteilung (GB) liegt als totes, veraltetes Word-Dokument auf einem Netzlaufwerk. Nach TRGS 400 bedingt jede signifikante Änderung an der Einstufung oder der verwendeten Menge zwingend eine Neuüberprüfung der GB. Manuelle Systeme können diese kausale Kette nicht automatisiert triggern. Die Dokumente laufen zwangsläufig asynchron – die SiFa verliert den Überblick über den Revisionsstatus.
        </p>
        <p>
          <strong>3. Die Unterweisungs-Lücke (§ 14 GefStoffV & TRGS 555):</strong> 
          Eine Betriebsanweisung (BA) zu schreiben, ist lediglich der erste Schritt. Die nachweisliche, arbeitsplatzbezogene Unterweisung der Belegschaft ist der entscheidende zweite Schritt. Wenn H- und P-Sätze aufgrund eines neuen SDBs angepasst werden, muss das Team zwingend nachgeschult werden. Ohne ein System, das solche Änderungen im Kataster protokolliert und die Verantwortlichen proaktiv alarmiert, arbeiten Mitarbeiter am Band schnell nach veralteten und potenziell gefährlichen Schutzmaßnahmen weiter.
        </p>
        <p>
          <strong>4. Blindflug bei Substitutionspflichten (TRGS 600):</strong> 
          Das STOP-Prinzip (Substitution, Technische, Organisatorische, Persönliche Schutzmaßnahmen) ist gesetzlich zwingend. An erster Stelle steht immer der Versuch, einen gefährlichen Stoff durch einen weniger gefährlichen zu ersetzen. Besonders bei krebserzeugenden, keimzellmutagenen oder reproduktionstoxischen Stoffen (CMR-Stoffe) verlangt die Behörde eine harte Dokumentation Ihrer Substitutionsversuche. In einem manuellen Kataster gehen diese hochkritischen Stoffe in der Masse der Einträge oft unter.
        </p>
      </LandingProseSection>

      <LandingProseSection
        id="trgs-510-zusammenlagerung"
        eyebrow="Lagerlogistik & TRGS 510"
        title="Die unsichtbare Gefahr im Gefahrstofflager: Zusammenlagerungsverbote"
        variant="raised"
        intro="Das Gefahrstoffkataster endet nicht bei der Erfassung der Piktogramme. Es ist die zwingende Datengrundlage für die sichere Lagerung nach TRGS 510. Wer hier Fehler macht, riskiert fatale chemische Reaktionen."
      >
        <p>
          Die <strong>Technische Regel für Gefahrstoffe 510 (Lagerung von Gefahrstoffen in ortsbeweglichen Behältern)</strong> ist eines der komplexesten Regelwerke im betrieblichen Alltag. Sobald bestimmte Mengenschwellen überschritten werden, greifen strenge Zusammenlagerungsregeln. Das Ziel ist es, zu verhindern, dass bei Leckagen oder Bränden Stoffe miteinander reagieren, die toxische Gase entwickeln oder Explosionen verursachen können. 
        </p>
        <p>
          Ein klassisches Beispiel aus der Praxis: Die gemeinsame Lagerung von Säuren (Lagerklasse 8B) und Laugen/Basen (Lagerklasse 8A). Werden diese in derselben Auffangwanne gelagert und kommt es zu einer Havarie, entsteht eine unkontrollierbare, exotherme Reaktion. Die TRGS 510 schreibt hier eine strikte Separatlagerung vor. Ähnlich kritisch verhält es sich mit entzündbaren Flüssigkeiten (Lagerklasse 3) und oxidierenden Stoffen (Lagerklasse 5.1). Oxidationsmittel liefern im Brandfall den Sauerstoff und wirken als extremer Brandbeschleuniger – eine gemeinsame Lagerung im selben Regal ist strengstens untersagt.
        </p>
        <p>
          <strong>Die Grenze der manuellen Überwachung:</strong> Eine Sicherheitsfachkraft kann die Zusammenlagerungstabelle der TRGS 510 (die Matrix mit den grünen, gelben und roten Kreuzen) für zehn Stoffe manuell im Kopf oder auf Papier prüfen. Bei 150 oder 500 Stoffen, die über verschiedene Werkstätten, Baustellen und Hauptlager verteilt sind, bricht dieses System zusammen. Ein rechtssicheres Gefahrstoffkataster muss daher zwingend den exakten Lagerort (Halle, Regal, Wanne) mit der Einstufung verknüpfen. Nur eine systemgestützte Software kann hier im Hintergrund die Konflikte der Lagerklassen (LGK) in Echtzeit berechnen und bei einer Fehlzuordnung sofort Alarm schlagen.
        </p>
      </LandingProseSection>

      <div className="gqr-container py-14 lg:py-20">
        <ManualVsGqrComparison
          targetAudience={KATASTER_ERSTELLEN_COMPARISON.targetAudience}
          comparison={{
            leftColumnTitle: 'Manuelle Kataster-Pflege (Excel / Word / Papier)',
            rightColumnTitle: 'Systemgestützte Compliance (Gefahrstoff-QR)',
            rows: [...KATASTER_ERSTELLEN_COMPARISON.rows],
          }}
        />
      </div>

      <LandingProseSection
        id="ressourcen-und-realitaetscheck"
        eyebrow="Ressourcenplanung & Realitätscheck"
        title="Vorlagen, Software und externe Berater — Was ist wirtschaftlich rational?"
        intro="Arbeitsschutz kostet Geld. Mangelnder Arbeitsschutz kostet die Existenz. Die Entscheidung, wie ein Betrieb sein Kataster aufbaut, muss eine kühle, betriebswirtschaftliche Kalkulation sein."
      >
        <h3>1. Der Einstieg: Kostenlose Excel-Vorlage</h3>
        <p>
          Wir müssen realistisch bleiben: Wenn Ihr Handwerksbetrieb oder Büro weniger als 15 bis 20 ungefährliche Routine-Stoffe (z. B. Standard-Bodenreiniger, handelsübliche Schmiermittel ohne CMR-Eigenschaften) führt, ist ein massives Software-Rollout betriebswirtschaftlich nicht zu rechtfertigen. Nutzen Sie unsere{' '}
          <Link href="/gefahrstoffverzeichnis-excel-vorlage/" className="gqr-link">
            strukturierte Excel-Vorlage
          </Link>{' '}
          für die Erstaufnahme. Sie zwingt Sie in die richtige Struktur. <strong>Der faktische Nachteil:</strong> Sie tragen die volle, persönliche Verantwortung für die händische Nachverfolgung jedes einzelnen SDB-Updates. Excel warnt Sie nicht, wenn Fristen verstreichen.
        </p>

        <h3>2. Der Skalierer: Gefahrstoffkataster Software</h3>
        <p>
          Sobald Sie die Schwelle zu komplexeren Zusammenlagerungen (TRGS 510) überschreiten, krebserzeugende Stoffe einsetzen oder mehrere Standorte verwalten, mutieren manuelle Word-Templates zu einem massiven Kostenfresser. Rechnen Sie den Stundensatz Ihrer SiFa dagegen. Eine spezialisierte{' '}
          <Link href="/gefahrstoffkataster-software/" className="gqr-link">
            Gefahrstoffkataster Software
          </Link>{' '}
          automatisiert den SDB-Import via KI, generiert Betriebsanweisungen auf Knopfdruck und sichert Audits ab. <strong>Der Realitätscheck:</strong> Software ist kein magischer Problemlöser. Die initiale Überführung historisch gewachsener, unstrukturierter Ordner in das System erfordert einmalig konzentrierte Zeit und eiserne Disziplin. Der Return on Investment (massive Zeitersparnis und garantierte Rechtssicherheit) setzt nicht an Tag eins ein, sondern erst nach dem initialen Setup und der ersten SDB-Aktualisierungswelle.
        </p>

        <h3>3. Die letzte Meile: Die Ad-hoc Information am Einsatzort</h3>
        <p>
          Das juristisch perfekteste Kataster auf dem Server der Geschäftsführung nützt dem Ersthelfer in der Produktionshalle absolut nichts. Für Werkstätten, Logistikzentren und Baustellen löst die{' '}
          <Link href="/gefahrstoff-app/" className="gqr-link">
            Gefahrstoff App
          </Link>{' '}
          das fundamentale Problem der Ad-hoc-Informationsbeschaffung. Tritt eine ätzende Flüssigkeit aus, scannen die Mitarbeiter den QR-Code direkt am betroffenen Gebinde und erhalten auf dem Smartphone sofort die lebensrettenden Erste-Hilfe-Maßnahmen (P-Sätze). Keine Suche nach Ordnern, kein Login-Zwang im Notfall.
        </p>

        <h3>4. Outtasking: Die externe Erstellung des Katasters</h3>
        <p>
          Fehlen intern die personellen Kapazitäten komplett oder liegt das Thema seit Jahren brach, können Sie initial das{' '}
          <Link href="/wissen/gefahrstoffkataster-erstellen-lassen/" className="gqr-link">
            Kataster von externen Dienstleistern erstellen lassen
          </Link>
          . <strong>Die harte Wahrheit hierbei:</strong> Dies verlagert die operative Arbeitslast kurzfristig, entbindet die Geschäftsführung aber langfristig nicht von der gesetzlichen Betreiberverantwortung. Der Berater geht wieder – das Risiko bleibt im Betrieb. Daher muss ein solches Outsourcing immer mit der Implementierung eines Systems einhergehen, das Sie befähigt, das Kataster danach selbst effizient am Leben zu halten.
        </p>
      </LandingProseSection>
    </LandingPageWrapper>
  );
}