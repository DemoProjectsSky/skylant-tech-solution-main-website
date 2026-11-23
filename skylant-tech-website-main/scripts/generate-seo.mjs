// Generates public/sitemap.xml and public/robots.txt before every build.
// Site URL comes from SITE_URL / VITE_SITE_URL, or Vercel's production URL.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

let site =
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
site = site.trim().replace(/\/+$/, '');

const robotsBase = 'User-agent: *\nAllow: /\n';

if (!site || site.includes('example.com')) {
  writeFileSync(join(root, 'public/robots.txt'), robotsBase);
  console.warn(
    '[seo] SITE_URL not set — sitemap.xml was NOT generated. Set SITE_URL (e.g. https://www.yourdomain.com) in your hosting env and rebuild.'
  );
  process.exit(0);
}

const staticPaths = ['/', '/about', '/services', '/projects', '/training', '/internship', '/blog', '/careers', '/contact'];
const servicePaths = read('src/data/services.json').map((s) => `/services/${s.slug}`);
const blogPaths = read('src/data/blogs.json').map((b) => `/blog/${b.slug}`);
const today = new Date().toISOString().slice(0, 10);

const urls = [...staticPaths, ...servicePaths, ...blogPaths]
  .map((p) => `  <url>\n    <loc>${site}${p === '/' ? '/' : p}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join('\n');

writeFileSync(
  join(root, 'public/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
writeFileSync(join(root, 'public/robots.txt'), `${robotsBase}\nSitemap: ${site}/sitemap.xml\n`);
console.log(`[seo] sitemap.xml + robots.txt generated for ${site}`);
