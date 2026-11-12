import type { SeoFaqItem } from '@/lib/seo/seo-faq-types';
import { formatEuroAmount, SIFA_MANDANT_INCLUDED, SIFA_MANDANT_EXTENSION_LABEL } from '@/config/sifa-mandant-pricing';

/**
 * Homepage FAQPage (AEO): jede Antwort beginnt mit einer direkten, zitierfähigen Kernaussage.
 * Wird per `npm run sync:home` in index.html gerendert (sichtbare #faq und FAQPage JSON-LD aus derselben Quelle).
 * Copy-Regeln: keine Gedankenstriche; Compliance-Begriffe laut AGENTS.md.
 */
export const LANDING_HOME_SEO_FAQ: SeoFaqItem[] = [
  {
    question: 'Wie unterstützt Gefahrstoff-QR beim Gefahrstoffverzeichnis nach § 6 GefStoffV?',
    answer:
      'Gefahrstoff-QR ist eine browserbasierte Software, die aus Sicherheitsdatenblättern einen KI-gestützten Entwurf für das Gefahrstoffverzeichnis nach § 6 GefStoffV erstellt. Die Angaben werden mit Verweis auf den jeweiligen SDB-Abschnitt ausgelesen, den Tätigkeiten und Arbeitsbereichen zugeordnet und als PDF oder Excel inklusive GHS-Piktogrammen exportiert. Die SiFa bzw. der Arbeitgeber prüft den Entwurf und gibt ihn fachlich frei.',
  },
  {
    question:
      'Eignet sich Gefahrstoff-QR für externe Fachkräfte für Arbeitssicherheit (SiFas) mit mehreren Mandanten?',
    answer:
      'Ja, Gefahrstoff-QR bietet für externe SiFas und Ingenieurbüros eine Multi-Mandanten-Verwaltung, in der Kundenbetriebe als Mandanten, darunter Werke und Arbeitsbereiche bzw. Tätigkeiten strikt getrennt geführt werden. Bei der Begehung lassen sich Gefahrstoffe auch ohne vorliegendes Sicherheitsdatenblatt oder Mengenangabe vorab erfassen. Fehlende Angaben werden im Export farblich markiert und können später nachgepflegt werden.',
  },
  {
    question: 'Wie viele Mandantenbetriebe sind im SiFa Multi-Mandant-Tarif enthalten?',
    answer: `Im SiFa Multi-Mandant-Tarif sind bis zu ${SIFA_MANDANT_INCLUDED} Mandantenbetriebe im Grundpreis enthalten (189 €/Monat oder 159 €/Monat bei Jahreszahlung, jeweils zzgl. MwSt.). Das deckt rund 90 % aller freiberuflichen Einzel-SiFas ohne Aufpreis ab. ${SIFA_MANDANT_EXTENSION_LABEL}. Beispiel bei Jahreszahlung: 35 Firmen ${formatEuroAmount(317)}/Monat, 55 Firmen ${formatEuroAmount(475)}/Monat.`,
  },
  {
    question: 'Ersetzt die KI-Auswertung die fachliche Prüfung nach TRGS 555 und § 14 GefStoffV?',
    answer:
      'Nein, Gefahrstoff-QR erstellt aus dem Sicherheitsdatenblatt des Lieferanten strukturierte Entwürfe, die fachliche Prüfung bleibt beim Menschen. Jeder KI-gestützte Entwurf (gemäß TRGS 555) ist eine Vorprüfung zur fachlichen Freigabe durch die SiFa / den Arbeitgeber (§ 14 GefStoffV). Die Anpassung an die Bedingungen am Arbeitsplatz und die Freigabe erfolgen durch die verantwortliche Person.',
  },
  {
    question: 'Können Unternehmen und SiFas Gefahrstoff-QR auf Rechnung beziehen?',
    answer:
      'Ja, neben der direkten Online-Buchung können Geschäftskunden und SiFas im Multi-Mandanten-Tarif per monatlicher PDF-Rechnung und Überweisung zahlen. Eine langfristige Vertragsbindung besteht nicht, die Pakete sind monatlich kündbar. Das Angebot richtet sich ausschließlich an Unternehmen, Gewerbetreibende und freiberufliche Sicherheitsfachkräfte (§ 14 BGB).',
  },
  {
    question: 'Was ist eine Gefahrstoffmanagement Software?',
    answer:
      'Eine Gefahrstoffmanagement Software ist ein digitales System, mit dem Betriebe ihr Gefahrstoffverzeichnis nach § 6 GefStoffV, die zugehörigen Sicherheitsdatenblätter, Betriebsanweisungen und Lagerinformationen an einer Stelle führen. Gegenüber Excel-Listen bietet sie Versionierung, Erinnerungen an SDB-Aktualisierungen und einen Revisionsverlauf. Gefahrstoff-QR läuft im Browser und erstellt aus dem Sicherheitsdatenblatt einen KI-gestützten Entwurf zur fachlichen Freigabe durch die SiFa / den Arbeitgeber.',
  },
  {
    question:
      'Welche Pflichtangaben muss ein Gefahrstoffverzeichnis nach § 6 Abs. 12 GefStoffV enthalten?',
    answer:
      'Ein Gefahrstoffverzeichnis nach § 6 Abs. 12 GefStoffV enthält mindestens die Bezeichnung des Gefahrstoffs, die Einstufung bzw. die gefährlichen Eigenschaften (GHS-Gefahrenklassen und -kategorien), die verwendeten Mengenbereiche im Betrieb, die betroffenen Arbeitsbereiche und einen Verweis auf das aktuelle Sicherheitsdatenblatt. In Excel fehlen häufig die Verknüpfung zur gültigen SDB-Version und Zeitstempel pro Änderung. Gefahrstoff-QR strukturiert diese Pflichtfelder aus dem SDB-PDF als Vorprüfung zur fachlichen Freigabe durch die SiFa / den Arbeitgeber und führt einen Revisionsverlauf.',
  },
  {
    question: 'Wie oft muss das Gefahrstoffverzeichnis aktualisiert werden?',
    answer:
      'Das Gefahrstoffverzeichnis muss bei wesentlichen Änderungen fortgeschrieben und mindestens einmal jährlich überprüft werden. Wesentliche Änderungen sind zum Beispiel neue Stoffe, geänderte Mengen oder Arbeitsbereiche und neue Versionen des Sicherheitsdatenblatts. Gefahrstoff-QR erinnert an fällige SDB-Aktualisierungen und dokumentiert jede Änderung mit Zeitstempel und Nutzer.',
  },
  {
    question: 'Reicht Excel als Gefahrstoffverzeichnis aus?',
    answer:
      'Excel kann die Pflichtfelder abbilden, deckt aber laufende Aktualität, Versionierung der Sicherheitsdatenblätter und den Nachweis von Änderungen nur mit viel Handarbeit ab. Genau diese Punkte prüfen SiFa und Aufsichtsbehörden bei Betriebsprüfungen. Gefahrstoff-QR führt KI-gestützte Extraktion, fachliche Freigabe und den PDF-Export des Verzeichnisses in einer Datenbasis zusammen, ohne Abtipp-Marathon.',
  },
  {
    question: 'Wie dokumentiere ich die Zusammenlagerungsprüfung nach TRGS 510?',
    answer:
      'Nach TRGS 510 gleichen Sie die Lagerklassen (LGK) der Stoffe über die Zusammenlagerungstabelle ab, und zwar bei jeder neuen Charge oder Lagerplatzänderung erneut. Ein Screenshot oder Excel-Hinweis zeigt bei Audits selten, welche Kombination zum Prüfzeitpunkt bewertet wurde. Gefahrstoff-QR ordnet Stoffe ihrer Lagerklasse zu und weist pro Lagerort auf mögliche Konflikte hin. Die Lagerentscheidung trifft die SiFa / Fachkraft, die Verantwortung liegt beim Arbeitgeber.',
  },
  {
    question: 'Woran erkennt eine Betriebsprüfung, dass das Gefahrstoffverzeichnis veraltet ist?',
    answer:
      'Prüfer vergleichen Verzeichnisstand, SDB-Versionen und Arbeitsbereiche mit der Situation vor Ort. Abweichungen zwischen Etikett, Lagerort und dokumentiertem Eintrag gelten als Organisationsverschulden. Ordner mit PDFs oder unversionierte Excel-Listen zeigen selten, wer wann welches Feld geändert hat. Gefahrstoff-QR protokolliert Revisionen, fordert SDB-Updates zyklisch an und verknüpft jeden Eintrag mit der gültigen SDB-Version.',
  },
  {
    question: 'Was kostet Gefahrstoff-QR?',
    answer:
      `Die TarifVorschau ist kostenlos (bis zu 3 SDB-Uploads, PDF nur mit „MUSTER“-Wasserzeichen). KMU Basis: 59 € pro Monat (49 €/Monat bei Jahreszahlung, bis 30 Gefahrstoffe). KMU Pro: 119 € pro Monat (99 €/Monat bei Jahreszahlung, bis 250 Gefahrstoffe, Batch-Upload, mehrere Nutzer). SiFa Multi-Mandant: 189 € pro Monat (159 €/Monat bei Jahreszahlung, bis ${SIFA_MANDANT_INCLUDED} Mandantenbetriebe inklusive, ${SIFA_MANDANT_EXTENSION_LABEL}, PDF-Rechnung möglich). Industrie: ab 399 € pro Monat (339 €/Monat bei Jahreszahlung, ab 250 Gefahrstoffen, ab 4 Werken, SSO, dedizierter AVV-Support, Anfrage). Alle Preise zzgl. MwSt., monatlich kündbar.`,
  },
  {
    question: 'Wo werden die Daten gehostet?',
    answer:
      'Die Daten werden in Deutschland gehostet, ein Auftragsverarbeitungsvertrag (AVV) ist inklusive. Die Verbindung ist SSL-verschlüsselt, Konten lassen sich mit Zwei-Faktor-Authentifizierung schützen. Details zu Zweckbindung und Löschfristen stehen in der Datenschutzerklärung.',
  },
  {
    question: 'Unterstützt Gefahrstoff-QR auch TRGS 555, TRGS 600 und REACH?',
    answer:
      'Ja, im Rahmen der Vorprüfung. Die Einstufung erfolgt nach CLP-Verordnung, REACH-relevante Daten wie die UFI können geführt werden. Gefahrstoff-QR unterstützt bei TRGS 510 (Lagerung), TRGS 555 (Betriebsanweisung als KI-gestützter Entwurf) und TRGS 600 (Hinweise zur Substitutionsprüfung bei KMR-Stoffen). Die fachliche Bewertung bleibt bei der SiFa / dem Arbeitgeber.',
  },
  {
    question: 'Wie aufwendig ist der Umstieg von Excel auf Gefahrstoff-QR?',
    answer:
      'Der Umstieg braucht kein IT-Projekt, weil Gefahrstoff-QR im Browser läuft. Vorhandene Sicherheitsdatenblätter laden Sie ab dem Professional-Paket per Batch-Upload in einem Rutsch hoch. Alternativ begleitet Sie der Umzugsservice persönlich beim Erstimport.',
  },
];
