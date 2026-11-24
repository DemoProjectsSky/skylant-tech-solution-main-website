import services from '../data/services.json';
import blogs from '../data/blogs.json';

const SITE = 'Skylant Tech Solution Pvt. Ltd.';
type Seo = { title: string; description: string; noindex?: boolean };

const STATIC: Record<string, Seo> = {
  '/': { title: `${SITE} – Software, AI & Digital Marketing Company`, description: 'Skylant builds scalable software, web and mobile apps, AI solutions, cloud infrastructure and digital marketing for growing businesses. Talk to our team today.' },
  '/about': { title: `About Us | ${SITE}`, description: 'Meet the Skylant team: our story, values and the engineers, designers and mentors who build reliable software and train the next generation of developers.' },
  '/services': { title: `Our Services | ${SITE}`, description: 'Custom software, web and mobile apps, AI and automation, cloud, UI/UX and digital marketing services from Skylant Tech Solution Pvt. Ltd.' },
  '/projects': { title: `Our Projects | ${SITE}`, description: 'Explore websites, mobile apps, ERP/CRM software, AI solutions and digital marketing campaigns delivered by Skylant Tech Solution Pvt. Ltd., Nagpur.' },
  '/training': { title: `Industry-Ready Training Programs | ${SITE}`, description: 'Hands-on training in full-stack development, Python, data and more, taught by working professionals with real projects and placement support.' },
  '/internship': { title: `Internship Programs | ${SITE}`, description: 'Apply for a live-project internship at Skylant in development, design, data, marketing and more. Get mentorship, a certificate and a letter of recommendation.' },
  '/blog': { title: `Blog | ${SITE}`, description: 'Articles on software development, AI, cloud, careers and digital marketing from the Skylant team.' },
  '/careers': { title: `Careers | ${SITE}`, description: 'Join Skylant Tech Solution Pvt. Ltd. See open roles in engineering, design and business, and apply online.' },
  '/contact': { title: `Contact Us | ${SITE}`, description: 'Tell us about your project. The Skylant team replies within 24 hours with a tailored proposal and next steps.' },
};

/** Title/description for any URL path of the site (dynamic pages look their data up). Unknown paths are marked noindex. */
export function seoFor(pathname: string): Seo {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (STATIC[path]) return STATIC[path];
  const service = path.startsWith('/services/') && services.find((item) => item.slug === path.slice('/services/'.length));
  if (service) return { title: `${service.title} | ${SITE}`, description: String(service.description).slice(0, 160) };
  const post = path.startsWith('/blog/') && blogs.find((item) => item.slug === path.slice('/blog/'.length));
  if (post) return { title: `${post.title} | ${SITE} Blog`, description: String(post.excerpt).slice(0, 160) };
  return { title: `Page not found | ${SITE}`, description: 'The page you are looking for does not exist.', noindex: true };
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attr, key); document.head.appendChild(tag); }
  tag.setAttribute('content', content);
}

/** Writes the title, description, canonical URL and social tags for the current page. */
export function applySeo(pathname: string) {
  const { title, description, noindex } = seoFor(pathname);
  const origin = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/+$/, '') || window.location.origin;
  const url = `${origin}${pathname === '/' ? '/' : pathname.replace(/\/+$/, '')}`;
  document.title = title;
  setMeta('name', 'description', description);
  setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:image', `${origin}/images/skylant-logo-512.png`);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
  link.href = url;
}
