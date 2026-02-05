import { Card, CardContent } from "@/components/ui/card";
import { 
  Award, 
  Clock, 
  Users, 
  Bot, 
  UserCheck, 
  RefreshCw,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import type { SilverMedalistMetrics } from "./types";
import { cn } from "@/lib/utils";

interface SilverMedalistMetricsCardProps {
  metrics: SilverMedalistMetrics;
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

export function SilverMedalistMetricsCard({ metrics }: SilverMedalistMetricsCardProps) {
  return (
    <div className="space-y-4">
      {/* Progress Metrics */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Award className="h-4 w-4" />
            Progress Metrics
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <MetricRow label="Candidates Tagged" value={metrics.candidatesTagged} icon={Users} />
            <MetricRow label="Re-engagement Sent" value={metrics.reEngagementInvitesSent} icon={RefreshCw} />
            <MetricRow label="Re-applied to Jobs" value={metrics.reAppliedToNewJobs} />
            <MetricRow label="Converted to Hire" value={metrics.conversionToHire} />
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
            <MetricRow label="AI Tagging Rate" value={`${metrics.aiTaggingRate}%`} />
            <MetricRow label="Human Override" value={`${metrics.humanOverrideRate}%`} />
            <MetricRow label="HITL Review Rate" value={`${metrics.hitlReviewRate}%`} />
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
            <MetricRow label="AI Classification" value={metrics.aiClassificationTime} />
            <MetricRow label="Recruiter Review" value={metrics.recruiterReviewTime} />
            <MetricRow label="Candidate Re-engage" value={metrics.candidateReEngagementResponseTime} />
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
              <span className="text-muted-foreground">Tagging (24h)</span>
              <span className={cn("font-semibold", getSLAColor(metrics.taggingWithinSLA))}>
                {metrics.taggingWithinSLA}%
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Re-engage (7d)</span>
              <span className={cn("font-semibold", getSLAColor(metrics.reEngagementWithinSLA))}>
                {metrics.reEngagementWithinSLA}%
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Follow-up (72h)</span>
              <span className={cn("font-semibold", getSLAColor(metrics.followUpWithinSLA))}>
                {metrics.followUpWithinSLA}%
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
            <MetricRow label="Silver-to-Hire" value={`${metrics.silverToHireConversionRate}%`} />
            <MetricRow label="Pool Reuse Rate" value={`${metrics.talentPoolReuseRate}%`} />
            <MetricRow label="Cost Saved" value={`$${metrics.costSavedVsFreshSourcing.toLocaleString()}`} icon={DollarSign} />
            <MetricRow label="Retention Score" value={metrics.candidateRetentionScore} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
