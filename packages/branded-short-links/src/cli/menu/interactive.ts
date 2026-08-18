import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Bootstrap, CLIHeader, Logger } from '@cbnventures/nova/toolkit';
import chalk from 'chalk';
import prompts from 'prompts';

import { deploy } from '../commands/deploy.js';
import {
  addLink,
  editLink,
  getFallbackUrl,
  listLinks,
  removeLink,
  setFallbackUrl,
} from '../commands/links.js';
import { getSettings, updateSettings } from '../commands/settings.js';
import {
  addTracker,
  editTracker,
  listTrackers,
  removeTracker,
} from '../commands/trackers.js';

import type {
  Cli_Menu_Interactive_AddTrackerFlow_ConfigPath,
  Cli_Menu_Interactive_AddTrackerFlow_ErrorMessage,
  Cli_Menu_Interactive_AddTrackerFlow_Fields,
  Cli_Menu_Interactive_AddTrackerFlow_FieldsApiKey,
  Cli_Menu_Interactive_AddTrackerFlow_FieldsApiKeyAsString,
  Cli_Menu_Interactive_AddTrackerFlow_FieldsApiSecret,
  Cli_Menu_Interactive_AddTrackerFlow_FieldsApiSecretAsString,
  Cli_Menu_Interactive_AddTrackerFlow_FieldsHost,
  Cli_Menu_Interactive_AddTrackerFlow_FieldsHostAsString,
  Cli_Menu_Interactive_AddTrackerFlow_FieldsMeasurementId,
  Cli_Menu_Interactive_AddTrackerFlow_FieldsMeasurementIdAsString,
  Cli_Menu_Interactive_AddTrackerFlow_FieldsServer,
  Cli_Menu_Interactive_AddTrackerFlow_FieldsServerAsString,
  Cli_Menu_Interactive_AddTrackerFlow_FieldsToken,
  Cli_Menu_Interactive_AddTrackerFlow_FieldsTokenAsString,
  Cli_Menu_Interactive_AddTrackerFlow_FieldsTopic,
  Cli_Menu_Interactive_AddTrackerFlow_FieldsTopicAsString,
  Cli_Menu_Interactive_AddTrackerFlow_Name,
  Cli_Menu_Interactive_AddTrackerFlow_NameAsString,
  Cli_Menu_Interactive_AddTrackerFlow_NameResponse,
  Cli_Menu_Interactive_AddTrackerFlow_NtfyFields,
  Cli_Menu_Interactive_AddTrackerFlow_NtfyParsedUrl,
  Cli_Menu_Interactive_AddTrackerFlow_PixelId,
  Cli_Menu_Interactive_AddTrackerFlow_PixelIdAsString,
  Cli_Menu_Interactive_AddTrackerFlow_PixelIdResponse,
  Cli_Menu_Interactive_AddTrackerFlow_PlainParsedUrl,
  Cli_Menu_Interactive_AddTrackerFlow_PlainResolvedToken,
  Cli_Menu_Interactive_AddTrackerFlow_PlainToken,
  Cli_Menu_Interactive_AddTrackerFlow_PlainTokenAsString,
  Cli_Menu_Interactive_AddTrackerFlow_PlainTokenResponse,
  Cli_Menu_Interactive_AddTrackerFlow_PlainTokenValue,
  Cli_Menu_Interactive_AddTrackerFlow_PlainUrl,
  Cli_Menu_Interactive_AddTrackerFlow_PlainUrlResponse,
  Cli_Menu_Interactive_AddTrackerFlow_PosthogFields,
  Cli_Menu_Interactive_AddTrackerFlow_PosthogParsedUrl,
  Cli_Menu_Interactive_AddTrackerFlow_ProxyParsedUrl,
  Cli_Menu_Interactive_AddTrackerFlow_ProxyResolvedToken,
  Cli_Menu_Interactive_AddTrackerFlow_ProxyToken,
  Cli_Menu_Interactive_AddTrackerFlow_ProxyTokenAsString,
  Cli_Menu_Interactive_AddTrackerFlow_ProxyTokenResponse,
  Cli_Menu_Interactive_AddTrackerFlow_ProxyTokenValue,
  Cli_Menu_Interactive_AddTrackerFlow_ProxyUrl,
  Cli_Menu_Interactive_AddTrackerFlow_ProxyUrlResponse,
  Cli_Menu_Interactive_AddTrackerFlow_Returns,
  Cli_Menu_Interactive_AddTrackerFlow_TrackerType,
  Cli_Menu_Interactive_AddTrackerFlow_TrackerTypeResponse,
  Cli_Menu_Interactive_AddTrackerFlow_UrlAsString,
  Cli_Menu_Interactive_EditTrackerFlow_ConfigPath,
  Cli_Menu_Interactive_EditTrackerFlow_Current,
  Cli_Menu_Interactive_EditTrackerFlow_ErrorMessage,
  Cli_Menu_Interactive_EditTrackerFlow_Name,
  Cli_Menu_Interactive_EditTrackerFlow_NameAsString,
  Cli_Menu_Interactive_EditTrackerFlow_NameResponse,
  Cli_Menu_Interactive_EditTrackerFlow_NewType,
  Cli_Menu_Interactive_EditTrackerFlow_NtfyEditFields,
  Cli_Menu_Interactive_EditTrackerFlow_NtfyParsedUrl,
  Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyTokenResponse,
  Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdates,
  Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesAsPartial,
  Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesKeys,
  Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesResolvedToken,
  Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesToken,
  Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesTokenAsString,
  Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesTokenValue,
  Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesUrl,
  Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUrlResponse,
  Cli_Menu_Interactive_EditTrackerFlow_NtfyUpdates,
  Cli_Menu_Interactive_EditTrackerFlow_NtfyUpdatesAsPartial,
  Cli_Menu_Interactive_EditTrackerFlow_NtfyUpdatesKeys,
  Cli_Menu_Interactive_EditTrackerFlow_NtfyUpdatesServer,
  Cli_Menu_Interactive_EditTrackerFlow_NtfyUpdatesToken,
  Cli_Menu_Interactive_EditTrackerFlow_NtfyUpdatesTopic,
  Cli_Menu_Interactive_EditTrackerFlow_PixelId,
  Cli_Menu_Interactive_EditTrackerFlow_PixelIdAsString,
  Cli_Menu_Interactive_EditTrackerFlow_PixelIdResponse,
  Cli_Menu_Interactive_EditTrackerFlow_PlainParsedUrl,
  Cli_Menu_Interactive_EditTrackerFlow_PlainTextTokenResponse,
  Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdates,
  Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesAsPartial,
  Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesKeys,
  Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesResolvedToken,
  Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesToken,
  Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesTokenAsString,
  Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesTokenValue,
  Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesUrl,
  Cli_Menu_Interactive_EditTrackerFlow_PlainTextUrlResponse,
  Cli_Menu_Interactive_EditTrackerFlow_PosthogEditFields,
  Cli_Menu_Interactive_EditTrackerFlow_PosthogParsedUrl,
  Cli_Menu_Interactive_EditTrackerFlow_PosthogUpdates,
  Cli_Menu_Interactive_EditTrackerFlow_PosthogUpdatesApiKey,
  Cli_Menu_Interactive_EditTrackerFlow_PosthogUpdatesAsPartial,
  Cli_Menu_Interactive_EditTrackerFlow_PosthogUpdatesHost,
  Cli_Menu_Interactive_EditTrackerFlow_PosthogUpdatesKeys,
  Cli_Menu_Interactive_EditTrackerFlow_ProxyParsedUrl,
  Cli_Menu_Interactive_EditTrackerFlow_Returns,
  Cli_Menu_Interactive_EditTrackerFlow_TrackerCountAfter,
  Cli_Menu_Interactive_EditTrackerFlow_TrackerCountBefore,
  Cli_Menu_Interactive_EditTrackerFlow_Trackers,
  Cli_Menu_Interactive_EditTrackerFlow_TypeChangeResponse,
  Cli_Menu_Interactive_EditTrackerFlow_Updates,
  Cli_Menu_Interactive_EditTrackerFlow_UpdatesApiSecret,
  Cli_Menu_Interactive_EditTrackerFlow_UpdatesApiSecretAsString,
  Cli_Menu_Interactive_EditTrackerFlow_UpdatesMeasurementId,
  Cli_Menu_Interactive_EditTrackerFlow_UpdatesMeasurementIdAsString,
  Cli_Menu_Interactive_InteractiveMenu_Action,
  Cli_Menu_Interactive_InteractiveMenu_ActionResponse,
  Cli_Menu_Interactive_InteractiveMenu_ConfigDirResponse,
  Cli_Menu_Interactive_InteractiveMenu_ConfigDirs,
  Cli_Menu_Interactive_InteractiveMenu_ConfigPath,
  Cli_Menu_Interactive_InteractiveMenu_CurrentFilePath,
  Cli_Menu_Interactive_InteractiveMenu_DefaultConfigDir,
  Cli_Menu_Interactive_InteractiveMenu_Dir,
  Cli_Menu_Interactive_InteractiveMenu_ErrorMessage,
  Cli_Menu_Interactive_InteractiveMenu_Header,
  Cli_Menu_Interactive_InteractiveMenu_PackageJsonParsed,
  Cli_Menu_Interactive_InteractiveMenu_PackageJsonPath,
  Cli_Menu_Interactive_InteractiveMenu_PackageJsonRaw,
  Cli_Menu_Interactive_InteractiveMenu_Parent,
  Cli_Menu_Interactive_InteractiveMenu_Returns,
  Cli_Menu_Interactive_InteractiveMenu_Running,
  Cli_Menu_Interactive_InteractiveMenu_Version,
  Cli_Menu_Interactive_LinksMenu_Action,
  Cli_Menu_Interactive_LinksMenu_ActionResponse,
  Cli_Menu_Interactive_LinksMenu_AddErrorMessage,
  Cli_Menu_Interactive_LinksMenu_Answers,
  Cli_Menu_Interactive_LinksMenu_AnswersHttpResponse,
  Cli_Menu_Interactive_LinksMenu_AnswersHttpResponseAsCode,
  Cli_Menu_Interactive_LinksMenu_AnswersRedirectUrl,
  Cli_Menu_Interactive_LinksMenu_AnswersRedirectUrlAsString,
  Cli_Menu_Interactive_LinksMenu_AnswersShortcode,
  Cli_Menu_Interactive_LinksMenu_AnswersShortcodeAsString,
  Cli_Menu_Interactive_LinksMenu_ConfigPath,
  Cli_Menu_Interactive_LinksMenu_Confirmed,
  Cli_Menu_Interactive_LinksMenu_ConfirmedResponse,
  Cli_Menu_Interactive_LinksMenu_Current,
  Cli_Menu_Interactive_LinksMenu_CurrentFallback,
  Cli_Menu_Interactive_LinksMenu_CurrentHttpResponse,
  Cli_Menu_Interactive_LinksMenu_CurrentRedirectUrl,
  Cli_Menu_Interactive_LinksMenu_EditErrorMessage,
  Cli_Menu_Interactive_LinksMenu_EditParsedUrl,
  Cli_Menu_Interactive_LinksMenu_EditUpdates,
  Cli_Menu_Interactive_LinksMenu_EditUpdatesAsPartial,
  Cli_Menu_Interactive_LinksMenu_FallbackAction,
  Cli_Menu_Interactive_LinksMenu_FallbackActionResponse,
  Cli_Menu_Interactive_LinksMenu_FallbackChoices,
  Cli_Menu_Interactive_LinksMenu_FallbackErrorMessage,
  Cli_Menu_Interactive_LinksMenu_FallbackMessage,
  Cli_Menu_Interactive_LinksMenu_FallbackParsedUrl,
  Cli_Menu_Interactive_LinksMenu_HttpCodeIdx,
  Cli_Menu_Interactive_LinksMenu_HttpCodeInitial,
  Cli_Menu_Interactive_LinksMenu_HttpCodes,
  Cli_Menu_Interactive_LinksMenu_InMenu,
  Cli_Menu_Interactive_LinksMenu_Links,
  Cli_Menu_Interactive_LinksMenu_ParsedUrl,
  Cli_Menu_Interactive_LinksMenu_RemoveErrorMessage,
  Cli_Menu_Interactive_LinksMenu_RemoveLinks,
  Cli_Menu_Interactive_LinksMenu_RemoveShortcode,
  Cli_Menu_Interactive_LinksMenu_RemoveShortcodeAsString,
  Cli_Menu_Interactive_LinksMenu_RemoveShortcodeResponse,
  Cli_Menu_Interactive_LinksMenu_Returns,
  Cli_Menu_Interactive_LinksMenu_Shortcode,
  Cli_Menu_Interactive_LinksMenu_ShortcodeAsString,
  Cli_Menu_Interactive_LinksMenu_ShortcodeResponse,
  Cli_Menu_Interactive_LinksMenu_Updates,
  Cli_Menu_Interactive_LinksMenu_UpdatesHttpResponse,
  Cli_Menu_Interactive_LinksMenu_UpdatesRedirectUrl,
  Cli_Menu_Interactive_LinksMenu_Url,
  Cli_Menu_Interactive_LinksMenu_UrlAsString,
  Cli_Menu_Interactive_LinksMenu_UrlResponse,
  Cli_Menu_Interactive_LinksMenu_UrlTrimmed,
  Cli_Menu_Interactive_SettingsFlow_BaseDomain,
  Cli_Menu_Interactive_SettingsFlow_BaseDomainAsString,
  Cli_Menu_Interactive_SettingsFlow_BaseDomainResponse,
  Cli_Menu_Interactive_SettingsFlow_ConfigPath,
  Cli_Menu_Interactive_SettingsFlow_CurrentSettings,
  Cli_Menu_Interactive_SettingsFlow_ErrorMessage,
  Cli_Menu_Interactive_SettingsFlow_Returns,
  Cli_Menu_Interactive_SettingsFlow_ShowResponseOutput,
  Cli_Menu_Interactive_SettingsFlow_ShowResponseOutputAsBoolean,
  Cli_Menu_Interactive_SettingsFlow_ShowResponseOutputResponse,
  Cli_Menu_Interactive_SettingsFlow_UpdateErrorMessage,
  Cli_Menu_Interactive_SettingsFlow_WorkerName,
  Cli_Menu_Interactive_SettingsFlow_WorkerNameAsString,
  Cli_Menu_Interactive_SettingsFlow_WorkerNameResponse,
  Cli_Menu_Interactive_TrackersMenu_Action,
  Cli_Menu_Interactive_TrackersMenu_ActionResponse,
  Cli_Menu_Interactive_TrackersMenu_ConfigPath,
  Cli_Menu_Interactive_TrackersMenu_Confirmed,
  Cli_Menu_Interactive_TrackersMenu_ConfirmedResponse,
  Cli_Menu_Interactive_TrackersMenu_ErrorMessage,
  Cli_Menu_Interactive_TrackersMenu_InMenu,
  Cli_Menu_Interactive_TrackersMenu_Name,
  Cli_Menu_Interactive_TrackersMenu_NameAsString,
  Cli_Menu_Interactive_TrackersMenu_NameResponse,
  Cli_Menu_Interactive_TrackersMenu_Returns,
  Cli_Menu_Interactive_TrackersMenu_Trackers,
} from '../../types/cli/menu/interactive.d.ts';

