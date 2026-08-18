import type {
  Lib_Schema_Config,
  Lib_Schema_LinkItemConfig,
} from '../lib/schema.d.ts';

/**
 * Worker - Handlers - Handle Request.
 *
 * @since 2.0.0
 */
export type Worker_Handlers_HandleRequest_Request = Request;

export type Worker_Handlers_HandleRequest_Config = Lib_Schema_Config;

export type Worker_Handlers_HandleRequest_Ctx = ExecutionContext;

export type Worker_Handlers_HandleRequest_Returns = Promise<Response>;

export type Worker_Handlers_HandleRequest_RequestUrl = URL;

export type Worker_Handlers_HandleRequest_Pathname = string;

export type Worker_Handlers_HandleRequest_Shortcode = Lib_Schema_LinkItemConfig | undefined;

export type Worker_Handlers_HandleRequest_FallbackUrl = URL;

export type Worker_Handlers_HandleRequest_RootResponse = Response;

export type Worker_Handlers_HandleRequest_RootLogPayload = string;

export type Worker_Handlers_HandleRequest_FallbackResponse = Response;

export type Worker_Handlers_HandleRequest_FallbackLogPayload = string;

export type Worker_Handlers_HandleRequest_FireTrackersPromise = Promise<void>;

export type Worker_Handlers_HandleRequest_RedirectResponse = Response;

export type Worker_Handlers_HandleRequest_RedirectLogPayload = string;
