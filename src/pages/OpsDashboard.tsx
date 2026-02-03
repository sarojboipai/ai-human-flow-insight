import { useState, useMemo } from "react";
import { OpsLayout } from "@/components/layout/OpsLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Briefcase, Bot, Users, Target,
  AlertCircle, AlertTriangle, CheckCircle, Clock
} from "lucide-react";
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
import { 
  enterpriseCustomers, 
  calculateOpsFilteredKPIs, 
  getFilteredTopTemplates,
  type OpsFilterParams 
} from "@/lib/mockData";

export default function OpsDashboard() {
  const [customer, setCustomer] = useState("all");
  const [jobRole, setJobRole] = useState("all");
  const [cityTier, setCityTier] = useState("all");
  const [dateRange, setDateRange] = useState("30days");

  // Create filter params object
  const filterParams: OpsFilterParams = useMemo(() => ({
    customerId: customer,
    roleType: jobRole,
    cityTier: cityTier,
    dateRange: dateRange,
  }), [customer, jobRole, cityTier, dateRange]);

  // Calculate filtered KPIs
  const filteredKPIs = useMemo(() => 
    calculateOpsFilteredKPIs(filterParams), 
    [filterParams]
  );

  // Get filtered templates
  const filteredTemplates = useMemo(() => 
    getFilteredTopTemplates(filterParams), 
    [filterParams]
  );

  const metrics = [
    // Row 1
    {
      title: "Active Jobs",
      value: filteredKPIs.activeJobs,
      subtitle: "Open positions across all pipelines",
      icon: Briefcase,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "AI vs Human Split",
      value: `${filteredKPIs.aiTaskDistribution}%`,
      subtitle: `${filteredKPIs.humanTaskDistribution}% human tasks`,
      icon: Bot,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "HITL Queue Volume",
      value: filteredKPIs.hitlQueueVolume,
      subtitle: `+${filteredKPIs.hitlQueueTrend}% from last week`,
      icon: Users,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Positions Filled",
      value: `${filteredKPIs.positionsFilled} / ${filteredKPIs.positionsRequired}`,
      subtitle: "Positions filled vs required",
      icon: Target,
      color: "text-sky-500",
      bgColor: "bg-sky-500/10",
    },
    // Row 2
    {
      title: "Job Fulfilment Rate",
      value: `${filteredKPIs.jobFulfilmentRate}%`,
      subtitle: "+3.2% vs last period",
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Avg Time to Fill",
      value: `${filteredKPIs.avgTimeToFill} days`,
      subtitle: "Target: 21 days",
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "SLA Breach Count",
      value: filteredKPIs.slaBreachCount,
      subtitle: "Jobs exceeding SLA",
      icon: AlertTriangle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      title: "At-risk Jobs",
      value: filteredKPIs.atRiskJobs,
      subtitle: "Red flagged",
      icon: AlertCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ];


  return (
    <OpsLayout>
      <div className="space-y-6">
        {/* Header with Global Filters */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Operations Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Overview of operational systems and pipeline health
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={customer} onValueChange={setCustomer}>
              <SelectTrigger className="w-[180px] h-9 bg-secondary/50 border-none">
                <SelectValue placeholder="All Customers" />
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
              <SelectTrigger className="w-[140px] h-9 bg-secondary/50 border-none">
                <SelectValue placeholder="All Roles" />
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
              <SelectTrigger className="w-[120px] h-9 bg-secondary/50 border-none">
                <SelectValue placeholder="All Tiers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="1">Tier 1</SelectItem>
                <SelectItem value="2">Tier 2</SelectItem>
                <SelectItem value="3">Tier 3</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px] h-9 bg-secondary/50 border-none">
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
                {filteredTemplates.map((template, idx) => (
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
                <p className="text-3xl font-bold mt-3 text-success">{filteredKPIs.pipelineSLAStatus.green}</p>
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
                <p className="text-3xl font-bold mt-3 text-amber-500">{filteredKPIs.pipelineSLAStatus.amber}</p>
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
                <p className="text-3xl font-bold mt-3 text-destructive">{filteredKPIs.pipelineSLAStatus.red}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Pipelines exceeding SLA thresholds
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </OpsLayout>
  );
}
