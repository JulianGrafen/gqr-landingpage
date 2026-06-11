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

/** MDX-Komponenten für Deepinfo — GQR Landingpage-Palette. */
export const deepinfoMdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-10 text-2xl font-bold tracking-tight text-gqr-text first:mt-0 sm:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 text-xl font-bold text-gqr-text">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mt-4 text-base leading-relaxed text-gqr-muted">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-gqr-muted marker:text-gqr-accent">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-gqr-muted marker:font-semibold marker:text-gqr-accent">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-gqr-soft">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a href={href} className="gqr-link">
      {children}
    </a>
  ),
  Callout: DarkCallout,
};
