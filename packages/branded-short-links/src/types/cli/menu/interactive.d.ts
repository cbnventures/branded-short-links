import type prompts from 'prompts';

import type {
  LibSchemaLinkItemConfig,
  LibSchemaLinkItemConfigHttpResponse,
  LibSchemaLinksConfigFallbackUrl,
  LibSchemaLinksConfigItems,
  LibSchemaNtfyReverseProxyTrackerConfig,
  LibSchemaNtfyTrackerConfig,
  LibSchemaPlainTextTrackerConfig,
  LibSchemaPosthogTrackerConfig,
  LibSchemaSettingsConfig,
  LibSchemaTrackerConfig,
} from '../../lib/schema.d.ts';

/**
 * CLI - Menu - Interactive - Add Tracker Flow.
 *
 * @since 2.0.0
 */
export type CliMenuInteractiveAddTrackerFlowConfigPath = string;

export type CliMenuInteractiveAddTrackerFlowReturn = Promise<void>;

export type CliMenuInteractiveAddTrackerFlowTrackerTypeResponse = Record<string, unknown>;

export type CliMenuInteractiveAddTrackerFlowTrackerType = unknown;

export type CliMenuInteractiveAddTrackerFlowNameResponse = Record<string, unknown>;

export type CliMenuInteractiveAddTrackerFlowName = unknown;

export type CliMenuInteractiveAddTrackerFlowFields = Record<string, unknown>;

export type CliMenuInteractiveAddTrackerFlowFieldsMeasurementId = unknown;

export type CliMenuInteractiveAddTrackerFlowFieldsApiSecret = unknown;

export type CliMenuInteractiveAddTrackerFlowNameAsString = string;

export type CliMenuInteractiveAddTrackerFlowFieldsMeasurementIdAsString = string;

export type CliMenuInteractiveAddTrackerFlowFieldsApiSecretAsString = string;

export type CliMenuInteractiveAddTrackerFlowPixelIdResponse = Record<string, unknown>;

export type CliMenuInteractiveAddTrackerFlowPixelId = unknown;

export type CliMenuInteractiveAddTrackerFlowPixelIdAsString = string;

export type CliMenuInteractiveAddTrackerFlowParsedUrl = URL;

export type CliMenuInteractiveAddTrackerFlowFieldsServer = unknown;

export type CliMenuInteractiveAddTrackerFlowFieldsTopic = unknown;

export type CliMenuInteractiveAddTrackerFlowFieldsToken = unknown;

export type CliMenuInteractiveAddTrackerFlowFieldsServerAsString = string;

export type CliMenuInteractiveAddTrackerFlowFieldsTopicAsString = string;

export type CliMenuInteractiveAddTrackerFlowFieldsTokenAsString = string;

export type CliMenuInteractiveAddTrackerFlowUrlResponse = Record<string, unknown>;

export type CliMenuInteractiveAddTrackerFlowUrl = unknown;

export type CliMenuInteractiveAddTrackerFlowTokenResponse = Record<string, unknown>;

export type CliMenuInteractiveAddTrackerFlowToken = unknown;

export type CliMenuInteractiveAddTrackerFlowUrlAsString = string;

export type CliMenuInteractiveAddTrackerFlowTokenValue = string | undefined;

export type CliMenuInteractiveAddTrackerFlowResolvedToken = string | undefined;

export type CliMenuInteractiveAddTrackerFlowFieldsHost = unknown;

export type CliMenuInteractiveAddTrackerFlowFieldsApiKey = unknown;

export type CliMenuInteractiveAddTrackerFlowFieldsHostAsString = string;

export type CliMenuInteractiveAddTrackerFlowFieldsApiKeyAsString = string;

export type CliMenuInteractiveAddTrackerFlowErrorMessage = string;

/**
 * CLI - Menu - Interactive - Edit Tracker Flow.
 *
 * @since 2.0.0
 */
export type CliMenuInteractiveEditTrackerFlowConfigPath = string;

