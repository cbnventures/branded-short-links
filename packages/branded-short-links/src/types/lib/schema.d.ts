/**
 * Lib - Schema.
 *
 * @since 2.0.0
 */
export type Lib_Schema_SettingsConfig_WorkerName = string;

export type Lib_Schema_SettingsConfig_BaseDomain = string;

export type Lib_Schema_SettingsConfig_ShowResponseOutput = boolean;

export type Lib_Schema_SettingsConfig = {
  worker_name: Lib_Schema_SettingsConfig_WorkerName;
  base_domain: Lib_Schema_SettingsConfig_BaseDomain;
  show_response_output: Lib_Schema_SettingsConfig_ShowResponseOutput;
};

export type Lib_Schema_LinkItemConfig_Shortcode = string;

export type Lib_Schema_LinkItemConfig_HttpResponse = 301 | 302 | 303 | 307 | 308;

export type Lib_Schema_LinkItemConfig_RedirectUrl = string;

export type Lib_Schema_LinkItemConfig = {
  shortcode: Lib_Schema_LinkItemConfig_Shortcode;
  http_response: Lib_Schema_LinkItemConfig_HttpResponse;
  redirect_url: Lib_Schema_LinkItemConfig_RedirectUrl;
};

export type Lib_Schema_LinksConfig_FallbackUrl = string | undefined;

export type Lib_Schema_LinksConfig_Items = Lib_Schema_LinkItemConfig[];

export type Lib_Schema_LinksConfig = {
  fallback_url?: Lib_Schema_LinksConfig_FallbackUrl;
  items: Lib_Schema_LinksConfig_Items;
};

export type Lib_Schema_Ga4TrackerConfig_Name = string;

export type Lib_Schema_Ga4TrackerConfig_Type = 'ga4';

export type Lib_Schema_Ga4TrackerConfig_MeasurementId = string;

export type Lib_Schema_Ga4TrackerConfig_ApiSecret = string;

export type Lib_Schema_Ga4TrackerConfig = {
  name: Lib_Schema_Ga4TrackerConfig_Name;
  type: Lib_Schema_Ga4TrackerConfig_Type;
  measurement_id: Lib_Schema_Ga4TrackerConfig_MeasurementId;
  api_secret: Lib_Schema_Ga4TrackerConfig_ApiSecret;
};

export type Lib_Schema_FacebookTrackerConfig_Name = string;

export type Lib_Schema_FacebookTrackerConfig_Type = 'facebook';

export type Lib_Schema_FacebookTrackerConfig_PixelId = string;

export type Lib_Schema_FacebookTrackerConfig = {
  name: Lib_Schema_FacebookTrackerConfig_Name;
  type: Lib_Schema_FacebookTrackerConfig_Type;
  pixel_id: Lib_Schema_FacebookTrackerConfig_PixelId;
};

export type Lib_Schema_NtfyTrackerConfig_Name = string;

export type Lib_Schema_NtfyTrackerConfig_Type = 'ntfy';

export type Lib_Schema_NtfyTrackerConfig_Server = string;

export type Lib_Schema_NtfyTrackerConfig_Topic = string;

export type Lib_Schema_NtfyTrackerConfig_Token = string;

export type Lib_Schema_NtfyTrackerConfig = {
  name: Lib_Schema_NtfyTrackerConfig_Name;
  type: Lib_Schema_NtfyTrackerConfig_Type;
  server: Lib_Schema_NtfyTrackerConfig_Server;
  topic: Lib_Schema_NtfyTrackerConfig_Topic;
  token: Lib_Schema_NtfyTrackerConfig_Token;
};

export type Lib_Schema_NtfyReverseProxyTrackerConfig_Name = string;

export type Lib_Schema_NtfyReverseProxyTrackerConfig_Type = 'ntfy-reverse-proxy';

export type Lib_Schema_NtfyReverseProxyTrackerConfig_Url = string;

export type Lib_Schema_NtfyReverseProxyTrackerConfig_Token = string | undefined;

export type Lib_Schema_NtfyReverseProxyTrackerConfig = {
  name: Lib_Schema_NtfyReverseProxyTrackerConfig_Name;
  type: Lib_Schema_NtfyReverseProxyTrackerConfig_Type;
  url: Lib_Schema_NtfyReverseProxyTrackerConfig_Url;
  token?: Lib_Schema_NtfyReverseProxyTrackerConfig_Token;
};

export type Lib_Schema_PosthogTrackerConfig_Name = string;

export type Lib_Schema_PosthogTrackerConfig_Type = 'posthog';

export type Lib_Schema_PosthogTrackerConfig_Host = string;

export type Lib_Schema_PosthogTrackerConfig_ApiKey = string;

export type Lib_Schema_PosthogTrackerConfig = {
  name: Lib_Schema_PosthogTrackerConfig_Name;
  type: Lib_Schema_PosthogTrackerConfig_Type;
  host: Lib_Schema_PosthogTrackerConfig_Host;
  api_key: Lib_Schema_PosthogTrackerConfig_ApiKey;
};

export type Lib_Schema_PlainTextTrackerConfig_Name = string;

export type Lib_Schema_PlainTextTrackerConfig_Type = 'plain-text';

export type Lib_Schema_PlainTextTrackerConfig_Url = string;

export type Lib_Schema_PlainTextTrackerConfig_Token = string | undefined;

export type Lib_Schema_PlainTextTrackerConfig = {
  name: Lib_Schema_PlainTextTrackerConfig_Name;
  type: Lib_Schema_PlainTextTrackerConfig_Type;
  url: Lib_Schema_PlainTextTrackerConfig_Url;
  token?: Lib_Schema_PlainTextTrackerConfig_Token;
};

export type Lib_Schema_TrackerConfig = Lib_Schema_Ga4TrackerConfig | Lib_Schema_FacebookTrackerConfig | Lib_Schema_NtfyTrackerConfig | Lib_Schema_NtfyReverseProxyTrackerConfig | Lib_Schema_PlainTextTrackerConfig | Lib_Schema_PosthogTrackerConfig;

export type Lib_Schema_Config_Settings = Lib_Schema_SettingsConfig;

export type Lib_Schema_Config_Links = Lib_Schema_LinksConfig;

export type Lib_Schema_Config_Trackers = Lib_Schema_TrackerConfig[];

export type Lib_Schema_Config = {
  settings: Lib_Schema_Config_Settings;
  links: Lib_Schema_Config_Links;
  trackers: Lib_Schema_Config_Trackers;
};
