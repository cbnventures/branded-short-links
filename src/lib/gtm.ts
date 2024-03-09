import _ from 'lodash';

import {
  textBslGetReq,
  textBslPostReq,
  textImgSrc,
  textParenthesisLeft,
  textParenthesisRight,
} from '@/lib/regex.js';
import type {
  GoogleTagManagerBuildUrlReturns,
  GoogleTagManagerConstructorContainerId,
  GoogleTagManagerConstructorRequest,
  GoogleTagManagerConstructorShortcode,
  GoogleTagManagerContainerId,
  GoogleTagManagerExecuteResponses,
  GoogleTagManagerExecuteReturns,
  GoogleTagManagerExtractTagsHtmlText,
  GoogleTagManagerExtractTagsReturns,
  GoogleTagManagerProcessUrlReturns,
  GoogleTagManagerProcessUrlUrl,
  GoogleTagManagerRequest,
  GoogleTagManagerShortcode,
} from '@/types/index.d.ts';
import { getUrlParameterValue, removeUrlParameter } from '@/lib/utility.js';

/**
 * Google Tag Manager.
 *
 * @since 1.0.0
 */
export class GoogleTagManager {
  /**
   * Google Tag Manager - Container id.
   *
   * @private
   *
   * @since 1.0.0
   */
  readonly #containerId: GoogleTagManagerContainerId;

  /**
   * Google Tag Manager - Request.
   *
   * @private
   *
   * @since 1.0.0
   */
  #request: GoogleTagManagerRequest;

  /**
   * Google Tag Manager - Shortcode.
   *
   * @private
   *
   * @since 1.0.0
   */
  readonly #shortcode: GoogleTagManagerShortcode;

  /**
   * Google Tag Manager - Constructor.
   *
   * @param {GoogleTagManagerConstructorContainerId} containerId - Container id.
   * @param {GoogleTagManagerConstructorRequest}     request     - Request.
   * @param {GoogleTagManagerConstructorShortcode}   shortcode   - Shortcode.
   *
   * @since 1.0.0
   */
  constructor(containerId: GoogleTagManagerConstructorContainerId, request: GoogleTagManagerConstructorRequest, shortcode: GoogleTagManagerConstructorShortcode) {
    this.#containerId = containerId;
    this.#request = request;
    this.#shortcode = shortcode;
  }

  /**
   * Google Tag Manager - Execute.
   *
   * @returns {GoogleTagManagerExecuteReturns}
   *
   * @since 1.0.0
   */
  public async execute(): GoogleTagManagerExecuteReturns {
    const builtUrl = this.buildUrl();
    const responses: GoogleTagManagerExecuteResponses = [];

    try {
      const gtmResponse = await fetch(builtUrl);
      const gtmResponseText = await gtmResponse.text();
      const urls = GoogleTagManager.extractTags(gtmResponseText);

      for (let i = 0; i < urls.length; i += 1) {
        const processedUrl = await GoogleTagManager.processUrl(urls[i]);

        responses.push({
          success: processedUrl.status === 200,
          response: {
            headers: Object.fromEntries(processedUrl.headers),
            ok: processedUrl.ok,
            status: processedUrl.status,
            statusText: processedUrl.statusText,
            text: await processedUrl.text(),
            url: processedUrl.url,
          },
        });
      }
    } catch (error) {
      responses.push({
        success: false,
        response: (_.isError(error)) ? {
          message: error.message,
          stack: error.stack,
        } : {},
      });
    }

    return responses;
  }

