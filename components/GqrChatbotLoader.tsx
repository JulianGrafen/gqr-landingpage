'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

/** Kein Live-Chat auf Betriebsanweisungs-Landingpages (Cookie-/AI-Transparenz). */
export function GqrChatbotLoader() {
  const pathname = usePathname() ?? '';
  if (pathname.startsWith('/betriebsanweisung')) {
    return null;
  }

  return <Script src="/scripts/gqr-chatbot.js" strategy="lazyOnload" />;
}
