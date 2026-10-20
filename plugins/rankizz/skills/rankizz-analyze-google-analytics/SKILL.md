---
name: rankizz-analyze-google-analytics
description: Analyze a project's connected Google Analytics 4 data and turn it into evidence-backed SEO, acquisition, conversion, ecommerce, audience, site-search, and measurement decisions. Use when the user asks what changed in traffic or outcomes, which pages or queries to improve, whether GA4 tracking can be trusted, how channels or audiences differ, what visitors search for onsite, or how Search Console demand connects to GA4 behavior. Requires Rankizz MCP or REST API for live connected-property data.
---

# Analyze Google Analytics for decisions

Use GA4 to explain what visitors did after arrival, not to infer why a page ranked. Combine it with Search Console when the decision starts before the click.

## Invoke Rankizz MCP tools

When using Rankizz through MCP, call each tool directly by its name with its documented input. REST callers use the direct `/api/v1/tools/<tool-name>` endpoint.

## Resolve access and the decision

Prefer Rankizz MCP with OAuth in interactive clients. Use the REST API for headless applications. Never ask the user to paste a credential into chat; direct API users to `https://www.rankizz.com/api-access` and their secret manager.

Call `list_projects`, match the canonical domain, and use its `projectId`. Do not create a project or change a connection without permission.

State the decision before fetching data. Examples:

- Is organic search improving?
- Which query-page pairs deserve work next?
- Which landing pages attract traffic but fail to produce outcomes?
- Which channels, campaigns, devices, or countries differ materially?
- Is ecommerce or internal-search measurement active?
- Can the current measurement setup support the requested conclusion?

Use a complete 28-day period by default. Compare equal-length periods and label dates, property timezone, filters, and limitations. Avoid partial current-day data.

Read [references/analytics-tool-guide.md](references/analytics-tool-guide.md) before choosing tools.

## Establish trust before interpretation

Call `get_google_analytics_measurement_health` when the analysis depends on key events, ecommerce, site search, custom definitions, or a newly connected property.

Treat these as evidence limits, not zero performance:

- no web stream
- enhanced measurement disabled
- site-search measurement disabled
- no key events configured
- thresholding, sampling, restricted metrics, incomplete rows, or API warnings
- a missing or expired GA4 or Search Console connection

If measurement is weak, separate **what the data shows** from **what cannot yet be concluded**. Recommend the smallest tracking repair needed for the decision. Do not claim that a clean configuration proves every event fires correctly; runtime tag validation remains a separate check.

## Run the smallest useful analysis

### Organic momentum

Start with `get_google_analytics_organic_overview`. Use the equal-period comparison for sessions, active users, engagement, key events, transactions, and revenue. Inspect diagnostics before describing a decline as business performance.

Use `get_google_analytics_organic_landing_pages` or `get_google_analytics_page_insights` only when page-level evidence will change the action.

### Search opportunity scoring

Use `get_search_opportunities` when both Search Console and GA4 are connected. It selects query-page rows in average positions 4–20, joins their landing pages to organic GA4 outcomes, and returns:

- a 0–100 score for matched rows
- demand, business-value, and reachability components
- `rank_lift`, `ctr_lift`, `conversion_lift`, `protect_winner`, or `measurement_gap` labels
- confidence, reasons, source coverage, truncation, and suggested follow-up tools

Pass `excludedPages` only when the user has named landing pages that should not compete for briefing priority. Accept exact absolute URLs or root-relative paths, disclose the exclusion count, and never silently infer exclusions from low scores, language, templates, or page type. Exclusions affect the opportunity queue, not the site-wide organic overview or measurement-health report.

The score is a prioritization aid, not a forecast:

```text
round(100 × (0.50 × demand + 0.30 × business value + 0.20 × reachability))
```

Components are percentile ranks within the current candidate set. Business value uses GA4 session key-event rate, or engagement rate only when every joined candidate has zero key events. Unmatched Search Console rows remain visible but unscored. Never turn an unscored row into zero opportunity.

Confidence is low for unmatched rows and for fewer than three joined candidates, medium for small or source-limited sets, and high only with at least five joined candidates and complete, un-limited source coverage.

Treat `rank_lift`, `ctr_lift`, `conversion_lift`, `protect_winner`, and `measurement_gap` as triage labels. Explain both what each active label means and the next verification or action it implies; never return unexplained tags.

For shortlisted rows, inspect the exact page, query intent, live SERP, and technical state before recommending content changes. A high score says “investigate first,” not “rewrite automatically.”

### Specialized questions

- `get_google_analytics_traffic_acquisition`: channel, source/medium, or campaign quality; use source/medium diagnostics for attribution hygiene.
- `get_google_analytics_ecommerce_performance`: item funnel or landing-page transactions and revenue; preserve `detected`, `none`, and `unknown` as different states.
- `get_google_analytics_site_search`: internal demand and content/product gaps; confirm site-search measurement before treating no rows as no demand.
- `get_google_analytics_audience_breakdown`: device, country, or new-versus-returning differences; do not infer demographics or individual behavior.
- `get_google_analytics_page_performance`: consumption after any entry point, including views and engagement time.
- `get_google_analytics_key_events`: outcome mix and pages with strong traffic but weak key-event performance.

Read [references/analytics-decision-rules.md](references/analytics-decision-rules.md) before prioritizing actions.

## Keep source meanings separate

Search Console measures Google Search visibility and clicks before the site visit. GA4 measures observed onsite sessions, behavior, configured events, and ecommerce after collection and attribution rules. Their counts do not need to match.

When joining them:

- align complete dates and disclose their timezones
- join canonical host and path carefully
- preserve unmatched rows
- do not equate GSC clicks with GA4 sessions
- do not claim that a query caused a conversion merely because its landing page produced outcomes
- do not combine revenue, key events, or engagement into invented universal ROI

Use `get_search_opportunities` for the maintained join and coverage diagnostics instead of manually hiding mismatches.

## Deliver a decision briefing

Read [references/analytics-output-contract.md](references/analytics-output-contract.md). Return:

1. the decision, property, complete date range, filters, and source coverage
2. measurement trust and material limitations
3. the current result and equal-period change where supported
4. the segments or pages driving the result
5. a prioritized action queue with evidence, expected mechanism, confidence, owner, and re-check metric
6. follow-up evidence needed before any irreversible change
7. what not to conclude from the data

Keep observation, interpretation, recommendation, and forecast visibly separate. Ask before changing analytics settings, tracking code, content, campaigns, or a live site.

## Use the REST API consistently

Every MCP tool in this workflow is also available as:

```text
GET /api/v1/tools/<tool-name>
Authorization: Bearer <key>
```

Use the same tool name and input fields in MCP and REST. Read the generated OpenAPI document at `https://www.rankizz.com/api/v1/openapi.json`. Store API keys only in secret storage and never in prompts, source files, logs, reports, or URLs.

These analytics tools are deterministic and do not call an LLM. An agent may reason over their structured results, but it must preserve the reported formulas, confidence, coverage, exclusions, and evidence limits rather than replacing them with invented scoring.
