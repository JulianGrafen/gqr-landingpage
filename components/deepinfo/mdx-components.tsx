import type { ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';
import { ExpertCallout } from '@/components/expert-blog/ExpertCallout';

function DarkCallout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <ExpertCallout title={title} tone="dark">
      {children}
    </ExpertCallout>
  );
}

/**
 * MDX-Komponenten für Deepinfo — dunkles GQR-Theme.
 */
export const deepinfoMdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-10 text-2xl font-bold tracking-tight text-[#f0f6ff] first:mt-0 sm:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 text-xl font-bold text-[#f0f6ff]">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mt-4 text-base leading-relaxed text-[#8fa4c0]">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-[#8fa4c0] marker:text-[#ff6b35]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-[#8fa4c0] marker:font-semibold marker:text-[#ff6b35]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-[#c8d4e6]">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-semibold text-[#2dd4bf] underline-offset-2 hover:underline"
    >
      {children}
    </a>
  ),
  Callout: DarkCallout,
};
