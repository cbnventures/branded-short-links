import type prompts from 'prompts';

import type {
  Lib_Schema_Config,
  Lib_Schema_LinkItemConfig,
  Lib_Schema_LinkItemConfig_HttpResponse,
  Lib_Schema_NtfyReverseProxyTrackerConfig,
  Lib_Schema_NtfyTrackerConfig,
  Lib_Schema_PlainTextTrackerConfig,
  Lib_Schema_PosthogTrackerConfig,
  Lib_Schema_SettingsConfig,
  Lib_Schema_TrackerConfig,
} from '../../lib/schema.d.ts';

/**
 * CLI - Menu - Interactive - Add Tracker Flow.
 *
 * @since 2.0.0
 */
export type Cli_Menu_Interactive_AddTrackerFlow_ConfigPath = string;

export type Cli_Menu_Interactive_AddTrackerFlow_Returns = Promise<void>;

export type Cli_Menu_Interactive_AddTrackerFlow_TrackerTypeResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_AddTrackerFlow_TrackerType = unknown;

export type Cli_Menu_Interactive_AddTrackerFlow_NameResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_AddTrackerFlow_Name = unknown;

export type Cli_Menu_Interactive_AddTrackerFlow_Fields = Record<string, unknown>;

export type Cli_Menu_Interactive_AddTrackerFlow_FieldsMeasurementId = unknown;

export type Cli_Menu_Interactive_AddTrackerFlow_FieldsApiSecret = unknown;

export type Cli_Menu_Interactive_AddTrackerFlow_NameAsString = string;

export type Cli_Menu_Interactive_AddTrackerFlow_FieldsMeasurementIdAsString = string;

export type Cli_Menu_Interactive_AddTrackerFlow_FieldsApiSecretAsString = string;

export type Cli_Menu_Interactive_AddTrackerFlow_PixelIdResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_AddTrackerFlow_PixelId = unknown;

export type Cli_Menu_Interactive_AddTrackerFlow_PixelIdAsString = string;

export type Cli_Menu_Interactive_AddTrackerFlow_NtfyFields = Record<string, unknown>;

export type Cli_Menu_Interactive_AddTrackerFlow_NtfyParsedUrl = URL;

export type Cli_Menu_Interactive_AddTrackerFlow_FieldsServer = unknown;

export type Cli_Menu_Interactive_AddTrackerFlow_FieldsTopic = unknown;

export type Cli_Menu_Interactive_AddTrackerFlow_FieldsToken = unknown;

export type Cli_Menu_Interactive_AddTrackerFlow_FieldsServerAsString = string;

export type Cli_Menu_Interactive_AddTrackerFlow_FieldsTopicAsString = string;

export type Cli_Menu_Interactive_AddTrackerFlow_FieldsTokenAsString = string;

export type Cli_Menu_Interactive_AddTrackerFlow_ProxyUrlResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_AddTrackerFlow_ProxyParsedUrl = URL;

export type Cli_Menu_Interactive_AddTrackerFlow_ProxyUrl = unknown;

export type Cli_Menu_Interactive_AddTrackerFlow_ProxyTokenResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_AddTrackerFlow_ProxyToken = unknown;

export type Cli_Menu_Interactive_AddTrackerFlow_ProxyTokenValue = string | undefined;

export type Cli_Menu_Interactive_AddTrackerFlow_ProxyTokenAsString = string;

export type Cli_Menu_Interactive_AddTrackerFlow_ProxyResolvedToken = string | undefined;

export type Cli_Menu_Interactive_AddTrackerFlow_UrlAsString = string;

export type Cli_Menu_Interactive_AddTrackerFlow_PlainUrlResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_AddTrackerFlow_PlainParsedUrl = URL;

export type Cli_Menu_Interactive_AddTrackerFlow_PlainUrl = unknown;

export type Cli_Menu_Interactive_AddTrackerFlow_PlainTokenResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_AddTrackerFlow_PlainToken = unknown;

export type Cli_Menu_Interactive_AddTrackerFlow_PlainTokenValue = string | undefined;

export type Cli_Menu_Interactive_AddTrackerFlow_PlainTokenAsString = string;

export type Cli_Menu_Interactive_AddTrackerFlow_PlainResolvedToken = string | undefined;

export type Cli_Menu_Interactive_AddTrackerFlow_PosthogFields = Record<string, unknown>;

export type Cli_Menu_Interactive_AddTrackerFlow_PosthogParsedUrl = URL;

export type Cli_Menu_Interactive_AddTrackerFlow_FieldsHost = unknown;

