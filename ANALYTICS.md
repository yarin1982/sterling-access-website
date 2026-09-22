# Google Analytics 4

Measurement ID: `G-3X62D0LDMX`.

The shared generator inserts the official async Google tag and one configuration command in the head of all 24 content pages and both legacy redirect pages. `dist/analytics.js` registers one delegated click listener. Rebuild with `node build.mjs`; verify with `node check-analytics.mjs`.

| Event | Trigger |
| --- | --- |
| `page_view` | Google tag configuration on page load |
| `phone_click` | Any `tel:` link, including header, footer, menu and mobile buttons |
| `garage_door_cta_click` | Internal link to a garage-door service page |
| `locksmith_cta_click` | Internal link to a locksmith service page |
| `request_service_submit` | Valid, non-honeypot submission of the shared contact/request-service form |

The form event has `form_context=contact_request_service`, `delivery_method=mailto`, and `submission_status=email_handoff`. It records opening a prepared email, not confirmation that the visitor sent it or that the business received it. Both contact and Request Service use this single form, so one action emits one custom form event. The existing form and site behavior are preserved.

Events include only fixed placement identifiers, public page paths, and the selected service category. No entered names, phone numbers, email addresses, city, or message are sent in custom events. Page URLs and referrers omit queries and fragments. GA4 Enhanced Measurement may separately report its own generic form events; use `request_service_submit` for this validated handoff count. Property-side key-event settings and Realtime receipt require access to the GA4 property.

Netlify uses `netlify.toml` to build the generator and publish `dist`. The custom domain currently uses Sites hosting; update both deployments when publishing changes.

Original image and video assets are preserved in assets.zip. Netlify extracts them into dist/assets before generating the pages. Root site.css, site.js, and analytics.js are copied unchanged into dist by the build script.

