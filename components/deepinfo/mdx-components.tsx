import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';
import { ExpertCallout } from '@/components/expert-blog/ExpertCallout';

function DarkCallout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <ExpertCallout title={title} tone="dark">
      {children}
    </ExpertCallout>
  );
}

/** MDX-Elemente — Styling über `.gqr-post-content` in gloBetriebsanweisungls.css (Blog-Parität). */
export const deepinfoMdxComponents: MDXComponents = {
  Callout: DarkCallout,
};
