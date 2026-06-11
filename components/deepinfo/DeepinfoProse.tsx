import { MDXRemote } from 'next-mdx-remote/rsc';
import { deepinfoMdxComponents } from '@/components/deepinfo/mdx-components';

type DeepinfoProseProps = {
  source: string;
};

export function DeepinfoProse({ source }: DeepinfoProseProps) {
  return (
    <article
      id="deepinfo-content"
      className="rounded-2xl border border-white/[0.08] bg-[#162340]/50 p-6 sm:p-8 lg:p-10"
    >
      <MDXRemote source={source} components={deepinfoMdxComponents} />
    </article>
  );
}
