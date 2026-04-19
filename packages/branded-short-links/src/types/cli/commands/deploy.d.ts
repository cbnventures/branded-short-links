import type { SpawnSyncReturns } from 'child_process';

import type {
  LibSchemaConfig,
  LibSchemaLinksConfigFallbackUrl,
  LibSchemaLinksConfigItems,
  LibSchemaSettingsConfig,
  LibSchemaTrackerConfig,
} from '../../lib/schema.d.ts';
import type { CliCommandsValidateValidateConfigReturn } from './validate.d.ts';

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployDeployConfigPath = string;

export type CliCommandsDeployDeployInteractive = boolean;

export type CliCommandsDeployDeployReturn = Promise<void>;

export type CliCommandsDeployDeployToken = string;

export type CliCommandsDeployDeployResult = CliCommandsValidateValidateConfigReturn;

export type CliCommandsDeployDeploySettings = LibSchemaSettingsConfig;

export type CliCommandsDeployDeployAccountId = string;

export type CliCommandsDeployDeployProjectRoot = string;

export type CliCommandsDeployDeployWranglerTomlPath = string;

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployDeployWorkerReturn = void;

export type CliCommandsDeployDeployWorkerProjectRoot = string;

export type CliCommandsDeployDeployWorkerWranglerTomlPath = string;

export type CliCommandsDeployDeployWorkerDeployResult = SpawnSyncReturns<string>;

export type CliCommandsDeployDeployWorkerError = Error;

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployGetZoneInfoToken = string;

export type CliCommandsDeployGetZoneInfoBaseDomain = string;

export type CliCommandsDeployGetZoneInfoResultZoneId = string;

export type CliCommandsDeployGetZoneInfoResultAccountId = string;

export type CliCommandsDeployGetZoneInfoResultZoneName = string;

export type CliCommandsDeployGetZoneInfoResult = {
  zoneId: CliCommandsDeployGetZoneInfoResultZoneId;
  accountId: CliCommandsDeployGetZoneInfoResultAccountId;
  zoneName: CliCommandsDeployGetZoneInfoResultZoneName;
};

export type CliCommandsDeployGetZoneInfoReturn = Promise<CliCommandsDeployGetZoneInfoResult>;

export type CliCommandsDeployGetZoneInfoParts = string[];

export type CliCommandsDeployGetZoneInfoIndex = number;

export type CliCommandsDeployGetZoneInfoCandidate = string;

export type CliCommandsDeployGetZoneInfoResponse = Response;

export type CliCommandsDeployGetZoneInfoDataResultItemId = string;

export type CliCommandsDeployGetZoneInfoDataResultItemName = string;

export type CliCommandsDeployGetZoneInfoDataResultItemAccountId = string;

export type CliCommandsDeployGetZoneInfoDataResultItemAccount = {
  id: CliCommandsDeployGetZoneInfoDataResultItemAccountId;
};

export type CliCommandsDeployGetZoneInfoDataResultItem = {
  id: CliCommandsDeployGetZoneInfoDataResultItemId;
  name: CliCommandsDeployGetZoneInfoDataResultItemName;
  account: CliCommandsDeployGetZoneInfoDataResultItemAccount;
};

export type CliCommandsDeployGetZoneInfoDataSuccess = boolean;

export type CliCommandsDeployGetZoneInfoDataResult = CliCommandsDeployGetZoneInfoDataResultItem[];

export type CliCommandsDeployGetZoneInfoData = {
  success: CliCommandsDeployGetZoneInfoDataSuccess;
  result: CliCommandsDeployGetZoneInfoDataResult;
};

export type CliCommandsDeployGetZoneInfoFirstResult = CliCommandsDeployGetZoneInfoDataResultItem | undefined;

export type CliCommandsDeployGetZoneInfoError = Error;

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployLoadEnvTokenReturn = string | undefined;

export type CliCommandsDeployLoadEnvTokenEnvValue = string | undefined;

export type CliCommandsDeployLoadEnvTokenContent = string;

export type CliCommandsDeployLoadEnvTokenMatch = RegExpMatchArray | null;

export type CliCommandsDeployLoadEnvTokenValue = string;

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployPrintLinksSummaryConfigPath = string;

export type CliCommandsDeployPrintLinksSummaryReturn = void;

export type CliCommandsDeployPrintLinksSummaryLinks = LibSchemaLinksConfigItems;

export type CliCommandsDeployPrintLinksSummaryTrackers = LibSchemaTrackerConfig[];

export type CliCommandsDeployPrintLinksSummarySettings = LibSchemaSettingsConfig;

export type CliCommandsDeployPrintLinksSummaryFallbackUrl = LibSchemaLinksConfigFallbackUrl;

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployPromptForApiTokenReturn = Promise<string>;

