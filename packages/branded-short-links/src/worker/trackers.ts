import type {
  WorkerTrackersFireFacebookReturn,
  WorkerTrackersFireFacebookTracker,
  WorkerTrackersFireGa4ClientId,
  WorkerTrackersFireGa4Request,
  WorkerTrackersFireGa4Return,
  WorkerTrackersFireGa4Shortcode,
  WorkerTrackersFireGa4Tracker,
  WorkerTrackersFireNtfyCfAsUnknown,
  WorkerTrackersFireNtfyCfProperties,
  WorkerTrackersFireNtfyCfShape,
  WorkerTrackersFireNtfyMessage,
  WorkerTrackersFireNtfyRequest,
  WorkerTrackersFireNtfyReturn,
  WorkerTrackersFireNtfyReverseProxyCfAsUnknown,
  WorkerTrackersFireNtfyReverseProxyCfProperties,
  WorkerTrackersFireNtfyReverseProxyCfShape,
  WorkerTrackersFireNtfyReverseProxyHeaders,
  WorkerTrackersFireNtfyReverseProxyMessage,
  WorkerTrackersFireNtfyReverseProxyRequest,
  WorkerTrackersFireNtfyReverseProxyReturn,
  WorkerTrackersFireNtfyReverseProxyShortcode,
  WorkerTrackersFireNtfyReverseProxyTracker,
  WorkerTrackersFireNtfyShortcode,
  WorkerTrackersFireNtfyTracker,
  WorkerTrackersFirePlainTextCfAsUnknown,
  WorkerTrackersFirePlainTextCfProperties,
  WorkerTrackersFirePlainTextCfShape,
  WorkerTrackersFirePlainTextHeaders,
  WorkerTrackersFirePlainTextMessage,
  WorkerTrackersFirePlainTextRequest,
  WorkerTrackersFirePlainTextReturn,
  WorkerTrackersFirePlainTextShortcode,
  WorkerTrackersFirePlainTextTracker,
  WorkerTrackersFirePosthogDistinctId,
  WorkerTrackersFirePosthogRequest,
  WorkerTrackersFirePosthogReturn,
  WorkerTrackersFirePosthogShortcode,
  WorkerTrackersFirePosthogTracker,
  WorkerTrackersFireTrackersPromises,
  WorkerTrackersFireTrackersRequest,
  WorkerTrackersFireTrackersReturn,
  WorkerTrackersFireTrackersShortcode,
  WorkerTrackersFireTrackersTrackers,
} from '../types/worker/trackers.d.ts';

/**
 * Worker - Trackers - Fire Ga.
 *
 * Sends a Google Analytics 4 Measurement Protocol event to record
 * a short link selection for the given shortcode.
 *
 * @since 2.0.0
 */
async function fireGa4(
  tracker: WorkerTrackersFireGa4Tracker,
  request: WorkerTrackersFireGa4Request,
  shortcode: WorkerTrackersFireGa4Shortcode,
): WorkerTrackersFireGa4Return {
  const clientId: WorkerTrackersFireGa4ClientId = request['headers'].get('cf-ray') || 'unknown';

  return fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${tracker['measurement_id']}&api_secret=${tracker['api_secret']}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        events: [{
          name: 'select_content',
          params: {
            content_type: 'short_link',
            content_id: shortcode['shortcode'],
            link_url: shortcode['redirect_url'],
          },
        }],
      }),
    },
  );
}

/**
 * Worker - Trackers - Fire Facebook.
 *
 * Fires a Facebook pixel PageView event so that link clicks
 * are recorded in the configured Facebook Ads account.
 *
 * @since 2.0.0
 */
async function fireFacebook(
  tracker: WorkerTrackersFireFacebookTracker,
): WorkerTrackersFireFacebookReturn {
  return fetch(
    `https://www.facebook.com/tr?id=${tracker['pixel_id']}&ev=PageView&noscript=1`,
  );
}

