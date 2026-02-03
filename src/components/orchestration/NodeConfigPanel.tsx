import { X, Bot, Users, Zap, GitBranch, Play, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Agent } from "@/lib/mockData";

type StageType = "ai" | "automation" | "human" | "decision" | "entry" | "exit";

interface StageNodeData {
  label: string;
  stageType: StageType;
  icon?: string;
  agentId?: string;
  humanRole?: string;
  slaHours?: number;
}

interface NodeConfigPanelProps {
  node: { id: string; data: Record<string, unknown> } | null;
  agents: Agent[];
  onUpdate: (data: Partial<StageNodeData>) => void;
  onClose: () => void;
}

const HUMAN_ROLES = [
  "Recruiter",
  "Senior Recruiter",
  "Hiring Manager",
  "Interview Panel",
  "HR Manager",
  "Compliance Officer",
  "Onboarding Specialist",
];

const getStageTypeIcon = (stageType: StageType) => {
  switch (stageType) {
    case "ai": return <Bot className="h-4 w-4 text-orange-500" />;
    case "human": return <Users className="h-4 w-4 text-blue-500" />;
    case "automation": return <Zap className="h-4 w-4 text-emerald-500" />;
    case "decision": return <GitBranch className="h-4 w-4 text-slate-500" />;
    case "entry": return <Play className="h-4 w-4 text-gray-500" />;
    case "exit": return <Flag className="h-4 w-4 text-gray-500" />;
    default: return null;
  }
};

const getStageTypeBadge = (stageType: StageType) => {
  const variants: Record<StageType, string> = {
    ai: "bg-orange-100 text-orange-700 border-orange-200",
    human: "bg-blue-100 text-blue-700 border-blue-200",
    automation: "bg-emerald-100 text-emerald-700 border-emerald-200",
    decision: "bg-slate-100 text-slate-700 border-slate-200",
    entry: "bg-gray-100 text-gray-700 border-gray-200",
    exit: "bg-gray-100 text-gray-700 border-gray-200",
  };
  
  return variants[stageType] || variants.entry;
};

export function NodeConfigPanel({ node, agents, onUpdate, onClose }: NodeConfigPanelProps) {
  if (!node) {
    return (
      <div className="w-72 border-l bg-muted/30 flex items-center justify-center">
        <p className="text-sm text-muted-foreground px-4 text-center">
          Select a node on the canvas to configure its properties
        </p>
      </div>
    );
  }

  const rawData = node.data;
  const stageType = (rawData.stageType as StageType) || "entry";
  const label = (rawData.label as string) || "";
  const agentId = rawData.agentId as string | undefined;
  const humanRole = rawData.humanRole as string | undefined;
  const slaHours = (rawData.slaHours as number) || 24;
  
  const isEntryExit = stageType === "entry" || stageType === "exit";
  const isDecision = stageType === "decision";
  const isAI = stageType === "ai";
  const isAutomation = stageType === "automation";
  const isHuman = stageType === "human";

  return (
    <div className="w-72 border-l bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getStageTypeIcon(stageType)}
          <h3 className="font-semibold text-sm">Configure Node</h3>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Node Type Badge */}
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Node Type</Label>
            <Badge variant="outline" className={getStageTypeBadge(stageType)}>
              {stageType.toUpperCase()}
            </Badge>
          </div>

          <Separator />

          {/* Stage Name */}
          <div className="space-y-2">
            <Label htmlFor="stageName">Stage Name</Label>
            <Input
              id="stageName"
              value={label}
              onChange={(e) => onUpdate({ label: e.target.value })}
              placeholder="Enter stage name"
              disabled={isEntryExit}
            />
          </div>

          {/* Agent Assignment (AI & Automation stages) */}
          {(isAI || isAutomation) && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label>Assigned Agent *</Label>
                <Select
                  value={agentId || ""}
                  onValueChange={(value) => onUpdate({ agentId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {agents
                      .filter(a => a.status !== "error")
                      .map((agent) => (
                        <SelectItem key={agent.id} value={agent.id}>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              agent.status === "active" ? "bg-emerald-500" : "bg-amber-500"
                            }`} />
                            <span>{agent.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {!agentId && (
                  <p className="text-xs text-destructive">Agent assignment required</p>
                )}
                
                {agentId && (
                  <div className="text-xs text-muted-foreground">
                    {agents.find(a => a.id === agentId)?.description}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Human Role Assignment */}
          {isHuman && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label>Assigned Role *</Label>
                <Select
                  value={humanRole || ""}
                  onValueChange={(value) => onUpdate({ humanRole: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {HUMAN_ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!humanRole && (
                  <p className="text-xs text-destructive">Role assignment required</p>
                )}
              </div>
            </>
          )}

          {/* SLA Configuration (all except Entry/Exit) */}
          {!isEntryExit && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="slaHours">SLA Threshold (hours)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="slaHours"
                    type="number"
                    min={1}
                    max={720}
                    value={slaHours}
                    onChange={(e) => onUpdate({ slaHours: parseInt(e.target.value) || 24 })}
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">hours</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Maximum time allowed for this stage
                </p>
              </div>
            </>
          )}

          {/* Decision Node Configuration */}
          {isDecision && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label className="text-muted-foreground">Routing Conditions</Label>
                <p className="text-xs text-muted-foreground">
                  Connect output handles to different paths. Configure conditions on edges.
                </p>
                <div className="bg-muted/50 p-3 rounded-lg space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span>Top: Qualified path</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span>Right: Hold/Review path</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span>Bottom: Rejected path</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Entry/Exit Node Info */}
          {isEntryExit && (
            <>
              <Separator />
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  {stageType === "entry" 
                    ? "This is the pipeline entry point. All candidates enter through this node."
                    : "This is the pipeline exit point. Candidates completing the pipeline reach this node."
                  }
                </p>
              </div>
            </>
          )}
        </div>
      </ScrollArea>

      {/* Node ID */}
      <div className="p-3 border-t bg-muted/30">
        <p className="text-xs text-muted-foreground font-mono">
          ID: {node.id}
        </p>
      </div>
    </div>
  );
}
