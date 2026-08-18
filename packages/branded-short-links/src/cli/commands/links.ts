import { configSchema } from '../../lib/schema.js';
import { loadConfig, saveConfig } from './config-io.js';

import type {
  Cli_Commands_Links_AddLink_Config,
  Cli_Commands_Links_AddLink_ConfigPath,
  Cli_Commands_Links_AddLink_Item,
  Cli_Commands_Links_AddLink_Returns,
  Cli_Commands_Links_EditLink_Config,
  Cli_Commands_Links_EditLink_ConfigPath,
  Cli_Commands_Links_EditLink_Index,
  Cli_Commands_Links_EditLink_Returns,
  Cli_Commands_Links_EditLink_Shortcode,
  Cli_Commands_Links_EditLink_Updates,
  Cli_Commands_Links_GetFallbackUrl_Config,
  Cli_Commands_Links_GetFallbackUrl_ConfigPath,
  Cli_Commands_Links_GetFallbackUrl_Returns,
  Cli_Commands_Links_ListLinks_Config,
  Cli_Commands_Links_ListLinks_ConfigPath,
  Cli_Commands_Links_ListLinks_Returns,
  Cli_Commands_Links_RemoveLink_Config,
  Cli_Commands_Links_RemoveLink_ConfigPath,
  Cli_Commands_Links_RemoveLink_Filtered,
  Cli_Commands_Links_RemoveLink_Returns,
  Cli_Commands_Links_RemoveLink_Shortcode,
  Cli_Commands_Links_SetFallbackUrl_Config,
  Cli_Commands_Links_SetFallbackUrl_ConfigPath,
  Cli_Commands_Links_SetFallbackUrl_Returns,
  Cli_Commands_Links_SetFallbackUrl_Url,
} from '../../types/cli/commands/links.d.ts';

/**
 * CLI - Commands - Links - Add Link.
 *
 * Appends a new link item to the configuration after verifying
 * that no existing link shares the same shortcode.
 *
 * @param {Cli_Commands_Links_AddLink_ConfigPath} configPath - Config path.
 * @param {Cli_Commands_Links_AddLink_Item}       item       - Item.
 *
 * @returns {Cli_Commands_Links_AddLink_Returns}
 *
 * @since 2.0.0
 */
function addLink(configPath: Cli_Commands_Links_AddLink_ConfigPath, item: Cli_Commands_Links_AddLink_Item): Cli_Commands_Links_AddLink_Returns {
  const config: Cli_Commands_Links_AddLink_Config = configSchema.parse(loadConfig(configPath));

  if (config['links']['items'].some((existing) => existing['shortcode'] === item['shortcode']) === true) {
    throw new Error(`Link with shortcode "${item['shortcode']}" already exists.`);
  }

  config['links']['items'].push(item);

  saveConfig(configPath, config);

  return;
}

/**
 * CLI - Commands - Links - Edit Link.
 *
 * Locates a link by its shortcode and applies partial updates
 * to its properties using a merge strategy.
 *
 * @param {Cli_Commands_Links_EditLink_ConfigPath} configPath - Config path.
 * @param {Cli_Commands_Links_EditLink_Shortcode}  shortcode  - Shortcode.
 * @param {Cli_Commands_Links_EditLink_Updates}    updates    - Updates.
 *
 * @returns {Cli_Commands_Links_EditLink_Returns}
 *
 * @since 2.0.0
 */
function editLink(configPath: Cli_Commands_Links_EditLink_ConfigPath, shortcode: Cli_Commands_Links_EditLink_Shortcode, updates: Cli_Commands_Links_EditLink_Updates): Cli_Commands_Links_EditLink_Returns {
  const config: Cli_Commands_Links_EditLink_Config = configSchema.parse(loadConfig(configPath));
  const index: Cli_Commands_Links_EditLink_Index = config['links']['items'].findIndex((item) => item['shortcode'] === shortcode);

  if (index === -1) {
    throw new Error(`Link with shortcode "${shortcode}" not found.`);
  }

  Reflect.set(config['links']['items'], index, {
    ...config['links']['items'][index],
    ...updates,
  });

  saveConfig(configPath, config);

  return;
}

