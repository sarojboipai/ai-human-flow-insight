import { useState } from "react";
import { Bot, Activity, GitBranch, Network, Plug, Zap, Plus, Download, Upload, PlayCircle } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AgentRegistry } from "@/components/orchestration/AgentRegistry";
import { AgentHealthMonitor } from "@/components/orchestration/AgentHealthMonitor";
import { WorkflowList } from "@/components/orchestration/WorkflowList";
import { ConnectorRegistry } from "@/components/orchestration/ConnectorRegistry";
import { ExecutionTelemetry } from "@/components/orchestration/ExecutionTelemetry";
import { RulesTable } from "@/components/hitl/RulesTable";
import { RuleBuilderDialog } from "@/components/hitl/RuleBuilderDialog";
import { RuleSimulator } from "@/components/hitl/RuleSimulator";
import { agents, workflows, connectors, telemetryMetrics, hitlRulesV2, HITLRuleV2 } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

const OrchestrationEngine = () => {
  const { toast } = useToast();
  
  // HITL Rules state
  const [rules, setRules] = useState<HITLRuleV2[]>(hitlRulesV2);
  const [ruleDialogOpen, setRuleDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<HITLRuleV2 | null>(null);
  const [simulatingRule, setSimulatingRule] = useState<HITLRuleV2 | null>(null);
  const [showSimulator, setShowSimulator] = useState(false);

  const activeAgents = agents.filter((a) => a.status === "active").length;
  const activeWorkflows = workflows.filter((w) => w.status === "active").length;
  const connectedConnectors = connectors.filter((c) => c.status === "connected").length;
  const activeRules = rules.filter((r) => r.status === "active").length;

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
      title: "HITL Rules",
      value: activeRules,
      subtitle: `${rules.length} total rules`,
      icon: Zap,
      color: "text-amber-500",
    },
  ];

  // Rule handlers
  const handleCreateRule = () => {
    setEditingRule(null);
    setRuleDialogOpen(true);
  };

  const handleEditRule = (rule: HITLRuleV2) => {
    setEditingRule(rule);
    setRuleDialogOpen(true);
  };

  const handleSaveRule = (ruleData: Partial<HITLRuleV2>) => {
    if (ruleData.id) {
      setRules((prev) =>
        prev.map((r) =>
          r.id === ruleData.id
            ? {
                ...r,
                ...ruleData,
                updatedAt: new Date().toISOString().split("T")[0],
                version: r.version + 1,
              }
            : r
        )
      );
      toast({
        title: "Rule Updated",
        description: "The rule has been updated successfully.",
      });
    } else {
      const newRule: HITLRuleV2 = {
        id: `rule-${String(rules.length + 1).padStart(3, "0")}`,
        name: ruleData.name || "",
        description: ruleData.description || "",
        ruleType: ruleData.ruleType || "confidence",
        conditionMetric: ruleData.conditionMetric || "",
        operator: ruleData.operator || "<",
        thresholdValue: ruleData.thresholdValue || 0,
        actionType: ruleData.actionType || "route_to_queue",
        targetQueue: ruleData.targetQueue || "recruiter_review",
        priority: ruleData.priority || 3,
        status: ruleData.status || "active",
        triggerCount: 0,
        lastTriggered: null,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        createdBy: "Current User",
        version: 1,
      };
      setRules((prev) => [...prev, newRule]);
      toast({
        title: "Rule Created",
        description: "The new rule has been created successfully.",
      });
    }
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules((prev) => prev.filter((r) => r.id !== ruleId));
    toast({
      title: "Rule Deleted",
      description: "The rule has been deleted.",
    });
  };

  const handleToggleRuleStatus = (
    ruleId: string,
    newStatus: "active" | "paused"
  ) => {
    setRules((prev) =>
      prev.map((r) => (r.id === ruleId ? { ...r, status: newStatus } : r))
    );
    toast({
      title: newStatus === "active" ? "Rule Activated" : "Rule Paused",
      description: `Rule has been ${newStatus === "active" ? "activated" : "paused"}.`,
    });
  };

  const handleSimulateRule = (rule: HITLRuleV2) => {
    setSimulatingRule(rule);
    setShowSimulator(true);
  };

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
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
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
          <TabsTrigger value="hitl-rules" className="gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">HITL Rules</span>
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

        {/* HITL Rules Tab */}
        <TabsContent value="hitl-rules" className="space-y-6">
          <div className="chart-container">
            <div className="flex items-center justify-between mb-4">
              <h3 className="section-title">HITL Rules</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button onClick={handleCreateRule}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Rule
                </Button>
              </div>
            </div>
            <RulesTable
              rules={rules}
              onEdit={handleEditRule}
              onDelete={handleDeleteRule}
              onToggleStatus={handleToggleRuleStatus}
              onSimulate={handleSimulateRule}
            />
          </div>

          {/* Rule Simulator */}
          {showSimulator && (
            <div className="chart-container">
              <div className="flex items-center justify-between mb-4">
                <h3 className="section-title">Rule Simulator</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSimulator(false)}
                >
                  Hide Simulator
                </Button>
              </div>
              <RuleSimulator
                rules={rules}
                selectedRule={simulatingRule}
                onSelectRule={setSimulatingRule}
              />
            </div>
          )}

          {!showSimulator && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowSimulator(true)}
            >
              <PlayCircle className="h-4 w-4 mr-2" />
              Open Rule Simulator
            </Button>
          )}
        </TabsContent>
      </Tabs>

      {/* Rule Builder Dialog */}
      <RuleBuilderDialog
        open={ruleDialogOpen}
        onOpenChange={setRuleDialogOpen}
        rule={editingRule}
        onSave={handleSaveRule}
      />
    </DashboardLayout>
  );
};

export default OrchestrationEngine;
