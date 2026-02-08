import { useState, useCallback } from "react";
import {
  Shield,
  Plus,
  Filter,
  Check,
  X,
  AlertCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Scale,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RulesTable } from "@/components/hitl/RulesTable";
import {
  HITLRuleV2,
  RuleType,
  HiringStage,
  ActionType,
  TargetQueue,
  agents,
} from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { type Node } from "@xyflow/react";
import { type StageNodeData } from "@/components/orchestration/WorkflowTab";

interface RulesTabProps {
  nodes: Node<StageNodeData>[];
  templateRules: HITLRuleV2[];
  onRulesChange: (rules: HITLRuleV2[]) => void;
  onDirtyChange: () => void;
}

const RULE_CATEGORIES: { id: RuleType | "all"; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All Rules", icon: <Shield className="h-4 w-4" /> },
  { id: "confidence", label: "Confidence", icon: <TrendingUp className="h-4 w-4" /> },
  { id: "business", label: "Business", icon: <DollarSign className="h-4 w-4" /> },
  { id: "sla", label: "SLA", icon: <Clock className="h-4 w-4" /> },
  { id: "anomaly", label: "Anomaly", icon: <AlertCircle className="h-4 w-4" /> },
  { id: "posting", label: "Job Posting", icon: <Scale className="h-4 w-4" /> },
  { id: "sourcing", label: "Sourcing", icon: <Scale className="h-4 w-4" /> },
  { id: "screening", label: "Screening", icon: <Scale className="h-4 w-4" /> },
];

const CONDITION_METRICS = [
  { value: "ai_confidence", label: "AI Confidence" },
  { value: "time_in_stage", label: "Time in Stage (hrs)" },
  { value: "candidate_volume", label: "Candidate Volume" },
  { value: "rejection_rate", label: "Rejection Rate (%)" },
  { value: "response_rate", label: "Response Rate (%)" },
  { value: "no_show_rate", label: "No-show Rate (%)" },
  { value: "cost_per_hire", label: "Cost per Hire" },
  { value: "seo_score", label: "SEO Score (out of 100)" },
];

const OPERATORS: { value: HITLRuleV2["operator"]; label: string }[] = [
  { value: "<", label: "Less than" },
  { value: "<=", label: "Less than or equal" },
  { value: ">", label: "Greater than" },
  { value: ">=", label: "Greater than or equal" },
  { value: "=", label: "Equals" },
];

const ACTION_TYPES: { value: ActionType; label: string }[] = [
  { value: "route_to_queue", label: "Route to Queue" },
  { value: "escalate", label: "Escalate" },
  { value: "alert", label: "Send Alert" },
  { value: "route_to_ai_agent", label: "Route to AI Agent" },
  { value: "trigger_automation", label: "Trigger Automation" },
  { value: "block", label: "Block" },
  { value: "retry_with_fallback", label: "Retry with Fallback" },
];

const TARGET_QUEUES: { value: TargetQueue; label: string }[] = [
  { value: "recruiter_review", label: "Recruiter Review" },
  { value: "ops_escalation", label: "Ops Escalation" },
  { value: "enterprise_priority", label: "Enterprise Priority" },
  { value: "content_hitl", label: "Content HITL" },
  { value: "ops_admin_hitl", label: "Ops Admin HITL" },
  { value: "compliance_hitl", label: "Compliance HITL" },
  { value: "qa_hitl", label: "QA HITL" },
];