export type CliCommandsDeployPromptForApiTokenPromptResult = {
  apiToken?: string;
};

export type CliCommandsDeployPromptForApiTokenApiToken = string | undefined;

export type CliCommandsDeployPromptForApiTokenToken = string;

export type CliCommandsDeployPromptForApiTokenValidateValue = string;

export type CliCommandsDeployPromptForApiTokenVerifyResult = boolean;

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployResolveApiTokenInteractive = boolean;

export type CliCommandsDeployResolveApiTokenReturn = Promise<string>;

export type CliCommandsDeployResolveApiTokenEnvToken = string | undefined;

export type CliCommandsDeployResolveApiTokenEnvTokenValid = boolean;

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployRunLintReturn = void;

export type CliCommandsDeployRunLintLintResult = SpawnSyncReturns<string>;

export type CliCommandsDeployRunLintError = Error;

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type CliCommandsDeploySaveEnvTokenToken = string;

export type CliCommandsDeploySaveEnvTokenReturn = void;

export type CliCommandsDeploySaveEnvTokenContent = string;

export type CliCommandsDeploySaveEnvTokenRegex = RegExp;

export type CliCommandsDeploySaveEnvTokenReplaced = string;

export type CliCommandsDeploySaveEnvTokenAppendedLines = string[];

export type CliCommandsDeploySaveEnvTokenAppended = string;

export type CliCommandsDeploySaveEnvTokenNewContent = string;

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployVerifyApiTokenToken = string;

export type CliCommandsDeployVerifyApiTokenReturn = Promise<boolean>;

export type CliCommandsDeployVerifyApiTokenResponse = Response;

export type CliCommandsDeployVerifyApiTokenDataSuccess = boolean;

export type CliCommandsDeployVerifyApiTokenData = {
  success: CliCommandsDeployVerifyApiTokenDataSuccess;
};

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployCloudflareApiBase = string;

export type CliCommandsDeployEnvFilePath = string;

export type CliCommandsDeployEnvTokenKey = string;

export type CliCommandsDeployLoadEnvTokenRegex = RegExp;

export type CliCommandsDeployVerifyPermissionsToken = string;

export type CliCommandsDeployVerifyPermissionsBaseDomain = string;

export type CliCommandsDeployVerifyPermissionsInteractive = boolean;

export type CliCommandsDeployVerifyPermissionsReturn = Promise<string>;

export type CliCommandsDeployVerifyPermissionsZoneInfo = CliCommandsDeployGetZoneInfoResult;

export type CliCommandsDeployVerifyPermissionsZoneId = string;

export type CliCommandsDeployVerifyPermissionsAccountId = string;

export type CliCommandsDeployVerifyPermissionsHasWorkersScripts = boolean;

export type CliCommandsDeployVerifyPermissionsWorkersScriptsResponse = Response;

export type CliCommandsDeployVerifyPermissionsWorkersScriptsDataSuccess = boolean;

export type CliCommandsDeployVerifyPermissionsWorkersScriptsData = {
  success: CliCommandsDeployVerifyPermissionsWorkersScriptsDataSuccess;
};

export type CliCommandsDeployVerifyPermissionsHasWorkersRoutes = boolean;

export type CliCommandsDeployVerifyPermissionsWorkersRoutesResponse = Response;

export type CliCommandsDeployVerifyPermissionsWorkersRoutesDataSuccess = boolean;

export type CliCommandsDeployVerifyPermissionsWorkersRoutesData = {
  success: CliCommandsDeployVerifyPermissionsWorkersRoutesDataSuccess;
};

export type CliCommandsDeployVerifyPermissionsHasEmailRouting = boolean;

export type CliCommandsDeployVerifyPermissionsEmailRoutingResponse = Response;

export type CliCommandsDeployVerifyPermissionsEmailRoutingDataSuccess = boolean;

export type CliCommandsDeployVerifyPermissionsEmailRoutingData = {
  success: CliCommandsDeployVerifyPermissionsEmailRoutingDataSuccess;
};

export type CliCommandsDeployVerifyPermissionsMissing = string[];

export type CliCommandsDeployVerifyPermissionsMissingMessage = string;

export type CliCommandsDeployVerifyPermissionsError = Error;

export type CliCommandsDeployVerifyPermissionsPromptResult = {
  ready?: boolean;
};

export type CliCommandsDeployVerifyPermissionsReady = boolean | undefined;

export type CliCommandsDeployEnvTokenRegexPattern = string;

export type CliCommandsDeploySaveEnvTokenRegexPattern = string;

export type CliCommandsDeployConfig = LibSchemaConfig;
