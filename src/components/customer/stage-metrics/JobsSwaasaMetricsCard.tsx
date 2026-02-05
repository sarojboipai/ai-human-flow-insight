import { Card, CardContent } from "@/components/ui/card";
import { Eye, MousePointer, Bookmark, Share2, Target, FileCheck, Bot, UserCog, AlertTriangle } from "lucide-react";
import type { JobsSwaasaMetrics } from "./types";

interface JobsSwaasaMetricsCardProps {
  metrics: JobsSwaasaMetrics;
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

export function JobsSwaasaMetricsCard({ metrics }: JobsSwaasaMetricsCardProps) {
  return (
    <div className="space-y-4">
      {/* Reach & Awareness */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            📊 Reach & Awareness
          </h4>
          <div className="divide-y divide-border/50">
            <MetricRow icon={Eye} label="Job Impressions" value={metrics.jobImpressions} variant="info" />
            <MetricRow icon={Eye} label="Unique Views" value={metrics.uniqueCandidateViews} variant="info" />
            <MetricRow icon={MousePointer} label="Job CTR" value={metrics.jobCTR} suffix="%" variant="success" />
            <MetricRow icon={Bookmark} label="Save Rate" value={metrics.saveRate} suffix="%" />
            <MetricRow icon={Share2} label="Share Rate" value={metrics.shareRate} suffix="%" />
          </div>
        </CardContent>
      </Card>

      {/* Quality Metrics */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            📈 Quality Metrics
          </h4>
          <div className="divide-y divide-border/50">
            <MetricRow icon={Target} label="Match Score Avg" value={metrics.matchScoreAvg} suffix="%" variant="success" />
            <MetricRow icon={FileCheck} label="Content Quality" value={metrics.contentQualityScore} suffix="%" variant="success" />
          </div>
        </CardContent>
      </Card>

      {/* AI vs Human */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            🤖 AI vs Human
          </h4>
          <div className="divide-y divide-border/50">
            <MetricRow icon={Bot} label="AI-ranked Impressions" value={metrics.aiRankedImpressions} suffix="%" variant="info" />
            <MetricRow icon={UserCog} label="Manual Boosted" value={metrics.manualBoosted} suffix="%" />
            <MetricRow icon={AlertTriangle} label="HITL Override Rate" value={metrics.hitlOverrideRate} suffix="%" variant="warning" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
