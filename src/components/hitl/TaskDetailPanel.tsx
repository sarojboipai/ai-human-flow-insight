import { useState } from "react";
import {
  X,
  User,
  Bot,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { HITLTask, TaskStatus, recruiters } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface TaskDetailPanelProps {
  task: HITLTask | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (taskId: string, assignee: string) => void;
  onResolve: (
    taskId: string,
    resolution: "approved" | "rejected" | "escalated",
    notes: string
  ) => void;
}

const statusColors: Record<TaskStatus, string> = {
  pending: "bg-warning/20 text-warning",
  assigned: "bg-info/20 text-info",
  in_review: "bg-primary/20 text-primary",
  approved: "bg-success/20 text-success",
  rejected: "bg-destructive/20 text-destructive",
  escalated: "bg-orange-500/20 text-orange-500",
};

export function TaskDetailPanel({
  task,
  open,
  onOpenChange,
  onAssign,
  onResolve,
}: TaskDetailPanelProps) {
  const { toast } = useToast();
  const [notes, setNotes] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState("");

  if (!task) return null;

  const handleAssign = () => {
    if (!selectedAssignee) {
      toast({
        title: "Select Assignee",
        description: "Please select a recruiter to assign this task.",
        variant: "destructive",
      });
      return;
    }
    onAssign(task.id, selectedAssignee);
    toast({
      title: "Task Assigned",
      description: `Task ${task.id} assigned to ${selectedAssignee}.`,
    });
    setSelectedAssignee("");
  };

  const handleResolve = (resolution: "approved" | "rejected" | "escalated") => {
    onResolve(task.id, resolution, notes);
    toast({
      title: `Task ${resolution.charAt(0).toUpperCase() + resolution.slice(1)}`,
      description: `Task ${task.id} has been ${resolution}.`,
    });
    setNotes("");
    onOpenChange(false);
  };

  const isResolved =
    task.status === "approved" ||
    task.status === "rejected" ||
    task.status === "escalated";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-card border-border">
        <SheetHeader>
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-foreground flex items-center gap-2">
                Task {task.id}
                <Badge className={`capitalize ${statusColors[task.status]}`}>
                  {task.status.replace("_", " ")}
                </Badge>
              </SheetTitle>
              <SheetDescription className="mt-1">
                Created {task.createdAt}
                {task.dueAt && ` • Due in ${task.dueAt}`}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Task & AI Decision Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Task Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rule:</span>
                  <span>{task.ruleName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Priority:</span>
                  <span className="capitalize">{task.priority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Candidate:</span>
                  <span>{task.candidateId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Job:</span>
                  <span>{task.jobId}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Bot className="h-4 w-4" />
                AI Decision
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Decision:</span>
                  <span>{task.aiDecision}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Confidence:</span>
                  <span
                    className={
                      task.confidenceScore < 0.7
                        ? "text-warning"
                        : "text-success"
                    }
                  >
                    {(task.confidenceScore * 100).toFixed(0)}%
                  </span>
                </div>
                {task.aiAgentId && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Agent:</span>
                    <span>{task.aiAgentId}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Candidate & Job Summary */}
          <div className="rounded-lg border border-border p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Candidate</h4>
                <p className="text-lg font-semibold">{task.candidateName}</p>
                <p className="text-sm text-muted-foreground">
                  {task.candidateId}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Job Position</h4>
                <p className="text-lg font-semibold">{task.jobTitle}</p>
                <p className="text-sm text-muted-foreground">{task.jobId}</p>
              </div>
            </div>
          </div>

          {/* Metadata */}
          {Object.keys(task.metadata).length > 0 && (
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h4 className="text-sm font-medium mb-3">Additional Context</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(task.metadata).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </span>
                    <span>{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Assignment */}
          <div className="rounded-lg border border-border p-4">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              Assignment
            </h4>
            {task.assignedTo ? (
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{task.assignedTo}</p>
                  <p className="text-sm text-muted-foreground">
                    Assigned {task.assignedAt}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Select
                  value={selectedAssignee}
                  onValueChange={setSelectedAssignee}
                >
                  <SelectTrigger className="flex-1 bg-background">
                    <SelectValue placeholder="Select recruiter..." />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {recruiters.map((r) => (
                      <SelectItem key={r.id} value={r.name}>
                        {r.name} ({r.team})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleAssign} disabled={!selectedAssignee}>
                  Assign
                </Button>
              </div>
            )}
          </div>

          {/* Resolution (if already resolved) */}
          {isResolved && task.resolution && (
            <div className="rounded-lg border border-success/30 bg-success/10 p-4">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-success">
                <CheckCircle className="h-4 w-4" />
                Resolution
              </h4>
              <p className="text-sm">{task.resolution}</p>
              {task.resolvedAt && (
                <p className="text-xs text-muted-foreground mt-2">
                  Resolved {task.resolvedAt}
                </p>
              )}
            </div>
          )}

          {/* Actions (if not resolved) */}
          {!isResolved && (
            <>
              <Separator />
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Resolution Notes
                  </label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes about your review decision..."
                    className="bg-background resize-none"
                    rows={3}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                    onClick={() => handleResolve("approved")}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleResolve("rejected")}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleResolve("escalated")}
                  >
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    Escalate
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
