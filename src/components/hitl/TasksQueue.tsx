import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  User,
  Clock,
  AlertTriangle,
  ChevronRight,
  Timer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HITLTask, TaskStatus, TaskPriority } from "@/lib/mockData";
import { TaskDetailPanel } from "./TaskDetailPanel";

interface TasksQueueProps {
  tasks: HITLTask[];
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

const priorityColors: Record<TaskPriority, string> = {
  high: "bg-destructive/20 text-destructive border-destructive/30",
  medium: "bg-warning/20 text-warning border-warning/30",
  low: "bg-muted text-muted-foreground border-border",
};

const priorityOrder: Record<TaskPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

const rowBorderColors: Record<string, string> = {
  high: "border-l-4 border-l-destructive",
  pending: "",
  assigned: "",
  in_review: "border-l-4 border-l-info",
  fixed: "border-l-4 border-l-success",
  ignored: "border-l-4 border-l-muted-foreground opacity-60",
};

function getSLAIndicator(task: HITLTask) {
  if (!task.slaDeadline) return null;
  if (task.dueAt === "OVERDUE") {
    return <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30 text-xs"><Timer className="h-3 w-3 mr-1" />Breached</Badge>;
  }
  const deadline = new Date(task.slaDeadline);
  const now = new Date();
  const hoursLeft = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);
  if (hoursLeft < 0) {
    return <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30 text-xs"><Timer className="h-3 w-3 mr-1" />Breached</Badge>;
  }
  if (hoursLeft < 2) {
    return <Badge variant="outline" className="bg-warning/20 text-warning border-warning/30 text-xs"><Timer className="h-3 w-3 mr-1" />{Math.round(hoursLeft * 60)}m left</Badge>;
  }
  return <Badge variant="outline" className="bg-success/20 text-success border-success/30 text-xs"><Timer className="h-3 w-3 mr-1" />{Math.round(hoursLeft)}h left</Badge>;
}

function getRowBorder(task: HITLTask) {
  if (task.status === "fixed") return rowBorderColors.fixed;
  if (task.status === "ignored") return rowBorderColors.ignored;
  if (task.status === "in_review") return rowBorderColors.in_review;
  if (task.priority === "high") return rowBorderColors.high;
  return "";
}

const sourceColors: Record<string, string> = {
  AI: "bg-primary/20 text-primary",
  Automation: "bg-info/20 text-info",
  Manual: "bg-warning/20 text-warning",
};

export function TasksQueue({ tasks, onAssign, onResolve }: TasksQueueProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">("all");
  const [selectedTask, setSelectedTask] = useState<HITLTask | null>(null);

  const filteredTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      const matchesSearch =
        task.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.ruleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.customerName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || task.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    // Sort: priority (high→low), then newest first
    filtered.sort((a, b) => {
      const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (pDiff !== 0) return pDiff;
      return 0; // maintain original order as secondary
    });

    return filtered;
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  const pendingCount = tasks.filter((t) => t.status === "pending" || t.status === "assigned").length;
  const highPriorityCount = tasks.filter((t) => t.priority === "high").length;

  return (
    <div className="space-y-4">
      {/* Summary Badges */}
      <div className="flex items-center gap-3">
        <Badge variant="outline" className={priorityColors.high}>
          {highPriorityCount} High Priority
        </Badge>
        <Badge variant="outline" className="bg-warning/20 text-warning">
          {pendingCount} Pending Review
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs, rules, customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as TaskStatus | "all")}>
          <SelectTrigger className="w-[150px] bg-background">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="in_review">In Review</SelectItem>
            <SelectItem value="fixed">Fixed</SelectItem>
            <SelectItem value="ignored">Ignored</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={(v) => setPriorityFilter(v as TaskPriority | "all")}>
          <SelectTrigger className="w-[150px] bg-background">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">Job Title</TableHead>
              <TableHead className="text-muted-foreground font-medium">Rule Condition</TableHead>
              <TableHead className="text-muted-foreground font-medium">Customer</TableHead>
              <TableHead className="text-muted-foreground font-medium">Stage</TableHead>
              <TableHead className="text-muted-foreground font-medium">Priority</TableHead>
              <TableHead className="text-muted-foreground font-medium">Status</TableHead>
              <TableHead className="text-muted-foreground font-medium">Source</TableHead>
              <TableHead className="text-muted-foreground font-medium">SLA</TableHead>
              <TableHead className="text-muted-foreground font-medium">Assigned To</TableHead>
              <TableHead className="text-muted-foreground font-medium w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow
                key={task.id}
                className={`border-border cursor-pointer hover:bg-muted/50 ${getRowBorder(task)}`}
                onClick={() => setSelectedTask(task)}
              >
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{task.jobTitle}</p>
                    <p className="text-xs text-muted-foreground">{task.jobId}</p>
                  </div>
                </TableCell>
                <TableCell className="text-sm max-w-[200px] truncate">{task.ruleName}</TableCell>
                <TableCell className="text-sm">{task.customerName}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">{task.stage}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`capitalize ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={`capitalize ${statusColors[task.status]}`}>
                    {task.status === "in_review" ? "In Progress" : task.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={`text-xs ${sourceColors[task.source]}`}>
                    {task.source}
                  </Badge>
                </TableCell>
                <TableCell>
                  {getSLAIndicator(task) || <span className="text-sm text-muted-foreground">—</span>}
                </TableCell>
                <TableCell>
                  {task.assignedTo ? (
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm">{task.assignedTo}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Unassigned</span>
                  )}
                </TableCell>
                <TableCell>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </TableCell>
              </TableRow>
            ))}
            {filteredTasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Filter className="h-8 w-8" />
                    <p>No tasks found</p>
                    <p className="text-sm">Try adjusting your filters or search query</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Task Detail Slide-over */}
      <TaskDetailPanel
        task={selectedTask}
        open={!!selectedTask}
        onOpenChange={(open) => !open && setSelectedTask(null)}
        onAssign={onAssign}
        onResolve={onResolve}
      />
    </div>
  );
}
