import { DragEvent } from "react";
import { 
  Briefcase, 
  Search, 
  Send, 
  FileText, 
  Bot, 
  Calendar, 
  Award, 
  CheckCircle, 
  GitBranch,
  Play,
  Flag,
  Users,
  Zap,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface PaletteStage {
  id: string;
  label: string;
  nodeType: string;
  stageType: "ai" | "automation" | "human" | "decision" | "entry" | "exit";
  icon: string;
  iconComponent: React.ReactNode;
  description: string;
}

const PALETTE_STAGES: { category: string; stages: PaletteStage[] }[] = [
  {
    category: "Entry/Exit",
    stages: [
      { id: "start", label: "Start", nodeType: "entryExit", stageType: "entry", icon: "play", iconComponent: <Play className="h-4 w-4" />, description: "Pipeline entry point" },
      { id: "end", label: "End", nodeType: "entryExit", stageType: "exit", icon: "flag", iconComponent: <Flag className="h-4 w-4" />, description: "Pipeline exit point" },
    ],
  },
  {
    category: "AI Stages",
    stages: [
      { id: "job-posting", label: "Job Posting", nodeType: "aiStage", stageType: "ai", icon: "briefcase", iconComponent: <Briefcase className="h-4 w-4" />, description: "AI-powered job posting" },
      { id: "sourcing", label: "Sourcing", nodeType: "aiStage", stageType: "ai", icon: "search", iconComponent: <Search className="h-4 w-4" />, description: "AI candidate sourcing" },
      { id: "screening", label: "Screening", nodeType: "aiStage", stageType: "ai", icon: "bot", iconComponent: <Bot className="h-4 w-4" />, description: "AI profile screening" },
      { id: "outreach", label: "Outreach", nodeType: "aiStage", stageType: "ai", icon: "send", iconComponent: <Send className="h-4 w-4" />, description: "AI-driven outreach" },
    ],
  },
  {
    category: "Human Stages",
    stages: [
      { id: "interview", label: "Interview", nodeType: "humanStage", stageType: "human", icon: "calendar", iconComponent: <Calendar className="h-4 w-4" />, description: "Human-led interview" },
      { id: "offer", label: "Offer", nodeType: "humanStage", stageType: "human", icon: "award", iconComponent: <Award className="h-4 w-4" />, description: "Offer negotiation" },
      { id: "recruiter-review", label: "Recruiter Review", nodeType: "humanStage", stageType: "human", icon: "users", iconComponent: <Users className="h-4 w-4" />, description: "Manual recruiter review" },
    ],
  },
  {
    category: "Automation",
    stages: [
      { id: "scheduling", label: "Scheduling", nodeType: "automationStage", stageType: "automation", icon: "calendar", iconComponent: <Calendar className="h-4 w-4" />, description: "Auto-scheduling" },
      { id: "onboarding", label: "Onboarding", nodeType: "automationStage", stageType: "automation", icon: "checkCircle", iconComponent: <CheckCircle className="h-4 w-4" />, description: "Onboarding automation" },
      { id: "notification", label: "Notification", nodeType: "automationStage", stageType: "automation", icon: "zap", iconComponent: <Zap className="h-4 w-4" />, description: "Send notifications" },
    ],
  },
  {
    category: "Logic",
    stages: [
      { id: "decision", label: "Decision", nodeType: "decisionGateway", stageType: "decision", icon: "gitBranch", iconComponent: <GitBranch className="h-4 w-4" />, description: "Conditional routing" },
    ],
  },
];

const getStageColor = (stageType: PaletteStage["stageType"]) => {
  switch (stageType) {
    case "ai": return "bg-orange-100 border-orange-300 text-orange-700";
    case "human": return "bg-blue-100 border-blue-300 text-blue-700";
    case "automation": return "bg-emerald-100 border-emerald-300 text-emerald-700";
    case "decision": return "bg-slate-100 border-slate-300 text-slate-700";
    case "entry":
    case "exit": return "bg-gray-100 border-gray-300 text-gray-700";
    default: return "bg-gray-100 border-gray-300 text-gray-700";
  }
};

function DraggableStage({ stage }: { stage: PaletteStage }) {
  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData("application/reactflow/type", stage.nodeType);
    event.dataTransfer.setData("application/reactflow/label", stage.label);
    event.dataTransfer.setData("application/reactflow/stageType", stage.stageType);
    event.dataTransfer.setData("application/reactflow/icon", stage.icon);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={`p-2.5 rounded-lg border-2 cursor-grab active:cursor-grabbing transition-all hover:shadow-md ${getStageColor(stage.stageType)}`}
    >
      <div className="flex items-center gap-2">
        {stage.iconComponent}
        <span className="text-sm font-medium">{stage.label}</span>
      </div>
      <p className="text-xs opacity-70 mt-1">{stage.description}</p>
    </div>
  );
}

export function StagePalette() {
  return (
    <div className="w-64 border-r bg-muted/30 flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-sm">Stage Palette</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Drag stages onto the canvas
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          {PALETTE_STAGES.map((category) => (
            <div key={category.category}>
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {category.category}
              </h4>
              <div className="space-y-2">
                {category.stages.map((stage) => (
                  <DraggableStage key={stage.id} stage={stage} />
                ))}
              </div>
              <Separator className="mt-4" />
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Legend */}
      <div className="p-3 border-t bg-muted/50">
        <h4 className="text-xs font-medium text-muted-foreground mb-2">Legend</h4>
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-orange-500" />
            <span>AI</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-blue-500" />
            <span>Human</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-emerald-500" />
            <span>Automation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-slate-500" />
            <span>Decision</span>
          </div>
        </div>
      </div>
    </div>
  );
}
