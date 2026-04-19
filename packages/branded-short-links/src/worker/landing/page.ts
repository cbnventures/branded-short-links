import type {
  WorkerLandingPageAlertIcon,
  WorkerLandingPageGithubIcon,
  WorkerLandingPageLandingPageConfig,
  WorkerLandingPageLandingPageDebugHtml,
  WorkerLandingPageLandingPageHtml,
  WorkerLandingPageLandingPageMaskedJson,
  WorkerLandingPageLandingPageReturn,
  WorkerLandingPageLinkIcon,
  WorkerLandingPageMaskConfigConfig,
  WorkerLandingPageMaskConfigReturn,
  WorkerLandingPageMaskValueReturn,
  WorkerLandingPageMaskValueValue,
  WorkerLandingPageNotFoundPageConfig,
  WorkerLandingPageNotFoundPageDebugHtml,
  WorkerLandingPageNotFoundPageHtml,
  WorkerLandingPageNotFoundPageMaskedJson,
  WorkerLandingPageNotFoundPageReturn,
  WorkerLandingPageSharedStyles,
} from '../../types/worker/landing/page.d.ts';

/**
 * Worker - Landing - Page - Shared Styles.
 *
 * Defines the CSS custom properties and base layout styles shared
 * by both the landing page and the not-found page.
 *
 * @since 2.0.0
 */
const sharedStyles: WorkerLandingPageSharedStyles = [
  '  <style>',
  '    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }',
  '',
  '    :root {',
  '      --bg: #fafafa;',
  '      --surface: #ffffff;',
  '      --border: #e4e4e7;',
  '      --text: #18181b;',
  '      --text-secondary: #52525b;',
  '      --text-muted: #a1a1aa;',
  '      --code-bg: #f4f4f5;',
  '      --accent: #18181b;',
  '      --accent-hover: #27272a;',
  '      --shadow: rgba(0, 0, 0, 0.06);',
  '    }',
  '',
  '    @media (prefers-color-scheme: dark) {',
  '      :root {',
  '        --bg: #09090b;',
  '        --surface: #18181b;',
  '        --border: #27272a;',
  '        --text: #fafafa;',
  '        --text-secondary: #a1a1aa;',
  '        --text-muted: #71717a;',
  '        --code-bg: #1c1c1f;',
  '        --accent: #fafafa;',
  '        --accent-hover: #e4e4e7;',
  '        --shadow: rgba(0, 0, 0, 0.3);',
  '      }',
  '    }',
  '',
  '    body {',
  '      font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif;',
  '      background: var(--bg);',
  '      color: var(--text);',
  '      min-height: 100dvh;',
  '      display: flex;',
  '      align-items: center;',
  '      justify-content: center;',
  '      -webkit-font-smoothing: antialiased;',
  '    }',
  '',
  '    .page {',
  '      text-align: center;',
  '      padding: 2rem;',
  '      max-width: 420px;',
  '      animation: fade-in 0.4s ease both;',
  '    }',
  '',
  '    @keyframes fade-in {',
  '      from { opacity: 0; transform: translateY(8px); }',
  '      to { opacity: 1; transform: translateY(0); }',
  '    }',
  '',
  '    .icon {',
  '      display: inline-flex;',
  '      align-items: center;',
  '      justify-content: center;',
  '      width: 48px;',
  '      height: 48px;',
  '      border-radius: 12px;',
  '      background: var(--surface);',
  '      border: 1px solid var(--border);',
  '      margin-bottom: 1.5rem;',
  '      box-shadow: 0 1px 3px var(--shadow);',
  '    }',
  '',
  '    .icon svg {',
  '      width: 22px;',
  '      height: 22px;',
  '      stroke: var(--text);',
  '      fill: none;',
  '      stroke-width: 1.5;',
  '      stroke-linecap: round;',
  '      stroke-linejoin: round;',
  '    }',
  '',
  '    h1 {',
  '      font-size: 1.375rem;',
  '      font-weight: 600;',
  '      letter-spacing: -0.025em;',
  '      line-height: 1.3;',
  '      margin-bottom: 0.5rem;',
  '    }',
  '',
  '    .subtitle {',
  '      font-size: 0.875rem;',
  '      color: var(--text-secondary);',
  '      line-height: 1.5;',
  '      margin-bottom: 1.5rem;',
  '    }',
  '',
  '    .gh-link {',
  '      display: inline-flex;',
  '      align-items: center;',
  '      gap: 0.5rem;',
  '      font-size: 0.8125rem;',
  '      font-weight: 500;',
  '      color: var(--bg);',
  '      background: var(--accent);',
  '      text-decoration: none;',
  '      padding: 0.5rem 1rem;',
  '      border-radius: 8px;',
  '      transition: background 0.15s ease;',
  '    }',
  '',
  '    .gh-link:hover { background: var(--accent-hover); }',
  '',
  '    .gh-link svg {',
  '      width: 16px;',
  '      height: 16px;',
  '      fill: var(--bg);',
  '    }',
  '',
  '    .badge {',
  '      display: inline-block;',
  '      font-size: 0.6875rem;',
  '      font-weight: 500;',
  '      color: var(--text-muted);',
  '      letter-spacing: 0.04em;',
  '      padding: 0.25rem 0.625rem;',
  '      border: 1px solid var(--border);',
  '      border-radius: 100px;',
  '    }',
  '',
  '    .debug {',
  '      margin-top: 1.5rem;',
  '      text-align: left;',
  '      background: var(--code-bg);',
  '      border: 1px solid var(--border);',
  '      border-radius: 8px;',
  '      overflow: hidden;',
  '      animation: fade-in 0.4s ease 0.1s both;',
  '    }',
  '',
  '    .debug-header {',
  '      font-size: 0.6875rem;',
  '      font-weight: 600;',
  '      letter-spacing: 0.05em;',
  '      text-transform: uppercase;',
  '      color: var(--text-muted);',
  '      padding: 0.625rem 0.875rem;',
  '      cursor: pointer;',
  '      list-style: none;',
  '      display: flex;',
  '      align-items: center;',
  '      gap: 8px;',
  '      transition: color 0.2s ease;',
  '    }',
  '',
  '    .debug-header:hover { color: var(--text); }',
  '    .debug-header::-webkit-details-marker { display: none; }',
  '',
  '    .debug-header::before {',
  '      content: \'\';',
  '      width: 5px;',
  '      height: 5px;',
  '      border-right: 1.5px solid currentColor;',
  '      border-bottom: 1.5px solid currentColor;',
  '      transform: rotate(-45deg);',
  '      transition: transform 0.2s ease;',
  '    }',
  '',
  '    .debug[open] .debug-header::before { transform: rotate(45deg); }',
  '',
  '    .debug[open] .debug-header {',
  '      border-bottom: 1px solid var(--border);',
  '    }',
  '',
  '    .debug pre {',
  '      font-family: \'SF Mono\', SFMono-Regular, Consolas, \'Liberation Mono\', Menlo, monospace;',
  '      font-size: 0.6875rem;',
  '      line-height: 1.6;',
  '      color: var(--text-secondary);',
  '      padding: 0.75rem 0.875rem;',
  '      overflow-x: auto;',
  '      white-space: pre;',
  '    }',
  '  </style>',
].join('\n');

