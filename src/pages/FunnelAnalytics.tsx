import { Briefcase, TrendingUp, Clock, IndianRupee, Users, Target, Filter } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { FunnelChart } from "@/components/dashboard/FunnelChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AggregateFunnelChart } from "@/components/jobs/AggregateFunnelChart";
import { CustomerJobsTable } from "@/components/customer/CustomerJobsTable";
import { funnelData, jobs, aggregateFunnelData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const conversionData = [
  { stage: "Lead → Profile", rate: 70, target: 75 },
  { stage: "Profile → Match", rate: 60, target: 65 },
  { stage: "Match → Contact", rate: 70, target: 72 },
  { stage: "Contact → Interview", rate: 60, target: 58 },
  { stage: "Interview → Offer", rate: 60, target: 55 },
  { stage: "Offer → Placement", rate: 70, target: 68 },
];

const timeToStageData = [
  { stage: "Profile Completion", avgDays: 2.3, medianDays: 1.8 },
  { stage: "AI Matching", avgDays: 0.5, medianDays: 0.3 },
  { stage: "Recruiter Contact", avgDays: 1.2, medianDays: 0.9 },
  { stage: "Interview Setup", avgDays: 3.5, medianDays: 2.8 },
  { stage: "Offer Release", avgDays: 5.2, medianDays: 4.1 },
  { stage: "Placement", avgDays: 8.4, medianDays: 6.5 },
];

export default function FunnelAnalytics() {
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="dashboard-title">Jobs & Funnel</h1>
            <p className="text-muted-foreground mt-1">
              Job-level intelligence and funnel analytics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Role Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="nurse">Nurses</SelectItem>
                <SelectItem value="doctor">Doctors</SelectItem>
                <SelectItem value="paramedic">Paramedics</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Geography" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north">North</SelectItem>
                <SelectItem value="south">South</SelectItem>
                <SelectItem value="east">East</SelectItem>
                <SelectItem value="west">West</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="jobs">Job Explorer</TabsTrigger>
            <TabsTrigger value="funnel">Funnel Analytics</TabsTrigger>
          </TabsList>

          {/* Job Explorer Tab */}
          <TabsContent value="jobs" className="space-y-6">
            {/* Job Metrics Cards */}
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

            {/* Jobs Pipeline Table */}
            <CustomerJobsTable />

            {/* Aggregate Funnel Chart */}
            <AggregateFunnelChart data={aggregateFunnelData} />
          </TabsContent>

          {/* Funnel Analytics Tab */}
          <TabsContent value="funnel" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Overall Conversion"
                value="7.4%"
                change={0.8}
                changeLabel="vs last month"
                icon={<TrendingUp className="h-5 w-5" />}
                variant="success"
              />
              <MetricCard
                title="Avg Time to Hire"
                value="21 days"
                change={-2}
                changeLabel="vs last month"
                icon={<Clock className="h-5 w-5" />}
                variant="info"
              />
              <MetricCard
                title="Pipeline Volume"
                value="12,500"
                change={15}
                changeLabel="vs last month"
                icon={<Users className="h-5 w-5" />}
                variant="primary"
              />
              <MetricCard
                title="Drop-off Rate"
                value="26%"
                change={-4}
                changeLabel="vs last month"
                icon={<Target className="h-5 w-5" />}
                variant="warning"
              />
            </div>

            {/* Main Funnel */}
            <FunnelChart data={funnelData} title="Hiring Pipeline Funnel" />

            {/* Conversion & Time Analysis */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Conversion Rates */}
              <div className="chart-container">
                <h3 className="section-title mb-4">Stage Conversion Rates</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={conversionData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <YAxis
                      type="category"
                      dataKey="stage"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                      width={95}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number, name: string) => [
                        `${value}%`,
                        name === "rate" ? "Actual" : "Target",
                      ]}
                    />
                    <Bar dataKey="rate" fill="hsl(173, 58%, 45%)" radius={[0, 4, 4, 0]} name="rate" />
                    <Bar dataKey="target" fill="hsl(var(--muted))" radius={[0, 4, 4, 0]} name="target" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Time to Stage */}
              <div className="chart-container">
                <h3 className="section-title mb-4">Time to Stage (Days)</h3>
                <div className="space-y-3">
                  {timeToStageData.map((item) => (
                    <div key={item.stage} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <span className="text-sm font-medium">{item.stage}</span>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-mono">{item.avgDays}d avg</p>
                          <p className="text-xs text-muted-foreground">{item.medianDays}d median</p>
                        </div>
                        <div 
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${Math.min(item.avgDays * 10, 100)}px` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Drop-off Analysis */}
            <div className="chart-container">
              <h3 className="section-title mb-4">Top Drop-off Reasons</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { reason: "Salary Mismatch", count: 1250, percentage: 28, stage: "Offer" },
                  { reason: "Location Preference", count: 890, percentage: 20, stage: "Contact" },
                  { reason: "Skills Gap", count: 756, percentage: 17, stage: "Match" },
                  { reason: "No Response", count: 1560, percentage: 35, stage: "Profile" },
                ].map((item) => (
                  <div key={item.reason} className="rounded-lg border border-border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{item.reason}</p>
                        <p className="text-xs text-muted-foreground mt-1">at {item.stage} stage</p>
                      </div>
                      <span className="text-2xl font-semibold text-destructive">{item.percentage}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {item.count.toLocaleString()} candidates
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
