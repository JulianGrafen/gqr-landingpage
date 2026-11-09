/**
 * Erzeugt /loesungen/kfz-werkstatt/ aus index.html — Branchen-Landingpage Kfz-Werkstatt.
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, 'index.html');
const OUT_DIR = path.join(ROOT, 'static-loesungen', 'kfz-werkstatt');
const OUT_FILE = path.join(OUT_DIR, 'index.html');

const CANONICAL = 'https://gefahrstoff-qr.de/loesungen/kfz-werkstatt/';
const META_TITLE = 'Gefahrstoffverzeichnis Kfz-Werkstatt & Betriebsanweisung Werkstatt | Gefahrstoff-QR';
const META_DESC =
  'Gefahrstoffverzeichnis Kfz-Werkstatt: Öle, Bremsenreiniger, DME-Protokoll und Betriebsanweisungen aus dem Sicherheitsdatenblatt per KI.';

const INDUSTRY_SECTION = `
 <!-- BRANCHEN: KFZ-WERKSTATT -->
 <section id="werkstatt-stoffe" class="border-t border-white/[0.07] bg-white/[0.02] py-14 lg:py-24" aria-labelledby="stoffe-heading">
 <div class="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-10">
 <p class="mb-3 text-xs font-bold uppercase tracking-wider text-[#ff6b35] sm:text-sm">Ihre Branche</p>
 <h2 id="stoffe-heading" class="text-2xl font-black text-[#f0f6ff] sm:text-3xl lg:text-4xl">Häufige Gefahrstoffe in Ihrer Branche</h2>
 <p class="mt-4 text-base text-[#8fa4c0]">Beispiele aus der Praxis — ergänzen Sie im Betrieb alle Stoffe, die Sie tatsächlich einsetzen, lagern oder abgeben.</p>
 <ul class="mt-8 grid gap-3 sm:grid-cols-2" role="list">
 <li class="flex gap-3 rounded-xl border border-white/[0.08] bg-[#0f1e35]/70 px-4 py-3 text-sm font-medium text-[#c5d0e2]"><span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ff6b35]" aria-hidden="true"></span>Motor- und Getriebeöle</li>
 <li class="flex gap-3 rounded-xl border border-white/[0.08] bg-[#0f1e35]/70 px-4 py-3 text-sm font-medium text-[#c5d0e2]"><span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ff6b35]" aria-hidden="true"></span>Bremsenreiniger / stark lösende Reiniger</li>
 <li class="flex gap-3 rounded-xl border border-white/[0.08] bg-[#0f1e35]/70 px-4 py-3 text-sm font-medium text-[#c5d0e2]"><span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ff6b35]" aria-hidden="true"></span>Kühlerfrostschutz (Glykol)</li>
 <li class="flex gap-3 rounded-xl border border-white/[0.08] bg-[#0f1e35]/70 px-4 py-3 text-sm font-medium text-[#c5d0e2]"><span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ff6b35]" aria-hidden="true"></span>Dieselruß und Motorabgasemissionen (DME-Protokolle)</li>
 <li class="flex gap-3 rounded-xl border border-white/[0.08] bg-[#0f1e35]/70 px-4 py-3 text-sm font-medium text-[#c5d0e2] sm:col-span-2"><span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ff6b35]" aria-hidden="true"></span>Altöl und Abfälle aus Abscheidern</li>
 </ul>
 </div>
 </section>

 <section id="werkstatt-vorteil" class="border-t border-white/[0.07] bg-[#0f1e35]/30 py-14 lg:py-24" aria-labelledby="vorteil-heading">
 <div class="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-10">
 <h2 id="vorteil-heading" class="text-2xl font-black text-[#f0f6ff] sm:text-3xl lg:text-4xl">Wie Gefahrstoff-QR Ihre Werkstatt erleichtert</h2>
 <p class="mt-6 text-lg font-semibold leading-relaxed text-[#f0f6ff]">Wiederkehrende Erfassungen und ein nachvollziehbares DME-Protokoll lassen sich parallel zum Gefahrstoffverzeichnis führen – ohne zweite Excel-Parallelwelt.</p>
 <p class="mt-6 leading-relaxed text-[#8fa4c0]">Werkstätten arbeiten oft mit vielen Herstellern und schnellen Produktwechseln. Wenn Sicherheitsdatenblätter nicht zeitnah in Verzeichnis und betriebliche Unterweisung einfließen, entstehen Lücken bei Prüfungen. KI-gestützte Extraktion aus dem PDF reduziert den manuellen Aufwand bei H- und P-Sätzen sowie Schutzmaßnahmen.</p>
 <p class="mt-6 text-sm leading-relaxed text-[#8fa4c0]">Gefahrstoff-QR unterstützt Sie bei einem <strong class="font-semibold text-[#c5d0e2]">Gefahrstoffverzeichnis nach §&nbsp;6 GefStoffV</strong> und bei <strong class="font-semibold text-[#c5d0e2]">Betriebsanweisungen</strong>, die Sie fachlich prüfen und freigeben. KI extrahiert strukturierte Angaben aus dem Sicherheitsdatenblatt — Sie behalten die Verantwortung für Bewertung und Dokumentation.</p>
 </div>
 </section>
`;

let html = fs.readFileSync(SOURCE, 'utf8');

html = html
  .replace(
    '<title>Gefahrstoffmanagement Software &amp; App:Excel-Alternative | Gefahrstoff-QR</title>',
    `<title>${META_TITLE}</title>`,
  )
  .replace(
    'content="Gefahrstoffkataster &amp; App: Excel-Alternative mit KI-Sicherheitsdatenblatt-Import, QR-Notfallpass und Revisionsverlauf nach § 6. Kostenlos testen."',
    `content="${META_DESC}"`,
  )
  .replace('<link rel="canonical" href="https://gefahrstoff-qr.de/" />', `<link rel="canonical" href="${CANONICAL}" />`)
  .replace(
    '<meta property="og:title" content="Cloud Gefahrstoffmanagement Software: strukturierter als Excel | Gefahrstoff-QR">',
    '<meta property="og:title" content="Gefahrstoffverzeichnis Kfz-Werkstatt &amp; Betriebsanweisung Werkstatt">',
  )
  .replace(
    '<meta property="og:url" content="https://gefahrstoff-qr.de/">',
    `<meta property="og:url" content="${CANONICAL}">`,
  )
  .replace(
    '<meta name="twitter:title" content="Gefahrstoffkataster Software &amp; App: Die Excel-Alternative | Gefahrstoff-QR">',
    '<meta name="twitter:title" content="Gefahrstoffverzeichnis Kfz-Werkstatt &amp; Betriebsanweisung Werkstatt">',
  )
  .replace('"url": "https://gefahrstoff-qr.de/"', `"url": "${CANONICAL}"`)
  .replace(
    '"name": "Gefahrstoffmanagement Software: 10x effizienter als Excel | Gefahrstoff-QR"',
    '"name": "Gefahrstoffmanagement für Kfz-Werkstätten | Gefahrstoff-QR"',
  )
  .replace(/href="style\.css/g, 'href="/style.css')
  .replace(/href="tw\.css/g, 'href="/tw.css')
  .replace('src="logo.png"', 'src="/logo.png"')
  .replace('src="./linkedIn.png"', 'src="/linkedIn.png"');

/** Hero der Startseite: von der H1 bis einschließlich Microcopy unter den CTAs (textunabhängig). */
const heroOldPattern =
  /<h1 id="heroHeadline"[\s\S]*?<\/h1>[\s\S]*?<div class="mt-8 flex flex-wrap justify-center gap-4">[\s\S]*?<\/div>\s*<p class="mt-4 w-full[^"]*">[\s\S]*?<\/p>/;

