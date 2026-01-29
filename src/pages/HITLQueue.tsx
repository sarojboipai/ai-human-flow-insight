import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import {
  hitlRulesV2,
  hitlTasks,
  hitlAuditLogs,
  HITLRuleV2,
  HITLTask,
} from "@/lib/mockData";
import {
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Download,
  Upload,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RuleBuilderDialog } from "@/components/hitl/RuleBuilderDialog";
import { RulesTable } from "@/components/hitl/RulesTable";
import { RuleSimulator } from "@/components/hitl/RuleSimulator";
import { TasksQueue } from "@/components/hitl/TasksQueue";
import { HITLAnalytics } from "@/components/hitl/HITLAnalytics";
import { AuditLogTable } from "@/components/hitl/AuditLogTable";
import { useToast } from "@/hooks/use-toast";

export default function HITLQueue() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("queue");
  const [rules, setRules] = useState<HITLRuleV2[]>(hitlRulesV2);
  const [tasks, setTasks] = useState<HITLTask[]>(hitlTasks);
  const [ruleDialogOpen, setRuleDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<HITLRuleV2 | null>(null);
  const [simulatingRule, setSimulatingRule] = useState<HITLRuleV2 | null>(null);
  const [showSimulator, setShowSimulator] = useState(false);

  // Metrics calculations
  const pendingTasks = tasks.filter(
    (t) => t.status === "pending" || t.status === "assigned"
  ).length;
  const highPriorityTasks = tasks.filter((t) => t.priority === "high").length;
  const resolvedToday = tasks.filter(
    (t) => t.status === "approved" || t.status === "rejected"
  ).length;
  const activeRules = rules.filter((r) => r.status === "active").length;

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
      // Update existing
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
    } else {
      // Create new
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
    }
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules((prev) => prev.filter((r) => r.id !== ruleId));
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

  // Task handlers
  const handleAssignTask = (taskId: string, assignee: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              assignedTo: assignee,
              assignedAt: "Just now",
              status: "assigned" as const,
            }
          : t
      )
    );
  };

  const handleResolveTask = (
    taskId: string,
    resolution: "approved" | "rejected" | "escalated",
    notes: string
  ) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: resolution,
              resolution: notes || `Task ${resolution}`,
              resolvedAt: "Just now",
            }
          : t
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="dashboard-title">HITL Queue</h1>
            <p className="text-muted-foreground mt-1">
              Human-in-the-Loop review tasks and rule management
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setActiveTab("rules")}>
              <Zap className="h-4 w-4 mr-2" />
              {activeRules} Active Rules
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Pending Reviews"
            value={String(pendingTasks)}
            change={-12}
            changeLabel="vs yesterday"
            icon={<Clock className="h-5 w-5" />}
            variant="warning"
          />
          <MetricCard
            title="High Priority"
            value={String(highPriorityTasks)}
            icon={<AlertTriangle className="h-5 w-5" />}
            variant="primary"
          />
          <MetricCard
            title="Avg Resolution Time"
            value="2.4 hrs"
            change={-15}
            changeLabel="vs last week"
            icon={<Zap className="h-5 w-5" />}
            variant="success"
          />
          <MetricCard
            title="Completed Today"
            value={String(resolvedToday)}
            change={25}
            changeLabel="vs yesterday"
            icon={<CheckCircle className="h-5 w-5" />}
            variant="info"
          />
        </div>

        {/* Tabbed Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="queue" className="data-[state=active]:bg-background">
              Queue
            </TabsTrigger>
            <TabsTrigger value="rules" className="data-[state=active]:bg-background">
              Rules
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-background">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="audit" className="data-[state=active]:bg-background">
              Audit Log
            </TabsTrigger>
          </TabsList>

          {/* Queue Tab */}
          <TabsContent value="queue" className="mt-6">
            <div className="chart-container">
              <div className="flex items-center justify-between mb-4">
                <h3 className="section-title">Review Queue</h3>
              </div>
              <TasksQueue
                tasks={tasks}
                onAssign={handleAssignTask}
                onResolve={handleResolveTask}
              />
            </div>
          </TabsContent>

          {/* Rules Tab */}
          <TabsContent value="rules" className="mt-6 space-y-6">
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

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <HITLAnalytics />
          </TabsContent>

          {/* Audit Log Tab */}
          <TabsContent value="audit" className="mt-6">
            <div className="chart-container">
              <div className="flex items-center justify-between mb-4">
                <h3 className="section-title">Audit Trail</h3>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Logs
                </Button>
              </div>
              <AuditLogTable logs={hitlAuditLogs} />
            </div>
          </TabsContent>
        </Tabs>

        {/* Rule Builder Dialog */}
        <RuleBuilderDialog
          open={ruleDialogOpen}
          onOpenChange={setRuleDialogOpen}
          rule={editingRule}
          onSave={handleSaveRule}
        />
      </div>
    </DashboardLayout>
  );
}
