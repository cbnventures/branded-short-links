# PROJECT_RULES.md

## Project Identity

### Name and Description

- **Project name:** branded-short-links
- **Description:** A short link manager for branded links with direct analytics tracking running on Cloudflare Workers.
- **Primary language:** TypeScript
- **Framework / runtime:** Cloudflare Workers (Wrangler) + Node.js CLI (Commander)

### Repository URL

- **URL:** https://github.com/cbnventures/branded-short-links

## Repository Layout

```
branded-short-links/
├── .github/              — GitHub Actions workflows
├── docs/                 — Design specs and documentation
├── src/                  — Application source code
│   ├── worker/           — Cloudflare Worker (redirect logic, trackers, landing page)
│   ├── cli/              — CLI management tool (commands, interactive menu)
│   ├── lib/              — Shared libraries (Zod schemas, config validation)
│   ├── types/            — TypeScript type definitions (.d.ts), mirrors src/ structure
│   └── tests/            — Unit and integration tests, mirrors src/ structure
├── scripts/              — Utility scripts (tail-logs)
├── .editorconfig         — Editor formatting rules
├── .gitignore            — Git ignore patterns
├── config.sample.json    — Sample configuration file
├── eslint.config.ts      — ESLint flat config
├── LICENSE               — MIT license
├── package.json          — Node.js manifest and scripts
├── README.md             — Project overview and badges
└── tsconfig.json         — TypeScript compiler configuration
```

## Source Structure

```
src/
├── worker/
│   ├── index.ts                — Worker entry point (fetch handler, shortcode matching, redirect)
│   ├── trackers.ts             — Tracker dispatcher (fires GA4, Facebook, PostHog, ntfy, Reverse Proxy for ntfy, plain-text)
│   └── landing/
│       └── page.ts             — Branded HTML landing page + debug view
├── cli/
│   ├── index.ts                — CLI entry point (commander setup)
│   ├── commands/
│   │   ├── links.ts            — link add/list/edit/remove
│   │   ├── trackers.ts         — tracker add/list/edit/remove
│   │   ├── settings.ts         — settings management
│   │   ├── generate.ts         — generate wrangler.toml from config
│   │   └── validate.ts         — validate config integrity
│   └── menu/
│       └── interactive.ts      — Interactive TUI menu
├── lib/
│   └── schema.ts               — Zod schemas for config validation
├── types/
│   ├── worker/
│   │   ├── index.d.ts
│   │   ├── trackers.d.ts
│   │   └── landing/
│   │       └── page.d.ts
│   ├── cli/
│   │   ├── index.d.ts
│   │   ├── commands/
│   │   │   ├── links.d.ts
│   │   │   ├── trackers.d.ts
│   │   │   ├── settings.d.ts
│   │   │   ├── generate.d.ts
│   │   │   └── validate.d.ts
│   │   └── menu/
│   │       └── interactive.d.ts
│   └── lib/
│       └── schema.d.ts
└── tests/
    ├── worker/
    │   ├── index.test.ts
    │   ├── trackers.test.ts
    │   └── landing/
    │       └── page.test.ts
    ├── cli/
    │   ├── commands/
    │   │   ├── links.test.ts
    │   │   ├── trackers.test.ts
    │   │   ├── settings.test.ts
    │   │   ├── generate.test.ts
    │   │   └── validate.test.ts
    │   └── menu/
    │       └── interactive.test.ts
    └── lib/
        └── schema.test.ts
```

## Key Files

| File                          | Purpose                   | When to modify                                         |
|-------------------------------|---------------------------|--------------------------------------------------------|
| `src/worker/index.ts`         | Worker entry point        | Changing redirect logic or shortcode matching          |
| `src/worker/trackers.ts`      | Tracker dispatcher        | Adding or changing tracker types                       |
| `src/cli/index.ts`            | CLI entry point           | Adding or changing CLI commands                        |
| `src/cli/menu/interactive.ts` | Interactive TUI           | Changing the menu flow                                 |
| `src/lib/schema.ts`           | Config validation schemas | Changing the config shape                              |
| `config.sample.json`          | Sample config reference   | Changing the config shape                              |
| `package.json`                | Manifest                  | Adding dependencies, changing scripts, bumping version |
| `tsconfig.json`               | TS config                 | Changing compiler options or path aliases              |

## Build and Tooling

### Prerequisites

| Tool     | Version | Purpose                                 |
|----------|---------|-----------------------------------------|
| Node.js  | >= 22.x | Runtime (CLI and build)                 |
| npm      | >= 10.x | Package manager                         |
| Wrangler | >= 4.x  | Cloudflare Workers CLI (dev dependency) |

### Commands

| Command               | What it does                                                |
|-----------------------|-------------------------------------------------------------|
| `npm install`         | Install all dependencies                                    |
| `npm start`           | Start local development server (wrangler dev)               |
| `npm run manage`      | Launch interactive config management TUI                    |
| `npm run deploy`      | Validate config, generate wrangler.toml, lint, deploy       |
| `npm run deploy:lint` | Run ESLint across the project                               |
| `npm test`            | Run the test suite (Vitest with Miniflare for worker tests) |

