---
name: rankizz-map-competitive-landscape
description: Map an organic-search market by identifying recurring ranking domains, competitor types, keyword coverage, winning content formats, authority patterns, and underserved opportunities. Use when entering a category, planning SEO strategy, or determining which search competitors matter. Rankizz is optional until live SERP, domain, keyword, or backlink data is needed.
---

# Map the competitive landscape

Explain who wins the search market, why, and where the user's site can compete. Do not reduce the result to a list of familiar business competitors.

## Invoke Rankizz MCP tools

When using Rankizz through MCP, call each tool directly by its name with its documented input. REST callers use the direct `/api/v1/tools/<tool-name>` endpoint.

## Define the market

Use existing project context when available. Establish:

- product or category
- audience and search tasks
- country and language
- relevant site and current maturity
- time horizon and business constraints

Create a representative query set across head terms, use cases, problems, comparisons, questions, and high-intent searches. Keep the set bounded and show it in the report.

## Gather available evidence

Use public search results, supplied exports, existing research, and accessible pages first. Record market, date, and source for every observation.

Use Rankizz only when live or provider-backed evidence is needed:

- `find_serp_competitors` for repeated domain overlap across a supplied keyword set
- `get_serp_results` for page types and result composition
- `get_domain_overview` for high-level organic footprint
- `get_domain_keyword_suggestions` for a shortlisted domain's keyword opportunities
- `get_backlinks_overview` for authority context
- `get_ahrefs_domain_rating` for a free cached directional DR check
- `discover_project_competitors` for up to 50 suggestions from the project's domain and shared-keyword counts; it does not add competitors to the project
- `get_provider_domain_overview` with Ahrefs or Semrush for shortlisted domains when an independent traffic or keyword snapshot changes the comparison
- `get_ahrefs_backlink_strength` for the project's backlink, referring-domain, and dofollow counts; use the direct DR tool above for Domain Rating

Provider snapshots and competitor suggestions are saved for 24 hours. First lookups and explicit refreshes may use credits; shortlist before enriching domains.

If a Rankizz call is unavailable because of entitlement or credit balance, stop cloud calls and tell the user: "This feature is unavailable because the connected account does not have the required entitlement or credit balance." Continue with evidence already available. Batch work and avoid enriching every discovered domain.

## Compare AI answers when requested

Use `research_ai_rank_tracking_prompt` for a bounded AI visibility comparison. Supply `projectId`, one representative `prompt`, and the relevant `providers`: `chatgpt`, `google_ai_mode`, `perplexity`, `gemini`, or `claude`. Set the comparison market with `countryCode` and `languageCode`. This metered operation does not save prompts for later runs.

Inspect each result's `status`; failed or timed-out providers are missing evidence and must be excluded from visibility denominators. Successful answers can have no source URLs. The `citations` list combines citations and sources, including Google AI Mode attached source links when explicit citation/source fields are empty. Verify the answer before calling a source an inline citation. Record `researchedAt`, the prompt, providers, and market rather than claiming the run represents the entire AI search market.

## Classify competitors

Follow [references/landscape-framework.md](references/landscape-framework.md). Separate:

- direct products or services
- publishers and educational sites
- directories and marketplaces
- communities and forums
- tools, templates, and data products
- aggregators, affiliates, and comparison sites
- institutions or primary sources

Recurring search domains may be important even when they do not compete commercially.

## Analyze patterns

Identify:

- which domains recur and for which intent lanes
- winning page types, depth, freshness, and media
- brand, entity, authorship, and source signals
- topic and keyword coverage
- authority and backlink patterns when measured
- SERP features and zero-click pressure
- gaps where current results underserve the user's audience

Separate evidence from inference. Do not claim causation from correlation.

## Deliver

Return a landscape map containing the query set, competitor-type matrix, recurring winners, content and authority patterns, defensible opportunities, risks, and the next three research actions.

Recommend deeper single-competitor analysis only for domains whose evidence warrants it.

For repeated comparisons, save the reviewed prompts with `add_ai_prompt`,
choose engines with `configure_ai_prompt_run`, and explicitly request
`run_ai_prompts`. Reuse the same UUID `runId` on retries and read the stored
result with `get_ai_prompt_run`; there is no automatic schedule.
