import type {
  Lib_Schema_AppAccessConfig,
  Lib_Schema_AppAccessUserConfig,
  Lib_Schema_Config,
  Lib_Schema_LinkItemConfig,
} from '../lib/schema.d.ts';

/**
 * Worker - App API - Handle App Links Request.
 *
 * @since 2.1.0
 */
export type Worker_AppApi_HandleAppLinksRequest_Request = Request;

export type Worker_AppApi_HandleAppLinksRequest_Config = Lib_Schema_Config;

export type Worker_AppApi_HandleAppLinksRequest_Returns = Response;

export type Worker_AppApi_HandleAppLinksRequest_AppAccess = Lib_Schema_AppAccessConfig | undefined;

export type Worker_AppApi_HandleAppLinksRequest_Authorization = string | null;

export type Worker_AppApi_HandleAppLinksRequest_EncodedCredentials = string;

export type Worker_AppApi_HandleAppLinksRequest_DecodedCredentials = string | undefined;

export type Worker_AppApi_HandleAppLinksRequest_SeparatorIndex = number;

export type Worker_AppApi_HandleAppLinksRequest_Credentials_Username = string;

export type Worker_AppApi_HandleAppLinksRequest_Credentials_AccessKey = string;

export type Worker_AppApi_HandleAppLinksRequest_Credentials = {
  username: Worker_AppApi_HandleAppLinksRequest_Credentials_Username;
  accessKey: Worker_AppApi_HandleAppLinksRequest_Credentials_AccessKey;
};

export type Worker_AppApi_HandleAppLinksRequest_Username = string;

export type Worker_AppApi_HandleAppLinksRequest_AccessKey = string;

export type Worker_AppApi_HandleAppLinksRequest_MatchedUser = Lib_Schema_AppAccessUserConfig | undefined;

export type Worker_AppApi_HandleAppLinksRequest_BaseUrl = string;

export type Worker_AppApi_HandleAppLinksRequest_ResponseBody_ApiVersion = 1;

export type Worker_AppApi_HandleAppLinksRequest_ResponseBody_Deployment_Name = string;

export type Worker_AppApi_HandleAppLinksRequest_ResponseBody_Deployment_BaseUrl = string;

export type Worker_AppApi_HandleAppLinksRequest_ResponseBody_Deployment_FallbackUrl = string | null;

export type Worker_AppApi_HandleAppLinksRequest_ResponseBody_Deployment = {
  name: Worker_AppApi_HandleAppLinksRequest_ResponseBody_Deployment_Name;
  base_url: Worker_AppApi_HandleAppLinksRequest_ResponseBody_Deployment_BaseUrl;
  fallback_url: Worker_AppApi_HandleAppLinksRequest_ResponseBody_Deployment_FallbackUrl;
};

export type Worker_AppApi_HandleAppLinksRequest_ResponseBody_Links_Item_BrandedUrl = string;

export type Worker_AppApi_HandleAppLinksRequest_ResponseBody_Links_Item = Lib_Schema_LinkItemConfig & {
  branded_url: Worker_AppApi_HandleAppLinksRequest_ResponseBody_Links_Item_BrandedUrl;
};

export type Worker_AppApi_HandleAppLinksRequest_ResponseBody_Links = Worker_AppApi_HandleAppLinksRequest_ResponseBody_Links_Item[];

export type Worker_AppApi_HandleAppLinksRequest_ResponseBody_Trackers = Lib_Schema_Config['trackers'];

export type Worker_AppApi_HandleAppLinksRequest_ResponseBody = {
  api_version: Worker_AppApi_HandleAppLinksRequest_ResponseBody_ApiVersion;
  deployment: Worker_AppApi_HandleAppLinksRequest_ResponseBody_Deployment;
  links: Worker_AppApi_HandleAppLinksRequest_ResponseBody_Links;
  trackers: Worker_AppApi_HandleAppLinksRequest_ResponseBody_Trackers;
};

export type Worker_AppApi_HandleAppLinksRequest_ResponseJson = string;

/**
 * Worker - App API - Unauthorized Response.
 *
 * @since 2.1.0
 */
export type Worker_AppApi_UnauthorizedResponse_Returns = Response;
