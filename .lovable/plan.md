

# Add Ops Manager Dashboard Metrics

Enhance the Operations Dashboard with 8 key hiring metrics to provide a comprehensive operational view.

---

## Requested Metrics

| Metric | Description | Data Type |
|--------|-------------|-----------|
| Active Jobs | Total number of open job requisitions | Count |
| AI vs Human Split | Percentage distribution of AI vs Human tasks | Percentage |
| HITL Queue Volume | Number of tasks awaiting human review | Count + trend |
| Positions Required vs Filled | Comparison of demand vs fulfillment | Ratio (e.g., 156/89) |
| Job Fulfilment Rate (%) | Percentage of positions successfully filled | Percentage |
| Avg Time to Fill (TTF) | Average days to fill a position | Days |
| SLA Breach Count | Number of jobs exceeding SLA thresholds | Count |
| At-risk Jobs (Red flagged) | Jobs approaching or in breach status | Count |

---

## Current vs New Layout

**Current (4 metrics):**
- Active Pipelines
- AI vs Human Split
- HITL Queue Volume
- Pipeline SLA Status

**New (8 metrics):**
Row 1: Active Jobs, AI vs Human Split, HITL Queue Volume, Positions Required vs Filled
Row 2: Job Fulfilment Rate, Avg Time to Fill, SLA Breach Count, At-risk Jobs

---

## Changes

### 1. Extend Mock Data

**File:** `src/lib/mockData.ts`

Add new KPI fields to `opsDashboardKPIs`:

```typescript
export const opsDashboardKPIs = {
  // Existing
  activePipelines: 12,
  aiTaskDistribution: 68,
  humanTaskDistribution: 32,
  hitlQueueVolume: 47,
  hitlQueueTrend: 12,
  pipelineSLAStatus: { green: 8, amber: 3, red: 1 },
  topTemplates: [...],
  
  // NEW metrics
  activeJobs: 156,
  positionsRequired: 156,
  positionsFilled: 89,
  jobFulfilmentRate: 57.1,  // (89/156)*100
  avgTimeToFill: 18,        // Days
  slaBreachCount: 4,
  atRiskJobs: 7,
};
```

### 2. Update Dashboard Metrics

**File:** `src/pages/OpsDashboard.tsx`

Replace the current 4-metric grid with an 8-metric layout (2 rows of 4):

| Metric | Icon | Color | Subtitle |
|--------|------|-------|----------|
| Active Jobs | Briefcase | Primary | Open positions across all pipelines |
| AI vs Human Split | Bot | Emerald | Shows % breakdown |
| HITL Queue Volume | Users | Amber | Trend indicator (+/-%) |
| Positions Required vs Filled | Target | Blue | Shows ratio X/Y |
| Job Fulfilment Rate | CheckCircle | Success | Percentage with trend |
| Avg Time to Fill | Clock | Warning | Days with benchmark |
| SLA Breach Count | AlertTriangle | Destructive | Critical count |
| At-risk Jobs | AlertCircle | Destructive | Jobs needing attention |

---

## Visual Design

The metrics will use the existing Card component with consistent styling:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│  Active Jobs    │  AI vs Human   │  HITL Queue    │  Positions Filled      │
│      156        │  Split 68%/32% │     47 (+12%)  │     89 / 156           │
│  Open positions │  AI automation │  From last wk  │  Positions filled      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Fulfilment %   │  Avg TTF       │  SLA Breaches  │  At-risk Jobs          │
│     57.1%       │    18 days     │       4        │        7               │
│  +3.2% vs last  │  Target: 21d   │  Exceeded SLA  │  Red flagged           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Files Summary

| File | Action | Description |
|------|--------|-------------|
| `src/lib/mockData.ts` | Modify | Add new KPI fields to opsDashboardKPIs |
| `src/pages/OpsDashboard.tsx` | Modify | Update metrics array with 8 new cards in 2-row layout |

---

## Technical Details

The metrics grid will use `grid-cols-4` for desktop and `grid-cols-2` for tablet with a `gap-4` spacing. Each metric card uses the existing Card component with:
- Icon with color-coded background
- Large value display
- Descriptive subtitle
- Optional trend indicator where applicable

