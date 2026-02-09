import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  AlertCircle,
  Info,
  Target,
  IndianRupee,
  Briefcase,
  Users,
  Gauge,
  CalendarDays,
  ArrowRight,
  Package,
} from "lucide-react";
import {
  aopTargets,
  aopMonthlyTrends,
  aopSegmentPerformance,
  aopCategoryPerformance,
  aopTeamPerformance,
  aopPipelineHealth,
  aopRiskSignals,
  getAOPAttainment,
  getAOPVarianceColor,
  wbrWeeklyData,
  wbrBacklogBuckets,
  wbrRecruiterCapacity,
  wbrCausalMappings,
} from "@/lib/mockData";

type KPIMode = "revenue" | "jobs" | "placements" | "sla";

const varianceColorMap = {
  green: "text-success bg-success/10 border-success/30",
  amber: "text-warning bg-warning/10 border-warning/30",
  red: "text-destructive bg-destructive/10 border-destructive/30",
};

const varianceBadgeMap = {
  green: "bg-success/20 text-success border-success/30",
  amber: "bg-warning/20 text-warning border-warning/30",
  red: "bg-destructive/20 text-destructive border-destructive/30",
};

const varianceLabelMap = {
  green: "On Track",
  amber: "At Risk",
  red: "Off Track",
};

