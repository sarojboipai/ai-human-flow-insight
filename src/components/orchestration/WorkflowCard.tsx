import { Play, Pause, Edit, Trash2, GitBranch, Clock, Users, Bot, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Workflow } from "@/lib/mockData";

interface WorkflowCardProps {
  workflow: Workflow;
  onEdit?: (workflow: Workflow) => void;
  onToggleStatus?: (workflow: Workflow) => void;
  onDelete?: (workflow: Workflow) => void;
}

const getStatusBadge = (status: Workflow["status"]) => {
  switch (status) {
    case "active":
      return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Active</Badge>;
    case "paused":
      return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Paused</Badge>;
    case "draft":
      return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Draft</Badge>;
    case "archived":
      return <Badge className="bg-muted text-muted-foreground border-muted">Archived</Badge>;
  }
};

const getJobTypeBadge = (jobType: Workflow["jobType"]) => {
  switch (jobType) {
    case "frontline":
      return <Badge variant="outline" className="border-teal-500 text-teal-500">Frontline</Badge>;
    case "professional":
      return <Badge variant="outline" className="border-blue-500 text-blue-500">Professional</Badge>;
    case "enterprise":
      return <Badge variant="outline" className="border-purple-500 text-purple-500">Enterprise</Badge>;
  }
};

export function WorkflowCard({ workflow, onEdit, onToggleStatus, onDelete }: WorkflowCardProps) {
  const aiStages = workflow.stages.filter(s => s.assignedActor === "ai").length;
  const humanStages = workflow.stages.filter(s => s.assignedActor === "human").length;
  const hybridStages = workflow.stages.filter(s => s.assignedActor === "hybrid").length;

  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-primary" />
              {workflow.name}
              <span className="text-xs text-muted-foreground font-normal">v{workflow.version}</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {workflow.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(workflow.status)}
            {getJobTypeBadge(workflow.jobType)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-semibold">{workflow.stages.length}</div>
            <div className="text-xs text-muted-foreground">Stages</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-emerald-500">{workflow.executionCount.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Executions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">{workflow.successRate}%</div>
            <div className="text-xs text-muted-foreground">Success</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Bot className="h-3 w-3 text-primary" />
              <span className="text-sm">{aiStages}</span>
              <Users className="h-3 w-3 text-amber-500 ml-1" />
              <span className="text-sm">{humanStages}</span>
              <CheckCircle className="h-3 w-3 text-teal-500 ml-1" />
              <span className="text-sm">{hybridStages}</span>
            </div>
            <div className="text-xs text-muted-foreground">AI/Human/Hybrid</div>
          </div>
        </div>

        {/* Stage preview */}
        <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-1">
          {workflow.stages.map((stage, idx) => (
            <div key={stage.id} className="flex items-center">
              <div 
                className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
                  stage.assignedActor === "ai" 
                    ? "bg-primary/10 text-primary" 
                    : stage.assignedActor === "human"
                    ? "bg-amber-500/10 text-amber-500"
                    : "bg-teal-500/10 text-teal-500"
                }`}
              >
                {stage.name}
              </div>
              {idx < workflow.stages.length - 1 && (
                <span className="text-muted-foreground mx-1">→</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Updated {workflow.updatedAt}
            </span>
            <span>by {workflow.createdBy}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => onEdit?.(workflow)}>
              <Edit className="h-4 w-4" />
            </Button>
            {workflow.status === "draft" ? (
              <Button variant="ghost" size="sm" onClick={() => onDelete?.(workflow)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => onToggleStatus?.(workflow)}>
                {workflow.status === "paused" ? (
                  <Play className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Pause className="h-4 w-4 text-amber-500" />
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
