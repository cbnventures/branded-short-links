import {
  BlogPreview,
  Canvas,
  Features,
  InstallStrip,
  Stats,
} from '@cbnventures/docusaurus-preset-nova/blocks';

import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

import styles from './index.module.css';

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
    <Layout description="Self-hosted, branded short links on Cloudflare Workers with server-side analytics tracking">
      <Head>
        <title>Branded Short Links - Stop Renting Your Redirect</title>
      </Head>
      <Canvas container="full" className={styles['hero']}>
        <div className={styles['heroInner']}>
          <div className={styles['heroContent']}>
            <p className="nova-hero-eyebrow">URL Shortener</p>
            <Heading as="h1" className={`nova-hero-heading ${styles['heroHeading']}`}>
              Your short links have a landlord. Now they don&apos;t.
            </Heading>
            <p className="nova-hero-tagline">
              Public shorteners own your domain, your analytics, and your
              links. Branded Short Links runs on your domain and fires
              trackers server-side. No client-side JavaScript, no ad blockers.
            </p>
            <div className={`nova-hero-actions ${styles['heroActions']}`}>
              <Link className="nova-cta-primary" to="/docs/overview/">
                Get Started
              </Link>
              <Link
                className="nova-cta-secondary"
                to="https://github.com/cbnventures/branded-short-links"
              >
                View on GitHub
              </Link>
            </div>
          </div>
          <div className={styles['waterfallWrap']} aria-hidden="true">
            <div className={styles['waterfall']}>
              <div className={styles['waterfallScale']}>
                <span>0ms</span>
                <span>25ms</span>
                <span>50ms</span>
                <span>75ms</span>
              </div>
              <div className={styles['waterfallRow']}>
                <span className={styles['waterfallLabel']}>DNS</span>
                <div className={styles['waterfallTrack']}>
                  <div className={`${styles['waterfallBar']} ${styles['barDns']}`} />
                </div>
              </div>
              <div className={styles['waterfallRow']}>
                <span className={styles['waterfallLabel']}>Edge Worker</span>
                <div className={styles['waterfallTrack']}>
                  <div className={`${styles['waterfallBar']} ${styles['barEdge']}`} />
                </div>
              </div>
              <div className={styles['waterfallRow']}>
                <span className={styles['waterfallLabel']}>GA4</span>
                <div className={styles['waterfallTrack']}>
                  <div className={`${styles['waterfallBar']} ${styles['barGa4']}`} />
                </div>
              </div>
              <div className={styles['waterfallRow']}>
                <span className={styles['waterfallLabel']}>Meta Pixel</span>
                <div className={styles['waterfallTrack']}>
                  <div className={`${styles['waterfallBar']} ${styles['barMeta']}`} />
                </div>
              </div>
              <div className={styles['waterfallRow']}>
                <span className={styles['waterfallLabel']}>PostHog</span>
                <div className={styles['waterfallTrack']}>
                  <div className={`${styles['waterfallBar']} ${styles['barPosthog']}`} />
                </div>
              </div>
              <div className={styles['waterfallRow']}>
                <span className={styles['waterfallLabel']}>ntfy</span>
                <div className={styles['waterfallTrack']}>
                  <div className={`${styles['waterfallBar']} ${styles['barNtfy']}`} />
                </div>
              </div>
              <div className={styles['waterfallRow']}>
                <span className={`${styles['waterfallLabel']} ${styles['labelSuccess']}`}>
                  301 Redirect
                </span>
                <div className={styles['waterfallTrack']}>
                  <div className={`${styles['waterfallBar']} ${styles['barRedirect']}`} />
                </div>
              </div>
              <div className={styles['waterfallRow']}>
                <span className={`${styles['waterfallLabel']} ${styles['labelStruck']}`}>
                  Client JS
                </span>
                <div className={styles['waterfallTrack']}>
                  <div className={styles['barNone']} />
                </div>
              </div>
              <div className={styles['waterfallSummary']}>
                <span>
                  <strong>6</strong>
                  {' trackers'}
                </span>
                <span>
                  <strong>0</strong>
                  {' client scripts'}
                </span>
                <span>
                  <strong>{'<50ms'}</strong>
                  {' total'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['installWrap']}>
          <InstallStrip command="npx branded-short-links" copyTarget="block" />
        </div>
      </Canvas>
      <main>
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
              label: 'Origin servers',
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
