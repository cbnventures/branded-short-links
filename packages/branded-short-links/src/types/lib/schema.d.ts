/**
 * Lib - Schema.
 *
 * @since 2.0.0
 */
export type LibSchemaConfigSettings = LibSchemaSettingsConfig;

export type LibSchemaConfigLinks = LibSchemaLinksConfig;

export type LibSchemaConfigTrackers = LibSchemaTrackerConfig[];

export type LibSchemaConfig = {
  settings: LibSchemaConfigSettings;
  links: LibSchemaConfigLinks;
  trackers: LibSchemaConfigTrackers;
};

export type LibSchemaSettingsConfigWorkerName = string;

export type LibSchemaSettingsConfigBaseDomain = string;

export type LibSchemaSettingsConfigShowResponseOutput = boolean;

export type LibSchemaSettingsConfig = {
  worker_name: LibSchemaSettingsConfigWorkerName;
  base_domain: LibSchemaSettingsConfigBaseDomain;
  show_response_output: LibSchemaSettingsConfigShowResponseOutput;
};

export type LibSchemaLinkItemConfigShortcode = string;

export type LibSchemaLinkItemConfigHttpResponse = 301 | 302 | 303 | 307 | 308;

export type LibSchemaLinkItemConfigRedirectUrl = string;

export type LibSchemaLinkItemConfig = {
  shortcode: LibSchemaLinkItemConfigShortcode;
  http_response: LibSchemaLinkItemConfigHttpResponse;
  redirect_url: LibSchemaLinkItemConfigRedirectUrl;
};

export type LibSchemaLinksConfigFallbackUrl = string | undefined;

export type LibSchemaLinksConfigItems = LibSchemaLinkItemConfig[];

export type LibSchemaLinksConfig = {
  fallback_url?: LibSchemaLinksConfigFallbackUrl;
  items: LibSchemaLinksConfigItems;
};

export type LibSchemaGa4TrackerConfigName = string;

export type LibSchemaGa4TrackerConfigType = 'ga4';

export type LibSchemaGa4TrackerConfigMeasurementId = string;

export type LibSchemaGa4TrackerConfigApiSecret = string;

export type LibSchemaGa4TrackerConfig = {
  name: LibSchemaGa4TrackerConfigName;
  type: LibSchemaGa4TrackerConfigType;
  measurement_id: LibSchemaGa4TrackerConfigMeasurementId;
  api_secret: LibSchemaGa4TrackerConfigApiSecret;
};

export type LibSchemaFacebookTrackerConfigName = string;

export type LibSchemaFacebookTrackerConfigType = 'facebook';

export type LibSchemaFacebookTrackerConfigPixelId = string;

export type LibSchemaFacebookTrackerConfig = {
  name: LibSchemaFacebookTrackerConfigName;
  type: LibSchemaFacebookTrackerConfigType;
  pixel_id: LibSchemaFacebookTrackerConfigPixelId;
};

export type LibSchemaNtfyTrackerConfigName = string;

export type LibSchemaNtfyTrackerConfigType = 'ntfy';

export type LibSchemaNtfyTrackerConfigServer = string;

export type LibSchemaNtfyTrackerConfigTopic = string;

export type LibSchemaNtfyTrackerConfigToken = string;

export type LibSchemaNtfyTrackerConfig = {
  name: LibSchemaNtfyTrackerConfigName;
  type: LibSchemaNtfyTrackerConfigType;
  server: LibSchemaNtfyTrackerConfigServer;
  topic: LibSchemaNtfyTrackerConfigTopic;
  token: LibSchemaNtfyTrackerConfigToken;
};

export type LibSchemaNtfyReverseProxyTrackerConfigName = string;

export type LibSchemaNtfyReverseProxyTrackerConfigType = 'ntfy-reverse-proxy';

export type LibSchemaNtfyReverseProxyTrackerConfigUrl = string;

export type LibSchemaNtfyReverseProxyTrackerConfigToken = string | undefined;

export type LibSchemaNtfyReverseProxyTrackerConfig = {
  name: LibSchemaNtfyReverseProxyTrackerConfigName;
  type: LibSchemaNtfyReverseProxyTrackerConfigType;
  url: LibSchemaNtfyReverseProxyTrackerConfigUrl;
  token?: LibSchemaNtfyReverseProxyTrackerConfigToken;
};

export type LibSchemaPosthogTrackerConfigName = string;

export type LibSchemaPosthogTrackerConfigType = 'posthog';

export type LibSchemaPosthogTrackerConfigHost = string;

export type LibSchemaPosthogTrackerConfigApiKey = string;

export type LibSchemaPosthogTrackerConfig = {
  name: LibSchemaPosthogTrackerConfigName;
  type: LibSchemaPosthogTrackerConfigType;
  host: LibSchemaPosthogTrackerConfigHost;
  api_key: LibSchemaPosthogTrackerConfigApiKey;
};

export type LibSchemaPlainTextTrackerConfigName = string;

export type LibSchemaPlainTextTrackerConfigType = 'plain-text';

export type LibSchemaPlainTextTrackerConfigUrl = string;

export type LibSchemaPlainTextTrackerConfigToken = string | undefined;

export type LibSchemaPlainTextTrackerConfig = {
  name: LibSchemaPlainTextTrackerConfigName;
  type: LibSchemaPlainTextTrackerConfigType;
  url: LibSchemaPlainTextTrackerConfigUrl;
  token?: LibSchemaPlainTextTrackerConfigToken;
};

export type LibSchemaTrackerConfig = LibSchemaGa4TrackerConfig | LibSchemaFacebookTrackerConfig | LibSchemaNtfyTrackerConfig | LibSchemaNtfyReverseProxyTrackerConfig | LibSchemaPlainTextTrackerConfig | LibSchemaPosthogTrackerConfig;
