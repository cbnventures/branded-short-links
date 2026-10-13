import type {
  Worker_AppApi_HandleAppLinksRequest_AccessKey,
  Worker_AppApi_HandleAppLinksRequest_AppAccess,
  Worker_AppApi_HandleAppLinksRequest_Authorization,
  Worker_AppApi_HandleAppLinksRequest_BaseUrl,
  Worker_AppApi_HandleAppLinksRequest_Config,
  Worker_AppApi_HandleAppLinksRequest_Credentials,
  Worker_AppApi_HandleAppLinksRequest_DecodedCredentials,
  Worker_AppApi_HandleAppLinksRequest_EncodedCredentials,
  Worker_AppApi_HandleAppLinksRequest_MatchedUser,
  Worker_AppApi_HandleAppLinksRequest_Request,
  Worker_AppApi_HandleAppLinksRequest_ResponseBody,
  Worker_AppApi_HandleAppLinksRequest_ResponseJson,
  Worker_AppApi_HandleAppLinksRequest_Returns,
  Worker_AppApi_HandleAppLinksRequest_SeparatorIndex,
  Worker_AppApi_HandleAppLinksRequest_Username,
  Worker_AppApi_UnauthorizedResponse_Returns,
} from '../types/worker/app-api.d.ts';

/**
 * Worker - App API - Unauthorized Response.
 *
 * Returns a generic Basic authentication challenge without revealing whether
 * the submitted username or access key was incorrect.
 *
 * @returns {Worker_AppApi_UnauthorizedResponse_Returns}
 *
 * @since 2.1.0
 */
function unauthorizedResponse(): Worker_AppApi_UnauthorizedResponse_Returns {
  return new Response(JSON.stringify({
    status: 'error',
    message: 'Unauthorized',
  }, null, 2), {
    status: 401,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'private, no-store',
      'WWW-Authenticate': 'Basic realm="Branded Short Links", charset="UTF-8"',
    },
  });
}

/**
 * Worker - App API - Handle App Links Request.
 *
 * Authenticates a configured app-access user and returns the deployment's link
 * destinations and tracker configuration without returning login credentials.
 *
 * @param {Worker_AppApi_HandleAppLinksRequest_Request} request - Request.
 * @param {Worker_AppApi_HandleAppLinksRequest_Config}  config  - Config.
 *
 * @returns {Worker_AppApi_HandleAppLinksRequest_Returns}
 *
 * @since 2.1.0
 */
function handleAppLinksRequest(request: Worker_AppApi_HandleAppLinksRequest_Request, config: Worker_AppApi_HandleAppLinksRequest_Config): Worker_AppApi_HandleAppLinksRequest_Returns {
  const appAccess: Worker_AppApi_HandleAppLinksRequest_AppAccess = config['app_access'];

  if (appAccess === undefined || appAccess['users']['length'] === 0) {
    return new Response(JSON.stringify({
      status: 'error',
      message: 'Not found',
    }, null, 2), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, no-store',
      },
    });
  }

  if (request['method'] !== 'GET' && request['method'] !== 'HEAD') {
    return new Response(JSON.stringify({
      status: 'error',
      message: 'Method not allowed',
    }, null, 2), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, no-store',
        'Allow': 'GET, HEAD',
      },
    });
  }

  const authorization: Worker_AppApi_HandleAppLinksRequest_Authorization = request['headers'].get('Authorization');

  if (authorization === null || authorization.toLowerCase().startsWith('basic ') === false) {
    return unauthorizedResponse();
  }

  const encodedCredentials: Worker_AppApi_HandleAppLinksRequest_EncodedCredentials = authorization.slice(6);
  let decodedCredentials: Worker_AppApi_HandleAppLinksRequest_DecodedCredentials = undefined;

  try {
    decodedCredentials = atob(encodedCredentials);
  } catch {
    return unauthorizedResponse();
  }

  const separatorIndex: Worker_AppApi_HandleAppLinksRequest_SeparatorIndex = decodedCredentials.indexOf(':');

  if (separatorIndex < 1) {
    return unauthorizedResponse();
  }

  const credentials: Worker_AppApi_HandleAppLinksRequest_Credentials = {
    username: decodedCredentials.slice(0, separatorIndex).trim().toLowerCase(),
    accessKey: decodedCredentials.slice(separatorIndex + 1),
  };
  const username: Worker_AppApi_HandleAppLinksRequest_Username = credentials['username'];
  const accessKey: Worker_AppApi_HandleAppLinksRequest_AccessKey = credentials['accessKey'];
  const matchedUser: Worker_AppApi_HandleAppLinksRequest_MatchedUser = appAccess['users'].find((user) => {
    return user['username'] === username && user['access_key'] === accessKey;
  });

  if (matchedUser === undefined) {
    return unauthorizedResponse();
  }

  const baseUrl: Worker_AppApi_HandleAppLinksRequest_BaseUrl = `https://${config['settings']['base_domain']}`;
  const responseBody: Worker_AppApi_HandleAppLinksRequest_ResponseBody = {
    api_version: 1,
    deployment: {
      name: config['settings']['worker_name'],
      base_url: baseUrl,
      fallback_url: config['links']['fallback_url'] ?? null,
    },
    links: config['links']['items'].map((item) => ({
      ...item,
      branded_url: `${baseUrl}${item['shortcode']}`,
    })),
    trackers: config['trackers'],
  };
  const responseJson: Worker_AppApi_HandleAppLinksRequest_ResponseJson = JSON.stringify(responseBody, null, 2);

  return new Response((request['method'] === 'HEAD') ? null : responseJson, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'private, no-store',
    },
  });
}

export {
  handleAppLinksRequest,
};
