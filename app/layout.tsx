import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import './globals.css';
import { MaintenancePage } from '@/components/MaintenancePage';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { SITE_DEFAULT_SEO, SITE_URL } from '@/config/site-seo';

const maintenanceEnabled = fs.existsSync(path.join(process.cwd(), '.gqr-maintenance'));

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_DEFAULT_SEO.title,
    template: '%s | Gefahrstoff-QR',
  },
  description: SITE_DEFAULT_SEO.description,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-192x192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (maintenanceEnabled) {
    return (
      <html lang="de">
        <head>
          <meta name="robots" content="noindex, nofollow" />
        </head>
        <body className="flex min-h-screen flex-col bg-[#0a1628]">
          <MaintenancePage />
        </body>
      </html>
    );
  }

  return (
    <html lang="de">
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <script src="/scripts/gqr-chatbot.js" defer />
      </body>
    </html>
  );
}