export type CliMenuInteractiveEditTrackerFlowReturn = Promise<void>;

export type CliMenuInteractiveEditTrackerFlowTrackers = LibSchemaTrackerConfig[];

export type CliMenuInteractiveEditTrackerFlowNameResponse = Record<string, unknown>;

export type CliMenuInteractiveEditTrackerFlowName = unknown;

export type CliMenuInteractiveEditTrackerFlowCurrent = LibSchemaTrackerConfig | undefined;

export type CliMenuInteractiveEditTrackerFlowTypeChangeResponse = Record<string, unknown>;

export type CliMenuInteractiveEditTrackerFlowTypeChangeNewType = string | undefined;

export type CliMenuInteractiveEditTrackerFlowNameAsString = string;

export type CliMenuInteractiveEditTrackerFlowUpdates = Record<string, unknown>;

export type CliMenuInteractiveEditTrackerFlowUpdatesMeasurementId = unknown;

export type CliMenuInteractiveEditTrackerFlowUpdatesApiSecret = unknown;

export type CliMenuInteractiveEditTrackerFlowUpdatesMeasurementIdAsString = string;

export type CliMenuInteractiveEditTrackerFlowUpdatesApiSecretAsString = string;

export type CliMenuInteractiveEditTrackerFlowPixelIdResponse = Record<string, unknown>;

export type CliMenuInteractiveEditTrackerFlowPixelId = unknown;

export type CliMenuInteractiveEditTrackerFlowPixelIdAsString = string;

export type CliMenuInteractiveEditTrackerFlowParsedUrl = URL;

export type CliMenuInteractiveEditTrackerFlowNtfyUpdates = Record<string, unknown>;

export type CliMenuInteractiveEditTrackerFlowNtfyUpdatesServer = unknown;

export type CliMenuInteractiveEditTrackerFlowNtfyUpdatesTopic = unknown;

export type CliMenuInteractiveEditTrackerFlowNtfyUpdatesToken = unknown;

export type CliMenuInteractiveEditTrackerFlowNtfyUpdatesKeys = string[];

export type CliMenuInteractiveEditTrackerFlowNtfyUpdatesAsPartial = Partial<LibSchemaNtfyTrackerConfig>;

export type CliMenuInteractiveEditTrackerFlowPosthogUpdates = Record<string, unknown>;

export type CliMenuInteractiveEditTrackerFlowPosthogUpdatesHost = unknown;

export type CliMenuInteractiveEditTrackerFlowPosthogUpdatesApiKey = unknown;

export type CliMenuInteractiveEditTrackerFlowPosthogUpdatesKeys = string[];

export type CliMenuInteractiveEditTrackerFlowPosthogUpdatesAsPartial = Partial<LibSchemaPosthogTrackerConfig>;

export type CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesUrl = unknown;

export type CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesToken = unknown;

export type CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesUrlAsString = string;

export type CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesTokenValue = string | undefined;

export type CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesResolvedToken = string | undefined;

export type CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdates = Record<string, unknown>;

export type CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesKeys = string[];

export type CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesAsPartial = Partial<LibSchemaNtfyReverseProxyTrackerConfig>;

export type CliMenuInteractiveEditTrackerFlowPlainTextUpdatesUrl = unknown;

export type CliMenuInteractiveEditTrackerFlowPlainTextUpdatesToken = unknown;

export type CliMenuInteractiveEditTrackerFlowPlainTextUpdatesUrlAsString = string;

export type CliMenuInteractiveEditTrackerFlowPlainTextUpdatesTokenValue = string | undefined;

export type CliMenuInteractiveEditTrackerFlowPlainTextUpdatesResolvedToken = string | undefined;

export type CliMenuInteractiveEditTrackerFlowPlainTextUpdates = Record<string, unknown>;

export type CliMenuInteractiveEditTrackerFlowPlainTextUpdatesKeys = string[];

export type CliMenuInteractiveEditTrackerFlowPlainTextUpdatesAsPartial = Partial<LibSchemaPlainTextTrackerConfig>;

