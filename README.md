Branded Short Links
====================

[![GitHub Releases](https://img.shields.io/github/v/release/cbnventures/branded-short-links?style=flat-square&logo=github&logoColor=%23ffffff&color=%23b25da6)](https://github.com/cbnventures/branded-short-links/releases)
[![GitHub Top Languages](https://img.shields.io/github/languages/top/cbnventures/branded-short-links?style=flat-square&logo=typescript&logoColor=%23ffffff&color=%236688c3)](https://github.com/cbnventures/branded-short-links)
[![GitHub License](https://img.shields.io/github/license/cbnventures/branded-short-links?style=flat-square&logo=googledocs&logoColor=%23ffffff&color=%2348a56a)](https://github.com/cbnventures/branded-short-links/blob/main/LICENSE)
[![Become a GitHub Sponsor](https://img.shields.io/badge/github-sponsor-gray?style=flat-square&logo=githubsponsors&logoColor=%23ffffff&color=%23eaaf41)](https://github.com/sponsors/cbnventures)
[![Donate via PayPal](https://img.shields.io/badge/paypal-donate-gray?style=flat-square&logo=paypal&logoColor=%23ffffff&color=%23ce4a4a)](https://www.cbnventures.io/paypal/)

Effortlessly manage branded short links with seamless Google Tag Manager integration (via the `noscript` feature), backed by the Cloudflare network.

To use this link shortener, here are some steps to follow:
1. Run `npm install` inside the project directory.
2. Rename the `wrangler-sample.toml` file to `wrangler.toml`.
3. Read these [instructions](#configuration) to customize the link shortener.
4. Run `npm run authorize` to authorize your Cloudflare connection.
5. Finally, run `npm run deploy` to deploy your changes.

## Configuration
Here is an example of how the `wrangler.toml` file for this link shortener should be configured:
```toml
name = "branded-short-links"
main = "src/index.ts"
compatibility_date = "2025-01-21"

############
## Routes ##
############
routes = [
  { pattern = "examp.le", custom_domain = true },
  { pattern = "www.examp.le", custom_domain = true },
]

#################
## Vars: Links ##
#################
[vars.links]
fallback_url = "https://www.example.com"
items = [
  { shortcode = "/url-1", http_response = 301, redirect_url = "https://www.new-site.com/url-1" },
  { shortcode = "/url-2", http_response = 302, redirect_url = "https://www.new-site.com/url-2" },
  { shortcode = "/url-3", http_response = 303, redirect_url = "https://www.new-site.com/url-3" },
  { shortcode = "/url-4", http_response = 307, redirect_url = "https://www.new-site.com/url-4" },
  { shortcode = "/url-5", http_response = 308, redirect_url = "https://www.new-site.com/url-5" },
]

####################
## Vars: Settings ##
####################
[vars.settings]
debug_mode = true
force_https = true
gtm_container_id = ""
```

## Supported Data
With each request, the link manager will gather user data retrieved from the `request` object (Cloudflare properties, headers, etc.). However, the extent of data collection will vary depending on the limitations imposed by which third-party analytics service you choose to use.

The variables supported are listed below:

| Variable Name            | Path                        | Description                                                                                                                                                                          |
|--------------------------|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `bsl_redirectUrl`        |                             | The URL to redirect to when the link shortener runs.                                                                                                                                 |
| `bsl_shortcode`          |                             | The matched shortcode when the link shortener runs.                                                                                                                                  |
| `cf_asn`                 | `request.cf.asn`            | ASN of the incoming request, for example, `395747`.                                                                                                                                  |
| `cf_asOrganization`      | `request.cf.asOrganization` | The organization which owns the ASN of the incoming request, for example, `Google Cloud`.                                                                                            |
| `cf_city`                | `request.cf.city`           | City of the incoming request, for example, `"Austin"`.                                                                                                                               |
| `cf_colo`                | `request.cf.colo`           | The three-letter [IATA](https://en.wikipedia.org/wiki/IATA_airport_code) airport code of the data center that the request hit, for example, `"DFW"`.                                 |
| `cf_continent`           | `request.cf.continent`      | Continent of the incoming request, for example, `"NA"`.                                                                                                                              |
| `cf_country`             | `request.cf.country`        | Country of the incoming request. The two-letter country code in the request. This is the same value as that provided in the `CF-IPCountry` header, for example, `"US"`.              |
| `cf_isEUCountry`         | `request.cf.isEUCountry`    | If the country of the incoming request is in the EU, this will return `"1"`. Otherwise, this property will be omitted.                                                               |
| `cf_latitude`            | `request.cf.latitude`       | Latitude of the incoming request, for example, `"30.27130"`.                                                                                                                         |
| `cf_longitude`           | `request.cf.longitude`      | Longitude of the incoming request, for example, `"-97.74260"`.                                                                                                                       |
| `cf_metroCode`           | `request.cf.metroCode`      | Metro code (DMA) of the incoming request, for example, `"635"`.                                                                                                                      |
| `cf_postalCode`          | `request.cf.postalCode`     | Postal code of the incoming request, for example, `"78701"`.                                                                                                                         |
| `cf_region`              | `request.cf.region`         | If known, the [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) name for the first level region associated with the IP address of the incoming request, for example, `"Texas"`. |
| `cf_regionCode`          | `request.cf.regionCode`     | If known, the [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) code for the first-level region associated with the IP address of the incoming request, for example, `"TX"`.    |
| `cf_timezone`            | `request.cf.timezone`       | Timezone of the incoming request, for example, `"America/Chicago"`.                                                                                                                  |
| `headers_cfConnectingIp` | `request.headers`           | The [CF-Connecting-IP](https://developers.cloudflare.com/fundamentals/reference/http-request-headers/#cf-connecting-ip) request header.                                              |
| `headers_cfIpCountry`    | `request.headers`           | The [CF-IPCountry](https://developers.cloudflare.com/fundamentals/reference/http-request-headers/#cf-ipcountry) request header.                                                      |
| `headers_cfRay`          | `request.headers`           | The [CF-RAY](https://developers.cloudflare.com/fundamentals/reference/http-request-headers/#cf-ray) request header.                                                                  |
| `headers_host`           | `request.headers`           | The [Host](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Host) request header.                                                                                           |
| `headers_userAgent`      | `request.headers`           | The [User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) request header.                                                                               |
| `headers_xRealIp`        | `request.headers`           | The [X-Real-IP](https://docs.oracle.com/en-us/iaas/Content/Balance/Reference/httpheaders.htm#HTTP_X_Headers__XRealIP) request header.                                                |
| `request_method`         | `request.method`            | The [Request: method](https://developer.mozilla.org/en-US/docs/Web/API/Request/method) property.                                                                                     |
| `request_url`            | `request.url`               | The [Request: url](https://developer.mozilla.org/en-US/docs/Web/API/Request/url) property.                                                                                           |

## How Does It Work?
In the world of many analytical tools, a Tag Management System (TMS) like Google Tag Manager makes it straightforward to manage digital marketing deployments and to consolidate multiple tracker sources. However, these systems typically rely on embedding JavaScript directly into users' browsers.

This approach poses a challenge for link shortening tools, for which the aim is to redirect users via a pre-configured "short link" without any client-side code. Moreover, modern browsers receiving a 3xx redirection response will not load the response body, which means analytical scripts will not load as well.

To address this, we can leverage the under-documented `noscript` feature in Google Tag Manager, and have the link shortener execute the tags with the available information given in each request.

This approach will satisfy four different goals:
1. Your environment would essentially be serverless, open-source, and backed by Cloudflare network.
2. Redirects do not go through the `http-equiv` meta header, which is [considered bad for SEO](https://help.ahrefs.com/en/articles/2433739-what-is-meta-refresh-redirect-and-why-is-it-considered-a-critical-issue).
3. No additional maintenance required. Shortcodes not found would simply fall back to the original domain for further resolution.
4. Developers would not need to re-configure and re-deploy the link shortener just to add a new tag.

## Configure Short Links
To condense lengthy links into shorter links, configure each short link using the following settings:

- `shortcode`
  - A unique shortcode or alias. For instance, in `https://examp.le/url-1`, `/url-1` serves as the shortcode.
- `http_response`
  - The desired HTTP response code — `301`, `302`, `303`, `307`, or `308`. You may read the [Dr. Link Check](https://www.drlinkcheck.com/blog/http-redirects-301-302-303-307-308) blog post for more information.
- `redirect_url`
  - The destination URL to redirect to.

Below is an example demonstrating the configuration:
```toml
[vars.links]
fallback_url = "https://www.example.com"
items = [
  { shortcode = "/url-1", http_response = 301, redirect_url = "https://www.new-site.com/url-1" },
  { shortcode = "/url-2", http_response = 302, redirect_url = "https://www.new-site.com/url-2" },
  { shortcode = "/url-3", http_response = 303, redirect_url = "https://www.new-site.com/url-3" },
  { shortcode = "/url-4", http_response = 307, redirect_url = "https://www.new-site.com/url-4" },
  { shortcode = "/url-5", http_response = 308, redirect_url = "https://www.new-site.com/url-5" },
]
```

Below is an example demonstrating how will redirects work if `url-1` is defined like the configuration above:

| User Request                               | Matching Shortcode | Redirect URL                     |
|--------------------------------------------|--------------------|----------------------------------|
| `https://examp.le/url-1`                   | `/url-1`           | `https://www.new-site.com/url-1` |
| `https://examp.le/url-1?abc=123#somehash`  | `/url-1`           | `https://www.new-site.com/url-1` |
| `https://examp.le/url-1/?abc=123#somehash` | Fallback URL       |                                  |

__Note:__ If a request does not match any configured shortcodes, the request will default to the `fallback_url` while retaining the original request.

## Additional Settings
The link shortener provides additional settings for your convenience. Here's what you can configure:

- To enable debug mode, set the `debug_mode` setting to `true`.
- To enforce HTTPS, set the `force_https` setting to `true`.
- To enable Google Tag Manager support, set the `gtm_container_id` to a non-empty value. _Optional._

__Note:__ If `debug_mode` is enabled and the `gtm_container_id` is defined, all custom image tags will run and their responses will be displayed instead of redirecting the user. Please __exercise caution__ as enabling debug mode may reveal information typically concealed (e.g. API Secrets and Access Tokens).

## Setting Up Google Tag Manager
When setting up the container for the first time, follow these steps to integrate the variables sent by the link shortener:

<details>
  <summary>For each variable, use the following settings:</summary>

- __Name:__ _Based on the "Variable Name" column provided in the [Supported Data](#supported-data) section_
- __Variable Type:__ Data Layer Variable
- __Data Layer Variable Name:__ _Same as the "Name" setting above_
- __Data Layer Version:__ Version 2
- __Set Default Value:__ _Checked_
  - __Default Value:__ N/A
</details>

<details>
  <summary>For each trigger, use the following settings:</summary>

- __Trigger Type:__ Page View
- __This trigger fires on:__ Some Page Views
  - To trigger tags if the user was redirected to the __shortcode URL__:
    - Left box: Select the `bsl_shortcode` variable.
    - Center box: Select __does not equal__.
    - Right box: Type __N/A__.
  - To trigger tags if the user was redirected to the __fallback URL__:
    - Left box: Select the `bsl_shortcode` variable.
    - Center box: Select __equals to__.
    - Right box: Type __N/A__.
</details>

__Note:__ For enhanced confidentiality, create a dedicated container exclusively for this link shortener and avoid sharing it with other domains.

## Sending Data to Tracking Tools
A tool to generate tracking links is provided through this [included tool](https://raw.githack.com/cbnventures/branded-short-links/main/linkgen/index.html). Pre-fill buttons are included for popular tracking solutions.

- [Google Analytics 4] To retrieve the API Secret and Measurement ID, view the [query parameters](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag#payload_query_parameters) documentation.
- [ntfy Server] If authentication is required, generate the `auth` parameter using the [query param](https://docs.ntfy.sh/publish/#query-param) instructions.

## Limiting Bad Traffic
When you first set up the link shortener, you may notice a large amount of unwanted traffic attempting to find exploits. Here's how we handled it with a single WAF rule:

1. Select "Known Bots" from the "Field" dropdown and set it to "enable".
2. Select "Threat Score" from the "Field" dropdown and set it to "greater than or equal to" and "5".
3. Select "URI Path" from the "Field" dropdown and set it to "does not equal" and "`/url-1`".

Finally, set the action to [Managed Challenge](https://developers.cloudflare.com/waf/reference/cloudflare-challenges/).

## Configuration for Cloudflare
When deploying, there are a few things you need to be aware of:

1. A domain name is required.
   - You can conveniently [register domains](https://www.cloudflare.com/products/registrar/) within Cloudflare at cost, without markup fees as seen with other domain registrars.
2. Routes are not supported (when `custom_domain` is set to `false`).
   - This is because the link shortener matches the beginning of the path without the forward slash (e.g. `examp.le/url-1` will match `url-1`) defined in the link items in your `wrangler.toml` file.

## Credits and Appreciation
If you find value in the ongoing development of this url shortener and wish to express your appreciation, you have the option to become our supporter on [GitHub Sponsors](https://github.com/sponsors/cbnventures) or make a one-time donation through [PayPal](https://www.cbnventures.io/paypal/).
