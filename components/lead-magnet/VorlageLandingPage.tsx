import Link from 'next/link';
import { VorlageDownloadForm } from './VorlageDownloadForm';
import {
  VORLAGE_GQR_BENEFITS,
  VORLAGE_LANDING_SEO,
} from '@/config/vorlage-landing';
import { CheckCircle2, FileSpreadsheet } from 'lucide-react';

export function VorlageLandingPage() {
  return (
    <div className="bg-slate-100 text-slate-900">
      {/* Hero */}
      <section
        className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100"
        aria-labelledby="vorlage-hero-title"
      >
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <FileSpreadsheet className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <span>Gratis Excel-Vorlage · GefStoffV-konform strukturiert</span>
          </div>

          <h1
            id="vorlage-hero-title"
            className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]"
          >
            Gefahrstoffverzeichnis: Kostenlose Excel-Vorlage für dein Audit
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Sofort einsatzbereit, rechtssicher strukturiert und ideal für die{' '}
            <strong className="font-semibold text-slate-800">Gefährdungsbeurteilung</strong> nach
            GefStoffV. Lade dir jetzt unsere Vorlage herunter.
          </p>

          <VorlageDownloadForm className="mt-10" />

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              Keine Kreditkarte
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              Sofort nutzbar in Excel
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              Audit-taugliche Struktur
            </li>
          </ul>
        </div>
      </section>

      {/* Problem */}
      <section className="border-b border-slate-200 bg-white" aria-labelledby="problem-title">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <h2
            id="problem-title"
            className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Warum Excel beim Gefahrstoffmanagement irgendwann scheitert
          </h2>
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
        className="border-b border-slate-200 bg-slate-50"
        aria-labelledby="gqr-bridge-title"
      >
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <h2
            id="gqr-bridge-title"
            className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Dein Upgrade: vom Excel-Start zum digitalen Compliance-Cockpit
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
            Du arbeitest bereits mit Excel? Kein Problem. Nutze unsere Vorlage als Startpunkt. Wenn
            dein Verzeichnis wächst, bietet Gefahrstoff-QR (GQR) dir das Upgrade auf das digitale
            Compliance-Cockpit für professionelles{' '}
            <strong className="font-semibold text-slate-800">Gefahrstoffmanagement im Betrieb</strong>:
          </p>

          <ul className="mt-8 space-y-4">
            {VORLAGE_GQR_BENEFITS.map((item) => (
              <li
                key={item.title}
                className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#ff6b35]"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.description}</p>
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
            <p className="text-sm text-slate-500">
              5 Stoffe gratis · Keine Kreditkarte · In Minuten startklar
            </p>
          </div>
        </div>
      </section>

      {/* SEO Fließtext */}
      <section className="bg-white" aria-labelledby="seo-section-title">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <h2
            id="seo-section-title"
            className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Gefahrstoffverzeichnis erstellen: Vorlage, Gefährdungsbeurteilung und der nächste Schritt
          </h2>

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
            <p className="mt-2 text-sm text-slate-600">
              {VORLAGE_LANDING_SEO.description}
            </p>
            <VorlageDownloadForm className="mt-6 !shadow-none" />
          </div>
        </div>
      </section>
    </div>
  );
}
