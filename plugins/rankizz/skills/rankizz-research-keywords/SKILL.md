---
name: rankizz-research-keywords
description: Find, evaluate, and prioritize organic-search keyword opportunities from a site's products, audience problems, existing pages, exports, Search Console data, SERPs, or optional Rankizz metrics. Use before creating or refreshing content, planning landing pages, or deciding which searches are worth targeting. Rankizz is optional until live volume, difficulty, intent, or SERP evidence is needed.
---

# Research keywords

Build a decision-ready opportunity set, not a large unfiltered keyword dump.

## Invoke Rankizz MCP tools

When using Rankizz through MCP, call each tool directly by its name with its documented input. REST callers use the direct `/api/v1/tools/<tool-name>` endpoint.

## Establish context

Read existing SEO project context, site pages, briefs, and supplied exports before asking questions. Determine:

- target site, product, or topic
- audience and conversion goal
- target country and language
- existing page or new-content use case
- branded terms, irrelevant meanings, and exclusions

Ask only for missing details that would materially change the market or intent.

## Generate candidates locally first

Use available evidence without Rankizz when it is sufficient:

- product and service language from the site
- audience tasks, pains, comparisons, and objections
- supplied keyword, Search Console, analytics, or advertising exports
- related terms and questions found in public pages or accessible search results
- existing page headings and internal-search language

Normalize whitespace and obvious duplicates while retaining the original phrase and source. Do not invent search volume, difficulty, CPC, traffic, or rank.

## Use Rankizz only for missing live evidence

If Rankizz is connected and quantitative prioritization is useful:

1. Resolve a project with `list_projects`.
2. Use `list_saved_keywords` before paying to re-research known terms.
3. Use `research_keywords` for 1–5 high-value seed topics.
4. Use `get_keyword_metrics` to hydrate a known candidate list in one batch.
5. Use `get_serp_results` only for ambiguous intent or final-priority terms in standard web search.
6. Use `get_search_console_performance` when a connected site may already have striking-distance queries.

For a focused cross-provider check, use `get_provider_keyword_ideas` with `provider: "ahrefs"` or `"semrush"` for one reviewed keyword. Ahrefs ideas report relative volume and difficulty buckets, not exact figures; Semrush returns numeric metrics. Use `get_ahrefs_keyword_metrics` separately only when its difficulty and estimated referring domains needed to rank would change the decision. These provider results are saved for 24 hours; a first lookup or `refresh: true` may use credits.

If a Rankizz call is unavailable because of entitlement or credit balance, stop Rankizz calls and tell the user: "This feature is unavailable because the connected account does not have the required entitlement or credit balance." Complete the qualitative portion without fabricated metrics.

State why a credit-using call is needed, prefer batching, and avoid repeating fresh research already returned in the session. Ask before enabling any higher-cost refinement option.

## Evaluate opportunities

Read [references/research-method.md](references/research-method.md). Evaluate fit before volume:

- business and audience relevance
- search intent and expected page type
- conversion proximity
- evidence of demand
- difficulty and SERP strength when available
- current site authority and topical coverage
- existing ranking page or cannibalization risk
- confidence and data freshness

Treat provider metrics as estimates, not guarantees. Do not discard a strategically important low-volume term solely because its reported volume is small or unavailable.

## Deliver

Return:

1. a concise market and intent summary
2. 10–25 prioritized opportunities when enough evidence exists
3. a longer candidate table grouped into target now, validate, later, and exclude
4. SERP or metric caveats
5. the next recommended action

For each prioritized keyword include phrase, intent, recommended page type, relevance, volume/KD/CPC when actually available, current page if any, rationale, confidence, and source date.

Ask before calling `save_keywords` or applying tags. Never persist a discarded or unreviewed bulk list automatically.
