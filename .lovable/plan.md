
# Move Aggregate Funnel Chart to Funnel Analytics Tab

## Overview
Move the "Aggregate Funnel - AI vs Human Split" stacked bar chart from the Job Explorer tab to the Funnel Analytics tab on the Jobs & Funnel page.

## Current Location
The `AggregateFunnelChart` component is currently rendered at the bottom of the **Job Explorer** tab (line 134).

## Target Location
Move it to the **Funnel Analytics** tab, placing it after the main "Hiring Pipeline Funnel" chart and before the "Conversion & Time Analysis" section.

---

## Technical Changes

**File:** `src/pages/FunnelAnalytics.tsx`

| Change | Description |
|--------|-------------|
| Remove from Job Explorer tab | Delete line 134: `<AggregateFunnelChart data={aggregateFunnelData} />` |
| Add to Funnel Analytics tab | Insert after the `<FunnelChart>` component (after line 176) |

---

## New Layout for Funnel Analytics Tab

1. Key Metrics (4 cards)
2. Hiring Pipeline Funnel
3. **Aggregate Funnel - AI vs Human Split** (moved here)
4. Conversion & Time Analysis (2-column grid)
5. Top Drop-off Reasons

---

## Result
The AI vs Human Split chart will appear in the Funnel Analytics tab where it logically belongs with other funnel analysis visualizations, while the Job Explorer tab will focus purely on the jobs table and metrics.
