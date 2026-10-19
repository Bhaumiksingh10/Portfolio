// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Hosted on Netlify. During a Netlify build, process.env.URL is the site's main address:
// the free ….netlify.app one today, or your own domain once you add it in Netlify. No code change needed then.
// The fallback is only used for local builds.
const SITE = process.env.URL ?? 'https://bhaumikchauhan.netlify.app';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  // Lossless whitespace removal (Astro 7's default 'jsx' mode drops spaces across line breaks).
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !/\/(thanks|404)\/?$/.test(page),
    }),
  ],
  fonts: [
    {
      // One variable font for everything typed: body text at normal width, headings stretched wide.
      name: 'Archivo',
      cssVariable: '--font-sans',
      provider: fontProviders.google(),
      weights: ['400 900'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
      options: { experimental: { variableAxis: { wdth: [['100', '125']] } } },
    },
    {
      // Handwriting, used only for short notes in "blue pen".
      name: 'Kalam',
      cssVariable: '--font-hand',
      provider: fontProviders.google(),
      weights: [400, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['cursive'],
    },
  ],
});