/**
 * Worker - Trackers - Fire Ntfy.
 *
 * Sends a detailed Markdown-formatted push notification to an
 * ntfy server topic with full request and Cloudflare edge details.
 *
 * @since 2.0.0
 */
async function fireNtfy(
  tracker: WorkerTrackersFireNtfyTracker,
  request: WorkerTrackersFireNtfyRequest,
  shortcode: WorkerTrackersFireNtfyShortcode,
): WorkerTrackersFireNtfyReturn {
  const cf: WorkerTrackersFireNtfyCfProperties = (request as WorkerTrackersFireNtfyCfAsUnknown as WorkerTrackersFireNtfyCfShape)['cf'] || {};

  const message: WorkerTrackersFireNtfyMessage = [
    'The following details have been captured from a recent user request.',
    '',
    '\ud83d\udd17 __User Request__',
    `__Shortcode:__ ${shortcode['shortcode']}`,
    `__Redirect To:__ ${shortcode['redirect_url']}`,
    `__Request Method:__ ${request['method']}`,
    `__Request URL:__ ${request['url']}`,
    '',
    '\u2601\ufe0f __Cloudflare Properties__',
    `__City:__ ${cf['city'] || 'unknown'}`,
    `__Continent:__ ${cf['continent'] || 'unknown'}`,
    `__Country:__ ${cf['country'] || 'unknown'}`,
    `__Data Center:__ ${cf['colo'] || 'unknown'}`,
    `__ISP:__ ${cf['asOrganization'] || 'unknown'} (${cf['asn'] || 'unknown'})`,
    `__Is EU Country:__ ${cf['isEUCountry'] || 'unknown'}`,
    `__Coordinates:__ ${cf['latitude'] || 'unknown'}, ${cf['longitude'] || 'unknown'}`,
    `__Metro Code:__ ${cf['metroCode'] || 'unknown'}`,
    `__Postal Code:__ ${cf['postalCode'] || 'unknown'}`,
    `__Region:__ ${cf['region'] || 'unknown'} (${cf['regionCode'] || 'unknown'})`,
    `__Time Zone:__ ${cf['timezone'] || 'unknown'}`,
    '',
    '\ud83d\udde3\ufe0f __Headers__',
    `__CF-Connecting-IP:__ ${request['headers'].get('cf-connecting-ip') || 'unknown'}`,
    `__CF-IPCountry:__ ${request['headers'].get('cf-ipcountry') || 'unknown'}`,
    `__CF-RAY:__ ${request['headers'].get('cf-ray') || 'unknown'}`,
    `__Host:__ ${request['headers'].get('host') || 'unknown'}`,
    `__User-Agent:__ ${request['headers'].get('user-agent') || 'unknown'}`,
    `__X-Real-IP:__ ${request['headers'].get('x-real-ip') || 'unknown'}`,
  ].join('\n');

  return fetch(
    tracker['server'],
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tracker['token']}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: tracker['topic'],
        title: 'User Request Received',
        message,
        tags: ['rotating_light'],
        priority: 2,
        markdown: true,
      }),
    },
  );
}

/**
 * Worker - Trackers - Fire Ntfy Reverse Proxy.
 *
 * Sends a detailed Markdown-formatted push notification through
 * a reverse proxy endpoint with optional Bearer token authentication.
 *
 * @since 2.0.0
 */