/**
 * CLI - Commands - Links - Get Fallback URL.
 *
 * Reads the current fallback URL from the links configuration
 * so callers can display or validate it.
 *
 * @param {Cli_Commands_Links_GetFallbackUrl_ConfigPath} configPath - Config path.
 *
 * @returns {Cli_Commands_Links_GetFallbackUrl_Returns}
 *
 * @since 2.0.0
 */
function getFallbackUrl(configPath: Cli_Commands_Links_GetFallbackUrl_ConfigPath): Cli_Commands_Links_GetFallbackUrl_Returns {
  const config: Cli_Commands_Links_GetFallbackUrl_Config = configSchema.parse(loadConfig(configPath));

  return config['links']['fallback_url'];
}

/**
 * CLI - Commands - Links - List Links.
 *
 * Retrieves all link items from the configuration file
 * so callers can enumerate or display them.
 *
 * @param {Cli_Commands_Links_ListLinks_ConfigPath} configPath - Config path.
 *
 * @returns {Cli_Commands_Links_ListLinks_Returns}
 *
 * @since 2.0.0
 */
function listLinks(configPath: Cli_Commands_Links_ListLinks_ConfigPath): Cli_Commands_Links_ListLinks_Returns {
  const config: Cli_Commands_Links_ListLinks_Config = configSchema.parse(loadConfig(configPath));

  return config['links']['items'];
}

/**
 * CLI - Commands - Links - Remove Link.
 *
 * Filters out a link by its shortcode and persists the
 * updated list back to the configuration file.
 *
 * @param {Cli_Commands_Links_RemoveLink_ConfigPath} configPath - Config path.
 * @param {Cli_Commands_Links_RemoveLink_Shortcode}  shortcode  - Shortcode.
 *
 * @returns {Cli_Commands_Links_RemoveLink_Returns}
 *
 * @since 2.0.0
 */
function removeLink(configPath: Cli_Commands_Links_RemoveLink_ConfigPath, shortcode: Cli_Commands_Links_RemoveLink_Shortcode): Cli_Commands_Links_RemoveLink_Returns {
  const config: Cli_Commands_Links_RemoveLink_Config = configSchema.parse(loadConfig(configPath));
  const filtered: Cli_Commands_Links_RemoveLink_Filtered = config['links']['items'].filter((item) => item['shortcode'] !== shortcode);

  if (filtered['length'] === config['links']['items']['length']) {
    throw new Error(`Link with shortcode "${shortcode}" not found.`);
  }

  Reflect.set(config['links'], 'items', filtered);

  saveConfig(configPath, config);

  return;
}

/**
 * CLI - Commands - Links - Set Fallback URL.
 *
 * Updates or removes the fallback URL in the links configuration
 * depending on whether a URL value is provided.
 *
 * @param {Cli_Commands_Links_SetFallbackUrl_ConfigPath} configPath - Config path.
 * @param {Cli_Commands_Links_SetFallbackUrl_Url}        url        - Url.
 *
 * @returns {Cli_Commands_Links_SetFallbackUrl_Returns}
 *
 * @since 2.0.0
 */
function setFallbackUrl(configPath: Cli_Commands_Links_SetFallbackUrl_ConfigPath, url: Cli_Commands_Links_SetFallbackUrl_Url): Cli_Commands_Links_SetFallbackUrl_Returns {
  const config: Cli_Commands_Links_SetFallbackUrl_Config = configSchema.parse(loadConfig(configPath));

  if (url === undefined) {
    delete config['links']['fallback_url'];
  } else {
    Reflect.set(config['links'], 'fallback_url', url);
  }

  saveConfig(configPath, config);

  return;
}

export {
  addLink,
  editLink,
  getFallbackUrl,
  listLinks,
  removeLink,
  setFallbackUrl,
};
