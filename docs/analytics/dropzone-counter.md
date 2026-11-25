# Dropzone-Demo-Zähler (Live-Test)

## Was gezählt wird

| Event | Auslöser |
| --- | --- |
| `dropzone_upload` | Echter PDF-Upload in der SDB-Dropzone (`#live-demo` / pSEO-Dropzones) |
| `quick_example` | 1-Klick-Beispiel (Chip, Mobile-Quick-Button, Hero „Beispiel-SDB testen“) |

Pro Event werden nur übermittelt: Event-Typ, ISO-Zeitstempel, Seitenpfad (`pathname`), `is_internal`. Kein Dateiname, kein SDB-Inhalt, keine IP, keine Third-Party-Tracker.

Bestehende Funnel-Events (`landing_view`, `dropzone_interaction`, …) bleiben unverändert.

## Als intern markieren (Julian / Team)

Interne Tests fließen **nicht** in die externen KPIs (`is_internal: true`):

1. **Einmalig im Browser:** beliebige Landing-URL mit `?internal=1` öffnen, z. B. `https://gefahrstoff-qr.de/?internal=1` — setzt `localStorage` Schlüssel `gqr_internal`.
2. **Lokal:** `localhost` / `127.0.0.1`
3. **Preview:** Hosts `*.github.io`, `*.vercel.app`
4. **Build:** `NEXT_PUBLIC_GQR_MARK_INTERNAL=true` (nur für Test-Builds)

## 24h-Zahlen auslesen (App-Repo)

Nach Deployment der Supabase-Migration `156_landing_funnel_events` im Repo `JulianGrafen/gefahrstoff-qr`:

```bash
cd gefahrstoff-qr
NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... pnpm run report:dropzone-24h
```

Alternativ in SQL (Supabase SQL Editor):

```sql
SELECT * FROM landing_demo_counter_24h;
```

Ausgabe: `event`, `is_internal`, `event_count`.