function AOPScorecard() {
  const revenueAtt = getAOPAttainment(aopTargets.revenue.actual, aopTargets.revenue.target);
  const jobsAtt = getAOPAttainment(aopTargets.jobs.actual, aopTargets.jobs.target);
  const placementsAtt = getAOPAttainment(aopTargets.placements.actual, aopTargets.placements.target);

  const cards = [
    {
      title: "Revenue Attainment",
      icon: <IndianRupee className="h-5 w-5" />,
      target: `₹${aopTargets.revenue.target}L`,
      actual: `₹${aopTargets.revenue.actual}L`,
      attainment: revenueAtt,
      forecast: `₹${aopTargets.revenue.forecast}L`,
      color: getAOPVarianceColor(revenueAtt),
    },
    {
      title: "Jobs Attainment",
      icon: <Briefcase className="h-5 w-5" />,
      target: aopTargets.jobs.target.toLocaleString(),
      actual: aopTargets.jobs.actual.toLocaleString(),
      attainment: jobsAtt,
      forecast: aopTargets.jobs.forecast.toLocaleString(),
      color: getAOPVarianceColor(jobsAtt),
    },
    {
      title: "Placement Attainment",
      icon: <Users className="h-5 w-5" />,
      target: aopTargets.placements.target.toLocaleString(),
      actual: aopTargets.placements.actual.toLocaleString(),
      attainment: placementsAtt,
      forecast: aopTargets.placements.forecast.toLocaleString(),
      color: getAOPVarianceColor(placementsAtt),
    },
    {
      title: "Ops Efficiency Index",
      icon: <Gauge className="h-5 w-5" />,
      target: `${aopTargets.margin.target}%`,
      actual: `${aopTargets.margin.actual}%`,
      attainment: getAOPAttainment(aopTargets.margin.actual, aopTargets.margin.target),
      forecast: `AI: ${aopTargets.aiCoverage.actual}%`,
      color: getAOPVarianceColor(getAOPAttainment(aopTargets.margin.actual, aopTargets.margin.target)),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className={`border ${varianceColorMap[card.color]}`}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                <p className="text-3xl font-semibold tracking-tight mt-1">{card.actual}</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${varianceBadgeMap[card.color]}`}>
                {card.icon}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Target</span>
                <span className="font-medium">{card.target}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Attainment</span>
                <Badge className={`${varianceBadgeMap[card.color]} border text-xs`}>
                  {card.attainment}%
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Forecast</span>
                <span className="font-medium">{card.forecast}</span>
              </div>
              <Badge className={`${varianceBadgeMap[card.color]} border text-xs w-fit`}>
                {varianceLabelMap[card.color]}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function AOPTrendChart({ mode }: { mode: KPIMode }) {
  const getDataKeys = () => {
    switch (mode) {
      case "revenue":
        return { target: "revenueTarget", actual: "revenueActual", forecast: "revenueForecast", label: "Revenue (₹L)" };
      case "jobs":
        return { target: "jobsTarget", actual: "jobsActual", forecast: "jobsForecast", label: "Jobs" };
      case "placements":
        return { target: "placementsTarget", actual: "placementsActual", forecast: "placementsForecast", label: "Placements" };
      default:
        return { target: "revenueTarget", actual: "revenueActual", forecast: "revenueForecast", label: "Revenue (₹L)" };
    }
  };

  const keys = getDataKeys();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">AOP Trend & Forecast — {keys.label}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={aopMonthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey={keys.target} stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" name="Target" dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey={keys.actual} stroke="hsl(var(--primary))" name="Actual" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(var(--primary))" }} />
            <Line type="monotone" dataKey={keys.forecast} stroke="hsl(var(--warning))" strokeDasharray="4 4" name="Forecast" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function RunRateChart({ mode }: { mode: KPIMode }) {
  const getRunRate = () => {
    switch (mode) {
      case "revenue":
        return { current: 890, required: 1000, unit: "₹L/mo", gap: -11 };
      case "jobs":
        return { current: 3800, required: 4167, unit: "jobs/mo", gap: -8.8 };
      case "placements":
        return { current: 720, required: 833, unit: "placements/mo", gap: -13.6 };
      default:
        return { current: 890, required: 1000, unit: "₹L/mo", gap: -11 };
    }
  };

  const rate = getRunRate();
  const gapColor = getAOPVarianceColor(100 + rate.gap);

  const data = [
    { name: "Current", value: rate.current },
    { name: "Required", value: rate.required },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Monthly Run-Rate</CardTitle>
          <Badge className={`${varianceBadgeMap[gapColor]} border`}>
            Gap: {rate.gap}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} layout="vertical" barGap={8}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
            <YAxis dataKey="name" type="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} width={80} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
              formatter={(value: number) => [`${value} ${rate.unit}`, ""]}
            />
            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-muted-foreground mt-2">
          Need <span className="font-semibold text-foreground">{rate.required} {rate.unit}</span> to hit AOP. Currently at <span className="font-semibold text-foreground">{rate.current} {rate.unit}</span>.
        </p>
      </CardContent>
    </Card>
  );
}

function PipelineHealthTable() {
  const maxVolume = Math.max(...aopPipelineHealth.map((s) => s.volume));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Pipeline Health vs AOP Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stage</TableHead>
              <TableHead className="text-right">Volume</TableHead>
              <TableHead className="text-right">Conversion</TableHead>
              <TableHead className="text-right">Drop-off</TableHead>
              <TableHead className="text-right">SLA Breaches</TableHead>
              <TableHead className="text-right">AOP Risk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {aopPipelineHealth.map((stage) => {
              const riskColor = stage.aopRiskScore >= 35 ? "destructive" : stage.aopRiskScore >= 20 ? "secondary" : "default";
              return (
                <TableRow key={stage.stage}>
                  <TableCell>
                    <div className="space-y-1">
                      <span className="font-medium">{stage.stage}</span>
                      <div className="w-full bg-secondary rounded-full h-1.5">
                        <div
                          className="bg-primary rounded-full h-1.5 transition-all"
                          style={{ width: `${(stage.volume / maxVolume) * 100}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{stage.volume.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <span className={stage.conversionRate >= 75 ? "text-success" : stage.conversionRate >= 60 ? "text-warning" : "text-destructive"}>
                      {stage.conversionRate}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={stage.dropOffRate <= 15 ? "text-success" : stage.dropOffRate <= 30 ? "text-warning" : "text-destructive"}>
                      {stage.dropOffRate}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {stage.slaBreaches > 0 ? (
                      <Badge variant={stage.slaBreaches > 100 ? "destructive" : "secondary"} className="text-xs">
                        {stage.slaBreaches}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={riskColor} className="text-xs">{stage.aopRiskScore}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function SegmentDrillDown() {
  return (
    <div className="space-y-4">
      {/* Client Segment Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance by Client Segment</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Segment</TableHead>
                <TableHead className="text-right">Revenue Target</TableHead>
                <TableHead className="text-right">Revenue Actual</TableHead>
                <TableHead className="text-right">Placements</TableHead>
                <TableHead className="text-right">Attainment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aopSegmentPerformance.map((seg) => {
                const color = getAOPVarianceColor(seg.attainment);
                return (
                  <TableRow key={seg.segment}>
                    <TableCell className="font-medium">{seg.segment}</TableCell>
                    <TableCell className="text-right">₹{seg.revenueTarget}L</TableCell>
                    <TableCell className="text-right">₹{seg.revenueActual}L</TableCell>
                    <TableCell className="text-right">{seg.placementsActual.toLocaleString()} / {seg.placementsTarget.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Badge className={`${varianceBadgeMap[color]} border text-xs`}>{seg.attainment}%</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Category Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance by Job Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Jobs Target</TableHead>
                <TableHead className="text-right">Jobs Actual</TableHead>
                <TableHead className="text-right">Fill Rate</TableHead>
                <TableHead className="text-right">Avg Time-to-Fill</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aopCategoryPerformance.map((cat) => {
                const att = getAOPAttainment(cat.jobsActual, cat.jobsTarget);
                const color = getAOPVarianceColor(att);
                return (
                  <TableRow key={cat.category}>
                    <TableCell className="font-medium">{cat.category}</TableCell>
                    <TableCell className="text-right">{cat.jobsTarget.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{cat.jobsActual.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Badge className={`${varianceBadgeMap[color]} border text-xs`}>{cat.fillRate}%</Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">{cat.avgTimeToFill}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Team Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Team / Recruiter Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team</TableHead>
                <TableHead>Lead</TableHead>
                <TableHead className="text-right">Target</TableHead>
                <TableHead className="text-right">Actual</TableHead>
                <TableHead className="text-right">SLA</TableHead>
                <TableHead className="text-right">Attainment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aopTeamPerformance.map((team) => {
                const color = getAOPVarianceColor(team.attainment);
                return (
                  <TableRow key={team.team}>
                    <TableCell className="font-medium">{team.team}</TableCell>
                    <TableCell className="text-muted-foreground">{team.lead}</TableCell>
                    <TableCell className="text-right">{team.placementsTarget.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{team.placementsActual.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <span className={team.slaAdherence >= 90 ? "text-success" : "text-warning"}>{team.slaAdherence}%</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className={`${varianceBadgeMap[color]} border text-xs`}>{team.attainment}%</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function RiskAlertsPanel() {
  const severityIcons = {
    critical: <AlertCircle className="h-4 w-4 text-destructive" />,
    warning: <AlertTriangle className="h-4 w-4 text-warning" />,
    info: <Info className="h-4 w-4 text-info" />,
  };

  const severityStyles = {
    critical: "border-destructive/30 bg-destructive/5",
    warning: "border-warning/30 bg-warning/5",
    info: "border-info/30 bg-info/5",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Risk & Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {aopRiskSignals.map((signal) => (
          <div key={signal.id} className={`flex items-start gap-3 p-3 rounded-lg border ${severityStyles[signal.severity]}`}>
            {severityIcons[signal.severity]}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{signal.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">{signal.metric}</Badge>
                <span className="text-xs text-muted-foreground">{signal.value}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

const wbrStatusStyles = {
  on_track: "bg-success/20 text-success border-success/30",
  at_risk: "bg-warning/20 text-warning border-warning/30",
  off_track: "bg-destructive/20 text-destructive border-destructive/30",
};

const wbrStatusLabels = {
  on_track: "On Track",
  at_risk: "At Risk",
  off_track: "Off Track",
};

function WBRAssistedHiringSection() {
  const latestWeek = wbrWeeklyData[wbrWeeklyData.length - 1];

  const wbrKpis = [
    { title: "Weekly Placements", value: latestWeek.placements.toString(), change: latestWeek.placements - latestWeek.prevPlacements, icon: <Users className="h-4 w-4" /> },
    { title: "Weekly Revenue", value: `₹${latestWeek.revenue}L`, change: latestWeek.revenue - wbrWeeklyData[wbrWeeklyData.length - 2].revenue, icon: <IndianRupee className="h-4 w-4" /> },
    { title: "Active Jobs", value: latestWeek.activeJobs.toLocaleString(), change: 0, icon: <Briefcase className="h-4 w-4" /> },
    { title: "Candidate Backlog", value: latestWeek.backlog.toLocaleString(), change: latestWeek.backlog - wbrWeeklyData[wbrWeeklyData.length - 2].backlog, icon: <Package className="h-4 w-4" />, invertColor: true },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          WBR — Swaasa Assisted Hiring Execution
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* WBR KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {wbrKpis.map((kpi) => (
            <div key={kpi.title} className="p-3 rounded-lg border bg-secondary/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                {kpi.icon}
                <span className="text-xs font-medium">{kpi.title}</span>
              </div>
              <p className="text-2xl font-semibold">{kpi.value}</p>
              {kpi.change !== 0 && (
                <div className={`flex items-center gap-1 text-xs mt-1 ${
                  (kpi.invertColor ? kpi.change < 0 : kpi.change > 0) ? "text-success" : "text-destructive"
                }`}>
                  {(kpi.invertColor ? kpi.change < 0 : kpi.change > 0) ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {kpi.change > 0 ? "+" : ""}{kpi.change} WoW
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Weekly Placements Trend */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Weekly Placements Trend (Last 8 Weeks)</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={wbrWeeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }} />
              <Bar dataKey="placements" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={32} name="Placements" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Backlog Aging + Recruiter Capacity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Backlog Aging */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Backlog Aging Buckets</h4>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={wbrBacklogBuckets} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <YAxis dataKey="bucket" type="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} width={80} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }} />
                <Legend />
                <Bar dataKey="screened" stackId="a" fill="hsl(var(--primary))" name="Screened" />
                <Bar dataKey="interviewed" stackId="a" fill="hsl(var(--warning))" name="Interviewed" />
                <Bar dataKey="offered" stackId="a" fill="hsl(var(--success))" name="Offered" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recruiter Capacity vs Demand */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Recruiter Capacity vs Demand</h4>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={wbrRecruiterCapacity} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <YAxis dataKey="team" type="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} width={120} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }} />
                <Legend />
                <Bar dataKey="available" fill="hsl(var(--primary))" name="Available" barSize={12} radius={[0, 4, 4, 0]} />
                <Bar dataKey="demand" fill="hsl(var(--destructive))" name="Demand" barSize={12} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function WBRtoAOPCausalMapping() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ArrowRight className="h-5 w-5 text-primary" />
          WBR → AOP Causal Mapping
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>WBR Metric</TableHead>
              <TableHead>AOP Impact</TableHead>
              <TableHead className="text-right">Current</TableHead>
              <TableHead className="text-right">Required</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead>Logic</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wbrCausalMappings.map((m) => (
              <TableRow key={m.wbrMetric}>
                <TableCell className="font-medium">{m.wbrMetric}</TableCell>
                <TableCell className="text-muted-foreground">{m.aopImpact}</TableCell>
                <TableCell className="text-right font-medium">{m.currentValue}</TableCell>
                <TableCell className="text-right text-muted-foreground">{m.requiredValue}</TableCell>
                <TableCell className="text-right">
                  <Badge className={`${wbrStatusStyles[m.status]} border text-xs`}>
                    {wbrStatusLabels[m.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground max-w-[200px]">{m.logic}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}


export default function WBRAOPCockpit() {
  const [kpiMode, setKpiMode] = useState<KPIMode>("revenue");
  const [timePeriod, setTimePeriod] = useState("year");
  const [geography, setGeography] = useState("all");
  const [clientTier, setClientTier] = useState("all");

  return (
    <DashboardLayout title="AOP x WBR Cockpit" subtitle={aopTargets.year}>
      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-[160px] h-9 bg-secondary/50 border-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="year">Full Year</SelectItem>
            <SelectItem value="q1">Q1 (Feb–Apr)</SelectItem>
            <SelectItem value="q2">Q2 (May–Jul)</SelectItem>
            <SelectItem value="q3">Q3 (Aug–Oct)</SelectItem>
            <SelectItem value="q4">Q4 (Nov–Jan)</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
          </SelectContent>
        </Select>

        <Select value={geography} onValueChange={setGeography}>
          <SelectTrigger className="w-[150px] h-9 bg-secondary/50 border-none">
            <SelectValue placeholder="Geography" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="south">South India</SelectItem>
            <SelectItem value="north">North India</SelectItem>
            <SelectItem value="west">West India</SelectItem>
            <SelectItem value="east">East India</SelectItem>
          </SelectContent>
        </Select>

        <Select value={clientTier} onValueChange={setClientTier}>
          <SelectTrigger className="w-[150px] h-9 bg-secondary/50 border-none">
            <SelectValue placeholder="Client Tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tiers</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
            <SelectItem value="mid-market">Mid-Market</SelectItem>
            <SelectItem value="smb">SMB</SelectItem>
          </SelectContent>
        </Select>

        <div className="ml-auto">
          <Tabs value={kpiMode} onValueChange={(v) => setKpiMode(v as KPIMode)}>
            <TabsList className="h-9">
              <TabsTrigger value="revenue" className="text-xs px-3">Revenue</TabsTrigger>
              <TabsTrigger value="jobs" className="text-xs px-3">Jobs</TabsTrigger>
              <TabsTrigger value="placements" className="text-xs px-3">Placements</TabsTrigger>
              <TabsTrigger value="sla" className="text-xs px-3">SLA</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* AOP Scorecard */}
      <section className="mb-6">
        <AOPScorecard />
      </section>

      {/* Trend + Run-Rate */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <AOPTrendChart mode={kpiMode} />
        </div>
        <RunRateChart mode={kpiMode} />
      </section>

      {/* WBR Assisted Hiring Section */}
      <section className="mb-6">
        <WBRAssistedHiringSection />
      </section>

      {/* WBR → AOP Causal Mapping */}
      <section className="mb-6">
        <WBRtoAOPCausalMapping />
      </section>

      {/* Pipeline Health */}
      <section className="mb-6">
        <PipelineHealthTable />
      </section>

      {/* Segment Drill-Down */}
      <section className="mb-6">
        <SegmentDrillDown />
      </section>

      {/* Risk & Alerts */}
      <section className="mb-6">
        <RiskAlertsPanel />
      </section>
    </DashboardLayout>
  );
}
