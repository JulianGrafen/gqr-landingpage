import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-[#f0f6ff] sm:text-3xl">
        Seite nicht gefunden
      </h1>
      <p className="mt-3 max-w-md text-[#8fa4c0]">
        Diese Branchen-Seite existiert nicht oder wurde verschoben.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-[#f0f6ff] no-underline hover:bg-white/[0.06]"
      >
        Zur Startseite
      </Link>
    </main>
  );
}
