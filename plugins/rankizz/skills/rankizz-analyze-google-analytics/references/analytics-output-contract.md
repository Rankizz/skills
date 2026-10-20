# Analytics decision-briefing contract

## 1. Decision and scope

- Question being answered
- GA4 property and project
- Complete current and comparison dates
- Property and cross-source timezones
- Channel, page, country, device, and breakdown filters
- Explicit landing-page exclusions and the number of GSC candidate rows removed

## 2. Evidence trust

Report:

- connected sources
- measurement-health issues relevant to the question
- thresholding, sampling, restrictions, truncation, pagination, or warnings
- whether each conclusion is observed, inferred, or unknown

## 3. Finding table

| Priority | Observation | Interpretation to test | Recommended action | Confidence | Re-check metric |
| --- | --- | --- | --- | --- | --- |

Every row must preserve the metric, segment/page/query, dates, and source supporting the observation. Do not present an interpretation as a measured fact.

## 4. Search opportunity queue

When available, include:

- query and landing page
- score and the three components
- opportunity types
- impressions, CTR, average position
- GA4 sessions, engagement, key events, transactions, and revenue when available
- join status, confidence, and coverage warning
- user-supplied exclusions and `excludedGscRows`
- next tool or human check

Do not rank unscored measurement gaps below scored rows as though null meant zero.

## 5. Action plan

For each action provide:

- expected mechanism
- owner
- effort
- prerequisite
- acceptance criterion
- re-check date and metric
- rollback or caution for high-risk changes

## 6. Boundaries

End with:

- what the data does not establish
- missing evidence that could reverse the recommendation
- configuration or connection work required
- actions requiring user approval
