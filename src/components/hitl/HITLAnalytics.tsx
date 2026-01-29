import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import {
  hitlVolumeData,
  rulePerformanceData,
  resolutionOutcomes,
  hitlTasks,
} from "@/lib/mockData";

export function HITLAnalytics() {
  const pendingTasks = hitlTasks.filter(
    (t) => t.status === "pending" || t.status === "assigned"
  ).length;
  const resolvedToday = hitlTasks.filter(
    (t) => t.status === "approved" || t.status === "rejected"
  ).length;
  const avgResolutionTime = 2.4; // hours
  const overrideRate = 15.2;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold">{pendingTasks}</p>
              </div>
              <div className="p-2 rounded-lg bg-warning/20">
                <Clock className="h-5 w-5 text-warning" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-warning">-12%</span> vs yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
                <p className="text-2xl font-bold">{resolvedToday}</p>
              </div>
              <div className="p-2 rounded-lg bg-success/20">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-success">+25%</span> vs yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Avg Resolution Time
                </p>
                <p className="text-2xl font-bold">{avgResolutionTime} hrs</p>
              </div>
              <div className="p-2 rounded-lg bg-info/20">
                <TrendingDown className="h-5 w-5 text-info" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-success">-15%</span> vs last week
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Override Rate</p>
                <p className="text-2xl font-bold">{overrideRate}%</p>
              </div>
              <div className="p-2 rounded-lg bg-primary/20">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              AI decisions overridden by humans
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Volume Chart */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base">HITL Volume Over Time</CardTitle>
          <CardDescription>
            Tasks created, resolved, and pending by day
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hitlVolumeData}>
                <defs>
                  <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--info))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--info))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--success))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--success))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="created"
                  name="Created"
                  stroke="hsl(var(--info))"
                  fill="url(#colorCreated)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  name="Resolved"
                  stroke="hsl(var(--success))"
                  fill="url(#colorResolved)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Rule Performance Table */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base">Rule Performance</CardTitle>
            <CardDescription>
              Trigger counts and effectiveness by rule
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-medium">
                    Rule
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium text-right">
                    Triggers
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium text-right">
                    Override %
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium text-right">
                    False +
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium text-right">
                    Avg Time
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rulePerformanceData.map((rule) => (
                  <TableRow key={rule.rule} className="border-border">
                    <TableCell className="text-sm font-medium">
                      {rule.rule}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {rule.triggers}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={
                          rule.overrideRate > 20
                            ? "text-warning"
                            : "text-success"
                        }
                      >
                        {rule.overrideRate}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={
                          rule.falsePositive > 15
                            ? "text-destructive"
                            : "text-muted-foreground"
                        }
                      >
                        {rule.falsePositive}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {rule.avgResolutionTime}h
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Resolution Outcomes */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base">Resolution Outcomes</CardTitle>
            <CardDescription>
              Distribution of task resolutions this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={resolutionOutcomes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {resolutionOutcomes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {resolutionOutcomes.map((outcome) => (
                <div key={outcome.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: outcome.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {outcome.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SLA Insights */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base">SLA Performance</CardTitle>
          <CardDescription>
            Resolution time distribution and SLA adherence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-3xl font-bold text-success">92%</p>
              <p className="text-sm text-muted-foreground mt-1">
                Tasks resolved within SLA
              </p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-3xl font-bold">1.8 hrs</p>
              <p className="text-sm text-muted-foreground mt-1">
                Median resolution time
              </p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-3xl font-bold text-warning">4</p>
              <p className="text-sm text-muted-foreground mt-1">
                Tasks currently overdue
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
