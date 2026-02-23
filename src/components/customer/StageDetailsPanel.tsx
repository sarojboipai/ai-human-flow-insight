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
  Bot,
  X,
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
  SEOScoreRuleCard,
  JobPostMetricsCard,
  SourcingMetricsCard,
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
  megaphone: Briefcase,
  send: FileText,
  check: CheckCircle,
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

const stageAttributionDefaults: Record<string, { aiAgentName: string; aiTaskDescription: string; humanRoleName: string; humanTaskDescription: string }> = {
  "jobs-ankura": { aiAgentName: "Content Optimization Agent", aiTaskDescription: "Auto-optimize job descriptions and SEO ranking", humanRoleName: "Recruiter", humanTaskDescription: "Review and approve job postings" },
  "job-discovery": { aiAgentName: "Discovery Ranking Agent", aiTaskDescription: "AI-powered job ranking and candidate recommendations", humanRoleName: "Ops Specialist", humanTaskDescription: "Manual job boosting and search curation" },
  "expression": { aiAgentName: "Lead Scoring Agent", aiTaskDescription: "Auto-score and qualify candidate interest signals", humanRoleName: "Recruiter", humanTaskDescription: "Manual lead review and candidate outreach" },
  "prescreen": { aiAgentName: "Pre-Screen Agent", aiTaskDescription: "Automated questionnaire scoring and resume parsing", humanRoleName: "Recruiter", humanTaskDescription: "Manual review of edge-case candidates" },
  "voice-agent": { aiAgentName: "Voice Screening Agent", aiTaskDescription: "Automated phone screening with NLP analysis", humanRoleName: "Recruiter", humanTaskDescription: "Manual interview for flagged candidates" },
  "scheduling": { aiAgentName: "Scheduling Agent", aiTaskDescription: "AI-powered slot suggestion and auto-booking", humanRoleName: "Recruiter", humanTaskDescription: "Manual calendar coordination for senior roles" },
  "silver-med": { aiAgentName: "Talent Classification Agent", aiTaskDescription: "Auto-tag and classify silver medalist candidates", humanRoleName: "Recruiter", humanTaskDescription: "Manual re-engagement and follow-ups" },
  "talent-community": { aiAgentName: "Community Engagement Agent", aiTaskDescription: "Automated community content and engagement triggers", humanRoleName: "Community Manager", humanTaskDescription: "Manual moderation and relationship building" },
  "job-post": { aiAgentName: "JD Optimization Agent", aiTaskDescription: "Auto-generate and optimize job descriptions", humanRoleName: "Recruiter", humanTaskDescription: "Final review and approval of job postings" },
  "sourcing": { aiAgentName: "Sourcing Agent", aiTaskDescription: "Automated candidate search across job boards", humanRoleName: "Sourcer", humanTaskDescription: "College outreach and referral follow-ups" },
  // Workflow node IDs
  "customer-job-posting": { aiAgentName: "Intake Agent", aiTaskDescription: "Auto-parse and validate incoming job requisitions", humanRoleName: "Account Manager", humanTaskDescription: "Review client requirements and confirm job details" },
  "review-jd-seo": { aiAgentName: "SEO Optimization Agent", aiTaskDescription: "Analyze and optimize job description for search visibility", humanRoleName: "Recruiter", humanTaskDescription: "Final approval of SEO-optimized job descriptions" },
  "review-jd-criteria": { aiAgentName: "Criteria Validation Agent", aiTaskDescription: "Auto-validate screening questions and qualification criteria", humanRoleName: "Hiring Manager", humanTaskDescription: "Review and refine screening criteria alignment" },
  "job-post-swaasa": { aiAgentName: "JD Optimization Agent", aiTaskDescription: "Auto-generate and optimize job descriptions for Swaasa platform", humanRoleName: "Recruiter", humanTaskDescription: "Final review and approval of job postings" },
  "outreach": { aiAgentName: "Outreach Agent", aiTaskDescription: "Automated candidate outreach via email and WhatsApp", humanRoleName: "Recruiter", humanTaskDescription: "Personalized outreach for senior candidates" },
  "campaigns": { aiAgentName: "Campaign Agent", aiTaskDescription: "Automated campaign targeting and A/B testing", humanRoleName: "Marketing Specialist", humanTaskDescription: "Campaign strategy and creative review" },
  "marketing": { aiAgentName: "Marketing Agent", aiTaskDescription: "Automated employer branding and job promotion", humanRoleName: "Marketing Specialist", humanTaskDescription: "Content creation and channel management" },
  "application": { aiAgentName: "Application Processing Agent", aiTaskDescription: "Auto-parse applications and extract candidate profiles", humanRoleName: "Recruiter", humanTaskDescription: "Review incomplete or flagged applications" },
  "primary-screening": { aiAgentName: "Pre-Screen Agent", aiTaskDescription: "Automated screening via questionnaire and resume parsing", humanRoleName: "Recruiter", humanTaskDescription: "Manual review of edge-case candidates" },
  "interview-scheduling": { aiAgentName: "Scheduling Agent", aiTaskDescription: "AI-powered interview slot suggestion and auto-booking", humanRoleName: "Recruiter", humanTaskDescription: "Manual calendar coordination for complex schedules" },
  "placement-candidate": { aiAgentName: "Placement Agent", aiTaskDescription: "Auto-generate offer letters and onboarding checklists", humanRoleName: "Recruiter", humanTaskDescription: "Final offer negotiation and candidate confirmation" },
  "2ndpri": { aiAgentName: "Priority Routing Agent", aiTaskDescription: "Auto-route candidates to secondary screening paths", humanRoleName: "Recruiter", humanTaskDescription: "Manual triage of borderline candidates" },
  "human-screening": { aiAgentName: "Screening Support Agent", aiTaskDescription: "AI-assisted interview prep and candidate dossier generation", humanRoleName: "Recruiter", humanTaskDescription: "Conduct manual screening interviews" },
  "backup-candidate": { aiAgentName: "Talent Classification Agent", aiTaskDescription: "Auto-tag and classify backup candidates for future roles", humanRoleName: "Recruiter", humanTaskDescription: "Manual re-engagement and pipeline nurturing" },
  "talent-pool": { aiAgentName: "Community Engagement Agent", aiTaskDescription: "Automated talent pool segmentation and engagement triggers", humanRoleName: "Community Manager", humanTaskDescription: "Manual relationship building and community moderation" },
};

