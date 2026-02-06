import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  FileText, 
  RefreshCw, 
  Users, 
  Search, 
  Heart, 
  ClipboardList, 
  Phone,
  Calendar,
  Award,
  UserPlus,
  Clock,
  CheckCircle,
  XCircle,
  Timer,
  AlertTriangle,
} from "lucide-react";
import type { EnhancedStageMetrics } from "@/lib/mockData";
import {
  InStageProgressFunnel,
  JobsSwaasaMetricsCard,
  JobDiscoveryMetricsCard,
  EOIMetricsCard,
  PreScreenMetricsCard,
  VoiceScreeningMetricsCard,
  InterviewSchedulingMetricsCard,
  SilverMedalistMetricsCard,
  TalentCommunityMetricsCard,
} from "./stage-metrics";

const iconMap: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  fileText: FileText,
  refresh: RefreshCw,
  users: Users,
  search: Search,
  heart: Heart,
  clipboard: ClipboardList,
  phone: Phone,
  calendar: Calendar,
  award: Award,
  userPlus: UserPlus,
};

const handlerNames: Record<string, string> = {
  R: "Recruiter",
  C: "Candidate",
  H: "Hiring Team",
  AE: "Auto Engine",
  "X+": "X+ Intelligence",
};

const handlerColors: Record<string, string> = {
  R: "bg-orange-100 text-orange-600",
  C: "bg-purple-100 text-purple-600",
  H: "bg-emerald-100 text-emerald-600",
  AE: "bg-amber-100 text-amber-600",
  "X+": "bg-gradient-to-r from-orange-100 to-rose-100 text-orange-600",
};

interface StageDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stageName: string;
  stageIcon?: string;
  stageId?: string;
  metrics: EnhancedStageMetrics | null;
}

function SLAStatusBadge({ status }: { status: "green" | "amber" | "red" }) {
  const config = {
    green: { label: "On Track", variant: "default" as const, className: "bg-success text-success-foreground" },
    amber: { label: "At Risk", variant: "secondary" as const, className: "bg-warning text-warning-foreground" },
    red: { label: "SLA Breach", variant: "destructive" as const, className: "bg-destructive text-destructive-foreground" },
  };
  
  return (
    <Badge className={config[status].className}>
      {status === "amber" && <AlertTriangle className="h-3 w-3 mr-1" />}
      {config[status].label}
    </Badge>
  );
}

function AttributionBar({ 
  aiPercentage, 
  humanPercentage, 
  hitlPercentage 
}: { 
  aiPercentage: number; 
  humanPercentage: number; 
  hitlPercentage: number;
}) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">AI vs Human vs HITL Attribution</h4>
      <div className="flex h-3 rounded-full overflow-hidden bg-muted">
        <div 
          className="bg-orange-500 transition-all" 
          style={{ width: `${aiPercentage}%` }}
          title={`AI: ${aiPercentage}%`}
        />
        <div 
          className="bg-blue-500 transition-all" 
          style={{ width: `${humanPercentage}%` }}
          title={`Human: ${humanPercentage}%`}
        />
        <div 
          className="bg-teal-500 transition-all" 
          style={{ width: `${hitlPercentage}%` }}
          title={`HITL: ${hitlPercentage}%`}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded bg-orange-500" />
          AI {aiPercentage}%
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded bg-blue-500" />
          Human {humanPercentage}%
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded bg-teal-500" />
          HITL {hitlPercentage}%
        </span>
      </div>
    </div>
  );
}

// Render stage-specific metrics card based on stageId
function StageSpecificMetrics({ stageId, metrics }: { stageId?: string; metrics: EnhancedStageMetrics }) {
  if (!stageId) return null;

  switch (stageId) {
    case "jobs-ankura":
      if (metrics.jobsSwaasaMetrics) {
        return <JobsSwaasaMetricsCard metrics={metrics.jobsSwaasaMetrics} />;
      }
      break;
    case "job-discovery":
      if (metrics.jobDiscoveryMetrics) {
        return <JobDiscoveryMetricsCard metrics={metrics.jobDiscoveryMetrics} />;
      }
      break;
    case "expression":
      if (metrics.eoiMetrics) {
        return <EOIMetricsCard metrics={metrics.eoiMetrics} />;
      }
      break;
    case "prescreen":
      if (metrics.preScreenMetrics) {
        return <PreScreenMetricsCard metrics={metrics.preScreenMetrics} />;
      }
      break;
    case "voice-agent":
      if (metrics.voiceScreeningMetrics) {
        return <VoiceScreeningMetricsCard metrics={metrics.voiceScreeningMetrics} />;
      }
      break;
    case "scheduling":
      if (metrics.interviewSchedulingMetrics) {
        return <InterviewSchedulingMetricsCard metrics={metrics.interviewSchedulingMetrics} />;
      }
      break;
    case "silver-med":
      if (metrics.silverMedalistMetrics) {
        return <SilverMedalistMetricsCard metrics={metrics.silverMedalistMetrics} />;
      }
      break;
    case "talent-community":
      if (metrics.talentCommunityMetrics) {
        return <TalentCommunityMetricsCard metrics={metrics.talentCommunityMetrics} />;
      }
      break;
    default:
      return null;
  }
  return null;
}

