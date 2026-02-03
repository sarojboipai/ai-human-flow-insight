import { useState, useMemo } from "react";
import { Briefcase, GitBranch, AlertTriangle, Target, Search, Filter } from "lucide-react";
import { OpsLayout } from "@/components/layout/OpsLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { jobs, workflows } from "@/lib/mockData";

export default function OpsJobOrchestration() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [pipelineFilter, setPipelineFilter] = useState<string>("all");

  // Compute metrics
  const metrics = useMemo(() => {
    const activeJobs = jobs.filter((j) => j.status === "active").length;
    const pipelinesInUse = new Set(jobs.map((j) => j.workflowId)).size;
    const unassignedJobs = jobs.filter((j) => !j.workflowId).length;
    const atRiskJobs = jobs.filter((j) => j.status === "active" && j.daysOpen > 21).length;

    return [
      {
        title: "Active Jobs",
        value: activeJobs,
        subtitle: "Open positions being orchestrated",
        icon: Briefcase,
        color: "text-primary",
      },
      {
        title: "Pipelines in Use",
        value: pipelinesInUse,
        subtitle: `${workflows.length} total available`,
        icon: GitBranch,
        color: "text-emerald-500",
      },
      {
        title: "Unassigned Jobs",
        value: unassignedJobs,
        subtitle: "Jobs without pipeline",
        icon: Target,
        color: "text-amber-500",
      },
      {
        title: "At-Risk Jobs",
        value: atRiskJobs,
        subtitle: "Approaching SLA breach",
        icon: AlertTriangle,
        color: "text-destructive",
      },
    ];
  }, []);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.employer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || job.status === statusFilter;
      const matchesPipeline =
        pipelineFilter === "all" || job.workflowId === pipelineFilter;

      return matchesSearch && matchesStatus && matchesPipeline;
    });
  }, [searchQuery, statusFilter, pipelineFilter]);

  // Get SLA status based on days open
  const getSLAStatus = (daysOpen: number, status: string) => {
    if (status === "filled") return "green";
    if (daysOpen > 28) return "red";
    if (daysOpen > 21) return "amber";
    return "green";
  };

  const getWorkflowName = (workflowId: string) => {
    const workflow = workflows.find((w) => w.id === workflowId);
    return workflow?.name || "Unassigned";
  };

  return (
    <OpsLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Job Orchestration</h1>
          <p className="text-muted-foreground mt-1">
            Assign and monitor pipeline execution for active jobs
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="filled">Filled</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={pipelineFilter} onValueChange={setPipelineFilter}>
            <SelectTrigger className="w-[200px]">
              <GitBranch className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Pipeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pipelines</SelectItem>
              {workflows.map((wf) => (
                <SelectItem key={wf.id} value={wf.id}>
                  {wf.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Jobs Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Employer</TableHead>
                  <TableHead>Role Type</TableHead>
                  <TableHead>Assigned Pipeline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Days Open</TableHead>
                  <TableHead className="text-center">SLA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => {
                  const slaStatus = getSLAStatus(job.daysOpen, job.status);
                  return (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.employer}</TableCell>
                      <TableCell className="capitalize">{job.roleType}</TableCell>
                      <TableCell>
                        <Select defaultValue={job.workflowId}>
                          <SelectTrigger className="w-[180px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {workflows.map((wf) => (
                              <SelectItem key={wf.id} value={wf.id}>
                                {wf.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            job.status === "active"
                              ? "default"
                              : job.status === "filled"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">{job.daysOpen}</TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`inline-block w-3 h-3 rounded-full ${
                            slaStatus === "green"
                              ? "bg-emerald-500"
                              : slaStatus === "amber"
                              ? "bg-amber-500"
                              : "bg-destructive"
                          }`}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </OpsLayout>
  );
}