/**
 * CLI - Menu - Interactive - Menu.
 *
 * Displays the main interactive menu for the Branded Short Links CLI.
 * Allows the user to manage links, trackers, settings, or deploy.
 *
 * @param {Cli_Menu_Interactive_InteractiveMenu_ConfigDirs} configDirs - Config dirs.
 *
 * @returns {Cli_Menu_Interactive_InteractiveMenu_Returns}
 *
 * @since 2.0.0
 */
async function interactiveMenu(configDirs: Cli_Menu_Interactive_InteractiveMenu_ConfigDirs): Cli_Menu_Interactive_InteractiveMenu_Returns {
  const currentFilePath: Cli_Menu_Interactive_InteractiveMenu_CurrentFilePath = fileURLToPath(import.meta.url);

  let dir: Cli_Menu_Interactive_InteractiveMenu_Dir = dirname(currentFilePath);
  let version: Cli_Menu_Interactive_InteractiveMenu_Version = '0.0.0';

  while (dir !== dirname(dir)) {
    const packageJsonPath: Cli_Menu_Interactive_InteractiveMenu_PackageJsonPath = join(dir, 'package.json');

    if (existsSync(packageJsonPath) === true) {
      const packageJsonRaw: Cli_Menu_Interactive_InteractiveMenu_PackageJsonRaw = readFileSync(packageJsonPath, 'utf-8');
      const packageJsonParsed: Cli_Menu_Interactive_InteractiveMenu_PackageJsonParsed = JSON.parse(packageJsonRaw) as Cli_Menu_Interactive_InteractiveMenu_PackageJsonParsed;

      version = packageJsonParsed['version'] as Cli_Menu_Interactive_InteractiveMenu_Version;

      break;
    }

    const parent: Cli_Menu_Interactive_InteractiveMenu_Parent = dirname(dir);

    dir = parent;
  }

  const header: Cli_Menu_Interactive_InteractiveMenu_Header = CLIHeader.render([
    chalk.redBright(`Branded Short Links v${version}`),
    chalk.dim('A CBN Ventures Creation'),
  ], {
    style: 'round',
    width: 50,
    marginBottom: 1,
  });

  process.stdout.write(`${header}\n`);

  let configPath: Cli_Menu_Interactive_InteractiveMenu_ConfigPath = undefined;

  if (configDirs['length'] > 1) {
    const configDirResponse: Cli_Menu_Interactive_InteractiveMenu_ConfigDirResponse = await prompts({
      type: 'select',
      name: 'dir',
      message: chalk.cyan('Multiple config files found. Which one?'),
      choices: configDirs.map((configDir) => ({
        title: join(configDir, 'config.json'),
        value: configDir,
      })),
    });

    if (configDirResponse['dir'] === undefined) {
      return;
    }

    configPath = join(configDirResponse['dir'], 'config.json');
  } else if (configDirs['length'] === 1) {
    configPath = join(configDirs[0]!, 'config.json');
  } else {
    const defaultConfigDir: Cli_Menu_Interactive_InteractiveMenu_DefaultConfigDir = Bootstrap.getConfigDir('branded-short-links');

    configPath = join(defaultConfigDir, 'config.json');
  }

  let running: Cli_Menu_Interactive_InteractiveMenu_Running = true;

  while (running === true) {
    const actionResponse: Cli_Menu_Interactive_InteractiveMenu_ActionResponse = await prompts({
      type: 'select',
      name: 'action',
      message: chalk.cyan('What would you like to do?'),
      choices: [
        {
          title: 'Manage Links',
          value: 'links',
        },
        {
          title: 'Manage Trackers',
          value: 'trackers',
        },
        {
          title: 'Settings',
          value: 'settings',
        },
        {
          title: 'Deploy',
          value: 'deploy',
        },
        {
          title: 'Exit',
          value: 'exit',
        },
      ],
    });

    const action: Cli_Menu_Interactive_InteractiveMenu_Action = actionResponse['action'];

    if (action === undefined || action === 'exit') {
      running = false;
      break;
    }

    if (action === 'links') {
      await linksMenu(configPath);
    } else if (action === 'trackers') {
      await trackersMenu(configPath);
    } else if (action === 'settings') {
      await settingsFlow(configPath);
    } else if (action === 'deploy') {
      try {
        await deploy(configPath, true);
      } catch (error) {
        const errorMessage: Cli_Menu_Interactive_InteractiveMenu_ErrorMessage = (error instanceof Error) ? error.message : String(error);

        Logger.error(`Error: ${errorMessage}`);
      }
    }
  }

  return;
}