export type Cli_Menu_Interactive_AddTrackerFlow_FieldsApiKey = unknown;

export type Cli_Menu_Interactive_AddTrackerFlow_FieldsHostAsString = string;

export type Cli_Menu_Interactive_AddTrackerFlow_FieldsApiKeyAsString = string;

export type Cli_Menu_Interactive_AddTrackerFlow_ErrorMessage = string;

/**
 * CLI - Menu - Interactive - Edit Tracker Flow.
 *
 * @since 2.0.0
 */
export type Cli_Menu_Interactive_EditTrackerFlow_ConfigPath = string;

export type Cli_Menu_Interactive_EditTrackerFlow_Returns = Promise<void>;

export type Cli_Menu_Interactive_EditTrackerFlow_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Menu_Interactive_EditTrackerFlow_NameResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_EditTrackerFlow_Name = unknown;

export type Cli_Menu_Interactive_EditTrackerFlow_Current = Lib_Schema_TrackerConfig | undefined;

export type Cli_Menu_Interactive_EditTrackerFlow_TypeChangeResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_EditTrackerFlow_NewType = string | undefined;

export type Cli_Menu_Interactive_EditTrackerFlow_TrackerCountBefore = number;

export type Cli_Menu_Interactive_EditTrackerFlow_NameAsString = string;

export type Cli_Menu_Interactive_EditTrackerFlow_TrackerCountAfter = number;

export type Cli_Menu_Interactive_EditTrackerFlow_Updates = Record<string, unknown>;

export type Cli_Menu_Interactive_EditTrackerFlow_UpdatesMeasurementId = unknown;

export type Cli_Menu_Interactive_EditTrackerFlow_UpdatesApiSecret = unknown;

export type Cli_Menu_Interactive_EditTrackerFlow_UpdatesMeasurementIdAsString = string;

export type Cli_Menu_Interactive_EditTrackerFlow_UpdatesApiSecretAsString = string;

export type Cli_Menu_Interactive_EditTrackerFlow_PixelIdResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_EditTrackerFlow_PixelId = unknown;

export type Cli_Menu_Interactive_EditTrackerFlow_PixelIdAsString = string;

export type Cli_Menu_Interactive_EditTrackerFlow_NtfyEditFields = Record<string, unknown>;

export type Cli_Menu_Interactive_EditTrackerFlow_NtfyParsedUrl = URL;

export type Cli_Menu_Interactive_EditTrackerFlow_NtfyUpdates = Record<string, unknown>;

export type Cli_Menu_Interactive_EditTrackerFlow_NtfyUpdatesServer = unknown;

export type Cli_Menu_Interactive_EditTrackerFlow_NtfyUpdatesTopic = unknown;

export type Cli_Menu_Interactive_EditTrackerFlow_NtfyUpdatesToken = unknown;

export type Cli_Menu_Interactive_EditTrackerFlow_NtfyUpdatesKeys = string[];

export type Cli_Menu_Interactive_EditTrackerFlow_NtfyUpdatesAsPartial = Partial<Lib_Schema_NtfyTrackerConfig>;

export type Cli_Menu_Interactive_EditTrackerFlow_PosthogEditFields = Record<string, unknown>;

export type Cli_Menu_Interactive_EditTrackerFlow_PosthogParsedUrl = URL;

export type Cli_Menu_Interactive_EditTrackerFlow_PosthogUpdates = Record<string, unknown>;

export type Cli_Menu_Interactive_EditTrackerFlow_PosthogUpdatesHost = unknown;

export type Cli_Menu_Interactive_EditTrackerFlow_PosthogUpdatesApiKey = unknown;

export type Cli_Menu_Interactive_EditTrackerFlow_PosthogUpdatesKeys = string[];

export type Cli_Menu_Interactive_EditTrackerFlow_PosthogUpdatesAsPartial = Partial<Lib_Schema_PosthogTrackerConfig>;

export type Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUrlResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_EditTrackerFlow_ProxyParsedUrl = URL;

export type Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesUrl = unknown;

export type Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyTokenResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesToken = unknown;

export type Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesTokenValue = string | undefined;

export type Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesTokenAsString = string;

export type Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesResolvedToken = string | undefined;

export type Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdates = Record<string, unknown>;

export type Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesKeys = string[];

export type Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesAsPartial = Partial<Lib_Schema_NtfyReverseProxyTrackerConfig>;

export type Cli_Menu_Interactive_EditTrackerFlow_PlainTextUrlResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_EditTrackerFlow_PlainParsedUrl = URL;

export type Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesUrl = unknown;

