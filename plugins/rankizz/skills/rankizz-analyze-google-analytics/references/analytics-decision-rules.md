# Analytics decision rules

Use these rules to turn observations into next steps. They are triage heuristics, not universal causal claims.

## Organic momentum

| Evidence pattern | First interpretation to test | Next evidence | Possible action |
| --- | --- | --- | --- |
| Sessions down, impressions down | Search demand or visibility weakened | GSC query/page trend, rank tracking, SERPs | Refresh or strengthen pages only after locating the lost demand |
| Sessions down, impressions stable, CTR down | Snippet or intent fit may have weakened | Query-level CTR, title/snippet, current SERP features | Test title, description, or page-type alignment |
| Sessions stable, key events down | Traffic quality, page experience, offer, or tracking changed | Key events, landing pages, release/measurement history | Diagnose outcome path before increasing traffic |
| Sessions up, key-event rate down | Growth may be lower intent or a conversion leak emerged | Channel, landing page, device, query mix | Segment acquisition and repair the weak path |
| Traffic and outcomes up | A winner may deserve protection and expansion | Page/query coverage, backlinks, internal links | Protect intent fit; expand adjacent demand carefully |

Do not assign causality from period comparison alone. Check seasonality, campaigns, releases, tracking changes, and source coverage.

## Search opportunities

- `rank_lift`: the matched query-page pair is in positions 4–20. Inspect live intent and competing pages before editing.
- `ctr_lift`: demand is relatively strong while CTR trails peer candidates. Inspect SERP features, brand effects, title, snippet, and intent.
- `conversion_lift`: demand is relatively strong while the page trails peers on configured business outcomes. Inspect offer, CTA, trust, path, and whether the key event is appropriate.
- `protect_winner`: business value and reachability are both strong. Avoid risky rewrites; reinforce internal links, freshness, reliability, and relevant authority.
- `measurement_gap`: GSC demand exists but the landing page did not match GA4. Check hostname/path normalization, redirects, tagging, consent, cross-domain behavior, and date/source coverage before judging the page.

For every label shown to a user, provide both its meaning and its next action. Do not treat labels as self-explanatory, and do not turn them into autonomous content-change instructions.

Honor explicit landing-page exclusions before calculating relative percentiles. State how many candidate rows were removed. Never infer that a locale, template, product, tool, or branded page should be excluded simply because similar rows dominate the queue.

Prioritize high-confidence scored rows first, but keep a lower-score high-value business page visible when the user states strategic importance the score cannot know.

## Acquisition

- High sessions with weak engagement and outcomes: verify campaign/source accuracy, landing-page fit, and bot or internal traffic.
- Strong outcomes with low volume: preserve the source and test careful expansion.
- High `(not set)` share: repair attribution before fine-grained channel optimization.
- Internal/private referrals: review unwanted referrals, cross-domain measurement, and test traffic.
- Case-only source variants: normalize campaign tagging so reporting does not fragment.

## Ecommerce

- Item views without add-to-cart: inspect product relevance, price clarity, availability, and interaction tracking.
- Add-to-cart without purchase: inspect checkout friction, shipping/tax surprise, payment failure, and purchase-event coverage.
- Landing-page revenue with low sessions: protect and expand qualified acquisition.
- `none`: say no matching activity was reported, not that ecommerce is broken.
- `unknown`: fix completeness or limited-data uncertainty before concluding.

## Site search

- Frequent term with weak content or product coverage: create, improve, or surface the missing destination.
- Frequent support term: improve navigation, onboarding, documentation, or product language.
- Search events with weak engagement: review result relevance and zero-result handling.
- No rows plus disabled measurement: measurement gap, not absent demand.

## Audience

Use device and country differences to locate experience or market-fit questions. Use new-versus-returning differences to inspect acquisition versus retention journeys. Do not infer age, identity, intent, or individual behavior from aggregate segments.
