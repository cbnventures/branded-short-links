import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { Bootstrap, CLIHeader, Logger } from '@cbnventures/nova/toolkit';
import chalk from 'chalk';
import prompts from 'prompts';

import { deploy } from '../commands/deploy.js';
import {
  addLink,
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
  CliMenuInteractiveAddTrackerFlowConfigPath,
  CliMenuInteractiveAddTrackerFlowErrorMessage,
  CliMenuInteractiveAddTrackerFlowFields,
  CliMenuInteractiveAddTrackerFlowFieldsApiKey,
  CliMenuInteractiveAddTrackerFlowFieldsApiKeyAsString,
  CliMenuInteractiveAddTrackerFlowFieldsApiSecret,
  CliMenuInteractiveAddTrackerFlowFieldsApiSecretAsString,
  CliMenuInteractiveAddTrackerFlowFieldsHost,
  CliMenuInteractiveAddTrackerFlowFieldsHostAsString,
  CliMenuInteractiveAddTrackerFlowFieldsMeasurementId,
  CliMenuInteractiveAddTrackerFlowFieldsMeasurementIdAsString,
  CliMenuInteractiveAddTrackerFlowFieldsServer,
  CliMenuInteractiveAddTrackerFlowFieldsServerAsString,
  CliMenuInteractiveAddTrackerFlowFieldsToken,
  CliMenuInteractiveAddTrackerFlowFieldsTokenAsString,
  CliMenuInteractiveAddTrackerFlowFieldsTopic,
  CliMenuInteractiveAddTrackerFlowFieldsTopicAsString,
  CliMenuInteractiveAddTrackerFlowName,
  CliMenuInteractiveAddTrackerFlowNameAsString,
  CliMenuInteractiveAddTrackerFlowNameResponse,
  CliMenuInteractiveAddTrackerFlowParsedUrl,
  CliMenuInteractiveAddTrackerFlowPixelId,
  CliMenuInteractiveAddTrackerFlowPixelIdAsString,
  CliMenuInteractiveAddTrackerFlowPixelIdResponse,
  CliMenuInteractiveAddTrackerFlowResolvedToken,
  CliMenuInteractiveAddTrackerFlowReturn,
  CliMenuInteractiveAddTrackerFlowToken,
  CliMenuInteractiveAddTrackerFlowTokenResponse,
  CliMenuInteractiveAddTrackerFlowTokenValue,
  CliMenuInteractiveAddTrackerFlowTrackerType,
  CliMenuInteractiveAddTrackerFlowTrackerTypeResponse,
  CliMenuInteractiveAddTrackerFlowUrl,
  CliMenuInteractiveAddTrackerFlowUrlAsString,
  CliMenuInteractiveAddTrackerFlowUrlResponse,
  CliMenuInteractiveEditTrackerFlowConfigPath,
  CliMenuInteractiveEditTrackerFlowCurrent,
  CliMenuInteractiveEditTrackerFlowErrorMessage,
  CliMenuInteractiveEditTrackerFlowName,
  CliMenuInteractiveEditTrackerFlowNameAsString,
  CliMenuInteractiveEditTrackerFlowNameResponse,
  CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdates,
  CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesAsPartial,
  CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesKeys,
  CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesResolvedToken,
  CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesToken,
  CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesTokenValue,
  CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesUrl,
  CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesUrlAsString,
  CliMenuInteractiveEditTrackerFlowNtfyUpdates,
  CliMenuInteractiveEditTrackerFlowNtfyUpdatesAsPartial,
  CliMenuInteractiveEditTrackerFlowNtfyUpdatesKeys,
  CliMenuInteractiveEditTrackerFlowNtfyUpdatesServer,
  CliMenuInteractiveEditTrackerFlowNtfyUpdatesToken,
  CliMenuInteractiveEditTrackerFlowNtfyUpdatesTopic,
  CliMenuInteractiveEditTrackerFlowParsedUrl,
  CliMenuInteractiveEditTrackerFlowPixelId,
  CliMenuInteractiveEditTrackerFlowPixelIdAsString,
  CliMenuInteractiveEditTrackerFlowPixelIdResponse,
  CliMenuInteractiveEditTrackerFlowPlainTextUpdates,
  CliMenuInteractiveEditTrackerFlowPlainTextUpdatesAsPartial,
  CliMenuInteractiveEditTrackerFlowPlainTextUpdatesKeys,
  CliMenuInteractiveEditTrackerFlowPlainTextUpdatesResolvedToken,
  CliMenuInteractiveEditTrackerFlowPlainTextUpdatesTokenValue,
  CliMenuInteractiveEditTrackerFlowPlainTextUpdatesUrl,
  CliMenuInteractiveEditTrackerFlowPlainTextUpdatesUrlAsString,
  CliMenuInteractiveEditTrackerFlowPosthogUpdates,
  CliMenuInteractiveEditTrackerFlowPosthogUpdatesApiKey,
  CliMenuInteractiveEditTrackerFlowPosthogUpdatesAsPartial,
  CliMenuInteractiveEditTrackerFlowPosthogUpdatesHost,
  CliMenuInteractiveEditTrackerFlowPosthogUpdatesKeys,
  CliMenuInteractiveEditTrackerFlowReturn,
  CliMenuInteractiveEditTrackerFlowTrackers,
  CliMenuInteractiveEditTrackerFlowTypeChangeNewType,
  CliMenuInteractiveEditTrackerFlowTypeChangeResponse,
  CliMenuInteractiveEditTrackerFlowUpdates,
  CliMenuInteractiveEditTrackerFlowUpdatesApiSecret,
  CliMenuInteractiveEditTrackerFlowUpdatesApiSecretAsString,
  CliMenuInteractiveEditTrackerFlowUpdatesMeasurementId,
  CliMenuInteractiveEditTrackerFlowUpdatesMeasurementIdAsString,
  CliMenuInteractiveInteractiveMenuAction,
  CliMenuInteractiveInteractiveMenuActionResponse,
  CliMenuInteractiveInteractiveMenuConfigDirResponse,
  CliMenuInteractiveInteractiveMenuConfigDirs,
  CliMenuInteractiveInteractiveMenuCurrentFilePath,
  CliMenuInteractiveInteractiveMenuDefaultConfigDir,
  CliMenuInteractiveInteractiveMenuDir,
  CliMenuInteractiveInteractiveMenuErrorMessage,
  CliMenuInteractiveInteractiveMenuHeader,
  CliMenuInteractiveInteractiveMenuInteractiveConfigPath,
  CliMenuInteractiveInteractiveMenuPackageJsonParsed,
  CliMenuInteractiveInteractiveMenuPackageJsonPath,
  CliMenuInteractiveInteractiveMenuPackageJsonRaw,
  CliMenuInteractiveInteractiveMenuParent,
  CliMenuInteractiveInteractiveMenuReturn,
  CliMenuInteractiveInteractiveMenuRunning,
  CliMenuInteractiveInteractiveMenuVersion,
  CliMenuInteractiveLinksMenuAction,
  CliMenuInteractiveLinksMenuActionResponse,
  CliMenuInteractiveLinksMenuAnswers,
  CliMenuInteractiveLinksMenuAnswersHttpResponse,
  CliMenuInteractiveLinksMenuAnswersHttpResponseAsCode,
  CliMenuInteractiveLinksMenuAnswersRedirectUrl,
  CliMenuInteractiveLinksMenuAnswersRedirectUrlAsString,
  CliMenuInteractiveLinksMenuAnswersShortcode,
  CliMenuInteractiveLinksMenuAnswersShortcodeAsString,
  CliMenuInteractiveLinksMenuConfigPath,
  CliMenuInteractiveLinksMenuConfirmed,
  CliMenuInteractiveLinksMenuConfirmedResponse,
  CliMenuInteractiveLinksMenuCurrent,
  CliMenuInteractiveLinksMenuCurrentFallback,
  CliMenuInteractiveLinksMenuCurrentHttpResponse,
  CliMenuInteractiveLinksMenuCurrentRedirectUrl,
  CliMenuInteractiveLinksMenuEditLinkModule,
  CliMenuInteractiveLinksMenuEditUpdates,
  CliMenuInteractiveLinksMenuEditUpdatesAsPartial,
  CliMenuInteractiveLinksMenuErrorMessage,
  CliMenuInteractiveLinksMenuFallbackAction,
  CliMenuInteractiveLinksMenuFallbackActionResponse,
  CliMenuInteractiveLinksMenuFallbackChoices,
  CliMenuInteractiveLinksMenuFallbackMessage,
  CliMenuInteractiveLinksMenuHttpCodeIdx,
  CliMenuInteractiveLinksMenuHttpCodeInitial,
  CliMenuInteractiveLinksMenuHttpCodesArray,
  CliMenuInteractiveLinksMenuInMenu,
  CliMenuInteractiveLinksMenuLinks,
  CliMenuInteractiveLinksMenuParsedUrl,
  CliMenuInteractiveLinksMenuRemoveShortcodeAsString,
  CliMenuInteractiveLinksMenuReturn,
  CliMenuInteractiveLinksMenuShortcode,
  CliMenuInteractiveLinksMenuShortcodeAsString,
  CliMenuInteractiveLinksMenuShortcodeResponse,
  CliMenuInteractiveLinksMenuUpdates,
  CliMenuInteractiveLinksMenuUpdatesHttpResponse,
  CliMenuInteractiveLinksMenuUpdatesRedirectUrl,
  CliMenuInteractiveLinksMenuUrl,
  CliMenuInteractiveLinksMenuUrlResponse,
  CliMenuInteractiveLinksMenuUrlTrimmed,
  CliMenuInteractiveSettingsFlowBaseDomain,
  CliMenuInteractiveSettingsFlowBaseDomainAsString,
  CliMenuInteractiveSettingsFlowBaseDomainResponse,
  CliMenuInteractiveSettingsFlowConfigPath,
  CliMenuInteractiveSettingsFlowCurrentSettings,
  CliMenuInteractiveSettingsFlowErrorMessage,
  CliMenuInteractiveSettingsFlowReturn,
  CliMenuInteractiveSettingsFlowShowResponseOutput,
  CliMenuInteractiveSettingsFlowShowResponseOutputAsBoolean,
  CliMenuInteractiveSettingsFlowShowResponseOutputResponse,
  CliMenuInteractiveSettingsFlowWorkerName,
  CliMenuInteractiveSettingsFlowWorkerNameAsString,
  CliMenuInteractiveSettingsFlowWorkerNameResponse,
  CliMenuInteractiveTrackersMenuAction,
  CliMenuInteractiveTrackersMenuActionResponse,
  CliMenuInteractiveTrackersMenuConfigPath,
  CliMenuInteractiveTrackersMenuConfirmed,
  CliMenuInteractiveTrackersMenuConfirmedResponse,
  CliMenuInteractiveTrackersMenuErrorMessage,
  CliMenuInteractiveTrackersMenuInMenu,
  CliMenuInteractiveTrackersMenuName,
  CliMenuInteractiveTrackersMenuNameAsString,
  CliMenuInteractiveTrackersMenuNameResponse,
  CliMenuInteractiveTrackersMenuReturn,
  CliMenuInteractiveTrackersMenuTrackers,
} from '../../types/cli/menu/interactive.d.ts';

