

# Hide Jobs Pipeline Table from Job Explorer Page

A minimal change to remove only the `JobFunnelTable` component from the Job Explorer tab while keeping the metric cards and aggregate funnel chart.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/pages/FunnelAnalytics.tsx` | Modify | Remove JobFunnelTable component and import |

---

## Technical Details

### Changes to FunnelAnalytics.tsx

1. **Remove the import** (line 7):
   ```tsx
   // Remove this line
   import { JobFunnelTable } from "@/components/jobs/JobFunnelTable";
   ```

2. **Remove `jobs` from the data import** (line 9):
   ```tsx
   // Change from:
   import { funnelData, jobs, aggregateFunnelData } from "@/lib/mockData";
   // Change to:
   import { funnelData, aggregateFunnelData } from "@/lib/mockData";
   ```

3. **Remove the table component** (lines 157-158):
   ```tsx
   // Remove these lines
   {/* Jobs Table */}
   <JobFunnelTable jobs={jobs} />
   ```

---

## Result

The Job Explorer tab will keep:
- 4 metric cards (Active Jobs, Avg Conversion, Avg Days Open, Pipeline Value)
- Aggregate Funnel Chart

Only the Jobs Pipeline table at the bottom will be removed.