export function RulesTab({
  nodes,
  templateRules,
  onRulesChange,
  onDirtyChange,
}: RulesTabProps) {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<RuleType | "all">("all");
  const [selectedStage, setSelectedStage] = useState<HiringStage | "all">("all");
  const [editingRule, setEditingRule] = useState<HITLRuleV2 | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Filter rules
  const filteredRules = templateRules.filter((rule) => {
    const matchesCategory = selectedCategory === "all" || rule.ruleType === selectedCategory;
    const matchesStage = selectedStage === "all" || rule.stage === selectedStage;
    return matchesCategory && matchesStage;
  });

  // Get stages from workflow nodes
  const workflowStages = nodes
    .filter((n) => !["entry", "exit"].includes(n.data.stageType))
    .map((n) => ({ id: n.id, label: n.data.label }));

  const handleEdit = useCallback((rule: HITLRuleV2) => {
    setEditingRule(rule);
    setIsCreating(false);
  }, []);

  const handleDelete = useCallback(
    (ruleId: string) => {
      onRulesChange(templateRules.filter((r) => r.id !== ruleId));
      onDirtyChange();
    },
    [templateRules, onRulesChange, onDirtyChange]
  );

  const handleToggleStatus = useCallback(
    (ruleId: string, newStatus: "active" | "paused") => {
      onRulesChange(
        templateRules.map((r) => (r.id === ruleId ? { ...r, status: newStatus } : r))
      );
      onDirtyChange();
    },
    [templateRules, onRulesChange, onDirtyChange]
  );

  const handleSimulate = useCallback(
    (rule: HITLRuleV2) => {
      toast({
        title: "Rule Simulation",
        description: `Simulating "${rule.name}" with historical data...`,
      });
    },
    [toast]
  );

  const handleSaveRule = useCallback(() => {
    if (!editingRule) return;

    if (isCreating) {
      onRulesChange([...templateRules, editingRule]);
    } else {
      onRulesChange(
        templateRules.map((r) => (r.id === editingRule.id ? editingRule : r))
      );
    }
    setEditingRule(null);
    setIsCreating(false);
    onDirtyChange();
    toast({
      title: isCreating ? "Rule Created" : "Rule Updated",
      description: `"${editingRule.name}" has been saved.`,
    });
  }, [editingRule, isCreating, templateRules, onRulesChange, onDirtyChange, toast]);

  const handleCreateNew = useCallback(() => {
    const now = new Date().toISOString();
    const newRule: HITLRuleV2 = {
      id: `rule-${Date.now()}`,
      name: "New Rule",
      description: "Configure this rule",
      ruleType: "confidence",
      stage: "cross_stage",
      conditionMetric: "ai_confidence",
      operator: "<",
      thresholdValue: "70%",
      actionType: "route_to_queue",
      targetQueue: "recruiter_review",
      priority: 3,
      status: "paused",
      triggerCount: 0,
      lastTriggered: null,
      createdAt: now,
      updatedAt: now,
      createdBy: "Current User",
      version: 1,
    };
    setEditingRule(newRule);
    setIsCreating(true);
  }, []);

  const updateEditingRule = (field: keyof HITLRuleV2, value: any) => {
    if (editingRule) {
      setEditingRule({ ...editingRule, [field]: value });
    }
  };

  return (
    <div className="flex-1 flex min-h-0">
      {/* Left Panel - Rule Categories */}
      <div className="w-52 border-r bg-muted/30 flex flex-col">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            Categories
          </h3>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-3 space-y-1">
            {RULE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                {cat.id !== "all" && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {templateRules.filter((r) => r.ruleType === cat.id).length}
                  </Badge>
                )}
              </button>
            ))}

            <Separator className="my-3" />

            <p className="text-xs font-medium text-muted-foreground px-3 mb-2">
              By Stage
            </p>
            <button
              onClick={() => setSelectedStage("all")}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedStage === "all" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              All Stages
            </button>
            {workflowStages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id as HiringStage)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors truncate ${
                  selectedStage === stage.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {stage.label}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content - Rules Table */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Routing Rules</h2>
              <p className="text-sm text-muted-foreground">
                Configure escalation and governance rules for this template
              </p>
            </div>
            <Button onClick={handleCreateNew} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>

          <RulesTable
            rules={filteredRules}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            onSimulate={handleSimulate}
          />
        </div>
      </div>

      {/* Right Panel - Rule Builder */}
      <div className="w-80 border-l bg-muted/30 flex flex-col">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            {editingRule
              ? isCreating
                ? "Create Rule"
                : "Edit Rule"
              : "Rule Builder"}
          </h3>
        </div>

        {editingRule ? (
          <>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {/* Rule Name */}
                <div className="space-y-2">
                  <Label>Rule Name</Label>
                  <Input
                    value={editingRule.name}
                    onChange={(e) => updateEditingRule("name", e.target.value)}
                    placeholder="Enter rule name"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    value={editingRule.description}
                    onChange={(e) => updateEditingRule("description", e.target.value)}
                    placeholder="What does this rule do?"
                  />
                </div>

                <Separator />

                {/* Rule Type */}
                <div className="space-y-2">
                  <Label>Rule Type</Label>
                  <Select
                    value={editingRule.ruleType}
                    onValueChange={(value) => updateEditingRule("ruleType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {RULE_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Stage */}
                <div className="space-y-2">
                  <Label>Stage</Label>
                  <Select
                    value={editingRule.stage}
                    onValueChange={(value) => updateEditingRule("stage", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cross_stage">Cross-Stage</SelectItem>
                      {workflowStages.map((stage) => (
                        <SelectItem key={stage.id} value={stage.id}>
                          {stage.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Condition */}
                <div className="space-y-3">
                  <Label>Condition</Label>
                  <div className="space-y-2">
                    <Select
                      value={editingRule.conditionMetric}
                      onValueChange={(value) => updateEditingRule("conditionMetric", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select metric" />
                      </SelectTrigger>
                      <SelectContent>
                        {CONDITION_METRICS.map((m) => (
                          <SelectItem key={m.value} value={m.value}>
                            {m.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="flex gap-2">
                      <Select
                        value={editingRule.operator}
                        onValueChange={(value) => updateEditingRule("operator", value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {OPERATORS.map((op) => (
                            <SelectItem key={op.value} value={op.value}>
                              {op.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Input
                        value={String(editingRule.thresholdValue)}
                        onChange={(e) => updateEditingRule("thresholdValue", e.target.value)}
                        placeholder="Value"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Action */}
                <div className="space-y-3">
                  <Label>Action</Label>
                  <Select
                    value={editingRule.actionType}
                    onValueChange={(value) => updateEditingRule("actionType", value)}
                  >
                    <SelectTrigger>
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

                  {/* Target Queue */}
                  <Select
                    value={editingRule.targetQueue}
                    onValueChange={(value) => updateEditingRule("targetQueue", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select target queue" />
                    </SelectTrigger>
                    <SelectContent>
                      {TARGET_QUEUES.map((queue) => (
                        <SelectItem key={queue.value} value={queue.value}>
                          {queue.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Priority */}
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={String(editingRule.priority)}
                    onValueChange={(value) => updateEditingRule("priority", parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">P1 - Critical</SelectItem>
                      <SelectItem value="2">P2 - High</SelectItem>
                      <SelectItem value="3">P3 - Medium</SelectItem>
                      <SelectItem value="4">P4 - Low</SelectItem>
                      <SelectItem value="5">P5 - Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </ScrollArea>

            {/* Action Buttons */}
            <div className="p-4 border-t flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingRule(null);
                  setIsCreating(false);
                }}
                className="flex-1"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSaveRule} className="flex-1">
                <Check className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                Select a rule to edit or create a new one
              </p>
              <Button onClick={handleCreateNew} variant="outline" className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Create Rule
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
