import prompts from 'prompts';

import type { ExpectStatic, vi } from 'vitest';

import type { interactiveMenu } from '../../../../cli/menu/interactive.js';

import type { Lib_Schema_Config } from '../../../lib/schema.d.ts';

/**
 * Tests - CLI - Menu - Interactive.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_ValidConfig = Lib_Schema_Config & {};

/**
 * Tests - CLI - Menu - Interactive - Chalk.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_Chalk_ChalkDefault = Record<string, (input: string) => string>;

/**
 * Tests - CLI - Menu - Interactive - Chalk Identity.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_ChalkIdentity_S = string;

export type Tests_Cli_Menu_Interactive_ChalkIdentity_Returns = string;

/**
 * Tests - CLI - Menu - Interactive - Cli Commands Deploy Js.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_CliCommandsDeployJs_Deploy = ReturnType<typeof vi['fn']>;

/**
 * Tests - CLI - Menu - Interactive - Cli Commands Links Js.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_CliCommandsLinksJs_AddLink = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CliCommandsLinksJs_EditLink = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CliCommandsLinksJs_GetFallbackUrl = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CliCommandsLinksJs_ListLinks = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CliCommandsLinksJs_RemoveLink = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CliCommandsLinksJs_SetFallbackUrl = ReturnType<typeof vi['fn']>;

/**
 * Tests - CLI - Menu - Interactive - Cli Commands Settings Js.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_CliCommandsSettingsJs_GetSettings = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CliCommandsSettingsJs_UpdateSettings = ReturnType<typeof vi['fn']>;

/**
 * Tests - CLI - Menu - Interactive - Cli Commands Trackers Js.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_CliCommandsTrackersJs_AddTracker = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CliCommandsTrackersJs_EditTracker = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CliCommandsTrackersJs_ListTrackers = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CliCommandsTrackersJs_RemoveTracker = ReturnType<typeof vi['fn']>;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_TempDir = string | undefined;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ConfigPath = string | undefined;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_OsTmpDir = string;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_TempDirPath = string;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ConfigJson = string;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Ctrl C At Link Edit HTTP Response Aborts Without Writing.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtLinkEditHTTPResponseAbortsWithoutWriting_Prompts_Default = typeof prompts;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtLinkEditHTTPResponseAbortsWithoutWriting_Prompts = {
  default: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtLinkEditHTTPResponseAbortsWithoutWriting_Prompts_Default;
};

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtLinkEditHTTPResponseAbortsWithoutWriting_PromptsDefaultUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtLinkEditHTTPResponseAbortsWithoutWriting_MockPrompts = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtLinkEditHTTPResponseAbortsWithoutWriting_LinksModule = Record<string, unknown>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtLinkEditHTTPResponseAbortsWithoutWriting_EditLinkMock = ReturnType<typeof vi['fn']>;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Ctrl C At Tracker Edit Type Change Aborts Without Writing.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_Prompts_Default = typeof prompts;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_Prompts = {
  default: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_Prompts_Default;
};

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_PromptsDefaultUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_MockPrompts = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_TrackersModule = Record<string, unknown>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_EditTrackerMock = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtTrackerEditTypeChangeAbortsWithoutWriting_RemoveTrackerMock = ReturnType<typeof vi['fn']>;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Exits Gracefully When CTRL C Undefined Action.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsGracefullyWhenCTRLCUndefinedAction_Prompts_Default = typeof prompts;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsGracefullyWhenCTRLCUndefinedAction_Prompts = {
  default: Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsGracefullyWhenCTRLCUndefinedAction_Prompts_Default;
};

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsGracefullyWhenCTRLCUndefinedAction_PromptsDefaultUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsGracefullyWhenCTRLCUndefinedAction_MockPrompts = ReturnType<typeof vi['fn']>;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Exits Immediately When User Selects Exit.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsImmediatelyWhenUserSelectsExit_Prompts_Default = typeof prompts;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsImmediatelyWhenUserSelectsExit_Prompts = {
  default: Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsImmediatelyWhenUserSelectsExit_Prompts_Default;
};

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsImmediatelyWhenUserSelectsExit_PromptsDefaultUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsImmediatelyWhenUserSelectsExit_MockPrompts = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsImmediatelyWhenUserSelectsExit_ExpectedMenu = ReturnType<ExpectStatic['objectContaining']>;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Is Exported As A Function.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_IsExportedAsAFunction_InteractiveMenu = typeof interactiveMenu;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Link Edit Select Includes Go Back As Last Choice.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_Prompts_Default = typeof prompts;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_Prompts = {
  default: Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_Prompts_Default;
};

export type Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_PromptsDefaultUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_MockPrompts = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_Call = Record<string, unknown>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_Choices = unknown[];

export type Tests_Cli_Menu_Interactive_InteractiveMenu_LinkEditSelectIncludesGoBackAsLastChoice_LastChoice = Record<string, unknown>;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Main Menu Has Exactly 5 Choices.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_MainMenuHasExactly5Choices_Prompts_Default = typeof prompts;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_MainMenuHasExactly5Choices_Prompts = {
  default: Tests_Cli_Menu_Interactive_InteractiveMenu_MainMenuHasExactly5Choices_Prompts_Default;
};

export type Tests_Cli_Menu_Interactive_InteractiveMenu_MainMenuHasExactly5Choices_PromptsDefaultUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_MainMenuHasExactly5Choices_MockPrompts = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_MainMenuHasExactly5Choices_Call = Record<string, unknown>;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Navigates To Links Submenu And Back.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToLinksSubmenuAndBack_Prompts_Default = typeof prompts;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToLinksSubmenuAndBack_Prompts = {
  default: Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToLinksSubmenuAndBack_Prompts_Default;
};

export type Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToLinksSubmenuAndBack_PromptsDefaultUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToLinksSubmenuAndBack_MockPrompts = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToLinksSubmenuAndBack_LinksMenuCall = Record<string, unknown>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToLinksSubmenuAndBack_ExpectedChoices = ReturnType<ExpectStatic['arrayContaining']>;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Navigates To Settings Flow And Back.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToSettingsFlowAndBack_Prompts_Default = typeof prompts;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToSettingsFlowAndBack_Prompts = {
  default: Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToSettingsFlowAndBack_Prompts_Default;
};

export type Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToSettingsFlowAndBack_PromptsDefaultUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToSettingsFlowAndBack_MockPrompts = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToSettingsFlowAndBack_SettingsCall = Record<string, unknown>;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Navigates To Trackers Submenu And Back.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToTrackersSubmenuAndBack_Prompts_Default = typeof prompts;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToTrackersSubmenuAndBack_Prompts = {
  default: Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToTrackersSubmenuAndBack_Prompts_Default;
};

export type Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToTrackersSubmenuAndBack_PromptsDefaultUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToTrackersSubmenuAndBack_MockPrompts = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToTrackersSubmenuAndBack_TrackersMenuCall = Record<string, unknown>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_NavigatesToTrackersSubmenuAndBack_ExpectedChoices = ReturnType<ExpectStatic['arrayContaining']>;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Tracker Edit Select Includes Go Back As Last Choice.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_Prompts_Default = typeof prompts;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_Prompts = {
  default: Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_Prompts_Default;
};

export type Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_PromptsDefaultUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_MockPrompts = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_Call = Record<string, unknown>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_Choices = unknown[];

export type Tests_Cli_Menu_Interactive_InteractiveMenu_TrackerEditSelectIncludesGoBackAsLastChoice_LastChoice = Record<string, unknown>;

/**
 * Tests - CLI - Menu - Interactive - Prompts.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_Prompts_PromptsDefault = ReturnType<typeof vi['fn']>;