/**
 * CLI - Menu - Interactive - Links Menu.
 *
 * Handles the links submenu for adding, editing, removing,
 * and setting fallback URLs for branded short links.
 *
 * @param {Cli_Menu_Interactive_LinksMenu_ConfigPath} configPath - Config path.
 *
 * @returns {Cli_Menu_Interactive_LinksMenu_Returns}
 *
 * @since 2.0.0
 */
async function linksMenu(configPath: Cli_Menu_Interactive_LinksMenu_ConfigPath): Cli_Menu_Interactive_LinksMenu_Returns {
  let inMenu: Cli_Menu_Interactive_LinksMenu_InMenu = true;

  while (inMenu === true) {
    const actionResponse: Cli_Menu_Interactive_LinksMenu_ActionResponse = await prompts({
      type: 'select',
      name: 'action',
      message: chalk.cyan('Manage Links'),
      choices: [
        {
          title: 'Add',
          value: 'add',
        },
        {
          title: 'Edit',
          value: 'edit',
        },
        {
          title: 'Remove',
          value: 'remove',
        },
        {
          title: 'Set Fallback URL',
          value: 'fallback',
        },
        {
          title: chalk.dim('Go back'),
          value: 'back',
        },
      ],
    });

    const action: Cli_Menu_Interactive_LinksMenu_Action = actionResponse['action'];

    if (action === undefined || action === 'back') {
      inMenu = false;
      break;
    }

    if (action === 'add') {
      const answers: Cli_Menu_Interactive_LinksMenu_Answers = await prompts([
        {
          type: 'text',
          name: 'shortcode',
          message: 'Shortcode (e.g. /gh):',
          validate: (value) => {
            if (value.trim().length === 0) {
              return 'Shortcode is required';
            }

            if (value.startsWith('/') === false) {
              return 'Shortcode must start with /';
            }

            if (value.length < 2) {
              return 'Shortcode must be at least 2 characters';
            }

            return true;
          },
        },
        {
          type: 'select',
          name: 'http_response',
          message: 'HTTP response code:',
          choices: [
            {
              title: '301 (Permanent)',
              value: 301,
            },
            {
              title: '302 (Found)',
              value: 302,
            },
            {
              title: '303 (See Other)',
              value: 303,
            },
            {
              title: '307 (Temporary)',
              value: 307,
            },
            {
              title: '308 (Permanent)',
              value: 308,
            },
          ],
          initial: 0,
        },
        {
          type: 'text',
          name: 'redirect_url',
          message: 'Redirect URL:',
          validate: (value) => {
            try {
              const parsedUrl: Cli_Menu_Interactive_LinksMenu_ParsedUrl = new URL(value);

              return parsedUrl !== undefined;
            } catch {
              return 'Invalid URL';
            }
          },
        },
      ]);

      const answersShortcode: Cli_Menu_Interactive_LinksMenu_AnswersShortcode = answers['shortcode'];

      const answersHttpResponse: Cli_Menu_Interactive_LinksMenu_AnswersHttpResponse = answers['http_response'];

      const answersRedirectUrl: Cli_Menu_Interactive_LinksMenu_AnswersRedirectUrl = answers['redirect_url'];

      if (
        answersShortcode !== undefined
        && answersHttpResponse !== undefined
        && answersRedirectUrl !== undefined
      ) {
        try {
          addLink(configPath, {
            shortcode: answersShortcode as Cli_Menu_Interactive_LinksMenu_AnswersShortcodeAsString,
            http_response: answersHttpResponse as Cli_Menu_Interactive_LinksMenu_AnswersHttpResponseAsCode,
            redirect_url: answersRedirectUrl as Cli_Menu_Interactive_LinksMenu_AnswersRedirectUrlAsString,
          });

          Logger.info(`Link "${answersShortcode}" added.`);
        } catch (error) {
          const addErrorMessage: Cli_Menu_Interactive_LinksMenu_AddErrorMessage = (error instanceof Error) ? error.message : String(error);

          Logger.error(`Error: ${addErrorMessage}`);
        }
      }
    } else if (action === 'edit') {
      try {
        const links: Cli_Menu_Interactive_LinksMenu_Links = listLinks(configPath);

        links.sort((a, b) => a['shortcode'].localeCompare(b['shortcode']));

        if (links.length === 0) {
          Logger.warn('No links to edit.');
        } else {
          const shortcodeResponse: Cli_Menu_Interactive_LinksMenu_ShortcodeResponse = await prompts({
            type: 'select',
            name: 'shortcode',
            message: 'Select link to edit:',
            choices: [
              ...links.map((link) => ({
                title: `${link['shortcode']} \u2192 ${link['redirect_url']}`,
                value: link['shortcode'],
              })),
              {
                title: chalk.dim('Go back'),
                value: 'back',
              },
            ],
          });

          const shortcode: Cli_Menu_Interactive_LinksMenu_Shortcode = shortcodeResponse['shortcode'];

          if (shortcode !== undefined && shortcode !== 'back') {
            const current: Cli_Menu_Interactive_LinksMenu_Current = links.find((link) => link['shortcode'] === shortcode);

            const currentHttpResponse: Cli_Menu_Interactive_LinksMenu_CurrentHttpResponse = (current !== undefined) ? current['http_response'] : 302;

            const httpCodes: Cli_Menu_Interactive_LinksMenu_HttpCodes = [
              301,
              302,
              303,
              307,
              308,
            ];

            const httpCodeIdx: Cli_Menu_Interactive_LinksMenu_HttpCodeIdx = httpCodes.indexOf(currentHttpResponse as Cli_Menu_Interactive_LinksMenu_AnswersHttpResponseAsCode);

            const httpCodeInitial: Cli_Menu_Interactive_LinksMenu_HttpCodeInitial = (httpCodeIdx >= 0) ? httpCodeIdx : 1;

            const currentRedirectUrl: Cli_Menu_Interactive_LinksMenu_CurrentRedirectUrl = (current !== undefined) ? current['redirect_url'] : undefined;

            const updates: Cli_Menu_Interactive_LinksMenu_Updates = await prompts([
              {
                type: 'select',
                name: 'http_response',
                message: 'HTTP response code:',
                choices: [
                  {
                    title: '301 (Permanent)',
                    value: 301,
                  },
                  {
                    title: '302 (Found)',
                    value: 302,
                  },
                  {
                    title: '303 (See Other)',
                    value: 303,
                  },
                  {
                    title: '307 (Temporary)',
                    value: 307,
                  },
                  {
                    title: '308 (Permanent)',
                    value: 308,
                  },
                ],
                initial: httpCodeInitial,
              },
              {
                type: 'text',
                name: 'redirect_url',
                message: 'Redirect URL:',
                initial: currentRedirectUrl as Cli_Menu_Interactive_LinksMenu_AnswersRedirectUrlAsString,
                validate: (value) => {
                  try {
                    const editParsedUrl: Cli_Menu_Interactive_LinksMenu_EditParsedUrl = new URL(value);

                    return editParsedUrl !== undefined;
                  } catch {
                    return 'Invalid URL';
                  }
                },
              },
            ]);

            const updatesHttpResponse: Cli_Menu_Interactive_LinksMenu_UpdatesHttpResponse = updates['http_response'];

            const updatesRedirectUrl: Cli_Menu_Interactive_LinksMenu_UpdatesRedirectUrl = updates['redirect_url'];

            if (updatesHttpResponse !== undefined && updatesRedirectUrl !== undefined) {
              const editUpdates: Cli_Menu_Interactive_LinksMenu_EditUpdates = {};

              if (updatesHttpResponse !== undefined) {
                Reflect.set(editUpdates, 'http_response', updatesHttpResponse);
              }

              if (updatesRedirectUrl !== undefined) {
                Reflect.set(editUpdates, 'redirect_url', updatesRedirectUrl);
              }

              editLink(configPath, shortcode as Cli_Menu_Interactive_LinksMenu_ShortcodeAsString, editUpdates as Cli_Menu_Interactive_LinksMenu_EditUpdatesAsPartial);

              Logger.info(`Link "${shortcode}" updated.`);
            }
          }
        }
      } catch (error) {
        const editErrorMessage: Cli_Menu_Interactive_LinksMenu_EditErrorMessage = (error instanceof Error) ? error.message : String(error);

        Logger.error(`Error: ${editErrorMessage}`);
      }
    } else if (action === 'remove') {
      try {
        const removeLinks: Cli_Menu_Interactive_LinksMenu_RemoveLinks = listLinks(configPath);

        removeLinks.sort((a, b) => a['shortcode'].localeCompare(b['shortcode']));

        if (removeLinks.length === 0) {
          Logger.warn('No links to remove.');
        } else {
          const removeShortcodeResponse: Cli_Menu_Interactive_LinksMenu_RemoveShortcodeResponse = await prompts({
            type: 'select',
            name: 'shortcode',
            message: 'Select link to remove:',
            choices: [
              ...removeLinks.map((link) => ({
                title: `${link['shortcode']} \u2192 ${link['redirect_url']}`,
                value: link['shortcode'],
              })),
              {
                title: chalk.dim('Go back'),
                value: 'back',
              },
            ],
          });

          const removeShortcode: Cli_Menu_Interactive_LinksMenu_RemoveShortcode = removeShortcodeResponse['shortcode'];

          if (removeShortcode !== undefined && removeShortcode !== 'back') {
            const confirmedResponse: Cli_Menu_Interactive_LinksMenu_ConfirmedResponse = await prompts({
              type: 'confirm',
              name: 'confirmed',
              message: chalk.yellow(`Remove "${removeShortcode}"?`),
              initial: false,
            });

            const confirmed: Cli_Menu_Interactive_LinksMenu_Confirmed = confirmedResponse['confirmed'];

            if (confirmed === true) {
              removeLink(configPath, removeShortcode as Cli_Menu_Interactive_LinksMenu_RemoveShortcodeAsString);

              Logger.info(`Link "${removeShortcode}" removed.`);
            }
          }
        }
      } catch (error) {
        const removeErrorMessage: Cli_Menu_Interactive_LinksMenu_RemoveErrorMessage = (error instanceof Error) ? error.message : String(error);

        Logger.error(`Error: ${removeErrorMessage}`);
      }
    } else if (action === 'fallback') {
      try {
        const currentFallback: Cli_Menu_Interactive_LinksMenu_CurrentFallback = getFallbackUrl(configPath);

        const fallbackMessage: Cli_Menu_Interactive_LinksMenu_FallbackMessage = (currentFallback !== undefined) ? chalk.cyan(`Fallback URL (${currentFallback})`) : chalk.cyan('Fallback URL (not set)');

        const fallbackChoices: Cli_Menu_Interactive_LinksMenu_FallbackChoices = (currentFallback !== undefined) ? [
          {
            title: 'Update',
            value: 'update',
          },
          {
            title: 'Clear',
            value: 'clear',
          },
          {
            title: chalk.dim('Go back'),
            value: 'back',
          },
        ] : [
          {
            title: 'Set',
            value: 'update',
          },
          {
            title: chalk.dim('Go back'),
            value: 'back',
          },
        ];

        const fallbackActionResponse: Cli_Menu_Interactive_LinksMenu_FallbackActionResponse = await prompts({
          type: 'select',
          name: 'fallbackAction',
          message: fallbackMessage,
          choices: fallbackChoices,
        });

        const fallbackAction: Cli_Menu_Interactive_LinksMenu_FallbackAction = fallbackActionResponse['fallbackAction'];

        if (fallbackAction === 'clear') {
          setFallbackUrl(configPath, undefined);

          Logger.info('Fallback URL cleared.');
        } else if (fallbackAction === 'update') {
          const urlResponse: Cli_Menu_Interactive_LinksMenu_UrlResponse = await prompts({
            type: 'text',
            name: 'url',
            message: 'Fallback URL:',
            validate: (value) => {
              if (value.trim() === '') {
                return 'URL is required';
              }

              try {
                const fallbackParsedUrl: Cli_Menu_Interactive_LinksMenu_FallbackParsedUrl = new URL(value);

                return fallbackParsedUrl !== undefined;
              } catch {
                return 'Invalid URL';
              }
            },
          });

          const url: Cli_Menu_Interactive_LinksMenu_Url = urlResponse['url'];

          if (url !== undefined) {
            const urlTrimmed: Cli_Menu_Interactive_LinksMenu_UrlTrimmed = (url as Cli_Menu_Interactive_LinksMenu_UrlAsString).trim();

            setFallbackUrl(configPath, urlTrimmed);

            Logger.info('Fallback URL updated.');
          }
        }
      } catch (error) {
        const fallbackErrorMessage: Cli_Menu_Interactive_LinksMenu_FallbackErrorMessage = (error instanceof Error) ? error.message : String(error);

        Logger.error(`Error: ${fallbackErrorMessage}`);
      }
    }
  }

  return;
}

