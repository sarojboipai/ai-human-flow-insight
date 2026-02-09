

# Plan: Add "AOP x WBR" Tab to Admin Dashboard Overview Section

## Overview

Add a new "AOP x WBR" navigation item in the Admin sidebar under the "Overview" group, linking to a new `/wbr-aop` route. This page will be a unified executive dashboard that aligns Weekly Business Review (WBR) operations with Annual Operating Plan (AOP) targets, providing KPIs, target vs actual tracking, trend charts, segment drill-downs, and risk alerts.

---

## What Will Be Built

### Sidebar Navigation
A new "AOP x WBR" item will be added to the Admin sidebar's "Overview" section, right after "Dashboard" and "Job Pipeline", using the `Target` icon (or `BarChart3`).

### Dashboard Sections

The page will contain six main sections:

| Section | Description |
|---------|-------------|
| **Header + Filters** | Year/Quarter/Month time selector, Geography, Client Tier, Job Category filters, KPI mode toggle (Revenue / Jobs / Placements / SLA) |
| **AOP Scorecard** | 4 KPI cards: Revenue Attainment, Jobs Attainment, Placement Attainment, Ops Efficiency Index |
| **AOP Trend and Forecast** | Cumulative line chart (Target vs Actual vs Forecast) + monthly run-rate bar chart with gap indicators |
| **Pipeline Health vs AOP Impact** | Funnel visualization showing volume, conversion, drop-off, and AOP risk score per stage |
| **Segment Drill-Down Tables** | 3 tables: Performance by Client Segment, by Category, and by Team/Recruiter |
| **Risk and Alerts Panel** | AOP risk signals, pipeline bottleneck alerts, SLA breach alerts |

---

## Implementation

### 1. Add AOP Mock Data

**File:** `src/lib/mockData.ts`

Add comprehensive mock data including:
- AOP targets interface and data (annual goals for Revenue, Jobs, Placements, Margin, AI Coverage)
- Monthly actuals and forecast data for trend charts
- Client segment performance data
- Job category performance data
- Team/recruiter AOP performance data
- Risk signals array
- Helper functions for calculating attainment percentages and run-rates

```typescript
export interface AOPTargets {
  year: string;
  revenue: { target: number; actual: number; forecast: number };
  jobs: { target: number; actual: number; forecast: number };
  placements: { target: number; actual: number; forecast: number };
  margin: { target: number; actual: number };
  aiCoverage: { target: number; actual: number };
}

export interface AOPMonthlyTrend {
  month: string;
  revenueTarget: number;
  revenueActual: number;
  revenueForecast: number;
  jobsTarget: number;
  jobsActual: number;
  placementsTarget: number;
  placementsActual: number;
}
```

### 2. Create the AOP x WBR Dashboard Page

**File:** `src/pages/WBRAOPCockpit.tsx` (new file)

A comprehensive page using `DashboardLayout` with these sections:

**Header and Filters:**
- Time selector (Year / Q1-Q4 / Monthly)
- Filters: Geography, Client Tier, Job Category
- KPI mode toggle buttons: Revenue | Jobs | Placements | SLA

**AOP Scorecard (4 KPI Cards):**
- Revenue AOP Attainment (target, actual, attainment %, forecast)
- Jobs AOP Attainment (posted, active, filled)
- Placement AOP Attainment (target, actual, fill rate)
- Ops Efficiency Index (SLA adherence, automation %, HITL escalations)
- Each card uses color-coded variance: Green (within 5%), Yellow (5-15% gap), Red (>15% gap)

**AOP Trend and Forecast Section:**
- Cumulative line chart using Recharts (Target line, Actual line, Forecast dashed line)
- Monthly run-rate bar chart showing required vs current run-rate
- Gap indicator badges (red/amber/green)

**Pipeline Health vs AOP Impact:**
- Horizontal funnel bars for each stage (Job Posting through Placement)
- Each stage shows: Volume, Conversion %, Drop-off %, SLA breach count, AOP risk score

**Segment Drill-Down Tables:**
- Table 1: Client Segment (Enterprise/Mid-Market/SMB) with AOP target vs actual
- Table 2: Job Category (Doctors/Nurses/Allied Health/Non-Clinical)
- Table 3: Team/Recruiter performance against AOP targets

**Risk and Alerts Panel:**
- Color-coded alert cards with risk messages
- Pipeline bottleneck alerts
- SLA breach alerts
- Automation fallback alerts

### 3. Update Sidebar Navigation

**File:** `src/components/layout/AppSidebar.tsx`

Add "AOP x WBR" to the `mainNavItems` array in the "Overview" section:

```typescript
const mainNavItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Job Pipeline", url: "/funnel", icon: TrendingUp },
  { title: "AOP x WBR", url: "/wbr-aop", icon: BarChart3 },  // NEW
];
```

### 4. Add Route

**File:** `src/App.tsx`

Add the route for the new page:

```typescript
import WBRAOPCockpit from "./pages/WBRAOPCockpit";
// ...
<Route path="/wbr-aop" element={<WBRAOPCockpit />} />
```

---

## Files to Create/Modify

1. **`src/lib/mockData.ts`** -- Add AOP targets, monthly trends, segment data, risk signals, and helper functions
2. **`src/pages/WBRAOPCockpit.tsx`** -- New page with all 6 dashboard sections (new file)
3. **`src/components/layout/AppSidebar.tsx`** -- Add "AOP x WBR" nav item to Overview group
4. **`src/App.tsx`** -- Add `/wbr-aop` route

---

## Technical Details

- Uses `DashboardLayout` (same as Dashboard, Job Pipeline, Revenue pages) for consistent Admin persona layout
- Reuses existing `MetricCard` component for KPI cards where applicable
- Uses Recharts (already installed) for line charts, bar charts, and area charts
- Uses existing UI components: Card, Table, Badge, Tabs, Select, Button
- Color-coded variance heatmap thresholds:
  - Green: variance >= -5% (on track)
  - Yellow: variance >= -15% (at risk)
  - Red: variance < -15% (off track)
- KPI mode toggle switches all charts and tables between Revenue, Jobs, Placements, and SLA views
- All data is mock data with realistic values aligned to the existing enterprise customers and job data
- The page follows the existing pattern of other Admin pages (DashboardLayout wrapper, header with title/subtitle, filters row, content sections)