export type CliMenuInteractiveEditTrackerFlowErrorMessage = string;

/**
 * CLI - Menu - Interactive - Interactive Menu.
 *
 * @since 2.0.0
 */
export type CliMenuInteractiveInteractiveMenuConfigDirs = string[];

export type CliMenuInteractiveInteractiveMenuReturn = Promise<void>;

export type CliMenuInteractiveInteractiveMenuCurrentFilePath = string;

export type CliMenuInteractiveInteractiveMenuDir = string;

export type CliMenuInteractiveInteractiveMenuVersion = string;

export type CliMenuInteractiveInteractiveMenuPackageJsonPath = string;

export type CliMenuInteractiveInteractiveMenuPackageJsonRaw = string;

export type CliMenuInteractiveInteractiveMenuPackageJsonParsed = Record<string, unknown>;

export type CliMenuInteractiveInteractiveMenuParent = string;

export type CliMenuInteractiveInteractiveMenuHeader = string;

export type CliMenuInteractiveInteractiveMenuInteractiveConfigPath = string | undefined;

export type CliMenuInteractiveInteractiveMenuConfigDirResponse = prompts.Answers<string>;

export type CliMenuInteractiveInteractiveMenuDefaultConfigDir = string;

export type CliMenuInteractiveInteractiveMenuRunning = boolean;

export type CliMenuInteractiveInteractiveMenuActionResponse = Record<string, unknown>;

export type CliMenuInteractiveInteractiveMenuAction = unknown;

export type CliMenuInteractiveInteractiveMenuErrorMessage = string;

/**
 * CLI - Menu - Interactive - Links Menu.
 *
 * @since 2.0.0
 */
export type CliMenuInteractiveLinksMenuConfigPath = string;

export type CliMenuInteractiveLinksMenuReturn = Promise<void>;

export type CliMenuInteractiveLinksMenuInMenu = boolean;

export type CliMenuInteractiveLinksMenuActionResponse = Record<string, unknown>;

export type CliMenuInteractiveLinksMenuAction = unknown;

export type CliMenuInteractiveLinksMenuAnswers = Record<string, unknown>;

export type CliMenuInteractiveLinksMenuParsedUrl = URL;

export type CliMenuInteractiveLinksMenuAnswersShortcode = unknown;

export type CliMenuInteractiveLinksMenuAnswersHttpResponse = unknown;

export type CliMenuInteractiveLinksMenuAnswersRedirectUrl = unknown;

export type CliMenuInteractiveLinksMenuAnswersShortcodeAsString = string;

export type CliMenuInteractiveLinksMenuAnswersHttpResponseAsCode = LibSchemaLinkItemConfigHttpResponse;

export type CliMenuInteractiveLinksMenuAnswersRedirectUrlAsString = string;

export type CliMenuInteractiveLinksMenuErrorMessage = string;

export type CliMenuInteractiveLinksMenuLinks = LibSchemaLinksConfigItems;

export type CliMenuInteractiveLinksMenuShortcodeResponse = Record<string, unknown>;

export type CliMenuInteractiveLinksMenuShortcode = unknown;

export type CliMenuInteractiveLinksMenuCurrent = LibSchemaLinkItemConfig | undefined;

export type CliMenuInteractiveLinksMenuCurrentHttpResponse = unknown;

export type CliMenuInteractiveLinksMenuHttpCodesArray = LibSchemaLinkItemConfigHttpResponse[];

export type CliMenuInteractiveLinksMenuHttpCodeIdx = number;

export type CliMenuInteractiveLinksMenuHttpCodeInitial = number;

export type CliMenuInteractiveLinksMenuCurrentRedirectUrl = unknown;

export type CliMenuInteractiveLinksMenuUpdates = Record<string, unknown>;

export type CliMenuInteractiveLinksMenuUpdatesHttpResponse = unknown;

export type CliMenuInteractiveLinksMenuUpdatesRedirectUrl = unknown;

