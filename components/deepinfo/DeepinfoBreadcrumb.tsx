import { SiteBreadcrumb } from '@/components/seo/SiteBreadcrumb';

type DeepinfoBreadcrumbProps = {
  label: string;
};

export function DeepinfoBreadcrumb({ label }: DeepinfoBreadcrumbProps) {
  return (
    <SiteBreadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Wissen', href: '/wissen/' },
        { label },
      ]}
    />
  );
}
