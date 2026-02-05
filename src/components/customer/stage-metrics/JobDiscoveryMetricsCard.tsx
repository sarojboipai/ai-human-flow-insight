import { Card, CardContent } from "@/components/ui/card";
import { Search, MousePointer, Filter, Lightbulb, Target, BarChart3, Snowflake, Clock, TrendingDown } from "lucide-react";
import type { JobDiscoveryMetrics } from "./types";

interface JobDiscoveryMetricsCardProps {
  metrics: JobDiscoveryMetrics;
}

function MetricRow({ 
  icon: Icon, 
  label, 
  value, 
  suffix = "",
  variant = "default" 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: number | string; 
  suffix?: string;
  variant?: "default" | "success" | "warning" | "info";
}) {
  const iconColors = {
    default: "text-muted-foreground",
    success: "text-emerald-500",
    warning: "text-amber-500",
    info: "text-blue-500",
  };
  
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className={`h-4 w-4 ${iconColors[variant]}`} />
        {label}
      </span>
      <span className="font-semibold text-sm">
        {typeof value === "number" ? value.toLocaleString() : value}{suffix}
      </span>
    </div>
  );
}

export function JobDiscoveryMetricsCard({ metrics }: JobDiscoveryMetricsCardProps) {
  return (
    <div className="space-y-4">
      {/* Search & Discovery */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            🔍 Search & Discovery
          </h4>
          <div className="divide-y divide-border/50">
            <MetricRow icon={Search} label="Search Sessions" value={metrics.searchSessions} variant="info" />
            <MetricRow icon={MousePointer} label="Search Result CTR" value={metrics.searchResultCTR} suffix="%" variant="success" />
            <MetricRow icon={Filter} label="Filter Usage Rate" value={metrics.filterUsageRate} suffix="%" />
            <MetricRow icon={Lightbulb} label="Recommendation Clicks" value={metrics.recommendationClickRate} suffix="%" variant="success" />
          </div>
        </CardContent>
      </Card>

      {/* Matching Metrics */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            🎯 Matching Metrics
          </h4>
          <div className="divide-y divide-border/50">
            <MetricRow icon={Target} label="AI Match Confidence" value={metrics.aiMatchConfidence} suffix="%" variant="success" />
            <MetricRow icon={BarChart3} label="Top-10 Relevance" value={metrics.top10RelevanceScore} suffix="%" variant="success" />
            <MetricRow icon={Snowflake} label="Cold Start Rate" value={metrics.coldStartRate} suffix="%" variant="warning" />
          </div>
        </CardContent>
      </Card>

      {/* Operational Metrics */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            ⚙️ Operational
          </h4>
          <div className="divide-y divide-border/50">
            <MetricRow icon={Clock} label="Search Latency" value={metrics.searchLatency} variant="info" />
            <MetricRow icon={TrendingDown} label="Ranking Drift" value={metrics.rankingConfidenceDrift} suffix="%" variant="warning" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
