import { configSchema } from '../lib/schema.js';
import { handleRequest } from './handlers.js';

import type {
  Worker_Index_Fetch_AppAccess,
  Worker_Index_Fetch_Ctx,
  Worker_Index_Fetch_Env,
  Worker_Index_Fetch_EnvAppAccessAsUnknown,
  Worker_Index_Fetch_EnvLinksAsString,
  Worker_Index_Fetch_EnvLinksAsUnknown,
  Worker_Index_Fetch_EnvSettingsAsString,
  Worker_Index_Fetch_EnvSettingsAsUnknown,
  Worker_Index_Fetch_EnvTrackersAsString,
  Worker_Index_Fetch_EnvTrackersAsUnknown,
  Worker_Index_Fetch_Links,
  Worker_Index_Fetch_Request,
  Worker_Index_Fetch_Result,
  Worker_Index_Fetch_Returns,
  Worker_Index_Fetch_Settings,
  Worker_Index_Fetch_Trackers,
} from '../types/worker/index.d.ts';

export default {
  /**
   * Worker - Index - Fetch.
   *
   * Entry point for the Cloudflare Worker that validates
   * environment configuration and delegates to handleRequest.
   *
   * @since 2.0.0
   */
  async fetch(
    request: Worker_Index_Fetch_Request,
    env: Worker_Index_Fetch_Env,
    ctx: Worker_Index_Fetch_Ctx,
  ): Worker_Index_Fetch_Returns {
    let settings: Worker_Index_Fetch_Settings = undefined;
    let links: Worker_Index_Fetch_Links = undefined;
    let trackers: Worker_Index_Fetch_Trackers = undefined;
    let appAccess: Worker_Index_Fetch_AppAccess = undefined;

    try {
      settings = JSON.parse(env['SETTINGS'] as Worker_Index_Fetch_EnvSettingsAsString) as Worker_Index_Fetch_EnvSettingsAsUnknown;
      links = JSON.parse(env['LINKS'] as Worker_Index_Fetch_EnvLinksAsString) as Worker_Index_Fetch_EnvLinksAsUnknown;
      trackers = JSON.parse(env['TRACKERS'] as Worker_Index_Fetch_EnvTrackersAsString) as Worker_Index_Fetch_EnvTrackersAsUnknown;

      if (env['APP_ACCESS'] !== undefined) {
        appAccess = JSON.parse(env['APP_ACCESS']) as Worker_Index_Fetch_EnvAppAccessAsUnknown;
      }
    } catch {
      return new Response(JSON.stringify({
        status: 'error',
        message: 'Invalid configuration',
      }, null, 2), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result: Worker_Index_Fetch_Result = configSchema.safeParse({
      settings,
      links,
      trackers,
      app_access: appAccess,
    });

    if (result['success'] === false) {
      console.info(JSON.stringify(result['error']['issues']));

      return new Response(JSON.stringify({
        status: 'error',
        message: 'Invalid configuration',
      }, null, 2), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return handleRequest(request, result['data'], ctx);
  },
};
