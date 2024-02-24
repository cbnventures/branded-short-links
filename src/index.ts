import _ from 'lodash';

import { GoogleTagManager } from '@/lib/gtm.js';
import { envSchema } from '@/lib/schema.js';
import { prettyPrint } from '@/lib/utility.js';
import type { InitializeEnv, InitializeRequest, InitializeReturns } from '@/types/index.d.ts';

/**
 * Initialize.
 *
 * @param {InitializeRequest} request - Request.
 * @param {InitializeEnv}     env     - Env.
 *
 * @returns {InitializeReturns}
 *
 * @since 1.0.0
 */
export async function initialize(request: InitializeRequest, env: InitializeEnv): InitializeReturns {
  const parsedEnv = envSchema.safeParse(env);

  // If the environment variables are not defined correctly.
  if (!parsedEnv.success) {
    return new Response([
      'Internal Server Error',
      prettyPrint(parsedEnv),
    ].join('\n\n'), {
      status: 500,
    });
  }

  const { data } = parsedEnv;
  const { links, settings } = data;

  try {
    const requestUrl = new URL(request.url);

    // Redirect to HTTPS if "force_https" is true.
    if (settings.force_https && requestUrl.protocol === 'http:') {
      requestUrl.protocol = 'https:';

      return Response.redirect(requestUrl.href, 301);
    }

    const shortcode = links.items.find((item) => requestUrl.pathname.substring(1) === item.shortcode);

    // Load Google Tag Manager, and query all the "Custom Image Tags" that are found.
    if (settings.gtm_container_id !== undefined) {
      const gtm = new GoogleTagManager(
        settings.gtm_container_id,
        request,
        shortcode,
      );
      const gtmResponse = await gtm.execute();

      if (settings.debug_mode) {
        return new Response([
          'OK',
          prettyPrint(gtmResponse),
        ].join('\n\n'), {
          status: 200,
        });
      }
    }

    // If shortcode not found, redirect to default url with original parameters.
    if (shortcode === undefined) {
      const defaultUrl = new URL(links.default);

      return Response.redirect(`${defaultUrl.origin}${requestUrl.pathname}${requestUrl.search}${requestUrl.hash}`, 307);
    }

    return Response.redirect(shortcode.redirect_url, shortcode.http_response);
  } catch (error) {
    return new Response([
      'Internal Server Error',
      ...(settings.debug_mode) ? [prettyPrint({
        ...(_.isError(error)) ? {
          message: error.message,
          stack: error.stack,
        } : {},
      })] : [],
    ].join('\n\n'), {
      status: 500,
    });
  }
}

// Export the worker using Wrangler's "service-worker" format.
export default { fetch: initialize };
