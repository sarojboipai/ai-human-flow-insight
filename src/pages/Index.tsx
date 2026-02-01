import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { FunnelChart } from "@/components/dashboard/FunnelChart";
import { ConversionChart } from "@/components/dashboard/ConversionChart";
import { AIWorkloadChart } from "@/components/dashboard/AIWorkloadChart";
import { RecruiterTable } from "@/components/dashboard/RecruiterTable";
import {
  Users,
  Target,
  DollarSign,
  TrendingUp,
  Bot,
  Zap,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  funnelData,
  trendData,
  recruiters,
  aiWorkloadData,
  revenueMetrics,
} from "@/lib/mockData";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="dashboard-title">Command Center</h1>
            <p className="text-muted-foreground mt-1">
              Real-time hiring intelligence overview
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last updated: Just now</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Active Placements"
            value="926"
            change={12}
            changeLabel="vs last month"
            icon={<CheckCircle className="h-5 w-5" />}
            variant="success"
          />
          <MetricCard
            title="Candidates in Pipeline"
            value="5,247"
            change={8}
            changeLabel="vs last month"
            icon={<Users className="h-5 w-5" />}
            variant="info"
          />
          <MetricCard
            title="AI Automation Rate"
            value="68%"
            change={5}
            changeLabel="vs last month"
            icon={<Bot className="h-5 w-5" />}
            variant="primary"
          />
          <MetricCard
            title="Gross Margin"
            value="44.7%"
            change={3.2}
            changeLabel="vs last month"
            icon={<DollarSign className="h-5 w-5" />}
            variant="warning"
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ConversionChart
              data={trendData}
              title="Hiring Activity Trends"
            />
          </div>
          <AIWorkloadChart
            data={aiWorkloadData}
            title="AI vs Human Workload"
            centerValue="68%"
            centerLabel="AI Coverage"
          />
        </div>

        {/* Funnel & Operations */}
        <div className="grid gap-6 lg:grid-cols-2">
          <FunnelChart data={funnelData} title="Hiring Funnel" />
          
          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="chart-container">
              <h3 className="section-title mb-4">Revenue Intelligence</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-secondary/50 p-4">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-semibold mt-1">
                    ₹{(revenueMetrics.totalRevenue / 1000000).toFixed(2)}M
                  </p>
                  <p className="text-sm text-success mt-1">
                    +{revenueMetrics.revenueChange}% vs last quarter
                  </p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-4">
                  <p className="text-sm text-muted-foreground">Avg Fee/Placement</p>
                  <p className="text-2xl font-semibold mt-1">
                    ₹{revenueMetrics.avgFeePerPlacement.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {revenueMetrics.placements} placements
                  </p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-4">
                  <p className="text-sm text-muted-foreground">Cost/Placement</p>
                  <p className="text-2xl font-semibold mt-1">
                    ₹{revenueMetrics.costPerPlacement.toLocaleString()}
                  </p>
                  <p className="text-sm text-success mt-1">
                    -8% vs target
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recruiter Performance */}
        <RecruiterTable
          recruiters={recruiters}
          title="Top Recruiters This Month"
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;