/**
 * CLI - Menu - Interactive - Trackers Menu.
 *
 * Handles the trackers submenu for adding, editing,
 * and removing tracker configurations.
 *
 * @param {Cli_Menu_Interactive_TrackersMenu_ConfigPath} configPath - Config path.
 *
 * @returns {Cli_Menu_Interactive_TrackersMenu_Returns}
 *
 * @since 2.0.0
 */
async function trackersMenu(configPath: Cli_Menu_Interactive_TrackersMenu_ConfigPath): Cli_Menu_Interactive_TrackersMenu_Returns {
  let inMenu: Cli_Menu_Interactive_TrackersMenu_InMenu = true;

  while (inMenu === true) {
    const actionResponse: Cli_Menu_Interactive_TrackersMenu_ActionResponse = await prompts({
      type: 'select',
      name: 'action',
      message: chalk.cyan('Manage Trackers'),
      choices: [
        {
          title: 'Add',
          value: 'add',
        },
        {
          title: 'Edit',
          value: 'edit',
        },
        {
          title: 'Remove',
          value: 'remove',
        },
        {
          title: chalk.dim('Go back'),
          value: 'back',
        },
      ],
    });

    const action: Cli_Menu_Interactive_TrackersMenu_Action = actionResponse['action'];

    if (action === undefined || action === 'back') {
      inMenu = false;
      break;
    }

    if (action === 'add') {
      await addTrackerFlow(configPath);
    } else if (action === 'edit') {
      await editTrackerFlow(configPath);
    } else if (action === 'remove') {
      try {
        const trackers: Cli_Menu_Interactive_TrackersMenu_Trackers = listTrackers(configPath);

        trackers.sort((a, b) => a['name'].localeCompare(b['name']));

        if (trackers.length === 0) {
          Logger.warn('No trackers to remove.');
        } else {
          const nameResponse: Cli_Menu_Interactive_TrackersMenu_NameResponse = await prompts({
            type: 'select',
            name: 'name',
            message: 'Select tracker to remove:',
            choices: [
              ...trackers.map((tracker) => ({
                title: `${tracker['name']} (${tracker['type']})`,
                value: tracker['name'],
              })),
              {
                title: chalk.dim('Go back'),
                value: 'back',
              },
            ],
          });

          const name: Cli_Menu_Interactive_TrackersMenu_Name = nameResponse['name'];

          if (name !== undefined && name !== 'back') {
            const confirmedResponse: Cli_Menu_Interactive_TrackersMenu_ConfirmedResponse = await prompts({
              type: 'confirm',
              name: 'confirmed',
              message: chalk.yellow(`Remove "${name}"?`),
              initial: false,
            });

            const confirmed: Cli_Menu_Interactive_TrackersMenu_Confirmed = confirmedResponse['confirmed'];

            if (confirmed === true) {
              removeTracker(configPath, name as Cli_Menu_Interactive_TrackersMenu_NameAsString);

              Logger.info(`Tracker "${name}" removed.`);
            }
          }
        }
      } catch (error) {
        const errorMessage: Cli_Menu_Interactive_TrackersMenu_ErrorMessage = (error instanceof Error) ? error.message : String(error);

        Logger.error(`Error: ${errorMessage}`);
      }
    }
  }

  return;
}

