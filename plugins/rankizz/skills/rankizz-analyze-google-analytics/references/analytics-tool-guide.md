# Google Analytics tool guide

All tools are read-only, fetch fresh first-party data, store no analytics rows, and use no Rankizz research credits. They require a connected project and accept `projectId`. Date-aware tools default to complete days and clamp supported reporting windows where documented by their response warnings.

| Decision | Tool | Important inputs | Main evidence |
| --- | --- | --- | --- |
| Is organic improving? | `get_google_analytics_organic_overview` | `startDate`, `endDate`, `trend` | Current and previous metrics, change, trend, diagnostics |
| Which organic entrances work? | `get_google_analytics_organic_landing_pages` | date, device, country, page filters | Sessions, engagement, key events, transactions, revenue, leaks |
| What happened on pages after any entry? | `get_google_analytics_page_performance` | date, channel, device, country, page filters | Views, users, engagement duration, key events |
| Which pages need a broad diagnosis? | `get_google_analytics_page_insights` | date, channel, device, country, page filters | Totals, pages, trends, channels, countries, winners and leaks |
| Which outcomes occurred? | `get_google_analytics_key_events` | date, channel, filters | Event counts, users, winning pages, conversion leaks |
| Which search work comes next? | `get_search_opportunities` | `startDate`, `endDate`, `limit`, `excludedPages` | GSC + GA4 score, types, confidence, reasons, exclusions, coverage |
| Which sources acquire useful traffic? | `get_google_analytics_traffic_acquisition` | `breakdown`, `channel`, `comparePreviousPeriod` | Sessions through revenue, comparisons, attribution diagnostics |
| What sells or assists revenue? | `get_google_analytics_ecommerce_performance` | `breakdown`, `channel`, `onlyWithTransactions` | Item funnel or landing-page transactions/revenue, activity state |
| What do visitors search for onsite? | `get_google_analytics_site_search` | date, channel | Search terms and activity state |
| Which audience contexts differ? | `get_google_analytics_audience_breakdown` | `breakdown`, `channel`, `comparePreviousPeriod` | Device, country, or new/returning outcomes |
| Can the evidence be trusted? | `get_google_analytics_measurement_health` | none beyond `projectId` | Streams, enhanced measurement, key events, custom definitions, issues |

## Tool selection rules

- Start with one overview or diagnostic tool, not every endpoint.
- Add one segmentation tool only when a segment could change the action.
- Use `channel: organic_search` for SEO conclusions and `channel: all` for site-wide context.
- Previous-period comparison is supported for channel-group acquisition and device or new-versus-returning audience reports. Do not request it for unsupported breakdowns.
- Source/medium acquisition diagnostics require the full bounded report; inspect coverage before acting.
- Site-search and ecommerce activity can be `detected`, `none`, or `unknown`. Preserve the state.
- Paginate with `limit` and `offset`; do not interpret the first page as complete when `hasMore` is true.
- For `get_search_opportunities`, pass repeated `excludedPages` values only when the user explicitly excludes exact landing-page URLs or root-relative paths. Report `coverage.excludedGscRows`; exclusions do not alter site-wide overview totals.
- Treat every returned opportunity tag as a decision aid: explain what it means and the recommended verification or action from `analytics-decision-rules.md`.

## Error handling

- `ga4_not_connected`: ask the user to connect a property.
- `ga4_reconnect_required`: ask the user to renew the Google grant.
- `ga4_property_inaccessible`: verify property access or select another property.
- `ga4_report_incompatible`: the selected property cannot answer that dimension/metric combination.
- `ga4_quota_exhausted`: retry later; do not loop aggressively.
- `gsc_not_connected`: GA4-only work may continue, but opportunity scoring cannot.
- `validation_error`: correct dates, pagination, comparison, or breakdown input.

Never convert a connection, authorization, quota, restriction, limited-data, or malformed-response error into zero traffic.
