# branded-short-links

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
