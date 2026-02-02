

# Swaasa Admin Dashboard - Real-time Hiring Operations

Redesign the main Admin Dashboard (Index.tsx) to serve as a centralized Hiring Operations Command Center with real-time visibility into AI-driven hiring workflows, HITL operations, job pipelines, and business metrics.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/pages/Index.tsx` | Modify | Complete redesign with new widgets, global filters, and PRD-compliant layout |
| `src/lib/mockData.ts` | Modify | Add new data for job pipeline health table and enterprise customers |
| `src/components/dashboard/JobPipelineHealthTable.tsx` | Create | New table component for job pipeline health with SLA indicators |
| `src/components/dashboard/AIEvaluationMetrics.tsx` | Create | Panel showing AI match accuracy, override rates, and governance signals |
| `src/components/dashboard/GlobalFilters.tsx` | Create | Duration selector and customer selector components |

---

## Dashboard Layout

```text
+----------------------------------------------------------+
| Dashboard                      [Duration] [Customer]      |
| Real-time hiring operations                              |
+----------------------------------------------------------+
| [Active Jobs] [Candidates] [AI Coverage] [SLA] [Margin]  |
|  Pipelines     in Pipeline    (%)       (%)     (%)      |
+----------------------------------------------------------+
|                              |                           |
| Hiring Activity Trends       | AI vs Human vs HITL       |
| (Multi-line Chart)           | Workload (Donut)          |
|                              |                           |
+----------------------------------------------------------+
|                              |                           |
| AI Evaluation Metrics Panel  | Revenue Intelligence      |
| - Match Accuracy             | Panel                     |
| - Override Rate              | - Total Revenue           |
| - HITL Escalation            | - Revenue per Placement   |
| - Automation Failure         | - AI Cost Savings         |
|                              |                           |
+----------------------------------------------------------+
|                                                          |
| Job Pipeline Health Table                                |
| Job ID | Customer | Stage | Bottleneck | AI/Human | SLA  |
|                                                          |
+----------------------------------------------------------+
```

---

## Technical Details

### 1. Global Filters Component (GlobalFilters.tsx)

**Duration Selector** - Segmented control with options:
- Today
- Last 7 days
- Last 30 days (default)
- Last Quarter
- Custom Range

**Customer Selector** - Searchable dropdown with:
- All Customers (default)
- Individual enterprise customers (Ankura Hospital, Oasis Fertility, etc.)

```tsx
interface GlobalFiltersProps {
  duration: string;
  onDurationChange: (value: string) => void;
  customer: string;
  onCustomerChange: (value: string) => void;
}
```

### 2. KPI Summary Cards Update

Replace current metrics with PRD-specified metrics:

| Metric | Value Source | Icon | Variant |
|--------|-------------|------|---------|
| Active Job Pipelines | Count of active jobs | Briefcase | success |
| Candidates in Pipeline | Total candidates across funnels | Users | info |
| AI Automation Coverage | AI Tasks / Total Tasks % | Bot | primary |
| Hiring SLA Compliance | Jobs within SLA / Total Jobs % | Clock | warning |
| Gross Margin | (Revenue - Cost) / Revenue % | DollarSign | default |

### 3. Hiring Activity Trends Chart

Update the existing ConversionChart to include HITL Overrides:
- AI Matches (teal)
- Human Matches (amber)
- HITL Overrides (blue) - **new line**
- Final Placements (purple)

Add to mockData:
```tsx
export const hiringActivityTrend = [
  { date: "Jan 1", aiMatches: 420, humanMatches: 180, hitlOverrides: 28, placements: 45 },
  // ... more data points
];
```

### 4. AI vs Human vs HITL Workload Chart

Update existing donut chart segments:
- AI Automated (68%) - teal
- Human Handled (24%) - amber  
- HITL Review (8%) - blue

Center label: "68% AI Coverage"

### 5. AI Evaluation Metrics Panel (AIEvaluationMetrics.tsx)

New component displaying governance signals:

```tsx
interface AIEvaluationMetricsProps {
  metrics: {
    matchAccuracy: number;
    fitScoreAcceptance: number;
    overrideRate: number;
    escalationRate: number;
    automationFailure: number;
  };
}
```

Visual design: Progress bars with targets and status indicators.

### 6. Revenue Intelligence Panel

Update existing panel with:
- Total Revenue (₹X.XXM)
- Revenue per Placement (₹X,XXX)
- AI Cost Savings Estimate (calculated as avoided recruiter hours x cost)
- Revenue vs Automation Correlation indicator

### 7. Job Pipeline Health Table (JobPipelineHealthTable.tsx)

New table component with columns:

| Column | Description |
|--------|-------------|
| Job ID | Job identifier with link to detail |
| Enterprise Customer | Company name |
| Funnel Stage | Current stage badge |
| Bottleneck Stage | Stage with lowest conversion |
| AI vs Human % | Progress bar showing split |
| SLA Risk | Green/Amber/Red indicator |

**SLA Risk Logic:**
- Green: On track (> 24hrs buffer)
- Amber: At risk (< 24hrs buffer)  
- Red: SLA breach

```tsx
interface JobPipelineHealthRow {
  jobId: string;
  customer: string;
  currentStage: string;
  bottleneckStage: string;
  aiPercentage: number;
  humanPercentage: number;
  slaRisk: "green" | "amber" | "red";
  slaDetails: string;
}
```

### 8. MockData Additions

Add to mockData.ts:

```tsx
export const enterpriseCustomers = [
  { id: "cust-001", name: "Ankura Hospital", tier: "enterprise" },
  { id: "cust-002", name: "Oasis Fertility", tier: "enterprise" },
  // ... more customers
];

export const jobPipelineHealth = jobs.map(job => ({
  jobId: job.id,
  customer: job.employer,
  currentStage: getCurrentStage(job),
  bottleneckStage: getBottleneckStage(job),
  aiPercentage: job.aiContribution,
  humanPercentage: job.humanContribution,
  slaRisk: calculateSLARisk(job.daysOpen, job.status),
}));

export const aiEvaluationMetrics = {
  matchAccuracy: 87.4,
  fitScoreAcceptance: 82.1,
  overrideRate: 8.2,
  escalationRate: 5.4,
  automationFailure: 1.2,
};
```

---

## Interaction Behaviors

1. **Duration Filter**: Updates all widgets to show data for selected time range
2. **Customer Filter**: Filters all job-related data to selected customer
3. **KPI Cards**: Clickable to navigate to detailed analytics pages
4. **Job Table Rows**: Clickable to open Job Funnel Explorer (existing PipelineBoardDialog)
5. **Chart Tooltips**: Show detailed values on hover

---

## File Structure

```text
src/
  components/
    dashboard/
      GlobalFilters.tsx (new)
      JobPipelineHealthTable.tsx (new)
      AIEvaluationMetrics.tsx (new)
      AIWorkloadChart.tsx (exists - minor update)
      ConversionChart.tsx (exists - add HITL line)
  pages/
    Index.tsx (major update)
  lib/
    mockData.ts (add new data structures)
```

---

## Result

The Admin Dashboard will transform into a comprehensive Hiring Operations Command Center that:

- Provides real-time visibility into all active job pipelines
- Shows AI vs Human vs HITL workload distribution at a glance
- Displays AI governance metrics for trust monitoring
- Highlights job pipeline bottlenecks and SLA risks
- Enables filtering by time period and customer
- Supports drill-down navigation to detailed views

