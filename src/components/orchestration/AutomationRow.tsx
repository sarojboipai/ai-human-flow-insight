import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { Connector } from "@/lib/mockData";

export interface AutomationConfig {
  id: string;
  trigger: string;
  stageId: string;
  hasCondition: boolean;
  conditionField: string;
  conditionOperator: string;
  conditionValue: string;
  action: string;
  targetConnectorId: string;
  enabled: boolean;
}

interface StageOption {
  id: string;
  name: string;
}

interface AutomationRowProps {
  automation: AutomationConfig;
  stages: StageOption[];
  connectors: Connector[];
  onChange: (id: string, field: string, value: string | boolean) => void;
  onRemove: (id: string) => void;
}

export const triggerOptions = [
  { value: "stage_entered", label: "Stage Entered", requiresStage: true },
  { value: "stage_completed", label: "Stage Completed", requiresStage: true },
  { value: "candidate_matched", label: "Candidate Matched", requiresStage: false },
  { value: "interview_scheduled", label: "Interview Scheduled", requiresStage: false },
  { value: "offer_released", label: "Offer Released", requiresStage: false },
  { value: "offer_accepted", label: "Offer Accepted", requiresStage: false },
  { value: "offer_rejected", label: "Offer Rejected", requiresStage: false },
  { value: "sla_breach", label: "SLA Breach", requiresStage: true },
  { value: "candidate_response", label: "Candidate Response", requiresStage: false },
];

export const actionOptions = [
  { value: "send_notification", label: "Send Notification", connectorTypes: ["webhook"] },
  { value: "update_ats", label: "Update ATS", connectorTypes: ["ats"] },
  { value: "sync_crm", label: "Sync to CRM", connectorTypes: ["crm"] },
  { value: "schedule_calendar", label: "Create Calendar Event", connectorTypes: ["calendar"] },
  { value: "send_message", label: "Send Message", connectorTypes: ["messaging"] },
  { value: "generate_invoice", label: "Generate Invoice", connectorTypes: ["billing"] },
  { value: "create_hitl_task", label: "Create HITL Task", connectorTypes: [] },
  { value: "trigger_webhook", label: "Trigger Webhook", connectorTypes: ["webhook"] },
];

export const conditionFields = [
  { value: "ai_confidence", label: "AI Confidence", type: "number" },
  { value: "employer_tier", label: "Employer Tier", type: "select", options: ["enterprise", "mid-market", "smb"] },
  { value: "job_type", label: "Job Type", type: "select", options: ["frontline", "professional", "enterprise"] },
  { value: "role_type", label: "Role Type", type: "select", options: ["nurse", "doctor", "paramedic", "technician"] },
  { value: "candidate_status", label: "Candidate Status", type: "select", options: ["active", "passive", "withdrawn"] },
];

export const conditionOperators = [
  { value: "<", label: "<" },
  { value: "<=", label: "≤" },
  { value: "=", label: "=" },
  { value: "!=", label: "≠" },
  { value: ">", label: ">" },
  { value: ">=", label: "≥" },
];

export function AutomationRow({
  automation,
  stages,
  connectors,
  onChange,
  onRemove,
}: AutomationRowProps) {
  const selectedTrigger = triggerOptions.find((t) => t.value === automation.trigger);
  const selectedAction = actionOptions.find((a) => a.value === automation.action);
  const selectedConditionField = conditionFields.find((f) => f.value === automation.conditionField);
  
  // Filter connectors based on selected action
  const availableConnectors = selectedAction?.connectorTypes.length
    ? connectors.filter((c) => selectedAction.connectorTypes.includes(c.type) && c.status === "connected")
    : [];

  return (
    <div className="border rounded-lg p-4 space-y-3 bg-muted/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Switch
            checked={automation.enabled}
            onCheckedChange={(checked) => onChange(automation.id, "enabled", checked)}
          />
          <span className="text-sm text-muted-foreground">
            {automation.enabled ? "Active" : "Disabled"}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={() => onRemove(automation.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Trigger Row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium w-12">When</span>
        <Select
          value={automation.trigger}
          onValueChange={(v) => onChange(automation.id, "trigger", v)}
        >
          <SelectTrigger className="w-44 h-8">
            <SelectValue placeholder="Select trigger" />
          </SelectTrigger>
          <SelectContent>
            {triggerOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedTrigger?.requiresStage && stages.length > 0 && (
          <>
            <span className="text-sm text-muted-foreground">at</span>
            <Select
              value={automation.stageId}
              onValueChange={(v) => onChange(automation.id, "stageId", v)}
            >
              <SelectTrigger className="w-40 h-8">
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                {stages.map((stage) => (
                  <SelectItem key={stage.id} value={stage.id}>
                    {stage.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
      </div>

      {/* Condition Row (Optional) */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium w-12">If</span>
        <Switch
          checked={automation.hasCondition}
          onCheckedChange={(checked) => onChange(automation.id, "hasCondition", checked)}
        />
        {automation.hasCondition ? (
          <>
            <Select
              value={automation.conditionField}
              onValueChange={(v) => onChange(automation.id, "conditionField", v)}
            >
              <SelectTrigger className="w-36 h-8">
                <SelectValue placeholder="Field" />
              </SelectTrigger>
              <SelectContent>
                {conditionFields.map((field) => (
                  <SelectItem key={field.value} value={field.value}>
                    {field.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={automation.conditionOperator}
              onValueChange={(v) => onChange(automation.id, "conditionOperator", v)}
            >
              <SelectTrigger className="w-16 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {conditionOperators.map((op) => (
                  <SelectItem key={op.value} value={op.value}>
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedConditionField?.type === "select" ? (
              <Select
                value={automation.conditionValue}
                onValueChange={(v) => onChange(automation.id, "conditionValue", v)}
              >
                <SelectTrigger className="w-32 h-8">
                  <SelectValue placeholder="Value" />
                </SelectTrigger>
                <SelectContent>
                  {selectedConditionField.options?.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type="number"
                step="0.01"
                value={automation.conditionValue}
                onChange={(e) => onChange(automation.id, "conditionValue", e.target.value)}
                placeholder="Value"
                className="w-24 h-8"
              />
            )}
          </>
        ) : (
          <span className="text-sm text-muted-foreground">No condition (always trigger)</span>
        )}
      </div>

      {/* Action Row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium w-12">Then</span>
        <Select
          value={automation.action}
          onValueChange={(v) => onChange(automation.id, "action", v)}
        >
          <SelectTrigger className="w-44 h-8">
            <SelectValue placeholder="Select action" />
          </SelectTrigger>
          <SelectContent>
            {actionOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedAction?.connectorTypes.length ? (
          <>
            <span className="text-sm text-muted-foreground">via</span>
            <Select
              value={automation.targetConnectorId}
              onValueChange={(v) => onChange(automation.id, "targetConnectorId", v)}
            >
              <SelectTrigger className="w-44 h-8">
                <SelectValue placeholder="Select connector" />
              </SelectTrigger>
              <SelectContent>
                {availableConnectors.length > 0 ? (
                  availableConnectors.map((conn) => (
                    <SelectItem key={conn.id} value={conn.id}>
                      {conn.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    No connectors available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </>
        ) : null}
      </div>
    </div>
  );
}
