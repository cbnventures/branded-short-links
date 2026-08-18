import { markdownControlCharactersPattern, newlinePattern } from '../lib/regex.js';

import type {
  Worker_Trackers_EscapeMarkdown_Returns,
  Worker_Trackers_EscapeMarkdown_Value,
  Worker_Trackers_FireFacebook_Returns,
  Worker_Trackers_FireFacebook_Tracker,
  Worker_Trackers_FireGa4_ClientId,
  Worker_Trackers_FireGa4_Request,
  Worker_Trackers_FireGa4_Returns,
  Worker_Trackers_FireGa4_Shortcode,
  Worker_Trackers_FireGa4_Tracker,
  Worker_Trackers_FireNtfy_Cf,
  Worker_Trackers_FireNtfy_CfAsUnknown,
  Worker_Trackers_FireNtfy_CfShape,
  Worker_Trackers_FireNtfy_Message,
  Worker_Trackers_FireNtfy_Request,
  Worker_Trackers_FireNtfy_Returns,
  Worker_Trackers_FireNtfy_Shortcode,
  Worker_Trackers_FireNtfy_Tracker,
  Worker_Trackers_FireNtfyReverseProxy_Cf,
  Worker_Trackers_FireNtfyReverseProxy_CfAsUnknown,
  Worker_Trackers_FireNtfyReverseProxy_CfShape,
  Worker_Trackers_FireNtfyReverseProxy_Headers,
  Worker_Trackers_FireNtfyReverseProxy_Message,
  Worker_Trackers_FireNtfyReverseProxy_Request,
  Worker_Trackers_FireNtfyReverseProxy_Returns,
  Worker_Trackers_FireNtfyReverseProxy_Shortcode,
  Worker_Trackers_FireNtfyReverseProxy_Tracker,
  Worker_Trackers_FirePlainText_Cf,
  Worker_Trackers_FirePlainText_CfAsUnknown,
  Worker_Trackers_FirePlainText_CfShape,
  Worker_Trackers_FirePlainText_Headers,
  Worker_Trackers_FirePlainText_Message,
  Worker_Trackers_FirePlainText_Request,
  Worker_Trackers_FirePlainText_Returns,
  Worker_Trackers_FirePlainText_Shortcode,
  Worker_Trackers_FirePlainText_Tracker,
  Worker_Trackers_FirePosthog_DistinctId,
  Worker_Trackers_FirePosthog_Request,
  Worker_Trackers_FirePosthog_Returns,
  Worker_Trackers_FirePosthog_Shortcode,
  Worker_Trackers_FirePosthog_Tracker,
  Worker_Trackers_FireTrackers_Index,
  Worker_Trackers_FireTrackers_Promises,
  Worker_Trackers_FireTrackers_Request,
  Worker_Trackers_FireTrackers_Result,
  Worker_Trackers_FireTrackers_Results,
  Worker_Trackers_FireTrackers_Returns,
  Worker_Trackers_FireTrackers_Shortcode,
  Worker_Trackers_FireTrackers_Tracker,
  Worker_Trackers_FireTrackers_Trackers,
  Worker_Trackers_MarkdownControlCharactersGlobalPattern,
  Worker_Trackers_NewlineGlobalPattern,
} from '../types/worker/trackers.d.ts';

/**
 * Worker - Trackers - Markdown Control Characters Global Pattern.
 *
 * Pre-compiled global-flag variant of the Markdown control character
 * pattern so escapeMarkdown avoids constructing it on every call.
 *
 * @since 2.0.3
 */
const markdownControlCharactersGlobalPattern: Worker_Trackers_MarkdownControlCharactersGlobalPattern = new RegExp(markdownControlCharactersPattern, 'g');

/**
 * Worker - Trackers - Newline Global Pattern.
 *
 * Pre-compiled global-flag variant of the newline pattern so
 * escapeMarkdown avoids constructing it on every call.
 *
 * @since 2.0.3
 */
const newlineGlobalPattern: Worker_Trackers_NewlineGlobalPattern = new RegExp(newlinePattern, 'g');

/**
 * Worker - Trackers - Escape Markdown.
 *
 * Escapes Markdown control characters in a string so it renders
 * as literal text inside Markdown-enabled ntfy notifications.
 *
 * @since 2.0.3
 */
function escapeMarkdown(value: Worker_Trackers_EscapeMarkdown_Value): Worker_Trackers_EscapeMarkdown_Returns {
  return value.replace(markdownControlCharactersGlobalPattern, '\\$&').replace(newlineGlobalPattern, ' ');
}

/**
 * Worker - Trackers - Fire Ga4.
 *
 * Sends a Google Analytics 4 Measurement Protocol event to record
 * a short link selection for the given shortcode.
 *
 * @since 2.0.3
 */
async function fireGa4(
  tracker: Worker_Trackers_FireGa4_Tracker,
  request: Worker_Trackers_FireGa4_Request,
  shortcode: Worker_Trackers_FireGa4_Shortcode,
): Worker_Trackers_FireGa4_Returns {
  const clientId: Worker_Trackers_FireGa4_ClientId = request['headers'].get('cf-ray') || 'unknown';

  return fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(tracker['measurement_id'])}&api_secret=${encodeURIComponent(tracker['api_secret'])}`,
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
 * @since 2.0.3
 */
async function fireFacebook(
  tracker: Worker_Trackers_FireFacebook_Tracker,
): Worker_Trackers_FireFacebook_Returns {
  return fetch(
    `https://www.facebook.com/tr?id=${encodeURIComponent(tracker['pixel_id'])}&ev=PageView&noscript=1`,
  );
}

