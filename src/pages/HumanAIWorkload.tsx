import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { AIWorkloadChart } from "@/components/dashboard/AIWorkloadChart";
import { aiWorkloadData, stageWorkload } from "@/lib/mockData";
import { Bot, Users, Zap, GitBranch } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function HumanAIWorkload() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="dashboard-title">Human vs AI Workload</h1>
          <p className="text-muted-foreground mt-1">
            Analyze automation coverage and human intervention patterns
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="AI Automation Rate"
            value="68%"
            change={5}
            changeLabel="vs last month"
            icon={<Bot className="h-5 w-5" />}
            variant="primary"
          />
          <MetricCard
            title="Human Handled"
            value="24%"
            change={-3}
            changeLabel="vs last month"
            icon={<Users className="h-5 w-5" />}
            variant="warning"
          />
          <MetricCard
            title="HITL Interventions"
            value="8%"
            change={1.2}
            changeLabel="vs last month"
            icon={<Zap className="h-5 w-5" />}
            variant="info"
          />
          <MetricCard
            title="AI Override Rate"
            value="8.2%"
            change={-0.5}
            changeLabel="vs last month"
            icon={<GitBranch className="h-5 w-5" />}
            variant="success"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <AIWorkloadChart
            data={aiWorkloadData}
            title="Overall Workload Distribution"
            centerValue="68%"
            centerLabel="AI Coverage"
          />
          
          {/* Stage-wise breakdown */}
          <div className="chart-container">
            <h3 className="section-title mb-4">Automation by Stage</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={stageWorkload}
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
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`${value}%`]}
                />
                <Legend />
                <Bar dataKey="ai" name="AI Automated" stackId="a" fill="hsl(173, 58%, 45%)" />
                <Bar dataKey="human" name="Human Handled" stackId="a" fill="hsl(38, 92%, 50%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommendations */}
        <div className="chart-container">
          <h3 className="section-title mb-4">Automation Opportunities</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                stage: "Interview Scheduling",
                currentAI: 45,
                potential: 75,
                impact: "High",
                savings: "$45K/month",
              },
              {
                stage: "Onboarding",
                currentAI: 35,
                potential: 60,
                impact: "Medium",
                savings: "$28K/month",
              },
              {
                stage: "Initial Outreach",
                currentAI: 72,
                potential: 88,
                impact: "Medium",
                savings: "$18K/month",
              },
            ].map((item) => (
              <div
                key={item.stage}
                className="rounded-lg border border-primary/30 bg-primary/5 p-5"
              >
                <h4 className="font-medium text-primary">{item.stage}</h4>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current AI</span>
                    <span className="font-mono">{item.currentAI}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${item.currentAI}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Potential</span>
                    <span className="font-mono text-success">{item.potential}%</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex justify-between">
                  <span className="text-xs text-muted-foreground">
                    Impact: {item.impact}
                  </span>
                  <span className="text-xs font-medium text-success">
                    {item.savings}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HITL Triggers */}
        <div className="chart-container">
          <h3 className="section-title mb-4">Human-in-the-Loop Triggers</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Top HITL Reasons</h4>
              {[
                { reason: "Low AI Confidence (<0.7)", count: 342, percentage: 45 },
                { reason: "Enterprise Employer", count: 189, percentage: 25 },
                { reason: "Compliance Check", count: 114, percentage: 15 },
                { reason: "Manual Override", count: 76, percentage: 10 },
                { reason: "Other", count: 38, percentage: 5 },
              ].map((item) => (
                <div key={item.reason} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.reason}</span>
                      <span className="font-mono">{item.percentage}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-info rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">HITL Performance</h4>
              <div className="grid gap-3">
                <div className="rounded-lg bg-secondary/50 p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Avg Resolution Time</span>
                    <span className="font-mono font-medium">2.4 hours</span>
                  </div>
                </div>
                <div className="rounded-lg bg-secondary/50 p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Approval Rate</span>
                    <span className="font-mono font-medium text-success">78%</span>
                  </div>
                </div>
                <div className="rounded-lg bg-secondary/50 p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Rejection Rate</span>
                    <span className="font-mono font-medium text-destructive">22%</span>
                  </div>
                </div>
                <div className="rounded-lg bg-secondary/50 p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Queue Backlog</span>
                    <span className="font-mono font-medium text-warning">24 items</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