export type Cli_Menu_Interactive_EditTrackerFlow_PlainTextTokenResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesToken = unknown;

export type Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesTokenValue = string | undefined;

export type Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesTokenAsString = string;

export type Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesResolvedToken = string | undefined;

export type Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdates = Record<string, unknown>;

export type Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesKeys = string[];

export type Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesAsPartial = Partial<Lib_Schema_PlainTextTrackerConfig>;

export type Cli_Menu_Interactive_EditTrackerFlow_ErrorMessage = string;

/**
 * CLI - Menu - Interactive - Interactive Menu.
 *
 * @since 2.0.0
 */
export type Cli_Menu_Interactive_InteractiveMenu_ConfigDirs = string[];

export type Cli_Menu_Interactive_InteractiveMenu_Returns = Promise<void>;

export type Cli_Menu_Interactive_InteractiveMenu_CurrentFilePath = string;

export type Cli_Menu_Interactive_InteractiveMenu_Dir = string;

export type Cli_Menu_Interactive_InteractiveMenu_Version = string;

export type Cli_Menu_Interactive_InteractiveMenu_PackageJsonPath = string;

export type Cli_Menu_Interactive_InteractiveMenu_PackageJsonRaw = string;

export type Cli_Menu_Interactive_InteractiveMenu_PackageJsonParsed = Record<string, unknown>;

export type Cli_Menu_Interactive_InteractiveMenu_Parent = string;

export type Cli_Menu_Interactive_InteractiveMenu_Header = string;

export type Cli_Menu_Interactive_InteractiveMenu_ConfigPath = string | undefined;

export type Cli_Menu_Interactive_InteractiveMenu_ConfigDirResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_InteractiveMenu_DefaultConfigDir = string;

export type Cli_Menu_Interactive_InteractiveMenu_Running = boolean;

export type Cli_Menu_Interactive_InteractiveMenu_ActionResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_InteractiveMenu_Action = unknown;

export type Cli_Menu_Interactive_InteractiveMenu_ErrorMessage = string;

/**
 * CLI - Menu - Interactive - Links Menu.
 *
 * @since 2.0.0
 */
export type Cli_Menu_Interactive_LinksMenu_ConfigPath = string;

export type Cli_Menu_Interactive_LinksMenu_Returns = Promise<void>;

export type Cli_Menu_Interactive_LinksMenu_InMenu = boolean;

export type Cli_Menu_Interactive_LinksMenu_ActionResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_LinksMenu_Action = unknown;

export type Cli_Menu_Interactive_LinksMenu_Answers = Record<string, unknown>;

export type Cli_Menu_Interactive_LinksMenu_ParsedUrl = URL;

export type Cli_Menu_Interactive_LinksMenu_AnswersShortcode = unknown;

export type Cli_Menu_Interactive_LinksMenu_AnswersHttpResponse = unknown;

export type Cli_Menu_Interactive_LinksMenu_AnswersRedirectUrl = unknown;

export type Cli_Menu_Interactive_LinksMenu_AnswersShortcodeAsString = string;

export type Cli_Menu_Interactive_LinksMenu_AnswersHttpResponseAsCode = Lib_Schema_LinkItemConfig_HttpResponse;

export type Cli_Menu_Interactive_LinksMenu_AnswersRedirectUrlAsString = string;

export type Cli_Menu_Interactive_LinksMenu_AddErrorMessage = string;

export type Cli_Menu_Interactive_LinksMenu_Links = Lib_Schema_Config['links']['items'];

export type Cli_Menu_Interactive_LinksMenu_ShortcodeResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_LinksMenu_Shortcode = unknown;

export type Cli_Menu_Interactive_LinksMenu_Current = Lib_Schema_LinkItemConfig | undefined;

export type Cli_Menu_Interactive_LinksMenu_CurrentHttpResponse = unknown;

export type Cli_Menu_Interactive_LinksMenu_HttpCodes = Lib_Schema_Config['links']['items'][number]['http_response'][];

export type Cli_Menu_Interactive_LinksMenu_HttpCodeIdx = number;

export type Cli_Menu_Interactive_LinksMenu_HttpCodeInitial = number;

export type Cli_Menu_Interactive_LinksMenu_CurrentRedirectUrl = unknown;

export type Cli_Menu_Interactive_LinksMenu_Updates = Record<string, unknown>;

export type Cli_Menu_Interactive_LinksMenu_EditParsedUrl = URL;

export type Cli_Menu_Interactive_LinksMenu_UpdatesHttpResponse = unknown;

export type Cli_Menu_Interactive_LinksMenu_UpdatesRedirectUrl = unknown;

