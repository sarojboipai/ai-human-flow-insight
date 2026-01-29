import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { aiPerformanceMetrics } from "@/lib/mockData";
import { Bot, Target, AlertTriangle, Zap, TrendingUp, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const performanceTrend = [
  { week: "W1", precision: 85.2, recall: 80.5, confidence: 0.75 },
  { week: "W2", precision: 86.1, recall: 81.2, confidence: 0.76 },
  { week: "W3", precision: 86.8, recall: 81.8, confidence: 0.77 },
  { week: "W4", precision: 87.4, recall: 82.1, confidence: 0.78 },
];

const radarData = [
  { metric: "Precision", value: 87, fullMark: 100 },
  { metric: "Recall", value: 82, fullMark: 100 },
  { metric: "Interview Pred", value: 77, fullMark: 100 },
  { metric: "SLA Adherence", value: 94, fullMark: 100 },
  { metric: "Bias Score", value: 97, fullMark: 100 },
];

export default function AIPerformance() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="dashboard-title">AI Performance</h1>
          <p className="text-muted-foreground mt-1">
            Evaluate AI agent accuracy, bias metrics, and SLA adherence
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Match Precision"
            value={`${aiPerformanceMetrics.matchPrecision}%`}
            change={2.1}
            changeLabel="vs last month"
            icon={<Target className="h-5 w-5" />}
            variant="success"
          />
          <MetricCard
            title="Match Recall"
            value={`${aiPerformanceMetrics.matchRecall}%`}
            change={1.8}
            changeLabel="vs last month"
            icon={<Bot className="h-5 w-5" />}
            variant="primary"
          />
          <MetricCard
            title="Avg Confidence"
            value={aiPerformanceMetrics.avgConfidence.toFixed(2)}
            change={3}
            changeLabel="vs last month"
            icon={<TrendingUp className="h-5 w-5" />}
            variant="info"
          />
          <MetricCard
            title="Override Rate"
            value={`${aiPerformanceMetrics.overrideRate}%`}
            change={-0.5}
            changeLabel="vs last month"
            icon={<AlertTriangle className="h-5 w-5" />}
            variant="warning"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Performance Trend */}
          <div className="chart-container">
            <h3 className="section-title mb-4">Weekly Performance Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={[75, 95]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="precision"
                  name="Precision"
                  stroke="hsl(173, 58%, 45%)"
                  strokeWidth={2}
                  dot={{ fill: "hsl(173, 58%, 45%)" }}
                />
                <Line
                  type="monotone"
                  dataKey="recall"
                  name="Recall"
                  stroke="hsl(199, 89%, 48%)"
                  strokeWidth={2}
                  dot={{ fill: "hsl(199, 89%, 48%)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Chart */}
          <div className="chart-container">
            <h3 className="section-title mb-4">AI Health Score</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="metric"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="hsl(173, 58%, 45%)"
                  fill="hsl(173, 58%, 45%)"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Core Metrics */}
          <div className="chart-container">
            <h3 className="section-title mb-4">Core AI Metrics</h3>
            <div className="space-y-5">
              {[
                { label: "Match Precision", value: aiPerformanceMetrics.matchPrecision, target: 90 },
                { label: "Match Recall", value: aiPerformanceMetrics.matchRecall, target: 85 },
                { label: "Interview Prediction", value: aiPerformanceMetrics.interviewPrediction, target: 80 },
                { label: "SLA Adherence", value: aiPerformanceMetrics.slaAdherence, target: 95 },
              ].map((metric) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{metric.value}%</span>
                      <span className="text-xs text-muted-foreground">
                        / {metric.target}% target
                      </span>
                    </div>
                  </div>
                  <div className="relative h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="absolute h-full bg-primary rounded-full"
                      style={{ width: `${metric.value}%` }}
                    />
                    <div
                      className="absolute h-full w-0.5 bg-foreground/50"
                      style={{ left: `${metric.target}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bias & Fairness */}
          <div className="chart-container">
            <h3 className="section-title mb-4">Bias & Fairness Metrics</h3>
            <div className="space-y-4">
              <div className="rounded-lg bg-success/10 border border-success/30 p-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-success" />
                  <span className="font-medium text-success">Low Bias Detected</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Bias score: {aiPerformanceMetrics.biasScore} (threshold: 0.05)
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { dimension: "Role Type", score: 0.02, status: "pass" },
                  { dimension: "Geography", score: 0.03, status: "pass" },
                  { dimension: "Experience Level", score: 0.04, status: "pass" },
                  { dimension: "Age Proxy", score: 0.01, status: "pass" },
                ].map((item) => (
                  <div
                    key={item.dimension}
                    className="flex items-center justify-between rounded-lg bg-secondary/50 p-3"
                  >
                    <span className="text-sm">{item.dimension}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{item.score}</span>
                      <div
                        className={`h-2 w-2 rounded-full ${
                          item.status === "pass" ? "bg-success" : "bg-destructive"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Failure Detection */}
        <div className="chart-container">
          <h3 className="section-title mb-4">AI Failure Detection</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                metric: "Low Acceptance Rate",
                value: "12.4%",
                threshold: "< 15%",
                status: "normal",
                description: "Matches accepted by recruiters",
              },
              {
                metric: "Override Rate",
                value: "8.2%",
                threshold: "< 10%",
                status: "normal",
                description: "AI decisions overridden",
              },
              {
                metric: "Confidence Drift",
                value: "+0.02",
                threshold: "± 0.05",
                status: "normal",
                description: "Change in avg confidence",
              },
              {
                metric: "Escalation Rate",
                value: "5.4%",
                threshold: "< 8%",
                status: "normal",
                description: "Cases escalated to HITL",
              },
            ].map((item) => (
              <div
                key={item.metric}
                className={`rounded-lg border p-4 ${
                  item.status === "normal"
                    ? "border-success/30 bg-success/5"
                    : "border-warning/30 bg-warning/5"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm font-medium">{item.metric}</span>
                  <div
                    className={`h-2 w-2 rounded-full ${
                      item.status === "normal" ? "bg-success" : "bg-warning"
                    }`}
                  />
                </div>
                <p className="text-2xl font-semibold mt-2">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Threshold: {item.threshold}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