const heroNew = `<p class="mb-3 w-full text-xs font-bold uppercase tracking-wider text-[#ff6b35] sm:text-sm text-center md:text-left">Branchenlösung</p>
<h1 id="heroHeadline" class="sds-hero__title flex w-full flex-wrap flex-col items-center md:items-start justify-center text-center md:text-left">
 Gefahrstoffmanagement für Kfz-Werkstätten
</h1>
 <p class="text-2xl mt-5 sds-hero__subtitle text-center md:text-left">Vom Bremsenreiniger bis zu den Anforderungen rund um Dieselmotor-Emissionen (DME) – Stoffe, Mengen und Sicherheitsdatenblätter an einem Ort.</p>
 <div class="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
   <a class="btn-cta-orange px-8 py-3 text-white" style="color: white !important;" href="https://app.gefahrstoff-qr.de/">Jetzt kostenlos testen</a>
   <a class="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-[#f0f6ff] transition hover:border-white/35 hover:bg-white/[0.06]" href="/">Zur Startseite</a>
 </div>`;

if (!heroOldPattern.test(html)) {
  console.error('Hero-Block in index.html nicht gefunden: Generator anpassen.');
  process.exit(1);
}

html = html.replace(heroOldPattern, heroNew);
html = html.replace(' <!-- EINSTIEGE -->', `${INDUSTRY_SECTION}\n\n <!-- EINSTIEGE -->`);

