import fs from 'node:fs';
import path from 'node:path';
import { HAZARDOUS_SUBSTANCE_SLUGS } from '@/config/betriebsanweisung/entries';
import { gitLastmodIsoDate } from '@/lib/sitemap/git-lastmod';
import { normalizeSitemapLoc, parsePageMeta, pathnameToLoc } from '@/lib/sitemap/page-meta';
import { SITE_URL } from '@/config/site-seo';

export type SitemapUrlEntry = {
  loc: string;
  lastmod: string;
  sourceFile: string;
};

const SKIP_DIR_NAMES = new Set([
  'node_modules',
  '.git',
  '_next',
  'out',
  '.next',
  'app',
  'components',
  'config',
  'content',
  'lib',
  'scripts',
  'src',
  'public',
  'docs',
  'downloads',
  'images',
  'static-loesungen',
  'notfall',
]);

const FALLBACK_LASTMOD = '2020-01-01';

function isSkippedDir(name: string): boolean {
  return SKIP_DIR_NAMES.has(name);
}

function walkHtmlFiles(dir: string, root: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (isSkippedDir(entry.name)) continue;
      walkHtmlFiles(full, root, out);
    } else if (entry.name.endsWith('.html') && entry.name !== '404.html') {
      out.push(full);
    }
  }
  return out;
}

export function defaultLocFromFile(root: string, filePath: string): string | null {
  const rel = path.relative(root, filePath).split(path.sep).join('/');
  if (rel === 'index.html') return pathnameToLoc('/');

  if (rel.endsWith('/index.html')) {
    const dir = rel.slice(0, -'/index.html'.length);
    return pathnameToLoc(`/${dir}/`);
  }

  if (rel.startsWith('blog/') && rel.endsWith('.html') && !rel.endsWith('/index.html')) {
    const base = rel.slice('blog/'.length, -'.html'.length);
    const legacyHtml = path.join(root, 'blog', `${base}.html`);
    if (fs.existsSync(legacyHtml)) {
      const html = fs.readFileSync(legacyHtml, 'utf8');
      const meta = parsePageMeta(html);
      if (meta.canonical) return meta.canonical;
    }
    return normalizeSitemapLoc(`${SITE_URL}/${rel}`);
  }

  if (rel.endsWith('/index.html') === false && rel.endsWith('.html')) {
    return normalizeSitemapLoc(`${SITE_URL}/${rel}`);
  }

  return null;
}

function fsPathFromUrlPathname(root: string, pathname: string, fileName: string): string {
  const segments = pathname.split('/').filter(Boolean).map((segment) => {
    try {
      return decodeURIComponent(segment);
    } catch {
      return segment;
    }
  });
  return path.join(root, ...segments, fileName);
}

function resolveDeployFile(root: string, loc: string): string | null {
  const url = new URL(loc);
  let pathname = url.pathname;
  if (pathname !== '/' && pathname.endsWith('/')) pathname = pathname.slice(0, -1);

  if (pathname === '' || pathname === '/') {
    const home = path.join(root, 'index.html');
    return fs.existsSync(home) ? home : null;
  }

  const indexPath = fsPathFromUrlPathname(root, pathname, 'index.html');
  if (fs.existsSync(indexPath)) return indexPath;

  if (pathname.startsWith('/blog/')) {
    if (pathname.endsWith('.html')) {
      const blogHtml = path.join(root, pathname.slice(1));
      if (fs.existsSync(blogHtml)) return blogHtml;
    } else {
      const slug = pathname.replace(/\/$/, '').slice('/blog/'.length);
      if (slug) {
        const legacyHtml = path.join(root, 'blog', `${slug}.html`);
        if (fs.existsSync(legacyHtml)) return legacyHtml;
      }
    }
  }

  return null;
}

function collectHtmlFiles(root: string): string[] {
  const files = new Set<string>();
  walkHtmlFiles(root, root, []).forEach((f) => files.add(f));
  walkHtmlFiles(path.join(root, 'betriebsanweisung'), root, []).forEach((f) => files.add(f));
  walkHtmlFiles(path.join(root, 'wissen'), root, []).forEach((f) => files.add(f));
  walkHtmlFiles(path.join(root, 'loesungen'), root, []).forEach((f) => files.add(f));
  walkHtmlFiles(path.join(root, 'blog'), root, []).forEach((f) => files.add(f));
  return [...files];
}

export function discoverSitemapEntries(root: string = process.cwd()): SitemapUrlEntry[] {
  const byLoc = new Map<string, SitemapUrlEntry>();

  for (const filePath of collectHtmlFiles(root)) {
    const html = fs.readFileSync(filePath, 'utf8');
    const meta = parsePageMeta(html);
    if (meta.noindex) continue;

    const relFile = path.relative(root, filePath).split(path.sep).join('/');
    const lastmod = gitLastmodIsoDate(root, relFile, FALLBACK_LASTMOD);

    let loc: string | null = meta.canonical;
    if (!loc) {
      loc = defaultLocFromFile(root, filePath);
    }
    if (!loc) continue;

    const deployFile = resolveDeployFile(root, loc);
    if (!deployFile) continue;

    const deployRel = path.relative(root, deployFile).split(path.sep).join('/');
    const entryLastmod = gitLastmodIsoDate(root, deployRel, lastmod);

    const existing = byLoc.get(loc);
    if (!existing || entryLastmod > existing.lastmod) {
      byLoc.set(loc, { loc, lastmod: entryLastmod, sourceFile: deployRel });
    }
  }

  /** Programmatic SEO: jeder Eintrag in entries.ts mit exportiertem HTML gehört in die Sitemap. */
  for (const slug of HAZARDOUS_SUBSTANCE_SLUGS) {
    const loc = pathnameToLoc(`/betriebsanweisung/${slug}/`);
    const deployRel = `betriebsanweisung/${slug}/index.html`;
    const deployPath = path.join(root, deployRel);
    if (!fs.existsSync(deployPath)) continue;

    const entryLastmod = gitLastmodIsoDate(root, deployRel, FALLBACK_LASTMOD);
    const existing = byLoc.get(loc);
    if (!existing || entryLastmod > existing.lastmod) {
      byLoc.set(loc, { loc, lastmod: entryLastmod, sourceFile: deployRel });
    }
  }

  const indexLoc = pathnameToLoc('/betriebsanweisung/');
  const indexPath = path.join(root, 'betriebsanweisung/index.html');
  if (fs.existsSync(indexPath) && !byLoc.has(indexLoc)) {
    byLoc.set(indexLoc, {
      loc: indexLoc,
      lastmod: gitLastmodIsoDate(root, 'betriebsanweisung/index.html', FALLBACK_LASTMOD),
      sourceFile: 'betriebsanweisung/index.html',
    });
  }

  return [...byLoc.values()].sort((a, b) => a.loc.localeCompare(b.loc, 'de'));
}

export { resolveDeployFile };