/**
 * CLI - Menu - Interactive - Add Tracker Flow.
 *
 * Guides the user through adding a new tracker by selecting
 * type, entering a name, and providing type-specific fields.
 *
 * @param {Cli_Menu_Interactive_AddTrackerFlow_ConfigPath} configPath - Config path.
 *
 * @returns {Cli_Menu_Interactive_AddTrackerFlow_Returns}
 *
 * @since 2.0.0
 */
async function addTrackerFlow(configPath: Cli_Menu_Interactive_AddTrackerFlow_ConfigPath): Cli_Menu_Interactive_AddTrackerFlow_Returns {
  const trackerTypeResponse: Cli_Menu_Interactive_AddTrackerFlow_TrackerTypeResponse = await prompts({
    type: 'select',
    name: 'trackerType',
    message: 'Tracker type:',
    choices: [
      {
        title: 'Google Analytics 4 (ga4)',
        value: 'ga4',
      },
      {
        title: 'Facebook Pixel (facebook)',
        value: 'facebook',
      },
      {
        title: 'ntfy',
        value: 'ntfy',
      },
      {
        title: 'Reverse Proxy for ntfy (ntfy-reverse-proxy)',
        value: 'ntfy-reverse-proxy',
      },
      {
        title: 'Plain Text',
        value: 'plain-text',
      },
      {
        title: 'PostHog',
        value: 'posthog',
      },
    ],
  });

  const trackerType: Cli_Menu_Interactive_AddTrackerFlow_TrackerType = trackerTypeResponse['trackerType'];

  if (trackerType === undefined) {
    return;
  }

  const nameResponse: Cli_Menu_Interactive_AddTrackerFlow_NameResponse = await prompts({
    type: 'text',
    name: 'name',
    message: 'Tracker name:',
    validate: (value) => value.trim().length > 0 || 'Name is required',
  });

  const name: Cli_Menu_Interactive_AddTrackerFlow_Name = nameResponse['name'];

  if (name === undefined) {
    return;
  }

  try {
    if (trackerType === 'ga4') {
      const fields: Cli_Menu_Interactive_AddTrackerFlow_Fields = await prompts([
        {
          type: 'text',
          name: 'measurement_id',
          message: 'Measurement ID:',
          validate: (value) => value.trim().length > 0 || 'Measurement ID is required',
        },
        {
          type: 'text',
          name: 'api_secret',
          message: 'API Secret:',
          validate: (value) => value.trim().length > 0 || 'API Secret is required',
        },
      ]);

      const fieldsMeasurementId: Cli_Menu_Interactive_AddTrackerFlow_FieldsMeasurementId = fields['measurement_id'];

      const fieldsApiSecret: Cli_Menu_Interactive_AddTrackerFlow_FieldsApiSecret = fields['api_secret'];

      if (fieldsMeasurementId === undefined || fieldsApiSecret === undefined) {
        return;
      }

      addTracker(configPath, {
        name: name as Cli_Menu_Interactive_AddTrackerFlow_NameAsString,
        type: 'ga4',
        measurement_id: fieldsMeasurementId as Cli_Menu_Interactive_AddTrackerFlow_FieldsMeasurementIdAsString,
        api_secret: fieldsApiSecret as Cli_Menu_Interactive_AddTrackerFlow_FieldsApiSecretAsString,
      });
    } else if (trackerType === 'facebook') {
      const pixelIdResponse: Cli_Menu_Interactive_AddTrackerFlow_PixelIdResponse = await prompts({
        type: 'text',
        name: 'pixel_id',
        message: 'Pixel ID:',
        validate: (value) => value.trim().length > 0 || 'Pixel ID is required',
      });

      const pixelId: Cli_Menu_Interactive_AddTrackerFlow_PixelId = pixelIdResponse['pixel_id'];

      if (pixelId === undefined) {
        return;
      }

      addTracker(configPath, {
        name: name as Cli_Menu_Interactive_AddTrackerFlow_NameAsString,
        type: 'facebook',
        pixel_id: pixelId as Cli_Menu_Interactive_AddTrackerFlow_PixelIdAsString,
      });
    } else if (trackerType === 'ntfy') {
      const ntfyFields: Cli_Menu_Interactive_AddTrackerFlow_NtfyFields = await prompts([
        {
          type: 'text',
          name: 'server',
          message: 'Server URL:',
          validate: (value) => {
            if (value.startsWith('https://') === false) {
              return 'URL must start with https://';
            }

            try {
              const ntfyParsedUrl: Cli_Menu_Interactive_AddTrackerFlow_NtfyParsedUrl = new URL(value);

              return ntfyParsedUrl !== undefined;
            } catch {
              return 'Invalid URL';
            }
          },
        },
        {
          type: 'text',
          name: 'topic',
          message: 'Topic:',
          validate: (value) => value.trim().length > 0 || 'Topic is required',
        },
        {
          type: 'text',
          name: 'token',
          message: 'Token:',
          validate: (value) => value.startsWith('tk_') === true || 'Token must start with tk_',
        },
      ]);

      const fieldsServer: Cli_Menu_Interactive_AddTrackerFlow_FieldsServer = ntfyFields['server'];

      const fieldsTopic: Cli_Menu_Interactive_AddTrackerFlow_FieldsTopic = ntfyFields['topic'];

      const fieldsToken: Cli_Menu_Interactive_AddTrackerFlow_FieldsToken = ntfyFields['token'];

      if (
        fieldsServer === undefined
        || fieldsTopic === undefined
        || fieldsToken === undefined
      ) {
        return;
      }

      addTracker(configPath, {
        name: name as Cli_Menu_Interactive_AddTrackerFlow_NameAsString,
        type: 'ntfy',
        server: fieldsServer as Cli_Menu_Interactive_AddTrackerFlow_FieldsServerAsString,
        topic: fieldsTopic as Cli_Menu_Interactive_AddTrackerFlow_FieldsTopicAsString,
        token: fieldsToken as Cli_Menu_Interactive_AddTrackerFlow_FieldsTokenAsString,
      });
    } else if (trackerType === 'ntfy-reverse-proxy') {
      const proxyUrlResponse: Cli_Menu_Interactive_AddTrackerFlow_ProxyUrlResponse = await prompts({
        type: 'text',
        name: 'url',
        message: 'URL:',
        validate: (value) => {
          if (value.startsWith('https://') === false) {
            return 'URL must start with https://';
          }

          try {
            const proxyParsedUrl: Cli_Menu_Interactive_AddTrackerFlow_ProxyParsedUrl = new URL(value);

            return proxyParsedUrl !== undefined;
          } catch {
            return 'Invalid URL';
          }
        },
      });

      const proxyUrl: Cli_Menu_Interactive_AddTrackerFlow_ProxyUrl = proxyUrlResponse['url'];

      if (proxyUrl === undefined) {
        return;
      }

      const proxyTokenResponse: Cli_Menu_Interactive_AddTrackerFlow_ProxyTokenResponse = await prompts({
        type: 'text',
        name: 'token',
        message: 'Auth token (blank to skip):',
      });

      const proxyToken: Cli_Menu_Interactive_AddTrackerFlow_ProxyToken = proxyTokenResponse['token'];

      if (proxyToken === undefined) {
        return;
      }

      const proxyTokenValue: Cli_Menu_Interactive_AddTrackerFlow_ProxyTokenValue = (proxyToken !== undefined) ? (proxyToken as Cli_Menu_Interactive_AddTrackerFlow_ProxyTokenAsString).trim() : undefined;

      const proxyResolvedToken: Cli_Menu_Interactive_AddTrackerFlow_ProxyResolvedToken = (proxyTokenValue !== undefined && proxyTokenValue !== '') ? proxyTokenValue : undefined;

      addTracker(configPath, {
        name: name as Cli_Menu_Interactive_AddTrackerFlow_NameAsString,
        type: 'ntfy-reverse-proxy',
        url: proxyUrl as Cli_Menu_Interactive_AddTrackerFlow_UrlAsString,
        ...((proxyResolvedToken !== undefined) ? { token: proxyResolvedToken } : {}),
      });
    } else if (trackerType === 'plain-text') {
      const plainUrlResponse: Cli_Menu_Interactive_AddTrackerFlow_PlainUrlResponse = await prompts({
        type: 'text',
        name: 'url',
        message: 'URL:',
        validate: (value) => {
          if (value.startsWith('https://') === false) {
            return 'URL must start with https://';
          }

          try {
            const plainParsedUrl: Cli_Menu_Interactive_AddTrackerFlow_PlainParsedUrl = new URL(value);

            return plainParsedUrl !== undefined;
          } catch {
            return 'Invalid URL';
          }
        },
      });

      const plainUrl: Cli_Menu_Interactive_AddTrackerFlow_PlainUrl = plainUrlResponse['url'];

      if (plainUrl === undefined) {
        return;
      }

      const plainTokenResponse: Cli_Menu_Interactive_AddTrackerFlow_PlainTokenResponse = await prompts({
        type: 'text',
        name: 'token',
        message: 'Auth token (blank to skip):',
      });

      const plainToken: Cli_Menu_Interactive_AddTrackerFlow_PlainToken = plainTokenResponse['token'];

      if (plainToken === undefined) {
        return;
      }

      const plainTokenValue: Cli_Menu_Interactive_AddTrackerFlow_PlainTokenValue = (plainToken !== undefined) ? (plainToken as Cli_Menu_Interactive_AddTrackerFlow_PlainTokenAsString).trim() : undefined;

      const plainResolvedToken: Cli_Menu_Interactive_AddTrackerFlow_PlainResolvedToken = (plainTokenValue !== undefined && plainTokenValue !== '') ? plainTokenValue : undefined;

      addTracker(configPath, {
        name: name as Cli_Menu_Interactive_AddTrackerFlow_NameAsString,
        type: 'plain-text',
        url: plainUrl as Cli_Menu_Interactive_AddTrackerFlow_UrlAsString,
        ...((plainResolvedToken !== undefined) ? { token: plainResolvedToken } : {}),
      });
    } else if (trackerType === 'posthog') {
      const posthogFields: Cli_Menu_Interactive_AddTrackerFlow_PosthogFields = await prompts([
        {
          type: 'text',
          name: 'host',
          message: 'Host URL:',
          validate: (value) => {
            if (value.startsWith('https://') === false) {
              return 'URL must start with https://';
            }

            try {
              const posthogParsedUrl: Cli_Menu_Interactive_AddTrackerFlow_PosthogParsedUrl = new URL(value);

              return posthogParsedUrl !== undefined;
            } catch {
              return 'Invalid URL';
            }
          },
        },
        {
          type: 'text',
          name: 'api_key',
          message: 'API Key:',
          validate: (value) => value.trim().length > 0 || 'API Key is required',
        },
      ]);

      const fieldsHost: Cli_Menu_Interactive_AddTrackerFlow_FieldsHost = posthogFields['host'];

      const fieldsApiKey: Cli_Menu_Interactive_AddTrackerFlow_FieldsApiKey = posthogFields['api_key'];

      if (fieldsHost === undefined || fieldsApiKey === undefined) {
        return;
      }

      addTracker(configPath, {
        name: name as Cli_Menu_Interactive_AddTrackerFlow_NameAsString,
        type: 'posthog',
        host: fieldsHost as Cli_Menu_Interactive_AddTrackerFlow_FieldsHostAsString,
        api_key: fieldsApiKey as Cli_Menu_Interactive_AddTrackerFlow_FieldsApiKeyAsString,
      });
    }

    Logger.info(`Tracker "${name}" added.`);
  } catch (error) {
    const errorMessage: Cli_Menu_Interactive_AddTrackerFlow_ErrorMessage = (error instanceof Error) ? error.message : String(error);

    Logger.error(`Error: ${errorMessage}`);
  }

  return;
}

