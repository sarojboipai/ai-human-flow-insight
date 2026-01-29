import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HITLRuleV2,
  RuleType,
  OperatorType,
  ActionType,
  TargetQueue,
  RuleStatus,
  conditionMetrics,
  operators,
  actionTypes,
  targetQueues,
} from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface RuleBuilderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rule?: HITLRuleV2 | null;
  onSave: (rule: Partial<HITLRuleV2>) => void;
}

const ruleTypes: { value: RuleType; label: string }[] = [
  { value: "confidence", label: "Confidence Based" },
  { value: "business", label: "Business Critical" },
  { value: "anomaly", label: "Anomaly Based" },
  { value: "sla", label: "SLA Based" },
];

const priorities: { value: 1 | 2 | 3 | 4 | 5; label: string }[] = [
  { value: 1, label: "1 (Highest)" },
  { value: 2, label: "2 (High)" },
  { value: 3, label: "3 (Medium)" },
  { value: 4, label: "4 (Low)" },
  { value: 5, label: "5 (Lowest)" },
];

const statuses: { value: RuleStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "draft", label: "Draft" },
];

export function RuleBuilderDialog({
  open,
  onOpenChange,
  rule,
  onSave,
}: RuleBuilderDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ruleType: "confidence" as RuleType,
    conditionMetric: "",
    operator: "<" as OperatorType,
    thresholdValue: "",
    actionType: "route_to_queue" as ActionType,
    targetQueue: "recruiter_review" as TargetQueue,
    priority: 2 as 1 | 2 | 3 | 4 | 5,
    status: "active" as RuleStatus,
  });

  useEffect(() => {
    if (rule) {
      setFormData({
        name: rule.name,
        description: rule.description,
        ruleType: rule.ruleType,
        conditionMetric: rule.conditionMetric,
        operator: rule.operator,
        thresholdValue: String(rule.thresholdValue),
        actionType: rule.actionType,
        targetQueue: rule.targetQueue,
        priority: rule.priority,
        status: rule.status,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        ruleType: "confidence",
        conditionMetric: conditionMetrics["confidence"][0]?.value || "",
        operator: "<",
        thresholdValue: "",
        actionType: "route_to_queue",
        targetQueue: "recruiter_review",
        priority: 2,
        status: "active",
      });
    }
  }, [rule, open]);

  useEffect(() => {
    if (!rule) {
      const metrics = conditionMetrics[formData.ruleType];
      if (metrics && metrics.length > 0) {
        setFormData((prev) => ({
          ...prev,
          conditionMetric: metrics[0].value,
        }));
      }
    }
  }, [formData.ruleType, rule]);

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Rule name is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.thresholdValue) {
      toast({
        title: "Validation Error",
        description: "Threshold value is required",
        variant: "destructive",
      });
      return;
    }

    const thresholdValue =
      formData.ruleType === "business"
        ? formData.thresholdValue
        : parseFloat(formData.thresholdValue);

    onSave({
      ...formData,
      thresholdValue,
      id: rule?.id,
    });

    toast({
      title: rule ? "Rule Updated" : "Rule Created",
      description: `"${formData.name}" has been ${rule ? "updated" : "created"} successfully.`,
    });

    onOpenChange(false);
  };

  const availableMetrics = conditionMetrics[formData.ruleType] || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {rule ? "Edit HITL Rule" : "Create HITL Rule"}
          </DialogTitle>
          <DialogDescription>
            Define conditions that trigger human review of AI decisions.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Rule Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Rule Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., Low AI Confidence"
              className="bg-background"
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe when this rule should trigger..."
              className="bg-background resize-none"
              rows={2}
            />
          </div>

          {/* Rule Type */}
          <div className="grid gap-2">
            <Label>Rule Type</Label>
            <Select
              value={formData.ruleType}
              onValueChange={(value: RuleType) =>
                setFormData({ ...formData, ruleType: value })
              }
            >
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {ruleTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Condition Builder */}
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <Label className="text-sm font-medium mb-3 block">
              Condition Builder
            </Label>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-primary">IF</span>
              <Select
                value={formData.conditionMetric}
                onValueChange={(value) =>
                  setFormData({ ...formData, conditionMetric: value })
                }
              >
                <SelectTrigger className="w-[180px] bg-background">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {availableMetrics.map((metric) => (
                    <SelectItem key={metric.value} value={metric.value}>
                      {metric.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={formData.operator}
                onValueChange={(value: OperatorType) =>
                  setFormData({ ...formData, operator: value })
                }
              >
                <SelectTrigger className="w-[140px] bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {operators.map((op) => (
                    <SelectItem key={op.value} value={op.value}>
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                value={formData.thresholdValue}
                onChange={(e) =>
                  setFormData({ ...formData, thresholdValue: e.target.value })
                }
                placeholder="Value"
                className="w-[120px] bg-background"
              />
            </div>
          </div>

          {/* Action */}
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <Label className="text-sm font-medium mb-3 block">Action</Label>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-primary">THEN</span>
              <Select
                value={formData.actionType}
                onValueChange={(value: ActionType) =>
                  setFormData({ ...formData, actionType: value })
                }
              >
                <SelectTrigger className="w-[160px] bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {actionTypes.map((action) => (
                    <SelectItem key={action.value} value={action.value}>
                      {action.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.actionType === "route_to_queue" && (
                <>
                  <span className="text-sm text-muted-foreground">to</span>
                  <Select
                    value={formData.targetQueue}
                    onValueChange={(value: TargetQueue) =>
                      setFormData({ ...formData, targetQueue: value })
                    }
                  >
                    <SelectTrigger className="w-[200px] bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {targetQueues.map((queue) => (
                        <SelectItem key={queue.value} value={queue.value}>
                          {queue.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
          </div>

          {/* Priority and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Priority</Label>
              <Select
                value={String(formData.priority)}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    priority: parseInt(value) as 1 | 2 | 3 | 4 | 5,
                  })
                }
              >
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {priorities.map((p) => (
                    <SelectItem key={p.value} value={String(p.value)}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: RuleStatus) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {statuses.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {rule ? "Update Rule" : "Create Rule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
