import { X, Bot, Users, Zap, GitBranch, Play, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
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
  aiEnabled?: boolean;
  aiAgentId?: string;
  aiTaskDescription?: string;
  executionMode?: "fully_automated" | "human_review" | "confidence_based";
  confidenceThreshold?: number;
  humanEnabled?: boolean;
  humanTaskDescription?: string;
  assignmentType?: "auto_assign" | "round_robin" | "manual_pick" | "queue_based";
  humanSlaHours?: number;
}

interface NodeConfigPanelProps {
  node: { id: string; data: Record<string, unknown> } | null;
  agents: Agent[];
  onUpdate: (data: Partial<StageNodeData>) => void;
  onClose: () => void;
}

const HUMAN_ROLES = [
  "Recruiter",
  "Sourcer",
  "Hiring Manager",
  "Ops Specialist",
  "HITL Reviewer",
  "Custom Role",
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

function getAttributionBadge(aiEnabled?: boolean, humanEnabled?: boolean) {
  if (aiEnabled && humanEnabled) return { label: "Hybrid", className: "bg-emerald-100 text-emerald-700 border-emerald-200" };
  if (aiEnabled) return { label: "AI Only", className: "bg-orange-100 text-orange-700 border-orange-200" };
  if (humanEnabled) return { label: "Human Only", className: "bg-blue-100 text-blue-700 border-blue-200" };
  return null;
}

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
  const slaHours = (rawData.slaHours as number) || 24;

  const aiEnabled = rawData.aiEnabled as boolean | undefined;
  const aiAgentId = rawData.aiAgentId as string | undefined;
  const aiTaskDescription = rawData.aiTaskDescription as string | undefined;
  const executionMode = (rawData.executionMode as StageNodeData["executionMode"]) || "fully_automated";
  const confidenceThreshold = (rawData.confidenceThreshold as number) ?? 70;

  const humanEnabled = rawData.humanEnabled as boolean | undefined;
  const humanRole = rawData.humanRole as string | undefined;
  const humanTaskDescription = rawData.humanTaskDescription as string | undefined;
  const assignmentType = (rawData.assignmentType as StageNodeData["assignmentType"]) || "auto_assign";
  const humanSlaHours = (rawData.humanSlaHours as number) || 24;

  const isEntryExit = stageType === "entry" || stageType === "exit";
  const isDecision = stageType === "decision";
  const attribution = getAttributionBadge(aiEnabled, humanEnabled);

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

          {/* Attribution Summary */}
          {!isEntryExit && attribution && (
            <>
              <Separator />
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">Attribution</Label>
                <Badge variant="outline" className={attribution.className}>
                  {attribution.label}
                </Badge>
              </div>
            </>
          )}

          {/* AI Agent Task Section */}
          {!isEntryExit && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-orange-500" />
                    <Label className="text-sm font-medium">AI Agent Task</Label>
                  </div>
                  <Switch
                    checked={!!aiEnabled}
                    onCheckedChange={(checked) => onUpdate({ aiEnabled: checked })}
                  />
                </div>

                {aiEnabled && (
                  <div className="space-y-3 pl-1">
                    {/* Agent Selector */}
                    <div className="space-y-1.5">
                      <Label className="text-xs">Select AI Agent</Label>
                      <Select
                        value={aiAgentId || ""}
                        onValueChange={(value) => onUpdate({ aiAgentId: value })}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Select an agent" />
                        </SelectTrigger>
                        <SelectContent>
                          {agents
                            .filter((a) => a.status !== "error")
                            .map((agent) => (
                              <SelectItem key={agent.id} value={agent.id}>
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${agent.status === "active" ? "bg-emerald-500" : "bg-amber-500"}`} />
                                  <span>{agent.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Task Description */}
                    <div className="space-y-1.5">
                      <Label className="text-xs">AI Task Description</Label>
                      <Textarea
                        value={aiTaskDescription || ""}
                        onChange={(e) => onUpdate({ aiTaskDescription: e.target.value })}
                        placeholder="e.g. Auto-source candidates from job boards"
                        className="min-h-[60px] text-xs"
                      />
                    </div>

                    {/* Execution Mode */}
                    <div className="space-y-1.5">
                      <Label className="text-xs">Execution Mode</Label>
                      <Select
                        value={executionMode}
                        onValueChange={(value) => onUpdate({ executionMode: value as StageNodeData["executionMode"] })}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fully_automated">Fully Automated</SelectItem>
                          <SelectItem value="human_review">Human Review After AI</SelectItem>
                          <SelectItem value="confidence_based">Confidence-based Routing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Confidence Threshold */}
                    {executionMode === "confidence_based" && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Confidence Threshold</Label>
                          <span className="text-xs font-medium text-muted-foreground">{confidenceThreshold}%</span>
                        </div>
                        <Slider
                          value={[confidenceThreshold]}
                          onValueChange={([val]) => onUpdate({ confidenceThreshold: val })}
                          min={0}
                          max={100}
                          step={5}
                        />
                        <p className="text-[10px] text-muted-foreground">
                          Below threshold → routed to HITL/Human
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Human Task Section */}
          {!isEntryExit && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <Label className="text-sm font-medium">Human Task</Label>
                  </div>
                  <Switch
                    checked={!!humanEnabled}
                    onCheckedChange={(checked) => onUpdate({ humanEnabled: checked })}
                  />
                </div>

                {humanEnabled && (
                  <div className="space-y-3 pl-1">
                    {/* Role Selector */}
                    <div className="space-y-1.5">
                      <Label className="text-xs">Responsible Role</Label>
                      <Select
                        value={humanRole || ""}
                        onValueChange={(value) => onUpdate({ humanRole: value })}
                      >
                        <SelectTrigger className="h-8 text-xs">
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
                    </div>

                    {/* Task Description */}
                    <div className="space-y-1.5">
                      <Label className="text-xs">Human Task Description</Label>
                      <Textarea
                        value={humanTaskDescription || ""}
                        onChange={(e) => onUpdate({ humanTaskDescription: e.target.value })}
                        placeholder="e.g. Manual profile review"
                        className="min-h-[60px] text-xs"
                      />
                    </div>

                    {/* Assignment Type */}
                    <div className="space-y-1.5">
                      <Label className="text-xs">Assignment Type</Label>
                      <Select
                        value={assignmentType}
                        onValueChange={(value) => onUpdate({ assignmentType: value as StageNodeData["assignmentType"] })}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto_assign">Auto-assign</SelectItem>
                          <SelectItem value="round_robin">Round Robin</SelectItem>
                          <SelectItem value="manual_pick">Manual Pick</SelectItem>
                          <SelectItem value="queue_based">Queue Based</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Human SLA */}
                    <div className="space-y-1.5">
                      <Label className="text-xs">Expected Completion Time</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min={1}
                          max={720}
                          value={humanSlaHours}
                          onChange={(e) => onUpdate({ humanSlaHours: parseInt(e.target.value) || 24 })}
                          className="w-20 h-8 text-xs"
                        />
                        <span className="text-xs text-muted-foreground">hours</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* SLA Configuration (all except Entry/Exit) */}
          {!isEntryExit && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="slaHours">Stage SLA Threshold (hours)</Label>
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
