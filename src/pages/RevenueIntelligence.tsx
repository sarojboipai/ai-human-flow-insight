import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { revenueMetrics } from "@/lib/mockData";
import { DollarSign, TrendingUp, PieChart, Calculator } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

const monthlyRevenue = [
  { month: "Aug", revenue: 380000, cost: 210000 },
  { month: "Sep", revenue: 420000, cost: 225000 },
  { month: "Oct", revenue: 465000, cost: 240000 },
  { month: "Nov", revenue: 510000, cost: 255000 },
  { month: "Dec", revenue: 485000, cost: 248000 },
  { month: "Jan", revenue: 545000, cost: 280000 },
];

const costBreakdown = [
  { category: "Recruiter Salaries", amount: 890000, percentage: 65.6 },
  { category: "AI Infrastructure", amount: 125000, percentage: 9.2 },
  { category: "Marketing/Acquisition", amount: 340000, percentage: 25.1 },
];

const employerRevenue = [
  { employer: "Apollo Hospitals", revenue: 425000, placements: 85 },
  { employer: "Fortis Healthcare", revenue: 380000, placements: 72 },
  { employer: "Max Healthcare", revenue: 295000, placements: 58 },
  { employer: "Manipal Hospitals", revenue: 265000, placements: 52 },
  { employer: "Narayana Health", revenue: 210000, placements: 45 },
];

export default function RevenueIntelligence() {
  const totalCost = revenueMetrics.recruiterCost + revenueMetrics.aiInfraCost + revenueMetrics.acquisitionCost;
  const grossProfit = revenueMetrics.totalRevenue - totalCost;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="dashboard-title">Revenue & Cost Intelligence</h1>
          <p className="text-muted-foreground mt-1">
            Track unit economics, margins, and financial performance
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value={`₹${(revenueMetrics.totalRevenue / 1000000).toFixed(2)}M`}
            change={revenueMetrics.revenueChange}
            changeLabel="vs last quarter"
            icon={<DollarSign className="h-5 w-5" />}
            variant="success"
          />
          <MetricCard
            title="Gross Margin"
            value={`${revenueMetrics.grossMargin}%`}
            change={revenueMetrics.marginChange}
            changeLabel="vs last quarter"
            icon={<TrendingUp className="h-5 w-5" />}
            variant="primary"
          />
          <MetricCard
            title="Revenue/Placement"
            value={`₹${revenueMetrics.avgFeePerPlacement.toLocaleString()}`}
            change={5}
            changeLabel="vs last quarter"
            icon={<PieChart className="h-5 w-5" />}
            variant="info"
          />
          <MetricCard
            title="Cost/Placement"
            value={`₹${revenueMetrics.costPerPlacement.toLocaleString()}`}
            change={-8}
            changeLabel="vs target"
            icon={<Calculator className="h-5 w-5" />}
            variant="warning"
          />
        </div>

        {/* Revenue Trend */}
        <div className="chart-container">
          <h3 className="section-title mb-4">Revenue vs Cost Trend</h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(158, 64%, 52%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(158, 64%, 52%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`₹${value.toLocaleString()}`]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="hsl(158, 64%, 52%)"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="cost"
                name="Cost"
                stroke="hsl(0, 72%, 51%)"
                fillOpacity={1}
                fill="url(#colorCost)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Cost Breakdown */}
          <div className="chart-container">
            <h3 className="section-title mb-4">Cost Structure</h3>
            <div className="space-y-4">
              {costBreakdown.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.category}</span>
                    <span className="font-mono">₹{(item.amount / 1000).toFixed(0)}K ({item.percentage}%)</span>
                  </div>
                  <div className="h-3 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.category.includes("Recruiter")
                          ? "hsl(38, 92%, 50%)"
                          : item.category.includes("AI")
                          ? "hsl(173, 58%, 45%)"
                          : "hsl(199, 89%, 48%)",
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between text-sm font-medium">
                  <span>Total Operating Cost</span>
                  <span className="font-mono">₹{(totalCost / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between text-sm font-medium mt-2 text-success">
                  <span>Gross Profit</span>
                  <span className="font-mono">₹{(grossProfit / 1000).toFixed(0)}K</span>
                </div>
              </div>
            </div>
          </div>

          {/* Unit Economics */}
          <div className="chart-container">
            <h3 className="section-title mb-4">Unit Economics</h3>
            <div className="space-y-4">
              <div className="rounded-lg bg-success/10 border border-success/30 p-4">
                <p className="text-sm text-muted-foreground">Revenue per Placement</p>
                <p className="text-3xl font-semibold text-success mt-1">
                  ₹{revenueMetrics.avgFeePerPlacement.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-4">
                <p className="text-sm text-muted-foreground">Cost per Placement</p>
                <p className="text-3xl font-semibold text-destructive mt-1">
                  ₹{revenueMetrics.costPerPlacement.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg bg-primary/10 border border-primary/30 p-4">
                <p className="text-sm text-muted-foreground">Profit per Placement</p>
                <p className="text-3xl font-semibold text-primary mt-1">
                  ₹{(revenueMetrics.avgFeePerPlacement - revenueMetrics.costPerPlacement).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Employers */}
        <div className="chart-container">
          <h3 className="section-title mb-4">Top Employers by Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={employerRevenue} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                type="number"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
              />
              <YAxis
                type="category"
                dataKey="employer"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                width={130}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number, name: string, props: any) => [
                  `₹${value.toLocaleString()}`,
                  `${props.payload.placements} placements`,
                ]}
              />
              <Bar dataKey="revenue" fill="hsl(173, 58%, 45%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
