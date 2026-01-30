import { Play, Pause, Edit, Trash2, GitBranch, Clock, Users, Bot, CheckCircle, ArrowRight, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Workflow } from "@/lib/mockData";

interface WorkflowCardProps {
  workflow: Workflow;
  jobsCount?: number;
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
      return <Badge variant="secondary">Draft</Badge>;
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

export function WorkflowCard({ workflow, jobsCount = 0, onEdit, onToggleStatus, onDelete }: WorkflowCardProps) {
  const aiStages = workflow.stages.filter(s => s.assignedActor === "ai").length;
  const humanStages = workflow.stages.filter(s => s.assignedActor === "human").length;
  const hybridStages = workflow.stages.filter(s => s.assignedActor === "hybrid").length;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">{workflow.name}</h3>
            <span className="text-muted-foreground text-sm">v{workflow.version}</span>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(workflow.status)}
            {getJobTypeBadge(workflow.jobType)}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
          {workflow.description}
        </p>

        {/* Metrics Row */}
        <div className="flex items-center gap-8 mb-4">
          <div className="text-center">
            <div className="text-xl font-bold">{workflow.stages.length}</div>
            <div className="text-xs text-muted-foreground">Stages</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-500">{jobsCount}</div>
            <div className="text-xs text-muted-foreground">Jobs</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-primary">{workflow.executionCount.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Executions</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-emerald-500">{workflow.successRate}%</div>
            <div className="text-xs text-muted-foreground">Success</div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1">
              <Bot className="h-4 w-4 text-amber-500" />
              {aiStages}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              {humanStages}
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-teal-500" />
              {hybridStages}
            </span>
            <span className="text-xs text-muted-foreground">AI/Human/Hybrid</span>
          </div>
        </div>

        {/* Stage Flow - Show all stages */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {workflow.stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center gap-2">
              <Badge variant="outline" className="whitespace-nowrap bg-teal-500/10 text-teal-600 border-teal-500/20">
                {stage.name}
              </Badge>
              {index < workflow.stages.length - 1 && (
                <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <Progress value={workflow.successRate} className="h-1.5 mb-4" />

        {/* Footer */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Updated {workflow.updatedAt}</span>
            <span>by {workflow.createdBy}</span>
          </div>
          <div className="flex items-center gap-1">
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(workflow);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onToggleStatus && workflow.status !== "draft" && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStatus(workflow);
                }}
              >
                {workflow.status === "paused" ? (
                  <Play className="h-4 w-4" />
                ) : (
                  <Pause className="h-4 w-4" />
                )}
              </Button>
            )}
            {onDelete && workflow.status === "draft" && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(workflow);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
