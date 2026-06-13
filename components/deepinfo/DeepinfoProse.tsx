import { MDXRemote } from 'next-mdx-remote/rsc';
import { deepinfoMdxComponents } from '@/components/deepinfo/mdx-components';

type DeepinfoProseProps = {
  source: string;
};

export function DeepinfoProse({ source }: DeepinfoProseProps) {
  return <MDXRemote source={source} components={deepinfoMdxComponents} />;
}