/**
 * CLI - Menu - Interactive - Edit Tracker Flow.
 *
 * Guides the user through editing an existing tracker by
 * selecting it and updating type-specific configuration fields.
 *
 * @param {Cli_Menu_Interactive_EditTrackerFlow_ConfigPath} configPath - Config path.
 *
 * @returns {Cli_Menu_Interactive_EditTrackerFlow_Returns}
 *
 * @since 2.0.0
 */
async function editTrackerFlow(configPath: Cli_Menu_Interactive_EditTrackerFlow_ConfigPath): Cli_Menu_Interactive_EditTrackerFlow_Returns {
  try {
    const trackers: Cli_Menu_Interactive_EditTrackerFlow_Trackers = listTrackers(configPath);

    trackers.sort((a, b) => a['name'].localeCompare(b['name']));

    if (trackers.length === 0) {
      Logger.warn('No trackers to edit.');

      return;
    }

    const nameResponse: Cli_Menu_Interactive_EditTrackerFlow_NameResponse = await prompts({
      type: 'select',
      name: 'name',
      message: 'Select tracker to edit:',
      choices: [
        ...trackers.map((tracker) => ({
          title: `${tracker['name']} (${tracker['type']})`,
          value: tracker['name'],
        })),
        {
          title: chalk.dim('Go back'),
          value: 'back',
        },
      ],
    });

    const name: Cli_Menu_Interactive_EditTrackerFlow_Name = nameResponse['name'];

    if (name === undefined || name === 'back') {
      return;
    }

    const current: Cli_Menu_Interactive_EditTrackerFlow_Current = trackers.find((tracker) => tracker['name'] === name);

    if (current === undefined) {
      return;
    }

    const typeChangeResponse: Cli_Menu_Interactive_EditTrackerFlow_TypeChangeResponse = await prompts({
      type: 'select',
      name: 'newType',
      message: `Current type: ${current['type']}. Change type?`,
      choices: [
        {
          title: `Keep as ${current['type']}`,
          value: current['type'],
        },
        {
          title: 'Google Analytics 4 (ga4)',
          value: 'ga4',
        },
        {
          title: 'Facebook Pixel (facebook)',
          value: 'facebook',
        },
        {
          title: 'ntfy',
          value: 'ntfy',
        },
        {
          title: 'Reverse Proxy for ntfy (ntfy-reverse-proxy)',
          value: 'ntfy-reverse-proxy',
        },
        {
          title: 'Plain Text',
          value: 'plain-text',
        },
        {
          title: 'PostHog',
          value: 'posthog',
        },
      ].filter((choice) => choice['value'] !== current['type'] || choice['title'].startsWith('Keep')),
    });

    const newType: Cli_Menu_Interactive_EditTrackerFlow_NewType = typeChangeResponse['newType'] as Cli_Menu_Interactive_EditTrackerFlow_NewType;

    if (newType === undefined) {
      return;
    }

    if (newType !== current['type']) {
      const trackerCountBefore: Cli_Menu_Interactive_EditTrackerFlow_TrackerCountBefore = listTrackers(configPath)['length'];

      removeTracker(configPath, name as Cli_Menu_Interactive_EditTrackerFlow_NameAsString);

      Logger.info(`Tracker "${name}" removed. Reconfiguring as "${newType}"...`);

      await addTrackerFlow(configPath);

      const trackerCountAfter: Cli_Menu_Interactive_EditTrackerFlow_TrackerCountAfter = listTrackers(configPath)['length'];

      if (trackerCountAfter < trackerCountBefore) {
        addTracker(configPath, current);

        Logger.warn(`Type change cancelled. Tracker "${name}" restored.`);
      }

      return;
    }

    if (current['type'] === 'ga4') {
      const updates: Cli_Menu_Interactive_EditTrackerFlow_Updates = await prompts([
        {
          type: 'text',
          name: 'measurement_id',
          message: 'Measurement ID:',
          initial: current['measurement_id'],
          validate: (value) => value.trim().length > 0 || 'Measurement ID is required',
        },
        {
          type: 'text',
          name: 'api_secret',
          message: 'API Secret:',
          initial: current['api_secret'],
          validate: (value) => value.trim().length > 0 || 'API Secret is required',
        },
      ]);

      const updatesMeasurementId: Cli_Menu_Interactive_EditTrackerFlow_UpdatesMeasurementId = updates['measurement_id'];

      const updatesApiSecret: Cli_Menu_Interactive_EditTrackerFlow_UpdatesApiSecret = updates['api_secret'];

      if (updatesMeasurementId !== undefined && updatesApiSecret !== undefined) {
        editTracker(configPath, name as Cli_Menu_Interactive_EditTrackerFlow_NameAsString, {
          ...((updatesMeasurementId !== undefined) ? { measurement_id: updatesMeasurementId as Cli_Menu_Interactive_EditTrackerFlow_UpdatesMeasurementIdAsString } : {}),
          ...((updatesApiSecret !== undefined) ? { api_secret: updatesApiSecret as Cli_Menu_Interactive_EditTrackerFlow_UpdatesApiSecretAsString } : {}),
        });

        Logger.info(`Tracker "${name}" updated.`);
      }
    } else if (current['type'] === 'facebook') {
      const pixelIdResponse: Cli_Menu_Interactive_EditTrackerFlow_PixelIdResponse = await prompts({
        type: 'text',
        name: 'pixel_id',
        message: 'Pixel ID:',
        initial: current['pixel_id'],
        validate: (value) => value.trim().length > 0 || 'Pixel ID is required',
      });

      const pixelId: Cli_Menu_Interactive_EditTrackerFlow_PixelId = pixelIdResponse['pixel_id'];

      if (pixelId !== undefined) {
        editTracker(configPath, name as Cli_Menu_Interactive_EditTrackerFlow_NameAsString, { pixel_id: pixelId as Cli_Menu_Interactive_EditTrackerFlow_PixelIdAsString });

        Logger.info(`Tracker "${name}" updated.`);
      }
    } else if (current['type'] === 'ntfy') {
      const ntfyEditFields: Cli_Menu_Interactive_EditTrackerFlow_NtfyEditFields = await prompts([
        {
          type: 'text',
          name: 'server',
          message: 'Server URL:',
          initial: current['server'],
          validate: (value) => {
            if (value.startsWith('https://') === false) {
              return 'URL must start with https://';
            }

            try {
              const ntfyParsedUrl: Cli_Menu_Interactive_EditTrackerFlow_NtfyParsedUrl = new URL(value);

              return ntfyParsedUrl !== undefined;
            } catch {
              return 'Invalid URL';
            }
          },
        },
        {
          type: 'text',
          name: 'topic',
          message: 'Topic:',
          initial: current['topic'],
          validate: (value) => value.trim().length > 0 || 'Topic is required',
        },
        {
          type: 'text',
          name: 'token',
          message: 'Token:',
          initial: current['token'],
          validate: (value) => value.startsWith('tk_') === true || 'Token must start with tk_',
        },
      ]);

      const ntfyUpdates: Cli_Menu_Interactive_EditTrackerFlow_NtfyUpdates = {};

      const ntfyUpdatesServer: Cli_Menu_Interactive_EditTrackerFlow_NtfyUpdatesServer = ntfyEditFields['server'];

      const ntfyUpdatesTopic: Cli_Menu_Interactive_EditTrackerFlow_NtfyUpdatesTopic = ntfyEditFields['topic'];

      const ntfyUpdatesToken: Cli_Menu_Interactive_EditTrackerFlow_NtfyUpdatesToken = ntfyEditFields['token'];

      if (
        ntfyUpdatesServer === undefined
        || ntfyUpdatesTopic === undefined
        || ntfyUpdatesToken === undefined
      ) {
        return;
      }

      if (ntfyUpdatesServer !== undefined) {
        Reflect.set(ntfyUpdates, 'server', ntfyUpdatesServer);
      }

      if (ntfyUpdatesTopic !== undefined) {
        Reflect.set(ntfyUpdates, 'topic', ntfyUpdatesTopic);
      }

      if (ntfyUpdatesToken !== undefined) {
        Reflect.set(ntfyUpdates, 'token', ntfyUpdatesToken);
      }

      const ntfyUpdatesKeys: Cli_Menu_Interactive_EditTrackerFlow_NtfyUpdatesKeys = Object.keys(ntfyUpdates);

      if (ntfyUpdatesKeys.length > 0) {
        editTracker(configPath, name as Cli_Menu_Interactive_EditTrackerFlow_NameAsString, ntfyUpdates as Cli_Menu_Interactive_EditTrackerFlow_NtfyUpdatesAsPartial);

        Logger.info(`Tracker "${name}" updated.`);
      }
    } else if (current['type'] === 'posthog') {
      const posthogEditFields: Cli_Menu_Interactive_EditTrackerFlow_PosthogEditFields = await prompts([
        {
          type: 'text',
          name: 'host',
          message: 'Host URL:',
          initial: current['host'],
          validate: (value) => {
            if (value.startsWith('https://') === false) {
              return 'URL must start with https://';
            }

            try {
              const posthogParsedUrl: Cli_Menu_Interactive_EditTrackerFlow_PosthogParsedUrl = new URL(value);

              return posthogParsedUrl !== undefined;
            } catch {
              return 'Invalid URL';
            }
          },
        },
        {
          type: 'text',
          name: 'api_key',
          message: 'API Key:',
          initial: current['api_key'],
          validate: (value) => value.trim().length > 0 || 'API Key is required',
        },
      ]);

      const posthogUpdates: Cli_Menu_Interactive_EditTrackerFlow_PosthogUpdates = {};

      const posthogUpdatesHost: Cli_Menu_Interactive_EditTrackerFlow_PosthogUpdatesHost = posthogEditFields['host'];

      const posthogUpdatesApiKey: Cli_Menu_Interactive_EditTrackerFlow_PosthogUpdatesApiKey = posthogEditFields['api_key'];

      if (posthogUpdatesHost === undefined || posthogUpdatesApiKey === undefined) {
        return;
      }

      if (posthogUpdatesHost !== undefined) {
        Reflect.set(posthogUpdates, 'host', posthogUpdatesHost);
      }

      if (posthogUpdatesApiKey !== undefined) {
        Reflect.set(posthogUpdates, 'api_key', posthogUpdatesApiKey);
      }

      const posthogUpdatesKeys: Cli_Menu_Interactive_EditTrackerFlow_PosthogUpdatesKeys = Object.keys(posthogUpdates);

      if (posthogUpdatesKeys.length > 0) {
        editTracker(configPath, name as Cli_Menu_Interactive_EditTrackerFlow_NameAsString, posthogUpdates as Cli_Menu_Interactive_EditTrackerFlow_PosthogUpdatesAsPartial);

        Logger.info(`Tracker "${name}" updated.`);
      }
    } else if (current['type'] === 'ntfy-reverse-proxy') {
      const ntfyReverseProxyUrlResponse: Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUrlResponse = await prompts({
        type: 'text',
        name: 'url',
        message: 'URL:',
        initial: current['url'],
        validate: (value) => {
          if (value.startsWith('https://') === false) {
            return 'URL must start with https://';
          }

          try {
            const proxyParsedUrl: Cli_Menu_Interactive_EditTrackerFlow_ProxyParsedUrl = new URL(value);

            return proxyParsedUrl !== undefined;
          } catch {
            return 'Invalid URL';
          }
        },
      });

      const ntfyReverseProxyUpdatesUrl: Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesUrl = ntfyReverseProxyUrlResponse['url'];

      if (ntfyReverseProxyUpdatesUrl === undefined) {
        return;
      }

      const ntfyReverseProxyTokenResponse: Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyTokenResponse = await prompts({
        type: 'text',
        name: 'token',
        message: 'Token (optional):',
        initial: current['token'] || '',
      });

      const ntfyReverseProxyUpdatesToken: Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesToken = ntfyReverseProxyTokenResponse['token'];

      if (ntfyReverseProxyUpdatesToken === undefined) {
        return;
      }

      const ntfyReverseProxyUpdatesTokenValue: Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesTokenValue = (ntfyReverseProxyUpdatesToken !== undefined) ? (ntfyReverseProxyUpdatesToken as Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesTokenAsString).trim() : undefined;

      const ntfyReverseProxyUpdatesResolvedToken: Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesResolvedToken = (ntfyReverseProxyUpdatesTokenValue !== undefined && ntfyReverseProxyUpdatesTokenValue !== '') ? ntfyReverseProxyUpdatesTokenValue : undefined;

      const ntfyReverseProxyUpdates: Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdates = {};

      if (ntfyReverseProxyUpdatesUrl !== undefined) {
        Reflect.set(ntfyReverseProxyUpdates, 'url', ntfyReverseProxyUpdatesUrl);
      }

      if (ntfyReverseProxyUpdatesResolvedToken !== undefined) {
        Reflect.set(ntfyReverseProxyUpdates, 'token', ntfyReverseProxyUpdatesResolvedToken);
      }

      const ntfyReverseProxyUpdatesKeys: Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesKeys = Object.keys(ntfyReverseProxyUpdates);

      if (ntfyReverseProxyUpdatesKeys.length > 0) {
        editTracker(configPath, name as Cli_Menu_Interactive_EditTrackerFlow_NameAsString, ntfyReverseProxyUpdates as Cli_Menu_Interactive_EditTrackerFlow_NtfyReverseProxyUpdatesAsPartial);

        Logger.info(`Tracker "${name}" updated.`);
      }
    } else if (current['type'] === 'plain-text') {
      const plainTextUrlResponse: Cli_Menu_Interactive_EditTrackerFlow_PlainTextUrlResponse = await prompts({
        type: 'text',
        name: 'url',
        message: 'URL:',
        initial: current['url'],
        validate: (value) => {
          if (value.startsWith('https://') === false) {
            return 'URL must start with https://';
          }

          try {
            const plainParsedUrl: Cli_Menu_Interactive_EditTrackerFlow_PlainParsedUrl = new URL(value);

            return plainParsedUrl !== undefined;
          } catch {
            return 'Invalid URL';
          }
        },
      });

      const plainTextUpdatesUrl: Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesUrl = plainTextUrlResponse['url'];

      if (plainTextUpdatesUrl === undefined) {
        return;
      }

      const plainTextTokenResponse: Cli_Menu_Interactive_EditTrackerFlow_PlainTextTokenResponse = await prompts({
        type: 'text',
        name: 'token',
        message: 'Token (optional):',
        initial: current['token'] || '',
      });

      const plainTextUpdatesToken: Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesToken = plainTextTokenResponse['token'];

      if (plainTextUpdatesToken === undefined) {
        return;
      }

      const plainTextUpdatesTokenValue: Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesTokenValue = (plainTextUpdatesToken !== undefined) ? (plainTextUpdatesToken as Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesTokenAsString).trim() : undefined;

      const plainTextUpdatesResolvedToken: Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesResolvedToken = (plainTextUpdatesTokenValue !== undefined && plainTextUpdatesTokenValue !== '') ? plainTextUpdatesTokenValue : undefined;

      const plainTextUpdates: Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdates = {};

      if (plainTextUpdatesUrl !== undefined) {
        Reflect.set(plainTextUpdates, 'url', plainTextUpdatesUrl);
      }

      if (plainTextUpdatesResolvedToken !== undefined) {
        Reflect.set(plainTextUpdates, 'token', plainTextUpdatesResolvedToken);
      }

      const plainTextUpdatesKeys: Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesKeys = Object.keys(plainTextUpdates);

      if (plainTextUpdatesKeys.length > 0) {
        editTracker(configPath, name as Cli_Menu_Interactive_EditTrackerFlow_NameAsString, plainTextUpdates as Cli_Menu_Interactive_EditTrackerFlow_PlainTextUpdatesAsPartial);

        Logger.info(`Tracker "${name}" updated.`);
      }
    }
  } catch (error) {
    const errorMessage: Cli_Menu_Interactive_EditTrackerFlow_ErrorMessage = (error instanceof Error) ? error.message : String(error);

    Logger.error(`Error: ${errorMessage}`);
  }

  return;
}