export type Cli_Menu_Interactive_LinksMenu_EditUpdates = Record<string, unknown>;

export type Cli_Menu_Interactive_LinksMenu_EditLinkModule_EditLink = (configPath: string, shortcode: string, updates: Partial<Lib_Schema_LinkItemConfig>) => void;

export type Cli_Menu_Interactive_LinksMenu_EditLinkModule = {
  editLink: Cli_Menu_Interactive_LinksMenu_EditLinkModule_EditLink;
};

export type Cli_Menu_Interactive_LinksMenu_ShortcodeAsString = string;

export type Cli_Menu_Interactive_LinksMenu_EditUpdatesAsPartial = Partial<Lib_Schema_LinkItemConfig>;

export type Cli_Menu_Interactive_LinksMenu_EditErrorMessage = string;

export type Cli_Menu_Interactive_LinksMenu_RemoveLinks = Lib_Schema_Config['links']['items'];

export type Cli_Menu_Interactive_LinksMenu_RemoveShortcodeResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_LinksMenu_RemoveShortcode = unknown;

export type Cli_Menu_Interactive_LinksMenu_ConfirmedResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_LinksMenu_Confirmed = unknown;

export type Cli_Menu_Interactive_LinksMenu_RemoveShortcodeAsString = string;

export type Cli_Menu_Interactive_LinksMenu_RemoveErrorMessage = string;

export type Cli_Menu_Interactive_LinksMenu_CurrentFallback = Lib_Schema_Config['links']['fallback_url'];

export type Cli_Menu_Interactive_LinksMenu_FallbackMessage = string;

export type Cli_Menu_Interactive_LinksMenu_FallbackChoices = Array<{
  title: string;
  value: string;
}>;

export type Cli_Menu_Interactive_LinksMenu_FallbackActionResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_LinksMenu_FallbackAction = unknown;

export type Cli_Menu_Interactive_LinksMenu_UrlResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_LinksMenu_FallbackParsedUrl = URL;

export type Cli_Menu_Interactive_LinksMenu_Url = unknown;

export type Cli_Menu_Interactive_LinksMenu_UrlAsString = string;

export type Cli_Menu_Interactive_LinksMenu_UrlTrimmed = string;

export type Cli_Menu_Interactive_LinksMenu_FallbackErrorMessage = string;

/**
 * CLI - Menu - Interactive - Settings Flow.
 *
 * @since 2.0.0
 */
export type Cli_Menu_Interactive_SettingsFlow_ConfigPath = string;

export type Cli_Menu_Interactive_SettingsFlow_Returns = Promise<void>;

export type Cli_Menu_Interactive_SettingsFlow_CurrentSettings = Lib_Schema_SettingsConfig | undefined;

export type Cli_Menu_Interactive_SettingsFlow_ErrorMessage = string;

export type Cli_Menu_Interactive_SettingsFlow_WorkerNameResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_SettingsFlow_WorkerName = unknown;

export type Cli_Menu_Interactive_SettingsFlow_BaseDomainResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_SettingsFlow_BaseDomain = unknown;

export type Cli_Menu_Interactive_SettingsFlow_ShowResponseOutputResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_SettingsFlow_ShowResponseOutput = unknown;

export type Cli_Menu_Interactive_SettingsFlow_WorkerNameAsString = string;

export type Cli_Menu_Interactive_SettingsFlow_BaseDomainAsString = string;

export type Cli_Menu_Interactive_SettingsFlow_ShowResponseOutputAsBoolean = boolean;

export type Cli_Menu_Interactive_SettingsFlow_UpdateErrorMessage = string;

/**
 * CLI - Menu - Interactive - Trackers Menu.
 *
 * @since 2.0.0
 */
export type Cli_Menu_Interactive_TrackersMenu_ConfigPath = string;

export type Cli_Menu_Interactive_TrackersMenu_Returns = Promise<void>;

export type Cli_Menu_Interactive_TrackersMenu_InMenu = boolean;

export type Cli_Menu_Interactive_TrackersMenu_ActionResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_TrackersMenu_Action = unknown;

export type Cli_Menu_Interactive_TrackersMenu_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Menu_Interactive_TrackersMenu_NameResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_TrackersMenu_Name = unknown;

export type Cli_Menu_Interactive_TrackersMenu_ConfirmedResponse = Record<string, unknown>;

export type Cli_Menu_Interactive_TrackersMenu_Confirmed = unknown;

export type Cli_Menu_Interactive_TrackersMenu_NameAsString = string;

export type Cli_Menu_Interactive_TrackersMenu_ErrorMessage = string;