### Environment Variables

No environment variables. All configuration lives in `config.json` (managed via CLI). Cloudflare credentials are handled by `wrangler login`.

## Workspace Rules

### Naming Conventions

| Entity       | Convention                   | Example                                    |
|--------------|------------------------------|--------------------------------------------|
| Source files | kebab-case                   | `trackers.ts`, `landing-page.ts`           |
| Config keys  | snake_case                   | `base_domain`, `fallback_url`, `shortcode` |
| Link names   | user-defined free text       | `"github"`, `"linkedin"`, `"resume"`       |
| Type files   | Mirror source path           | `src/types/worker/trackers.d.ts`           |
| Test files   | Mirror source path + `.test` | `src/tests/worker/trackers.test.ts`        |
| CLI commands | kebab-case noun              | `links`, `trackers`, `settings`            |

### Do / Don't

**Do:**
- Keep worker code (`src/worker/`) and CLI code (`src/cli/`) cleanly separated. They run on different runtimes (Cloudflare Workers vs Node.js).
- Use Zod schemas for all external input validation (config, tracker payloads).
- Mask sensitive values (tokens, API keys, measurement IDs) in any user-visible output.
- Mirror source structure in `src/types/` and `src/tests/` exactly.
- Fire trackers directly via server-side APIs (GA4 Measurement Protocol, Meta Pixel, PostHog capture, ntfy publish, Reverse Proxy for ntfy, plain-text webhooks). No client-side JavaScript or GTM.

**Don't:**
- Don't put Cloudflare-specific settings (compatibility_date, routes) in the user-facing config. Those are generated.
- Don't commit `config.json` or `wrangler.toml`. Both are gitignored. Only `config.sample.json` is committed.
- Don't expose API keys, measurement IDs, or access tokens in GET landing page debug output or response output.
- Don't silently swallow tracker failures. Log errors and continue with remaining trackers.

## Project-Specific Patterns

### Architecture

URL shortening architecture with two entry points:

```
HTTP Request (Cloudflare Worker)
  |
  v
Receive -> HTTPS Redirect -> Match Shortcode -> Fire Trackers -> Redirect to Destination

CLI (Node.js)
  |
  v
Interactive Menu / Direct Commands -> Config Read/Write -> Validate -> Generate wrangler.toml
```

The worker handles incoming requests: matches the path against configured shortcodes, fires analytics trackers in parallel, and redirects to the destination URL. The CLI manages the config file that the worker reads at runtime.

### Data Flow

1. **Receive** — HTTP request arrives at Cloudflare Worker. Extract method, URL, headers, user agent. Module: `src/worker/index.ts`.
2. **Match shortcode** — Match the URL path against configured link items. If no match, use the fallback URL. Module: `src/worker/index.ts`.
3. **Fire trackers** — For the matched link, fire all configured trackers in parallel (GA4, Facebook, PostHog, ntfy, Reverse Proxy for ntfy, plain-text). Module: `src/worker/trackers.ts`.
4. **Redirect** — Return an HTTP redirect response to the destination URL. Module: `src/worker/index.ts`.
5. **Landing page** — For browser GET requests to the base domain, serve a branded HTML page. Module: `src/worker/landing/page.ts`.

### Error Strategy

| Layer              | Strategy                                                                                               |
|--------------------|--------------------------------------------------------------------------------------------------------|
| Worker entry point | Try/catch entire request handler. Return redirect or error response with HTTP status.                  |
| Shortcode matching | No match returns redirect to fallback URL. Never 404.                                                  |
| Tracker firing     | Fire all trackers in parallel via `Promise.allSettled`. Log failures, don't block the redirect.        |
| Individual tracker | Each tracker type handles its own errors. Failed trackers don't affect other trackers or the redirect. |
| CLI                | Try/catch at command level. Chalk-formatted errors. Non-zero exit code on failure.                     |
| Config validation  | Zod schemas on load. Checks: duplicate shortcodes, missing fields, invalid tracker config, URL format. |

## Publishing and Deployment

### Release Process

1. All changes committed, `git status --short` is clean.
2. Run `npm run manage validate` to verify config integrity.
3. Run `npm run deploy` (validates, generates wrangler.toml, lints, deploys).
4. Tag the commit if publishing a release.

### CI/CD Workflows

| Workflow file               | Trigger                  | What it does                         |
|-----------------------------|--------------------------|--------------------------------------|
| `lock-inactive-issues.yml`  | Weekly cron (Sunday)     | Lock issues inactive > 30 days       |
| `sponsor-gated-support.yml` | Issue open/close/comment | GitHub Sponsors-based support gating |

### Environments

| Environment        | URL / Identifier                        | Purpose                                 |
|--------------------|-----------------------------------------|-----------------------------------------|
| Cloudflare Workers | Custom domains via `base_domain` config | Production URL shortener and redirector |
