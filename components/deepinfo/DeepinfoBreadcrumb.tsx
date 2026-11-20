import { SiteBreadcrumb } from '@/components/seo/SiteBreadcrumb';
import { buildDeepinfoBreadcrumbs } from '@/lib/wissen/build-deepinfo-breadcrumbs';

type DeepinfoBreadcrumbProps = {
  label: string;
};

export function DeepinfoBreadcrumb({ label }: DeepinfoBreadcrumbProps) {
  return <SiteBreadcrumb items={buildDeepinfoBreadcrumbs(label)} />;
}
