import { Bot, Users, Activity, TrendingUp, GitBranch, Network, Plug } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentRegistry } from "@/components/orchestration/AgentRegistry";
import { AgentHealthMonitor } from "@/components/orchestration/AgentHealthMonitor";
import { WorkflowList } from "@/components/orchestration/WorkflowList";
import { ConnectorRegistry } from "@/components/orchestration/ConnectorRegistry";
import { ExecutionTelemetry } from "@/components/orchestration/ExecutionTelemetry";
import { agents, workflows, connectors, telemetryMetrics } from "@/lib/mockData";

const OrchestrationEngine = () => {
  const activeAgents = agents.filter((a) => a.status === "active").length;
  const activeWorkflows = workflows.filter((w) => w.status === "active").length;
  const connectedConnectors = connectors.filter((c) => c.status === "connected").length;
  const totalTasks = agents.reduce((sum, a) => sum + a.tasksProcessed, 0);

  const metrics = [
    {
      title: "Active Workflows",
      value: activeWorkflows,
      subtitle: `${workflows.length} total defined`,
      icon: GitBranch,
      color: "text-primary",
    },
    {
      title: "Active Agents",
      value: activeAgents,
      subtitle: `${agents.length} registered`,
      icon: Bot,
      color: "text-emerald-500",
    },
    {
      title: "Connected Systems",
      value: connectedConnectors,
      subtitle: `${connectors.length} total integrations`,
      icon: Plug,
      color: "text-teal-500",
    },
    {
      title: "Executions Today",
      value: telemetryMetrics.workflowsRunning + telemetryMetrics.workflowsCompleted,
      subtitle: `${telemetryMetrics.workflowsRunning} currently running`,
      icon: Activity,
      color: "text-amber-500",
    },
  ];

  return (
    <DashboardLayout
      title="Orchestration Engine"
      subtitle="Control plane for AI agents, workflows, and automation systems"
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

      {/* Main Tabs */}
      <Tabs defaultValue="workflows" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="workflows" className="gap-2">
            <GitBranch className="h-4 w-4" />
            <span className="hidden sm:inline">Workflows</span>
          </TabsTrigger>
          <TabsTrigger value="agents" className="gap-2">
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline">Agents</span>
          </TabsTrigger>
          <TabsTrigger value="connectors" className="gap-2">
            <Plug className="h-4 w-4" />
            <span className="hidden sm:inline">Connectors</span>
          </TabsTrigger>
          <TabsTrigger value="telemetry" className="gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Telemetry</span>
          </TabsTrigger>
        </TabsList>

        {/* Workflows Tab */}
        <TabsContent value="workflows">
          <WorkflowList />
        </TabsContent>

        {/* Agents Tab */}
        <TabsContent value="agents" className="space-y-6">
          <AgentRegistry agents={agents} />
          <AgentHealthMonitor agents={agents} />
        </TabsContent>

        {/* Connectors Tab */}
        <TabsContent value="connectors">
          <ConnectorRegistry />
        </TabsContent>

        {/* Telemetry Tab */}
        <TabsContent value="telemetry">
          <ExecutionTelemetry />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default OrchestrationEngine;