/**
 * CLI - Menu - Interactive - Menu.
 *
 * Displays the main interactive menu for the Branded Short Links CLI.
 * Allows the user to manage links, trackers, settings, or deploy.
 *
 * @since 2.0.0
 */
async function interactiveMenu(configDirs: CliMenuInteractiveInteractiveMenuConfigDirs): CliMenuInteractiveInteractiveMenuReturn {
  const currentFilePath: CliMenuInteractiveInteractiveMenuCurrentFilePath = fileURLToPath(import.meta.url);

  let dir: CliMenuInteractiveInteractiveMenuDir = dirname(currentFilePath);
  let version: CliMenuInteractiveInteractiveMenuVersion = '0.0.0';

  while (dir !== dirname(dir)) {
    const packageJsonPath: CliMenuInteractiveInteractiveMenuPackageJsonPath = join(dir, 'package.json');

    if (existsSync(packageJsonPath) === true) {
      const packageJsonRaw: CliMenuInteractiveInteractiveMenuPackageJsonRaw = readFileSync(packageJsonPath, 'utf-8');
      const packageJsonParsed: CliMenuInteractiveInteractiveMenuPackageJsonParsed = JSON.parse(packageJsonRaw) as CliMenuInteractiveInteractiveMenuPackageJsonParsed;

      version = packageJsonParsed['version'] as CliMenuInteractiveInteractiveMenuVersion;

      break;
    }

    const parent: CliMenuInteractiveInteractiveMenuParent = dirname(dir);

    dir = parent;
  }

  const header: CliMenuInteractiveInteractiveMenuHeader = CLIHeader.render([
    chalk.redBright(`Branded Short Links v${version}`),
    chalk.dim('A CBN Ventures Creation'),
  ], {
    style: 'round',
    width: 50,
    marginBottom: 1,
  });

  process.stdout.write(`${header}\n`);

  let configPath: CliMenuInteractiveInteractiveMenuInteractiveConfigPath = undefined;

  if (configDirs['length'] > 1) {
    const configDirResponse: CliMenuInteractiveInteractiveMenuConfigDirResponse = await prompts({
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
    const defaultConfigDir: CliMenuInteractiveInteractiveMenuDefaultConfigDir = Bootstrap.getConfigDir('branded-short-links');

    configPath = join(defaultConfigDir, 'config.json');
  }

  let running: CliMenuInteractiveInteractiveMenuRunning = true;

  while (running === true) {
    const actionResponse: CliMenuInteractiveInteractiveMenuActionResponse = await prompts({
      type: 'select',
      name: 'action',
      message: chalk.cyan('What would you like to do?'),
      choices: [
        {
          title: 'Manage Links', value: 'links',
        },
        {
          title: 'Manage Trackers', value: 'trackers',
        },
        {
          title: 'Settings', value: 'settings',
        },
        {
          title: 'Deploy', value: 'deploy',
        },
        {
          title: 'Exit', value: 'exit',
        },
      ],
    });

    const action: CliMenuInteractiveInteractiveMenuAction = actionResponse['action'];

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
        const errorMessage: CliMenuInteractiveInteractiveMenuErrorMessage = (error instanceof Error) ? error.message : String(error);

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
 * @since 2.0.0
 */
async function linksMenu(configPath: CliMenuInteractiveLinksMenuConfigPath): CliMenuInteractiveLinksMenuReturn {
  let inMenu: CliMenuInteractiveLinksMenuInMenu = true;

  while (inMenu === true) {
    const actionResponse: CliMenuInteractiveLinksMenuActionResponse = await prompts({
      type: 'select',
      name: 'action',
      message: chalk.cyan('Manage Links'),
      choices: [
        {
          title: 'Add', value: 'add',
        },
        {
          title: 'Edit', value: 'edit',
        },
        {
          title: 'Remove', value: 'remove',
        },
        {
          title: 'Set Fallback URL', value: 'fallback',
        },
        {
          title: 'Back', value: 'back',
        },
      ],
    });

    const action: CliMenuInteractiveLinksMenuAction = actionResponse['action'];

    if (action === undefined || action === 'back') {
      inMenu = false;
      break;
    }

    if (action === 'add') {
      const answers: CliMenuInteractiveLinksMenuAnswers = await prompts([
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
              title: '301 (Permanent)', value: 301,
            },
            {
              title: '302 (Found)', value: 302,
            },
            {
              title: '303 (See Other)', value: 303,
            },
            {
              title: '307 (Temporary)', value: 307,
            },
            {
              title: '308 (Permanent)', value: 308,
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
              const parsedUrl: CliMenuInteractiveLinksMenuParsedUrl = new URL(value);

              return parsedUrl !== undefined;
            } catch {
              return 'Invalid URL';
            }
          },
        },
      ]);

      const answersShortcode: CliMenuInteractiveLinksMenuAnswersShortcode = answers['shortcode'];

      const answersHttpResponse: CliMenuInteractiveLinksMenuAnswersHttpResponse = answers['http_response'];

      const answersRedirectUrl: CliMenuInteractiveLinksMenuAnswersRedirectUrl = answers['redirect_url'];

      if (
        answersShortcode !== undefined
        && answersHttpResponse !== undefined
        && answersRedirectUrl !== undefined
      ) {
        try {
          addLink(configPath, {
            shortcode: answersShortcode as CliMenuInteractiveLinksMenuAnswersShortcodeAsString,
            http_response: answersHttpResponse as CliMenuInteractiveLinksMenuAnswersHttpResponseAsCode,
            redirect_url: answersRedirectUrl as CliMenuInteractiveLinksMenuAnswersRedirectUrlAsString,
          });

          Logger.info(`Link "${answersShortcode}" added.`);
        } catch (error) {
          const errorMessage: CliMenuInteractiveLinksMenuErrorMessage = (error instanceof Error) ? error.message : String(error);

          Logger.error(`Error: ${errorMessage}`);
        }
      }
    } else if (action === 'edit') {
      try {
        const links: CliMenuInteractiveLinksMenuLinks = listLinks(configPath);

        links.sort((a, b) => a['shortcode'].localeCompare(b['shortcode']));

        if (links.length === 0) {
          Logger.warn('No links to edit.');
        } else {
          const shortcodeResponse: CliMenuInteractiveLinksMenuShortcodeResponse = await prompts({
            type: 'select',
            name: 'shortcode',
            message: 'Select link to edit:',
            choices: links.map((link) => ({
              title: `${link['shortcode']} \u2192 ${link['redirect_url']}`, value: link['shortcode'],
            })),
          });

          const shortcode: CliMenuInteractiveLinksMenuShortcode = shortcodeResponse['shortcode'];

          if (shortcode !== undefined) {
            const current: CliMenuInteractiveLinksMenuCurrent = links.find((link) => link['shortcode'] === shortcode);

            const currentHttpResponse: CliMenuInteractiveLinksMenuCurrentHttpResponse = (current !== undefined) ? current['http_response'] : 302;

            const httpCodes: CliMenuInteractiveLinksMenuHttpCodesArray = [
              301,
              302,
              303,
              307,
              308,
            ];

            const httpCodeIdx: CliMenuInteractiveLinksMenuHttpCodeIdx = httpCodes.indexOf(currentHttpResponse as CliMenuInteractiveLinksMenuAnswersHttpResponseAsCode);

            const httpCodeInitial: CliMenuInteractiveLinksMenuHttpCodeInitial = (httpCodeIdx >= 0) ? httpCodeIdx : 1;

            const currentRedirectUrl: CliMenuInteractiveLinksMenuCurrentRedirectUrl = (current !== undefined) ? current['redirect_url'] : undefined;

            const updates: CliMenuInteractiveLinksMenuUpdates = await prompts([
              {
                type: 'select',
                name: 'http_response',
                message: 'HTTP response code:',
                choices: [
                  {
                    title: '301 (Permanent)', value: 301,
                  },
                  {
                    title: '302 (Found)', value: 302,
                  },
                  {
                    title: '303 (See Other)', value: 303,
                  },
                  {
                    title: '307 (Temporary)', value: 307,
                  },
                  {
                    title: '308 (Permanent)', value: 308,
                  },
                ],
                initial: httpCodeInitial,
              },
              {
                type: 'text',
                name: 'redirect_url',
                message: 'Redirect URL:',
                initial: currentRedirectUrl as CliMenuInteractiveLinksMenuAnswersRedirectUrlAsString,
                validate: (value) => {
                  try {
                    const parsedUrl: CliMenuInteractiveLinksMenuParsedUrl = new URL(value);

                    return parsedUrl !== undefined;
                  } catch {
                    return 'Invalid URL';
                  }
                },
              },
            ]);

            const updatesHttpResponse: CliMenuInteractiveLinksMenuUpdatesHttpResponse = updates['http_response'];

            const updatesRedirectUrl: CliMenuInteractiveLinksMenuUpdatesRedirectUrl = updates['redirect_url'];

            if (updatesHttpResponse !== undefined || updatesRedirectUrl !== undefined) {
              const editUpdates: CliMenuInteractiveLinksMenuEditUpdates = {};

              if (updatesHttpResponse !== undefined) {
                Reflect.set(editUpdates, 'http_response', updatesHttpResponse);
              }

              if (updatesRedirectUrl !== undefined) {
                Reflect.set(editUpdates, 'redirect_url', updatesRedirectUrl);
              }

              const editLinkModule: CliMenuInteractiveLinksMenuEditLinkModule = await import('../commands/links.js');

              editLinkModule.editLink(configPath, shortcode as CliMenuInteractiveLinksMenuShortcodeAsString, editUpdates as CliMenuInteractiveLinksMenuEditUpdatesAsPartial);

              Logger.info(`Link "${shortcode}" updated.`);
            }
          }
        }
      } catch (error) {
        const errorMessage: CliMenuInteractiveLinksMenuErrorMessage = (error instanceof Error) ? error.message : String(error);

        Logger.error(`Error: ${errorMessage}`);
      }
    } else if (action === 'remove') {
      try {
        const links: CliMenuInteractiveLinksMenuLinks = listLinks(configPath);

        links.sort((a, b) => a['shortcode'].localeCompare(b['shortcode']));

        if (links.length === 0) {
          Logger.warn('No links to remove.');
        } else {
          const shortcodeResponse: CliMenuInteractiveLinksMenuShortcodeResponse = await prompts({
            type: 'select',
            name: 'shortcode',
            message: 'Select link to remove:',
            choices: links.map((link) => ({
              title: `${link['shortcode']} \u2192 ${link['redirect_url']}`, value: link['shortcode'],
            })),
          });

          const shortcode: CliMenuInteractiveLinksMenuShortcode = shortcodeResponse['shortcode'];

          if (shortcode !== undefined) {
            const confirmedResponse: CliMenuInteractiveLinksMenuConfirmedResponse = await prompts({
              type: 'confirm',
              name: 'confirmed',
              message: chalk.yellow(`Remove "${shortcode}"?`),
              initial: false,
            });

            const confirmed: CliMenuInteractiveLinksMenuConfirmed = confirmedResponse['confirmed'];

            if (confirmed === true) {
              removeLink(configPath, shortcode as CliMenuInteractiveLinksMenuRemoveShortcodeAsString);

              Logger.info(`Link "${shortcode}" removed.`);
            }
          }
        }
      } catch (error) {
        const errorMessage: CliMenuInteractiveLinksMenuErrorMessage = (error instanceof Error) ? error.message : String(error);

        Logger.error(`Error: ${errorMessage}`);
      }
    } else if (action === 'fallback') {
      try {
        const currentFallback: CliMenuInteractiveLinksMenuCurrentFallback = getFallbackUrl(configPath);

        const fallbackMessage: CliMenuInteractiveLinksMenuFallbackMessage = (currentFallback !== undefined) ? chalk.cyan(`Fallback URL (${currentFallback})`) : chalk.cyan('Fallback URL (not set)');

        const fallbackChoices: CliMenuInteractiveLinksMenuFallbackChoices = (currentFallback !== undefined) ? [
          {
            title: 'Update', value: 'update',
          },
          {
            title: 'Clear', value: 'clear',
          },
          {
            title: 'Back', value: 'back',
          },
        ] : [
          {
            title: 'Set', value: 'update',
          },
          {
            title: 'Back', value: 'back',
          },
        ];

        const fallbackActionResponse: CliMenuInteractiveLinksMenuFallbackActionResponse = await prompts({
          type: 'select',
          name: 'fallbackAction',
          message: fallbackMessage,
          choices: fallbackChoices,
        });

        const fallbackAction: CliMenuInteractiveLinksMenuFallbackAction = fallbackActionResponse['fallbackAction'];

        if (fallbackAction === 'clear') {
          setFallbackUrl(configPath, undefined);

          Logger.info('Fallback URL cleared.');
        } else if (fallbackAction === 'update') {
          const urlResponse: CliMenuInteractiveLinksMenuUrlResponse = await prompts({
            type: 'text',
            name: 'url',
            message: 'Fallback URL:',
            validate: (value) => {
              if (value.trim() === '') {
                return 'URL is required';
              }

              try {
                const parsedUrl: CliMenuInteractiveLinksMenuParsedUrl = new URL(value);

                return parsedUrl !== undefined;
              } catch {
                return 'Invalid URL';
              }
            },
          });

          const url: CliMenuInteractiveLinksMenuUrl = urlResponse['url'];

          if (url !== undefined) {
            const urlTrimmed: CliMenuInteractiveLinksMenuUrlTrimmed = (url as CliMenuInteractiveLinksMenuAnswersShortcodeAsString).trim();

            setFallbackUrl(configPath, urlTrimmed);

            Logger.info('Fallback URL updated.');
          }
        }
      } catch (error) {
        const errorMessage: CliMenuInteractiveLinksMenuErrorMessage = (error instanceof Error) ? error.message : String(error);

        Logger.error(`Error: ${errorMessage}`);
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
 * @since 2.0.0
 */
async function trackersMenu(configPath: CliMenuInteractiveTrackersMenuConfigPath): CliMenuInteractiveTrackersMenuReturn {
  let inMenu: CliMenuInteractiveTrackersMenuInMenu = true;

  while (inMenu === true) {
    const actionResponse: CliMenuInteractiveTrackersMenuActionResponse = await prompts({
      type: 'select',
      name: 'action',
      message: chalk.cyan('Manage Trackers'),
      choices: [
        {
          title: 'Add', value: 'add',
        },
        {
          title: 'Edit', value: 'edit',
        },
        {
          title: 'Remove', value: 'remove',
        },
        {
          title: 'Back', value: 'back',
        },
      ],
    });

    const action: CliMenuInteractiveTrackersMenuAction = actionResponse['action'];

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
        const trackers: CliMenuInteractiveTrackersMenuTrackers = listTrackers(configPath);

        trackers.sort((a, b) => a['name'].localeCompare(b['name']));

        if (trackers.length === 0) {
          Logger.warn('No trackers to remove.');
        } else {
          const nameResponse: CliMenuInteractiveTrackersMenuNameResponse = await prompts({
            type: 'select',
            name: 'name',
            message: 'Select tracker to remove:',
            choices: trackers.map((tracker) => ({
              title: `${tracker['name']} (${tracker['type']})`, value: tracker['name'],
            })),
          });

          const name: CliMenuInteractiveTrackersMenuName = nameResponse['name'];

          if (name !== undefined) {
            const confirmedResponse: CliMenuInteractiveTrackersMenuConfirmedResponse = await prompts({
              type: 'confirm',
              name: 'confirmed',
              message: chalk.yellow(`Remove "${name}"?`),
              initial: false,
            });

            const confirmed: CliMenuInteractiveTrackersMenuConfirmed = confirmedResponse['confirmed'];

            if (confirmed === true) {
              removeTracker(configPath, name as CliMenuInteractiveTrackersMenuNameAsString);

              Logger.info(`Tracker "${name}" removed.`);
            }
          }
        }
      } catch (error) {
        const errorMessage: CliMenuInteractiveTrackersMenuErrorMessage = (error instanceof Error) ? error.message : String(error);

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
 * @since 2.0.0
 */
async function addTrackerFlow(configPath: CliMenuInteractiveAddTrackerFlowConfigPath): CliMenuInteractiveAddTrackerFlowReturn {
  const trackerTypeResponse: CliMenuInteractiveAddTrackerFlowTrackerTypeResponse = await prompts({
    type: 'select',
    name: 'trackerType',
    message: 'Tracker type:',
    choices: [
      {
        title: 'Google Analytics 4 (ga4)', value: 'ga4',
      },
      {
        title: 'Facebook Pixel (facebook)', value: 'facebook',
      },
      {
        title: 'ntfy', value: 'ntfy',
      },
      {
        title: 'Reverse Proxy for ntfy (ntfy-reverse-proxy)', value: 'ntfy-reverse-proxy',
      },
      {
        title: 'Plain Text', value: 'plain-text',
      },
      {
        title: 'PostHog', value: 'posthog',
      },
    ],
  });

  const trackerType: CliMenuInteractiveAddTrackerFlowTrackerType = trackerTypeResponse['trackerType'];

  if (trackerType === undefined) {
    return;
  }

  const nameResponse: CliMenuInteractiveAddTrackerFlowNameResponse = await prompts({
    type: 'text',
    name: 'name',
    message: 'Tracker name:',
    validate: (value) => value.trim().length > 0 || 'Name is required',
  });

  const name: CliMenuInteractiveAddTrackerFlowName = nameResponse['name'];

  if (name === undefined) {
    return;
  }

  try {
    if (trackerType === 'ga4') {
      const fields: CliMenuInteractiveAddTrackerFlowFields = await prompts([
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

      const fieldsMeasurementId: CliMenuInteractiveAddTrackerFlowFieldsMeasurementId = fields['measurement_id'];

      const fieldsApiSecret: CliMenuInteractiveAddTrackerFlowFieldsApiSecret = fields['api_secret'];

      if (fieldsMeasurementId === undefined || fieldsApiSecret === undefined) {
        return;
      }

      addTracker(configPath, {
        name: name as CliMenuInteractiveAddTrackerFlowNameAsString,
        type: 'ga4',
        measurement_id: fieldsMeasurementId as CliMenuInteractiveAddTrackerFlowFieldsMeasurementIdAsString,
        api_secret: fieldsApiSecret as CliMenuInteractiveAddTrackerFlowFieldsApiSecretAsString,
      });
    } else if (trackerType === 'facebook') {
      const pixelIdResponse: CliMenuInteractiveAddTrackerFlowPixelIdResponse = await prompts({
        type: 'text',
        name: 'pixel_id',
        message: 'Pixel ID:',
        validate: (value) => value.trim().length > 0 || 'Pixel ID is required',
      });

      const pixelId: CliMenuInteractiveAddTrackerFlowPixelId = pixelIdResponse['pixel_id'];

      if (pixelId === undefined) {
        return;
      }

      addTracker(configPath, {
        name: name as CliMenuInteractiveAddTrackerFlowNameAsString,
        type: 'facebook',
        pixel_id: pixelId as CliMenuInteractiveAddTrackerFlowPixelIdAsString,
      });
    } else if (trackerType === 'ntfy') {
      const fields: CliMenuInteractiveAddTrackerFlowFields = await prompts([
        {
          type: 'text',
          name: 'server',
          message: 'Server URL:',
          validate: (value) => {
            if (value.startsWith('https://') === false) {
              return 'URL must start with https://';
            }

            try {
              const parsedUrl: CliMenuInteractiveAddTrackerFlowParsedUrl = new URL(value);

              return parsedUrl !== undefined;
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

      const fieldsServer: CliMenuInteractiveAddTrackerFlowFieldsServer = fields['server'];

      const fieldsTopic: CliMenuInteractiveAddTrackerFlowFieldsTopic = fields['topic'];

      const fieldsToken: CliMenuInteractiveAddTrackerFlowFieldsToken = fields['token'];

      if (
        fieldsServer === undefined
        || fieldsTopic === undefined
        || fieldsToken === undefined
      ) {
        return;
      }

      addTracker(configPath, {
        name: name as CliMenuInteractiveAddTrackerFlowNameAsString,
        type: 'ntfy',
        server: fieldsServer as CliMenuInteractiveAddTrackerFlowFieldsServerAsString,
        topic: fieldsTopic as CliMenuInteractiveAddTrackerFlowFieldsTopicAsString,
        token: fieldsToken as CliMenuInteractiveAddTrackerFlowFieldsTokenAsString,
      });
    } else if (trackerType === 'ntfy-reverse-proxy') {
      const urlResponse: CliMenuInteractiveAddTrackerFlowUrlResponse = await prompts({
        type: 'text',
        name: 'url',
        message: 'URL:',
        validate: (value) => {
          if (value.startsWith('https://') === false) {
            return 'URL must start with https://';
          }

          try {
            const parsedUrl: CliMenuInteractiveAddTrackerFlowParsedUrl = new URL(value);

            return parsedUrl !== undefined;
          } catch {
            return 'Invalid URL';
          }
        },
      });

      const url: CliMenuInteractiveAddTrackerFlowUrl = urlResponse['url'];

      if (url === undefined) {
        return;
      }

      const tokenResponse: CliMenuInteractiveAddTrackerFlowTokenResponse = await prompts({
        type: 'text',
        name: 'token',
        message: 'Auth token (blank to skip):',
      });

      const token: CliMenuInteractiveAddTrackerFlowToken = tokenResponse['token'];

      const tokenValue: CliMenuInteractiveAddTrackerFlowTokenValue = (token !== undefined) ? (token as CliMenuInteractiveAddTrackerFlowUrlAsString).trim() : undefined;

      const resolvedToken: CliMenuInteractiveAddTrackerFlowResolvedToken = (tokenValue !== undefined && tokenValue !== '') ? tokenValue : undefined;

      addTracker(configPath, {
        name: name as CliMenuInteractiveAddTrackerFlowNameAsString,
        type: 'ntfy-reverse-proxy',
        url: url as CliMenuInteractiveAddTrackerFlowUrlAsString,
        ...(resolvedToken !== undefined ? { token: resolvedToken } : {}),
      });
    } else if (trackerType === 'plain-text') {
      const urlResponse: CliMenuInteractiveAddTrackerFlowUrlResponse = await prompts({
        type: 'text',
        name: 'url',
        message: 'URL:',
        validate: (value) => {
          if (value.startsWith('https://') === false) {
            return 'URL must start with https://';
          }

          try {
            const parsedUrl: CliMenuInteractiveAddTrackerFlowParsedUrl = new URL(value);

            return parsedUrl !== undefined;
          } catch {
            return 'Invalid URL';
          }
        },
      });

      const url: CliMenuInteractiveAddTrackerFlowUrl = urlResponse['url'];

      if (url === undefined) {
        return;
      }

      const tokenResponse: CliMenuInteractiveAddTrackerFlowTokenResponse = await prompts({
        type: 'text',
        name: 'token',
        message: 'Auth token (blank to skip):',
      });

      const token: CliMenuInteractiveAddTrackerFlowToken = tokenResponse['token'];

      const tokenValue: CliMenuInteractiveAddTrackerFlowTokenValue = (token !== undefined) ? (token as CliMenuInteractiveAddTrackerFlowUrlAsString).trim() : undefined;

      const resolvedToken: CliMenuInteractiveAddTrackerFlowResolvedToken = (tokenValue !== undefined && tokenValue !== '') ? tokenValue : undefined;

      addTracker(configPath, {
        name: name as CliMenuInteractiveAddTrackerFlowNameAsString,
        type: 'plain-text',
        url: url as CliMenuInteractiveAddTrackerFlowUrlAsString,
        ...(resolvedToken !== undefined ? { token: resolvedToken } : {}),
      });
    } else if (trackerType === 'posthog') {
      const fields: CliMenuInteractiveAddTrackerFlowFields = await prompts([
        {
          type: 'text',
          name: 'host',
          message: 'Host URL:',
          validate: (value) => {
            if (value.startsWith('https://') === false) {
              return 'URL must start with https://';
            }

            try {
              const parsedUrl: CliMenuInteractiveAddTrackerFlowParsedUrl = new URL(value);

              return parsedUrl !== undefined;
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

      const fieldsHost: CliMenuInteractiveAddTrackerFlowFieldsHost = fields['host'];

      const fieldsApiKey: CliMenuInteractiveAddTrackerFlowFieldsApiKey = fields['api_key'];

      if (fieldsHost === undefined || fieldsApiKey === undefined) {
        return;
      }

      addTracker(configPath, {
        name: name as CliMenuInteractiveAddTrackerFlowNameAsString,
        type: 'posthog',
        host: fieldsHost as CliMenuInteractiveAddTrackerFlowFieldsHostAsString,
        api_key: fieldsApiKey as CliMenuInteractiveAddTrackerFlowFieldsApiKeyAsString,
      });
    }

    Logger.info(`Tracker "${name}" added.`);
  } catch (error) {
    const errorMessage: CliMenuInteractiveAddTrackerFlowErrorMessage = (error instanceof Error) ? error.message : String(error);

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
 * @since 2.0.0
 */
async function editTrackerFlow(configPath: CliMenuInteractiveEditTrackerFlowConfigPath): CliMenuInteractiveEditTrackerFlowReturn {
  try {
    const trackers: CliMenuInteractiveEditTrackerFlowTrackers = listTrackers(configPath);

    trackers.sort((a, b) => a['name'].localeCompare(b['name']));

    if (trackers.length === 0) {
      Logger.warn('No trackers to edit.');

      return;
    }

    const nameResponse: CliMenuInteractiveEditTrackerFlowNameResponse = await prompts({
      type: 'select',
      name: 'name',
      message: 'Select tracker to edit:',
      choices: trackers.map((tracker) => ({
        title: `${tracker['name']} (${tracker['type']})`, value: tracker['name'],
      })),
    });

    const name: CliMenuInteractiveEditTrackerFlowName = nameResponse['name'];

    if (name === undefined) {
      return;
    }

    const current: CliMenuInteractiveEditTrackerFlowCurrent = trackers.find((tracker) => tracker['name'] === name);

    if (current === undefined) {
      return;
    }

    const typeChangeResponse: CliMenuInteractiveEditTrackerFlowTypeChangeResponse = await prompts({
      type: 'select',
      name: 'newType',
      message: `Current type: ${current['type']}. Change type?`,
      choices: [
        {
          title: `Keep as ${current['type']}`, value: current['type'],
        },
        {
          title: 'Google Analytics 4 (ga4)', value: 'ga4',
        },
        {
          title: 'Facebook Pixel (facebook)', value: 'facebook',
        },
        {
          title: 'ntfy', value: 'ntfy',
        },
        {
          title: 'Reverse Proxy for ntfy (ntfy-reverse-proxy)', value: 'ntfy-reverse-proxy',
        },
        {
          title: 'Plain Text', value: 'plain-text',
        },
        {
          title: 'PostHog', value: 'posthog',
        },
      ].filter((choice) => choice['value'] !== current['type'] || choice['title'].startsWith('Keep')),
    });

    const newType: CliMenuInteractiveEditTrackerFlowTypeChangeNewType = typeChangeResponse['newType'] as CliMenuInteractiveEditTrackerFlowTypeChangeNewType;

    if (newType === undefined) {
      return;
    }

    if (newType !== current['type']) {
      removeTracker(configPath, name as CliMenuInteractiveEditTrackerFlowNameAsString);

      Logger.info(`Tracker "${name}" removed. Reconfiguring as "${newType}"...`);

      await addTrackerFlow(configPath);

      return;
    }

    if (current['type'] === 'ga4') {
      const updates: CliMenuInteractiveEditTrackerFlowUpdates = await prompts([
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

      const updatesMeasurementId: CliMenuInteractiveEditTrackerFlowUpdatesMeasurementId = updates['measurement_id'];

      const updatesApiSecret: CliMenuInteractiveEditTrackerFlowUpdatesApiSecret = updates['api_secret'];

      if (updatesMeasurementId !== undefined || updatesApiSecret !== undefined) {
        editTracker(configPath, name as CliMenuInteractiveEditTrackerFlowNameAsString, {
          ...(updatesMeasurementId !== undefined ? { measurement_id: updatesMeasurementId as CliMenuInteractiveEditTrackerFlowUpdatesMeasurementIdAsString } : {}),
          ...(updatesApiSecret !== undefined ? { api_secret: updatesApiSecret as CliMenuInteractiveEditTrackerFlowUpdatesApiSecretAsString } : {}),
        });

        Logger.info(`Tracker "${name}" updated.`);
      }
    } else if (current['type'] === 'facebook') {
      const pixelIdResponse: CliMenuInteractiveEditTrackerFlowPixelIdResponse = await prompts({
        type: 'text',
        name: 'pixel_id',
        message: 'Pixel ID:',
        initial: current['pixel_id'],
        validate: (value) => value.trim().length > 0 || 'Pixel ID is required',
      });

      const pixelId: CliMenuInteractiveEditTrackerFlowPixelId = pixelIdResponse['pixel_id'];

      if (pixelId !== undefined) {
        editTracker(configPath, name as CliMenuInteractiveEditTrackerFlowNameAsString, { pixel_id: pixelId as CliMenuInteractiveEditTrackerFlowPixelIdAsString });

        Logger.info(`Tracker "${name}" updated.`);
      }
    } else if (current['type'] === 'ntfy') {
      const updates: CliMenuInteractiveEditTrackerFlowUpdates = await prompts([
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
              const parsedUrl: CliMenuInteractiveEditTrackerFlowParsedUrl = new URL(value);

              return parsedUrl !== undefined;
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

      const ntfyUpdates: CliMenuInteractiveEditTrackerFlowNtfyUpdates = {};

      const ntfyUpdatesServer: CliMenuInteractiveEditTrackerFlowNtfyUpdatesServer = updates['server'];

      const ntfyUpdatesTopic: CliMenuInteractiveEditTrackerFlowNtfyUpdatesTopic = updates['topic'];

      const ntfyUpdatesToken: CliMenuInteractiveEditTrackerFlowNtfyUpdatesToken = updates['token'];

      if (ntfyUpdatesServer !== undefined) {
        Reflect.set(ntfyUpdates, 'server', ntfyUpdatesServer);
      }

      if (ntfyUpdatesTopic !== undefined) {
        Reflect.set(ntfyUpdates, 'topic', ntfyUpdatesTopic);
      }

      if (ntfyUpdatesToken !== undefined) {
        Reflect.set(ntfyUpdates, 'token', ntfyUpdatesToken);
      }

      const ntfyUpdatesKeys: CliMenuInteractiveEditTrackerFlowNtfyUpdatesKeys = Object.keys(ntfyUpdates);

      if (ntfyUpdatesKeys.length > 0) {
        editTracker(configPath, name as CliMenuInteractiveEditTrackerFlowNameAsString, ntfyUpdates as CliMenuInteractiveEditTrackerFlowNtfyUpdatesAsPartial);

        Logger.info(`Tracker "${name}" updated.`);
      }
    } else if (current['type'] === 'posthog') {
      const updates: CliMenuInteractiveEditTrackerFlowUpdates = await prompts([
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
              const parsedUrl: CliMenuInteractiveEditTrackerFlowParsedUrl = new URL(value);

              return parsedUrl !== undefined;
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

      const posthogUpdates: CliMenuInteractiveEditTrackerFlowPosthogUpdates = {};

      const posthogUpdatesHost: CliMenuInteractiveEditTrackerFlowPosthogUpdatesHost = updates['host'];

      const posthogUpdatesApiKey: CliMenuInteractiveEditTrackerFlowPosthogUpdatesApiKey = updates['api_key'];

      if (posthogUpdatesHost !== undefined) {
        Reflect.set(posthogUpdates, 'host', posthogUpdatesHost);
      }

      if (posthogUpdatesApiKey !== undefined) {
        Reflect.set(posthogUpdates, 'api_key', posthogUpdatesApiKey);
      }

      const posthogUpdatesKeys: CliMenuInteractiveEditTrackerFlowPosthogUpdatesKeys = Object.keys(posthogUpdates);

      if (posthogUpdatesKeys.length > 0) {
        editTracker(configPath, name as CliMenuInteractiveEditTrackerFlowNameAsString, posthogUpdates as CliMenuInteractiveEditTrackerFlowPosthogUpdatesAsPartial);

        Logger.info(`Tracker "${name}" updated.`);
      }
    } else if (current['type'] === 'ntfy-reverse-proxy') {
      const urlResponse: CliMenuInteractiveEditTrackerFlowUpdates = await prompts({
        type: 'text',
        name: 'url',
        message: 'URL:',
        initial: current['url'],
        validate: (value) => {
          if (value.startsWith('https://') === false) {
            return 'URL must start with https://';
          }

          try {
            const parsedUrl: CliMenuInteractiveEditTrackerFlowParsedUrl = new URL(value);

            return parsedUrl !== undefined;
          } catch {
            return 'Invalid URL';
          }
        },
      });

      const url: CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesUrl = urlResponse['url'];

      const tokenResponse: CliMenuInteractiveEditTrackerFlowUpdates = await prompts({
        type: 'text',
        name: 'token',
        message: 'Token (optional):',
        initial: current['token'] || '',
      });

      const token: CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesToken = tokenResponse['token'];

      const tokenValue: CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesTokenValue = (token !== undefined) ? (token as CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesUrlAsString).trim() : undefined;

      const resolvedToken: CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesResolvedToken = (tokenValue !== undefined && tokenValue !== '') ? tokenValue : undefined;

      const ntfyReverseProxyUpdates: CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdates = {};

      if (url !== undefined) {
        Reflect.set(ntfyReverseProxyUpdates, 'url', url);
      }

      if (resolvedToken !== undefined) {
        Reflect.set(ntfyReverseProxyUpdates, 'token', resolvedToken);
      }

      const ntfyReverseProxyUpdatesKeys: CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesKeys = Object.keys(ntfyReverseProxyUpdates);

      if (ntfyReverseProxyUpdatesKeys.length > 0) {
        editTracker(configPath, name as CliMenuInteractiveEditTrackerFlowNameAsString, ntfyReverseProxyUpdates as CliMenuInteractiveEditTrackerFlowNtfyReverseProxyUpdatesAsPartial);

        Logger.info(`Tracker "${name}" updated.`);
      }
    } else if (current['type'] === 'plain-text') {
      const urlResponse: CliMenuInteractiveEditTrackerFlowUpdates = await prompts({
        type: 'text',
        name: 'url',
        message: 'URL:',
        initial: current['url'],
        validate: (value) => {
          if (value.startsWith('https://') === false) {
            return 'URL must start with https://';
          }

          try {
            const parsedUrl: CliMenuInteractiveEditTrackerFlowParsedUrl = new URL(value);

            return parsedUrl !== undefined;
          } catch {
            return 'Invalid URL';
          }
        },
      });

      const url: CliMenuInteractiveEditTrackerFlowPlainTextUpdatesUrl = urlResponse['url'];

      const tokenResponse: CliMenuInteractiveEditTrackerFlowUpdates = await prompts({
        type: 'text',
        name: 'token',
        message: 'Token (optional):',
        initial: current['token'] || '',
      });

      const token: CliMenuInteractiveEditTrackerFlowPlainTextUpdatesUrl = tokenResponse['token'];

      const tokenValue: CliMenuInteractiveEditTrackerFlowPlainTextUpdatesTokenValue = (token !== undefined) ? (token as CliMenuInteractiveEditTrackerFlowPlainTextUpdatesUrlAsString).trim() : undefined;

      const resolvedToken: CliMenuInteractiveEditTrackerFlowPlainTextUpdatesResolvedToken = (tokenValue !== undefined && tokenValue !== '') ? tokenValue : undefined;

      const plainTextUpdates: CliMenuInteractiveEditTrackerFlowPlainTextUpdates = {};

      if (url !== undefined) {
        Reflect.set(plainTextUpdates, 'url', url);
      }

      if (resolvedToken !== undefined) {
        Reflect.set(plainTextUpdates, 'token', resolvedToken);
      }

      const plainTextUpdatesKeys: CliMenuInteractiveEditTrackerFlowPlainTextUpdatesKeys = Object.keys(plainTextUpdates);

      if (plainTextUpdatesKeys.length > 0) {
        editTracker(configPath, name as CliMenuInteractiveEditTrackerFlowNameAsString, plainTextUpdates as CliMenuInteractiveEditTrackerFlowPlainTextUpdatesAsPartial);

        Logger.info(`Tracker "${name}" updated.`);
      }
    }
  } catch (error) {
    const errorMessage: CliMenuInteractiveEditTrackerFlowErrorMessage = (error instanceof Error) ? error.message : String(error);

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
 * @since 2.0.0
 */
async function settingsFlow(configPath: CliMenuInteractiveSettingsFlowConfigPath): CliMenuInteractiveSettingsFlowReturn {
  let currentSettings: CliMenuInteractiveSettingsFlowCurrentSettings = undefined;

  try {
    currentSettings = getSettings(configPath);
  } catch (error) {
    const errorMessage: CliMenuInteractiveSettingsFlowErrorMessage = (error instanceof Error) ? error.message : String(error);

    Logger.error(`Error: ${errorMessage}`);

    return;
  }

  const workerNameResponse: CliMenuInteractiveSettingsFlowWorkerNameResponse = await prompts({
    type: 'text',
    name: 'worker_name',
    message: 'Worker name:',
    initial: currentSettings['worker_name'],
    validate: (value) => value.trim().length > 0 || 'Worker name is required',
  });

  const workerName: CliMenuInteractiveSettingsFlowWorkerName = workerNameResponse['worker_name'];

  if (workerName === undefined) {
    return;
  }

  const baseDomainResponse: CliMenuInteractiveSettingsFlowBaseDomainResponse = await prompts({
    type: 'text',
    name: 'base_domain',
    message: 'Base domain:',
    initial: currentSettings['base_domain'],
    validate: (value) => value.trim().length > 0 || 'Base domain is required',
  });

  const baseDomain: CliMenuInteractiveSettingsFlowBaseDomain = baseDomainResponse['base_domain'];

  if (baseDomain === undefined) {
    return;
  }

  const showResponseOutputResponse: CliMenuInteractiveSettingsFlowShowResponseOutputResponse = await prompts({
    type: 'confirm',
    name: 'show_response_output',
    message: 'Show response output (debug mode)?',
    initial: currentSettings['show_response_output'],
  });

  const showResponseOutput: CliMenuInteractiveSettingsFlowShowResponseOutput = showResponseOutputResponse['show_response_output'];

  if (showResponseOutput === undefined) {
    return;
  }

  try {
    updateSettings(configPath, {
      worker_name: workerName as CliMenuInteractiveSettingsFlowWorkerNameAsString,
      base_domain: baseDomain as CliMenuInteractiveSettingsFlowBaseDomainAsString,
      show_response_output: showResponseOutput as CliMenuInteractiveSettingsFlowShowResponseOutputAsBoolean,
    });

    Logger.info('Settings updated.');
  } catch (error) {
    const errorMessage: CliMenuInteractiveSettingsFlowErrorMessage = (error instanceof Error) ? error.message : String(error);

    Logger.error(`Error: ${errorMessage}`);
  }

  return;
}

export {
  interactiveMenu,
};
