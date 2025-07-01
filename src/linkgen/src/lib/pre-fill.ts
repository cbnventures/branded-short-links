/**
 * Pre-fill facebook pixel.
 *
 * @since 1.0.0
 */
export const preFillFacebookPixel = {
  requestBody: '',
  requestType: 'GET' as const,
  url: 'https://www.facebook.com/tr',
  urlParameters: [
    {
      key: 'id',
      value: '',
    },
    {
      key: 'ev',
      value: 'PageView',
    },
    {
      key: 'noscript',
      value: '1',
    },
  ],
};

/**
 * Pre-fill google analytics 4.
 *
 * @since 1.0.0
 */
export const preFillGoogleAnalytics4 = {
  requestBody: JSON.stringify({
    client_id: '{{headers_cfRay}}',
    events: [
      {
        name: 'select_content',
        params: {
          content_type: 'short_link',
          content_id: '{{bsl_shortcode}}',
        },
      },
    ],
  }, null, 4),
  requestType: 'POST' as const,
  url: 'https://www.google-analytics.com/mp/collect',
  urlParameters: [
    {
      key: 'api_secret',
      value: '',
    },
    {
      key: 'measurement_id',
      value: '',
    },
  ],
};

/**
 * Pre-fill ntfy server.
 *
 * @since 1.0.0
 */
export const preFillNtfyServer = {
  requestBody: JSON.stringify({
    topic: '',
    message: 'The following details have been captured from a recent user request.\n\n🔗 __User Request__\n__Shortcode:__ {{bsl_shortcode}}\n__Redirect To:__ {{bsl_redirectUrl}}\n__Request Method:__ {{request_method}}\n__Request URL:__ {{request_url}}\n\n🌩️ __Cloudflare Properties__\n__City:__ {{cf_city}}\n__Continent:__ {{cf_continent}}\n__Country:__ {{cf_country}}\n__Data Center:__ {{cf_colo}}\n__ISP:__ {{cf_asOrganization}} ({{cf_asn}})\n__Is EU Country:__ {{cf_isEUCountry}}\n__Coordinates:__ {{cf_latitude}}, {{cf_longitude}}\n__Metro Code:__ {{cf_metroCode}}\n__Postal Code:__ {{cf_postalCode}}\n__Region:__ {{cf_region}} ({{cf_regionCode}})\n__Time Zone:__ {{cf_timezone}}\n\n🗣 __Headers__\n__CF-Connecting-IP:__ {{headers_cfConnectingIp}}\n__CF-IPCountry:__ {{headers_cfIpCountry}}\n__CF-RAY:__ {{headers_cfRay}}\n__Host:__ {{headers_host}}\n__User-Agent:__ {{headers_userAgent}}\n__X-Real-IP:__ {{headers_xRealIp}}',
    title: 'User Request Received',
    tags: [
      'rotating_light',
    ],
    markdown: true,
    priority: 3,
  }, null, 4),
  requestType: 'POST' as const,
  url: 'https://ntfy.sh',
  urlParameters: [
    {
      key: 'auth',
      value: '',
    },
  ],
};

export const preFillPostHogCloud = {
  requestBody: JSON.stringify({
    api_key: '',
    distinct_id: '{{headers_cfRay}}',
    event: 'User Request Captured',
    properties: {
      bsl_shortcode: '{{bsl_shortcode}}',
      bsl_redirectUrl: '{{bsl_redirectUrl}}',
      request_method: '{{request_method}}',
      request_url: '{{request_url}}',
      cf_city: '{{cf_city}}',
      cf_continent: '{{cf_continent}}',
      cf_country: '{{cf_country}}',
      cf_colo: '{{cf_colo}}',
      cf_asOrganization: '{{cf_asOrganization}}',
      cf_asn: '{{cf_asn}}',
      cf_isEUCountry: '{{cf_isEUCountry}}',
      cf_latitude: '{{cf_latitude}}',
      cf_longitude: '{{cf_longitude}}',
      cf_metroCode: '{{cf_metroCode}}',
      cf_postalCode: '{{cf_postalCode}}',
      cf_region: '{{cf_region}}',
      cf_regionCode: '{{cf_regionCode}}',
      cf_timezone: '{{cf_timezone}}',
      headers_cfConnectingIp: '{{headers_cfConnectingIp}}',
      headers_cfIpCountry: '{{headers_cfIpCountry}}',
      headers_cfRay: '{{headers_cfRay}}',
      headers_host: '{{headers_host}}',
      headers_userAgent: '{{headers_userAgent}}',
      headers_xRealIp: '{{headers_xRealIp}}',
    },
  }, null, 4),
  requestType: 'POST' as const,
  url: 'https://app.posthog.com/capture/',
  urlParameters: [],
};
