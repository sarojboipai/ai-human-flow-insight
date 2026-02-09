

# Plan: Upgrade AOP x WBR Cockpit to Feb-Jan Fiscal Year with WBR Assisted Hiring Layer

## Overview

Transform the existing AOP x WBR Cockpit to align with Swaasa's Feb-Jan fiscal year cycle and add a new WBR (Weekly Business Review) section focused on Assisted Hiring execution metrics, plus a causal mapping layer that links weekly performance to annual AOP targets.

---

## What Changes

### A. Fiscal Calendar Alignment (Feb-Jan)

All monthly trend data, labels, and fiscal year references will be updated from the current Apr-Mar assumption to a **Feb-Jan cycle**:
- Month 1 = February, Month 12 = January
- Fiscal year label changes from "FY 2025-26" to "FY2026 (Feb 2025 - Jan 2026)"
- Quarter definitions: Q1 (Feb-Apr), Q2 (May-Jul), Q3 (Aug-Oct), Q4 (Nov-Jan)
- Time selector labels updated accordingly

### B. New WBR Assisted Hiring Section

A new collapsible section inserted between the AOP Trend charts and Pipeline Health table, containing:

| Component | Description |
|-----------|-------------|
| **Weekly Placements Trend** | Bar chart showing Assisted Hiring placements for the last 8 weeks (WoW comparison) |
| **WBR KPI Row** | 4 mini KPI cards: Weekly Placements, Weekly Revenue, Active Assisted Hiring Jobs, Candidate Backlog |
| **Backlog Aging Buckets** | Horizontal stacked bar: 0-3 days, 4-7 days, 8+ days candidates in pipeline |
| **Recruiter Capacity vs Demand** | Bar chart comparing available recruiter slots vs open demand |

### C. WBR-to-AOP Causal Mapping Panel

A new card showing how weekly metrics translate to annual targets:

| WBR Metric | AOP Impact | Current Value | Required | Status |
|------------|-----------|--------------|----------|--------|
| Weekly Placements | Annual Placement Target | 168/wk | 192/wk | At Risk |
| Weekly Revenue | Annual Revenue Target | 222L/wk | 250L/wk | At Risk |
| Screening SLA | Fill Rate | 82% | 90% | Warning |
| Recruiter Productivity | Capacity vs AOP | 14.2/rec | 16.0/rec | On Track |

---

## Implementation Details

### 1. Update Mock Data -- Fiscal Calendar + WBR Data

**File:** `src/lib/mockData.ts`

**Changes:**
- Update `aopTargets.year` to `"FY2026 (Feb 2025 – Jan 2026)"`
- Replace `aopMonthlyTrends` months from `["Apr","May",...,"Mar"]` to `["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan"]` with adjusted cumulative values
- Add new WBR interfaces and mock data:

```typescript
export interface WBRWeeklyData {
  week: string;        // e.g. "W1 Feb", "W2 Feb"
  placements: number;
  revenue: number;
  activeJobs: number;
  backlog: number;
}

export interface WBRBacklogBucket {
  bucket: string;      // "0-3 days", "4-7 days", "8+ days"
  screened: number;
  interviewed: number;
  offered: number;
}

export interface WBRCausalMapping {
  wbrMetric: string;
  aopImpact: string;
  currentValue: string;
  requiredValue: string;
  status: "on_track" | "at_risk" | "off_track";
  logic: string;
}
```

- Add 8 weeks of `wbrWeeklyData`
- Add `wbrBacklogBuckets` data
- Add `wbrRecruiterCapacity` data (available vs demand)
- Add `wbrCausalMappings` array
- Update quarter filter labels to match Feb-Jan fiscal calendar
- Update risk signals to reference fiscal quarters correctly

### 2. Update the WBRAOPCockpit Page

**File:** `src/pages/WBRAOPCockpit.tsx`

**Changes:**

**Header/Filters:**
- Update subtitle to show "FY2026 (Feb 2025 - Jan 2026)"
- Change quarter filter labels: Q1 (Feb-Apr), Q2 (May-Jul), Q3 (Aug-Oct), Q4 (Nov-Jan)
- Add "Week" option to time toggle

**New WBR Section (between Trend charts and Pipeline Health):**
- Add a `WBRAssistedHiringSection` component containing:
  - Section header: "WBR -- Swaasa Assisted Hiring Execution"
  - 4 mini KPI cards in a row (Weekly Placements, Weekly Revenue, Active Jobs, Backlog)
  - Weekly placements bar chart (last 8 weeks, WoW trend)
  - Backlog aging horizontal stacked bar chart
  - Recruiter capacity vs demand bar chart

**New Causal Mapping Card (after WBR section):**
- Add a `WBRtoAOPCausalMapping` component:
  - Table showing WBR metric, AOP impact, current vs required values, color-coded status
  - Brief logic description for each mapping

**Updated page layout order:**
1. Filters row (with fiscal year labels)
2. AOP Scorecard (4 KPI cards) -- existing, no change
3. AOP Trend + Run-Rate charts -- existing, fiscal months updated via data
4. **WBR Assisted Hiring Section** -- NEW
5. **WBR to AOP Causal Mapping** -- NEW
6. Pipeline Health table -- existing, no change
7. Segment Drill-Down tables -- existing, no change
8. Risk and Alerts panel -- existing, risk messages updated

---

## Files to Modify

1. **`src/lib/mockData.ts`** -- Update fiscal calendar in monthly trends, add WBR interfaces and mock data, update risk signal messages
2. **`src/pages/WBRAOPCockpit.tsx`** -- Update fiscal labels, add WBR section and causal mapping components

---

## Technical Notes

- All new components are defined inline within `WBRAOPCockpit.tsx` (following existing pattern -- `AOPScorecard`, `AOPTrendChart`, etc. are all inline)
- Recharts is used for all new charts (already installed)
- Color coding reuses existing `varianceBadgeMap` and `getAOPVarianceColor` utilities
- No new dependencies required
- The fiscal month order in the trend chart X-axis will naturally read Feb, Mar, Apr, ..., Dec, Jan since the data array is ordered that way

