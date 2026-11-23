// Runs before every build: writes public/robots.txt and public/sitemap.xml using SITE_URL (e.g. https://www.example.com).
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const services = require('../src/data/services.json');
const blogs = require('../src/data/blogs.json');

const site = (process.env.SITE_URL || process.env.VITE_SITE_URL || '').replace(/\/+$/, '');
const paths = ['/', '/about', '/services', '/projects', '/training', '/internship', '/blog', '/careers', '/contact', ...services.map((s) => `/services/${s.slug}`), ...blogs.map((b) => `/blog/${b.slug}`)];

fs.mkdirSync('public', { recursive: true });
fs.writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\n${site ? `Sitemap: ${site}/sitemap.xml\n` : ''}`);
if (site) {
  const today = new Date().toISOString().slice(0, 10);
  fs.writeFileSync('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${site}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
  console.log(`SEO files written for ${site} (${paths.length} URLs)`);
} else {
  console.warn('SITE_URL is not set: wrote robots.txt only. Set SITE_URL to also generate sitemap.xml.');
}
