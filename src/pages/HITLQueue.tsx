import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { hitlTasks, HITLTask } from "@/lib/mockData";
import { Zap, Clock, CheckCircle, AlertTriangle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TasksQueue } from "@/components/hitl/TasksQueue";
import { HITLAnalytics } from "@/components/hitl/HITLAnalytics";
import { AuditLogTable } from "@/components/hitl/AuditLogTable";
import { hitlAuditLogs } from "@/lib/mockData";

export default function HITLQueue() {
  const [activeTab, setActiveTab] = useState("queue");
  const [tasks, setTasks] = useState<HITLTask[]>(hitlTasks);

  // Metrics calculations
  const pendingTasks = tasks.filter(
    (t) => t.status === "pending" || t.status === "assigned"
  ).length;
  const highPriorityTasks = tasks.filter((t) => t.priority === "high").length;
  const resolvedToday = tasks.filter(
    (t) => t.status === "approved" || t.status === "rejected"
  ).length;

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
        <div>
          <h1 className="dashboard-title">HITL Queue</h1>
          <p className="text-muted-foreground mt-1">
            Human-in-the-Loop review tasks
          </p>
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
      </div>
    </DashboardLayout>
  );
}
