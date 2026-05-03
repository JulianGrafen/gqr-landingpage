import type { Metadata } from 'next';
import './globals.css';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';

const siteUrl = 'https://gefahrstoff-qr.de';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Gefahrstoff-QR | Digitales Gefahrstoffverzeichnis',
    template: '%s | Gefahrstoff-QR',
  },
  description:
    'Gefahrstoffverzeichnis und Betriebsanweisungen mit KI-Extraktion aus Sicherheitsdatenblättern — GefStoffV, CLP, REACH.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