function SLAStatusBadge({ status }: { status: "green" | "amber" | "red" }) {
  const config = {
    green: { label: "On Track", className: "bg-success text-success-foreground" },
    amber: { label: "At Risk", className: "bg-warning text-warning-foreground" },
    red: { label: "SLA Breach", className: "bg-destructive text-destructive-foreground" },
  };
  return (
    <Badge className={config[status].className}>
      {status === "amber" && <AlertTriangle className="h-3 w-3 mr-1" />}
      {config[status].label}
    </Badge>
  );
}

function AttributionBar({ aiPercentage, humanPercentage, hitlPercentage }: { aiPercentage: number; humanPercentage: number; hitlPercentage: number }) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">AI vs Human vs HITL Attribution</h4>
      <div className="flex h-3 rounded-full overflow-hidden bg-muted">
        <div className="bg-orange-500 transition-all" style={{ width: `${aiPercentage}%` }} title={`AI: ${aiPercentage}%`} />
        <div className="bg-blue-500 transition-all" style={{ width: `${humanPercentage}%` }} title={`Human: ${humanPercentage}%`} />
        <div className="bg-teal-500 transition-all" style={{ width: `${hitlPercentage}%` }} title={`HITL: ${hitlPercentage}%`} />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-orange-500" />AI {aiPercentage}%</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-blue-500" />Human {humanPercentage}%</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-teal-500" />HITL {hitlPercentage}%</span>
      </div>
    </div>
  );
}

