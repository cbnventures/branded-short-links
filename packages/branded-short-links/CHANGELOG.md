# branded-short-links

## 2.0.5 - 2026-08-20

### UPDATED
- Bumped @cbnventures/nova and @cbnventures/docusaurus-preset-nova from 0.25.0 to 0.25.1

## 2.0.4 - 2026-08-19

### UPDATED
- Updated @cbnventures/nova to 0.25.0 and @cbnventures/docusaurus-preset-nova to 0.25.0.

## 2.0.3 - 2026-08-18

### UPDATED
- Added .strict() to every Zod object schema (settingsSchema, linkItemSchema, linksSchema, configSchema) so unknown keys in config files are rejected instead of silently stripped.
- Updated the package description to reflect the self-hosted Cloudflare Workers branding and added a check:types-config script for type-checking configuration files.
- Regenerated the ESLint flat config for Nova 0.24.0 (renamed eslint.config.ts to eslint.config.mts), adding rules that require a node: protocol prefix on Node.js built-in imports, require a JSDoc block on every declaration, enforce brace-only @returns types and canonical JSDoc tag ordering, lint MDX files for raw text in code blocks, scope the Cloudflare Workers runtime preset to worker source files, and change the type-alias naming convention from PascalCase to hierarchical UnderscorePascalCase.
- Renamed every type alias across the CLI, worker, and test source to the new hierarchical UnderscorePascalCase convention (e.g. WorkerIndexHandleRequestRequest to Worker_Handlers_HandleRequest_Request), reorganized .d.ts files to mirror their corresponding source file one-to-one, added node: protocol prefixes to Node.js built-in imports, filled in missing JSDoc blocks, parenthesized ternary conditions, and reformatted multi-property object literals to one property per line throughout the package.
- Added a per-package MIT LICENSE file and wrapped README.md sections in nova-region markers so nova README management recipe can keep the package README in sync.
- Migrated the hand-rolled type-declarations.test.ts suite (and its 173-line supporting type file) to nova published registerTypeDeclarationSuite helper, and added a new dotenv.test.ts that uses nova registerDotenvSuite helper to check .env and .env.sample quote conventions at the monorepo root.
- Updated the @cbnventures/nova dependency from 0.17.0 to 0.24.0, bumped vitest to 4.1.3, and dropped Node.js 20 from the supported engines range (now ^22 || ^24 only).
- Added root-level eslint and @types/node to devDependencies and aligned no-shared-type-import sharedFiles across all three eslint configs. Removed unused @cloudflare/vitest-pool-workers devDependency. Re-added runtimeCloudflareWorkers ESLint preset.
- Upgrade Wrangler from 4.78.0 to 4.124.0, tsx from 4.21.0 to 4.23.12, Zod from 4.3.6 to 4.4.3, @types/node from 22.10.10 to 26.2.0, Chalk from 5.6.2 to 6.0.0, Commander from 14.0.3 to 15.0.0, and jiti from 2.6.1 to 2.7.0.

### FIXED
- Fixed maskConfig() to mask ntfy-reverse-proxy tracker secrets (url and token) and the fallback URL in landing page and 404 debug output. Added escapeHtml() to HTML-entity-escape masked config JSON in the landing page and 404 debug pre tags, preventing XSS in debug output. Added escapeMarkdown() to sanitize client-controlled request URL, User-Agent, and X-Real-IP values in Markdown-enabled ntfy notifications, preventing injection of clickable links. Stopped exposing Zod validation error details in the 500 response body, logging them server-side instead. Added an Allow header to the 405 Method Not Allowed response. Logged Promise.allSettled tracker failures instead of silently discarding them. Wrapped GA4 and Facebook tracker config values in encodeURIComponent. Removed the unreachable URL hash from fallback redirect construction.
- Fixed the envLinePattern regex to support digits in environment variable key names and to require matched quote pairs instead of accepting mismatched opening and closing quotes.
- Cancelling a prompt in the link edit or tracker edit flow now aborts the edit and returns to the sub-menu instead of saving partial changes or crashing.
- The interactive CLI now shows a "Go back" option on all data-selection prompts (edit/remove links, edit/remove trackers) so the user can return to the sub-menu without restarting the CLI.

### ADDED
- Added unit tests for the deploy module covering loadEnvToken, saveEnvToken, and printLinksSummary, and for the worker request handler covering routing, method validation, and error responses.

## 2.0.2 - 2026-04-23

### UPDATED
- Updated nova dependency to v0.17.0.

## 2.0.1 - 2026-04-21

### FIXED
- Fix docs deployment silently failing to reach Cloudflare Pages — nova v0.16.2 workflow template update configures the download-artifact step with the correct workspace build path, so the generated site now lands at `apps/docs/build/` for the Pages upload to pick up, instead of being extracted to the repo root.

