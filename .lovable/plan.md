

## Enrich "Review JD SEO" Node with SEO Score, Suggestions, and AI/Human Actions

### Problem
Clicking the "Review JD SEO" node in the pipeline board shows generic volume metrics but no SEO-specific content: no SEO score, no editing suggestions, no AI action detail, and no human action detail.

### Solution
Three changes:

### 1. Add `seoScore` and new fields to the `review-jd-seo` mock data
**File: `src/lib/mockData.ts`**

Add to the `review-jd-seo` enhancedStageMetrics entry for JOB-001:
- `seoScore` object (reusing `JobSEOScore` type) with realistic values
- Update `aiTaskDescription` to "AI SEO optimization to make JD more search-friendly"
- Update `humanTaskDescription` to "Job Description editing and final approval"

Also add a new optional field `jdSeoDetails` to the `EnhancedStageMetrics` interface to hold SEO-specific suggestions:

```
jdSeoDetails?: {
  suggestions: string[];
  aiAction: string;
  humanAction: string;
}
```

Populate it for the `review-jd-seo` entry with:
- `suggestions`: ["Add salary range to improve CTR", "Include 3+ relevant keywords", "Shorten title to under 60 characters", "Add location-specific benefits"]
- `aiAction`: "AI SEO optimization to make JD more search-friendly"
- `humanAction`: "Job Description editing and approval"

### 2. Create a `ReviewJDSEOMetricsCard` component
**File: `src/components/customer/stage-metrics/ReviewJDSEOMetricsCard.tsx`** (new file)

A dedicated card that renders:
- The existing `SEOScoreRuleCard` (overall score, individual metrics, routing rule)
- A "Suggested Edits" section listing improvement suggestions with icons
- An "AI Action" card showing what the AI SEO agent did
- A "Human Action" card showing what the recruiter needs to do

### 3. Wire it into StageDetailsPanel
**File: `src/components/customer/StageDetailsPanel.tsx`**

- Add `review-jd-seo` case to the `StageSpecificMetrics` switch to render the new `ReviewJDSEOMetricsCard`
- Add `review-jd-seo` to the `hasStageSpecificMetrics` check
- Import the new component

### 4. Export from stage-metrics index
**File: `src/components/customer/stage-metrics/index.ts`**

Add export for `ReviewJDSEOMetricsCard`.

### Files to modify
- `src/lib/mockData.ts` -- add `jdSeoDetails` to interface + populate `seoScore` and `jdSeoDetails` for `review-jd-seo`
- `src/components/customer/stage-metrics/ReviewJDSEOMetricsCard.tsx` -- new component
- `src/components/customer/stage-metrics/index.ts` -- add export
- `src/components/customer/StageDetailsPanel.tsx` -- add switch case and hasStageSpecificMetrics entry

