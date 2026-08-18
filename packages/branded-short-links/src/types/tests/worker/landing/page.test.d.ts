import type { Lib_Schema_Config } from '../../../lib/schema.d.ts';

/**
 * Tests - Worker - Landing - Page.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Landing_Page_MockConfig_Settings = Lib_Schema_Config['settings'];

export type Tests_Worker_Landing_Page_MockConfig_Links = Lib_Schema_Config['links'];

export type Tests_Worker_Landing_Page_MockConfig_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Landing_Page_MockConfig = {
  settings: Tests_Worker_Landing_Page_MockConfig_Settings;
  links: Tests_Worker_Landing_Page_MockConfig_Links;
  trackers: Tests_Worker_Landing_Page_MockConfig_Trackers;
};

/**
 * Tests - Worker - Landing - Page - Landing Page - Contains Branded Short Links Text.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Landing_Page_LandingPage_ContainsBrandedShortLinksText_Response = Response;

export type Tests_Worker_Landing_Page_LandingPage_ContainsBrandedShortLinksText_Body = string;

/**
 * Tests - Worker - Landing - Page - Landing Page - Contains GitHub Link.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Landing_Page_LandingPage_ContainsGitHubLink_Response = Response;

export type Tests_Worker_Landing_Page_LandingPage_ContainsGitHubLink_Body = string;

/**
 * Tests - Worker - Landing - Page - Landing Page - Does Not Show Config In Non Debug Mode.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Landing_Page_LandingPage_DoesNotShowConfigInNonDebugMode_Response = Response;

export type Tests_Worker_Landing_Page_LandingPage_DoesNotShowConfigInNonDebugMode_Body = string;

/**
 * Tests - Worker - Landing - Page - Landing Page - Returns HTML Response With Correct Content Type.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Landing_Page_LandingPage_ReturnsHTMLResponseWithCorrectContentType_Response = Response;

export type Tests_Worker_Landing_Page_LandingPage_ReturnsHTMLResponseWithCorrectContentType_ContentType = string | null;

/**
 * Tests - Worker - Landing - Page - Landing Page - Shows Masked Config In Debug Mode.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Landing_Page_LandingPage_ShowsMaskedConfigInDebugMode_DebugConfig_Settings = Lib_Schema_Config['settings'];

export type Tests_Worker_Landing_Page_LandingPage_ShowsMaskedConfigInDebugMode_DebugConfig_Links = Lib_Schema_Config['links'];

export type Tests_Worker_Landing_Page_LandingPage_ShowsMaskedConfigInDebugMode_DebugConfig_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Landing_Page_LandingPage_ShowsMaskedConfigInDebugMode_DebugConfig = {
  settings: Tests_Worker_Landing_Page_LandingPage_ShowsMaskedConfigInDebugMode_DebugConfig_Settings;
  links: Tests_Worker_Landing_Page_LandingPage_ShowsMaskedConfigInDebugMode_DebugConfig_Links;
  trackers: Tests_Worker_Landing_Page_LandingPage_ShowsMaskedConfigInDebugMode_DebugConfig_Trackers;
};

export type Tests_Worker_Landing_Page_LandingPage_ShowsMaskedConfigInDebugMode_Response = Response;

export type Tests_Worker_Landing_Page_LandingPage_ShowsMaskedConfigInDebugMode_Body = string;

/**
 * Tests - Worker - Landing - Page - Mask Config - Masks Facebook Tracker Secrets.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_FacebookConfig_Settings = Lib_Schema_Config['settings'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_FacebookConfig_Links = Lib_Schema_Config['links'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_FacebookConfig_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_FacebookConfig = {
  settings: Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_FacebookConfig_Settings;
  links: Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_FacebookConfig_Links;
  trackers: Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_FacebookConfig_Trackers;
};

export type Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_Masked = Record<string, unknown>;

export type Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_Trackers_Item_PixelId = string;

export type Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_Trackers_Item = {
  pixel_id: Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_Trackers_Item_PixelId;
};

export type Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_Trackers = Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_Trackers_Item[];

/**
 * Tests - Worker - Landing - Page - Mask Config - Masks Ga4 Tracker Secrets.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Landing_Page_MaskConfig_MasksGa4TrackerSecrets_Masked = Record<string, unknown>;

export type Tests_Worker_Landing_Page_MaskConfig_MasksGa4TrackerSecrets_Trackers_Item_MeasurementId = string;

export type Tests_Worker_Landing_Page_MaskConfig_MasksGa4TrackerSecrets_Trackers_Item_ApiSecret = string;

export type Tests_Worker_Landing_Page_MaskConfig_MasksGa4TrackerSecrets_Trackers_Item = {
  measurement_id: Tests_Worker_Landing_Page_MaskConfig_MasksGa4TrackerSecrets_Trackers_Item_MeasurementId;
  api_secret: Tests_Worker_Landing_Page_MaskConfig_MasksGa4TrackerSecrets_Trackers_Item_ApiSecret;
};

export type Tests_Worker_Landing_Page_MaskConfig_MasksGa4TrackerSecrets_Trackers = Tests_Worker_Landing_Page_MaskConfig_MasksGa4TrackerSecrets_Trackers_Item[];

/**
 * Tests - Worker - Landing - Page - Mask Config - Masks Ntfy Reverse Proxy Tracker Secrets.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_NtfyReverseProxyConfig_Settings = Lib_Schema_Config['settings'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_NtfyReverseProxyConfig_Links = Lib_Schema_Config['links'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_NtfyReverseProxyConfig_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_NtfyReverseProxyConfig = {
  settings: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_NtfyReverseProxyConfig_Settings;
  links: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_NtfyReverseProxyConfig_Links;
  trackers: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_NtfyReverseProxyConfig_Trackers;
};

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_Masked = Record<string, unknown>;

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_Trackers_Item_Url = string;

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_Trackers_Item_Token = string;

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_Trackers_Item = {
  url: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_Trackers_Item_Url;
  token: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_Trackers_Item_Token;
};

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_Trackers = Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_Trackers_Item[];

/**
 * Tests - Worker - Landing - Page - Mask Config - Masks Ntfy Reverse Proxy Tracker Secrets Without Token.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_NtfyReverseProxyNoTokenConfig_Settings = Lib_Schema_Config['settings'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_NtfyReverseProxyNoTokenConfig_Links = Lib_Schema_Config['links'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_NtfyReverseProxyNoTokenConfig_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_NtfyReverseProxyNoTokenConfig = {
  settings: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_NtfyReverseProxyNoTokenConfig_Settings;
  links: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_NtfyReverseProxyNoTokenConfig_Links;
  trackers: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_NtfyReverseProxyNoTokenConfig_Trackers;
};

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_Masked = Record<string, unknown>;

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_Trackers_Item_Url = string;

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_Trackers_Item = {
  url: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_Trackers_Item_Url;
};

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_Trackers = Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_Trackers_Item[];

/**
 * Tests - Worker - Landing - Page - Mask Config - Masks Ntfy Tracker Secrets.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_NtfyConfig_Settings = Lib_Schema_Config['settings'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_NtfyConfig_Links = Lib_Schema_Config['links'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_NtfyConfig_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_NtfyConfig = {
  settings: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_NtfyConfig_Settings;
  links: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_NtfyConfig_Links;
  trackers: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_NtfyConfig_Trackers;
};

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_Masked = Record<string, unknown>;

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_Trackers_Item_Server = string;

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_Trackers_Item_Token = string;

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_Trackers_Item = {
  server: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_Trackers_Item_Server;
  token: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_Trackers_Item_Token;
};

export type Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_Trackers = Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_Trackers_Item[];

/**
 * Tests - Worker - Landing - Page - Mask Config - Masks Plain Text Tracker Secrets.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_PlainTextConfig_Settings = Lib_Schema_Config['settings'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_PlainTextConfig_Links = Lib_Schema_Config['links'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_PlainTextConfig_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_PlainTextConfig = {
  settings: Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_PlainTextConfig_Settings;
  links: Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_PlainTextConfig_Links;
  trackers: Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_PlainTextConfig_Trackers;
};

export type Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_Masked = Record<string, unknown>;

export type Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_Trackers_Item_Url = string;

export type Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_Trackers_Item_Token = string;

export type Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_Trackers_Item = {
  url: Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_Trackers_Item_Url;
  token: Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_Trackers_Item_Token;
};

export type Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_Trackers = Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_Trackers_Item[];

/**
 * Tests - Worker - Landing - Page - Mask Config - Masks Plain Text Tracker Secrets Without Token.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_PlainTextNoTokenConfig_Settings = Lib_Schema_Config['settings'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_PlainTextNoTokenConfig_Links = Lib_Schema_Config['links'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_PlainTextNoTokenConfig_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_PlainTextNoTokenConfig = {
  settings: Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_PlainTextNoTokenConfig_Settings;
  links: Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_PlainTextNoTokenConfig_Links;
  trackers: Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_PlainTextNoTokenConfig_Trackers;
};

export type Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_Masked = Record<string, unknown>;

export type Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_Trackers_Item_Url = string;

export type Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_Trackers_Item = {
  url: Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_Trackers_Item_Url;
};

export type Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_Trackers = Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_Trackers_Item[];

/**
 * Tests - Worker - Landing - Page - Mask Config - Masks Posthog Tracker Secrets.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_PosthogConfig_Settings = Lib_Schema_Config['settings'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_PosthogConfig_Links = Lib_Schema_Config['links'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_PosthogConfig_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_PosthogConfig = {
  settings: Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_PosthogConfig_Settings;
  links: Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_PosthogConfig_Links;
  trackers: Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_PosthogConfig_Trackers;
};

export type Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_Masked = Record<string, unknown>;

export type Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_Trackers_Item_Host = string;

export type Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_Trackers_Item_ApiKey = string;

export type Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_Trackers_Item = {
  host: Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_Trackers_Item_Host;
  api_key: Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_Trackers_Item_ApiKey;
};

export type Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_Trackers = Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_Trackers_Item[];

/**
 * Tests - Worker - Landing - Page - Mask Config - Masks Redirect Url In Link Items.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Landing_Page_MaskConfig_MasksRedirectUrlInLinkItems_Masked = Record<string, unknown>;

export type Tests_Worker_Landing_Page_MaskConfig_MasksRedirectUrlInLinkItems_Links_Item_RedirectUrl = string;

export type Tests_Worker_Landing_Page_MaskConfig_MasksRedirectUrlInLinkItems_Links_Item = {
  redirect_url: Tests_Worker_Landing_Page_MaskConfig_MasksRedirectUrlInLinkItems_Links_Item_RedirectUrl;
};

export type Tests_Worker_Landing_Page_MaskConfig_MasksRedirectUrlInLinkItems_Links_Items = Tests_Worker_Landing_Page_MaskConfig_MasksRedirectUrlInLinkItems_Links_Item[];

export type Tests_Worker_Landing_Page_MaskConfig_MasksRedirectUrlInLinkItems_Links = {
  items: Tests_Worker_Landing_Page_MaskConfig_MasksRedirectUrlInLinkItems_Links_Items;
};

/**
 * Tests - Worker - Landing - Page - Mask Config - Omits Fallback Url When Undefined.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Landing_Page_MaskConfig_OmitsFallbackUrlWhenUndefined_NoFallbackConfig_Settings = Lib_Schema_Config['settings'];

export type Tests_Worker_Landing_Page_MaskConfig_OmitsFallbackUrlWhenUndefined_NoFallbackConfig_LinksItems = Lib_Schema_Config['links']['items'];

export type Tests_Worker_Landing_Page_MaskConfig_OmitsFallbackUrlWhenUndefined_NoFallbackConfig_Links = {
  items: Tests_Worker_Landing_Page_MaskConfig_OmitsFallbackUrlWhenUndefined_NoFallbackConfig_LinksItems;
};

export type Tests_Worker_Landing_Page_MaskConfig_OmitsFallbackUrlWhenUndefined_NoFallbackConfig_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Landing_Page_MaskConfig_OmitsFallbackUrlWhenUndefined_NoFallbackConfig = {
  settings: Tests_Worker_Landing_Page_MaskConfig_OmitsFallbackUrlWhenUndefined_NoFallbackConfig_Settings;
  links: Tests_Worker_Landing_Page_MaskConfig_OmitsFallbackUrlWhenUndefined_NoFallbackConfig_Links;
  trackers: Tests_Worker_Landing_Page_MaskConfig_OmitsFallbackUrlWhenUndefined_NoFallbackConfig_Trackers;
};

export type Tests_Worker_Landing_Page_MaskConfig_OmitsFallbackUrlWhenUndefined_Masked = Record<string, unknown>;

export type Tests_Worker_Landing_Page_MaskConfig_OmitsFallbackUrlWhenUndefined_Links = Record<string, unknown>;

/**
 * Tests - Worker - Landing - Page - Mask Config - Preserves Fallback Url Unmasked.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Landing_Page_MaskConfig_PreservesFallbackUrlUnmasked_Masked = Record<string, unknown>;

export type Tests_Worker_Landing_Page_MaskConfig_PreservesFallbackUrlUnmasked_Links_FallbackUrl = string;

export type Tests_Worker_Landing_Page_MaskConfig_PreservesFallbackUrlUnmasked_Links = {
  fallback_url: Tests_Worker_Landing_Page_MaskConfig_PreservesFallbackUrlUnmasked_Links_FallbackUrl;
};

/**
 * Tests - Worker - Landing - Page - Mask Config - Preserves Settings Unmasked.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Landing_Page_MaskConfig_PreservesSettingsUnmasked_Masked = Record<string, unknown>;

export type Tests_Worker_Landing_Page_MaskConfig_PreservesSettingsUnmasked_Settings_BaseDomain = string;

export type Tests_Worker_Landing_Page_MaskConfig_PreservesSettingsUnmasked_Settings = {
  base_domain: Tests_Worker_Landing_Page_MaskConfig_PreservesSettingsUnmasked_Settings_BaseDomain;
};

/**
 * Tests - Worker - Landing - Page - Mask Value - Fully Masks All Values.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Landing_Page_MaskValue_FullyMasksAllValues_MaskedAbc = string;

export type Tests_Worker_Landing_Page_MaskValue_FullyMasksAllValues_MaskedSecret = string;

export type Tests_Worker_Landing_Page_MaskValue_FullyMasksAllValues_MaskedMeasurementId = string;

/**
 * Tests - Worker - Landing - Page - Not Found Page - Contains 404 Badge.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Landing_Page_NotFoundPage_Contains404Badge_Response = Response;

export type Tests_Worker_Landing_Page_NotFoundPage_Contains404Badge_Body = string;

/**
 * Tests - Worker - Landing - Page - Not Found Page - Contains Shortcode Not Found Text.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Landing_Page_NotFoundPage_ContainsShortcodeNotFoundText_Response = Response;

export type Tests_Worker_Landing_Page_NotFoundPage_ContainsShortcodeNotFoundText_Body = string;

/**
 * Tests - Worker - Landing - Page - Not Found Page - Returns 404 With Correct Content Type.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Landing_Page_NotFoundPage_Returns404WithCorrectContentType_Response = Response;

export type Tests_Worker_Landing_Page_NotFoundPage_Returns404WithCorrectContentType_ContentType = string | null;
