/**
 * Lib - Regex - Env Line Pattern.
 *
 * Matches a single KEY=VALUE line in a .env file where the
 * key is uppercase letters, digits, and underscores, and the
 * value may be optionally wrapped in matched quotes.
 *
 * @since 2.0.0
 */
const envLinePattern = /^([A-Z0-9_]+)=(?:"([^"\n]*)"|'([^'\n]*)'|([^"'\n]*))$/;

/**
 * Lib - Regex - Line Break Pattern.
 *
 * Matches carriage-return and newline sequences so they can be replaced
 * with spaces in values interpolated into single-line notification fields.
 *
 * @since 2.0.7
 */
const lineBreakPattern = /\r\n?|\n/;

/**
 * Lib - Regex - Trailing Slash Pattern.
 *
 * Matches a trailing forward slash at the end of a URL pathname
 * so it can be stripped to normalize shortcode lookups.
 *
 * @since 2.0.0
 */
const trailingSlashPattern = /\/$/;

/**
 * Lib - Regex - App Access Username Pattern.
 *
 * Matches a normalized app-access username made from lowercase letters,
 * digits, periods, underscores, and hyphens.
 *
 * @since 2.1.0
 */
const appAccessUsernamePattern = /^[a-z0-9][a-z0-9._-]{0,63}$/;

/**
 * Lib - Regex - Memorable Access Key Pattern.
 *
 * Matches a memorable access key containing exactly five lowercase words
 * separated by hyphens.
 *
 * @since 2.1.0
 */
const memorableAccessKeyPattern = /^[a-z]+(?:-[a-z]+){4}$/;

/**
 * Lib - Regex - Compact Access Key Pattern.
 *
 * Matches a compact access key containing exactly five four-character
 * Crockford Base32 chunks separated by hyphens.
 *
 * @since 2.1.0
 */
const compactAccessKeyPattern = /^[0-9A-HJKMNP-TV-Z]{4}(?:-[0-9A-HJKMNP-TV-Z]{4}){4}$/;

/**
 * Lib - Regex - Random Access Key Pattern.
 *
 * Matches a copy-and-paste access key generated from 32 random bytes and
 * encoded as unpadded base64url after the bsl_ prefix.
 *
 * @since 2.1.0
 */
const randomAccessKeyPattern = /^bsl_[A-Za-z0-9_-]{43}$/;

/**
 * Lib - Regex - HTML Ampersand Pattern.
 *
 * Matches ampersand characters for HTML entity escaping
 * to prevent markup injection in interpolated strings.
 *
 * @since 2.0.3
 */
const htmlAmpersandPattern = /&/;

/**
 * Lib - Regex - HTML Less Than Pattern.
 *
 * Matches less-than characters for HTML entity escaping
 * to prevent element injection in interpolated strings.
 *
 * @since 2.0.3
 */
const htmlLessThanPattern = /</;

/**
 * Lib - Regex - HTML Greater Than Pattern.
 *
 * Matches greater-than characters for HTML entity escaping
 * to prevent element injection in interpolated strings.
 *
 * @since 2.0.3
 */
const htmlGreaterThanPattern = />/;

/**
 * Lib - Regex - HTML Double Quote Pattern.
 *
 * Matches double-quote characters for HTML entity escaping
 * to prevent attribute breakout in interpolated strings.
 *
 * @since 2.0.3
 */
const htmlDoubleQuotePattern = /"/;

/**
 * Lib - Regex - HTML Single Quote Pattern.
 *
 * Matches single-quote characters for HTML entity escaping
 * to prevent attribute breakout in interpolated strings.
 *
 * @since 2.0.3
 */
const htmlSingleQuotePattern = /'/;

export {
  appAccessUsernamePattern,
  compactAccessKeyPattern,
  envLinePattern,
  htmlAmpersandPattern,
  htmlDoubleQuotePattern,
  htmlGreaterThanPattern,
  htmlLessThanPattern,
  htmlSingleQuotePattern,
  lineBreakPattern,
  memorableAccessKeyPattern,
  randomAccessKeyPattern,
  trailingSlashPattern,
};
