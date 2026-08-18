import { trailingSlashPattern } from '../lib/regex.js';
import { landingPage, notFoundPage } from './landing/page.js';
import { fireTrackers } from './trackers.js';

import type {
  Worker_Handlers_HandleRequest_Config,
  Worker_Handlers_HandleRequest_Ctx,
  Worker_Handlers_HandleRequest_FallbackLogPayload,
  Worker_Handlers_HandleRequest_FallbackResponse,
  Worker_Handlers_HandleRequest_FallbackUrl,
  Worker_Handlers_HandleRequest_FireTrackersPromise,
  Worker_Handlers_HandleRequest_Pathname,
  Worker_Handlers_HandleRequest_RedirectLogPayload,
  Worker_Handlers_HandleRequest_RedirectResponse,
  Worker_Handlers_HandleRequest_Request,
  Worker_Handlers_HandleRequest_RequestUrl,
  Worker_Handlers_HandleRequest_Returns,
  Worker_Handlers_HandleRequest_RootLogPayload,
  Worker_Handlers_HandleRequest_RootResponse,
  Worker_Handlers_HandleRequest_Shortcode,
} from '../types/worker/handlers.d.ts';

/**
 * Worker - Handlers - Handle Request.
 *
 * Routes an incoming request to the correct response based on
 * the configured shortcodes, fallback URL, and HTTP method.
 *
 * @since 2.0.0
 */
async function handleRequest(
  request: Worker_Handlers_HandleRequest_Request,
  config: Worker_Handlers_HandleRequest_Config,
  ctx: Worker_Handlers_HandleRequest_Ctx,
): Worker_Handlers_HandleRequest_Returns {
  const requestUrl: Worker_Handlers_HandleRequest_RequestUrl = new URL(request['url']);

  // Match shortcode (strip trailing slash).
  const pathname: Worker_Handlers_HandleRequest_Pathname = requestUrl['pathname'].replace(trailingSlashPattern, '') || '/';
  const shortcode: Worker_Handlers_HandleRequest_Shortcode = config['links']['items'].find((item) => pathname === item['shortcode']);

  // GET/HEAD → landing page, not found, fallback, or redirect.
  if (request['method'] === 'GET' || request['method'] === 'HEAD') {
    if (shortcode === undefined) {
      // No fallback URL configured.
      if (config['links']['fallback_url'] === undefined) {
        if (pathname === '/' || pathname === '') {
          return landingPage(config);
        }

        return notFoundPage(config);
      }

      // Fallback URL configured → redirect.
      const fallbackUrl: Worker_Handlers_HandleRequest_FallbackUrl = new URL(config['links']['fallback_url']);

      if (pathname === '/' || pathname === '') {
        const rootResponse: Worker_Handlers_HandleRequest_RootResponse = Response.redirect(fallbackUrl['origin'], 301);

        const rootLogPayload: Worker_Handlers_HandleRequest_RootLogPayload = JSON.stringify({
          shortcode: null,
          redirect_url: fallbackUrl['origin'],
          http_response: 301,
          trackers: [],
        });

        console.info(rootLogPayload);

        return rootResponse;
      }

      const fallbackResponse: Worker_Handlers_HandleRequest_FallbackResponse = Response.redirect(
        `${fallbackUrl['origin']}${requestUrl['pathname']}${requestUrl['search']}`,
        301,
      );

      const fallbackLogPayload: Worker_Handlers_HandleRequest_FallbackLogPayload = JSON.stringify({
        shortcode: null,
        redirect_url: config['links']['fallback_url'],
        http_response: 301,
        trackers: [],
      });

      console.info(fallbackLogPayload);

      return fallbackResponse;
    }

    // Fire trackers in background, redirect immediately.
    const fireTrackersPromise: Worker_Handlers_HandleRequest_FireTrackersPromise = fireTrackers(config['trackers'], request, shortcode);

    ctx.waitUntil(fireTrackersPromise);

    const redirectResponse: Worker_Handlers_HandleRequest_RedirectResponse = Response.redirect(shortcode['redirect_url'], shortcode['http_response']);

    const redirectLogPayload: Worker_Handlers_HandleRequest_RedirectLogPayload = JSON.stringify({
      shortcode: shortcode['shortcode'],
      redirect_url: shortcode['redirect_url'],
      http_response: shortcode['http_response'],
      trackers: config['trackers'].map((tracker) => tracker['name']),
    });

    console.info(redirectLogPayload);

    return redirectResponse;
  }

  // Non-GET/HEAD → 405.
  return new Response(JSON.stringify({
    status: 'error',
    message: 'Method not allowed',
  }, null, 2), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      'Allow': 'GET, HEAD',
    },
  });
}

export {
  handleRequest,
};