/**
 * CLI - Menu - Interactive - Settings Flow.
 *
 * Allows the user to view and update the base domain
 * and debug output settings for the application.
 *
 * @param {Cli_Menu_Interactive_SettingsFlow_ConfigPath} configPath - Config path.
 *
 * @returns {Cli_Menu_Interactive_SettingsFlow_Returns}
 *
 * @since 2.0.0
 */
async function settingsFlow(configPath: Cli_Menu_Interactive_SettingsFlow_ConfigPath): Cli_Menu_Interactive_SettingsFlow_Returns {
  let currentSettings: Cli_Menu_Interactive_SettingsFlow_CurrentSettings = undefined;

  try {
    currentSettings = getSettings(configPath);
  } catch (error) {
    const errorMessage: Cli_Menu_Interactive_SettingsFlow_ErrorMessage = (error instanceof Error) ? error.message : String(error);

    Logger.error(`Error: ${errorMessage}`);

    return;
  }

  const workerNameResponse: Cli_Menu_Interactive_SettingsFlow_WorkerNameResponse = await prompts({
    type: 'text',
    name: 'worker_name',
    message: 'Worker name:',
    initial: currentSettings['worker_name'],
    validate: (value) => value.trim().length > 0 || 'Worker name is required',
  });

  const workerName: Cli_Menu_Interactive_SettingsFlow_WorkerName = workerNameResponse['worker_name'];

  if (workerName === undefined) {
    return;
  }

  const baseDomainResponse: Cli_Menu_Interactive_SettingsFlow_BaseDomainResponse = await prompts({
    type: 'text',
    name: 'base_domain',
    message: 'Base domain:',
    initial: currentSettings['base_domain'],
    validate: (value) => value.trim().length > 0 || 'Base domain is required',
  });

  const baseDomain: Cli_Menu_Interactive_SettingsFlow_BaseDomain = baseDomainResponse['base_domain'];

  if (baseDomain === undefined) {
    return;
  }

  const showResponseOutputResponse: Cli_Menu_Interactive_SettingsFlow_ShowResponseOutputResponse = await prompts({
    type: 'confirm',
    name: 'show_response_output',
    message: 'Show response output (debug mode)?',
    initial: currentSettings['show_response_output'],
  });

  const showResponseOutput: Cli_Menu_Interactive_SettingsFlow_ShowResponseOutput = showResponseOutputResponse['show_response_output'];

  if (showResponseOutput === undefined) {
    return;
  }

  try {
    updateSettings(configPath, {
      worker_name: workerName as Cli_Menu_Interactive_SettingsFlow_WorkerNameAsString,
      base_domain: baseDomain as Cli_Menu_Interactive_SettingsFlow_BaseDomainAsString,
      show_response_output: showResponseOutput as Cli_Menu_Interactive_SettingsFlow_ShowResponseOutputAsBoolean,
    });

    Logger.info('Settings updated.');
  } catch (error) {
    const updateErrorMessage: Cli_Menu_Interactive_SettingsFlow_UpdateErrorMessage = (error instanceof Error) ? error.message : String(error);

    Logger.error(`Error: ${updateErrorMessage}`);
  }

  return;
}

export {
  interactiveMenu,
};