/**
 * Worker - Landing - Page - GitHub Icon.
 *
 * Inline SVG markup for the GitHub octocat logo used as a
 * call-to-action button icon on the landing page.
 *
 * @since 2.0.0
 */
const githubIcon: WorkerLandingPageGithubIcon = '<svg viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';

/**
 * Worker - Landing - Page - Link Icon.
 *
 * Inline SVG markup for the chain-link icon displayed in the
 * hero section of the branded short links landing page.
 *
 * @since 2.0.0
 */
const linkIcon: WorkerLandingPageLinkIcon = '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';

/**
 * Worker - Landing - Page - Alert Icon.
 *
 * Inline SVG markup for the circled exclamation icon shown on
 * the 404 not-found page to indicate an invalid shortcode.
 *
 * @since 2.0.0
 */
const alertIcon: WorkerLandingPageAlertIcon = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';

/**
 * Worker - Landing - Page - Mask Value.
 *
 * Replaces a non-empty string with bullet characters so that
 * sensitive values are hidden in the debug config output.
 *
 * @since 2.0.0
 */
function maskValue(value: WorkerLandingPageMaskValueValue): WorkerLandingPageMaskValueReturn {
  return (value['length'] > 0) ? '\u2022\u2022\u2022\u2022\u2022\u2022' : '';
}

/**
 * Worker - Landing - Page - Mask Config.
 *
 * Produces a redacted copy of the full configuration object by
 * masking tracker secrets and link redirect URLs.
 *
 * @since 2.0.0
 */