## 2.0.0 - 2026-04-18

### UPDATED
- Plain-text webhook tracker with Bearer token authentication
- Per-shortcode HTTP response code configuration (301/302/303/307/308)
- PostHog tracker for product analytics event forwarding
- Package restructured into monorepo layout with packages and apps workspaces
- Configuration masking system that replaces sensitive values in debug output
- ntfy tracker with Markdown-formatted push notifications
- GA4 tracker via Measurement Protocol for server-side event collection
- Geolocation data capture from Cloudflare edge included in tracker notifications
- Meta Pixel tracker via noscript endpoint for Facebook conversion tracking
- Parallel tracker execution that fires all configured trackers without blocking redirects

### ADDED
- Custom landing page and 404 page generation with dark mode
- Interactive CLI with commands for config-io, deploy, generate, links, settings, trackers, and validate
- ntfy-reverse-proxy tracker for topic-based notification routing

### FIXED
- Fix wrangler type generation failing on CI — committed worker-configuration.d.ts as a build dependency and wrapped the generate step to gracefully skip when wrangler.toml is not present
- Fix GitHub Packages workflow failing to install cross-repo scoped dependencies — resolved by nova v0.15.2 workflow template update that configures the registry after npm install
- Strip GlobalProps from generated worker types to prevent type-check failures when build output does not exist

### REMOVED
- GTM-based analytics integration replaced by direct server-side trackers
- Linkgen SPA frontend for link management

## 1.2.2 - 2025-06-30

### ADDED
- PostHog Cloud pre-fill preset in the linkgen tool for generating a `POST` tracking tag that forwards captured request data to PostHog's `/capture/` endpoint

## 1.2.1 - 2025-04-25

### UPDATED
- Removed the legacy `.eslintrc.json` config file and disabled the `no-var` rule for TypeScript declaration files in the flat ESLint config

### FIXED
- Fix redirects being altered when Cloudflare WAF Managed Challenge is enabled — responses are now built manually with an explicit `Location` header instead of `Response.redirect()`, and the fallback redirect now uses a 301 status code
- Fix the linkgen tool link in the README pointing to its GitHub source listing instead of the live tool

## 1.2.0 - 2025-01-26

### UPDATED
- Updated package dependencies and build scripts

### ADDED
- Linkgen tool, a browser-based generator for `BSL_GET_REQ`/`BSL_POST_REQ` tracking tag URLs with pre-fill presets for Google Analytics 4, ntfy, and Facebook Pixel, replacing the manual setup instructions in the README

## 1.1.2 - 2025-01-21

### UPDATED
- Changed the project license from Apache-2.0 to MIT
- Updated package dependencies and migrated the ESLint configuration to the new flat config format

### FIXED
- Fix an import ordering issue and incorrect type definitions surfaced by the dependency update

### ADDED
- Sponsor-gated support workflow limiting GitHub issue support to project sponsors

## 1.1.1 - 2024-03-13

### UPDATED
- Updated package dependencies

### FIXED
- Fix requests with a trailing slash (e.g. `/url-1/`) not matching their configured shortcode and falling through to the fallback URL

## 1.1.0 - 2024-03-09

### UPDATED
- Shortcodes in `wrangler.toml` must now include a leading `/` (e.g. `/url-1` instead of `url-1`) to match the request path directly
- Updated package dependencies
- Clarified README instructions

### FIXED
- Fix a stray `console.log` that printed decoded `bsl_data` payloads in the tag request processor

## 1.0.2 - 2024-03-02

### UPDATED
- Changed the recommended Cloudflare WAF rule for limiting bad traffic to use Managed Challenge with revised field conditions (known bots, threat score, URI path)

## 1.0.1 - 2024-02-27

### FIXED
- Fix `POST` tag requests to third-party endpoints stripping the `gtmcb` cache-busting parameter forwarded by Google Tag Manager
- Silence a TypeScript type-check failure on the Cloudflare Workers `Response` type used by the tag request processor

## 1.0.0 - 2024-02-26

### ADDED
- Cloudflare Worker-based branded short link redirector with configurable shortcodes, per-link HTTP response codes (301/302/303/307/308), and a fallback URL for unmatched requests
- Google Tag Manager integration via the `noscript` custom image tag feature, enabling `GET`/`POST` tag requests so GA4 Measurement Protocol events, ntfy notifications, and other server-side tags can fire without client-side JavaScript
- Cloudflare request data (geolocation, ASN, headers) exposed as Google Tag Manager data layer variables for use in tags
- Debug mode and force-HTTPS settings
