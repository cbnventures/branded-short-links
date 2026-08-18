import {
  existsSync, mkdtempSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';

import { interactiveMenu } from '../../../cli/menu/interactive.js';

import type {
  Tests_Cli_Menu_Interactive_Chalk_ChalkDefault,
  Tests_Cli_Menu_Interactive_ChalkIdentity_Returns,
  Tests_Cli_Menu_Interactive_ChalkIdentity_S,
  Tests_Cli_Menu_Interactive_CliCommandsDeployJs_Deploy,
  Tests_Cli_Menu_Interactive_CliCommandsLinksJs_AddLink,
  Tests_Cli_Menu_Interactive_CliCommandsLinksJs_EditLink,
  Tests_Cli_Menu_Interactive_CliCommandsLinksJs_GetFallbackUrl,
  Tests_Cli_Menu_Interactive_CliCommandsLinksJs_ListLinks,
  Tests_Cli_Menu_Interactive_CliCommandsLinksJs_RemoveLink,
  Tests_Cli_Menu_Interactive_CliCommandsLinksJs_SetFallbackUrl,
  Tests_Cli_Menu_Interactive_CliCommandsSettingsJs_GetSettings,
  Tests_Cli_Menu_Interactive_CliCommandsSettingsJs_UpdateSettings,
  Tests_Cli_Menu_Interactive_CliCommandsTrackersJs_AddTracker,
  Tests_Cli_Menu_Interactive_CliCommandsTrackersJs_EditTracker,
  Tests_Cli_Menu_Interactive_CliCommandsTrackersJs_ListTrackers,
  Tests_Cli_Menu_Interactive_CliCommandsTrackersJs_RemoveTracker,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ConfigJson,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ConfigPath,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtLinkEditHTTPResponseAbortsWithoutWriting_EditLinkMock,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtLinkEditHTTPResponseAbortsWithoutWriting_LinksModule,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtLinkEditHTTPResponseAbortsWithoutWriting_MockPrompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtLinkEditHTTPResponseAbortsWithoutWriting_Prompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtLinkEditHTTPResponseAbortsWithoutWriting_PromptsDefaultUnknown,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_EditTrackerMock,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_MockPrompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_Prompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_PromptsDefaultUnknown,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_RemoveTrackerMock,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_TrackersModule,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsGracefullyWhenCTRLCUndefinedAction_MockPrompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsGracefullyWhenCTRLCUndefinedAction_Prompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsGracefullyWhenCTRLCUndefinedAction_PromptsDefaultUnknown,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsImmediatelyWhenUserSelectsExit_ExpectedMenu,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsImmediatelyWhenUserSelectsExit_MockPrompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsImmediatelyWhenUserSelectsExit_Prompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsImmediatelyWhenUserSelectsExit_PromptsDefaultUnknown,
  Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_Call,
  Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_Choices,
  Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_LastChoice,
  Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_MockPrompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_Prompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_PromptsDefaultUnknown,
  Tests_Cli_Menu_Interactive_InteractiveMenu_MainMenuHasExactly5Choices_Call,
  Tests_Cli_Menu_Interactive_InteractiveMenu_MainMenuHasExactly5Choices_MockPrompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_MainMenuHasExactly5Choices_Prompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_MainMenuHasExactly5Choices_PromptsDefaultUnknown,
  Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToLinksSubmenuAndBack_ExpectedChoices,
  Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToLinksSubmenuAndBack_LinksMenuCall,
  Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToLinksSubmenuAndBack_MockPrompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToLinksSubmenuAndBack_Prompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToLinksSubmenuAndBack_PromptsDefaultUnknown,
  Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToSettingsFlowAndBack_MockPrompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToSettingsFlowAndBack_Prompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToSettingsFlowAndBack_PromptsDefaultUnknown,
  Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToSettingsFlowAndBack_SettingsCall,
  Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToTrackersSubmenuAndBack_ExpectedChoices,
  Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToTrackersSubmenuAndBack_MockPrompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToTrackersSubmenuAndBack_Prompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToTrackersSubmenuAndBack_PromptsDefaultUnknown,
  Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToTrackersSubmenuAndBack_TrackersMenuCall,
  Tests_Cli_Menu_Interactive_InteractiveMenu_OsTmpDir,
  Tests_Cli_Menu_Interactive_InteractiveMenu_TempDir,
  Tests_Cli_Menu_Interactive_InteractiveMenu_TempDirPath,
  Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_Call,
  Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_Choices,
  Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_LastChoice,
  Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_MockPrompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_Prompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_PromptsDefaultUnknown,
  Tests_Cli_Menu_Interactive_Prompts_PromptsDefault,
  Tests_Cli_Menu_Interactive_ValidConfig,
} from '../../../types/tests/cli/menu/interactive.test.d.ts';

function chalkIdentity(s: Tests_Cli_Menu_Interactive_ChalkIdentity_S): Tests_Cli_Menu_Interactive_ChalkIdentity_Returns {
  return s;
}

vi.mock('prompts', () => {
  const promptsDefault: Tests_Cli_Menu_Interactive_Prompts_PromptsDefault = vi.fn();

  return {
    default: promptsDefault,
  };
});

vi.mock('chalk', () => {
  const chalkDefault: Tests_Cli_Menu_Interactive_Chalk_ChalkDefault = {
    cyan: chalkIdentity,
    dim: chalkIdentity,
    green: chalkIdentity,
    gray: chalkIdentity,
    red: chalkIdentity,
    redBright: chalkIdentity,
    white: chalkIdentity,
    yellow: chalkIdentity,
  };

  return {
    default: chalkDefault,
  };
});

vi.mock('../../../cli/commands/deploy.js', () => {
  const deploy: Tests_Cli_Menu_Interactive_CliCommandsDeployJs_Deploy = vi.fn();

  return {
    deploy,
  };
});

vi.mock('../../../cli/commands/links.js', () => {
  const addLink: Tests_Cli_Menu_Interactive_CliCommandsLinksJs_AddLink = vi.fn();

  const editLink: Tests_Cli_Menu_Interactive_CliCommandsLinksJs_EditLink = vi.fn();

  const getFallbackUrl: Tests_Cli_Menu_Interactive_CliCommandsLinksJs_GetFallbackUrl = vi.fn().mockReturnValue('https://example.com/fallback');

  const listLinks: Tests_Cli_Menu_Interactive_CliCommandsLinksJs_ListLinks = vi.fn().mockReturnValue([{
    shortcode: '/gh',
    http_response: 302 as const,
    redirect_url: 'https://github.com/example',
  }]);

  const removeLink: Tests_Cli_Menu_Interactive_CliCommandsLinksJs_RemoveLink = vi.fn();

  const setFallbackUrl: Tests_Cli_Menu_Interactive_CliCommandsLinksJs_SetFallbackUrl = vi.fn();

  return {
    addLink,
    editLink,
    getFallbackUrl,
    listLinks,
    removeLink,
    setFallbackUrl,
  };
});

vi.mock('../../../cli/commands/settings.js', () => {
  const getSettings: Tests_Cli_Menu_Interactive_CliCommandsSettingsJs_GetSettings = vi.fn().mockReturnValue({
    worker_name: 'test-worker',
    base_domain: 'bsl.example.com',
    show_response_output: false,
  });

  const updateSettings: Tests_Cli_Menu_Interactive_CliCommandsSettingsJs_UpdateSettings = vi.fn();

  return {
    getSettings,
    updateSettings,
  };
});

vi.mock('../../../cli/commands/trackers.js', () => {
  const addTracker: Tests_Cli_Menu_Interactive_CliCommandsTrackersJs_AddTracker = vi.fn();

  const editTracker: Tests_Cli_Menu_Interactive_CliCommandsTrackersJs_EditTracker = vi.fn();

  const listTrackers: Tests_Cli_Menu_Interactive_CliCommandsTrackersJs_ListTrackers = vi.fn().mockReturnValue([{
    name: 'GA4 Tracker',
    type: 'ga4',
    measurement_id: 'G-TEST123',
    api_secret: 'secret123',
  }]);

  const removeTracker: Tests_Cli_Menu_Interactive_CliCommandsTrackersJs_RemoveTracker = vi.fn();

  return {
    addTracker,
    editTracker,
    listTrackers,
    removeTracker,
  };
});

const validConfig: Tests_Cli_Menu_Interactive_ValidConfig = {
  settings: {
    worker_name: 'test-worker',
    base_domain: 'bsl.example.com',
    show_response_output: false,
  },
  links: {
    fallback_url: 'https://example.com',
    items: [{
      shortcode: '/gh',
      http_response: 302 as const,
      redirect_url: 'https://github.com/example',
    }],
  },
  trackers: [],
};

describe('interactiveMenu', () => {
  let tempDir: Tests_Cli_Menu_Interactive_InteractiveMenu_TempDir = undefined;
  let configPath: Tests_Cli_Menu_Interactive_InteractiveMenu_ConfigPath = undefined;

  beforeEach(() => {
    vi.clearAllMocks();

    const osTmpDir: Tests_Cli_Menu_Interactive_InteractiveMenu_OsTmpDir = tmpdir();
    const tempDirPath: Tests_Cli_Menu_Interactive_InteractiveMenu_TempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: Tests_Cli_Menu_Interactive_InteractiveMenu_ConfigJson = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath, configJson);

    return;
  });

  afterEach(() => {
    if (tempDir !== undefined && existsSync(tempDir) === true) {
      rmSync(tempDir, { recursive: true });
    }

    return;
  });

  it('is exported as a function', () => {
    expect(typeof interactiveMenu).toBe('function');

    return;
  });

  it('exits immediately when user selects Exit', async () => {
    const prompts: Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsImmediatelyWhenUserSelectsExit_Prompts = await import('prompts');
    const promptsDefaultUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsImmediatelyWhenUserSelectsExit_PromptsDefaultUnknown = prompts['default'];
    const mockPrompts: Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsImmediatelyWhenUserSelectsExit_MockPrompts = promptsDefaultUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsImmediatelyWhenUserSelectsExit_MockPrompts;

    mockPrompts.mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir!]);

    expect(prompts['default']).toHaveBeenCalledTimes(1);

    const expectedMenu: Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsImmediatelyWhenUserSelectsExit_ExpectedMenu = expect.objectContaining({
      type: 'select',
      name: 'action',
      choices: expect.arrayContaining([
        expect.objectContaining({
          title: 'Manage Links',
          value: 'links',
        }),
        expect.objectContaining({
          title: 'Manage Trackers',
          value: 'trackers',
        }),
        expect.objectContaining({
          title: 'Settings',
          value: 'settings',
        }),
        expect.objectContaining({
          title: 'Deploy',
          value: 'deploy',
        }),
        expect.objectContaining({
          title: 'Exit',
          value: 'exit',
        }),
      ]),
    });

    expect(prompts['default']).toHaveBeenCalledWith(expectedMenu);

    return;
  });

  it('exits gracefully when CTRL+C (undefined action)', async () => {
    const prompts: Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsGracefullyWhenCTRLCUndefinedAction_Prompts = await import('prompts');
    const promptsDefaultUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsGracefullyWhenCTRLCUndefinedAction_PromptsDefaultUnknown = prompts['default'];
    const mockPrompts: Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsGracefullyWhenCTRLCUndefinedAction_MockPrompts = promptsDefaultUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsGracefullyWhenCTRLCUndefinedAction_MockPrompts;

    mockPrompts.mockResolvedValueOnce({ action: undefined });

    await interactiveMenu([tempDir!]);

    expect(prompts['default']).toHaveBeenCalledTimes(1);

    return;
  });

  it('main menu has exactly 5 choices', async () => {
    const prompts: Tests_Cli_Menu_Interactive_InteractiveMenu_MainMenuHasExactly5Choices_Prompts = await import('prompts');
    const promptsDefaultUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_MainMenuHasExactly5Choices_PromptsDefaultUnknown = prompts['default'];
    const mockPrompts: Tests_Cli_Menu_Interactive_InteractiveMenu_MainMenuHasExactly5Choices_MockPrompts = promptsDefaultUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_MainMenuHasExactly5Choices_MockPrompts;

    mockPrompts.mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir!]);

    const call: Tests_Cli_Menu_Interactive_InteractiveMenu_MainMenuHasExactly5Choices_Call = mockPrompts.mock.calls[0]![0] as Tests_Cli_Menu_Interactive_InteractiveMenu_MainMenuHasExactly5Choices_Call;

    expect(call['choices']).toHaveLength(5);

    return;
  });

  it('navigates to links submenu and back', async () => {
    const prompts: Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToLinksSubmenuAndBack_Prompts = await import('prompts');
    const promptsDefaultUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToLinksSubmenuAndBack_PromptsDefaultUnknown = prompts['default'];
    const mockPrompts: Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToLinksSubmenuAndBack_MockPrompts = promptsDefaultUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToLinksSubmenuAndBack_MockPrompts;

    mockPrompts
      .mockResolvedValueOnce({ action: 'links' })
      .mockResolvedValueOnce({ action: 'back' })
      .mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir!]);

    expect(prompts['default']).toHaveBeenCalledTimes(3);

    const linksMenuCall: Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToLinksSubmenuAndBack_LinksMenuCall = mockPrompts.mock.calls[1]![0] as Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToLinksSubmenuAndBack_LinksMenuCall;

    const expectedChoices: Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToLinksSubmenuAndBack_ExpectedChoices = expect.arrayContaining([
      expect.objectContaining({
        title: 'Add',
        value: 'add',
      }),
      expect.objectContaining({
        title: 'Edit',
        value: 'edit',
      }),
      expect.objectContaining({
        title: 'Remove',
        value: 'remove',
      }),
      expect.objectContaining({
        title: 'Set Fallback URL',
        value: 'fallback',
      }),
      expect.objectContaining({
        title: 'Go back',
        value: 'back',
      }),
    ]);

    expect(linksMenuCall['choices']).toEqual(expectedChoices);

    return;
  });

  it('navigates to trackers submenu and back', async () => {
    const prompts: Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToTrackersSubmenuAndBack_Prompts = await import('prompts');
    const promptsDefaultUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToTrackersSubmenuAndBack_PromptsDefaultUnknown = prompts['default'];
    const mockPrompts: Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToTrackersSubmenuAndBack_MockPrompts = promptsDefaultUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToTrackersSubmenuAndBack_MockPrompts;

    mockPrompts
      .mockResolvedValueOnce({ action: 'trackers' })
      .mockResolvedValueOnce({ action: 'back' })
      .mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir!]);

    expect(prompts['default']).toHaveBeenCalledTimes(3);

    const trackersMenuCall: Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToTrackersSubmenuAndBack_TrackersMenuCall = mockPrompts.mock.calls[1]![0] as Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToTrackersSubmenuAndBack_TrackersMenuCall;

    const expectedChoices: Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToTrackersSubmenuAndBack_ExpectedChoices = expect.arrayContaining([
      expect.objectContaining({
        title: 'Add',
        value: 'add',
      }),
      expect.objectContaining({
        title: 'Edit',
        value: 'edit',
      }),
      expect.objectContaining({
        title: 'Remove',
        value: 'remove',
      }),
      expect.objectContaining({
        title: 'Go back',
        value: 'back',
      }),
    ]);

    expect(trackersMenuCall['choices']).toEqual(expectedChoices);

    return;
  });

  it('navigates to settings flow and back', async () => {
    const prompts: Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToSettingsFlowAndBack_Prompts = await import('prompts');
    const promptsDefaultUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToSettingsFlowAndBack_PromptsDefaultUnknown = prompts['default'];
    const mockPrompts: Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToSettingsFlowAndBack_MockPrompts = promptsDefaultUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToSettingsFlowAndBack_MockPrompts;

    mockPrompts
      .mockResolvedValueOnce({ action: 'settings' })
      .mockResolvedValueOnce({ worker_name: 'test-worker' })
      .mockResolvedValueOnce({ base_domain: 'example.com' })
      .mockResolvedValueOnce({ show_response_output: false })
      .mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir!]);

    const settingsCall: Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToSettingsFlowAndBack_SettingsCall = mockPrompts.mock.calls[1]![0] as Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToSettingsFlowAndBack_SettingsCall;

    expect(settingsCall['name']).toBe('worker_name');

    return;
  });

  it('link edit select includes Go back as last choice', async () => {
    const prompts: Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_Prompts = await import('prompts');
    const promptsDefaultUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_PromptsDefaultUnknown = prompts['default'];
    const mockPrompts: Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_MockPrompts = promptsDefaultUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_MockPrompts;

    mockPrompts
      .mockResolvedValueOnce({ action: 'links' })
      .mockResolvedValueOnce({ action: 'edit' })
      .mockResolvedValueOnce({ shortcode: 'back' })
      .mockResolvedValueOnce({ action: 'back' })
      .mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir!]);

    const call: Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_Call = mockPrompts.mock.calls[2]![0] as Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_Call;
    const choices: Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_Choices = call['choices'] as Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_Choices;
    const lastChoice: Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_LastChoice = choices[choices.length - 1] as Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_LastChoice;

    expect(lastChoice).toEqual(expect.objectContaining({
      title: 'Go back',
      value: 'back',
    }));

    return;
  });

  it('tracker edit select includes Go back as last choice', async () => {
    const prompts: Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_Prompts = await import('prompts');
    const promptsDefaultUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_PromptsDefaultUnknown = prompts['default'];
    const mockPrompts: Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_MockPrompts = promptsDefaultUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_MockPrompts;

    mockPrompts
      .mockResolvedValueOnce({ action: 'trackers' })
      .mockResolvedValueOnce({ action: 'edit' })
      .mockResolvedValueOnce({ name: 'back' })
      .mockResolvedValueOnce({ action: 'back' })
      .mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir!]);

    const call: Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_Call = mockPrompts.mock.calls[2]![0] as Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_Call;
    const choices: Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_Choices = call['choices'] as Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_Choices;
    const lastChoice: Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_LastChoice = choices[choices.length - 1] as Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_LastChoice;

    expect(lastChoice).toEqual(expect.objectContaining({
      title: 'Go back',
      value: 'back',
    }));

    return;
  });

  it('Ctrl+C at link edit HTTP response aborts without writing', async () => {
    const prompts: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtLinkEditHTTPResponseAbortsWithoutWriting_Prompts = await import('prompts');
    const promptsDefaultUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtLinkEditHTTPResponseAbortsWithoutWriting_PromptsDefaultUnknown = prompts['default'];
    const mockPrompts: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtLinkEditHTTPResponseAbortsWithoutWriting_MockPrompts = promptsDefaultUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtLinkEditHTTPResponseAbortsWithoutWriting_MockPrompts;

    mockPrompts
      .mockResolvedValueOnce({ action: 'links' })
      .mockResolvedValueOnce({ action: 'edit' })
      .mockResolvedValueOnce({ shortcode: '/gh' })
      .mockResolvedValueOnce({ http_response: undefined })
      .mockResolvedValueOnce({ action: 'back' })
      .mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir!]);

    const linksModule: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtLinkEditHTTPResponseAbortsWithoutWriting_LinksModule = await import('../../../cli/commands/links.js');
    const editLinkMock: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtLinkEditHTTPResponseAbortsWithoutWriting_EditLinkMock = linksModule['editLink'] as Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtLinkEditHTTPResponseAbortsWithoutWriting_EditLinkMock;

    expect(editLinkMock).not.toHaveBeenCalled();

    return;
  });

  it('Ctrl+C at tracker edit type change aborts without writing', async () => {
    const prompts: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_Prompts = await import('prompts');
    const promptsDefaultUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_PromptsDefaultUnknown = prompts['default'];
    const mockPrompts: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_MockPrompts = promptsDefaultUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_MockPrompts;

    mockPrompts
      .mockResolvedValueOnce({ action: 'trackers' })
      .mockResolvedValueOnce({ action: 'edit' })
      .mockResolvedValueOnce({ name: 'GA4 Tracker' })
      .mockResolvedValueOnce({ newType: undefined })
      .mockResolvedValueOnce({ action: 'back' })
      .mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir!]);

    const trackersModule: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_TrackersModule = await import('../../../cli/commands/trackers.js');
    const editTrackerMock: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_EditTrackerMock = trackersModule['editTracker'] as Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_EditTrackerMock;
    const removeTrackerMock: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_RemoveTrackerMock = trackersModule['removeTracker'] as Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_RemoveTrackerMock;

    expect(editTrackerMock).not.toHaveBeenCalled();

    expect(removeTrackerMock).not.toHaveBeenCalled();

    return;
  });

  return;
});
