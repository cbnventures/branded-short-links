import { configSchema } from '../lib/schema.js';
import { handleRequest } from './handlers.js';

import type {
  WorkerIndexFetchCtx,
  WorkerIndexFetchEnv,
  WorkerIndexFetchEnvLinksAsString,
  WorkerIndexFetchEnvLinksAsUnknown,
  WorkerIndexFetchEnvSettingsAsString,
  WorkerIndexFetchEnvSettingsAsUnknown,
  WorkerIndexFetchEnvTrackersAsString,
  WorkerIndexFetchEnvTrackersAsUnknown,
  WorkerIndexFetchLinks,
  WorkerIndexFetchRequest,
  WorkerIndexFetchResult,
  WorkerIndexFetchReturn,
  WorkerIndexFetchSettings,
  WorkerIndexFetchTrackers,
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
    request: WorkerIndexFetchRequest,
    env: WorkerIndexFetchEnv,
    ctx: WorkerIndexFetchCtx,
  ): WorkerIndexFetchReturn {
    let settings: WorkerIndexFetchSettings = undefined;
    let links: WorkerIndexFetchLinks = undefined;
    let trackers: WorkerIndexFetchTrackers = undefined;

    try {
      settings = JSON.parse(env['SETTINGS'] as WorkerIndexFetchEnvSettingsAsString) as WorkerIndexFetchEnvSettingsAsUnknown;
      links = JSON.parse(env['LINKS'] as WorkerIndexFetchEnvLinksAsString) as WorkerIndexFetchEnvLinksAsUnknown;
      trackers = JSON.parse(env['TRACKERS'] as WorkerIndexFetchEnvTrackersAsString) as WorkerIndexFetchEnvTrackersAsUnknown;
    } catch {
      return new Response(JSON.stringify({
        status: 'error', message: 'Invalid configuration',
      }, null, 2), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result: WorkerIndexFetchResult = configSchema.safeParse({
      settings, links, trackers,
    });

    if (result['success'] === false) {
      return new Response(JSON.stringify({
        status: 'error', message: 'Invalid configuration', errors: result['error']['issues'],
      }, null, 2), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return handleRequest(request, result['data'], ctx);
  },
};
