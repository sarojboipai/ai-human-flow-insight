import { useState } from "react";
import {
  Search,
  Filter,
  Clock,
  Bot,
  User,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  FileText,
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HITLAuditLog, AuditEventType } from "@/lib/mockData";

interface AuditLogTableProps {
  logs: HITLAuditLog[];
}

const eventTypeConfig: Record<
  AuditEventType,
  { label: string; icon: typeof Clock; color: string }
> = {
  rule_triggered: {
    label: "Rule Triggered",
    icon: AlertCircle,
    color: "bg-warning/20 text-warning",
  },
  task_created: {
    label: "Task Created",
    icon: FileText,
    color: "bg-info/20 text-info",
  },
  task_assigned: {
    label: "Task Assigned",
    icon: User,
    color: "bg-primary/20 text-primary",
  },
  task_resolved: {
    label: "Task Resolved",
    icon: CheckCircle,
    color: "bg-success/20 text-success",
  },
  task_escalated: {
    label: "Task Escalated",
    icon: ArrowUpRight,
    color: "bg-orange-500/20 text-orange-500",
  },
};

export function AuditLogTable({ logs }: AuditLogTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [eventFilter, setEventFilter] = useState<AuditEventType | "all">("all");
  const [actorFilter, setActorFilter] = useState<string>("all");

  // Get unique actors
  const uniqueActors = [...new Set(logs.map((log) => log.actor))];

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.taskId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ruleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEvent = eventFilter === "all" || log.eventType === eventFilter;
    const matchesActor = actorFilter === "all" || log.actor === actorFilter;

    return matchesSearch && matchesEvent && matchesActor;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>
        <Select
          value={eventFilter}
          onValueChange={(v) => setEventFilter(v as AuditEventType | "all")}
        >
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="rule_triggered">Rule Triggered</SelectItem>
            <SelectItem value="task_created">Task Created</SelectItem>
            <SelectItem value="task_assigned">Task Assigned</SelectItem>
            <SelectItem value="task_resolved">Task Resolved</SelectItem>
            <SelectItem value="task_escalated">Task Escalated</SelectItem>
          </SelectContent>
        </Select>
        <Select value={actorFilter} onValueChange={setActorFilter}>
          <SelectTrigger className="w-[150px] bg-background">
            <SelectValue placeholder="Actor" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="all">All Actors</SelectItem>
            {uniqueActors.map((actor) => (
              <SelectItem key={actor} value={actor}>
                {actor === "system" ? "System" : actor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">
                Timestamp
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Event
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Rule
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Task
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Actor
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Details
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => {
              const config = eventTypeConfig[log.eventType];
              const IconComponent = config.icon;

              return (
                <TableRow key={log.id} className="border-border">
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {log.timestamp}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${config.color} gap-1`}>
                      <IconComponent className="h-3 w-3" />
                      {config.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{log.ruleName}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {log.taskId}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {log.actor === "system" ? (
                        <Bot className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <User className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-sm">
                        {log.actor === "system" ? "System" : log.actor}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-sm text-muted-foreground max-w-[300px] truncate cursor-help">
                          {log.details}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="max-w-[400px] bg-popover border-border"
                      >
                        <div className="space-y-2">
                          <p className="text-sm">{log.details}</p>
                          {Object.keys(log.snapshot).length > 0 && (
                            <div className="border-t border-border pt-2 mt-2">
                              <p className="text-xs font-medium mb-1">
                                Snapshot:
                              </p>
                              <pre className="text-xs text-muted-foreground">
                                {JSON.stringify(log.snapshot, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
            {filteredLogs.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Filter className="h-8 w-8" />
                    <p>No audit logs found</p>
                    <p className="text-sm">
                      Try adjusting your filters or search query
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          Showing {filteredLogs.length} of {logs.length} audit entries
        </p>
        <p>Logs retained for 90 days</p>
      </div>
    </div>
  );
}
