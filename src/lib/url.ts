// The site is served under a base path ('/Portfolio' on GitHub Pages, '' on a custom domain).
// Every internal link and public/ asset must go through withBase().
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefix an internal path with the base and give page paths a trailing slash. External URLs pass through. */
export function withBase(path: string): string {
  if (/^([a-z][a-z\d+.-]*:|\/\/|#)/i.test(path)) return path;
  const [, rawPath = '', suffix = ''] = path.match(/^([^?#]*)(.*)$/) ?? [];
  let pathname = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const lastSegment = pathname.slice(pathname.lastIndexOf('/') + 1);
  if (!pathname.endsWith('/') && !lastSegment.includes('.')) pathname += '/';
  return `${BASE}${pathname}${suffix}`;
}

/** Absolute URL (https://…) for canonical links, Open Graph tags and form redirects. */
export function absoluteUrl(path: string): string {
  return new URL(withBase(path), import.meta.env.SITE).href;
}

/** True when `href` is the current page or (except for home) one of its parents. */
export function isActive(currentPathname: string, href: string): boolean {
  const current = currentPathname.endsWith('/') ? currentPathname : `${currentPathname}/`;
  if (href === withBase('/')) return current === href;
  return current.startsWith(href);
}
