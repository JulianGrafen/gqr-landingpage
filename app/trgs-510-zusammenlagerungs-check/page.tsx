import type { Metadata } from 'next';
import { ShieldCheck, Smartphone, Table2 } from 'lucide-react';
import { Trgs510AudienceCards } from '@/components/trgs510/Trgs510AudienceCards';
import { Trgs510CheckTool } from '@/components/trgs510/Trgs510CheckTool';
import { SITE_URL } from '@/config/site-seo';

const PAGE_PATH = '/trgs-510-zusammenlagerungs-check/';
const canonical = `${SITE_URL}${PAGE_PATH}`;

const SEO_TITLE = 'TRGS 510 Zusammenlagerungs-Check: Lagerklassen prüfen';
const SEO_DESCRIPTION =
  'TRGS 510 Zusammenlagerung Tabelle interaktiv prüfen: Lagerklassen auswählen, Ampel-Ergebnis erhalten und die Automatisierung mit Gefahrstoff-QR kennenlernen.';

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  alternates: { canonical },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: canonical,
    siteName: 'Gefahrstoff-QR',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TRGS 510 Zusammenlagerungs-Check für Lagerklassen und Gefahrstoffe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

const featureCards = [
  {
    title: 'TRGS 510 Zusammenlagerung Tabelle',
    text: 'Die hinterlegte Matrix bewertet jede LGK-Kombination nach Tabelle 12 mit erlaubt, eingeschränkt oder Separatlagerung.',
    icon: Table2,
  },
  {
    title: 'Lagerklassen prüfen im Lager',
    text: 'Direkt am Gefahrstoffschrank per Smartphone nutzbar, ohne Blättern in dicken Papierordnern.',
    icon: Smartphone,
  },
  {
    title: 'Gefahrstoffe zusammenlagern',
    text: 'Das Tool zeigt die Regel und verweist bei Einschränkungen auf die relevanten TRGS-510-Erläuterungen.',
    icon: ShieldCheck,
  },
] as const;

export default function Trgs510ZusammenlagerungsCheckPage() {
  return (
    <main>
      <article>
        <header className="bg-gradient-to-b from-[#0f1e35]/90 to-[#0a1628] px-4 pb-4 pt-8 sm:px-6 lg:px-8 lg:pb-6 lg:pt-10">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-wider text-[#ff6b35] sm:text-sm">
              TRGS 510 · Zusammenlagerung · Lagerklassen
            </p>
            <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight text-[#f0f6ff] sm:text-4xl lg:text-[2.7rem] lg:leading-[1.12]">
              TRGS 510 Zusammenlagerungs-Check: Lagerklassen schnell und sicher prüfen
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#8fa4c0]">
              Prüfe die TRGS 510 Zusammenlagerung Tabelle direkt im Browser:
              Wähle zwei Lagerklassen, erhalte ein Ampel-Ergebnis und sieh, welche Regel
              für die Lagerung deiner Gefahrstoffe relevant ist.
            </p>
          </div>
        </header>

        <section
          id="trgs510-check"
          className="border-b border-white/[0.07] bg-[#0a1628] px-4 pb-14 pt-2 sm:px-6 lg:px-8 lg:pb-16"
          aria-label="TRGS 510 Zusammenlagerungs-Check Tool"
        >
          <div className="mx-auto max-w-5xl">
            <Trgs510CheckTool />
            <Trgs510AudienceCards />
          </div>
        </section>

        <section className="border-b border-[#e5e7eb] bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-wider text-[#ff6b35] sm:text-sm">
                Praxis & Hintergrund
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Lagerklassen prüfen statt TRGS-510-Tabelle manuell durchsuchen
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                Wer Gefahrstoffe zusammenlagern will, muss Lagerklassen korrekt zuordnen
                und die Matrix der TRGS 510 auswerten. Dieser Zusammenlagerungs-Check
                macht die Prüfung schneller verständlich, ohne die fachliche
                Gefährdungsbeurteilung zu ersetzen.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {featureCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff6b35]/12 text-[#ff6b35]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-slate-900">{card.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.07] bg-[#0a1628] px-4 py-8 sm:px-6 lg:px-8">
          <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-[#8fa4c0]">
            Keine Rechtsberatung: Lagerentscheidungen trifft die SiFa / Fachkraft im Betrieb. Das Tool unterstützt
            bei der Orientierung an TRGS 510.
          </p>
        </section>
      </article>
    </main>
  );
}
