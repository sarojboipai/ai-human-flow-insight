import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ConversionChart } from "@/components/dashboard/ConversionChart";
import { AIWorkloadChart } from "@/components/dashboard/AIWorkloadChart";
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";
import { AIEvaluationMetrics } from "@/components/dashboard/AIEvaluationMetrics";
import { JobPipelineHealthTable } from "@/components/dashboard/JobPipelineHealthTable";
import {
  Users,
  DollarSign,
  Bot,
  Clock,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import {
  hiringActivityTrend,
  aiWorkloadData,
  revenueMetrics,
  aiEvaluationMetrics,
  jobPipelineHealth,
  dashboardKPIs,
} from "@/lib/mockData";

const Index = () => {
  const [duration, setDuration] = useState("30days");
  const [customer, setCustomer] = useState("all");

  const handleJobClick = (jobId: string) => {
    // Navigate to job detail or open pipeline dialog
    console.log("Opening job:", jobId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Global Filters */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Real-time hiring operations
            </p>
          </div>
          <GlobalFilters
            duration={duration}
            onDurationChange={setDuration}
            customer={customer}
            onCustomerChange={setCustomer}
          />
        </div>

        {/* KPI Summary Cards - 5 metrics per PRD */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <MetricCard
            title="Active Job Pipelines"
            value={dashboardKPIs.activeJobPipelines.toString()}
            change={8}
            changeLabel="vs last month"
            icon={<Briefcase className="h-5 w-5" />}
            variant="success"
          />
          <MetricCard
            title="Candidates in Pipeline"
            value={dashboardKPIs.candidatesInPipeline.toLocaleString()}
            change={12}
            changeLabel="vs last month"
            icon={<Users className="h-5 w-5" />}
            variant="info"
          />
          <MetricCard
            title="AI Automation Coverage"
            value={`${dashboardKPIs.aiAutomationCoverage}%`}
            change={5}
            changeLabel="vs last month"
            icon={<Bot className="h-5 w-5" />}
            variant="primary"
          />
          <MetricCard
            title="Hiring SLA Compliance"
            value={`${dashboardKPIs.hiringSLACompliance}%`}
            change={-2}
            changeLabel="vs last month"
            icon={<Clock className="h-5 w-5" />}
            variant="warning"
          />
          <MetricCard
            title="Gross Margin"
            value={`${dashboardKPIs.grossMargin}%`}
            change={3.2}
            changeLabel="vs last month"
            icon={<DollarSign className="h-5 w-5" />}
            variant="default"
          />
        </div>

        {/* Charts Row - Hiring Activity & Workload Distribution */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ConversionChart
              data={hiringActivityTrend}
              title="Hiring Activity Trends"
              showHitlOverrides
            />
          </div>
          <AIWorkloadChart
            data={aiWorkloadData}
            title="AI vs Human vs HITL Workload"
            centerValue="68%"
            centerLabel="AI Coverage"
          />
        </div>

        {/* AI Metrics & Revenue Intelligence */}
        <div className="grid gap-6 lg:grid-cols-2">
          <AIEvaluationMetrics metrics={aiEvaluationMetrics} />
          
          {/* Revenue Intelligence Panel */}
          <div className="chart-container">
            <h3 className="section-title mb-4">Revenue Intelligence</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-secondary/50 p-4">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-semibold mt-1">
                  ₹{(revenueMetrics.totalRevenue / 1000000).toFixed(2)}M
                </p>
                <p className="text-sm text-success mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +{revenueMetrics.revenueChange}% vs last quarter
                </p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-4">
                <p className="text-sm text-muted-foreground">Revenue per Placement</p>
                <p className="text-2xl font-semibold mt-1">
                  ₹{revenueMetrics.avgFeePerPlacement.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {revenueMetrics.placements} placements
                </p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-4">
                <p className="text-sm text-muted-foreground">AI Cost Savings</p>
                <p className="text-2xl font-semibold mt-1">
                  ₹{((revenueMetrics.recruiterCost * 0.32) / 1000).toFixed(0)}K
                </p>
                <p className="text-sm text-success mt-1">
                  ~32% recruiter hours saved
                </p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-4">
                <p className="text-sm text-muted-foreground">Automation Correlation</p>
                <p className="text-2xl font-semibold mt-1">+0.72</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Revenue vs AI Coverage
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Pipeline Health Table */}
        <JobPipelineHealthTable 
          data={jobPipelineHealth}
          onJobClick={handleJobClick}
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;