  /**
   * Google Tag Manager - Build url.
   *
   * @private
   *
   * @returns {GoogleTagManagerBuildUrlReturns}
   *
   * @since 1.0.0
   */
  private buildUrl(): GoogleTagManagerBuildUrlReturns {
    let parameters = '';

    // Build the parameter string from Cloudflare properties, accessed shortcode, and headers.
    const properties = {
      bsl_redirectUrl: (this.#shortcode) ? this.#shortcode.redirect_url : null,
      bsl_shortcode: (this.#shortcode) ? this.#shortcode.shortcode : null,
      cf_asn: (this.#request.cf) ? this.#request.cf.asn : null,
      cf_asOrganization: (this.#request.cf) ? this.#request.cf.asOrganization : null,
      cf_city: (this.#request.cf) ? this.#request.cf.city : null,
      cf_colo: (this.#request.cf) ? this.#request.cf.colo : null,
      cf_continent: (this.#request.cf) ? this.#request.cf.continent : null,
      cf_country: (this.#request.cf) ? this.#request.cf.country : null,
      cf_isEUCountry: (this.#request.cf) ? this.#request.cf.isEUCountry : null,
      cf_latitude: (this.#request.cf) ? this.#request.cf.latitude : null,
      cf_longitude: (this.#request.cf) ? this.#request.cf.longitude : null,
      cf_metroCode: (this.#request.cf) ? this.#request.cf.metroCode : null,
      cf_postalCode: (this.#request.cf) ? this.#request.cf.postalCode : null,
      cf_region: (this.#request.cf) ? this.#request.cf.region : null,
      cf_regionCode: (this.#request.cf) ? this.#request.cf.regionCode : null,
      cf_timezone: (this.#request.cf) ? this.#request.cf.timezone : null,
      headers_cfConnectingIp: this.#request.headers.get('cf-connecting-ip'),
      headers_cfIpCountry: this.#request.headers.get('cf-ipcountry'),
      headers_cfRay: this.#request.headers.get('cf-ray'),
      headers_host: this.#request.headers.get('host'),
      headers_userAgent: this.#request.headers.get('user-agent'),
      headers_xRealIp: this.#request.headers.get('x-real-ip'),
      request_method: this.#request.method,
      request_url: this.#request.url,
    };

    Object.entries(properties).forEach((property) => {
      if (
        typeof property[1] === 'string'
        || typeof property[1] === 'number'
        || typeof property[1] === 'boolean'
      ) {
        const encodedValue = encodeURIComponent(property[1])
          .replace(textParenthesisLeft, '%28')
          .replace(textParenthesisRight, '%29');

        parameters += `&${property[0]}=${encodedValue}`;
      }
    });

    return `https://www.googletagmanager.com/ns.html?id=${this.#containerId}${parameters}`;
  }

  /**
   * Google Tag Manager - Process url.
   *
   * @param {GoogleTagManagerProcessUrlUrl} url - Url.
   *
   * @private
   *
   * @returns {GoogleTagManagerProcessUrlReturns}
   *
   * @since 1.0.0
   */
  private static async processUrl(url: GoogleTagManagerProcessUrlUrl): GoogleTagManagerProcessUrlReturns {
    // For GET requests, remove the beginning tag, and then fetch.
    if (url.startsWith('//BSL_GET_REQ=')) {
      return fetch(url.replace(textBslGetReq, '$2'));
    }

    // For POST requests, remove the beginning tag, process the "bsl_data" parameter, then fetch.
    if (url.startsWith('//BSL_POST_REQ=')) {
      const urlWithoutTag = url.replace(textBslPostReq, '$2');
      const bslData = getUrlParameterValue(urlWithoutTag, 'bsl_data');
      const newUrl = removeUrlParameter(urlWithoutTag, ['bsl_data']);

      // A POST request must include the "bsl_data" parameter.
      if (bslData === null) {
        throw new Error(`Attempting to perform a POST request for "${url}", but the "bsl_data" parameter does not exist.`);
      }

      return fetch(newUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: bslData,
      });
    }

    console.warn(`The "${url}" URL does not start with either "//BSL_GET_REQ=" or "//BSL_POST_REQ=". It will be processed as GET request ...`);

    return fetch(url);
  }

  /**
   * Google Tag Manager - Extract tags.
   *
   * @param {GoogleTagManagerExtractTagsHtmlText} htmlText - Html text.
   *
   * @private
   *
   * @returns {GoogleTagManagerExtractTagsReturns}
   *
   * @since 1.0.0
   */
  private static extractTags(htmlText: GoogleTagManagerExtractTagsHtmlText): GoogleTagManagerExtractTagsReturns {
    const matches = htmlText.matchAll(textImgSrc);

    return Array.from(matches, (match) => match[1]);
  }
}
