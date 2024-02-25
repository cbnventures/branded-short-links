Branded Short Links
====================

[![GitHub Releases](https://img.shields.io/github/v/release/cbnventures/branded-short-links?style=flat-square&logo=github&logoColor=%23ffffff&color=%23b25da6)](https://github.com/cbnventures/branded-short-links/releases)
[![GitHub Top Languages](https://img.shields.io/github/languages/top/cbnventures/branded-short-links?style=flat-square&logo=typescript&logoColor=%23ffffff&color=%236688c3)](https://github.com/cbnventures/branded-short-links)
[![GitHub License](https://img.shields.io/github/license/cbnventures/branded-short-links?style=flat-square&logo=googledocs&logoColor=%23ffffff&color=%2348a56a)](https://github.com/cbnventures/branded-short-links/blob/main/LICENSE)
[![Become a GitHub Sponsor](https://img.shields.io/badge/github-sponsor-gray?style=flat-square&logo=githubsponsors&logoColor=%23ffffff&color=%23eaaf41)](https://github.com/sponsors/cbnventures)
[![Donate via PayPal](https://img.shields.io/badge/paypal-donate-gray?style=flat-square&logo=paypal&logoColor=%23ffffff&color=%23ce4a4a)](https://www.cbnventures.io/paypal/)

Effortlessly manage branded short links with seamless Google Tag Manager integration for advanced analytics, backed by the redundancy of the Cloudflare network infrastructure.

To use this link shortener, here are some steps to follow:
1. Run `npm install` inside the project directory.
2. Rename the `wrangler-sample.toml` file to `wrangler.toml`.
3. Read these [instructions](#configuration) to customize the link shortener.
4. Run `npm run authorize` to authorize your Cloudflare connection.
5. Finally, run `npm run deploy` to deploy your changes.

## Configuration
Here is an example of how the `wrangler.toml` file for this reverse proxy should be configured:
```toml
name = "branded-short-links"
main = "src/index.ts"
compatibility_date = "2024-02-22"

############
## Routes ##
############
routes = [
  { pattern = "example.com", custom_domain = true },
]

#################
## Vars: Links ##
#################
[vars.links]
default = "https://www.example.com"
items = [
  { shortcode = "url-1", http_response = 301, redirect_url = "https://www.new-site.com/url-1" },
  { shortcode = "url-2", http_response = 302, redirect_url = "https://www.new-site.com/url-2" },
  { shortcode = "url-3", http_response = 303, redirect_url = "https://www.new-site.com/url-3" },
  { shortcode = "url-4", http_response = 307, redirect_url = "https://www.new-site.com/url-4" },
  { shortcode = "url-5", http_response = 308, redirect_url = "https://www.new-site.com/url-5" },
]

####################
## Vars: Settings ##
####################
[vars.settings]
debug_mode = true
force_https = true
gtm_container_id = ""
```

## Configuration Options
You can easily customize the behavior of the link shortener using these configuration settings:

#### The `links` section:
| Path                        | Type       | Description                                                                                                                                                                                        | Required | Accepted Values                      |
|-----------------------------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|--------------------------------------|
| `links`                     | `object`   |                                                                                                                                                                                                    | yes      |                                      |
| `links.default`             | `string`   | The default URL used if no shortcodes match. The path name (starting with `/`), search parameters (starting with `?`), and hash (starting with `#`) would be forwarded to the origin of this link. | yes      | Valid URL                            |
| `links.items`               | `object[]` |                                                                                                                                                                                                    | yes      |                                      |
| `links.items.shortcode`     | `string`   | Path name without the preceding forward slash. For example, in `https://example.com/url-1`, the `url-1` part would be the shortcode.                                                               | yes      |                                      |
| `links.items.http_response` | `number`   | The HTTP response code to use. View the [Dr. Link Check](https://www.drlinkcheck.com/blog/http-redirects-301-302-303-307-308) for an in-depth explanation.                                         | yes      | `301`, `302`, `303`, `307`, or `308` |
| `links.items.redirect_url`  | `string`   | Redirect to this URL. If Google Tag Manager is enabled, it will execute first, then redirect.                                                                                                      | yes      | Valid URL                            |

#### The `settings` section:
| Path                        | Type      | Description                                                                                                                                           | Required | Accepted Values       |
|-----------------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------------|
| `settings`                  | `object`  |                                                                                                                                                       | yes      |                       |
| `settings.debug_mode`       | `boolean` | If `gtm_container_id` is defined, this will show _all_ **Custom Image Tags** responses defined in Google Tag Manager instead of redirecting the user. | yes      |                       |
| `settings.force_https`      | `boolean` | If a HTTP request is detected, the link shortener will first redirect to HTTPS before tracking and redirection.                                       | yes      |                       |
| `settings.gtm_container_id` | `string`  | The Google Tag Manager container to use. The Google Tag Manager Container ID should start with `GTM-`. Optional.                                      | no       | Beginning with `GTM-` |

## Supported Data
With each request, the link manager will gather user data for each request (retrieved from Cloudflare properties, request headers, etc.). However, the extent of data collection may vary depending on the limitations imposed by web analytics services. The variables supported are listed below:

| Variable                 | Path                        | Description                                                                                                                                                                          |
|--------------------------|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `bsl_redirectUrl`        |                             | The URL to redirect to (based on the matched shortcode) when the Cloudflare worker runs.                                                                                             |
| `bsl_shortcode`          |                             | The matched shortcode when the Cloudflare worker runs.                                                                                                                               |
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

## Setting Up Google Tag Manager
Coming soon

## Sending Data to Google Analytics
Coming soon

## Sending Data to Facebook Pixel
Coming soon

## Sending Data to an ntfy Server
As an alternative to utilizing third-party tracking tools, visitor access data can be transmitted directly to a [ntfy](https://ntfy.sh/) server. To prevent excess notifications, the link below is pre-configured to send using `min` priority.

- By default, the example link will use `https://ntfy.sh/mytopic`. If you are self-hosting and looking to replace the URL, do not remove the `/publish` ending from the path name.
- If authentication is required, generate the `auth` parameter using the [Query param](https://docs.ntfy.sh/publish/#query-param) instructions, then replace `[YOUR ENCODED NTFY TOKEN]` with the token you just generated.

```text
https://ntfy.sh/mytopic/publish?auth=[YOUR ENCODED NTFY TOKEN]&title=User%20Request%20Received&message=The%20following%20details%20have%20been%20captured%20from%20a%20recent%20user%20request.%0D%0A%0D%0A%F0%9F%94%97%20__User%20Request__%0D%0A__Shortcode%3A__%20{{bsl_shortcode}}%0D%0A__Redirect%20To%3A__%20{{bsl_redirectUrl}}%0D%0A__Request%20Method%3A__%20{{request_method}}%0D%0A__Request%20URL%3A__%20{{request_url}}%0D%0A%0D%0A%F0%9F%8C%A9%EF%B8%8F%20__Cloudflare%20Properties__%0D%0A__City%3A__%20{{cf_city}}%0D%0A__Continent%3A__%20{{cf_continent}}%0D%0A__Country%3A__%20{{cf_country}}%0D%0A__Data%20Center%3A__%20{{cf_colo}}%0D%0A__ISP%3A__%20{{cf_asOrganization}}%20%28{{cf_asn}}%29%0D%0A__Is%20EU%20Country%3A__%20{{cf_isEUCountry}}%0D%0A__Coordinates%3A__%20{{cf_latitude}}%2C%20{{cf_longitude}}%0D%0A__Metro%20Code%3A__%20{{cf_metroCode}}%0D%0A__Postal%20Code%3A__%20{{cf_postalCode}}%0D%0A__Region%3A__%20{{cf_region}}%20%28{{cf_regionCode}}%29%0D%0A__Time%20Zone%3A__%20{{cf_timezone}}%0D%0A%0D%0A%F0%9F%97%A3%20__Headers__%0D%0A__CF-Connecting-IP%3A__%20{{headers_cfConnectingIp}}%0D%0A__CF-IPCountry%3A__%20{{headers_cfIpCountry}}%0D%0A__CF-RAY%3A__%20{{headers_cfRay}}%0D%0A__Host%3A__%20{{headers_host}}%0D%0A__User-Agent%3A__%20{{headers_userAgent}}%0D%0A__X-Real-IP%3A__%20{{headers_xRealIp}}&tags=rotating_light&markdown=yes&priority=min
```

__Note:__ The `auth` tokens are encoded in base64 without padding (considered plain text). To maintain secrecy, Google Tag Manager would be accessed via the Cloudflare infrastructure, not the user's browser. Please ensure the confidentiality of your GTM container ID to prevent potential token exposure.

## Credits and Appreciation
If you find value in the ongoing development of this proxy and wish to express your appreciation, you have the option to become our supporter on [GitHub Sponsors](https://github.com/sponsors/cbnventures) or make a one-time donation through [PayPal](https://www.cbnventures.io/paypal/).
