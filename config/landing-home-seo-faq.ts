import type { SeoFaqItem } from '@/lib/seo/seo-faq-types';

/**
 * Homepage FAQPage (AEO): jede Antwort beginnt mit einer direkten, zitierfähigen Kernaussage.
 * Sync mit index.html (#faq + FAQPage JSON-LD im <head>) via `npm run sync:home-faq`.
 * Copy-Regeln: keine Gedankenstriche; Compliance-Begriffe laut AGENTS.md.
 */
export const LANDING_HOME_SEO_FAQ: SeoFaqItem[] = [
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
    question: 'Wer gibt die KI-Entwürfe frei?',
    answer:
      'Die fachliche Freigabe liegt immer bei der Sicherheitsfachkraft (SiFa) oder dem Arbeitgeber. Gefahrstoff-QR liefert einen KI-gestützten Entwurf (gemäß TRGS 555) als Vorprüfung zur fachlichen Freigabe durch die SiFa / den Arbeitgeber (§ 14 GefStoffV). Die KI übernimmt das Auslesen und Strukturieren der Daten aus dem Sicherheitsdatenblatt, die Bewertung bleibt beim Menschen.',
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
      'Gefahrstoff-QR ist für bis zu 5 Stoffe kostenlos. Small Business kostet 89 € pro Monat (bis 50 Stoffe), Professional 199 € pro Monat (bis 250 Stoffe, mehrere Nutzer, Batch-Upload), Multi-Mandant für SiFa-Beratungen ab 299 € pro Monat und Enterprise ab 699 € pro Monat. Alle Preise verstehen sich zzgl. MwSt., monatlich kündbar, bei Jahreszahlung mit 15 % Rabatt.',
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