// Branchen-Karte Kfz hervorheben
html = html.replace(
  '<a href="/loesungen/kfz-werkstatt/" class="group flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#0f1e35]/50 p-5 shadow-lg transition-all hover:border-white/[0.15] hover:bg-[#0f1e35]/70 no-underline">',
  '<a href="/loesungen/kfz-werkstatt/" aria-current="page" class="group flex h-full flex-col rounded-2xl border-2 border-[#ff6b35]/50 bg-[#162340] p-5 shadow-lg ring-1 ring-orange-400/20 no-underline">',
);

const KFZ_PACKAGE_HINT = `<p class="mx-auto mb-8 max-w-3xl text-center text-sm leading-relaxed text-[#8fa4c0]">
 <strong class="text-[#f0f6ff]">Welches Paket passt in der Werkstatt?</strong>
 Funktionstest: <strong class="text-[#c5d0e2]">TarifVorschau</strong> ·
 bis 30 Stoffe, ein Betrieb: <strong class="text-[#c5d0e2]">KMU Basis</strong> ·
 viele Stoffe &amp; Batch: <strong class="text-[#c5d0e2]">KMU Pro</strong>
 </p>`;

function trimPricingToProfessional(pageHtml) {
  let out = pageHtml.replace(
    /<p class="mx-auto mb-8 max-w-3xl[\s\S]*?SiFa Multi-Mandant<\/strong>\s*<\/p>/,
    KFZ_PACKAGE_HINT,
  );

  out = out.replace(
    /(<div class="pricing-tier-grid"[^>]*>)([\s\S]*?)(<\/div>\s*\n\s*<details class="pricing-compare)/,
    (_, open, content, close) => {
      const articles = content.match(/\n <article[\s\S]*?<\/article>/g) || [];
      const kept = articles.filter((article) => !article.includes('>SiFa Multi-Mandant</p>'));
      const gridOpen = open.replace(
        '<div class="pricing-tier-grid">',
        '<div class="pricing-tier-grid" style="grid-template-columns: repeat(3, minmax(240px, 1fr));">',
      );
      return `${gridOpen}${kept.join('')}\n\n ${close}`;
    },
  );

  out = out.replace(
    /(<section id="preise"[\s\S]*?<table class="pricing-compare__table">)([\s\S]*?)(<\/table>)/,
    (_, tableOpen, tableInner, tableClose) => {
      let t = tableInner
        .replace(
          /<caption>[\s\S]*?<\/caption>/,
          '<caption>Vergleich der Pakete TarifVorschau, KMU Basis und KMU Pro</caption>',
        )
        .replace(/\s*<th scope="col">SiFa Multi-Mandant<\/th>/, '')
        .replace(/\s*<tr>\s*<th scope="row">PDF-Rechnung \(Direktkauf\)<\/th>[\s\S]*?<\/tr>/, '')
        .replace(/\s*<tr>\s*<th scope="row">Mandanten- &amp; Werkstrennung<\/th>[\s\S]*?<\/tr>/, '')
        .replace(/\s*<tr>\s*<th scope="row">Begehungs-Modus \(ohne SDB\)<\/th>[\s\S]*?<\/tr>/, '');

      t = t.replace(/<tr>([\s\S]*?)<\/tr>/g, (rowMatch, inner) => {
        if (!inner.includes('<td')) return rowMatch;
        const lastTdIndex = inner.lastIndexOf('<td');
        if (lastTdIndex === -1) return rowMatch;
        return `<tr>${inner.slice(0, lastTdIndex).trimEnd()}</tr>`;
      });

      return `${tableOpen}${t}${tableClose}`;
    },
  );

  return out;
}

html = trimPricingToProfessional(html);

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, html, 'utf8');
fs.cpSync(OUT_FILE, path.join(ROOT, 'loesungen', 'kfz-werkstatt', 'index.html'));
console.log('✓ static-loesungen/kfz-werkstatt/index.html');
console.log('✓ loesungen/kfz-werkstatt/index.html');
