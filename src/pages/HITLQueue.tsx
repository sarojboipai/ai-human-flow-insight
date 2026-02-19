import { useState } from "react";
import { HITLLayout } from "@/components/layout/HITLLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { hitlTasks, HITLTask } from "@/lib/mockData";
import { Zap, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { TasksQueue } from "@/components/hitl/TasksQueue";

export default function HITLQueue() {
  const [tasks, setTasks] = useState<HITLTask[]>(hitlTasks);

  // Metrics calculations
  const pendingTasks = tasks.filter(
    (t) => t.status === "pending" || t.status === "assigned"
  ).length;
  const highPriorityTasks = tasks.filter((t) => t.priority === "high").length;
  const fixedToday = tasks.filter((t) => t.status === "fixed").length;
  const ignoredCount = tasks.filter((t) => t.status === "ignored").length;

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
    resolution: "fixed" | "ignored",
    notes: string
  ) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: resolution,
              resolutionComment: notes || `Task ${resolution}`,
              resolution: notes || `Task ${resolution}`,
              resolvedAt: "Just now",
              actionedAt: new Date().toISOString(),
            }
          : t
      )
    );
  };

  return (
    <HITLLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="dashboard-title">HITL Review Queue</h1>
          <p className="text-muted-foreground mt-1">
            Actionable issue management — review, resolve, and track rule-triggered escalations
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
            title="Fixed Today"
            value={String(fixedToday)}
            change={25}
            changeLabel="vs yesterday"
            icon={<CheckCircle className="h-5 w-5" />}
            variant="info"
          />
        </div>

        {/* Queue Content */}
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
      </div>
    </HITLLayout>
  );
}
