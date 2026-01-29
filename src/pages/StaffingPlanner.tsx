import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Users, Target, Clock, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
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

const historicalData = [
  { month: "Aug", volume: 9800, recruiters: 28, placements: 720 },
  { month: "Sep", volume: 10500, recruiters: 29, placements: 785 },
  { month: "Oct", volume: 11200, recruiters: 30, placements: 840 },
  { month: "Nov", volume: 12000, recruiters: 31, placements: 890 },
  { month: "Dec", volume: 11500, recruiters: 31, placements: 865 },
  { month: "Jan", volume: 12500, recruiters: 32, placements: 926 },
];

export default function StaffingPlanner() {
  const [volume, setVolume] = useState(15000);
  const [automationRate, setAutomationRate] = useState(68);
  const [productivityIndex, setProductivityIndex] = useState(25);

  // Calculate staffing needs
  const manualVolume = volume * (1 - automationRate / 100);
  const requiredRecruiters = Math.ceil(manualVolume / (productivityIndex * 20)); // 20 working days
  const currentRecruiters = 32;
  const gap = requiredRecruiters - currentRecruiters;
  const estimatedPlacements = Math.round(volume * 0.074); // 7.4% conversion

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="dashboard-title">Staffing Planner</h1>
          <p className="text-muted-foreground mt-1">
            Simulate staffing requirements based on volume and automation
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Current Recruiters"
            value="32"
            icon={<Users className="h-5 w-5" />}
            variant="primary"
          />
          <MetricCard
            title="Required Recruiters"
            value={requiredRecruiters.toString()}
            change={gap > 0 ? gap : undefined}
            changeLabel={gap > 0 ? "gap" : undefined}
            icon={<Target className="h-5 w-5" />}
            variant={gap > 0 ? "warning" : "success"}
          />
          <MetricCard
            title="Capacity Utilization"
            value={`${Math.min(100, Math.round((requiredRecruiters / currentRecruiters) * 100))}%`}
            icon={<Calculator className="h-5 w-5" />}
            variant="info"
          />
          <MetricCard
            title="Est. Placements"
            value={estimatedPlacements.toLocaleString()}
            icon={<Clock className="h-5 w-5" />}
            variant="success"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Simulator */}
          <div className="chart-container lg:col-span-1">
            <h3 className="section-title mb-6">Staffing Simulator</h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm">
                  Monthly Candidate Volume: {volume.toLocaleString()}
                </Label>
                <Slider
                  value={[volume]}
                  onValueChange={(value) => setVolume(value[0])}
                  min={5000}
                  max={30000}
                  step={500}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5,000</span>
                  <span>30,000</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm">
                  AI Automation Rate: {automationRate}%
                </Label>
                <Slider
                  value={[automationRate]}
                  onValueChange={(value) => setAutomationRate(value[0])}
                  min={30}
                  max={90}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>30%</span>
                  <span>90%</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm">
                  Recruiter Productivity (profiles/day): {productivityIndex}
                </Label>
                <Slider
                  value={[productivityIndex]}
                  onValueChange={(value) => setProductivityIndex(value[0])}
                  min={15}
                  max={40}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>15</span>
                  <span>40</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Manual Volume</span>
                  <span className="font-mono">{manualVolume.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Monthly Capacity Needed</span>
                  <span className="font-mono">
                    {(productivityIndex * 20 * requiredRecruiters).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Recruiters Needed</span>
                  <span className="font-mono font-medium">{requiredRecruiters}</span>
                </div>
                {gap > 0 && (
                  <div className="rounded-lg bg-warning/10 border border-warning/30 p-3">
                    <p className="text-sm text-warning font-medium">
                      ⚠️ Need {gap} additional recruiters
                    </p>
                  </div>
                )}
                {gap <= 0 && (
                  <div className="rounded-lg bg-success/10 border border-success/30 p-3">
                    <p className="text-sm text-success font-medium">
                      ✓ Current staffing is sufficient
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Historical Chart */}
          <div className="chart-container lg:col-span-2">
            <h3 className="section-title mb-4">Historical Staffing & Volume</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis
                  yAxisId="left"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="volume"
                  name="Candidate Volume"
                  stroke="hsl(173, 58%, 45%)"
                  strokeWidth={2}
                  dot={{ fill: "hsl(173, 58%, 45%)" }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="recruiters"
                  name="Recruiters"
                  stroke="hsl(38, 92%, 50%)"
                  strokeWidth={2}
                  dot={{ fill: "hsl(38, 92%, 50%)" }}
                />
                <Line
                  yAxisId="right"
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
        </div>

        {/* SLA Forecast */}
        <div className="chart-container">
          <h3 className="section-title mb-4">SLA Breach Forecast</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                metric: "Response Time SLA",
                current: "4.2 hrs",
                target: "4 hrs",
                forecast: gap > 0 ? "At Risk" : "On Track",
                risk: gap > 0,
              },
              {
                metric: "Interview Setup SLA",
                current: "2.8 days",
                target: "3 days",
                forecast: "On Track",
                risk: false,
              },
              {
                metric: "Placement Time SLA",
                current: "19 days",
                target: "21 days",
                forecast: "On Track",
                risk: false,
              },
              {
                metric: "HITL Resolution SLA",
                current: "2.4 hrs",
                target: "4 hrs",
                forecast: "On Track",
                risk: false,
              },
            ].map((item) => (
              <div
                key={item.metric}
                className={`rounded-lg border p-4 ${
                  item.risk
                    ? "border-warning/30 bg-warning/5"
                    : "border-success/30 bg-success/5"
                }`}
              >
                <p className="text-sm font-medium">{item.metric}</p>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current</span>
                    <span className="font-mono">{item.current}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Target</span>
                    <span className="font-mono">{item.target}</span>
                  </div>
                </div>
                <div
                  className={`mt-3 text-sm font-medium ${
                    item.risk ? "text-warning" : "text-success"
                  }`}
                >
                  {item.forecast}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
