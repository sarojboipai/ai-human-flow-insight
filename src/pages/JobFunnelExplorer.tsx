import { Briefcase, TrendingUp, Clock, IndianRupee } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobFunnelTable } from "@/components/jobs/JobFunnelTable";
import { AggregateFunnelChart } from "@/components/jobs/AggregateFunnelChart";
import { jobs, aggregateFunnelData } from "@/lib/mockData";

const JobFunnelExplorer = () => {
  const activeJobs = jobs.filter((j) => j.status === "active").length;
  const totalCandidates = jobs.reduce((sum, j) => sum + (j.funnel[0]?.candidates || 0), 0);
  const avgDaysOpen = Math.round(jobs.reduce((sum, j) => sum + j.daysOpen, 0) / jobs.length);
  const totalPipelineValue = jobs.reduce((sum, j) => sum + j.revenue, 0);

  // Calculate average conversion rate (placements / leads)
  const totalPlacements = jobs.reduce((sum, j) => sum + (j.funnel[6]?.candidates || 0), 0);
  const avgConversion = totalCandidates > 0 ? ((totalPlacements / totalCandidates) * 100).toFixed(1) : "0";

  const metrics = [
    {
      title: "Active Jobs",
      value: activeJobs,
      subtitle: `${jobs.length} total jobs`,
      icon: Briefcase,
      color: "text-primary",
    },
    {
      title: "Avg Conversion",
      value: `${avgConversion}%`,
      subtitle: "Lead to placement",
      icon: TrendingUp,
      color: "text-emerald-500",
    },
    {
      title: "Avg Days Open",
      value: avgDaysOpen,
      subtitle: "Time to fill",
      icon: Clock,
      color: "text-amber-500",
    },
    {
      title: "Pipeline Value",
      value: `₹${(totalPipelineValue / 100000).toFixed(1)}L`,
      subtitle: "Total revenue potential",
      icon: IndianRupee,
      color: "text-teal-500",
    },
  ];

  return (
    <DashboardLayout
      title="Job Funnel Explorer"
      subtitle="Job-level intelligence cockpit with funnel analytics"
    >
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {metrics.map((metric) => (
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

      {/* Aggregate Funnel Chart */}
      <div className="mb-6">
        <AggregateFunnelChart data={aggregateFunnelData} />
      </div>

      {/* Jobs Table */}
      <JobFunnelTable jobs={jobs} />
    </DashboardLayout>
  );
};

export default JobFunnelExplorer;
