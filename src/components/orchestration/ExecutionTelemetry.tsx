import { useState } from "react";
import { Activity, Play, CheckCircle, XCircle, Pause, Clock, Bot, Users, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExecutionLog, executionLogs as mockExecutionLogs, telemetryMetrics } from "@/lib/mockData";

const getStatusIcon = (status: ExecutionLog["status"]) => {
  switch (status) {
    case "running":
      return <Play className="h-4 w-4 text-primary animate-pulse" />;
    case "completed":
      return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    case "failed":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "paused":
      return <Pause className="h-4 w-4 text-amber-500" />;
  }
};

const getStatusBadge = (status: ExecutionLog["status"]) => {
  switch (status) {
    case "running":
      return <Badge className="bg-primary/10 text-primary border-primary/20">Running</Badge>;
    case "completed":
      return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Completed</Badge>;
    case "failed":
      return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Failed</Badge>;
    case "paused":
      return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Paused</Badge>;
  }
};

export function ExecutionTelemetry() {
  const [executions] = useState<ExecutionLog[]>(mockExecutionLogs);
  const [timeRange, setTimeRange] = useState("24h");
  const [selectedExecution, setSelectedExecution] = useState<ExecutionLog | null>(null);

  const metrics = telemetryMetrics;

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-end">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1h">Last 1 hour</SelectItem>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Workflows Running
            </CardTitle>
            <Play className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.workflowsRunning}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.workflowsCompleted}</div>
            <p className="text-xs text-muted-foreground">In selected period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Failed
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.workflowsFailed}</div>
            <p className="text-xs text-muted-foreground">{metrics.errorRate}% error rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Duration
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgDuration}</div>
            <p className="text-xs text-muted-foreground">End-to-end</p>
          </CardContent>
        </Card>
      </div>

      {/* AI vs Human Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              AI Actions Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{metrics.aiActionsToday.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${(metrics.aiActionsToday / (metrics.aiActionsToday + metrics.humanActionsToday)) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {((metrics.aiActionsToday / (metrics.aiActionsToday + metrics.humanActionsToday)) * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Avg latency: {metrics.avgLatency}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-amber-500" />
              Human Actions Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500">{metrics.humanActionsToday.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full" 
                  style={{ width: `${(metrics.humanActionsToday / (metrics.aiActionsToday + metrics.humanActionsToday)) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {((metrics.humanActionsToday / (metrics.aiActionsToday + metrics.humanActionsToday)) * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">HITL interventions included</p>
          </CardContent>
        </Card>
      </div>

      {/* Execution Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Recent Executions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Workflow</TableHead>
                <TableHead>Job</TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead>Current Stage</TableHead>
                <TableHead className="text-center">AI / Human</TableHead>
                <TableHead>Started</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {executions.map((exec) => (
                <TableRow 
                  key={exec.id} 
                  className={selectedExecution?.id === exec.id ? "bg-muted/50" : "cursor-pointer hover:bg-muted/30"}
                  onClick={() => setSelectedExecution(exec)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(exec.status)}
                      {getStatusBadge(exec.status)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{exec.workflowName}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{exec.jobTitle}</div>
                      <div className="text-xs text-muted-foreground">{exec.jobId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{exec.candidateName}</div>
                      <div className="text-xs text-muted-foreground">{exec.candidateId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{exec.currentStage}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-primary font-medium">{exec.aiActions}</span>
                      <span className="text-muted-foreground">/</span>
                      <span className="text-amber-500 font-medium">{exec.humanActions}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{exec.startedAt}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Selected Execution Timeline */}
      {selectedExecution && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Execution Trace: {selectedExecution.candidateName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {selectedExecution.traceEvents.map((event, idx) => (
                <div key={event.id} className="flex gap-4 pb-6 relative">
                  {/* Timeline line */}
                  {idx < selectedExecution.traceEvents.length - 1 && (
                    <div className="absolute left-[11px] top-6 w-0.5 h-full bg-border" />
                  )}
                  
                  {/* Status dot */}
                  <div className={`relative z-10 h-6 w-6 rounded-full flex items-center justify-center ${
                    event.status === "success" ? "bg-emerald-500/20" :
                    event.status === "failed" ? "bg-red-500/20" : "bg-amber-500/20"
                  }`}>
                    {event.status === "success" ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    ) : event.status === "failed" ? (
                      <XCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-amber-500" />
                    )}
                  </div>

                  {/* Event details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{event.stage}</span>
                      <Badge variant={event.actor === "ai" ? "default" : "secondary"} className="text-xs">
                        {event.actor === "ai" ? "AI" : "Human"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">• {event.duration}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{event.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
