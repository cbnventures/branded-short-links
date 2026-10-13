import type { Lib_Schema_Config } from '../../lib/schema.d.ts';
import type { Worker_AppApi_HandleAppLinksRequest_ResponseBody } from '../../worker/app-api.d.ts';

/**
 * Tests - Worker - App API.
 *
 * @since 2.1.0
 */
export type Tests_Worker_AppApi_MockConfig = Lib_Schema_Config & {};

/**
 * Tests - Worker - App API - Create Mock Ctx.
 *
 * @since 2.1.0
 */
export type Tests_Worker_AppApi_CreateMockCtx_Returns = ExecutionContext;

export type Tests_Worker_AppApi_CreateMockCtx_Opaque = unknown;

/**
 * Tests - Worker - App API - Handle App Links Request.
 *
 * @since 2.1.0
 */
export type Tests_Worker_AppApi_HandleAppLinksRequest_Returns = void;

/**
 * Tests - Worker - App API - Handle App Links Request - Hides Login Credentials While Returning Deployment Config.
 *
 * @since 2.1.0
 */
export type Tests_Worker_AppApi_HandleAppLinksRequest_HidesLoginCredentialsWhileReturningDeploymentConfig_Request = Request;

export type Tests_Worker_AppApi_HandleAppLinksRequest_HidesLoginCredentialsWhileReturningDeploymentConfig_Response = Response;

export type Tests_Worker_AppApi_HandleAppLinksRequest_HidesLoginCredentialsWhileReturningDeploymentConfig_Body = string;

export type Tests_Worker_AppApi_HandleAppLinksRequest_HidesLoginCredentialsWhileReturningDeploymentConfig_Json = Worker_AppApi_HandleAppLinksRequest_ResponseBody & {};

/**
 * Tests - Worker - App API - Handle App Links Request - Returns 404 When App Access Is Disabled.
 *
 * @since 2.1.0
 */
export type Tests_Worker_AppApi_HandleAppLinksRequest_Returns404WhenAppAccessIsDisabled_DisabledConfig = Lib_Schema_Config & {};

export type Tests_Worker_AppApi_HandleAppLinksRequest_Returns404WhenAppAccessIsDisabled_Request = Request;

export type Tests_Worker_AppApi_HandleAppLinksRequest_Returns404WhenAppAccessIsDisabled_Response = Response;

/**
 * Tests - Worker - App API - Handle App Links Request - Returns 405 For Write Methods.
 *
 * @since 2.1.0
 */
export type Tests_Worker_AppApi_HandleAppLinksRequest_Returns405ForWriteMethods_Request = Request;

export type Tests_Worker_AppApi_HandleAppLinksRequest_Returns405ForWriteMethods_Response = Response;

/**
 * Tests - Worker - App API - Handle App Links Request - Returns An Empty Body For HEAD.
 *
 * @since 2.1.0
 */
export type Tests_Worker_AppApi_HandleAppLinksRequest_ReturnsAnEmptyBodyForHEAD_Request = Request;

export type Tests_Worker_AppApi_HandleAppLinksRequest_ReturnsAnEmptyBodyForHEAD_Response = Response;

export type Tests_Worker_AppApi_HandleAppLinksRequest_ReturnsAnEmptyBodyForHEAD_Text = string;

/**
 * Tests - Worker - App API - Handle App Links Request - Uses A Generic Authentication Failure.
 *
 * @since 2.1.0
 */
export type Tests_Worker_AppApi_HandleAppLinksRequest_UsesAGenericAuthenticationFailure_Request = Request;

export type Tests_Worker_AppApi_HandleAppLinksRequest_UsesAGenericAuthenticationFailure_Response = Response;
