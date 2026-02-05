import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  Users, 
  Bot, 
  UserCheck, 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import type { InterviewSchedulingMetrics } from "./types";
import { cn } from "@/lib/utils";

interface InterviewSchedulingMetricsCardProps {
  metrics: InterviewSchedulingMetrics;
}

function getSLAColor(value: number): string {
  if (value >= 80) return "text-success";
  if (value >= 60) return "text-warning";
  return "text-destructive";
}

function MetricRow({ label, value, icon: Icon }: { label: string; value: string | number; icon?: React.ElementType }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2 text-muted-foreground">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
      </span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

export function InterviewSchedulingMetricsCard({ metrics }: InterviewSchedulingMetricsCardProps) {
  return (
    <div className="space-y-4">
      {/* Progress Metrics */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Progress Metrics
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <MetricRow label="Qualified" value={metrics.candidatesQualifiedForInterview} icon={Users} />
            <MetricRow label="Invites Sent" value={metrics.interviewInvitesSent} />
            <MetricRow label="Scheduled" value={metrics.interviewScheduled} icon={Calendar} />
            <MetricRow label="Completed" value={metrics.interviewCompleted} icon={CheckCircle} />
            <MetricRow label="No-show Rate" value={`${metrics.noShowRate}%`} icon={AlertTriangle} />
            <MetricRow label="Feedback Done" value={metrics.feedbackSubmitted} />
          </div>
        </CardContent>
      </Card>

      {/* AI vs Human Attribution */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Bot className="h-4 w-4" />
            AI vs Human Attribution
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <MetricRow label="AI Scheduling" value={`${metrics.aiSchedulingPercentage}%`} />
            <MetricRow label="Human Scheduling" value={`${metrics.humanSchedulingPercentage}%`} />
            <MetricRow label="HITL Approvals" value={`${metrics.hitlApprovalPercentage}%`} />
          </div>
        </CardContent>
      </Card>

      {/* Response Times */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Response Times
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <MetricRow label="AI Slot Suggestion" value={metrics.aiSlotSuggestionTime} />
            <MetricRow label="Recruiter Action" value={metrics.recruiterActionTime} />
            <MetricRow label="Candidate Confirm" value={metrics.candidateConfirmationTime} />
          </div>
        </CardContent>
      </Card>

      {/* SLA Compliance */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            SLA Compliance
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Schedule (24h)</span>
              <span className={cn("font-semibold", getSLAColor(metrics.scheduleWithinSLA))}>
                {metrics.scheduleWithinSLA}%
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Confirm (12h)</span>
              <span className={cn("font-semibold", getSLAColor(metrics.confirmationWithinSLA))}>
                {metrics.confirmationWithinSLA}%
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Feedback (48h)</span>
              <span className={cn("font-semibold", getSLAColor(metrics.feedbackWithinSLA))}>
                {metrics.feedbackWithinSLA}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Outcomes */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Outcomes
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <MetricRow label="Conversion Rate" value={`${metrics.interviewConversionRate}%`} />
            <MetricRow label="Time-to-Interview" value={metrics.timeToInterview} />
            <MetricRow label="Interview-to-Offer" value={`${metrics.interviewToOfferRatio}%`} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