async function fireNtfyReverseProxy(
  tracker: WorkerTrackersFireNtfyReverseProxyTracker,
  request: WorkerTrackersFireNtfyReverseProxyRequest,
  shortcode: WorkerTrackersFireNtfyReverseProxyShortcode,
): WorkerTrackersFireNtfyReverseProxyReturn {
  const headers: WorkerTrackersFireNtfyReverseProxyHeaders = {
    'Content-Type': 'text/plain',
    'Title': 'User Request Received',
    'Tags': 'rotating_light',
    'Priority': '2',
    'Markdown': 'yes',
  };

  if (tracker['token'] !== undefined) {
    Reflect.set(headers, 'Authorization', `Bearer ${tracker['token']}`);
  }

  const cf: WorkerTrackersFireNtfyReverseProxyCfProperties = (request as WorkerTrackersFireNtfyReverseProxyCfAsUnknown as WorkerTrackersFireNtfyReverseProxyCfShape)['cf'] || {};

  const message: WorkerTrackersFireNtfyReverseProxyMessage = [
    'The following details have been captured from a recent user request.',
    '',
    '\ud83d\udd17 __User Request__',
    `__Shortcode:__ ${shortcode['shortcode']}`,
    `__Redirect To:__ ${shortcode['redirect_url']}`,
    `__Request Method:__ ${request['method']}`,
    `__Request URL:__ ${request['url']}`,
    '',
    '\u2601\ufe0f __Cloudflare Properties__',
    `__City:__ ${cf['city'] || 'unknown'}`,
    `__Continent:__ ${cf['continent'] || 'unknown'}`,
    `__Country:__ ${cf['country'] || 'unknown'}`,
    `__Data Center:__ ${cf['colo'] || 'unknown'}`,
    `__ISP:__ ${cf['asOrganization'] || 'unknown'} (${cf['asn'] || 'unknown'})`,
    `__Is EU Country:__ ${cf['isEUCountry'] || 'unknown'}`,
    `__Coordinates:__ ${cf['latitude'] || 'unknown'}, ${cf['longitude'] || 'unknown'}`,
    `__Metro Code:__ ${cf['metroCode'] || 'unknown'}`,
    `__Postal Code:__ ${cf['postalCode'] || 'unknown'}`,
    `__Region:__ ${cf['region'] || 'unknown'} (${cf['regionCode'] || 'unknown'})`,
    `__Time Zone:__ ${cf['timezone'] || 'unknown'}`,
    '',
    '\ud83d\udde3\ufe0f __Headers__',
    `__CF-Connecting-IP:__ ${request['headers'].get('cf-connecting-ip') || 'unknown'}`,
    `__CF-IPCountry:__ ${request['headers'].get('cf-ipcountry') || 'unknown'}`,
    `__CF-RAY:__ ${request['headers'].get('cf-ray') || 'unknown'}`,
    `__Host:__ ${request['headers'].get('host') || 'unknown'}`,
    `__User-Agent:__ ${request['headers'].get('user-agent') || 'unknown'}`,
    `__X-Real-IP:__ ${request['headers'].get('x-real-ip') || 'unknown'}`,
  ].join('\n');

  return fetch(tracker['url'], {
    method: 'POST',
    headers,
    body: message,
  });
}

/**
 * Worker - Trackers - Fire Posthog.
 *
 * Captures a PostHog analytics event with shortcode and redirect
 * details so link usage appears in the PostHog dashboard.
 *
 * @since 2.0.0
 */
async function firePosthog(
  tracker: WorkerTrackersFirePosthogTracker,
  request: WorkerTrackersFirePosthogRequest,
  shortcode: WorkerTrackersFirePosthogShortcode,
): WorkerTrackersFirePosthogReturn {
  const distinctId: WorkerTrackersFirePosthogDistinctId = request['headers'].get('cf-ray')
    || request['headers'].get('cf-connecting-ip')
    || 'unknown';

  return fetch(
    `${tracker['host']}/i/v0/e/`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: tracker['api_key'],
        event: 'User Request Captured',
        distinct_id: distinctId,
        properties: {
          shortcode: shortcode['shortcode'],
          redirect_url: shortcode['redirect_url'],
          $current_url: request['url'],
        },
      }),
    },
  );
}

/**
 * Worker - Trackers - Fire Plain Text.
 *
 * Sends a concise plain text summary with key request details
 * to the configured webhook endpoint.
 *
 * @since 2.0.0
 */