export type CliMenuInteractiveLinksMenuEditUpdates = Record<string, unknown>;

export type CliMenuInteractiveLinksMenuEditLinkModuleEditLink = (configPath: string, shortcode: string, updates: Partial<LibSchemaLinkItemConfig>) => void;

export type CliMenuInteractiveLinksMenuEditLinkModule = {
  editLink: CliMenuInteractiveLinksMenuEditLinkModuleEditLink;
};

export type CliMenuInteractiveLinksMenuShortcodeAsString = string;

export type CliMenuInteractiveLinksMenuEditUpdatesAsPartial = Partial<LibSchemaLinkItemConfig>;

export type CliMenuInteractiveLinksMenuConfirmedResponse = Record<string, unknown>;

export type CliMenuInteractiveLinksMenuConfirmed = unknown;

export type CliMenuInteractiveLinksMenuRemoveShortcodeAsString = string;

export type CliMenuInteractiveLinksMenuCurrentFallback = LibSchemaLinksConfigFallbackUrl;

export type CliMenuInteractiveLinksMenuFallbackMessage = string;

export type CliMenuInteractiveLinksMenuFallbackChoices = Array<{
  title: string;
  value: string;
}>;

export type CliMenuInteractiveLinksMenuFallbackActionResponse = Record<string, unknown>;

export type CliMenuInteractiveLinksMenuFallbackAction = unknown;

export type CliMenuInteractiveLinksMenuUrlResponse = Record<string, unknown>;

export type CliMenuInteractiveLinksMenuUrl = unknown;

export type CliMenuInteractiveLinksMenuUrlTrimmed = string;

/**
 * CLI - Menu - Interactive - Settings Flow.
 *
 * @since 2.0.0
 */
export type CliMenuInteractiveSettingsFlowConfigPath = string;

export type CliMenuInteractiveSettingsFlowReturn = Promise<void>;

export type CliMenuInteractiveSettingsFlowCurrentSettings = LibSchemaSettingsConfig | undefined;

export type CliMenuInteractiveSettingsFlowErrorMessage = string;

export type CliMenuInteractiveSettingsFlowWorkerNameResponse = Record<string, unknown>;

export type CliMenuInteractiveSettingsFlowWorkerName = unknown;

export type CliMenuInteractiveSettingsFlowBaseDomainResponse = Record<string, unknown>;

export type CliMenuInteractiveSettingsFlowBaseDomain = unknown;

export type CliMenuInteractiveSettingsFlowShowResponseOutputResponse = Record<string, unknown>;

export type CliMenuInteractiveSettingsFlowShowResponseOutput = unknown;

export type CliMenuInteractiveSettingsFlowWorkerNameAsString = string;

export type CliMenuInteractiveSettingsFlowBaseDomainAsString = string;

export type CliMenuInteractiveSettingsFlowShowResponseOutputAsBoolean = boolean;

/**
 * CLI - Menu - Interactive - Trackers Menu.
 *
 * @since 2.0.0
 */
export type CliMenuInteractiveTrackersMenuConfigPath = string;

export type CliMenuInteractiveTrackersMenuReturn = Promise<void>;

export type CliMenuInteractiveTrackersMenuInMenu = boolean;

export type CliMenuInteractiveTrackersMenuActionResponse = Record<string, unknown>;

export type CliMenuInteractiveTrackersMenuAction = unknown;

export type CliMenuInteractiveTrackersMenuTrackers = LibSchemaTrackerConfig[];

export type CliMenuInteractiveTrackersMenuNameResponse = Record<string, unknown>;

export type CliMenuInteractiveTrackersMenuName = unknown;

export type CliMenuInteractiveTrackersMenuConfirmedResponse = Record<string, unknown>;

export type CliMenuInteractiveTrackersMenuConfirmed = unknown;

export type CliMenuInteractiveTrackersMenuNameAsString = string;

export type CliMenuInteractiveTrackersMenuErrorMessage = string;
