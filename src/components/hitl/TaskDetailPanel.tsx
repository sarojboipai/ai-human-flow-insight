import { useState } from "react";
import {
  User,
  Bot,
  Clock,
  CheckCircle,
  XCircle,
  ExternalLink,
  FileText,
  AlertTriangle,
  Info,
  Wrench,
  Timer,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
    resolution: "fixed" | "ignored",
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
  fixed: "bg-success/20 text-success",
  ignored: "bg-muted text-muted-foreground",
};

const priorityColors: Record<string, string> = {
  high: "bg-destructive/20 text-destructive",
  medium: "bg-warning/20 text-warning",
  low: "bg-muted text-muted-foreground",
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
  const [showIgnoreConfirm, setShowIgnoreConfirm] = useState(false);
  const [ignoreComment, setIgnoreComment] = useState("");

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

  const handleMarkFixed = () => {
    onResolve(task.id, "fixed", notes);
    toast({
      title: "Issue Marked as Fixed",
      description: `Task ${task.id} has been resolved.`,
    });
    setNotes("");
    onOpenChange(false);
  };

  const handleIgnore = () => {
    if (!ignoreComment.trim()) {
      toast({
        title: "Comment Required",
        description: "Please provide a reason for ignoring this issue.",
        variant: "destructive",
      });
      return;
    }
    onResolve(task.id, "ignored", ignoreComment);
    toast({
      title: "Issue Ignored",
      description: `Task ${task.id} has been marked as ignored.`,
    });
    setIgnoreComment("");
    setShowIgnoreConfirm(false);
    onOpenChange(false);
  };

  const isResolved = task.status === "fixed" || task.status === "ignored" || task.status === "approved" || task.status === "rejected";

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-card border-border">
          <SheetHeader>
            <div className="flex items-start justify-between">
              <div>
                <SheetTitle className="text-foreground flex items-center gap-2">
                  {task.jobTitle}
                  <Badge className={`capitalize ${statusColors[task.status]}`}>
                    {task.status === "in_review" ? "In Progress" : task.status}
                  </Badge>
                </SheetTitle>
                <SheetDescription className="mt-1">
                  {task.id} • Created {task.createdAt}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="mt-6 space-y-5">
            {/* Section 1: Issue Summary */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                Issue Summary
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">Job Title</span>
                  <span className="font-medium">{task.jobTitle}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">Customer</span>
                  <span className="font-medium">{task.customerName}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">Stage</span>
                  <span className="font-medium">{task.stage}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">Rule Triggered</span>
                  <span className="font-medium">{task.ruleName}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">Priority</span>
                  <Badge variant="outline" className={`w-fit capitalize ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">Source</span>
                  <span className="font-medium">{task.source}</span>
                </div>
                {task.slaDeadline && (
                  <div className="flex flex-col col-span-2">
                    <span className="text-muted-foreground text-xs">SLA Remaining</span>
                    <div className="flex items-center gap-1">
                      <Timer className="h-3.5 w-3.5" />
                      <span className={`font-medium ${task.dueAt === "OVERDUE" ? "text-destructive" : ""}`}>
                        {task.dueAt === "OVERDUE" ? "Breached" : task.dueAt}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: What is the issue? */}
            <div className="rounded-lg border border-border p-4">
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                What is the issue?
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {task.issueDescription}
              </p>
              {task.confidenceScore > 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <Bot className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">AI Decision: {task.aiDecision}</span>
                  <span className={`text-xs font-medium ${task.confidenceScore < 0.7 ? "text-warning" : "text-success"}`}>
                    ({(task.confidenceScore * 100).toFixed(0)}% confidence)
                  </span>
                </div>
              )}
            </div>

            {/* Section 3: What needs to be resolved? */}
            <div className="rounded-lg border border-border p-4">
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Wrench className="h-4 w-4 text-info" />
                What needs to be resolved?
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {task.requiredAction}
              </p>
            </div>

            {/* Section 4: External CTA */}
            {task.externalLink && (
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => window.open(task.externalLink, "_blank")}
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Open in Source Tool
                </span>
                <span className="text-xs text-muted-foreground">Opens in new tab</span>
              </Button>
            )}

            {/* Assignment */}
            <div className="rounded-lg border border-border p-4">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
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
                    <p className="text-sm text-muted-foreground">Assigned {task.assignedAt}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
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
            {isResolved && (task.resolution || task.resolutionComment) && (
              <div className={`rounded-lg border p-4 ${task.status === "ignored" ? "border-muted bg-muted/20" : "border-success/30 bg-success/10"}`}>
                <h4 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${task.status === "ignored" ? "text-muted-foreground" : "text-success"}`}>
                  <CheckCircle className="h-4 w-4" />
                  Resolution
                </h4>
                <p className="text-sm">{task.resolutionComment || task.resolution}</p>
                {task.resolvedAt && (
                  <p className="text-xs text-muted-foreground mt-2">Resolved {task.resolvedAt}</p>
                )}
              </div>
            )}

            {/* Section 5: Resolution Actions (if not resolved) */}
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
                      placeholder="Describe what was done to resolve this issue..."
                      className="bg-background resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                      onClick={handleMarkFixed}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Fixed
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowIgnoreConfirm(true)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Ignore Issue
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Ignore Confirmation Dialog */}
      <AlertDialog open={showIgnoreConfirm} onOpenChange={setShowIgnoreConfirm}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Ignore this issue?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark the issue as ignored and remove it from the active queue. Please provide a reason.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            value={ignoreComment}
            onChange={(e) => setIgnoreComment(e.target.value)}
            placeholder="Reason for ignoring this issue (required)..."
            className="bg-background resize-none"
            rows={3}
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleIgnore} disabled={!ignoreComment.trim()}>
              Confirm Ignore
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
