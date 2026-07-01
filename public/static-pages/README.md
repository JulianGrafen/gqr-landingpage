# Static Pages — HTML + JSON Struktur

## Übersicht

Diese Dateien enthalten 4 Landingpages als vollständig standalone HTML+JSON-Kombination:

- `gefahrstoff-app.html` + `gefahrstoff-app.json` — Gefahrstoff App (Mobile QR-Lösung)
- `excel-vorlage.html` + `excel-vorlage.json` — Excel-Vorlage Gefahrstoffverzeichnis
- `kataster-erstellen.html` + `kataster-erstellen.json` — How-To: Gefahrstoffkataster erstellen
- `kataster-software.html` + `kataster-software.json` — Gefahrstoffkataster Software (GQR)

## Verwendung

### HTML-Dateien öffnen
Die HTML-Dateien sind vollständig standalone und können direkt im Browser geöffnet werden:

```Betriebsanweisungsh
# Mit lokaler Datei öffnen
open file:///Users/julian/GQR-Landingpage/public/static-pages/gefahrstoff-app.html

# Oder mit lokalem Server
cd /Users/julian/GQR-Landingpage/public/static-pages
python3 -m http.server 8000
# Browser: http://localhost:8000/gefahrstoff-app.html
```

### Content editieren
Der gesamte Content ist in separaten **JSON-Dateien** organisiert. Um Änderungen vorzunehmen:

1. Öffne die entsprechende `.json` Datei (z.B. `gefahrstoff-app.json`)
2. Ändere die Texte direkt in den JSON-Feldern
3. Speichere die Datei
4. Lade die HTML-Seite im Browser neu (F5)

**Beispiel:**

```json
{
  "hero": {
    "h1": "Hier kannst du den Titel ändern",
    "lead": "Und hier die Beschreibung"
  }
}
```

## Struktur der JSON-Dateien

### Betriebsanweisungsis-Felder (alle Silos)

```json
{
  "seo": {
    "title": "Seitentitel für Browser/Google",
    "description": "Meta-Description",
    "ogImageAlt": "OG-Image-Alt-Text"
  },
  "breadcrumb": [
    { "label": "Start", "href": "/" },
    { "label": "Seite", "href": "/seite/" }
  ],
  "hero": {
    "eyebrow": "Kleine Überschrift",
    "h1": "Großer Titel",
    "lead": "Beschreibungstext",
    "proofLine": "Kurze Begründung",
    "primaryCta": { "label": "Button", "href": "...", "external": true },
    "secondaryCta": { "label": "Button", "href": "...", "external": false },
    "trustBullets": ["Punkt 1", "Punkt 2"],
    "image": { "src": "...", "alt": "...", "width": 390, "height": 844 }
  },
  "sections": [ /* Siehe unten */ ],
  "features": { /* Features-Grid */ },
  "faq": [ /* FAQ */ ],
  "closingCta": { /* Closing CTA */ }
}
```

### Sektion-Typen

#### Prose-Sektion (Text-Block)
```json
{
  "id": "my-section",
  "type": "prose",
  "eyebrow": "Kleine Überschrift",
  "title": "Sektions-Titel",
  "intro": "Einleitung (kursiv)",
  "body": "<p>HTML-Body. Kann <strong>HTML</strong> enthalten.</p>",
  "variant": "raised" /* optional — grauer Hintergrund */
}
```

#### SplitMedia-Sektion (Text + Bild nebeneinander)
```json
{
  "id": "qr-demo",
  "type": "splitMedia",
  "eyebrow": "...",
  "title": "...",
  "lead": "...",
  "bullets": ["Punkt 1", "Punkt 2"],
  "media": {
    "src": "/images/demo.gif",
    "alt": "...",
    "width": 473,
    "height": 1024,
    "variant": "portrait"
  },
  "reverse": true, /* Bild rechts statt links */
  "cta": { "label": "Button", "href": "..." }
}
```

#### Comparison-Tabelle
```json
{
  "id": "comparison",
  "type": "comparison",
  "targetAudience": "Zielgruppe",
  "leftColumnTitle": "Altes System",
  "rightColumnTitle": "GQR",
  "rows": [
    {
      "criterion": "Kriterium",
      "manual": "Alte Lösung",
      "gqr": "GQR-Lösung"
    }
  ]
}
```

#### Steps-Sektion (Nur in kataster-erstellen)
```json
"steps": [
  {
    "id": "step-1",
    "number": 1,
    "title": "Schritt-Titel",
    "regulatoryRef": "§ 6 GefStoffV",
    "description": "Beschreibung",
    "gqrHint": "Hinweis wie GQR hilft"
  }
]
```

## Responsive Design

Die HTML-Dateien sind vollständig responsive (Mobile, Tablet, Desktop). Das CSS ist inline implementiert mit media queries.

## Wichtige Hinweise

### Links editieren
- Interne Links: `/gefahrstoff-app/` (relativ)
- Externe Links: `https://app.gefahrstoff-qr.de/register` (absolut)
- `"external": true` → öffnet in neuem Tab

### HTML in JSON
Die `body`-Felder unterstützen HTML. Beispiel:

```json
"body": "<p>Text mit <strong>Fettdruck</strong> und <a href=\"/link/\">Links</a>.</p>"
```

### Bilder einfügen
Alle Bilder müssen in `/public/images/` liegen und über relative Pfade verlinkt werden:

```json
"image": {
  "src": "/images/my-image.jpg",
  "alt": "Beschreibung",
  "width": 1200,
  "height": 600
}
```

### FAQ expandable
Die FAQ-Fragen sind interaktiv: Klick auf die Frage klappt die Antwort aus.

## Deployment

Die statischen Seiten können überall gehostet werden:

- **Lokal:** `file://` oder HTTP-Server
- **CDN:** Z.B. auf Netlify, Vercel, oder S3
- **Integration mit React:** Parallel zu den React-Pages unter `/static-pages/`

## Performance

- **Gesamtgröße:** ~30-40 KB HTML + JSON pro Seite
- **Load-Zeit:** < 1 Sekunde (lokal/CDN)
- **Keine externen Dependencies** — vollständig standalone

## Versioning

Beide Versionen (React + Static HTML) können parallel existieren:

- React-Pages: `localhost:3000/gefahrstoff-app/`
- Static Pages: `/public/static-pages/gefahrstoff-app.html`

---

**Editoren-Tipps:**

1. Nutze einen JSON-Validator (z.B. VS Code) um Syntax zu prüfen
2. Bei langen Texten: Nutze `\n` für Zeilenumbrüche
3. Special Characters in JSON: `"` → `\"`, `<` → besser HTML-escaped
4. Nach Änderungen: Browser-Cache leeren (Ctrl+Shift+Delete / Cmd+Shift+Delete)