function StageSpecificMetrics({ stageId, metrics }: { stageId?: string; metrics: EnhancedStageMetrics }) {
  if (!stageId) return null;
  switch (stageId) {
    case "job-post": return metrics.jobPostMetrics ? <JobPostMetricsCard metrics={metrics.jobPostMetrics} /> : null;
    case "sourcing": return metrics.sourcingMetrics ? <SourcingMetricsCard metrics={metrics.sourcingMetrics} /> : null;
    case "jobs-ankura": return metrics.jobsSwaasaMetrics ? <JobsSwaasaMetricsCard metrics={metrics.jobsSwaasaMetrics} /> : null;
    case "job-discovery": return metrics.jobDiscoveryMetrics ? <JobDiscoveryMetricsCard metrics={metrics.jobDiscoveryMetrics} /> : null;
    case "expression": return metrics.eoiMetrics ? <EOIMetricsCard metrics={metrics.eoiMetrics} /> : null;
    case "prescreen": return metrics.preScreenMetrics ? <PreScreenMetricsCard metrics={metrics.preScreenMetrics} /> : null;
    case "voice-agent": return metrics.voiceScreeningMetrics ? <VoiceScreeningMetricsCard metrics={metrics.voiceScreeningMetrics} /> : null;
    case "scheduling": return metrics.interviewSchedulingMetrics ? <InterviewSchedulingMetricsCard metrics={metrics.interviewSchedulingMetrics} /> : null;
    case "silver-med": return metrics.silverMedalistMetrics ? <SilverMedalistMetricsCard metrics={metrics.silverMedalistMetrics} /> : null;
    case "talent-community": return metrics.talentCommunityMetrics ? <TalentCommunityMetricsCard metrics={metrics.talentCommunityMetrics} /> : null;
    default: return null;
  }
}

interface StageDetailsPanelProps {
  stageName: string;
  stageIcon?: string;
  stageId?: string;
  metrics: EnhancedStageMetrics | null;
  onClose: () => void;
}

