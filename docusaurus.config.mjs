// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

// Docusaurus builds each locale as a separate process/pass and sets
// DOCUSAURUS_CURRENT_LOCALE for the duration of that pass (documented at
// https://docusaurus.io/docs/i18n/introduction#customize-configuration-per-locale).
// `title`/`tagline` are NOT auto-translated by the i18n JSON files the way
// navbar/footer strings are — read the locale here so the English build's
// <title> suffix stops appending the Russian site name (H3875).
const currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE || 'ru';
const isEn = currentLocale === 'en';

const siteTitle = isEn ? 'Afanasy Nikitin — Atlas' : 'Афанасий Никитин — Атлас';
const siteTagline = isEn
  ? "Interactive atlas of merchant Afanasy Nikitin's 1467–1475 journey"
  : 'Интерактивный атлас путешествия купца Афанасия Никитина, 1467–1475';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: siteTitle,
  tagline: siteTagline,
  favicon: 'img/favicon.svg',

  url: 'https://gasyoun.github.io',
  baseUrl: '/AfanasiyNikitin/',

  organizationName: 'gasyoun',
  projectName: 'AfanasiyNikitin',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    localeConfigs: {
      ru: { label: 'Русский' },
      en: { label: 'English' },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'put',
        path: 'put-docs',
        routeBasePath: 'put',
        sidebarPath: './sidebars-put.mjs',
        editUrl: 'https://github.com/gasyoun/AfanasiyNikitin/edit/main/',
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'atlas',
        path: 'atlas-docs',
        routeBasePath: 'atlas',
        sidebarPath: './sidebars-atlas.mjs',
        editUrl: 'https://github.com/gasyoun/AfanasiyNikitin/edit/main/',
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'data',
        path: 'data-docs',
        routeBasePath: 'data',
        sidebarPath: './sidebars-data.mjs',
        editUrl: 'https://github.com/gasyoun/AfanasiyNikitin/edit/main/',
      }),
    ],
  ],

  // Salvaged verbatim from the pre-rebuild index.html (H486 §4.2/§4.3) — the
  // Zenodo/WHG citation path depends on this Dataset JSON-LD block surviving.
  headTags: [
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'Dataset',
        name: 'Afanasiy Nikitin Atlas — open dataset',
        alternateName: 'Афанасий Никитин — данные атласа',
        description:
          "FAIR, linked dataset for the interactive atlas of Afanasiy Nikitin's 1467–1475 journey (per D. G. Khrustalev, 2026): places, itinerary, people, editions, citations, trade, manuscript fragments, and a computed liturgical/Islamic calendar. Places and people are reconciled to Wikidata, GeoNames, Pleiades and VIAF; a Linked Places Format export is included for the World Historical Gazetteer.",
        url: 'https://gasyoun.github.io/AfanasiyNikitin/',
        sameAs: 'https://github.com/gasyoun/AfanasiyNikitin',
        license: 'https://creativecommons.org/licenses/by/4.0/',
        creator: { '@type': 'Person', name: 'gasyoun', url: 'https://github.com/gasyoun' },
        isBasedOn: 'Хрусталёв Д. Г. Тетради купца Афанасия. СПб.: Нестор-История, 2026. ISBN 978-5-4469-2357-1',
        temporalCoverage: '1467/1475',
        spatialCoverage: 'Tver – Caspian Sea – Persia – India (Bahmani Sultanate) – Black Sea',
        keywords: [
          'digital humanities',
          'Afanasiy Nikitin',
          'Khozhenie za tri morya',
          'historical itinerary',
          'medieval travel',
          'linked open data',
          'Bahmani Sultanate',
        ],
        version: '1.1.0',
        distribution: [
          {
            '@type': 'DataDownload',
            encodingFormat: 'application/json',
            name: 'Frictionless Data Package',
            contentUrl: 'https://gasyoun.github.io/AfanasiyNikitin/datapackage.json',
          },
          {
            // Path changed from /data/ to /downloads/ — /data/ is now the
            // Docusaurus IA route for the "Данные" docs instance (H486 §4),
            // not a static file mount. See scripts/sync-atlas-data.mjs.
            '@type': 'DataDownload',
            encodingFormat: 'application/geo+json',
            name: 'Gazetteer (Linked Places Format)',
            contentUrl: 'https://gasyoun.github.io/AfanasiyNikitin/downloads/places.lpf.geojson',
          },
        ],
      }),
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/favicon.svg',
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Афанасий Никитин',
        logo: {
          alt: 'Atlas logo',
          src: 'img/favicon.svg',
        },
        items: [
          { to: '/put/', label: 'Нарратив', position: 'left' },
          { to: '/atlas/', label: 'Атлас', position: 'left' },
          { to: '/data/', label: 'Данные', position: 'left' },
          {
            href: 'https://github.com/gasyoun/AfanasiyNikitin',
            label: 'GitHub',
            position: 'right',
          },
          { type: 'localeDropdown', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Сайт',
            items: [
              { label: 'Нарратив', to: '/put/' },
              { label: 'Атлас', to: '/atlas/' },
              { label: 'Данные', to: '/data/' },
            ],
          },
          {
            title: 'Источники',
            items: [
              { label: 'RIGHTS.md', href: 'https://github.com/gasyoun/AfanasiyNikitin/blob/main/RIGHTS.md' },
              { label: 'CITATION.cff', href: 'https://github.com/gasyoun/AfanasiyNikitin/blob/main/CITATION.cff' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Mārcis Gasūns. Данные распространяются по CC-BY-4.0.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
