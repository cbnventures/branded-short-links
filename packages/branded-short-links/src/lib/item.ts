/**
 * Lib - Item - App Name.
 *
 * Application identifier used for resolving the XDG
 * config directory and environment file paths.
 *
 * @since 2.0.0
 */
const APP_NAME = 'branded-short-links';

/**
 * Lib - Item - App Links API Path.
 *
 * Reserved path used by private native clients to retrieve the deployment's
 * configured branded links.
 *
 * @since 2.1.0
 */
const APP_LINKS_API_PATH = '/__bsl/links';

export {
  APP_LINKS_API_PATH,
  APP_NAME,
};
