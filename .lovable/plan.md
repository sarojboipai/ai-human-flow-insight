

# Move Aggregate Funnel Chart Below Jobs Pipeline

Reorder the widgets in the Job Explorer tab so the "Aggregate Funnel - AI vs Human Split" chart appears after the Jobs Pipeline table.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/pages/FunnelAnalytics.tsx` | Modify | Swap order of AggregateFunnelChart and CustomerJobsTable |

---

## Technical Details

### Current Order (lines 130-134)

```text
Job Metrics Cards
     |
     v
AggregateFunnelChart  <-- Currently first
     |
     v
CustomerJobsTable     <-- Currently second
```

### New Order

```text
Job Metrics Cards
     |
     v
CustomerJobsTable     <-- Moved up
     |
     v
AggregateFunnelChart  <-- Moved down
```

---

## Code Change

**File: `src/pages/FunnelAnalytics.tsx` (lines 130-134)**

```tsx
// Before
{/* Aggregate Funnel Chart */}
<AggregateFunnelChart data={aggregateFunnelData} />

{/* Jobs Pipeline Table */}
<CustomerJobsTable />

// After
{/* Jobs Pipeline Table */}
<CustomerJobsTable />

{/* Aggregate Funnel Chart */}
<AggregateFunnelChart data={aggregateFunnelData} />
```

---

## Result

On the Jobs & Funnel page (Job Explorer tab), the layout will be:
1. **Job Metrics Cards** - Active Jobs, Avg Conversion, Avg Days Open, Pipeline Value
2. **Jobs Pipeline Table** - Detailed list of jobs with View Pipeline button
3. **Aggregate Funnel Chart** - AI vs Human Split visualization

