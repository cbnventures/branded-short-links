import type { SpawnSyncReturns } from 'node:child_process';

import type { Lib_Schema_Config } from '../../lib/schema.d.ts';
import type { Cli_Commands_Validate_ValidateConfig_Returns } from './validate.d.ts';

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_CloudflareApiBase = string;

export type Cli_Commands_Deploy_ConfigDir = string;

export type Cli_Commands_Deploy_EnvFilePath = string;

export type Cli_Commands_Deploy_EnvTokenKey = string;

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_Deploy_ConfigPath = string;

export type Cli_Commands_Deploy_Deploy_Interactive = boolean;

export type Cli_Commands_Deploy_Deploy_Returns = Promise<void>;

export type Cli_Commands_Deploy_Deploy_Token = string;

export type Cli_Commands_Deploy_Deploy_Result_Valid = Cli_Commands_Validate_ValidateConfig_Returns['valid'];

export type Cli_Commands_Deploy_Deploy_Result_Errors = Cli_Commands_Validate_ValidateConfig_Returns['errors'];

export type Cli_Commands_Deploy_Deploy_Result = {
  valid: Cli_Commands_Deploy_Deploy_Result_Valid;
  errors: Cli_Commands_Deploy_Deploy_Result_Errors;
};

export type Cli_Commands_Deploy_Deploy_Settings = Lib_Schema_Config['settings'];

export type Cli_Commands_Deploy_Deploy_AccountId = string;

export type Cli_Commands_Deploy_Deploy_ProjectRoot = string;

export type Cli_Commands_Deploy_Deploy_WranglerTomlPath = string;

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_DeployWorker_Returns = void;

export type Cli_Commands_Deploy_DeployWorker_ProjectRoot = string;

export type Cli_Commands_Deploy_DeployWorker_WranglerTomlPath = string;

export type Cli_Commands_Deploy_DeployWorker_DeployResult = SpawnSyncReturns<string>;

export type Cli_Commands_Deploy_DeployWorker_DeployError = Error;

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_GetZoneInfo_Token = string;

export type Cli_Commands_Deploy_GetZoneInfo_BaseDomain = string;

export type Cli_Commands_Deploy_GetZoneInfo_Result_ZoneId = string;

export type Cli_Commands_Deploy_GetZoneInfo_Result_AccountId = string;

export type Cli_Commands_Deploy_GetZoneInfo_Result_ZoneName = string;

export type Cli_Commands_Deploy_GetZoneInfo_Result = {
  zoneId: Cli_Commands_Deploy_GetZoneInfo_Result_ZoneId;
  accountId: Cli_Commands_Deploy_GetZoneInfo_Result_AccountId;
  zoneName: Cli_Commands_Deploy_GetZoneInfo_Result_ZoneName;
};

export type Cli_Commands_Deploy_GetZoneInfo_Returns = Promise<Cli_Commands_Deploy_GetZoneInfo_Result>;

export type Cli_Commands_Deploy_GetZoneInfo_Parts = string[];

export type Cli_Commands_Deploy_GetZoneInfo_I = number;

export type Cli_Commands_Deploy_GetZoneInfo_Candidate = string;

export type Cli_Commands_Deploy_GetZoneInfo_Response = Response;

export type Cli_Commands_Deploy_GetZoneInfo_DataResultItem_Id = string;

export type Cli_Commands_Deploy_GetZoneInfo_DataResultItem_Name = string;

export type Cli_Commands_Deploy_GetZoneInfo_DataResultItem_Account_Id = string;

export type Cli_Commands_Deploy_GetZoneInfo_DataResultItem_Account = {
  id: Cli_Commands_Deploy_GetZoneInfo_DataResultItem_Account_Id;
};

export type Cli_Commands_Deploy_GetZoneInfo_DataResultItem = {
  id: Cli_Commands_Deploy_GetZoneInfo_DataResultItem_Id;
  name: Cli_Commands_Deploy_GetZoneInfo_DataResultItem_Name;
  account: Cli_Commands_Deploy_GetZoneInfo_DataResultItem_Account;
};

export type Cli_Commands_Deploy_GetZoneInfo_Data_Success = boolean;

export type Cli_Commands_Deploy_GetZoneInfo_Data_Result = Cli_Commands_Deploy_GetZoneInfo_DataResultItem[];

export type Cli_Commands_Deploy_GetZoneInfo_Data = {
  success: Cli_Commands_Deploy_GetZoneInfo_Data_Success;
  result: Cli_Commands_Deploy_GetZoneInfo_Data_Result;
};

export type Cli_Commands_Deploy_GetZoneInfo_FirstResult = Cli_Commands_Deploy_GetZoneInfo_DataResultItem | undefined;

export type Cli_Commands_Deploy_GetZoneInfo_ZoneError = Error;

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_LoadEnvToken_Returns = string | undefined;

export type Cli_Commands_Deploy_LoadEnvToken_EnvValue = string | undefined;

export type Cli_Commands_Deploy_LoadEnvToken_Content = string;

export type Cli_Commands_Deploy_LoadEnvToken_EnvTokenRegex = RegExp;

export type Cli_Commands_Deploy_LoadEnvToken_Match = RegExpMatchArray | null;

export type Cli_Commands_Deploy_LoadEnvToken_Value = string;

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_PrintLinksSummary_ConfigPath = string;

export type Cli_Commands_Deploy_PrintLinksSummary_Returns = void;

