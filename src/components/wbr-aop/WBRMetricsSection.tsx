import { Briefcase, Users, Award, Bot, UserCheck, ShieldCheck } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ConversionChart } from "@/components/dashboard/ConversionChart";
import { AIWorkloadChart } from "@/components/dashboard/AIWorkloadChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WBRKPIs } from "@/lib/wbrAopData";
import { wbrWeeklyData, getWBRWorkloadData } from "@/lib/wbrAopData";

interface WBRMetricsSectionProps {
  kpis: WBRKPIs;
}

export function WBRMetricsSection({ kpis }: WBRMetricsSectionProps) {
  const workloadData = getWBRWorkloadData(kpis);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">WBR Operations Overview</h2>
        <p className="text-sm text-muted-foreground">Weekly execution health of hiring operations</p>
      </div>

      {/* 6 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard
          title="Active Jobs"
          value={kpis.activeJobs.toLocaleString()}
          change={4.2}
          changeLabel="vs last week"
          icon={<Briefcase className="h-5 w-5" />}
          variant="primary"
        />
        <MetricCard
          title="Candidates in Pipeline"
          value={kpis.candidatesInPipeline.toLocaleString()}
          change={8.1}
          changeLabel="vs last week"
          icon={<Users className="h-5 w-5" />}
          variant="info"
        />
        <MetricCard
          title="Weekly Placements"
          value={kpis.weeklyPlacements.toLocaleString()}
          change={12.5}
          changeLabel="vs last week"
          icon={<Award className="h-5 w-5" />}
          variant="success"
        />
        <MetricCard
          title="AI Automation Rate"
          value={`${kpis.aiAutomationRate}%`}
          change={2.3}
          changeLabel="vs last week"
          icon={<Bot className="h-5 w-5" />}
          variant="primary"
        />
        <MetricCard
          title="HITL Load"
          value={`${kpis.hitlLoad}%`}
          change={-1.4}
          changeLabel="vs last week"
          icon={<UserCheck className="h-5 w-5" />}
          variant="warning"
        />
        <MetricCard
          title="SLA Compliance"
          value={`${kpis.slaCompliance}%`}
          change={0.8}
          changeLabel="vs last week"
          icon={<ShieldCheck className="h-5 w-5" />}
          variant="success"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Hiring Activity Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ConversionChart data={wbrWeeklyData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">AI vs Human Workload</CardTitle>
          </CardHeader>
          <CardContent>
            <AIWorkloadChart
              data={workloadData}
              centerValue={`${kpis.aiAutomationRate}%`}
              centerLabel="AI Rate"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
