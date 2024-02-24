/**
 * Shortcode.
 *
 * @since 1.0.0
 */
export type ShortcodeShortcode = string;

export type ShortcodeHttpResponse = 301 | 302 | 303 | 307 | 308;

export type ShortcodeRedirectUrl = string;

export type Shortcode = {
  shortcode: ShortcodeShortcode;
  http_response: ShortcodeHttpResponse;
  redirect_url: ShortcodeRedirectUrl;
};
