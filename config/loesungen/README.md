# Branchen-Landingpages (`/loesungen/[slug]/`)

Datengetriebene SEO-Seiten für Gefahrstoffmanagement nach Branche.

## Neue Branche hinzufügen

1. `IndustrySlug` in `config/industry-solutions.ts` (`INDUSTRY_SLUGS`) ergänzen.
2. Vollständigen Eintrag in `industrySolutions` anlegen — für neue Seiten mit Tabellen/FAQ auch `pseo: IndustryPseoContent` aus `types.ts`.
3. Keywords für Stoff-Verlinkung in `config/betriebsanweisung/industry-solution-keywords.ts` pflegen.
4. `npm run validate:loesungen` und `npm run validate:legal-copy`.

## Pflichtfelder `IndustryPseoContent`

- `aeoAnswer`: 45–60 Wörter
- `typicalProducts`: 5–7 Zeilen
- `inspectionDeficiencies`: genau 3 Einträge
- `excelComparison`: genau 4 Zeilen (SDB-Neuzugang, TRGS 201 Umfüllen, Zugriff am Arbeitsplatz, BG-Nachweis)
- `faqItems`: genau 3 Paare (40–55 Wörter pro Antwort)

Meta: `metaTitle` max. 60 Zeichen, `metaDescription` max. 155 Zeichen. H1 über `title`: „Gefahrstoffmanagement in der/im …: Kataster, TRGS 555 & Lagerung“.

Keine CAS, GHS-Piktogramme, Signalwörter, H-Sätze oder konkreten Schutzmaßnahmen in öffentlichen Texten.