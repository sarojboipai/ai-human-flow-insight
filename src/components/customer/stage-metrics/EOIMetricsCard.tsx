import { Card, CardContent } from "@/components/ui/card";
import { Heart, UserCheck, FileCheck, Gauge, ShieldAlert, Copy, Bot, UserCog } from "lucide-react";
import type { EOIMetrics } from "./types";

interface EOIMetricsCardProps {
  metrics: EOIMetrics;
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

export function EOIMetricsCard({ metrics }: EOIMetricsCardProps) {
  return (
    <div className="space-y-4">
      {/* Intent Metrics */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            💜 Intent Metrics
          </h4>
          <div className="divide-y divide-border/50">
            <MetricRow icon={Heart} label="EOI Click Rate" value={metrics.eoiClickRate} suffix="%" variant="success" />
            <MetricRow icon={UserCheck} label="Lead Capture Rate" value={metrics.leadCaptureRate} suffix="%" variant="success" />
            <MetricRow icon={FileCheck} label="Consent Completion" value={metrics.consentCompletionRate} suffix="%" variant="info" />
          </div>
        </CardContent>
      </Card>

      {/* Lead Quality */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            📊 Lead Quality
          </h4>
          <div className="divide-y divide-border/50">
            <MetricRow icon={Gauge} label="Intent Score" value={metrics.intentScore} suffix="%" variant="success" />
            <MetricRow icon={ShieldAlert} label="Fraud/Bot Detection" value={metrics.fraudDetectionRate} suffix="%" variant="destructive" />
            <MetricRow icon={Copy} label="Duplicate Lead Rate" value={metrics.duplicateLeadRate} suffix="%" variant="warning" />
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
            <MetricRow icon={Bot} label="AI Auto-Qualified" value={metrics.aiAutoQualified} suffix="%" variant="info" />
            <MetricRow icon={UserCog} label="HITL Reviewed" value={metrics.hitlReviewedLeads} suffix="%" variant="warning" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
