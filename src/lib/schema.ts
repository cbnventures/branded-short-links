import z from 'zod';

import { textGtmContainerId } from '@/lib/regex.js';

/**
 * Env schema.
 *
 * @since 1.0.0
 */
export const envSchema = z.object({
  links: z.object({
    fallback_url: z.string().url(),
    items: z.array(z.object({
      shortcode: z.string().min(1),
      http_response: z.union([
        z.literal(301),
        z.literal(302),
        z.literal(303),
        z.literal(307),
        z.literal(308),
      ]),
      redirect_url: z.string().url(),
    })).min(1),
  }),
  settings: z.object({
    debug_mode: z.boolean(),
    force_https: z.boolean(),
    gtm_container_id: z.string().regex(textGtmContainerId).optional(),
  }),
});