/**
 * Worker - Trackers - Fire Ntfy.
 *
 * Sends a detailed Markdown-formatted push notification to an
 * ntfy server topic with full request and Cloudflare edge details.
 *
 * @since 2.0.3
 */
async function fireNtfy(
  tracker: Worker_Trackers_FireNtfy_Tracker,
  request: Worker_Trackers_FireNtfy_Request,
  shortcode: Worker_Trackers_FireNtfy_Shortcode,
): Worker_Trackers_FireNtfy_Returns {
  const cf: Worker_Trackers_FireNtfy_Cf = (request as Worker_Trackers_FireNtfy_CfAsUnknown as Worker_Trackers_FireNtfy_CfShape)['cf'] || {};

  const message: Worker_Trackers_FireNtfy_Message = [
    'The following details have been captured from a recent user request.',
    '',
    '\ud83d\udd17 __User Request__',
    `__Shortcode:__ ${shortcode['shortcode']}`,
    `__Redirect To:__ ${shortcode['redirect_url']}`,
    `__Request Method:__ ${request['method']}`,
    `__Request URL:__ ${escapeMarkdown(request['url'])}`,
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
    `__User-Agent:__ ${escapeMarkdown(request['headers'].get('user-agent') || 'unknown')}`,
    `__X-Real-IP:__ ${escapeMarkdown(request['headers'].get('x-real-ip') || 'unknown')}`,
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
 * @since 2.0.3
 */
async function fireNtfyReverseProxy(
  tracker: Worker_Trackers_FireNtfyReverseProxy_Tracker,
  request: Worker_Trackers_FireNtfyReverseProxy_Request,
  shortcode: Worker_Trackers_FireNtfyReverseProxy_Shortcode,
): Worker_Trackers_FireNtfyReverseProxy_Returns {
  const headers: Worker_Trackers_FireNtfyReverseProxy_Headers = {
    'Content-Type': 'text/plain',
    'Title': 'User Request Received',
    'Tags': 'rotating_light',
    'Priority': '2',
    'Markdown': 'yes',
  };

  if (tracker['token'] !== undefined) {
    Reflect.set(headers, 'Authorization', `Bearer ${tracker['token']}`);
  }

  const cf: Worker_Trackers_FireNtfyReverseProxy_Cf = (request as Worker_Trackers_FireNtfyReverseProxy_CfAsUnknown as Worker_Trackers_FireNtfyReverseProxy_CfShape)['cf'] || {};

  const message: Worker_Trackers_FireNtfyReverseProxy_Message = [
    'The following details have been captured from a recent user request.',
    '',
    '\ud83d\udd17 __User Request__',
    `__Shortcode:__ ${shortcode['shortcode']}`,
    `__Redirect To:__ ${shortcode['redirect_url']}`,
    `__Request Method:__ ${request['method']}`,
    `__Request URL:__ ${escapeMarkdown(request['url'])}`,
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
    `__User-Agent:__ ${escapeMarkdown(request['headers'].get('user-agent') || 'unknown')}`,
    `__X-Real-IP:__ ${escapeMarkdown(request['headers'].get('x-real-ip') || 'unknown')}`,
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
  tracker: Worker_Trackers_FirePosthog_Tracker,
  request: Worker_Trackers_FirePosthog_Request,
  shortcode: Worker_Trackers_FirePosthog_Shortcode,
): Worker_Trackers_FirePosthog_Returns {
  const distinctId: Worker_Trackers_FirePosthog_DistinctId = request['headers'].get('cf-ray')
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
  tracker: Worker_Trackers_FirePlainText_Tracker,
  request: Worker_Trackers_FirePlainText_Request,
  shortcode: Worker_Trackers_FirePlainText_Shortcode,
): Worker_Trackers_FirePlainText_Returns {
  const headers: Worker_Trackers_FirePlainText_Headers = {
    'Content-Type': 'text/plain',
  };

  if (tracker['token'] !== undefined) {
    Reflect.set(headers, 'Authorization', `Bearer ${tracker['token']}`);
  }

  const cf: Worker_Trackers_FirePlainText_Cf = (request as Worker_Trackers_FirePlainText_CfAsUnknown as Worker_Trackers_FirePlainText_CfShape)['cf'] || {};

  const message: Worker_Trackers_FirePlainText_Message = [
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
 * @since 2.0.3
 */
async function fireTrackers(
  trackers: Worker_Trackers_FireTrackers_Trackers,
  request: Worker_Trackers_FireTrackers_Request,
  shortcode: Worker_Trackers_FireTrackers_Shortcode,
): Worker_Trackers_FireTrackers_Returns {
  const promises: Worker_Trackers_FireTrackers_Promises = trackers.map((tracker) => {
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

  const results: Worker_Trackers_FireTrackers_Results = await Promise.allSettled(promises);

  for (let i: Worker_Trackers_FireTrackers_Index = 0; i < results['length']; i += 1) {
    const result: Worker_Trackers_FireTrackers_Result = results[i];

    if (result !== undefined && result['status'] === 'rejected') {
      const tracker: Worker_Trackers_FireTrackers_Tracker = trackers[i];

      console.info(JSON.stringify({
        tracker: (tracker !== undefined) ? tracker['name'] : 'unknown',
        type: (tracker !== undefined) ? tracker['type'] : 'unknown',
        error: String(result['reason']),
      }));
    }
  }

  return;
}

export {
  escapeMarkdown,
  fireTrackers,
};
