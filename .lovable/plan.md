

# Plan: Add SEO Score Rule to Routing Rules

## Overview

Add a new routing rule that automatically assigns a job posting to a human reviewer when its SEO score falls below 80/100.

---

## Changes

### 1. Add New Rule Entry to Mock Data

**File:** `src/lib/mockData.ts`

Add a new rule (`rule-029`) to the `hitlRulesV2` array at the end (before the closing bracket on line 3949):

| Field | Value |
|-------|-------|
| ID | rule-029 |
| Name | Low SEO Score |
| Description | Assign job posting to human reviewer when SEO score is below 80 |
| Rule Type | `posting` (Job Posting category) |
| Stage | `job_posting` |
| Condition Metric | `seo_score` |
| Operator | `<` |
| Threshold Value | 80 |
| Action Type | `route_to_queue` (Assign to Human) |
| Target Queue | `recruiter_review` |
| Priority | P2 (High) |
| Status | `active` |

### 2. Add "seo_score" to Condition Metrics List

**File:** `src/components/orchestration/RulesTab.tsx`

Add a new entry to the `CONDITION_METRICS` array so users can select "SEO Score" when building or editing rules in the Rule Builder panel:

```
{ value: "seo_score", label: "SEO Score (out of 100)" }
```

---

## Files to Modify

1. **`src/lib/mockData.ts`** -- Add rule-029 (Low SEO Score) to the `hitlRulesV2` array
2. **`src/components/orchestration/RulesTab.tsx`** -- Add `seo_score` to the condition metrics dropdown

---

## Outcome

- A new "Low SEO Score" rule appears in the Routing Rules table under the "Job Posting" category
- The rule condition reads: `seo_score < 80`
- The action is "Route to Queue" targeting the Recruiter Review queue (human assignment)
- The rule is active and visible in both the HITL rules view and the Pipeline Template Editor's Rules tab

