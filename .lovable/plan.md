

# Add Automations to Workflow Creation

This plan adds an "Automations" section to the Workflow Builder Dialog, allowing users to configure automated triggers and actions that execute when specific events occur within the workflow.

---

## Overview

**Current State:**
- WorkflowBuilderDialog has fields for name, description, job type, status, and stages
- No automation configuration during workflow creation
- Connectors and event subscriptions exist separately in the Connectors tab

**Target State:**
- New "Automations" section in the WorkflowBuilderDialog
- Users can add automation rules during workflow creation
- Each automation has: trigger event, condition (optional), and action
- Automations are linked to connected systems (ATS, Messaging, Calendar, etc.)

---

## Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/orchestration/WorkflowBuilderDialog.tsx` | Modify | Add automations section with trigger/condition/action configuration |
| `src/lib/mockData.ts` | Modify | Add WorkflowAutomation interface and update Workflow type |

---

## Automations Section Design

Add a new collapsible section in the WorkflowBuilderDialog below the stages:

```text
+------------------------------------------------------------------+
|  Automations                                                      |
|  Configure automatic actions triggered by workflow events         |
+------------------------------------------------------------------+
|                                                                   |
|  [+ Add Automation]                                               |
|                                                                   |
|  +-------------------------------------------------------------+ |
|  | When: [Stage Completed v]   Stage: [Profile Screening v]    | |
|  | Condition: [AI Confidence < v] [0.7]          (optional)    | |
|  | Then: [Send Notification v]  To: [Slack Notifications v]    | |
|  |                                               [Remove]      | |
|  +-------------------------------------------------------------+ |
|                                                                   |
|  +-------------------------------------------------------------+ |
|  | When: [Candidate Matched v]                                 | |
|  | Condition: [Employer Tier = v] [Enterprise]   (optional)    | |
|  | Then: [Update External System v] To: [Greenhouse ATS v]     | |
|  |                                               [Remove]      | |
|  +-------------------------------------------------------------+ |
|                                                                   |
|  +-------------------------------------------------------------+ |
|  | When: [Offer Accepted v]                                    | |
|  | Condition: None                                             | |
|  | Then: [Generate Invoice v]  To: [Stripe Billing v]          | |
|  |                                               [Remove]      | |
|  +-------------------------------------------------------------+ |
|                                                                   |
+------------------------------------------------------------------+
```

---

## Automation Configuration Options

### Trigger Events (When)
| Trigger | Description |
|---------|-------------|
| `stage_entered` | Candidate enters a workflow stage |
| `stage_completed` | Candidate completes a workflow stage |
| `candidate_matched` | AI completes matching |
| `interview_scheduled` | Interview is booked |
| `offer_released` | Offer is sent to candidate |
| `offer_accepted` | Candidate accepts offer |
| `offer_rejected` | Candidate rejects offer |
| `sla_breach` | Stage SLA is breached |
| `candidate_response` | Candidate responds to outreach |

### Conditions (Optional)
| Field | Operators | Example Values |
|-------|-----------|----------------|
| `ai_confidence` | <, >, =, !=, <=, >= | 0.7, 0.85 |
| `employer_tier` | =, != | enterprise, mid-market, smb |
| `job_type` | =, != | frontline, professional, enterprise |
| `role_type` | =, != | nurse, doctor, paramedic |
| `stage_name` | = | Profile Screening, Interview |

### Actions (Then)
| Action | Target Systems |
|--------|----------------|
| `send_notification` | Slack, Email, SMS |
| `update_ats` | Greenhouse ATS |
| `sync_crm` | Salesforce CRM |
| `schedule_calendar` | Calendly |
| `send_message` | WhatsApp Business |
| `generate_invoice` | Stripe Billing |
| `create_hitl_task` | Internal HITL Queue |
| `trigger_webhook` | Custom Webhook |

---

## Data Model Extension

### WorkflowAutomation Interface

```text
interface WorkflowAutomation {
  id: string;
  trigger: AutomationTrigger;
  stageId?: string;  // For stage-specific triggers
  condition?: {
    field: string;
    operator: string;
    value: string | number;
  };
  action: AutomationAction;
  targetConnectorId: string;
  enabled: boolean;
}

type AutomationTrigger = 
  | "stage_entered"
  | "stage_completed"
  | "candidate_matched"
  | "interview_scheduled"
  | "offer_released"
  | "offer_accepted"
  | "offer_rejected"
  | "sla_breach"
  | "candidate_response";

type AutomationAction =
  | "send_notification"
  | "update_ats"
  | "sync_crm"
  | "schedule_calendar"
  | "send_message"
  | "generate_invoice"
  | "create_hitl_task"
  | "trigger_webhook";
```

### Updated Workflow Interface

Add automations array to the existing Workflow interface:

```text
interface Workflow {
  // ... existing fields
  automations?: WorkflowAutomation[];
}
```

---

## Component Implementation Details

### State Management

