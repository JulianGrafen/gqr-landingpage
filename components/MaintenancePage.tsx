/** Wartungsseite — gleiches Design wie Marketing-Landing (Dark Navy + Orange). */
export function MaintenancePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mx-auto max-w-lg">
        <span className="mb-10 inline-block" aria-hidden="true">
          <img src="/logo.png" alt="Gefahrstoff-QR" width={180} height={48} className="mx-auto h-auto w-[180px]" />
        </span>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#ff6b35]">Wartungsmodus</p>
        <h1 className="text-3xl font-black leading-tight text-[#f0f6ff] sm:text-4xl">
          Kurz Wartung — wir sind gleich wieder da
        </h1>
        <p className="mt-5 text-base leading-relaxed text-[#8fa4c0]">
          Die Marketing-Website wird gerade aktualisiert. Bestehende Kunden können die App wie gewohnt nutzen.
        </p>
        <a
          className="btn-cta-orange mt-8 inline-flex min-h-[48px] items-center justify-center px-8 text-white no-underline"
          href="https://app.gefahrstoff-qr.de/login"
          style={{ color: 'white' }}
        >
          Zur App-Anmeldung
        </a>
        <p className="mt-8 text-xs text-[#8fa4c0]">
          Fragen?{' '}
          <a href="mailto:info@gefahrstoff-qr.de" className="text-teal-300 underline-offset-2 hover:underline">
            info@gefahrstoff-qr.de
          </a>
        </p>
      </div>
    </main>
  );
}
