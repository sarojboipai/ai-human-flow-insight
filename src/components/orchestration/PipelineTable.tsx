import { useNavigate } from "react-router-dom";
import { Edit, Pause, Play, GitBranch, Briefcase, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Workflow, jobs } from "@/lib/mockData";

interface PipelineTableProps {
  workflows: Workflow[];
  onToggleStatus?: (workflow: Workflow) => void;
  onDelete?: (workflow: Workflow) => void;
  showDeleteAction?: boolean;
}

// Helper to get hiring type label
const getHiringTypeLabel = (workflow: Workflow) => {
  if (workflow.hiringType) {
    const labels: Record<string, string> = {
      bulk: "Bulk",
      fast_track: "Fast Track",
      niche: "Niche",
    };
    return labels[workflow.hiringType] || workflow.hiringType;
  }
  // Fallback to jobType
  const labels: Record<string, string> = {
    frontline: "Bulk",
    professional: "Fast Track",
    enterprise: "Niche",
  };
  return labels[workflow.jobType] || workflow.jobType;
};

// Helper to get profession label
const getProfessionLabel = (workflow: Workflow) => {
  if (workflow.profession) {
    return workflow.profession.charAt(0).toUpperCase() + workflow.profession.slice(1);
  }
  return "—";
};

// Helper to get location tier label
const getLocationTierLabel = (workflow: Workflow) => {
  if (workflow.locationTier) {
    const labels: Record<string, string> = {
      tier_1: "Tier 1",
      tier_2: "Tier 2",
      tier_3: "Tier 3",
    };
    return labels[workflow.locationTier] || workflow.locationTier;
  }
  return "—";
};

// Helper to get industry label
const getIndustryLabel = (workflow: Workflow) => {
  if (workflow.industry) {
    const labels: Record<string, string> = {
      hospital: "Hospital",
      diagnostic_lab: "Diagnostic Lab",
      pharmaceuticals: "Pharma",
    };
    return labels[workflow.industry] || workflow.industry;
  }
  return "—";
};

// Helper to calculate AI/Human split
const getAIHumanSplit = (workflow: Workflow) => {
  const stages = workflow.stages || [];
  if (stages.length === 0) return { ai: 50, human: 50 };
  
  const aiStages = stages.filter((s) => s.assignedActor === "ai").length;
  const humanStages = stages.filter((s) => s.assignedActor === "human").length;
  const hybridStages = stages.filter((s) => s.assignedActor === "hybrid").length;
  
  const aiCount = aiStages + hybridStages * 0.5;
  const humanCount = humanStages + hybridStages * 0.5;
  const total = aiCount + humanCount || 1;
  
  return {
    ai: Math.round((aiCount / total) * 100),
    human: Math.round((humanCount / total) * 100),
  };
};

// Get SLA status based on workflow
const getSLAStatus = (workflow: Workflow): "green" | "amber" | "red" => {
  // Use success rate as a proxy for SLA health
  if (workflow.successRate >= 85) return "green";
  if (workflow.successRate >= 70) return "amber";
  return "red";
};

export function PipelineTable({ workflows, onToggleStatus, onDelete, showDeleteAction }: PipelineTableProps) {
  const navigate = useNavigate();

  // Get job count for a workflow
  const getJobsCount = (workflowId: string) => {
    return jobs.filter((job) => job.workflowId === workflowId).length;
  };

  const handleEdit = (workflow: Workflow) => {
    navigate(`/ops/template-builder/${workflow.id}`);
  };

  if (workflows.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <GitBranch className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>No pipelines in this section</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Pipeline</TableHead>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead className="w-[100px]">Profession</TableHead>
            <TableHead className="w-[60px]">Zone</TableHead>
            <TableHead className="w-[80px]">Tier</TableHead>
            <TableHead className="w-[100px]">Industry</TableHead>
            <TableHead className="w-[60px]">Jobs</TableHead>
            <TableHead className="w-[100px]">AI/Human</TableHead>
            <TableHead className="w-[80px]">Success</TableHead>
            <TableHead className="w-[80px]">SLA</TableHead>
            <TableHead className="w-[100px]">Updated</TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workflows.map((workflow) => {
            const split = getAIHumanSplit(workflow);
            const slaStatus = getSLAStatus(workflow);
            const jobsCount = getJobsCount(workflow.id);

            return (
              <TableRow
                key={workflow.id}
                className="cursor-pointer"
                onClick={() => handleEdit(workflow)}
              >
                {/* Pipeline Name */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium">{workflow.name}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        v{workflow.version}
                      </Badge>
                    </div>
                  </div>
                </TableCell>

                {/* Type */}
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      workflow.jobType === "enterprise"
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                        : workflow.jobType === "professional"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                    }
                  >
                    {getHiringTypeLabel(workflow)}
                  </Badge>
                </TableCell>

                {/* Profession */}
                <TableCell className="text-sm">{getProfessionLabel(workflow)}</TableCell>

                {/* Zone */}
                <TableCell className="text-sm">
                  {workflow.jobZone ? `Zone ${workflow.jobZone}` : "—"}
                </TableCell>

                {/* Tier */}
                <TableCell className="text-sm">{getLocationTierLabel(workflow)}</TableCell>

                {/* Industry */}
                <TableCell className="text-sm">{getIndustryLabel(workflow)}</TableCell>

                {/* Jobs Count */}
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm font-medium">{jobsCount}</span>
                  </div>
                </TableCell>

                {/* AI/Human Split */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex h-2 w-16 overflow-hidden rounded-full bg-muted">
                      <div
                        className="bg-orange-500"
                        style={{ width: `${split.ai}%` }}
                      />
                      <div
                        className="bg-blue-500"
                        style={{ width: `${split.human}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {split.ai}/{split.human}
                    </span>
                  </div>
                </TableCell>

                {/* Success Rate */}
                <TableCell>
                  <span
                    className={`text-sm font-medium ${
                      workflow.successRate >= 85
                        ? "text-emerald-600"
                        : workflow.successRate >= 70
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}
                  >
                    {workflow.successRate > 0 ? `${workflow.successRate}%` : "—"}
                  </span>
                </TableCell>

                {/* SLA Status */}
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        slaStatus === "green"
                          ? "bg-emerald-500"
                          : slaStatus === "amber"
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                    />
                    <span className="text-xs text-muted-foreground capitalize">
                      {slaStatus}
                    </span>
                  </div>
                </TableCell>

                {/* Updated */}
                <TableCell className="text-sm text-muted-foreground">
                  {workflow.updatedAt}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(workflow);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {showDeleteAction && onDelete ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(workflow);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    ) : onToggleStatus ? (
                      <Button
                        variant="ghost"
                        size="icon"
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
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