export function StageDetailsSheet({ 
  open, 
  onOpenChange, 
  stageName, 
  stageIcon,
  stageId,
  metrics 
}: StageDetailsSheetProps) {
  const Icon = stageIcon ? iconMap[stageIcon] : Briefcase;
  
  if (!metrics) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              {stageName}
            </SheetTitle>
            <SheetDescription>Stage details</SheetDescription>
          </SheetHeader>
          <div className="mt-6 text-center text-muted-foreground">
            No detailed metrics available for this stage.
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  const sentPercent = 100;
  const appearedPercent = Math.round((metrics.appeared / metrics.sent) * 100);
  const qualifiedPercent = Math.round((metrics.qualified / metrics.appeared) * 100);
  const disqualifiedPercent = Math.round((metrics.disqualified / metrics.appeared) * 100);
  const pendingPercent = Math.round((metrics.pending / metrics.sent) * 100);

  // Check if we have stage-specific metrics
  const hasStageSpecificMetrics = stageId && (
    (stageId === "jobs-ankura" && metrics.jobsSwaasaMetrics) ||
    (stageId === "job-discovery" && metrics.jobDiscoveryMetrics) ||
    (stageId === "expression" && metrics.eoiMetrics) ||
    (stageId === "prescreen" && metrics.preScreenMetrics) ||
    (stageId === "voice-agent" && metrics.voiceScreeningMetrics) ||
    (stageId === "scheduling" && metrics.interviewSchedulingMetrics) ||
    (stageId === "silver-med" && metrics.silverMedalistMetrics) ||
    (stageId === "talent-community" && metrics.talentCommunityMetrics)
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-muted">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
              {stageName}
            </SheetTitle>
            {metrics.slaStatus && <SLAStatusBadge status={metrics.slaStatus} />}
          </div>
          <SheetDescription className="flex items-center gap-4 pt-2">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Avg: {metrics.avgTimeInStage}
            </span>
            <span className="text-muted-foreground">|</span>
            <span>SLA: {metrics.slaThreshold}</span>
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* In-Stage Progress Funnel (if available) */}
          {metrics.progressFunnel && metrics.progressFunnel.length > 0 && (
            <InStageProgressFunnel steps={metrics.progressFunnel} />
          )}

          {/* AI/Human/HITL Attribution Bar */}
          <Card>
            <CardContent className="pt-6">
              <AttributionBar 
                aiPercentage={metrics.aiPercentage}
                humanPercentage={metrics.humanPercentage}
                hitlPercentage={metrics.hitlPercentage}
              />
            </CardContent>
          </Card>

          {/* Stage-Specific Metrics (if available) */}
          {hasStageSpecificMetrics && (
            <StageSpecificMetrics stageId={stageId} metrics={metrics} />
          )}

          {/* Conversion & Drop-off */}
          <Card>
            <CardContent className="pt-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-4">Conversion Analysis</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-success/10 p-3 text-center">
                  <p className="text-2xl font-bold text-success">{metrics.conversionRate}%</p>
                  <p className="text-xs text-muted-foreground">Conversion Rate</p>
                </div>
                <div className="rounded-lg bg-destructive/10 p-3 text-center">
                  <p className="text-2xl font-bold text-destructive">{metrics.dropOffRate}%</p>
                  <p className="text-xs text-muted-foreground">Drop-off Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Volume Metrics - only show if no stage-specific metrics */}
          {!hasStageSpecificMetrics && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Volume Metrics</h4>
                
                {/* Sent */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      Sent
                    </span>
                    <span className="font-semibold">{metrics.sent} <span className="text-muted-foreground font-normal">({sentPercent}%)</span></span>
                  </div>
                  <Progress value={sentPercent} className="h-2" />
                </div>

                {/* Appeared */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-500" />
                      Appeared
                    </span>
                    <span className="font-semibold">{metrics.appeared} <span className="text-muted-foreground font-normal">({appearedPercent}%)</span></span>
                  </div>
                  <Progress value={appearedPercent} className="h-2" />
                </div>

                {/* Qualified */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      Qualified
                    </span>
                    <span className="font-semibold">{metrics.qualified} <span className="text-muted-foreground font-normal">({qualifiedPercent}%)</span></span>
                  </div>
                  <Progress value={qualifiedPercent} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Additional Metrics */}
          <Card>
            <CardContent className="pt-6 space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Additional Metrics</h4>
              
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  Disqualified
                </span>
                <span className="font-semibold">{metrics.disqualified} <span className="text-muted-foreground font-normal">({disqualifiedPercent}%)</span></span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-amber-500" />
                  Pending
                </span>
                <span className="font-semibold">{metrics.pending} <span className="text-muted-foreground font-normal">({pendingPercent}%)</span></span>
              </div>

              {metrics.delayCause && (
                <div className="flex items-center justify-between text-sm pt-2 border-t">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    Delay Cause
                  </span>
                  <Badge variant="outline" className="text-warning border-warning">
                    {metrics.delayCause}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Channel Breakdown (if available) */}
          {metrics.channels && (
            <Card>
              <CardContent className="pt-6 space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Channel Breakdown</h4>
                {Object.entries(metrics.channels).map(([channel, percentage]) => (
                  <div key={channel} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="capitalize">{channel.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-medium">{percentage as number}%</span>
                    </div>
                    <Progress value={percentage as number} className="h-1.5" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Handler & Response Time */}
          <Card>
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Avg Response Time
                </span>
                <span className="font-semibold">{metrics.avgResponseTime}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>Handler</span>
                <span className={`${handlerColors[metrics.handler]} text-xs font-bold px-2 py-1 rounded-full`}>
                  {metrics.handler} – {handlerNames[metrics.handler]}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
