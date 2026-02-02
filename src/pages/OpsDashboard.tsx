import { OpsLayout } from "@/components/layout/OpsLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitBranch, Bot, Plug, Zap, ArrowRight, Network, Users, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { agents, workflows, connectors, hitlRulesV2 } from "@/lib/mockData";

export default function OpsDashboard() {
  const navigate = useNavigate();

  const activeAgents = agents.filter((a) => a.status === "active").length;
  const activeWorkflows = workflows.filter((w) => w.status === "active").length;
  const connectedConnectors = connectors.filter((c) => c.status === "connected").length;
  const activeRules = hitlRulesV2.filter((r) => r.status === "active").length;

  const metrics = [
    {
      title: "Active Workflows",
      value: activeWorkflows,
      subtitle: `${workflows.length} total defined`,
      icon: GitBranch,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Active Agents",
      value: activeAgents,
      subtitle: `${agents.length} registered`,
      icon: Bot,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Connected Systems",
      value: connectedConnectors,
      subtitle: `${connectors.length} total integrations`,
      icon: Plug,
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
    },
    {
      title: "HITL Rules",
      value: activeRules,
      subtitle: `${hitlRulesV2.length} total rules`,
      icon: Zap,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ];

  const quickActions = [
    {
      title: "Orchestration Engine",
      description: "Manage workflows, agents, and automation systems",
      icon: Network,
      path: "/ops/orchestration",
      color: "text-primary",
    },
    {
      title: "Recruiter Dashboard",
      description: "Track recruiter productivity and performance metrics",
      icon: Users,
      path: "/ops/recruiters",
      color: "text-emerald-500",
    },
    {
      title: "AI Performance",
      description: "Evaluate AI agent accuracy and SLA adherence",
      icon: Bot,
      path: "/ops/ai-performance",
      color: "text-sky-500",
    },
  ];

  return (
    <OpsLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Operations Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of operational systems and quick access to key modules
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map((action) => (
              <Card 
                key={action.title} 
                className="cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => navigate(action.path)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-secondary`}>
                        <action.icon className={`h-5 w-5 ${action.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{action.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* System Health Overview */}
        <div>
          <h2 className="text-lg font-semibold mb-4">System Health</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
                  <span className="font-medium">All Agents Healthy</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {activeAgents} agents running with no errors
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
                  <span className="font-medium">Workflows Running</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {activeWorkflows} active workflows processing
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
                  <span className="font-medium">Connectors Connected</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {connectedConnectors} systems integrated
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </OpsLayout>
  );
}
