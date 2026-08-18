import type { vi } from 'vitest';

import type { Lib_Schema_Config } from '../../lib/schema.d.ts';

/**
 * Tests - Worker - Handlers.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Handlers_MockConfig_Settings = Lib_Schema_Config['settings'];

export type Tests_Worker_Handlers_MockConfig_Links = Lib_Schema_Config['links'];

export type Tests_Worker_Handlers_MockConfig_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Handlers_MockConfig = {
  settings: Tests_Worker_Handlers_MockConfig_Settings;
  links: Tests_Worker_Handlers_MockConfig_Links;
  trackers: Tests_Worker_Handlers_MockConfig_Trackers;
};

/**
 * Tests - Worker - Handlers - Create Mock Ctx.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Handlers_CreateMockCtx_Returns = ExecutionContext;

/**
 * Tests - Worker - Handlers - Handle Request.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Handlers_HandleRequest_MockFetchFn = ReturnType<typeof vi.fn>;

/**
 * Tests - Worker - Handlers - Handle Request - Calls Wait Until With Fire Trackers For Valid Shortcode.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Handlers_HandleRequest_CallsWaitUntilWithFireTrackersForValidShortcode_Request = Request;

export type Tests_Worker_Handlers_HandleRequest_CallsWaitUntilWithFireTrackersForValidShortcode_Ctx = ExecutionContext;

/**
 * Tests - Worker - Handlers - Handle Request - Redirects Root To Fallback Url When Fallback Is Set.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Handlers_HandleRequest_RedirectsRootToFallbackUrlWhenFallbackIsSet_Request = Request;

export type Tests_Worker_Handlers_HandleRequest_RedirectsRootToFallbackUrlWhenFallbackIsSet_Ctx = ExecutionContext;

export type Tests_Worker_Handlers_HandleRequest_RedirectsRootToFallbackUrlWhenFallbackIsSet_Response = Response;

export type Tests_Worker_Handlers_HandleRequest_RedirectsRootToFallbackUrlWhenFallbackIsSet_Location = string | null;

/**
 * Tests - Worker - Handlers - Handle Request - Redirects Unknown Path To Fallback Url Preserving Path Query Hash.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Handlers_HandleRequest_RedirectsUnknownPathToFallbackUrlPreservingPathQueryHash_Request = Request;

export type Tests_Worker_Handlers_HandleRequest_RedirectsUnknownPathToFallbackUrlPreservingPathQueryHash_Ctx = ExecutionContext;

export type Tests_Worker_Handlers_HandleRequest_RedirectsUnknownPathToFallbackUrlPreservingPathQueryHash_Response = Response;

export type Tests_Worker_Handlers_HandleRequest_RedirectsUnknownPathToFallbackUrlPreservingPathQueryHash_Location = string | null;

/**
 * Tests - Worker - Handlers - Handle Request - Returns 404 Not Found Page For Unknown Path When No Fallback Url.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_NoFallbackConfig_Settings = Lib_Schema_Config['settings'];

export type Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_NoFallbackConfig_LinksItems = Lib_Schema_Config['links']['items'];

export type Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_NoFallbackConfig_Links = {
  items: Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_NoFallbackConfig_LinksItems;
};

export type Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_NoFallbackConfig_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_NoFallbackConfig = {
  settings: Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_NoFallbackConfig_Settings;
  links: Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_NoFallbackConfig_Links;
  trackers: Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_NoFallbackConfig_Trackers;
};

export type Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_Request = Request;

export type Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_Ctx = ExecutionContext;

export type Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_Response = Response;

export type Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_ContentType = string | null;

export type Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_Body = string;

/**
 * Tests - Worker - Handlers - Handle Request - Returns 405 For POST Request.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Handlers_HandleRequest_Returns405ForPOSTRequest_Request = Request;

export type Tests_Worker_Handlers_HandleRequest_Returns405ForPOSTRequest_Ctx = ExecutionContext;

export type Tests_Worker_Handlers_HandleRequest_Returns405ForPOSTRequest_Response = Response;

export type Tests_Worker_Handlers_HandleRequest_Returns405ForPOSTRequest_ContentType = string | null;

export type Tests_Worker_Handlers_HandleRequest_Returns405ForPOSTRequest_Body = Record<string, string>;

/**
 * Tests - Worker - Handlers - Handle Request - Returns Landing Page HTML For GET To Root When No Fallback Url.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_NoFallbackConfig_Settings = Lib_Schema_Config['settings'];

export type Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_NoFallbackConfig_LinksItems = Lib_Schema_Config['links']['items'];

export type Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_NoFallbackConfig_Links = {
  items: Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_NoFallbackConfig_LinksItems;
};

export type Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_NoFallbackConfig_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_NoFallbackConfig = {
  settings: Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_NoFallbackConfig_Settings;
  links: Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_NoFallbackConfig_Links;
  trackers: Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_NoFallbackConfig_Trackers;
};

export type Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_Request = Request;

export type Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_Ctx = ExecutionContext;

export type Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_Response = Response;

export type Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_ContentType = string | null;

export type Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_Body = string;

/**
 * Tests - Worker - Handlers - Handle Request - Returns Redirect With 301 For Docs Shortcode.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWith301ForDocsShortcode_Request = Request;

export type Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWith301ForDocsShortcode_Ctx = ExecutionContext;

export type Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWith301ForDocsShortcode_Response = Response;

export type Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWith301ForDocsShortcode_Location = string | null;

/**
 * Tests - Worker - Handlers - Handle Request - Returns Redirect With Correct Status Code For Valid Shortcode.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWithCorrectStatusCodeForValidShortcode_Request = Request;

export type Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWithCorrectStatusCodeForValidShortcode_Ctx = ExecutionContext;

export type Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWithCorrectStatusCodeForValidShortcode_Response = Response;

export type Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWithCorrectStatusCodeForValidShortcode_Location = string | null;

/**
 * Tests - Worker - Handlers - Handle Request - Strips Trailing Slash From Shortcode Path.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Handlers_HandleRequest_StripsTrailingSlashFromShortcodePath_Request = Request;

export type Tests_Worker_Handlers_HandleRequest_StripsTrailingSlashFromShortcodePath_Ctx = ExecutionContext;

export type Tests_Worker_Handlers_HandleRequest_StripsTrailingSlashFromShortcodePath_Response = Response;

export type Tests_Worker_Handlers_HandleRequest_StripsTrailingSlashFromShortcodePath_Location = string | null;
