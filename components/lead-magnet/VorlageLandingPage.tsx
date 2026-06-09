import Link from 'next/link';
import { VorlageDownloadForm } from './VorlageDownloadForm';
import { ExpertHeading } from '@/components/expert-blog/ExpertHeading';
import {
  VORLAGE_GQR_BENEFITS,
  VORLAGE_LANDING_SEO,
} from '@/config/vorlage-landing';
import { CheckCircle2 } from 'lucide-react';

export function VorlageLandingPage() {
  return (
    <article>
      {/* Hero */}
      <section
        className="border-b border-white/[0.07] bg-gradient-to-b from-[#0f1e35]/90 to-[#0a1628] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        aria-labelledby="vorlage-hero-title"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr),minmax(0,380px)] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#ff6b35] sm:text-sm">
              Gratis Excel-Vorlage · GefStoffV-konform
            </p>
            <h1
              id="vorlage-hero-title"
              className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#f0f6ff] sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]"
            >
              Gefahrstoffverzeichnis: Kostenlose Excel-Vorlage für dein Audit
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#8fa4c0]">
              Sofort einsatzbereit, rechtssicher strukturiert und ideal für die{' '}
              <strong className="font-semibold text-[#c8d4e6]">Gefährdungsbeurteilung</strong> nach
              GefStoffV. Lade dir jetzt unsere Vorlage herunter.
            </p>

            <VorlageDownloadForm className="mt-10" tone="dark" />

            <ul
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#8fa4c0]"
              aria-label="Vorteile der Vorlage"
            >
              {[
                'Keine Kreditkarte',
                'Sofort nutzbar in Excel',
                'Audit-taugliche Struktur',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-[#2dd4bf]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src="/images/gefahrstoffverzeichnis-app.svg"
              width={380}
              height={320}
              className="max-h-72 w-auto max-w-full drop-shadow-lg"
              loading="eager"
              decoding="async"
              alt="Gefahrstoffverzeichnis Excel-Vorlage und digitales Kataster im Vergleich"
            />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section
        className="border-b border-[#e5e7eb] bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        aria-labelledby="problem-title"
      >
        <div className="mx-auto max-w-3xl">
          <ExpertHeading
            id="problem-title"
            eyebrow="Praxis"
            title="Warum Excel beim Gefahrstoffmanagement irgendwann scheitert"
            tone="light"
          />
          <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
            Excel ist der Klassiker – doch bei 20+ Stoffen, wechselnden Standorten und jährlichen
            Audit-Anforderungen stößt man schnell an Grenzen: Manuelles Abtippen, fehlende
            SDB-Historie und kein Überblick über Lagerklassen. Wer ein{' '}
            <strong className="font-semibold text-slate-800">Gefahrstoffverzeichnis erstellen</strong>{' '}
            muss, merkt schnell: Die Tabelle wächst, die Pflege wird teuer – und bei der nächsten{' '}
            <strong className="font-semibold text-slate-800">Gefährdungsbeurteilung</strong> fehlen
            oft die Nachweise, die Prüfer erwarten.
          </p>
        </div>
      </section>

      {/* GQR Bridge */}
      <section
        className="border-b border-white/[0.07] bg-[#0a1628] px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        aria-labelledby="gqr-bridge-title"
      >
        <div className="mx-auto max-w-3xl">
          <ExpertHeading
            id="gqr-bridge-title"
            eyebrow="Upgrade"
            title="Dein Upgrade: vom Excel-Start zum digitalen Compliance-Cockpit"
            tone="dark"
          />
          <p className="mt-6 text-base leading-relaxed text-[#8fa4c0] sm:text-lg">
            Du arbeitest bereits mit Excel? Kein Problem. Nutze unsere Vorlage als Startpunkt. Wenn
            dein Verzeichnis wächst, bietet Gefahrstoff-QR (GQR) dir das Upgrade auf das digitale
            Compliance-Cockpit für professionelles{' '}
            <strong className="font-semibold text-[#c8d4e6]">Gefahrstoffmanagement im Betrieb</strong>:
          </p>

          <ul className="mt-8 space-y-4">
            {VORLAGE_GQR_BENEFITS.map((item) => (
              <li
                key={item.title}
                className="flex gap-4 rounded-2xl border border-white/[0.08] bg-[#0f1e35]/70 p-5 shadow-lg shadow-black/10"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#ff6b35]"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-bold text-[#f0f6ff]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#8fa4c0]">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="https://app.gefahrstoff-qr.de/register"
              className="gqr-cta-primary gqr-cta-primary--lg inline-flex no-underline"
            >
              GQR kostenlos testen
            </Link>
            <p className="text-sm text-[#8fa4c0]">
              5 Stoffe gratis · Keine Kreditkarte · In Minuten startklar
            </p>
          </div>
        </div>
      </section>

      {/* SEO Fließtext */}
      <section
        className="border-b border-[#e5e7eb] bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        aria-labelledby="seo-section-title"
      >
        <div className="mx-auto max-w-3xl">
          <ExpertHeading
            id="seo-section-title"
            eyebrow="Leitfaden"
            title="Gefahrstoffverzeichnis erstellen: Vorlage, Gefährdungsbeurteilung und der nächste Schritt"
            tone="light"
          />

          <div className="mt-8 space-y-8 text-base leading-relaxed text-slate-600">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Gefahrstoffverzeichnis Vorlage Excel – der pragmatische Einstieg
              </h3>
              <p className="mt-3">
                Wer nach „Gefahrstoffverzeichnis Vorlage Excel“ oder „Gefährdungsbeurteilung
                Gefahrstoffe Excel“ sucht, braucht zuerst Struktur: Produktname, H- und P-Sätze,
                Lagerklasse, Mengen und Verwendungsort. Unsere kostenlose Vorlage deckt die
                Pflichtfelder ab, die SiFa, BG und interne Audits typischerweise erwarten – ohne
                dass du von null an formatieren musst.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Gefährdungsbeurteilung und GefStoffV: Was die Vorlage abdeckt
              </h3>
              <p className="mt-3">
                Die{' '}
                <strong className="font-semibold text-slate-800">Gefährdungsbeurteilung</strong>{' '}
                nach GefStoffV verlangt nachvollziehbare Informationen über eingesetzte Stoffe und
                Mixturen. Mit der Excel-Vorlage kannst du Stoffe erfassen, Verantwortlichkeiten
                festhalten und das Verzeichnis als Basis für dein{' '}
                <strong className="font-semibold text-slate-800">Gefahrstoffmanagement</strong>{' '}
                nutzen – bis der Umfang und die Update-Frequenz Excel überfordern.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Wann digitales Gefahrstoffmanagement sinnvoller ist als Tabellen
              </h3>
              <p className="mt-3">
                Sobald SDB-Versionen wechseln, Standorte hinzukommen oder Mandanten getrennt
                geführt werden müssen, reicht eine statische Liste nicht mehr. GQR übernimmt dann
                die Pflege: automatische SDB-Extraktion, revisionssichere Archivierung und QR-Codes
                am Arbeitsplatz. So bleibt dein Verzeichnis audit-ready – ohne Excel-Chaos.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900">
              Bereit für dein Audit? Hol dir die Vorlage jetzt.
            </h3>
            <p className="mt-2 text-sm text-slate-600">{VORLAGE_LANDING_SEO.description}</p>
            <VorlageDownloadForm className="mt-6 !shadow-none" tone="light" />
          </div>
        </div>
      </section>
    </article>
  );
}
