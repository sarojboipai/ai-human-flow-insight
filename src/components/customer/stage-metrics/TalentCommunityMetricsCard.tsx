import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Clock, 
  Bot, 
  UserCheck, 
  Heart,
  TrendingUp,
  Zap,
  MessageSquare,
} from "lucide-react";
import type { TalentCommunityMetrics } from "./types";
import { cn } from "@/lib/utils";

interface TalentCommunityMetricsCardProps {
  metrics: TalentCommunityMetrics;
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

export function TalentCommunityMetricsCard({ metrics }: TalentCommunityMetricsCardProps) {
  return (
    <div className="space-y-4">
      {/* Progress Metrics */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Users className="h-4 w-4" />
            Progress Metrics
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <MetricRow label="Added to Community" value={metrics.candidatesAddedToCommunity} />
            <MetricRow label="Active Members" value={metrics.activeCommunityMembers.toLocaleString()} icon={Users} />
            <MetricRow label="Content Engagement" value={`${metrics.contentEngagementRate}%`} icon={Heart} />
            <MetricRow label="Activated" value={metrics.candidatesActivatedIntoPipeline} icon={Zap} />
            <MetricRow label="Community-to-Hire" value={`${metrics.communityToHireConversion}%`} />
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
            <MetricRow label="AI Community Tagging" value={`${metrics.aiCommunityTagging}%`} />
            <MetricRow label="Human Curation" value={`${metrics.humanCommunityModeration}%`} />
            <MetricRow label="HITL Moderation" value={`${metrics.hitlModeration}%`} />
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
            <MetricRow label="AI Engagement Trigger" value={metrics.aiEngagementTriggerTime} />
            <MetricRow label="Recruiter Action" value={metrics.recruiterCommunityActionTime} />
            <MetricRow label="Candidate Response" value={metrics.candidateResponseTime} icon={MessageSquare} />
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
              <span className="text-muted-foreground">Outreach Frequency</span>
              <span className="font-semibold">{metrics.outreachFrequencySLA}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Activation (48h)</span>
              <span className={cn("font-semibold", getSLAColor(metrics.activationWithinSLA))}>
                {metrics.activationWithinSLA}%
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Content Refresh</span>
              <span className={cn("font-semibold", getSLAColor(metrics.contentRefreshWithinSLA))}>
                {metrics.contentRefreshWithinSLA}%
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
            <MetricRow label="Activation Rate" value={`${metrics.communityActivationRate}%`} />
            <MetricRow label="Passive-to-Active" value={`${metrics.passiveToActiveRate}%`} />
            <MetricRow label="Long-term Hire" value={`${metrics.longTermHireRate}%`} />
            <MetricRow label="Brand Engagement" value={metrics.employerBrandEngagementIndex} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
