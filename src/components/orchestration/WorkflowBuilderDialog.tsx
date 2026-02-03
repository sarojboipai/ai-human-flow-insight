import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Bot, Users, CheckCircle, Plus, Zap } from "lucide-react";
import { Workflow, WorkflowStage, connectors, WorkflowAutomation } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { AutomationRow, AutomationConfig } from "./AutomationRow";

interface WorkflowBuilderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workflow?: Workflow | null;
  onSave: (workflow: Partial<Workflow>) => void;
}

interface StageConfig {
  id: string;
  name: string;
  type: WorkflowStage["type"];
  enabled: boolean;
  actor: "ai" | "human" | "hybrid";
  slaHours: number;
}

const DEFAULT_STAGES: StageConfig[] = [
  { id: "s1", name: "Profile Screening", type: "intake", enabled: true, actor: "ai", slaHours: 4 },
  { id: "s2", name: "Skills Matching", type: "match", enabled: true, actor: "ai", slaHours: 2 },
  { id: "s3", name: "Initial Outreach", type: "outreach", enabled: true, actor: "hybrid", slaHours: 24 },
  { id: "s4", name: "Interview Scheduling", type: "interview", enabled: true, actor: "hybrid", slaHours: 48 },
  { id: "s5", name: "Offer Process", type: "offer", enabled: true, actor: "human", slaHours: 72 },
  { id: "s6", name: "Onboarding", type: "join", enabled: true, actor: "hybrid", slaHours: 168 },
];

