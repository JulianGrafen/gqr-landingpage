import { IndustryFooter } from '@/components/IndustryFooter';

export default function LoesungenSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <IndustryFooter />
    </>
  );
}
