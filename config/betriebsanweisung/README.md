# Betriebsanweisung — Programmatic SEO Daten

Öffentliche Landingpages zeigen im **statischen HTML** **keine** CAS-, GHS-, H/P- oder andere konkreten Gefahrstoffdaten. Inhalte stammen aus dem herstellerspezifischen SDB nach Upload.

Einzige Ausnahme: `demo-sdb-extractions.ts` (1-Klick-Demo „Mit Beispiel-SDB live testen“). Die Datei wird nur per dynamischem `import()` nach Nutzerklick geladen (eigener Chunk) und ist als „Beispiel-SDB“ gekennzeichnet. Nie in `entries.ts` oder Server-Komponenten importieren.

## Neue Stoffe hinzufügen (Batch-Workflow)

1. Einen neuen Block in `entries.ts` **am Ende** von `HAZARDOUS_SUBSTANCE_SEO_ENTRIES` anfügen.
2. **Nur** diese Felder befüllen (`HazardousSubstanceSeoEntry` in `types.ts`):
   - `slug`, `substanceName`, `metaDescription`
   - `typicalIndustries`
3. **Nicht** setzen (Validierung schlägt fehl): CAS, GHS, Signalwort, H/P, PSA, LGK, `documentDisplayName`, `synonyms`, `applicationAreaWorkplace`, FAQs pro Stoff — entfernt.
4. FAQs werden im Template generiert (`lib/betriebsanweisung/build-substance-faq.ts`).
5. Validierung: `npm run validate:betriebsanweisung`
6. Build & GitHub-Pages-Sync: `npm run build:github-pages`

Slugs: Kleinbuchstaben, Bindestriche, Suffix `-trgs-555` (Beispiel: `aceton-trgs-555`).

Es gibt **keine** pro-Stoff-Page-Dateien — nur diese Datenliste und das Template unter `app/betriebsanweisung/[slug]/page.tsx`.