export function WorkflowBuilderDialog({
  open,
  onOpenChange,
  workflow,
  onSave,
}: WorkflowBuilderDialogProps) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [jobType, setJobType] = useState<Workflow["jobType"]>("frontline");
  const [status, setStatus] = useState<Workflow["status"]>("draft");
  const [stages, setStages] = useState<StageConfig[]>(DEFAULT_STAGES);
  const [automations, setAutomations] = useState<AutomationConfig[]>([]);

  const isEditing = !!workflow?.id;

  useEffect(() => {
    if (workflow) {
      setName(workflow.name);
      setDescription(workflow.description);
      setJobType(workflow.jobType);
      setStatus(workflow.status);
      
      // Map workflow stages to config
      const mappedStages = DEFAULT_STAGES.map((defaultStage) => {
        const existingStage = workflow.stages.find(
          (s) => s.type === defaultStage.type
        );
        if (existingStage) {
          return {
            ...defaultStage,
            name: existingStage.name,
            enabled: true,
            actor: existingStage.assignedActor,
            slaHours: existingStage.slaHours,
          };
        }
        return { ...defaultStage, enabled: false };
      });
      setStages(mappedStages);

      // Map workflow automations to config
      if (workflow.automations) {
        const mappedAutomations: AutomationConfig[] = workflow.automations.map((auto) => ({
          id: auto.id,
          trigger: auto.trigger,
          stageId: auto.stageId || "",
          hasCondition: !!auto.condition,
          conditionField: auto.condition?.field || "",
          conditionOperator: auto.condition?.operator || "=",
          conditionValue: String(auto.condition?.value || ""),
          action: auto.action,
          targetConnectorId: auto.targetConnectorId,
          enabled: auto.enabled,
        }));
        setAutomations(mappedAutomations);
      } else {
        setAutomations([]);
      }
    } else {
      setName("");
      setDescription("");
      setJobType("frontline");
      setStatus("draft");
      setStages(DEFAULT_STAGES);
      setAutomations([]);
    }
  }, [workflow, open]);

  const handleStageToggle = (stageId: string) => {
    setStages((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleActorChange = (stageId: string, actor: "ai" | "human" | "hybrid") => {
    setStages((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, actor } : s))
    );
  };

  const handleSlaChange = (stageId: string, slaHours: number) => {
    setStages((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, slaHours } : s))
    );
  };

  // Automation handlers
  const handleAddAutomation = () => {
    setAutomations((prev) => [
      ...prev,
      {
        id: `auto-${Date.now()}`,
        trigger: "stage_completed",
        stageId: "",
        hasCondition: false,
        conditionField: "",
        conditionOperator: "=",
        conditionValue: "",
        action: "send_notification",
        targetConnectorId: "",
        enabled: true,
      },
    ]);
  };

  const handleRemoveAutomation = (id: string) => {
    setAutomations((prev) => prev.filter((a) => a.id !== id));
  };

  const handleUpdateAutomation = (id: string, field: string, value: string | boolean) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: "Validation Error",
        description: "Pipeline name is required.",
        variant: "destructive",
      });
      return;
    }

    const enabledStages = stages.filter((s) => s.enabled);
    if (enabledStages.length === 0) {
      toast({
        title: "Validation Error",
        description: "At least one stage must be enabled.",
        variant: "destructive",
      });
      return;
    }

    const workflowStages: WorkflowStage[] = enabledStages.map((s, index) => ({
      id: `s${index + 1}`,
      name: s.name,
      type: s.type,
      assignedActor: s.actor,
      agentId: s.actor === "human" ? null : `agent-00${index + 1}`,
      humanBackup: "Assigned Team",
      slaHours: s.slaHours,
      retryPolicy: { maxRetries: 3, backoffMinutes: 15 },
    }));

    // Convert automation configs to workflow automations
    const workflowAutomations: WorkflowAutomation[] = automations.map((a) => ({
      id: a.id,
      trigger: a.trigger as WorkflowAutomation["trigger"],
      stageId: a.stageId || undefined,
      condition: a.hasCondition && a.conditionField
        ? {
            field: a.conditionField,
            operator: a.conditionOperator,
            value: isNaN(Number(a.conditionValue)) ? a.conditionValue : Number(a.conditionValue),
          }
        : undefined,
      action: a.action as WorkflowAutomation["action"],
      targetConnectorId: a.targetConnectorId,
      enabled: a.enabled,
    }));

    const workflowData: Partial<Workflow> = {
      ...(workflow?.id && { id: workflow.id }),
      name: name.trim(),
      description: description.trim(),
      jobType,
      status,
      stages: workflowStages,
      automations: workflowAutomations.length > 0 ? workflowAutomations : undefined,
    };

    onSave(workflowData);
    onOpenChange(false);

    toast({
      title: isEditing ? "Pipeline Updated" : "Pipeline Created",
      description: `"${name}" has been ${isEditing ? "updated" : "created"} successfully.`,
    });
  };

  const getActorIcon = (actor: "ai" | "human" | "hybrid") => {
    switch (actor) {
      case "ai":
        return <Bot className="h-3 w-3" />;
      case "human":
        return <Users className="h-3 w-3" />;
      case "hybrid":
        return <CheckCircle className="h-3 w-3" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Pipeline" : "Create New Pipeline"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modify the pipeline configuration below."
              : "Define your pipeline details and select which stages to include."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Info */}
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Pipeline Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Nurse Hiring - Tier 1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the purpose of this pipeline..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
            </div>
          </div>

          {/* Job Type & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Job Type *</Label>
              <Select value={jobType} onValueChange={(v) => setJobType(v as Workflow["jobType"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontline">Frontline</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status *</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as Workflow["status"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stages Configuration */}
          <div className="space-y-3">
            <Label>Pipeline Stages</Label>
            <p className="text-xs text-muted-foreground">
              Select which stages to include and configure actor assignments.
            </p>
            <div className="border rounded-lg divide-y">
              {stages.map((stage) => (
                <div
                  key={stage.id}
                  className={`p-3 flex items-center gap-4 ${
                    !stage.enabled ? "opacity-50" : ""
                  }`}
                >
                  <Checkbox
                    id={stage.id}
                    checked={stage.enabled}
                    onCheckedChange={() => handleStageToggle(stage.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <label
                      htmlFor={stage.id}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {stage.name}
                    </label>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {stage.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Actor:</span>
                    <Select
                      value={stage.actor}
                      onValueChange={(v) =>
                        handleActorChange(stage.id, v as "ai" | "human" | "hybrid")
                      }
                      disabled={!stage.enabled}
                    >
                      <SelectTrigger className="w-28 h-8">
                        <div className="flex items-center gap-1">
                          {getActorIcon(stage.actor)}
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai">
                          <div className="flex items-center gap-1">
                            <Bot className="h-3 w-3" /> AI
                          </div>
                        </SelectItem>
                        <SelectItem value="human">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" /> Human
                          </div>
                        </SelectItem>
                        <SelectItem value="hybrid">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" /> Hybrid
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">SLA:</span>
                    <Input
                      type="number"
                      value={stage.slaHours}
                      onChange={(e) =>
                        handleSlaChange(stage.id, parseInt(e.target.value) || 1)
                      }
                      disabled={!stage.enabled}
                      className="w-16 h-8 text-sm"
                      min={1}
                    />
                    <span className="text-xs text-muted-foreground">hrs</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Automations Configuration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Automations</Label>
                <p className="text-xs text-muted-foreground">
                  Configure automatic actions triggered by workflow events
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleAddAutomation}>
                <Plus className="h-4 w-4 mr-1" />
                Add Automation
              </Button>
            </div>

            {automations.length === 0 ? (
              <div className="border border-dashed rounded-lg p-6 text-center">
                <Zap className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  No automations configured. Add one to automate actions.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {automations.map((automation) => (
                  <AutomationRow
                    key={automation.id}
                    automation={automation}
                    stages={stages.filter((s) => s.enabled).map((s) => ({ id: s.id, name: s.name }))}
                    connectors={connectors}
                    onChange={handleUpdateAutomation}
                    onRemove={handleRemoveAutomation}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {isEditing ? "Update Pipeline" : "Create Pipeline"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
