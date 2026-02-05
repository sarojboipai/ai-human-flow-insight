import { Card, CardContent } from "@/components/ui/card";
import { Phone, PhoneCall, Clock, CheckCircle, UserCheck, PhoneOff, Mic, MessageSquare, Target, Bot, UserCog, Users } from "lucide-react";
import type { VoiceScreeningMetrics } from "./types";

interface VoiceScreeningMetricsCardProps {
  metrics: VoiceScreeningMetrics;
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

export function VoiceScreeningMetricsCard({ metrics }: VoiceScreeningMetricsCardProps) {
  return (
    <div className="space-y-4">
      {/* Engagement Metrics */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            📞 Engagement Metrics
          </h4>
          <div className="divide-y divide-border/50">
            <MetricRow icon={Phone} label="Call Attempt Rate" value={metrics.callAttemptRate} suffix="%" variant="info" />
            <MetricRow icon={PhoneCall} label="Call Connect Rate" value={metrics.callConnectRate} suffix="%" variant="success" />
            <MetricRow icon={Clock} label="Avg Call Duration" value={metrics.avgCallDuration} variant="info" />
          </div>
        </CardContent>
      </Card>

      {/* Screening Outcome */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            📊 Screening Outcome
          </h4>
          <div className="divide-y divide-border/50">
            <MetricRow icon={CheckCircle} label="AI Pass Rate" value={metrics.aiPassRate} suffix="%" variant="success" />
            <MetricRow icon={UserCheck} label="Human Pass Rate" value={metrics.humanPassRate} suffix="%" variant="success" />
            <MetricRow icon={PhoneOff} label="Drop-off During Call" value={metrics.dropOffDuringCall} suffix="%" variant="destructive" />
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
            <MetricRow icon={Mic} label="Speech Recognition" value={metrics.speechRecognitionConfidence} suffix="%" variant="success" />
            <MetricRow icon={MessageSquare} label="Response Confidence" value={metrics.responseConfidenceScore} suffix="%" variant="success" />
            <MetricRow icon={Target} label="Hiring Manager Fit" value={metrics.hiringManagerFitScore} suffix="%" variant="success" />
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
            <MetricRow icon={Bot} label="AI Fully Screened" value={metrics.aiFullyScreened} suffix="%" variant="info" />
            <MetricRow icon={UserCog} label="HITL Review" value={metrics.hitlReview} suffix="%" variant="warning" />
            <MetricRow icon={Users} label="Human Interview" value={metrics.humanInterview} suffix="%" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
