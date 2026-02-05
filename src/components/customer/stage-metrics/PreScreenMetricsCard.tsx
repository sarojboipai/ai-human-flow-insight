import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, CheckCircle, XCircle, CheckCheck, AlertTriangle, FileSearch, Bot, UserCog, UserCheck } from "lucide-react";
import type { PreScreenMetrics } from "./types";

interface PreScreenMetricsCardProps {
  metrics: PreScreenMetrics;
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
  variant?: "default" | "success" | "warning" | "info" | "destructive";
}) {
  const iconColors = {
    default: "text-muted-foreground",
    success: "text-emerald-500",
    warning: "text-amber-500",
    info: "text-blue-500",
    destructive: "text-red-500",
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

export function PreScreenMetricsCard({ metrics }: PreScreenMetricsCardProps) {
  return (
    <div className="space-y-4">
      {/* Screening Metrics */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            🧪 Screening Metrics
          </h4>
          <div className="divide-y divide-border/50">
            <MetricRow icon={ClipboardList} label="Question Start Rate" value={metrics.questionStartRate} suffix="%" variant="info" />
            <MetricRow icon={CheckCircle} label="Completion Rate" value={metrics.completionRate} suffix="%" variant="success" />
            <MetricRow icon={XCircle} label="Knockout Rate" value={metrics.knockoutRate} suffix="%" variant="destructive" />
            <MetricRow icon={CheckCheck} label="Pass Rate" value={metrics.passRate} suffix="%" variant="success" />
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
            <MetricRow icon={AlertTriangle} label="False Rejection Rate" value={metrics.falseRejectionRate} suffix="%" variant="warning" />
            <MetricRow icon={FileSearch} label="Resume Parse Confidence" value={metrics.resumeParseConfidence} suffix="%" variant="success" />
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
            <MetricRow icon={Bot} label="AI Auto-Reject" value={metrics.aiAutoReject} suffix="%" variant="info" />
            <MetricRow icon={UserCog} label="HITL Override" value={metrics.hitlOverride} suffix="%" variant="warning" />
            <MetricRow icon={UserCheck} label="Manual Approval" value={metrics.manualApproval} suffix="%" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
