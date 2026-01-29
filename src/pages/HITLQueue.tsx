import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { hitlQueue } from "@/lib/mockData";
import { Zap, Clock, CheckCircle, AlertTriangle, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const priorityColors = {
  high: "bg-destructive/20 text-destructive border-destructive/30",
  medium: "bg-warning/20 text-warning border-warning/30",
  low: "bg-muted text-muted-foreground border-border",
};

const statusColors = {
  pending: "bg-warning/20 text-warning",
  in_review: "bg-info/20 text-info",
  completed: "bg-success/20 text-success",
  unassigned: "bg-muted text-muted-foreground",
};

export default function HITLQueue() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="dashboard-title">HITL Queue</h1>
            <p className="text-muted-foreground mt-1">
              Human-in-the-Loop review tasks requiring manual intervention
            </p>
          </div>
          <Button variant="outline">
            <Zap className="h-4 w-4 mr-2" />
            Configure Rules
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Pending Reviews"
            value="24"
            change={-12}
            changeLabel="vs yesterday"
            icon={<Clock className="h-5 w-5" />}
            variant="warning"
          />
          <MetricCard
            title="High Priority"
            value="3"
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
            value="18"
            change={25}
            changeLabel="vs yesterday"
            icon={<CheckCircle className="h-5 w-5" />}
            variant="info"
          />
        </div>

        {/* Queue Table */}
        <div className="chart-container">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title">Review Queue</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={priorityColors.high}>
                3 High
              </Badge>
              <Badge variant="outline" className={priorityColors.medium}>
                8 Medium
              </Badge>
              <Badge variant="outline" className={priorityColors.low}>
                13 Low
              </Badge>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium">ID</TableHead>
                <TableHead className="text-muted-foreground font-medium">Candidate</TableHead>
                <TableHead className="text-muted-foreground font-medium">Reason</TableHead>
                <TableHead className="text-muted-foreground font-medium">Priority</TableHead>
                <TableHead className="text-muted-foreground font-medium">Assignee</TableHead>
                <TableHead className="text-muted-foreground font-medium">Status</TableHead>
                <TableHead className="text-muted-foreground font-medium">Created</TableHead>
                <TableHead className="text-muted-foreground font-medium text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hitlQueue.map((item) => (
                <TableRow key={item.id} className="border-border">
                  <TableCell className="font-mono text-sm">{item.id}</TableCell>
                  <TableCell className="font-mono text-sm">{item.candidateId}</TableCell>
                  <TableCell className="text-sm max-w-[200px] truncate">
                    {item.reason}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={priorityColors[item.priority as keyof typeof priorityColors]}
                    >
                      {item.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.assignee ? (
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm">{item.assignee}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[item.status as keyof typeof statusColors]}>
                      {item.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.createdAt}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* HITL Rules */}
        <div className="chart-container">
          <h3 className="section-title mb-4">Active HITL Rules</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Low AI Confidence",
                condition: "AI confidence < 0.7",
                action: "Route to human review",
                triggers: 342,
                status: "active",
              },
              {
                name: "Enterprise Employer",
                condition: "Employer tier = Enterprise",
                action: "Mandatory review",
                triggers: 189,
                status: "active",
              },
              {
                name: "Compliance Check",
                condition: "Role requires certification",
                action: "Verify credentials",
                triggers: 114,
                status: "active",
              },
              {
                name: "High Drop-off",
                condition: "Stage drop-off > 40%",
                action: "Ops escalation",
                triggers: 28,
                status: "active",
              },
              {
                name: "Salary Negotiation",
                condition: "Offer counter > 15%",
                action: "Senior recruiter review",
                triggers: 56,
                status: "active",
              },
              {
                name: "Geographic Restriction",
                condition: "Cross-region placement",
                action: "Compliance check",
                triggers: 22,
                status: "paused",
              },
            ].map((rule) => (
              <div
                key={rule.name}
                className={`rounded-lg border p-4 ${
                  rule.status === "active"
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-muted/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-medium">{rule.name}</h4>
                  <Badge
                    variant="outline"
                    className={
                      rule.status === "active"
                        ? "bg-success/20 text-success border-success/30"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {rule.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="text-foreground">If:</span> {rule.condition}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="text-foreground">Then:</span> {rule.action}
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  {rule.triggers} triggers this month
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
