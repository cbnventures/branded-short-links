/**
 * Lib - Regex - Pattern Global Props Interface.
 *
 * Matches the `interface GlobalProps { ... }` block that wrangler emits into the
 * generated worker-configuration.d.ts so generate-wrangler-types can strip it.
 *
 * @since 2.0.0
 */
export const PATTERN_GLOBAL_PROPS_INTERFACE = /\tinterface GlobalProps \{[^}]*\}\n/;

/**
 * Lib - Regex - Pattern Cloudflare API Token.
 *
 * Matches a CLOUDFLARE_API_TOKEN assignment in a .env file, capturing the token
 * value while tolerating optional single or double quotes around it.
 *
 * @since 2.0.0
 */
export const PATTERN_CLOUDFLARE_API_TOKEN = /CLOUDFLARE_API_TOKEN=["']?([^\s"']+)["']?/;
