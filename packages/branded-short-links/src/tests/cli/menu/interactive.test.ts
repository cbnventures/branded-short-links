import {
  existsSync, mkdtempSync, rmSync, writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';

import { interactiveMenu } from '../../../cli/menu/interactive.js';

import type {
  TestsCliMenuInteractiveChalkParam,
  TestsCliMenuInteractiveConfigJson,
  TestsCliMenuInteractiveConfigPath,
  TestsCliMenuInteractiveExpectedChoices,
  TestsCliMenuInteractiveExpectedMenu,
  TestsCliMenuInteractiveMenuCall,
  TestsCliMenuInteractiveMockFn,
  TestsCliMenuInteractivePromptsModule,
  TestsCliMenuInteractiveSettingsCall,
  TestsCliMenuInteractiveTempDir,
  TestsCliMenuInteractiveTempDirPath,
  TestsCliMenuInteractiveUnknown,
  TestsCliMenuInteractiveValidConfig,
} from '../../../types/tests/cli/menu/interactive.test.d.ts';

vi.mock('prompts', () => ({
  default: vi.fn(),
}));

vi.mock('chalk', () => {
  return {
    default: {
      cyan: (s: TestsCliMenuInteractiveChalkParam) => {
        return s;
      },
      dim: (s: TestsCliMenuInteractiveChalkParam) => {
        return s;
      },
      green: (s: TestsCliMenuInteractiveChalkParam) => {
        return s;
      },
      gray: (s: TestsCliMenuInteractiveChalkParam) => {
        return s;
      },
      red: (s: TestsCliMenuInteractiveChalkParam) => {
        return s;
      },
      redBright: (s: TestsCliMenuInteractiveChalkParam) => {
        return s;
      },
      white: (s: TestsCliMenuInteractiveChalkParam) => {
        return s;
      },
      yellow: (s: TestsCliMenuInteractiveChalkParam) => {
        return s;
      },
    },
  };
});

const validConfig: TestsCliMenuInteractiveValidConfig = {
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
  let tempDir: TestsCliMenuInteractiveTempDir = undefined;
  let configPath: TestsCliMenuInteractiveConfigPath = undefined;

  beforeEach(() => {
    vi.clearAllMocks();

    const osTmpDir: TestsCliMenuInteractiveTempDirPath = tmpdir();
    const tempDirPath: TestsCliMenuInteractiveTempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: TestsCliMenuInteractiveConfigJson = JSON.stringify(validConfig, null, 2);

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
    const prompts: TestsCliMenuInteractivePromptsModule = await import('prompts');
    const promptsDefaultUnknown: TestsCliMenuInteractiveUnknown = prompts['default'];
    const mockPrompts: TestsCliMenuInteractiveMockFn = promptsDefaultUnknown as TestsCliMenuInteractiveMockFn;

    mockPrompts.mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir!]);

    expect(prompts['default']).toHaveBeenCalledTimes(1);

    const expectedMenu: TestsCliMenuInteractiveExpectedMenu = expect.objectContaining({
      type: 'select',
      name: 'action',
      choices: expect.arrayContaining([
        expect.objectContaining({
          title: 'Manage Links', value: 'links',
        }),
        expect.objectContaining({
          title: 'Manage Trackers', value: 'trackers',
        }),
        expect.objectContaining({
          title: 'Settings', value: 'settings',
        }),
        expect.objectContaining({
          title: 'Deploy', value: 'deploy',
        }),
        expect.objectContaining({
          title: 'Exit', value: 'exit',
        }),
      ]),
    });

    expect(prompts['default']).toHaveBeenCalledWith(expectedMenu);

    return;
  });

  it('exits gracefully when CTRL+C (undefined action)', async () => {
    const prompts: TestsCliMenuInteractivePromptsModule = await import('prompts');
    const promptsDefaultUnknown: TestsCliMenuInteractiveUnknown = prompts['default'];
    const mockPrompts: TestsCliMenuInteractiveMockFn = promptsDefaultUnknown as TestsCliMenuInteractiveMockFn;

    mockPrompts.mockResolvedValueOnce({ action: undefined });

    await interactiveMenu([tempDir!]);

    expect(prompts['default']).toHaveBeenCalledTimes(1);

    return;
  });

  it('main menu has exactly 5 choices', async () => {
    const prompts: TestsCliMenuInteractivePromptsModule = await import('prompts');
    const promptsDefaultUnknown: TestsCliMenuInteractiveUnknown = prompts['default'];
    const mockPrompts: TestsCliMenuInteractiveMockFn = promptsDefaultUnknown as TestsCliMenuInteractiveMockFn;

    mockPrompts.mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir!]);

    const call: TestsCliMenuInteractiveMenuCall = mockPrompts.mock.calls[0]![0] as TestsCliMenuInteractiveMenuCall;

    expect(call['choices']).toHaveLength(5);

    return;
  });

  it('navigates to links submenu and back', async () => {
    const prompts: TestsCliMenuInteractivePromptsModule = await import('prompts');
    const promptsDefaultUnknown: TestsCliMenuInteractiveUnknown = prompts['default'];
    const mockPrompts: TestsCliMenuInteractiveMockFn = promptsDefaultUnknown as TestsCliMenuInteractiveMockFn;

    mockPrompts
      .mockResolvedValueOnce({ action: 'links' })
      .mockResolvedValueOnce({ action: 'back' })
      .mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir!]);

    expect(prompts['default']).toHaveBeenCalledTimes(3);

    const linksMenuCall: TestsCliMenuInteractiveMenuCall = mockPrompts.mock.calls[1]![0] as TestsCliMenuInteractiveMenuCall;

    const expectedChoices: TestsCliMenuInteractiveExpectedChoices = expect.arrayContaining([
      expect.objectContaining({
        title: 'Add', value: 'add',
      }),
      expect.objectContaining({
        title: 'Edit', value: 'edit',
      }),
      expect.objectContaining({
        title: 'Remove', value: 'remove',
      }),
      expect.objectContaining({
        title: 'Set Fallback URL', value: 'fallback',
      }),
      expect.objectContaining({
        title: 'Back', value: 'back',
      }),
    ]);

    expect(linksMenuCall['choices']).toEqual(expectedChoices);

    return;
  });

  it('navigates to trackers submenu and back', async () => {
    const prompts: TestsCliMenuInteractivePromptsModule = await import('prompts');
    const promptsDefaultUnknown: TestsCliMenuInteractiveUnknown = prompts['default'];
    const mockPrompts: TestsCliMenuInteractiveMockFn = promptsDefaultUnknown as TestsCliMenuInteractiveMockFn;

    mockPrompts
      .mockResolvedValueOnce({ action: 'trackers' })
      .mockResolvedValueOnce({ action: 'back' })
      .mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir!]);

    expect(prompts['default']).toHaveBeenCalledTimes(3);

    const trackersMenuCall: TestsCliMenuInteractiveMenuCall = mockPrompts.mock.calls[1]![0] as TestsCliMenuInteractiveMenuCall;

    const expectedChoices: TestsCliMenuInteractiveExpectedChoices = expect.arrayContaining([
      expect.objectContaining({
        title: 'Add', value: 'add',
      }),
      expect.objectContaining({
        title: 'Edit', value: 'edit',
      }),
      expect.objectContaining({
        title: 'Remove', value: 'remove',
      }),
      expect.objectContaining({
        title: 'Back', value: 'back',
      }),
    ]);

    expect(trackersMenuCall['choices']).toEqual(expectedChoices);

    return;
  });

  it('navigates to settings flow and back', async () => {
    const prompts: TestsCliMenuInteractivePromptsModule = await import('prompts');
    const promptsDefaultUnknown: TestsCliMenuInteractiveUnknown = prompts['default'];
    const mockPrompts: TestsCliMenuInteractiveMockFn = promptsDefaultUnknown as TestsCliMenuInteractiveMockFn;

    mockPrompts
      .mockResolvedValueOnce({ action: 'settings' })
      .mockResolvedValueOnce({ worker_name: 'test-worker' })
      .mockResolvedValueOnce({ base_domain: 'example.com' })
      .mockResolvedValueOnce({ show_response_output: false })
      .mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir!]);

    const settingsCall: TestsCliMenuInteractiveSettingsCall = mockPrompts.mock.calls[1]![0] as TestsCliMenuInteractiveSettingsCall;

    expect(settingsCall['name']).toBe('worker_name');

    return;
  });

  return;
});
