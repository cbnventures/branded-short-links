# VISION.md

## Purpose

### Problem Statement

There is no simple way to manage branded short links with analytics tracking on a custom domain without running a full URL shortener platform. Existing solutions either lack direct analytics integration, require complex server infrastructure, or don't support custom domains cleanly. Developers and personal brand owners who want clean short links (e.g., `yourdomain.com/github`) with built-in tracking have to cobble together multiple services or self-host heavy platforms.

### Origin

This project was originally built by Jacky to manage personal branded short links on a short domain with analytics tracking, so he could share clean, memorable URLs that redirect to his profiles and projects while capturing visit analytics through GA4, Facebook Pixel, PostHog, ntfy, Reverse Proxy for ntfy, and plain-text webhook notifications.

### Target Audience

- **Developers** — Engineers who want clean short links on their own domain with direct analytics integration, managed through a CLI rather than a web dashboard.
- **Personal brand owners** — People who maintain a personal domain and want branded short links (e.g., `yourdomain.com/github`, `yourdomain.com/linkedin`) that look professional and track engagement.
- **Privacy-conscious users** — Users who want direct analytics tracking without relying on Google Tag Manager as a middleman, keeping the tracking pipeline simple and transparent.

### Value Proposition

branded-short-links is a Cloudflare Workers-based URL shortener with direct analytics integration (GA4, Facebook Pixel, PostHog, ntfy, Reverse Proxy for ntfy, plain-text webhooks), managed through an interactive CLI. It redirects branded short links on a custom domain, fires tracker pixels directly without a GTM middleman, and serves a landing page for browser visits. Configure everything through a terminal UI — no config file hand-editing required.

## Marketing Copy

### Tagline

Branded short links with direct analytics tracking, deployed to the edge.

### Elevator Pitch

branded-short-links is a URL shortener that runs on Cloudflare Workers and redirects branded short links on your custom domain. It fires analytics trackers directly — GA4 Measurement Protocol, Meta Pixel, PostHog events, ntfy, Reverse Proxy for ntfy, and plain-text webhooks — without routing through Google Tag Manager. Each short link maps a shortcode to a destination URL with configurable trackers. Manage links, trackers, and settings through an interactive CLI, then deploy to Cloudflare Workers with a single command.

### Key Features

- **Direct analytics tracking** — Fire GA4, Facebook, PostHog, ntfy, Reverse Proxy for ntfy, and plain-text trackers directly from the worker. No GTM middleman, no client-side JavaScript, no tag containers.
- **Interactive CLI** — Manage links, trackers, and settings through a terminal UI. Auto-generates Cloudflare config on deploy.
- **Custom domain support** — Run short links on any domain you own (e.g., `yourdomain.com/github`) via Cloudflare Workers custom domains.
- **Multiple tracker types** — Support for Google Analytics 4 (Measurement Protocol), Meta Pixel, PostHog event capture, ntfy push notifications, Reverse Proxy for ntfy, and plain-text webhooks.
- **Landing page** — Browser GET requests serve a branded HTML page instead of a raw redirect, with optional debug config output.
- **Edge deployment** — Runs on Cloudflare Workers for low-latency, globally distributed URL redirection and tracker firing.

### Differentiators

| This project                                                                                             | Alternatives                                                     |
|----------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| Direct analytics via server-side APIs (GA4, Facebook, PostHog, ntfy, Reverse Proxy for ntfy, plain-text) | Client-side tracking via GTM/JavaScript tags that can be blocked |
| Runs on Cloudflare Workers edge — no origin server needed                                                | Traditional URL shorteners require a server or VPS               |
| Interactive CLI for config management                                                                    | Manual JSON/YAML/TOML editing or web dashboards                  |
| Custom domain short links with per-link tracker configuration                                            | Generic short link services with limited analytics customization |
| Lightweight single-worker deployment                                                                     | Full platforms with databases, admin panels, and user management |

## Glossary

| Term         | Definition                                                                                                                                                                                                                             |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Shortcode    | The path segment of a short link (e.g., `github` in `yourdomain.com/github`). Maps to a destination URL and optional trackers.                                                                                                         |
| Tracker      | An analytics integration that fires when a short link is visited. Supported types: GA4 (Measurement Protocol), Facebook (Meta Pixel), PostHog (event capture), ntfy (push notification), Reverse Proxy for ntfy, plain-text (webhook). |
| Landing page | The HTML page served on browser GET requests, showing branded content instead of performing a raw redirect. Includes optional masked debug config output.                                                                              |
| Fallback URL | The default redirect destination when a request doesn't match any configured shortcode.                                                                                                                                                |
| Base domain  | The custom domain (e.g., `yourdomain.com`) under which all shortcodes are registered as Cloudflare Workers routes.                                                                                                                     |
| Link item    | A single shortcode-to-URL mapping in the configuration, optionally with attached trackers and metadata.                                                                                                                                |
| Config       | The JSON configuration file (`config.json`) that defines all links, trackers, and settings. Managed via CLI, gitignored.                                                                                                               |
| GA4          | Google Analytics 4. Tracker type that sends events via the Measurement Protocol server-side API.                                                                                                                                       |
| Facebook     | Meta Pixel. Tracker type that sends events server-side to Facebook for ad attribution.                                                                                                                                                 |
| PostHog      | PostHog event capture API. Tracker type that sends custom events to a PostHog instance.                                                                                                                                                |
| ntfy         | ntfy push notification service. Tracker type that sends a notification when a short link is visited.                                                                                                                                   |
