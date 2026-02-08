

# Plan: Add SEO Score and Routing Rule Section to "Jobs in Swaasa" Sidebar Only

## Overview

Add a new section inside the Stage Details sidebar that appears **only** when clicking the "Jobs in Swaasa" pipeline node. It will be positioned directly below the "In-Stage Progress" funnel and will display:

1. SEO Score metrics for the job posting (overall score + individual metric breakdowns)
2. A routing rule status indicator showing that jobs scoring below 80/100 are automatically assigned to a human reviewer

---

## What It Will Look Like

**SEO Score Panel:**
- A prominent overall SEO score (e.g., 72/100) with color-coded indicator
- Individual metric progress bars for: Title Optimization, Description Quality, Keyword Match, Location Optimization, Mobile Readiness
- Color coding: Green (80+), Amber (60-79), Red (below 60)

**Routing Rule Alert:**
- A visually distinct alert banner below the metrics
- Shows: "If SEO Score < 80 -> Assign to Human Reviewer"
- Displays "Rule Triggered" (red) if score is below 80, or "Passed" (green) if 80+
- Shows target queue: Recruiter Review

---

## Changes

### 1. Add SEO Score Data to Mock Data

**File:** `src/lib/mockData.ts`

- Define a `JobSEOScore` interface with fields: `overall`, `titleOptimization`, `descriptionQuality`, `keywordMatch`, `locationOptimization`, `mobileReadiness`
- Add an optional `seoScore` property to the `EnhancedStageMetrics` interface (only populated for the `jobs-ankura` stage)
- Populate SEO score data in the `jobs-ankura` enhanced stage metrics for all 17 jobs with varied scores (some above 80, some below, to demonstrate both rule states)

### 2. Create SEO Score and Rule Card Component

**File:** `src/components/customer/stage-metrics/SEOScoreRuleCard.tsx` (new file)

A new component that receives the SEO score data and renders:
- Overall score with a large number display and color-coded background
- Individual metric rows with progress bars and percentage labels
- A routing rule status section showing:
  - Rule name: "Low SEO Score"
  - Condition: `seo_score < 80`
  - Action: "Route to Recruiter Review"
  - Dynamic status badge: "Triggered" or "Passed" based on actual score

### 3. Export the New Component

**File:** `src/components/customer/stage-metrics/index.ts`

Add export for `SEOScoreRuleCard`.

### 4. Render in Stage Details Sheet (Jobs in Swaasa Only)

**File:** `src/components/customer/StageDetailsSheet.tsx`

- Import the `SEOScoreRuleCard` component
- Add a conditional render block right after the `InStageProgressFunnel` (line 268) and before the Attribution Bar (line 270)
- Only render when `stageId === "jobs-ankura"` and SEO data exists in the metrics

The placement in the sidebar will be:

```text
+----------------------------+
| Stage Header + SLA Badge   |
+----------------------------+
| In-Stage Progress Funnel   |
+----------------------------+
| SEO Score + Routing Rule   |  <-- NEW (only for "Jobs in Swaasa")
+----------------------------+
| AI/Human/HITL Attribution  |
+----------------------------+
| Stage-Specific Metrics     |
+----------------------------+
| Conversion Analysis        |
+----------------------------+
| ... remaining sections     |
+----------------------------+
```

---

## Files to Create/Modify

1. **`src/lib/mockData.ts`** -- Add `JobSEOScore` interface, add `seoScore` property to `EnhancedStageMetrics`, populate data for all jobs' `jobs-ankura` stage
2. **`src/components/customer/stage-metrics/SEOScoreRuleCard.tsx`** -- New component (SEO metrics + routing rule status)
3. **`src/components/customer/stage-metrics/index.ts`** -- Export new component
4. **`src/components/customer/StageDetailsSheet.tsx`** -- Conditionally render SEO card for `jobs-ankura` stage only

---

## Technical Details

- The SEO section is rendered **only** when `stageId === "jobs-ankura"` (the "Jobs in Swaasa" stage), since SEO is only relevant to the job posting stage
- SEO data lives inside `EnhancedStageMetrics` as an optional `seoScore` property, so no changes are needed to `PipelineBoardDialog.tsx` or the component props chain -- the data flows through the existing `metrics` prop
- The routing rule status is computed dynamically: if `seoScore.overall < 80`, it shows "Rule Triggered" with a red/amber badge; otherwise "Passed" with a green badge
- Individual metric color thresholds: green (80+), amber (60-79), red (below 60)
- The rule details reference `rule-029` from the existing mock data for consistency
