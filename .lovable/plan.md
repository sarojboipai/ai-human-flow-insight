

# Restore Job Metrics Cards to Funnel Page

The 4 metric cards were accidentally removed in the last edit. This plan restores them to the Job Explorer tab.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/pages/FunnelAnalytics.tsx` | Modify | Restore jobs import, metrics calculations, and metric cards grid |

---

## Technical Details

### Changes to FunnelAnalytics.tsx

1. **Restore `jobs` to the data import**:
   ```tsx
   import { funnelData, jobs, aggregateFunnelData } from "@/lib/mockData";
   ```

2. **Restore the metrics calculations** inside the component:
   ```tsx
   const activeJobs = jobs.filter((j) => j.status === "active").length;
   const totalCandidates = jobs.reduce((sum, j) => sum + (j.funnel[0]?.candidates || 0), 0);
   const avgDaysOpen = Math.round(jobs.reduce((sum, j) => sum + j.daysOpen, 0) / jobs.length);
   const totalPipelineValue = jobs.reduce((sum, j) => sum + j.revenue, 0);
   const totalPlacements = jobs.reduce((sum, j) => sum + (j.funnel[6]?.candidates || 0), 0);
   const avgConversion = totalCandidates > 0 ? ((totalPlacements / totalCandidates) * 100).toFixed(1) : "0";

   const jobMetrics = [
     { title: "Active Jobs", value: activeJobs, subtitle: `${jobs.length} total jobs`, icon: Briefcase, color: "text-primary" },
     { title: "Avg Conversion", value: `${avgConversion}%`, subtitle: "Lead to placement", icon: TrendingUp, color: "text-emerald-500" },
     { title: "Avg Days Open", value: avgDaysOpen, subtitle: "Time to fill", icon: Clock, color: "text-amber-500" },
     { title: "Pipeline Value", value: `₹${(totalPipelineValue / 100000).toFixed(1)}L`, subtitle: "Total revenue potential", icon: IndianRupee, color: "text-teal-500" },
   ];
   ```

3. **Restore the metric cards grid** in the Job Explorer tab (before the AggregateFunnelChart):
   ```tsx
   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
     {jobMetrics.map((metric) => (
       <Card key={metric.title}>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
           <CardTitle className="text-sm font-medium text-muted-foreground">
             {metric.title}
           </CardTitle>
           <metric.icon className={`h-4 w-4 ${metric.color}`} />
         </CardHeader>
         <CardContent>
           <div className="text-2xl font-bold">{metric.value}</div>
           <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
         </CardContent>
       </Card>
     ))}
   </div>
   ```

---

## Result

The Job Explorer tab will display:
- 4 metric cards: Active Jobs, Avg Conversion, Avg Days Open, Pipeline Value
- Aggregate Funnel Chart

The Jobs Pipeline table remains hidden as requested.