function maskConfig(config: WorkerLandingPageMaskConfigConfig): WorkerLandingPageMaskConfigReturn {
  return {
    settings: config['settings'],
    links: {
      ...(config['links']['fallback_url'] !== undefined ? { fallback_url: config['links']['fallback_url'] } : {}),
      items: config['links']['items'].map((item) => ({
        ...item,
        redirect_url: maskValue(item['redirect_url']),
      })),
    },
    trackers: config['trackers'].map((tracker) => {
      if (tracker['type'] === 'ga4') {
        return {
          ...tracker, measurement_id: maskValue(tracker['measurement_id']), api_secret: maskValue(tracker['api_secret']),
        };
      }

      if (tracker['type'] === 'facebook') {
        return {
          ...tracker, pixel_id: maskValue(tracker['pixel_id']),
        };
      }

      if (tracker['type'] === 'ntfy') {
        return {
          ...tracker, server: maskValue(tracker['server']), token: maskValue(tracker['token']),
        };
      }

      if (tracker['type'] === 'posthog') {
        return {
          ...tracker, host: maskValue(tracker['host']), api_key: maskValue(tracker['api_key']),
        };
      }

      if (tracker['type'] === 'plain-text') {
        return {
          ...tracker, url: maskValue(tracker['url']), ...(tracker['token'] !== undefined ? { token: maskValue(tracker['token']) } : {}),
        };
      }

      return tracker;
    }),
  };
}

/**
 * Worker - Landing - Page.
 *
 * Builds and returns the HTML landing page response that shows
 * the project name, description, and optional debug config.
 *
 * @since 2.0.0
 */
function landingPage(config: WorkerLandingPageLandingPageConfig): WorkerLandingPageLandingPageReturn {
  const maskedJson: WorkerLandingPageLandingPageMaskedJson = JSON.stringify(maskConfig(config), null, 2);

  const debugHtml: WorkerLandingPageLandingPageDebugHtml = (config['settings']['show_response_output'] === true) ? [
    '',
    '    <details class="debug">',
    '      <summary class="debug-header">Config</summary>',
    `      <pre>${maskedJson}</pre>`,
    '    </details>',
  ].join('\n') : '';

  const html: WorkerLandingPageLandingPageHtml = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  <title>Branded Short Links</title>',
    `  ${sharedStyles}`,
    '</head>',
    '<body>',
    '  <div class="page">',
    `    <div class="icon">${linkIcon}</div>`,
    '    <h1>Branded Short Links</h1>',
    '    <p class="subtitle">Custom domain short links with backend analytics forwarding.</p>',
    `    <a class="gh-link" href="https://github.com/cbnventures/branded-short-links" target="_blank" rel="noopener noreferrer">${githubIcon} GitHub</a>${debugHtml}`,
    '  </div>',
    '</body>',
    '</html>',
  ].join('\n');

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

/**
 * Worker - Landing - Page - Not Found Page.
 *
 * Builds and returns the 404 HTML response page that informs
 * the visitor the requested shortcode does not exist.
 *
 * @since 2.0.0
 */
function notFoundPage(config: WorkerLandingPageNotFoundPageConfig): WorkerLandingPageNotFoundPageReturn {
  const maskedJson: WorkerLandingPageNotFoundPageMaskedJson = JSON.stringify(maskConfig(config), null, 2);

  const debugHtml: WorkerLandingPageNotFoundPageDebugHtml = (config['settings']['show_response_output'] === true) ? [
    '',
    '    <details class="debug">',
    '      <summary class="debug-header">Config</summary>',
    `      <pre>${maskedJson}</pre>`,
    '    </details>',
  ].join('\n') : '';

  const html: WorkerLandingPageNotFoundPageHtml = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  <title>Shortcode Not Found</title>',
    `  ${sharedStyles}`,
    '</head>',
    '<body>',
    '  <div class="page">',
    `    <div class="icon">${alertIcon}</div>`,
    '    <h1>Shortcode Not Found</h1>',
    '    <p class="subtitle">The requested shortcode does not exist.</p>',
    `    <div class="badge">404</div>${debugHtml}`,
    '  </div>',
    '</body>',
    '</html>',
  ].join('\n');

  return new Response(html, {
    status: 404,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export {
  landingPage,
  maskConfig,
  maskValue,
  notFoundPage,
};
