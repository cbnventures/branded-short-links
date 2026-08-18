import type { Lib_Schema_Config } from '../../lib/schema.d.ts';

/**
 * Worker - Landing - Page.
 *
 * @since 2.0.0
 */
export type Worker_Landing_Page_SharedStyles = string;

export type Worker_Landing_Page_GithubIcon = string;

export type Worker_Landing_Page_LinkIcon = string;

export type Worker_Landing_Page_AlertIcon = string;

/**
 * Worker - Landing - Page - Escape Html.
 *
 * @since 2.0.3
 */
export type Worker_Landing_Page_EscapeHtml_Input = string;

export type Worker_Landing_Page_EscapeHtml_Returns = string;

/**
 * Worker - Landing - Page - Landing Page.
 *
 * @since 2.0.0
 */
export type Worker_Landing_Page_LandingPage_Config = Lib_Schema_Config;

export type Worker_Landing_Page_LandingPage_Returns = Response;

export type Worker_Landing_Page_LandingPage_MaskedJson = string;

export type Worker_Landing_Page_LandingPage_DebugHtml = string;

export type Worker_Landing_Page_LandingPage_Html = string;

/**
 * Worker - Landing - Page - Mask Config.
 *
 * @since 2.0.0
 */
export type Worker_Landing_Page_MaskConfig_Config = Lib_Schema_Config;

export type Worker_Landing_Page_MaskConfig_Returns = Record<string, unknown>;

/**
 * Worker - Landing - Page - Mask Value.
 *
 * @since 2.0.0
 */
export type Worker_Landing_Page_MaskValue_Value = string;

export type Worker_Landing_Page_MaskValue_Returns = string;

/**
 * Worker - Landing - Page - Not Found Page.
 *
 * @since 2.0.0
 */
export type Worker_Landing_Page_NotFoundPage_Config = Lib_Schema_Config;

export type Worker_Landing_Page_NotFoundPage_Returns = Response;

export type Worker_Landing_Page_NotFoundPage_MaskedJson = string;

export type Worker_Landing_Page_NotFoundPage_DebugHtml = string;

export type Worker_Landing_Page_NotFoundPage_Html = string;
