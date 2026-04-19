/**
 * Lib - Regex - Env Line Pattern.
 *
 * Matches a single KEY=VALUE line in a .env file where the
 * key is uppercase letters and underscores, and the value
 * may be optionally wrapped in single or double quotes.
 *
 * @since 2.0.0
 */
const envLinePattern = /^([A-Z_]+)=["']?([^"'\n]*)["']?$/;

/**
 * Lib - Regex - Trailing Slash Pattern.
 *
 * Matches a trailing forward slash at the end of a URL pathname
 * so it can be stripped to normalize shortcode lookups.
 *
 * @since 2.0.0
 */
const trailingSlashPattern = /\/$/;

export {
  envLinePattern,
  trailingSlashPattern,
};
