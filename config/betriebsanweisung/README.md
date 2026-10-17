# Betriebsanweisung — Programmatic SEO Daten

## Neue Stoffe hinzufügen (Batch-Workflow)

1. Einen neuen Block in `entries.ts` **am Ende** von `HAZARDOUS_SUBSTANCE_SEO_ENTRIES` anfügen (Konflikte in Nightly-PRs minimieren).
2. Pflichtfelder: siehe `types.ts` (`HazardousSubstanceSeoEntry`), inkl. **genau 3** FAQs (`SubstanceFaqTuple`).
3. Faktische Angaben (CAS, H-Sätze, LGK, PSA) aus harmonisierter CLP-Einstufung bzw. typischem Hersteller-SDB ableiten; bei Gemischen `casNumber.kind: 'mixture'` und `classificationBasis` nutzen.
4. Validierung: `npm run validate:betriebsanweisung`
5. Build & GitHub-Pages-Sync: `npm run build:github-pages` (generiert Sitemap, exportiert `/betriebsanweisung/`).

Slugs: Kleinbuchstaben, Bindestriche, Suffix `-trgs-555` (Beispiel: `aceton-trgs-555`).

Es gibt **keine** pro-Stoff-Page-Dateien — nur diese Datenliste und das Template unter `app/betriebsanweisung/[slug]/page.tsx`.
