import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RecruiterTable } from "@/components/dashboard/RecruiterTable";
import { recruiters } from "@/lib/mockData";
import { Users, Target, DollarSign, TrendingUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const productivityTrend = [
  { week: "W1", screened: 580, interviews: 168, placements: 42 },
  { week: "W2", screened: 620, interviews: 185, placements: 48 },
  { week: "W3", screened: 595, interviews: 178, placements: 45 },
  { week: "W4", screened: 670, interviews: 201, placements: 54 },
];

const teamPerformance = [
  { team: "Nursing", screened: 420, interviews: 125, placements: 35, revenue: 140000 },
  { team: "Doctors", screened: 285, interviews: 95, placements: 22, revenue: 176000 },
  { team: "Paramedic", screened: 340, interviews: 98, placements: 28, revenue: 84000 },
  { team: "Allied Health", screened: 225, interviews: 68, placements: 18, revenue: 54000 },
];

export default function RecruiterDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="dashboard-title">Recruiter Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Track recruiter productivity and performance metrics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="nursing">Nursing</SelectItem>
                <SelectItem value="doctors">Doctors</SelectItem>
                <SelectItem value="paramedic">Paramedic</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="month">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Recruiters"
            value="32"
            change={2}
            changeLabel="new this month"
            icon={<Users className="h-5 w-5" />}
            variant="primary"
          />
          <MetricCard
            title="Avg Placements/Recruiter"
            value="3.2"
            change={8}
            changeLabel="vs last month"
            icon={<Target className="h-5 w-5" />}
            variant="success"
          />
          <MetricCard
            title="Revenue/Recruiter"
            value="$14.2K"
            change={12}
            changeLabel="vs last month"
            icon={<DollarSign className="h-5 w-5" />}
            variant="warning"
          />
          <MetricCard
            title="Productivity Index"
            value="87"
            change={5}
            changeLabel="vs last month"
            icon={<TrendingUp className="h-5 w-5" />}
            variant="info"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Productivity Trend */}
          <div className="chart-container">
            <h3 className="section-title mb-4">Weekly Productivity Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productivityTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="week"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="screened"
                  name="Screened"
                  stroke="hsl(173, 58%, 45%)"
                  strokeWidth={2}
                  dot={{ fill: "hsl(173, 58%, 45%)" }}
                />
                <Line
                  type="monotone"
                  dataKey="interviews"
                  name="Interviews"
                  stroke="hsl(38, 92%, 50%)"
                  strokeWidth={2}
                  dot={{ fill: "hsl(38, 92%, 50%)" }}
                />
                <Line
                  type="monotone"
                  dataKey="placements"
                  name="Placements"
                  stroke="hsl(199, 89%, 48%)"
                  strokeWidth={2}
                  dot={{ fill: "hsl(199, 89%, 48%)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Team Performance */}
          <div className="chart-container">
            <h3 className="section-title mb-4">Team Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="team"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="placements" name="Placements" fill="hsl(173, 58%, 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recruiter Table */}
        <RecruiterTable recruiters={recruiters} title="Individual Performance" />

        {/* Benchmarks */}
        <div className="chart-container">
          <h3 className="section-title mb-4">Performance Benchmarks</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { metric: "Profiles Screened/Day", benchmark: 25, top: 45, avg: 22 },
              { metric: "Interviews/Week", benchmark: 8, top: 15, avg: 7 },
              { metric: "Placements/Month", benchmark: 3, top: 6, avg: 2.8 },
              { metric: "Response Time (hrs)", benchmark: 4, top: 1.5, avg: 5.2 },
            ].map((item) => (
              <div key={item.metric} className="rounded-lg border border-border p-4">
                <p className="text-sm font-medium">{item.metric}</p>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Benchmark</span>
                    <span className="font-mono">{item.benchmark}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Top Performer</span>
                    <span className="font-mono text-success">{item.top}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Team Average</span>
                    <span className="font-mono">{item.avg}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