export type Cli_Commands_Deploy_PrintLinksSummary_Links = Lib_Schema_Config['links']['items'];

export type Cli_Commands_Deploy_PrintLinksSummary_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Commands_Deploy_PrintLinksSummary_Settings = Lib_Schema_Config['settings'];

export type Cli_Commands_Deploy_PrintLinksSummary_FallbackUrl = Lib_Schema_Config['links']['fallback_url'];

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_PromptForApiToken_Returns = Promise<string>;

export type Cli_Commands_Deploy_PromptForApiToken_PromptResult = {
  apiToken?: string;
};

export type Cli_Commands_Deploy_PromptForApiToken_ApiToken = string | undefined;

export type Cli_Commands_Deploy_PromptForApiToken_Token = string;

export type Cli_Commands_Deploy_PromptForApiToken_VerifyResult = boolean;

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_ResolveApiToken_Interactive = boolean;

export type Cli_Commands_Deploy_ResolveApiToken_Returns = Promise<string>;

export type Cli_Commands_Deploy_ResolveApiToken_EnvToken = string | undefined;

export type Cli_Commands_Deploy_ResolveApiToken_EnvTokenValid = boolean;

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_SaveEnvToken_Token = string;

export type Cli_Commands_Deploy_SaveEnvToken_Returns = void;

export type Cli_Commands_Deploy_SaveEnvToken_Content = string;

export type Cli_Commands_Deploy_SaveEnvToken_Regex = RegExp;

export type Cli_Commands_Deploy_SaveEnvToken_Replaced = string;

export type Cli_Commands_Deploy_SaveEnvToken_AppendedLines = string[];

export type Cli_Commands_Deploy_SaveEnvToken_Appended = string;

export type Cli_Commands_Deploy_SaveEnvToken_NewContent = string;

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_VerifyApiToken_Token = string;

export type Cli_Commands_Deploy_VerifyApiToken_Returns = Promise<boolean>;

export type Cli_Commands_Deploy_VerifyApiToken_Response = Response;

export type Cli_Commands_Deploy_VerifyApiToken_Data_Success = boolean;

export type Cli_Commands_Deploy_VerifyApiToken_Data = {
  success: Cli_Commands_Deploy_VerifyApiToken_Data_Success;
};

/**
 * CLI - Commands - Deploy.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_VerifyPermissions_Token = string;

export type Cli_Commands_Deploy_VerifyPermissions_BaseDomain = string;

export type Cli_Commands_Deploy_VerifyPermissions_Interactive = boolean;

export type Cli_Commands_Deploy_VerifyPermissions_Returns = Promise<string>;

export type Cli_Commands_Deploy_VerifyPermissions_ZoneInfo_ZoneId = string;

export type Cli_Commands_Deploy_VerifyPermissions_ZoneInfo_AccountId = string;

export type Cli_Commands_Deploy_VerifyPermissions_ZoneInfo_ZoneName = string;

export type Cli_Commands_Deploy_VerifyPermissions_ZoneInfo = {
  zoneId: Cli_Commands_Deploy_VerifyPermissions_ZoneInfo_ZoneId;
  accountId: Cli_Commands_Deploy_VerifyPermissions_ZoneInfo_AccountId;
  zoneName: Cli_Commands_Deploy_VerifyPermissions_ZoneInfo_ZoneName;
};

export type Cli_Commands_Deploy_VerifyPermissions_ZoneId = string;

export type Cli_Commands_Deploy_VerifyPermissions_AccountId = string;

export type Cli_Commands_Deploy_VerifyPermissions_HasWorkersScripts = boolean;

export type Cli_Commands_Deploy_VerifyPermissions_WorkersScriptsResponse = Response;

export type Cli_Commands_Deploy_VerifyPermissions_WorkersScriptsData_Success = boolean;

export type Cli_Commands_Deploy_VerifyPermissions_WorkersScriptsData = {
  success: Cli_Commands_Deploy_VerifyPermissions_WorkersScriptsData_Success;
};

export type Cli_Commands_Deploy_VerifyPermissions_HasWorkersRoutes = boolean;

export type Cli_Commands_Deploy_VerifyPermissions_WorkersRoutesResponse = Response;

export type Cli_Commands_Deploy_VerifyPermissions_WorkersRoutesData_Success = boolean;

export type Cli_Commands_Deploy_VerifyPermissions_WorkersRoutesData = {
  success: Cli_Commands_Deploy_VerifyPermissions_WorkersRoutesData_Success;
};

export type Cli_Commands_Deploy_VerifyPermissions_HasEmailRouting = boolean;

export type Cli_Commands_Deploy_VerifyPermissions_EmailRoutingResponse = Response;

export type Cli_Commands_Deploy_VerifyPermissions_EmailRoutingData_Success = boolean;

export type Cli_Commands_Deploy_VerifyPermissions_EmailRoutingData = {
  success: Cli_Commands_Deploy_VerifyPermissions_EmailRoutingData_Success;
};

export type Cli_Commands_Deploy_VerifyPermissions_Missing = string[];

export type Cli_Commands_Deploy_VerifyPermissions_MissingMessage = string;

export type Cli_Commands_Deploy_VerifyPermissions_PermissionsError = Error;

export type Cli_Commands_Deploy_VerifyPermissions_PromptResult = {
  ready?: boolean;
};

export type Cli_Commands_Deploy_VerifyPermissions_Ready = boolean | undefined;
