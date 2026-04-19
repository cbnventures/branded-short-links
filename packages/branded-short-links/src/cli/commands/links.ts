import { configSchema } from '../../lib/schema.js';
import { loadConfig, saveConfig } from './config-io.js';

import type {
  CliCommandsLinksAddLinkConfig,
  CliCommandsLinksAddLinkConfigPath,
  CliCommandsLinksAddLinkItem,
  CliCommandsLinksAddLinkReturn,
  CliCommandsLinksEditLinkConfig,
  CliCommandsLinksEditLinkConfigPath,
  CliCommandsLinksEditLinkIndex,
  CliCommandsLinksEditLinkReturn,
  CliCommandsLinksEditLinkShortcode,
  CliCommandsLinksEditLinkUpdates,
  CliCommandsLinksGetFallbackUrlConfig,
  CliCommandsLinksGetFallbackUrlConfigPath,
  CliCommandsLinksGetFallbackUrlReturn,
  CliCommandsLinksListLinksConfig,
  CliCommandsLinksListLinksConfigPath,
  CliCommandsLinksListLinksReturn,
  CliCommandsLinksRemoveLinkConfig,
  CliCommandsLinksRemoveLinkConfigPath,
  CliCommandsLinksRemoveLinkFiltered,
  CliCommandsLinksRemoveLinkReturn,
  CliCommandsLinksRemoveLinkShortcode,
  CliCommandsLinksSetFallbackUrlConfig,
  CliCommandsLinksSetFallbackUrlConfigPath,
  CliCommandsLinksSetFallbackUrlReturn,
  CliCommandsLinksSetFallbackUrlUrl,
} from '../../types/cli/commands/links.d.ts';

/**
 * CLI - Commands - Links - Add Link.
 *
 * Appends a new link item to the configuration after verifying
 * that no existing link shares the same shortcode.
 *
 * @param {CliCommandsLinksAddLinkConfigPath} configPath - Config path.
 * @param {CliCommandsLinksAddLinkItem}       item       - Item.
 *
 * @returns {CliCommandsLinksAddLinkReturn}
 *
 * @since 2.0.0
 */
function addLink(configPath: CliCommandsLinksAddLinkConfigPath, item: CliCommandsLinksAddLinkItem): CliCommandsLinksAddLinkReturn {
  const config: CliCommandsLinksAddLinkConfig = configSchema.parse(loadConfig(configPath));

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
 * @param {CliCommandsLinksEditLinkConfigPath} configPath - Config path.
 * @param {CliCommandsLinksEditLinkShortcode}  shortcode  - Shortcode.
 * @param {CliCommandsLinksEditLinkUpdates}    updates    - Updates.
 *
 * @returns {CliCommandsLinksEditLinkReturn}
 *
 * @since 2.0.0
 */
function editLink(configPath: CliCommandsLinksEditLinkConfigPath, shortcode: CliCommandsLinksEditLinkShortcode, updates: CliCommandsLinksEditLinkUpdates): CliCommandsLinksEditLinkReturn {
  const config: CliCommandsLinksEditLinkConfig = configSchema.parse(loadConfig(configPath));
  const index: CliCommandsLinksEditLinkIndex = config['links']['items'].findIndex((item) => item['shortcode'] === shortcode);

  if (index === -1) {
    throw new Error(`Link with shortcode "${shortcode}" not found.`);
  }

  Reflect.set(config['links']['items'], index, {
    ...config['links']['items'][index], ...updates,
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
 * @param {CliCommandsLinksGetFallbackUrlConfigPath} configPath - Config path.
 *
 * @returns {CliCommandsLinksGetFallbackUrlReturn}
 *
 * @since 2.0.0
 */
function getFallbackUrl(configPath: CliCommandsLinksGetFallbackUrlConfigPath): CliCommandsLinksGetFallbackUrlReturn {
  const config: CliCommandsLinksGetFallbackUrlConfig = configSchema.parse(loadConfig(configPath));

  return config['links']['fallback_url'];
}

/**
 * CLI - Commands - Links - List Links.
 *
 * Retrieves all link items from the configuration file
 * so callers can enumerate or display them.
 *
 * @param {CliCommandsLinksListLinksConfigPath} configPath - Config path.
 *
 * @returns {CliCommandsLinksListLinksReturn}
 *
 * @since 2.0.0
 */
function listLinks(configPath: CliCommandsLinksListLinksConfigPath): CliCommandsLinksListLinksReturn {
  const config: CliCommandsLinksListLinksConfig = configSchema.parse(loadConfig(configPath));

  return config['links']['items'];
}

/**
 * CLI - Commands - Links - Remove Link.
 *
 * Filters out a link by its shortcode and persists the
 * updated list back to the configuration file.
 *
 * @param {CliCommandsLinksRemoveLinkConfigPath} configPath - Config path.
 * @param {CliCommandsLinksRemoveLinkShortcode}  shortcode  - Shortcode.
 *
 * @returns {CliCommandsLinksRemoveLinkReturn}
 *
 * @since 2.0.0
 */
function removeLink(configPath: CliCommandsLinksRemoveLinkConfigPath, shortcode: CliCommandsLinksRemoveLinkShortcode): CliCommandsLinksRemoveLinkReturn {
  const config: CliCommandsLinksRemoveLinkConfig = configSchema.parse(loadConfig(configPath));
  const filtered: CliCommandsLinksRemoveLinkFiltered = config['links']['items'].filter((item) => item['shortcode'] !== shortcode);

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
 * @param {CliCommandsLinksSetFallbackUrlConfigPath} configPath - Config path.
 * @param {CliCommandsLinksSetFallbackUrlUrl}        url        - Url.
 *
 * @returns {CliCommandsLinksSetFallbackUrlReturn}
 *
 * @since 2.0.0
 */
function setFallbackUrl(configPath: CliCommandsLinksSetFallbackUrlConfigPath, url: CliCommandsLinksSetFallbackUrlUrl): CliCommandsLinksSetFallbackUrlReturn {
  const config: CliCommandsLinksSetFallbackUrlConfig = configSchema.parse(loadConfig(configPath));

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
