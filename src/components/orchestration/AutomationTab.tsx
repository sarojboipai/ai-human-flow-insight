import { useState } from "react";
import {
  Bot,
  Settings,
  CheckCircle,
  AlertCircle,
  Pause,
  Search,
  Link2,
  Database,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { agents, connectors, Agent, Connector, StageAutomation } from "@/lib/mockData";
import { type StageNodeData } from "@/components/orchestration/WorkflowTab";
import { type Node } from "@xyflow/react";

interface AutomationTabProps {
  nodes: Node<StageNodeData>[];
  stageAutomations: StageAutomation[];
  onAutomationsChange: (automations: StageAutomation[]) => void;
  onDirtyChange: () => void;
}

const ACTION_TYPES = [
  { value: "screen", label: "Screen" },
  { value: "match", label: "Match" },
  { value: "outreach", label: "Outreach" },
  { value: "schedule", label: "Schedule" },
  { value: "notify", label: "Notify" },
];

const ESCALATION_TARGETS = [
  "Human Recruiter",
  "Senior Recruiter",
  "Technical Team",
  "Hiring Manager",
  "Compliance Officer",
];

const getConnectorIcon = (type: Connector["type"]) => {
  switch (type) {
    case "ats":
      return <Database className="h-4 w-4" />;
    case "messaging":
      return <MessageSquare className="h-4 w-4" />;
    case "calendar":
      return <Calendar className="h-4 w-4" />;
    default:
      return <Link2 className="h-4 w-4" />;
  }
};

const getStatusIcon = (status: Agent["status"] | Connector["status"]) => {
  switch (status) {
    case "active":
    case "connected":
      return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    case "paused":
    case "disconnected":
      return <Pause className="h-4 w-4 text-amber-500" />;
    case "error":
      return <AlertCircle className="h-4 w-4 text-destructive" />;
    default:
      return null;
  }
};

export function AutomationTab({
  nodes,
  stageAutomations,
  onAutomationsChange,
  onDirtyChange,
}: AutomationTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);

  // Get stages that can have automation (AI and Automation types)
  const automationStages = nodes.filter(
    (n) => n.data.stageType === "ai" || n.data.stageType === "automation"
  );

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAutomationChange = (
    stageId: string,
    field: keyof StageAutomation,
    value: any
  ) => {
    const existing = stageAutomations.find((a) => a.stageId === stageId);
    if (existing) {
      const updated = stageAutomations.map((a) =>
        a.stageId === stageId ? { ...a, [field]: value } : a
      );
      onAutomationsChange(updated);
    } else {
      // Create new automation entry
      const stageName =
        nodes.find((n) => n.id === stageId)?.data.label || "Unknown";
      const newAutomation: StageAutomation = {
        stageId,
        stageName,
        assignedAgentId: null,
        actionType: "screen",
        confidenceThreshold: 85,
        escalationTarget: "Human Recruiter",
        enabled: true,
        integrations: [],
      };
      onAutomationsChange([...stageAutomations, { ...newAutomation, [field]: value }]);
    }
    onDirtyChange();
  };

  const getAutomation = (stageId: string): StageAutomation | undefined => {
    return stageAutomations.find((a) => a.stageId === stageId);
  };

  return (
    <div className="flex-1 flex min-h-0">
      {/* Left Panel - Agent Registry (Compact) */}
      <div className="w-60 border-r bg-muted/30 flex flex-col">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Bot className="h-4 w-4 text-primary" />
            Agents
          </h3>
          <div className="relative mt-2">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Filter agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className="p-2.5 rounded-lg border bg-background hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {getStatusIcon(agent.status)}
                  <span className="text-sm font-medium truncate">{agent.name}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {agent.description}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Badge variant="outline" className="text-[10px] px-1.5">
                    {agent.type}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">
                    {agent.successRate}% success
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content - Automation Mapping Table */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Stage Automation Mapping</h2>
            <p className="text-sm text-muted-foreground">
              Configure AI agents and automation settings for each pipeline stage
            </p>
          </div>

          {automationStages.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium">No Automation Stages</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Add AI or Automation stages in the Workflow tab first
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Stage</TableHead>
                      <TableHead>Assigned Agent</TableHead>
                      <TableHead>Action Type</TableHead>
                      <TableHead>Confidence Threshold</TableHead>
                      <TableHead>Escalation Target</TableHead>
                      <TableHead className="text-center">Enabled</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {automationStages.map((stage) => {
                      const automation = getAutomation(stage.id);
                      return (
                        <TableRow key={stage.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={
                                  stage.data.stageType === "ai"
                                    ? "bg-orange-100 text-orange-700 border-orange-200"
                                    : "bg-emerald-100 text-emerald-700 border-emerald-200"
                                }
                              >
                                {stage.data.stageType.toUpperCase()}
                              </Badge>
                              <span className="font-medium">{stage.data.label}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={automation?.assignedAgentId || ""}
                              onValueChange={(value) =>
                                handleAutomationChange(stage.id, "assignedAgentId", value)
                              }
                            >
                              <SelectTrigger className="w-48">
                                <SelectValue placeholder="Select agent" />
                              </SelectTrigger>
                              <SelectContent>
                                {agents.map((agent) => (
                                  <SelectItem key={agent.id} value={agent.id}>
                                    <div className="flex items-center gap-2">
                                      {getStatusIcon(agent.status)}
                                      <span>{agent.name}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={automation?.actionType || "screen"}
                              onValueChange={(value) =>
                                handleAutomationChange(stage.id, "actionType", value)
                              }
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {ACTION_TYPES.map((action) => (
                                  <SelectItem key={action.value} value={action.value}>
                                    {action.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3 w-40">
                              <Slider
                                value={[automation?.confidenceThreshold || 85]}
                                onValueChange={([value]) =>
                                  handleAutomationChange(
                                    stage.id,
                                    "confidenceThreshold",
                                    value
                                  )
                                }
                                min={50}
                                max={99}
                                step={1}
                                className="flex-1"
                              />
                              <span className="text-sm font-mono w-10">
                                {automation?.confidenceThreshold || 85}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={automation?.escalationTarget || "Human Recruiter"}
                              onValueChange={(value) =>
                                handleAutomationChange(stage.id, "escalationTarget", value)
                              }
                            >
                              <SelectTrigger className="w-40">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {ESCALATION_TARGETS.map((target) => (
                                  <SelectItem key={target} value={target}>
                                    {target}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch
                              checked={automation?.enabled ?? true}
                              onCheckedChange={(checked) =>
                                handleAutomationChange(stage.id, "enabled", checked)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Right Panel - Connector Configuration */}
      <div className="w-72 border-l bg-muted/30 flex flex-col">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Link2 className="h-4 w-4 text-primary" />
            Connectors
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Integration status
          </p>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {connectors.map((connector) => (
              <div
                key={connector.id}
                onClick={() => setSelectedConnector(connector)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedConnector?.id === connector.id
                    ? "border-primary bg-primary/5"
                    : "bg-background hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1.5 rounded ${
                        connector.status === "connected"
                          ? "bg-primary/10"
                          : connector.status === "error"
                          ? "bg-destructive/10"
                          : "bg-muted"
                      }`}
                    >
                      {getConnectorIcon(connector.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{connector.name}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {connector.provider}
                      </p>
                    </div>
                  </div>
                  {getStatusIcon(connector.status)}
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px]">
                  <Badge
                    variant="outline"
                    className={
                      connector.status === "connected"
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                        : connector.status === "error"
                        ? "bg-red-100 text-red-700 border-red-200"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {connector.status}
                  </Badge>
                  <span className="text-muted-foreground">
                    {connector.lastSync}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Selected Connector Details */}
        {selectedConnector && (
          <div className="p-4 border-t bg-background">
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">Daily Volume</Label>
                <p className="text-sm font-medium">
                  {selectedConnector.dailyVolume.toLocaleString()} events
                </p>
              </div>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Settings className="h-3.5 w-3.5" />
                Configure
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
