import type {
  Lib_Schema_AppAccessConfig,
  Lib_Schema_AppAccessUserConfig,
  Lib_Schema_Config,
} from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Access.
 *
 * @since 2.1.0
 */
export type Cli_Commands_Access_AccessKeyFormat = 'memorable' | 'compact' | 'random';

export type Cli_Commands_Access_AccessKeyFormats = Cli_Commands_Access_AccessKeyFormat[];

export type Cli_Commands_Access_CompactAccessKeyAlphabet = string;

/**
 * CLI - Commands - Access - Add Access User.
 *
 * @since 2.1.0
 */
export type Cli_Commands_Access_AddAccessUser_ConfigPath = string;

export type Cli_Commands_Access_AddAccessUser_Username = string;

export type Cli_Commands_Access_AddAccessUser_Format = 'memorable' | 'compact' | 'random';

export type Cli_Commands_Access_AddAccessUser_Returns = Lib_Schema_AppAccessUserConfig;

export type Cli_Commands_Access_AddAccessUser_Config = Lib_Schema_Config & {};

export type Cli_Commands_Access_AddAccessUser_NormalizedUsername = string;

export type Cli_Commands_Access_AddAccessUser_Users = Lib_Schema_AppAccessUserConfig[] & {};

export type Cli_Commands_Access_AddAccessUser_AccessKey = string;

export type Cli_Commands_Access_AddAccessUser_User = Lib_Schema_AppAccessUserConfig & {};

/**
 * CLI - Commands - Access - Generate Access Key.
 *
 * @since 2.1.0
 */
export type Cli_Commands_Access_GenerateAccessKey_Format = 'memorable' | 'compact' | 'random';

export type Cli_Commands_Access_GenerateAccessKey_Returns = string;

export type Cli_Commands_Access_GenerateAccessKey_MemorableSegments = string[];

export type Cli_Commands_Access_GenerateAccessKey_CompactSegments = string[];

export type Cli_Commands_Access_GenerateAccessKey_RandomValue = string;

/**
 * CLI - Commands - Access - Normalize Access Username.
 *
 * @since 2.1.0
 */
export type Cli_Commands_Access_NormalizeAccessUsername_Username = string;

export type Cli_Commands_Access_NormalizeAccessUsername_Returns = string;

export type Cli_Commands_Access_NormalizeAccessUsername_NormalizedUsername = string;

/**
 * CLI - Commands - Access - Remove Access User.
 *
 * @since 2.1.0
 */
export type Cli_Commands_Access_RemoveAccessUser_ConfigPath = string;

export type Cli_Commands_Access_RemoveAccessUser_Username = string;

export type Cli_Commands_Access_RemoveAccessUser_Returns = void;

export type Cli_Commands_Access_RemoveAccessUser_Config = Lib_Schema_Config & {};

export type Cli_Commands_Access_RemoveAccessUser_NormalizedUsername = string;

export type Cli_Commands_Access_RemoveAccessUser_AppAccess = Lib_Schema_AppAccessConfig | undefined;

export type Cli_Commands_Access_RemoveAccessUser_Filtered = Lib_Schema_AppAccessUserConfig[] & {};

/**
 * CLI - Commands - Access - Resolve Access Key Format.
 *
 * @since 2.1.0
 */
export type Cli_Commands_Access_ResolveAccessKeyFormat_Format = string;

export type Cli_Commands_Access_ResolveAccessKeyFormat_Returns = 'memorable' | 'compact' | 'random';

export type Cli_Commands_Access_ResolveAccessKeyFormat_ResolvedFormat = 'memorable' | 'compact' | 'random';

/**
 * CLI - Commands - Access - Rotate Access Key.
 *
 * @since 2.1.0
 */
export type Cli_Commands_Access_RotateAccessKey_ConfigPath = string;

export type Cli_Commands_Access_RotateAccessKey_Username = string;

export type Cli_Commands_Access_RotateAccessKey_Format = 'memorable' | 'compact' | 'random';

export type Cli_Commands_Access_RotateAccessKey_Returns = Lib_Schema_AppAccessUserConfig;

export type Cli_Commands_Access_RotateAccessKey_Config = Lib_Schema_Config & {};

export type Cli_Commands_Access_RotateAccessKey_NormalizedUsername = string;

export type Cli_Commands_Access_RotateAccessKey_AppAccess = Lib_Schema_AppAccessConfig | undefined;

export type Cli_Commands_Access_RotateAccessKey_UserIndex = number;

export type Cli_Commands_Access_RotateAccessKey_AccessKey = string;

export type Cli_Commands_Access_RotateAccessKey_User = Lib_Schema_AppAccessUserConfig & {};
