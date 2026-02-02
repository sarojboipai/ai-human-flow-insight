import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { DollarSign, TrendingUp, Clock, Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Aug", revenue: 380000, cost: 210000 },
  { month: "Sep", revenue: 420000, cost: 230000 },
  { month: "Oct", revenue: 480000, cost: 250000 },
  { month: "Nov", revenue: 510000, cost: 260000 },
  { month: "Dec", revenue: 490000, cost: 255000 },
  { month: "Jan", revenue: 550000, cost: 290000 },
];

const metrics = [
  {
    title: "Total Revenue",
    value: "₹2.45M",
    change: "+18%",
    changeLabel: "vs last quarter",
    positive: true,
    icon: DollarSign,
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    title: "Gross Margin",
    value: "44.7%",
    change: "+3.2%",
    changeLabel: "vs last quarter",
    positive: true,
    icon: TrendingUp,
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    title: "Revenue/Placement",
    value: "₹2,645",
    change: "+5%",
    changeLabel: "vs last quarter",
    positive: true,
    icon: Clock,
    bgColor: "bg-sky-50",
    iconColor: "text-sky-500",
  },
  {
    title: "Cost/Placement",
    value: "₹1,462",
    change: "-8%",
    changeLabel: "vs target",
    positive: false,
    icon: Calculator,
    bgColor: "bg-amber-50",
    iconColor: "text-amber-500",
  },
];

export default function CustomerBusiness() {
  const formatYAxis = (value: number) => {
    if (value === 0) return "₹0K";
    return `₹${value / 1000}K`;
  };

  return (
    <CustomerLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Revenue & Cost Intelligence</h1>
        <p className="text-muted-foreground">Track unit economics, margins, and financial performance</p>
      </div>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className={`h-3 w-3 ${metric.positive ? 'text-emerald-500' : 'text-red-500'}`} />
                    <span className={`text-sm ${metric.positive ? 'text-emerald-500' : 'text-red-500'}`}>
                      {metric.change}
                    </span>
                    <span className="text-sm text-muted-foreground">{metric.changeLabel}</span>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`h-5 w-5 ${metric.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue vs Cost Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Cost Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tickFormatter={formatYAxis}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value: number) => [`₹${(value / 1000).toFixed(0)}K`, '']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="cost"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCost)"
                  name="Cost"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </CustomerLayout>
  );
}
