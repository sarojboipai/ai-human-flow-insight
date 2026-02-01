import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Database, 
  FileText, 
  Search, 
  Heart, 
  ClipboardList, 
  Mic, 
  User,
  Calendar,
  Medal,
  Users
} from "lucide-react";

interface PipelineStage {
  id: string;
  name: string;
  icon: React.ReactNode;
  badge?: {
    label: string;
    color: string;
  };
  candidates: number;
}

interface OutcomeNode {
  id: string;
  name: string;
  icon: React.ReactNode;
  badge?: {
    label: string;
    color: string;
  };
  candidates: number;
  branchLabel: string;
  branchColor: string;
}

const stages: PipelineStage[] = [
  { 
    id: "ats", 
    name: "ATS Source", 
    icon: <Database className="h-5 w-5" />,
    candidates: 500
  },
  { 
    id: "jobs", 
    name: "Jobs in System", 
    icon: <FileText className="h-5 w-5" />,
    badge: { label: "C", color: "bg-purple-500" },
    candidates: 485
  },
  { 
    id: "discovery", 
    name: "Job Discovery", 
    icon: <Search className="h-5 w-5" />,
    badge: { label: "C", color: "bg-purple-500" },
    candidates: 420
  },
  { 
    id: "interest", 
    name: "Expression of Interest", 
    icon: <Heart className="h-5 w-5" />,
    badge: { label: "C", color: "bg-purple-500" },
    candidates: 380
  },
  { 
    id: "prescreening", 
    name: "Pre-screening Questions", 
    icon: <ClipboardList className="h-5 w-5" />,
    badge: { label: "AE", color: "bg-amber-500" },
    candidates: 290
  },
  { 
    id: "voice", 
    name: "Voice Agent Screening", 
    icon: <Mic className="h-5 w-5" />,
    badge: { label: "X+", color: "bg-orange-500" },
    candidates: 145
  },
];

const outcomes: OutcomeNode[] = [
  {
    id: "scheduling",
    name: "Scheduling",
    icon: <Calendar className="h-5 w-5" />,
    badge: { label: "AE", color: "bg-amber-500" },
    candidates: 52,
    branchLabel: "Highly Qualified",
    branchColor: "text-emerald-500"
  },
  {
    id: "silver",
    name: "Silver Medalist",
    icon: <Medal className="h-5 w-5" />,
    badge: { label: "AE", color: "bg-amber-500" },
    candidates: 43,
    branchLabel: "Qualified",
    branchColor: "text-blue-500"
  },
  {
    id: "talent",
    name: "Talent Community",
    icon: <Users className="h-5 w-5" />,
    badge: { label: "C", color: "bg-purple-500" },
    candidates: 50,
    branchLabel: "Knockout",
    branchColor: "text-red-500"
  },
];

function StageNode({ stage }: { stage: PipelineStage }) {
  return (
    <div className="flex flex-col items-center min-w-[120px]">
      <div className="relative flex flex-col items-center p-4 rounded-xl border-2 border-sky-200 bg-card shadow-sm w-full">
        {stage.badge && (
          <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full ${stage.badge.color} flex items-center justify-center`}>
            <span className="text-[10px] font-bold text-white">{stage.badge.label}</span>
          </div>
        )}
        <div className="text-sky-600 mb-2">
          {stage.icon}
        </div>
        <span className="text-xs font-medium text-center leading-tight">{stage.name}</span>
        <span className="text-lg font-bold text-foreground mt-1">{stage.candidates}</span>
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex items-center px-1">
      <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
      <div className="w-8 h-0 border-t-2 border-dashed border-muted-foreground/40" />
      <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
    </div>
  );
}

function DecisionDiamond() {
  return (
    <div className="flex flex-col items-center min-w-[80px]">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 bg-slate-800 rotate-45 rounded-md" />
        <User className="h-6 w-6 text-white relative z-10" />
      </div>
      <span className="text-xs font-medium mt-2">Decision</span>
      <span className="text-lg font-bold text-foreground">145</span>
    </div>
  );
}

function OutcomeNodeComponent({ outcome }: { outcome: OutcomeNode }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-center">
        <span className={`text-xs font-medium ${outcome.branchColor} mb-1`}>
          {outcome.branchLabel}
        </span>
        <div className="w-12 h-0 border-t-2 border-dashed border-muted-foreground/40" />
      </div>
      <div className="relative flex flex-col items-center p-3 rounded-xl border-2 border-sky-200 bg-card shadow-sm min-w-[100px]">
        {outcome.badge && (
          <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full ${outcome.badge.color} flex items-center justify-center`}>
            <span className="text-[9px] font-bold text-white">{outcome.badge.label}</span>
          </div>
        )}
        <div className="text-sky-600 mb-1">
          {outcome.icon}
        </div>
        <span className="text-[10px] font-medium text-center leading-tight">{outcome.name}</span>
        <span className="text-sm font-bold text-foreground">{outcome.candidates}</span>
      </div>
    </div>
  );
}

interface JobProgressPipelineProps {
  jobId?: string;
}

export function JobProgressPipeline({ jobId }: JobProgressPipelineProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Job Progress Pipeline</CardTitle>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            Candidate
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            AI + Human
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            AI Screened
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto pb-4">
          {/* Main pipeline row */}
          <div className="flex items-start gap-1 min-w-max">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center">
                <StageNode stage={stage} />
                {index < stages.length - 1 && <Connector />}
              </div>
            ))}
            <Connector />
            <DecisionDiamond />
          </div>
          
          {/* Branching outcomes */}
          <div className="flex justify-end mt-4 mr-4">
            <div className="flex flex-col gap-3">
              {outcomes.map((outcome) => (
                <OutcomeNodeComponent key={outcome.id} outcome={outcome} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
