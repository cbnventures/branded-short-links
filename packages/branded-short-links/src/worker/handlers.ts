import { trailingSlashPattern } from '../lib/regex.js';
import { landingPage, notFoundPage } from './landing/page.js';
import { fireTrackers } from './trackers.js';

import type {
  WorkerIndexHandleRequestConfig,
  WorkerIndexHandleRequestCtx,
  WorkerIndexHandleRequestFallbackLogPayload,
  WorkerIndexHandleRequestFallbackResponse,
  WorkerIndexHandleRequestFallbackUrl,
  WorkerIndexHandleRequestFireTrackersPromise,
  WorkerIndexHandleRequestPathname,
  WorkerIndexHandleRequestRedirectLogPayload,
  WorkerIndexHandleRequestRedirectResponse,
  WorkerIndexHandleRequestRequest,
  WorkerIndexHandleRequestRequestUrl,
  WorkerIndexHandleRequestReturn,
  WorkerIndexHandleRequestRootLogPayload,
  WorkerIndexHandleRequestRootResponse,
  WorkerIndexHandleRequestShortcode,
} from '../types/worker/index.d.ts';

/**
 * Worker - Handlers - Handle Request.
 *
 * Routes an incoming request to the correct response based on
 * the configured shortcodes, fallback URL, and HTTP method.
 *
 * @since 2.0.0
 */
async function handleRequest(
  request: WorkerIndexHandleRequestRequest,
  config: WorkerIndexHandleRequestConfig,
  ctx: WorkerIndexHandleRequestCtx,
): WorkerIndexHandleRequestReturn {
  const requestUrl: WorkerIndexHandleRequestRequestUrl = new URL(request['url']);

  // Match shortcode (strip trailing slash).
  const pathname: WorkerIndexHandleRequestPathname = requestUrl['pathname'].replace(trailingSlashPattern, '') || '/';
  const shortcode: WorkerIndexHandleRequestShortcode = config['links']['items'].find((item) => pathname === item['shortcode']);

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
      const fallbackUrl: WorkerIndexHandleRequestFallbackUrl = new URL(config['links']['fallback_url']);

      if (pathname === '/' || pathname === '') {
        const rootResponse: WorkerIndexHandleRequestRootResponse = Response.redirect(fallbackUrl['origin'], 301);

        const rootLogPayload: WorkerIndexHandleRequestRootLogPayload = JSON.stringify({
          shortcode: null,
          redirect_url: fallbackUrl['origin'],
          http_response: 301,
          trackers: [],
        });

        console.info(rootLogPayload);

        return rootResponse;
      }

      const fallbackResponse: WorkerIndexHandleRequestFallbackResponse = Response.redirect(
        `${fallbackUrl['origin']}${requestUrl['pathname']}${requestUrl['search']}${requestUrl['hash']}`,
        301,
      );

      const fallbackLogPayload: WorkerIndexHandleRequestFallbackLogPayload = JSON.stringify({
        shortcode: null,
        redirect_url: config['links']['fallback_url'],
        http_response: 301,
        trackers: [],
      });

      console.info(fallbackLogPayload);

      return fallbackResponse;
    }

    // Fire trackers in background, redirect immediately.
    const fireTrackersPromise: WorkerIndexHandleRequestFireTrackersPromise = fireTrackers(config['trackers'], request, shortcode);

    ctx.waitUntil(fireTrackersPromise);

    const redirectResponse: WorkerIndexHandleRequestRedirectResponse = Response.redirect(shortcode['redirect_url'], shortcode['http_response']);

    const redirectLogPayload: WorkerIndexHandleRequestRedirectLogPayload = JSON.stringify({
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
    status: 'error', message: 'Method not allowed',
  }, null, 2), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
}

export {
  handleRequest,
};
