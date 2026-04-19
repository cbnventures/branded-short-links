import {
  BlogPreview,
  Features,
  Hero,
  InstallStrip,
  Stats,
} from '@cbnventures/docusaurus-preset-nova/components';

import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';

/**
 * Pages - Home.
 *
 * Root landing page that composes the hero header, install strip, feature grid,
 * stats, and blog preview using theme components.
 *
 * @constructor
 *
 * @since 0.11.0
 */
function Home() {
  return (
    <Layout description="Branded short links with direct analytics tracking, deployed to the edge">
      <Head>
        <title>Branded Short Links - Stop Renting Your Redirect</title>
      </Head>
      <Hero
        eyebrow="URL Shortener"
        heading="Your short links have a landlord. Now it doesn't."
        tagline="Public shorteners own your domain, your analytics, and your links. Branded Short Links runs on your domain and fires trackers server-side — no client-side JavaScript, no ad blockers."
        ctaLabel="Get Started"
        ctaLink="/docs/overview/"
        secondaryCtaLabel="View on GitHub"
        secondaryCtaLink="https://github.com/cbnventures/branded-short-links"
      />
      <main>
        <InstallStrip command="npx branded-short-links" copyTarget="block" />
        <Features
          items={[
            {
              icon: 'lucide:activity',
              title: 'Server-Side Tracking',
              description: 'GA4 Measurement Protocol, Meta Pixel, PostHog, ntfy, Reverse Proxy for ntfy, and plain-text webhooks — fired from the worker on every redirect. No client-side JavaScript. No tag containers.',
            },
            {
              icon: 'lucide:globe',
              title: 'Custom Domains',
              description: 'Run short links on any domain you own. Clean, branded, memorable URLs — not a generic short link service.',
            },
            {
              icon: 'lucide:terminal',
              title: 'Interactive CLI',
              description: 'Add links, attach trackers, configure settings, and deploy — all through a terminal UI. No config files to hand-edit.',
            },
            {
              icon: 'lucide:zap',
              title: 'Edge Deployment',
              description: 'Runs on Cloudflare Workers. Redirects resolve at the nearest edge location. No origin server, no database, no cold starts.',
            },
            {
              icon: 'lucide:layout-template',
              title: 'Landing Page',
              description: 'Browser GET requests serve a branded page instead of a raw redirect. Optional debug output with masked config values.',
            },
            {
              icon: 'lucide:eye-off',
              title: 'Ad Block Resistant',
              description: 'Every tracker fires server-side via background execution. Ad blockers, privacy extensions, disabled JavaScript — none of it matters. The data still arrives.',
            },
          ]}
        />
        <Stats
          heading="By the Numbers"
          items={[
            {
              value: '6',
              label: 'Tracker types',
              color: 'primary',
            },
            {
              value: '180+',
              label: 'Edge regions',
              color: 'accent',
            },
            {
              value: '0',
              label: 'Client-side scripts',
              color: 'primary',
            },
            {
              value: '0',
              label: 'External dependencies',
              color: 'accent',
            },
          ]}
        />
        <BlogPreview
          heading="From the Blog"
          description="Release notes, integration guides, and the patterns hiding in your click streams."
          auto={true}
          limit={3}
        />
      </main>
    </Layout>
  );
}

export default Home;
