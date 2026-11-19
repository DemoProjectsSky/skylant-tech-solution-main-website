import { useEffect } from 'react';

export const COMPANY_NAME = 'Skylant Tech Solution Pvt. Ltd.';
const DEFAULT_IMAGE = '/images/skylant-website-logo.webp';

type SEOOptions = {
  title: string;
  description: string;
  /** Route path, e.g. "/about". Defaults to the current location. */
  path?: string;
  /** Absolute URL or site-relative path. */
  image?: string;
  /** Set true for pages that must not be indexed (404 etc.). */
  noindex?: boolean;
  type?: 'website' | 'article';
  /** Optional JSON-LD structured data for this page. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

/** Site origin: VITE_SITE_URL if configured, otherwise the current origin. */
export function getSiteUrl(): string {
  const configured = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim();
  return (configured || window.location.origin).replace(/\/+$/, '');
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Lightweight per-route SEO manager (no extra dependency).
 * Updates <title>, description, canonical, Open Graph, Twitter and JSON-LD.
 */
export function useSEO({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  noindex = false,
  type = 'website',
  jsonLd,
}: SEOOptions) {
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    const site = getSiteUrl();
    const currentPath = path ?? window.location.pathname;
    const url = `${site}${currentPath === '/' ? '' : currentPath}` || site;
    const imageUrl = /^https?:\/\//.test(image) ? image : `${site}${image}`;

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setCanonical(url === site ? `${site}/` : url);

    setMeta('property', 'og:site_name', COMPANY_NAME);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url === site ? `${site}/` : url);
    setMeta('property', 'og:image', imageUrl);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', imageUrl);

    let script: HTMLScriptElement | null = null;
    if (jsonLdString) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seo = 'page';
      script.textContent = jsonLdString;
      document.head.appendChild(script);
    }

    return () => {
      script?.remove();
    };
  }, [title, description, path, image, noindex, type, jsonLdString]);
}
