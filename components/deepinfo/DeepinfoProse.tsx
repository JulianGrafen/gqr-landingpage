import { MDXRemote } from 'next-mdx-remote/rsc';
import { deepinfoMdxComponents } from '@/components/deepinfo/mdx-components';

type DeepinfoProseProps = {
  source: string;
};

export function DeepinfoProse({ source }: DeepinfoProseProps) {
  return (
    <article
      id="deepinfo-content"
      className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-p:text-slate-600 prose-li:text-slate-600 prose-a:text-teal-700 prose-a:no-underline hover:prose-a:underline"
    >
      <MDXRemote source={source} components={deepinfoMdxComponents} />
    </article>
  );
}
