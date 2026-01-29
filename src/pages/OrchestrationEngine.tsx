import { Bot, Users, Activity, Gauge, TrendingUp } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AgentRegistry } from "@/components/orchestration/AgentRegistry";
import { PipelineGraph } from "@/components/orchestration/PipelineGraph";
import { AgentPerformanceCard } from "@/components/orchestration/AgentPerformanceCard";
import { HITLRulesPanel } from "@/components/orchestration/HITLRulesPanel";
import { agents, pipelineStages, hitlRules } from "@/lib/mockData";

const OrchestrationEngine = () => {
  const activeAgents = agents.filter((a) => a.status === "active").length;
  const totalTasks = agents.reduce((sum, a) => sum + a.tasksProcessed, 0);
  const avgSuccessRate = agents.filter((a) => a.status === "active").reduce((sum, a) => sum + a.successRate, 0) / activeAgents;
  const hitlRate = 8.2; // From existing metrics

  const metrics = [
    {
      title: "Active Agents",
      value: activeAgents,
      subtitle: `${agents.length} total registered`,
      icon: Bot,
      color: "text-primary",
    },
    {
      title: "Tasks Processed",
      value: totalTasks.toLocaleString(),
      subtitle: "Last 24 hours",
      icon: Activity,
      color: "text-emerald-500",
    },
    {
      title: "Avg Success Rate",
      value: `${avgSuccessRate.toFixed(1)}%`,
      subtitle: "Across active agents",
      icon: TrendingUp,
      color: "text-teal-500",
    },
    {
      title: "HITL Rate",
      value: `${hitlRate}%`,
      subtitle: "Human handoff rate",
      icon: Users,
      color: "text-amber-500",
    },
  ];

  const topAgents = agents.filter((a) => a.status === "active").slice(0, 4);

  return (
    <DashboardLayout
      title="Orchestration Engine"
      subtitle="Control plane for AI agents, bots, and automation tools"
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

      {/* Pipeline Graph */}
      <div className="mb-6">
        <PipelineGraph stages={pipelineStages} />
      </div>

      {/* Agent Registry */}
      <div className="mb-6">
        <AgentRegistry agents={agents} />
      </div>

      {/* Bottom Row: Agent Performance + HITL Rules */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold mb-4">Top Performing Agents</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {topAgents.map((agent) => (
              <AgentPerformanceCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
        <HITLRulesPanel rules={hitlRules} />
      </div>
    </DashboardLayout>
  );
};

export default OrchestrationEngine;
