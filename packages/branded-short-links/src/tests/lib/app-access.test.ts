import { describe, expect, it } from 'vitest';

import { configSchema } from '../../lib/schema.js';

import type { Tests_Lib_AppAccess_BaseConfig } from '../../types/tests/lib/app-access.test.d.ts';

const baseConfig: Tests_Lib_AppAccess_BaseConfig = {
  settings: {
    worker_name: 'test-worker',
    base_domain: 'go.example.com',
    show_response_output: false,
  },
  links: {
    items: [],
  },
  trackers: [],
};

describe('app access schema', () => {
  it('accepts all supported access key formats', () => {
    expect(configSchema.safeParse({
      ...baseConfig,
      app_access: {
        users: [
          {
            username: 'memorable-user',
            access_key: 'alpha-bravo-charlie-delta-echo',
          },
          {
            username: 'compact-user',
            access_key: 'FGH1-JKM2-NPQ3-RST4-VWX5',
          },
          {
            username: 'random-user',
            access_key: 'bsl_0123456789abcdefghijklmnopqrstuvwxyz_ABCDEF',
          },
        ],
      },
    })['success']).toBe(true);

    return;
  });

  it('rejects malformed access keys', () => {
    expect(configSchema.safeParse({
      ...baseConfig,
      app_access: {
        users: [{
          username: 'mobile',
          access_key: 'too-short',
        }],
      },
    })['success']).toBe(false);

    return;
  });

  it('rejects invalid usernames', () => {
    expect(configSchema.safeParse({
      ...baseConfig,
      app_access: {
        users: [{
          username: 'Not Portable',
          access_key: 'alpha-bravo-charlie-delta-echo',
        }],
      },
    })['success']).toBe(false);

    return;
  });

  return;
});
