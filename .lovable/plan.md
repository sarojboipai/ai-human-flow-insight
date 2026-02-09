
# Plan: WBR + AOP Unified Cockpit (Admin Tab)

## Overview

Add a new "WBR + AOP Cockpit" page to the Admin (Executive) navigation. This is a comprehensive executive control center that combines Weekly Business Review (WBR) operational metrics with Annual Operating Plan (AOP) targets, progress tracking, and variance analysis -- all on a single page.

The page will be accessible from the Admin sidebar under the "Overview" group, positioned between "Dashboard" and "Job Pipeline".

---

## Page Sections

The cockpit page will have 5 distinct sections, each rendered as a separate component:

### Header + Global Filters
- Title: "WBR + AOP Unified Cockpit"
- Subtitle: "Real-time operations aligned with annual hiring and revenue targets"
- Sticky filter bar with:
  - Duration Selector (This Week, Last Week, This Month, QTD, YTD, Custom Range)
  - Customer Selector (All Customers + enterprise customer list)

### Section 1: WBR Operations Overview
- 6 Metric Cards in a grid: Active Jobs, Candidates in Pipeline, Weekly Placements, AI Automation Rate, HITL Load, SLA Compliance
- Hiring Activity Trend chart (reuse existing ConversionChart component with WBR-specific weekly data)
- AI vs Human Workload donut chart (reuse existing AIWorkloadChart component)

### Section 2: AOP Target vs Actual Dashboard
- 5 AOP metric rows showing: Total Jobs, Total Placements, Revenue, Gross Margin, AI Coverage
- Each row shows AOP Target, Actual, Variance %, and a progress bar
- Color-coded variance heatmap: Green (on track, variance >= -5%), Yellow (minor risk, -5% to -15%), Red (off track, variance < -15%)

### Section 3: WBR vs AOP Alignment Insights
- Weekly Run Rate vs Required Run Rate comparison panel
- Auto-generated Risk Flags with alert banners
- Shows dynamic warnings like "Hiring velocity is X% below AOP required run rate"

### Section 4: Customer-Level AOP Performance
- Sortable table with columns: Customer, AOP Jobs, Actual Jobs, Placements, Revenue, SLA %, AI %
- Uses the existing enterprise customer data and job data to compute per-customer performance

### Section 5: Strategic Ops Levers Panel
- Read-only display of current operational control settings: AI Coverage Target, HITL Threshold, SLA Policy, Hiring Priority
- Styled as a grid of config cards

---

## Files to Create

### 1. `src/lib/wbrAopData.ts` (new)
Mock data file containing:
- `aopTargets` object with annual targets (totalJobs, totalPlacements, revenue, grossMargin, aiCoverage)
- `wbrWeeklyData` array for weekly trend charts
- `strategicLevers` array of control lever settings
- `calculateWBRKPIs()` function that filters jobs and computes WBR metrics
- `calculateAOPVariance()` function that computes target vs actual with variance
- `calculateCustomerAOPPerformance()` function for the customer scorecard table
- `generateRiskFlags()` function that produces dynamic warning messages

### 2. `src/components/wbr-aop/WBRMetricsSection.tsx` (new)
WBR Operations Overview section with 6 metric cards, hiring activity chart, and workload donut chart. Reuses existing `MetricCard`, `ConversionChart`, and `AIWorkloadChart` components.

### 3. `src/components/wbr-aop/AOPTargetDashboard.tsx` (new)
AOP Target vs Actual section with progress bars, variance indicators, and color-coded status badges. Each AOP metric row shows target, actual, variance %, and a progress bar.

### 4. `src/components/wbr-aop/WBRAOPAlignmentInsights.tsx` (new)
Alignment insights panel showing run rate comparison and auto-generated risk flags as alert banners with appropriate severity coloring.

### 5. `src/components/wbr-aop/CustomerAOPTable.tsx` (new)
Enterprise customer scorecard table with sortable columns showing per-customer AOP performance metrics.

### 6. `src/components/wbr-aop/StrategicLeversPanel.tsx` (new)
Grid of read-only configuration cards showing current operational control settings.

### 7. `src/pages/WBRAOPCockpit.tsx` (new)
Main page component that:
- Uses `DashboardLayout` (same layout as Dashboard)
- Manages filter state (duration, customer)
- Renders all 5 section components
- Passes filtered data to each section

---

## Files to Modify

### 8. `src/components/layout/AppSidebar.tsx`
Add a new navigation item to the `mainNavItems` array:
```
{ title: "WBR + AOP", url: "/wbr-aop", icon: BarChart3 }
```
Positioned between "Dashboard" and "Job Pipeline".

### 9. `src/App.tsx`
Add a new route:
```
<Route path="/wbr-aop" element={<WBRAOPCockpit />} />
```

---

## Component Reuse Strategy

The following existing components will be reused to maintain visual consistency:
- `MetricCard` -- for WBR KPI cards
- `ConversionChart` -- for hiring activity trend (with weekly WBR data)
- `AIWorkloadChart` -- for AI vs Human workload donut
- `GlobalFilters` -- adapted filter bar pattern (with WBR-specific duration options)
- `DashboardLayout` + `AppSidebar` -- standard page layout

---

## Data Architecture

All data will be derived from the existing `jobs` and `enterpriseCustomers` mock data, with new AOP target constants. The data flow:

1. User selects filters (duration, customer)
2. `calculateWBRKPIs(filteredJobs)` computes WBR operational metrics
3. `calculateAOPVariance(filteredJobs, aopTargets)` computes target vs actual
4. `calculateCustomerAOPPerformance(enterpriseCustomers, jobs)` builds the customer table
5. `generateRiskFlags(wbrKPIs, aopVariance)` produces dynamic alerts

---

## AOP Target Data (Mock)

| Metric | AOP Target |
|--------|-----------|
| Total Jobs | 50,000 |
| Total Placements | 10,000 |
| Revenue | Rs.120 Cr |
| Gross Margin | 45% |
| AI Coverage | 75% |

These will be defined as constants and compared against actual values computed from the filtered job data.

---

## Variance Color Thresholds

| Color | Condition | Meaning |
|-------|-----------|---------|
| Green | Variance >= -5% | On Track |
| Yellow | -5% > Variance >= -15% | Minor Risk |
| Red | Variance < -15% | Off Track |

---

## Summary of All Files

| # | File | Action |
|---|------|--------|
| 1 | `src/lib/wbrAopData.ts` | Create |
| 2 | `src/components/wbr-aop/WBRMetricsSection.tsx` | Create |
| 3 | `src/components/wbr-aop/AOPTargetDashboard.tsx` | Create |
| 4 | `src/components/wbr-aop/WBRAOPAlignmentInsights.tsx` | Create |
| 5 | `src/components/wbr-aop/CustomerAOPTable.tsx` | Create |
| 6 | `src/components/wbr-aop/StrategicLeversPanel.tsx` | Create |
| 7 | `src/pages/WBRAOPCockpit.tsx` | Create |
| 8 | `src/components/layout/AppSidebar.tsx` | Modify |
| 9 | `src/App.tsx` | Modify |

---

## Outcome

- A new "WBR + AOP" link appears in the Admin sidebar between Dashboard and Job Pipeline
- Clicking it opens a comprehensive executive cockpit with all 5 sections
- All data responds to the global Duration and Customer filters
- The page reuses existing chart/card components for visual consistency
- Risk flags and variance indicators provide at-a-glance decision support