async function firePlainText(
  tracker: WorkerTrackersFirePlainTextTracker,
  request: WorkerTrackersFirePlainTextRequest,
  shortcode: WorkerTrackersFirePlainTextShortcode,
): WorkerTrackersFirePlainTextReturn {
  const headers: WorkerTrackersFirePlainTextHeaders = {
    'Content-Type': 'text/plain',
  };

  if (tracker['token'] !== undefined) {
    Reflect.set(headers, 'Authorization', `Bearer ${tracker['token']}`);
  }

  const cf: WorkerTrackersFirePlainTextCfProperties = (request as WorkerTrackersFirePlainTextCfAsUnknown as WorkerTrackersFirePlainTextCfShape)['cf'] || {};

  const message: WorkerTrackersFirePlainTextMessage = [
    'The following details have been captured from a recent user request.',
    '',
    'User Request',
    `Shortcode: ${shortcode['shortcode']}`,
    `Redirect To: ${shortcode['redirect_url']}`,
    `Request Method: ${request['method']}`,
    `Request URL: ${request['url']}`,
    '',
    'Cloudflare Properties',
    `City: ${cf['city'] || 'unknown'}`,
    `Continent: ${cf['continent'] || 'unknown'}`,
    `Country: ${cf['country'] || 'unknown'}`,
    `Data Center: ${cf['colo'] || 'unknown'}`,
    `ISP: ${cf['asOrganization'] || 'unknown'} (${cf['asn'] || 'unknown'})`,
    `Is EU Country: ${cf['isEUCountry'] || 'unknown'}`,
    `Coordinates: ${cf['latitude'] || 'unknown'}, ${cf['longitude'] || 'unknown'}`,
    `Metro Code: ${cf['metroCode'] || 'unknown'}`,
    `Postal Code: ${cf['postalCode'] || 'unknown'}`,
    `Region: ${cf['region'] || 'unknown'} (${cf['regionCode'] || 'unknown'})`,
    `Time Zone: ${cf['timezone'] || 'unknown'}`,
    '',
    'Headers',
    `CF-Connecting-IP: ${request['headers'].get('cf-connecting-ip') || 'unknown'}`,
    `CF-IPCountry: ${request['headers'].get('cf-ipcountry') || 'unknown'}`,
    `CF-RAY: ${request['headers'].get('cf-ray') || 'unknown'}`,
    `Host: ${request['headers'].get('host') || 'unknown'}`,
    `User-Agent: ${request['headers'].get('user-agent') || 'unknown'}`,
    `X-Real-IP: ${request['headers'].get('x-real-ip') || 'unknown'}`,
  ].join('\n');

  return fetch(tracker['url'], {
    method: 'POST',
    headers,
    body: message,
  });
}

/**
 * Worker - Trackers - Fire Trackers.
 *
 * Dispatches all configured tracker integrations in parallel
 * and waits for every promise to settle before returning.
 *
 * @since 2.0.0
 */
async function fireTrackers(
  trackers: WorkerTrackersFireTrackersTrackers,
  request: WorkerTrackersFireTrackersRequest,
  shortcode: WorkerTrackersFireTrackersShortcode,
): WorkerTrackersFireTrackersReturn {
  const promises: WorkerTrackersFireTrackersPromises = trackers.map((tracker) => {
    switch (tracker['type']) {
      case 'ga4': {
        return fireGa4(tracker, request, shortcode);
      }

      case 'facebook': {
        return fireFacebook(tracker);
      }

      case 'ntfy': {
        return fireNtfy(tracker, request, shortcode);
      }

      case 'ntfy-reverse-proxy': {
        return fireNtfyReverseProxy(tracker, request, shortcode);
      }

      case 'plain-text': {
        return firePlainText(tracker, request, shortcode);
      }

      case 'posthog': {
        return firePosthog(tracker, request, shortcode);
      }

      default: {
        return undefined;
      }
    }
  });

  await Promise.allSettled(promises);

  return;
}

export {
  fireTrackers,
};