export function StageDetailsPanel({ stageName, stageIcon, stageId, metrics, onClose }: StageDetailsPanelProps) {
  const Icon = (stageIcon && iconMap[stageIcon]) ? iconMap[stageIcon] : Briefcase;

  if (!metrics) {
    const defaults = stageId ? stageAttributionDefaults[stageId] : undefined;
    return (
      <div className="w-[400px] shrink-0 border-l bg-background overflow-y-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-muted">
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <span className="font-semibold text-lg">{stageName}</span>
          </div>
          <button onClick={onClose} className="rounded-sm opacity-70 hover:opacity-100 transition-opacity">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          {defaults && (
            <>
              <Card className="border-orange-200 dark:border-orange-800">
                <CardContent className="pt-6 space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">AI Agent Involved</h4>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-orange-100 dark:bg-orange-900/30"><Bot className="h-4 w-4 text-orange-600 dark:text-orange-400" /></div>
                    <span className="font-semibold text-sm">{defaults.aiAgentName}</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-8">{defaults.aiTaskDescription}</p>
                </CardContent>
              </Card>
              <Card className="border-blue-200 dark:border-blue-800">
                <CardContent className="pt-6 space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Human Involved</h4>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/30"><Users className="h-4 w-4 text-blue-600 dark:text-blue-400" /></div>
                    <span className="font-semibold text-sm">{defaults.humanRoleName}</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-8">{defaults.humanTaskDescription}</p>
                </CardContent>
              </Card>
            </>
          )}
          <p className="text-sm text-center text-muted-foreground pt-2">
            Detailed volume metrics are not yet available for this stage.
          </p>
        </div>
      </div>
    );
  }

  const sentPercent = 100;
  const appearedPercent = Math.round((metrics.appeared / metrics.sent) * 100);
  const qualifiedPercent = Math.round((metrics.qualified / metrics.appeared) * 100);
  const disqualifiedPercent = Math.round((metrics.disqualified / metrics.appeared) * 100);
  const pendingPercent = Math.round((metrics.pending / metrics.sent) * 100);

  const hasStageSpecificMetrics = stageId && (
    (stageId === "job-post" && metrics.jobPostMetrics) ||
    (stageId === "sourcing" && metrics.sourcingMetrics) ||
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
    <div className="w-[400px] shrink-0 border-l bg-background overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-muted">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <span className="font-semibold text-lg">{stageName}</span>
          {metrics.slaStatus && <SLAStatusBadge status={metrics.slaStatus} />}
        </div>
        <button onClick={onClose} className="rounded-sm opacity-70 hover:opacity-100 transition-opacity">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4 flex items-center gap-4 text-sm text-muted-foreground border-b">
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />Avg: {metrics.avgTimeInStage}</span>
        <span>|</span>
        <span>SLA: {metrics.slaThreshold}</span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {metrics.progressFunnel && metrics.progressFunnel.length > 0 && (
          <InStageProgressFunnel steps={metrics.progressFunnel} />
        )}

        {stageId === "jobs-ankura" && metrics.seoScore && (
          <SEOScoreRuleCard score={metrics.seoScore} />
        )}

        <Card>
          <CardContent className="pt-6">
            <AttributionBar aiPercentage={metrics.aiPercentage} humanPercentage={metrics.humanPercentage} hitlPercentage={metrics.hitlPercentage} />
          </CardContent>
        </Card>

        {/* AI Agent Involved */}
        {(() => {
          const defaults = stageId ? stageAttributionDefaults[stageId] : undefined;
          const agentName = metrics.aiAgentName || defaults?.aiAgentName;
          const agentTask = metrics.aiTaskDescription || defaults?.aiTaskDescription;
          if (!agentName) return null;
          return (
            <Card className="border-orange-200 dark:border-orange-800">
              <CardContent className="pt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-muted-foreground">AI Agent Involved</h4>
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800">{metrics.aiPercentage}%</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-orange-100 dark:bg-orange-900/30"><Bot className="h-4 w-4 text-orange-600 dark:text-orange-400" /></div>
                  <span className="font-semibold text-sm">{agentName}</span>
                </div>
                {agentTask && <p className="text-xs text-muted-foreground pl-8">{agentTask}</p>}
              </CardContent>
            </Card>
          );
        })()}

        {/* Human Involved */}
        {(() => {
          const defaults = stageId ? stageAttributionDefaults[stageId] : undefined;
          const roleName = metrics.humanRoleName || defaults?.humanRoleName;
          const roleTask = metrics.humanTaskDescription || defaults?.humanTaskDescription;
          if (!roleName) return null;
          return (
            <Card className="border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-muted-foreground">Human Involved</h4>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">{metrics.humanPercentage}%</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/30"><Users className="h-4 w-4 text-blue-600 dark:text-blue-400" /></div>
                  <span className="font-semibold text-sm">{roleName}</span>
                </div>
                {roleTask && <p className="text-xs text-muted-foreground pl-8">{roleTask}</p>}
              </CardContent>
            </Card>
          );
        })()}

        {hasStageSpecificMetrics && <StageSpecificMetrics stageId={stageId} metrics={metrics} />}

        {stageId !== "job-post" && (
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
        )}

        {!hasStageSpecificMetrics && (
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">Volume Metrics</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2"><FileText className="h-4 w-4 text-blue-500" />Sent</span>
                  <span className="font-semibold">{metrics.sent} <span className="text-muted-foreground font-normal">({sentPercent}%)</span></span>
                </div>
                <Progress value={sentPercent} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2"><Users className="h-4 w-4 text-purple-500" />Appeared</span>
                  <span className="font-semibold">{metrics.appeared} <span className="text-muted-foreground font-normal">({appearedPercent}%)</span></span>
                </div>
                <Progress value={appearedPercent} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-500" />Qualified</span>
                  <span className="font-semibold">{metrics.qualified} <span className="text-muted-foreground font-normal">({qualifiedPercent}%)</span></span>
                </div>
                <Progress value={qualifiedPercent} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        {stageId !== "job-post" && (
          <Card>
            <CardContent className="pt-6 space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Additional Metrics</h4>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2"><XCircle className="h-4 w-4 text-red-500" />Disqualified</span>
                <span className="font-semibold">{metrics.disqualified} <span className="text-muted-foreground font-normal">({disqualifiedPercent}%)</span></span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2"><Timer className="h-4 w-4 text-amber-500" />Pending</span>
                <span className="font-semibold">{metrics.pending} <span className="text-muted-foreground font-normal">({pendingPercent}%)</span></span>
              </div>
              {metrics.delayCause && (
                <div className="flex items-center justify-between text-sm pt-2 border-t">
                  <span className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" />Delay Cause</span>
                  <Badge variant="outline" className="text-warning border-warning">{metrics.delayCause}</Badge>
                </div>
              )}
            </CardContent>
          </Card>
        )}

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

        <Card>
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" />Avg Response Time</span>
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
    </div>
  );
}
