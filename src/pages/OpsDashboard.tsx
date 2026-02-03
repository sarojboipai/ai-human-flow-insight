import { useState } from "react";
import { OpsLayout } from "@/components/layout/OpsLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  GitBranch, Bot, Users, Zap, ArrowRight, Network, 
  AlertCircle, CheckCircle, Clock, TrendingUp 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { agents, workflows, hitlRulesV2, enterpriseCustomers, pipelineTemplates, opsDashboardKPIs } from "@/lib/mockData";

export default function OpsDashboard() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState("all");
  const [jobRole, setJobRole] = useState("all");
  const [cityTier, setCityTier] = useState("all");
  const [dateRange, setDateRange] = useState("30days");

  const activeAgents = agents.filter((a) => a.status === "active").length;
  const activeWorkflows = workflows.filter((w) => w.status === "active").length;
  const activeRules = hitlRulesV2.filter((r) => r.status === "active").length;

  const metrics = [
    {
      title: "Active Pipelines",
      value: opsDashboardKPIs.activePipelines,
      subtitle: `${workflows.length} total defined`,
      icon: GitBranch,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "AI vs Human Split",
      value: `${opsDashboardKPIs.aiTaskDistribution}%`,
      subtitle: `${opsDashboardKPIs.humanTaskDistribution}% human tasks`,
      icon: Bot,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "HITL Queue Volume",
      value: opsDashboardKPIs.hitlQueueVolume,
      subtitle: `+${opsDashboardKPIs.hitlQueueTrend}% from last week`,
      icon: Users,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Pipeline SLA Status",
      value: `${opsDashboardKPIs.pipelineSLAStatus.green}/${opsDashboardKPIs.activePipelines}`,
      subtitle: `${opsDashboardKPIs.pipelineSLAStatus.amber} amber, ${opsDashboardKPIs.pipelineSLAStatus.red} breached`,
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  const quickActions = [
    {
      title: "Orchestration Engine",
      description: "Configure job pipelines, agents, and rules",
      icon: Network,
      path: "/ops/orchestration",
      color: "text-primary",
    },
    {
      title: "Human Activity",
      description: "Track team productivity and performance metrics",
      icon: Users,
      path: "/ops/recruiters",
      color: "text-emerald-500",
    },
    {
      title: "AI Activity",
      description: "Monitor AI agent activity and automation outcomes",
      icon: Bot,
      path: "/ops/ai-performance",
      color: "text-sky-500",
    },
  ];

  return (
    <OpsLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Operations Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of operational systems and pipeline health
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Top Templates Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Hiring Templates in Use</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Template Name</TableHead>
                  <TableHead>Profession</TableHead>
                  <TableHead>Zone</TableHead>
                  <TableHead>Active Jobs</TableHead>
                  <TableHead>AI Coverage</TableHead>
                  <TableHead>HITL Ruleset</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {opsDashboardKPIs.topTemplates.map((template, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{template.profession}</Badge>
                    </TableCell>
                    <TableCell>Tier {template.jobZone}</TableCell>
                    <TableCell>{template.activeJobs}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={template.aiCoverage} className="w-16 h-2" />
                        <span className="text-sm">{template.aiCoverage}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{template.hitlRuleset}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Select value={customer} onValueChange={setCustomer}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  {enterpriseCustomers.map((cust) => (
                    <SelectItem key={cust.id} value={cust.id}>
                      {cust.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={jobRole} onValueChange={setJobRole}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Job Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="technician">Technician</SelectItem>
                  <SelectItem value="pharmacist">Pharmacist</SelectItem>
                </SelectContent>
              </Select>

              <Select value={cityTier} onValueChange={setCityTier}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="City Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="1">Tier 1</SelectItem>
                  <SelectItem value="2">Tier 2</SelectItem>
                  <SelectItem value="3">Tier 3</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map((action) => (
              <Card 
                key={action.title} 
                className="cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => navigate(action.path)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-secondary`}>
                        <action.icon className={`h-5 w-5 ${action.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{action.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pipeline SLA Overview */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Pipeline SLA Overview</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-success/30 bg-success/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="font-medium">On Track</span>
                </div>
                <p className="text-3xl font-bold mt-3 text-success">{opsDashboardKPIs.pipelineSLAStatus.green}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Pipelines meeting SLA targets
                </p>
              </CardContent>
            </Card>
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-amber-500" />
                  <span className="font-medium">At Risk</span>
                </div>
                <p className="text-3xl font-bold mt-3 text-amber-500">{opsDashboardKPIs.pipelineSLAStatus.amber}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Pipelines approaching SLA limits
                </p>
              </CardContent>
            </Card>
            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <span className="font-medium">Breached</span>
                </div>
                <p className="text-3xl font-bold mt-3 text-destructive">{opsDashboardKPIs.pipelineSLAStatus.red}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Pipelines exceeding SLA thresholds
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Health */}
        <div>
          <h2 className="text-lg font-semibold mb-4">System Health</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
                  <span className="font-medium">All Agents Healthy</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {activeAgents} agents running with no errors
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
                  <span className="font-medium">Pipelines Active</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {activeWorkflows} active pipelines processing
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
                  <span className="font-medium">Rules Active</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {activeRules} HITL rules enforced
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </OpsLayout>
  );
}
