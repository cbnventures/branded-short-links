import { z } from 'zod';

/**
 * Lib - Schema - Settings Schema.
 *
 * Defines validation rules for the base domain
 * and response output visibility toggle.
 *
 * @since 2.0.0
 */
const settingsSchema = z.object({
  worker_name: z.string().min(1),
  base_domain: z.string().min(1),
  show_response_output: z.boolean(),
});

/**
 * Lib - Schema - Link Item Schema.
 *
 * Validates a single shortcode entry including path prefix,
 * HTTP redirect status code, and destination URL.
 *
 * @since 2.0.0
 */
const linkItemSchema = z.object({
  shortcode: z.string().startsWith('/').min(2),
  http_response: z.union([
    z.literal(301),
    z.literal(302),
    z.literal(303),
    z.literal(307),
    z.literal(308),
  ]),
  redirect_url: z.string().url(),
});

/**
 * Lib - Schema - Links Schema.
 *
 * Groups all link items under a single object with an
 * optional fallback URL for unmatched shortcodes.
 *
 * @since 2.0.0
 */
const linksSchema = z.object({
  fallback_url: z.string().url().optional(),
  items: z.array(linkItemSchema),
});

/**
 * Lib - Schema - Ga Tracker Schema.
 *
 * Validates a Google Analytics 4 tracker requiring
 * a measurement ID and API secret with strict mode.
 *
 * @since 2.0.0
 */
const ga4TrackerSchema = z.object({
  type: z.literal('ga4'),
  name: z.string().min(1),
  measurement_id: z.string().min(1),
  api_secret: z.string().min(1),
}).strict();

/**
 * Lib - Schema - Facebook Tracker Schema.
 *
 * Validates a Facebook pixel tracker requiring
 * a pixel ID for conversion tracking events.
 *
 * @since 2.0.0
 */
const facebookTrackerSchema = z.object({
  type: z.literal('facebook'),
  name: z.string().min(1),
  pixel_id: z.string().min(1),
}).strict();

/**
 * Lib - Schema - Ntfy Tracker Schema.
 *
 * Validates an ntfy push notification tracker requiring
 * an HTTPS server URL, topic name, and auth token.
 *
 * @since 2.0.0
 */
const ntfyTrackerSchema = z.object({
  type: z.literal('ntfy'),
  name: z.string().min(1),
  server: z.string().url().refine((server) => server.startsWith('https://'), { message: 'Server URL must start with https://' }),
  topic: z.string().min(1),
  token: z.string().startsWith('tk_'),
}).strict();

/**
 * Lib - Schema - Ntfy Reverse Proxy Tracker Schema.
 *
 * Validates a reverse proxy for ntfy tracker requiring
 * an HTTPS URL and an optional authentication token.
 *
 * @since 2.0.0
 */
const ntfyReverseProxyTrackerSchema = z.object({
  type: z.literal('ntfy-reverse-proxy'),
  name: z.string().min(1),
  url: z.string().url().refine((url) => url.startsWith('https://'), { message: 'URL must start with https://' }),
  token: z.string().min(1).optional(),
}).strict();

/**
 * Lib - Schema - Posthog Tracker Schema.
 *
 * Validates a PostHog analytics tracker requiring
 * an HTTPS host URL and project API key.
 *
 * @since 2.0.0
 */
const posthogTrackerSchema = z.object({
  type: z.literal('posthog'),
  name: z.string().min(1),
  host: z.string().url().refine((host) => host.startsWith('https://'), { message: 'Host URL must start with https://' }),
  api_key: z.string().min(1),
}).strict();

/**
 * Lib - Schema - Plain Text Tracker Schema.
 *
 * Validates a plain text webhook tracker requiring
 * an HTTPS URL and an optional authentication token.
 *
 * @since 2.0.0
 */
const plainTextTrackerSchema = z.object({
  type: z.literal('plain-text'),
  name: z.string().min(1),
  url: z.string().url().refine((url) => url.startsWith('https://'), { message: 'URL must start with https://' }),
  token: z.string().min(1).optional(),
}).strict();

/**
 * Lib - Schema - Tracker Schema.
 *
 * Discriminated union over the tracker type field
 * selecting the correct schema for each provider.
 *
 * @since 2.0.0
 */
const trackerSchema = z.discriminatedUnion('type', [
  ga4TrackerSchema,
  facebookTrackerSchema,
  ntfyTrackerSchema,
  ntfyReverseProxyTrackerSchema,
  plainTextTrackerSchema,
  posthogTrackerSchema,
]);

/**
 * Lib - Schema - Config Schema.
 *
 * Top-level configuration object combining settings,
 * links, and tracker schemas into a single validator.
 *
 * @since 2.0.0
 */
const configSchema = z.object({
  links: linksSchema,
  trackers: z.array(trackerSchema),
  settings: settingsSchema,
});

export {
  configSchema,
  facebookTrackerSchema,
  ga4TrackerSchema,
  linkItemSchema,
  linksSchema,
  ntfyReverseProxyTrackerSchema,
  ntfyTrackerSchema,
  plainTextTrackerSchema,
  posthogTrackerSchema,
  settingsSchema,
  trackerSchema,
};
