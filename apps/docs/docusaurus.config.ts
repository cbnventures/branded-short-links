import type { DocusaurusNovaConfig } from '@cbnventures/docusaurus-preset-nova/types/config';

/**
 * Docusaurus Configuration.
 *
 * @since 0.11.0
 */
const config: DocusaurusNovaConfig = {
  // Site Metadata.
  title: 'Branded Short Links',
  titleDelimiter: ' - ',
  tagline: 'Branded short links with direct analytics tracking, deployed to the edge',
  favicon: './favicon.ico',

  // Deployment.
  url: 'https://bsl.cbnventures.io',
  baseUrl: '/',
  organizationName: 'cbnventures',
  projectName: 'branded-short-links',
  deploymentBranch: undefined,
  githubHost: undefined,
  githubPort: undefined,
  trailingSlash: true,
  noIndex: false,

  // Error Handling.
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onDuplicateRoutes: 'throw',

  // Static Assets.
  staticDirectories: ['static'],
  baseUrlIssueBanner: true,
  scripts: [],
  stylesheets: [],
  clientModules: [],
  themes: [],

  // Custom Fields.
  customFields: {},

  // Head Tags.
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        property: 'og:type',
        content: 'website',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/favicon-96x96.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
    },
  ],

  // Internationalization.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
    },
  },

  // Markdown.
  markdown: {
    format: 'mdx',
    mermaid: true,
    emoji: true,
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true,
    },
    anchors: {
      maintainCase: false,
    },
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'throw',
    },
  },

  // Presets (Nova).
  presets: [[
    '@cbnventures/docusaurus-preset-nova',
    {
      // Preset Identity.
      preset: 'signal',

      // Preset Overrides (undefined = use preset default).
      overrides: {
        colors: {
          primary: '#65A30D',
          accent: '#D97706',
          neutral: '#44403C',
        },
        fonts: {
          display: 'Chakra Petch',
          body: 'Instrument Sans',
          code: 'Source Code Pro',
        },
        shape: {
          radius: undefined,
          density: undefined,
        },
        depth: {
          cards: undefined,
          codeBlocks: undefined,
        },
        motion: {
          speed: undefined,
          staggeredReveals: undefined,
          hoverEffects: undefined,
        },
        navbar: undefined,
        footer: undefined,
      },

      // Plugins.
      plugins: {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Blog',
          blogDescription: 'Attribution insights, campaign forensics, and the patterns hiding in your click streams.',
          postsPerPage: 10,
          blogSidebarTitle: 'Recent Posts',
          blogSidebarCount: 15,
          feedOptions: {
            type: [
              'rss',
              'atom',
            ],
            copyright: `Copyright \u00A9 2024-${String(new Date().getFullYear())} CBN Ventures LLC. All Rights Reserved.`,
            limit: 20,
            title: 'Branded Short Links Blog',
            description: 'Attribution insights, campaign forensics, and the patterns hiding in your click streams.',
          },
        },
        pages: undefined,
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/docs/tags/**'],
          filename: 'sitemap.xml',
        },
      },

      // Analytics.
      analytics: {
        gtm: {
          containerId: 'GTM-N2R7T7DR',
        },
      },

      // Search.
      search: {
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: 'docs',
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        searchBarShortcutKeymap: 'mod+k',
        searchResultLimits: 8,
        fuzzyMatchingDistance: 1,
        ignorePatterns: [],
      },

      // Progress Bar.
      progressBar: true,
    },
  ]],

  // Plugins.
  plugins: [],

  // Theme Config.
  themeConfig: {
    // Site.
    site: {
      title: 'Branded Short Links',
      logo: {
        alt: 'Branded Short Links',
        src: '/images/logo.svg',
        srcDark: undefined,
        href: '/',
        wordmark: undefined,
        wordmarkDark: undefined,
        title: 'Branded Short Links',
      },
      image: '/thumbnails/brand.png',
      metadata: [
        {
          name: 'description',
          content: 'Branded short links with direct analytics tracking, deployed to the edge',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    },

    // Color Mode.
    colorMode: {
      defaultMode: 'system',
      disableSwitch: false,
    },

    // Navbar.
    navbar: {
      title: 'Branded Short Links',
      hideOnScroll: false,
      items: [
        {
          label: 'Docs',
          position: 'left',
          type: 'doc',
          docId: 'overview',
          icon: 'lucide:book-open',
        },
        {
          label: 'Getting Started',
          position: 'left',
          type: undefined,
          to: '/docs/getting-started/quick-start/',
          icon: 'lucide:rocket',
        },
        {
          label: 'Blog',
          position: 'left',
          type: undefined,
          to: '/blog/',
          icon: 'lucide:pen-line',
        },
        {
          label: 'GitHub',
          position: 'right',
          type: undefined,
          href: 'https://github.com/cbnventures/branded-short-links',
          icon: 'lucide:github',
        },
      ],
    },

    // Docs.
    docs: {
      versionPersistence: 'localStorage',
      sidebar: {
        hideable: false,
        autoCollapseCategories: false,
      },
    },

    // Blog.
    blog: {
      sidebar: {
        groupByYear: true,
      },
      layout: {
        heading: 'Blog',
        description: 'Attribution insights and campaign forensics',
      },
      share: {
        platforms: [
          'linkedin',
          'reddit',
          'facebook',
          'x',
          'copy',
        ],
      },
    },

    // Table of Contents.
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },

    // Announcement Bar.
    // announcementBar: {
    //   id: '',
    //   content: '',
    //   backgroundColor: undefined,
    //   textColor: undefined,
    //   isCloseable: true,
    // },

    // Back to Top Button.
    backToTopButton: true,

    // Footer.
    footer: {
      sections: {
        docs: [
          {
            label: 'Getting Started',
            href: '/docs/overview/',
          },
          {
            label: 'Quick Start',
            href: '/docs/getting-started/quick-start/',
          },
          {
            label: 'Configuration',
            href: '/docs/configuration/settings/',
          },
        ],
        resources: [
          {
            label: 'Blog',
            href: '/blog/',
          },
          {
            label: 'GitHub',
            href: 'https://github.com/cbnventures/branded-short-links',
          },
        ],
        company: [
          {
            label: 'About',
            href: 'https://www.cbnventures.io/',
          },
          {
            label: 'Get In Touch',
            href: 'https://www.cbnventures.io/get-in-touch/',
          },
        ],
        legal: [
          {
            label: 'Terms of Use',
            href: 'https://www.cbnventures.io/terms/',
          },
          {
            label: 'Privacy Policy',
            href: 'https://www.cbnventures.io/privacy/',
          },
        ],
      },
      layout: {
        docs: {
          title: 'Docs',
          section: 'docs',
        },
        resources: {
          title: 'Resources',
          section: 'resources',
        },
        company: {
          title: 'Company',
          section: 'company',
        },
        legal: {
          title: 'Legal',
          section: 'legal',
        },
      },
      socialLinks: [
        {
          icon: 'mdi:facebook',
          href: 'https://www.facebook.com/cbnventures',
          label: 'Facebook',
        },
        {
          icon: 'ri:twitter-x-fill',
          href: 'https://x.com/cbnventures',
          label: 'X',
        },
        {
          icon: 'mdi:youtube',
          href: 'https://www.youtube.com/@cbnventures',
          label: 'YouTube',
        },
        {
          icon: 'mdi:instagram',
          href: 'https://www.instagram.com/cbnventures/',
          label: 'Instagram',
        },
        {
          icon: 'mdi:github',
          href: 'https://github.com/cbnventures',
          label: 'GitHub',
        },
        {
          icon: 'mdi:google-play',
          href: 'https://play.google.com/store/apps/dev?id=6419450160526226105',
          label: 'Google Play',
        },
        {
          icon: 'mdi:linkedin',
          href: 'https://www.linkedin.com/company/cbnventures/',
          label: 'LinkedIn',
        },
      ],
      copyright: `Copyright \u00A9 2024-${String(new Date().getFullYear())} CBN Ventures LLC. All Rights Reserved.`,
      credit: true,
      cta: undefined,
    },
  },
};

export default config;
