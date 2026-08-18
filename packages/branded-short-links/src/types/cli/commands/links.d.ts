import type {
  Lib_Schema_Config,
  Lib_Schema_LinkItemConfig,
  Lib_Schema_LinksConfig_FallbackUrl,
  Lib_Schema_LinksConfig_Items,
} from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Links.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Links_AddLink_ConfigPath = string;

export type Cli_Commands_Links_AddLink_Item = Lib_Schema_LinkItemConfig;

export type Cli_Commands_Links_AddLink_Returns = void;

export type Cli_Commands_Links_AddLink_Config_Settings = Lib_Schema_Config['settings'];

export type Cli_Commands_Links_AddLink_Config_Links = Lib_Schema_Config['links'];

export type Cli_Commands_Links_AddLink_Config_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Commands_Links_AddLink_Config = {
  settings: Cli_Commands_Links_AddLink_Config_Settings;
  links: Cli_Commands_Links_AddLink_Config_Links;
  trackers: Cli_Commands_Links_AddLink_Config_Trackers;
};

/**
 * CLI - Commands - Links.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Links_EditLink_ConfigPath = string;

export type Cli_Commands_Links_EditLink_Shortcode = string;

export type Cli_Commands_Links_EditLink_Updates = Partial<Lib_Schema_LinkItemConfig>;

export type Cli_Commands_Links_EditLink_Returns = void;

export type Cli_Commands_Links_EditLink_Config_Settings = Lib_Schema_Config['settings'];

export type Cli_Commands_Links_EditLink_Config_Links = Lib_Schema_Config['links'];

export type Cli_Commands_Links_EditLink_Config_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Commands_Links_EditLink_Config = {
  settings: Cli_Commands_Links_EditLink_Config_Settings;
  links: Cli_Commands_Links_EditLink_Config_Links;
  trackers: Cli_Commands_Links_EditLink_Config_Trackers;
};

export type Cli_Commands_Links_EditLink_Index = number;

/**
 * CLI - Commands - Links.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Links_GetFallbackUrl_ConfigPath = string;

export type Cli_Commands_Links_GetFallbackUrl_Returns = Lib_Schema_LinksConfig_FallbackUrl;

export type Cli_Commands_Links_GetFallbackUrl_Config_Settings = Lib_Schema_Config['settings'];

export type Cli_Commands_Links_GetFallbackUrl_Config_Links = Lib_Schema_Config['links'];

export type Cli_Commands_Links_GetFallbackUrl_Config_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Commands_Links_GetFallbackUrl_Config = {
  settings: Cli_Commands_Links_GetFallbackUrl_Config_Settings;
  links: Cli_Commands_Links_GetFallbackUrl_Config_Links;
  trackers: Cli_Commands_Links_GetFallbackUrl_Config_Trackers;
};

/**
 * CLI - Commands - Links.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Links_ListLinks_ConfigPath = string;

export type Cli_Commands_Links_ListLinks_Returns = Lib_Schema_LinksConfig_Items;

export type Cli_Commands_Links_ListLinks_Config_Settings = Lib_Schema_Config['settings'];

export type Cli_Commands_Links_ListLinks_Config_Links = Lib_Schema_Config['links'];

export type Cli_Commands_Links_ListLinks_Config_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Commands_Links_ListLinks_Config = {
  settings: Cli_Commands_Links_ListLinks_Config_Settings;
  links: Cli_Commands_Links_ListLinks_Config_Links;
  trackers: Cli_Commands_Links_ListLinks_Config_Trackers;
};

/**
 * CLI - Commands - Links.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Links_RemoveLink_ConfigPath = string;

export type Cli_Commands_Links_RemoveLink_Shortcode = string;

export type Cli_Commands_Links_RemoveLink_Returns = void;

export type Cli_Commands_Links_RemoveLink_Config_Settings = Lib_Schema_Config['settings'];

export type Cli_Commands_Links_RemoveLink_Config_Links = Lib_Schema_Config['links'];

export type Cli_Commands_Links_RemoveLink_Config_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Commands_Links_RemoveLink_Config = {
  settings: Cli_Commands_Links_RemoveLink_Config_Settings;
  links: Cli_Commands_Links_RemoveLink_Config_Links;
  trackers: Cli_Commands_Links_RemoveLink_Config_Trackers;
};

export type Cli_Commands_Links_RemoveLink_Filtered = Lib_Schema_Config['links']['items'];

/**
 * CLI - Commands - Links.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Links_SetFallbackUrl_ConfigPath = string;

export type Cli_Commands_Links_SetFallbackUrl_Url = Lib_Schema_LinksConfig_FallbackUrl;

export type Cli_Commands_Links_SetFallbackUrl_Returns = void;

export type Cli_Commands_Links_SetFallbackUrl_Config_Settings = Lib_Schema_Config['settings'];

export type Cli_Commands_Links_SetFallbackUrl_Config_Links = Lib_Schema_Config['links'];

export type Cli_Commands_Links_SetFallbackUrl_Config_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Commands_Links_SetFallbackUrl_Config = {
  settings: Cli_Commands_Links_SetFallbackUrl_Config_Settings;
  links: Cli_Commands_Links_SetFallbackUrl_Config_Links;
  trackers: Cli_Commands_Links_SetFallbackUrl_Config_Trackers;
};