Add to WorkflowBuilderDialog:
```text
const [automations, setAutomations] = useState<AutomationConfig[]>([]);

interface AutomationConfig {
  id: string;
  trigger: string;
  stageId: string;
  hasCondition: boolean;
  conditionField: string;
  conditionOperator: string;
  conditionValue: string;
  action: string;
  targetConnectorId: string;
}
```

### Add Automation Handler
```text
const handleAddAutomation = () => {
  setAutomations(prev => [...prev, {
    id: `auto-${Date.now()}`,
    trigger: "stage_completed",
    stageId: "",
    hasCondition: false,
    conditionField: "",
    conditionOperator: "=",
    conditionValue: "",
    action: "send_notification",
    targetConnectorId: "",
  }]);
};
```

### Remove Automation Handler
```text
const handleRemoveAutomation = (id: string) => {
  setAutomations(prev => prev.filter(a => a.id !== id));
};
```

### Update Automation Handler
```text
const handleUpdateAutomation = (id: string, field: string, value: any) => {
  setAutomations(prev => prev.map(a => 
    a.id === id ? { ...a, [field]: value } : a
  ));
};
```

---

## UI Components Structure

### Automations Section
```text
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
      {automations.map(automation => (
        <AutomationRow 
          key={automation.id}
          automation={automation}
          stages={stages.filter(s => s.enabled)}
          connectors={connectors}
          onChange={handleUpdateAutomation}
          onRemove={handleRemoveAutomation}
        />
      ))}
    </div>
  )}
</div>
```

### Automation Row Component
Each automation row contains:
1. **Trigger Select**: When event occurs
2. **Stage Select**: Which stage (for stage-specific triggers)
3. **Condition Toggle**: Optional condition
4. **Condition Fields**: Field, operator, value
5. **Action Select**: What to do
6. **Connector Select**: Which system to target
7. **Remove Button**: Delete this automation

---

## Trigger & Action Definitions

### Trigger Options
```text
const triggerOptions = [
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
```

### Action Options
```text
const actionOptions = [
  { value: "send_notification", label: "Send Notification", connectorTypes: ["webhook"] },
  { value: "update_ats", label: "Update ATS", connectorTypes: ["ats"] },
  { value: "sync_crm", label: "Sync to CRM", connectorTypes: ["crm"] },
  { value: "schedule_calendar", label: "Create Calendar Event", connectorTypes: ["calendar"] },
  { value: "send_message", label: "Send Message", connectorTypes: ["messaging"] },
  { value: "generate_invoice", label: "Generate Invoice", connectorTypes: ["billing"] },
  { value: "create_hitl_task", label: "Create HITL Task", connectorTypes: [] },
  { value: "trigger_webhook", label: "Trigger Webhook", connectorTypes: ["webhook"] },
];
```

### Condition Field Options
```text
const conditionFields = [
  { value: "ai_confidence", label: "AI Confidence", type: "number" },
  { value: "employer_tier", label: "Employer Tier", type: "select", options: ["enterprise", "mid-market", "smb"] },
  { value: "job_type", label: "Job Type", type: "select", options: ["frontline", "professional", "enterprise"] },
  { value: "role_type", label: "Role Type", type: "select", options: ["nurse", "doctor", "paramedic", "technician"] },
  { value: "candidate_status", label: "Candidate Status", type: "select", options: ["active", "passive", "withdrawn"] },
];
```

---

## Files to Modify

### 1. `src/lib/mockData.ts`
- Add `WorkflowAutomation` interface
- Add `AutomationTrigger` and `AutomationAction` types
- Add `automations` field to `Workflow` interface
- Add sample automations to existing workflows

### 2. `src/components/orchestration/WorkflowBuilderDialog.tsx`
- Import connectors from mockData
- Add automations state management
- Add automations section UI below stages
- Include automation row components with trigger/condition/action selects
- Update handleSave to include automations in workflow data
- Update useEffect to load automations when editing

---

## Sample Automations for Existing Workflows

Add to Frontline Hiring workflow:
```text
automations: [
  {
    id: "auto-001",
    trigger: "stage_completed",
    stageId: "s1",
    condition: { field: "ai_confidence", operator: "<", value: 0.7 },
    action: "create_hitl_task",
    targetConnectorId: "",
    enabled: true,
  },
  {
    id: "auto-002",
    trigger: "interview_scheduled",
    action: "update_ats",
    targetConnectorId: "conn-001",
    enabled: true,
  },
  {
    id: "auto-003",
    trigger: "offer_accepted",
    action: "generate_invoice",
    targetConnectorId: "conn-006",
    enabled: true,
  },
]
```

---

## Visual Indicators

- Automation count badge on workflow cards
- Green check for active automations
- Yellow pause for disabled automations
- Error indicator for automations targeting disconnected connectors

---

## Success Criteria

- WorkflowBuilderDialog shows "Automations" section below stages
- Users can add multiple automations with trigger/condition/action
- Conditions are optional and can be toggled
- Actions filter available connectors by type
- Stage-specific triggers show stage dropdown
- Automations save with workflow and load when editing
- Empty state shows when no automations configured
- Validation warns if targeting disconnected connector

