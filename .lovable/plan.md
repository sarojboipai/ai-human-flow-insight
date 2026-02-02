
# Add Jobs Pipeline Widget to Funnel Page

Add the "Jobs Pipeline" table widget to the Job Explorer tab, matching the design shown in the reference image.

---

## Approach

The `CustomerJobsTable` component already exists with exactly the functionality needed:
- Jobs Pipeline table with search and filters
- Columns: Job ID, Title, Role Type, Current Stage, Candidates, Days Open, Status
- "View Pipeline" button that opens a React Flow board dialog

We will reuse this existing component by importing and adding it to the Job Explorer tab.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/pages/FunnelAnalytics.tsx` | Modify | Import and add CustomerJobsTable component |

---

## Technical Details

### Changes to FunnelAnalytics.tsx

1. **Add import for the component**:
   ```tsx
   import { CustomerJobsTable } from "@/components/customer/CustomerJobsTable";
   ```

2. **Add the table in the Job Explorer tab** (after the AggregateFunnelChart):
   ```tsx
   <TabsContent value="jobs" className="space-y-6">
     {/* Job Metrics Cards */}
     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
       {/* ... existing metrics cards ... */}
     </div>

     {/* Aggregate Funnel Chart */}
     <AggregateFunnelChart data={aggregateFunnelData} />
     
     {/* Jobs Pipeline Table - NEW */}
     <CustomerJobsTable />
   </TabsContent>
   ```

---

## Result

The Job Explorer tab will display:
1. 4 metric cards (Active Jobs, Avg Conversion, Avg Days Open, Pipeline Value)
2. Aggregate Funnel Chart
3. Jobs Pipeline table with search, filters, and "View Pipeline" buttons

Clicking "View Pipeline" will open the full-screen React Flow board showing the dual-path workflow visualization.
