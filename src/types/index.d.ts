import type { Shortcode } from '@/types/shared.d.ts';

/**
 * Google Tag Manager - Build url.
 *
 * @since 1.0.0
 */
export type GoogleTagManagerBuildUrlReturns = `https://www.googletagmanager.com/ns.html?id=${string}`;

/**
 * Google Tag Manager - Constructor.
 *
 * @since 1.0.0
 */
export type GoogleTagManagerConstructorContainerId = string;

export type GoogleTagManagerConstructorRequest = Request;

export type GoogleTagManagerConstructorShortcode = Shortcode | undefined;

/**
 * Google Tag Manager - Container id.
 *
 * @since 1.0.0
 */
export type GoogleTagManagerContainerId = string;

/**
 * Google Tag Manager - Execute.
 *
 * @since 1.0.0
 */
export type GoogleTagManagerExecuteReturns = Promise<GoogleTagManagerExecuteResponses>;

export type GoogleTagManagerExecuteResponseSuccess = boolean;

export type GoogleTagManagerExecuteResponseResponse = object;

export type GoogleTagManagerExecuteResponse = {
  success: GoogleTagManagerExecuteResponseSuccess;
  response: GoogleTagManagerExecuteResponseResponse;
};

export type GoogleTagManagerExecuteResponses = GoogleTagManagerExecuteResponse[];

/**
 * Google Tag Manager - Extract tags.
 *
 * @since 1.0.0
 */
export type GoogleTagManagerExtractTagsHtmlText = string;

export type GoogleTagManagerExtractTagsReturns = string[];

/**
 * Google Tag Manager - Request.
 *
 * @since 1.0.0
 */
export type GoogleTagManagerRequest = Request;

/**
 * Google Tag Manager - Shortcode.
 *
 * @since 1.0.0
 */
export type GoogleTagManagerShortcode = Shortcode | undefined;

/**
 * Initialize.
 *
 * @since 1.0.0
 */
export type InitializeRequest = Request;

export type InitializeEnv = unknown;

export type InitializeReturns = Promise<Response>;

/**
 * Pretty print.
 *
 * @since 1.0.0
 */
export type PrettyPrintData = object | object[];

export type PrettyPrintReturns = string | null;
