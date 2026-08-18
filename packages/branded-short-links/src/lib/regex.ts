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
 * Lib - Regex - Markdown Control Characters Pattern.
 *
 * Matches Markdown control characters that could be used to inject
 * formatting or links when interpolated into Markdown-enabled content.
 *
 * @since 2.0.3
 */
const markdownControlCharactersPattern = /[<[\](){}*_~`#|>!\\]/;

/**
 * Lib - Regex - Newline Pattern.
 *
 * Matches newline characters so they can be replaced with spaces
 * in untrusted input interpolated into single-line Markdown fields.
 *
 * @since 2.0.3
 */
const newlinePattern = /\n/;

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
  envLinePattern,
  htmlAmpersandPattern,
  htmlDoubleQuotePattern,
  htmlGreaterThanPattern,
  htmlLessThanPattern,
  htmlSingleQuotePattern,
  markdownControlCharactersPattern,
  newlinePattern,
  trailingSlashPattern,
};
