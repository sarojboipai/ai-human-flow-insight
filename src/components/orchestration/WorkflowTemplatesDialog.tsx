import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Bot, Zap, Briefcase, FileText } from "lucide-react";
import { Workflow, WorkflowStage } from "@/lib/mockData";

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  jobType: Workflow["jobType"];
  stages: WorkflowStage[];
  characteristics: string[];
  icon: React.ReactNode;
}

interface WorkflowTemplatesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate: (template: WorkflowTemplate) => void;
}

const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: "template-frontline",
    name: "Frontline Hiring",
    description: "Standard workflow for nurse and paramedic positions",
    jobType: "frontline",
    characteristics: ["6 stages", "High automation", "AI-first approach"],
    icon: <Zap className="h-5 w-5 text-primary" />,
    stages: [
      { id: "s1", name: "Profile Screening", type: "intake", assignedActor: "ai", agentId: "agent-001", humanBackup: "Screening Team", slaHours: 4, retryPolicy: { maxRetries: 3, backoffMinutes: 15 } },
      { id: "s2", name: "Skills Matching", type: "match", assignedActor: "ai", agentId: "agent-002", humanBackup: "Technical Recruiters", slaHours: 2, retryPolicy: { maxRetries: 2, backoffMinutes: 10 } },
      { id: "s3", name: "Initial Outreach", type: "outreach", assignedActor: "hybrid", agentId: "agent-003", humanBackup: "Recruiter Team", slaHours: 24, retryPolicy: { maxRetries: 5, backoffMinutes: 60 } },
      { id: "s4", name: "Interview Scheduling", type: "interview", assignedActor: "hybrid", agentId: "agent-004", humanBackup: "Coordination Team", slaHours: 48, retryPolicy: { maxRetries: 3, backoffMinutes: 120 } },
      { id: "s5", name: "Offer Process", type: "offer", assignedActor: "human", agentId: null, humanBackup: "Senior Recruiters", slaHours: 72, retryPolicy: { maxRetries: 2, backoffMinutes: 240 } },
      { id: "s6", name: "Onboarding", type: "join", assignedActor: "hybrid", agentId: "agent-007", humanBackup: "Onboarding Team", slaHours: 168, retryPolicy: { maxRetries: 1, backoffMinutes: 480 } },
    ],
  },
  {
    id: "template-professional",
    name: "Professional Hiring",
    description: "Balanced workflow for mid-level clinical roles",
    jobType: "professional",
    characteristics: ["6 stages", "Hybrid approach", "Human checkpoints"],
    icon: <Briefcase className="h-5 w-5 text-amber-500" />,
    stages: [
      { id: "s1", name: "Profile Screening", type: "intake", assignedActor: "hybrid", agentId: "agent-001", humanBackup: "Screening Team", slaHours: 6, retryPolicy: { maxRetries: 2, backoffMinutes: 20 } },
      { id: "s2", name: "Skills Assessment", type: "match", assignedActor: "hybrid", agentId: "agent-002", humanBackup: "Technical Team", slaHours: 8, retryPolicy: { maxRetries: 2, backoffMinutes: 30 } },
      { id: "s3", name: "Recruiter Outreach", type: "outreach", assignedActor: "hybrid", agentId: "agent-003", humanBackup: "Recruiters", slaHours: 36, retryPolicy: { maxRetries: 4, backoffMinutes: 90 } },
      { id: "s4", name: "Interview Scheduling", type: "interview", assignedActor: "hybrid", agentId: "agent-004", humanBackup: "Coordination Team", slaHours: 72, retryPolicy: { maxRetries: 3, backoffMinutes: 120 } },
      { id: "s5", name: "Offer Negotiation", type: "offer", assignedActor: "human", agentId: null, humanBackup: "Senior Recruiters", slaHours: 96, retryPolicy: { maxRetries: 2, backoffMinutes: 240 } },
      { id: "s6", name: "Onboarding", type: "join", assignedActor: "hybrid", agentId: "agent-007", humanBackup: "HR Team", slaHours: 168, retryPolicy: { maxRetries: 1, backoffMinutes: 480 } },
    ],
  },
  {
    id: "template-enterprise",
    name: "Enterprise Hiring",
    description: "Premium workflow for senior physician roles",
    jobType: "enterprise",
    characteristics: ["6 stages", "Human-heavy", "Mandatory approvals"],
    icon: <Users className="h-5 w-5 text-purple-500" />,
    stages: [
      { id: "s1", name: "Profile Screening", type: "intake", assignedActor: "hybrid", agentId: "agent-001", humanBackup: "Senior Screening", slaHours: 8, retryPolicy: { maxRetries: 2, backoffMinutes: 30 } },
      { id: "s2", name: "Credential Verification", type: "match", assignedActor: "human", agentId: "agent-005", humanBackup: "Compliance Team", slaHours: 24, retryPolicy: { maxRetries: 2, backoffMinutes: 60 } },
      { id: "s3", name: "Personal Outreach", type: "outreach", assignedActor: "human", agentId: null, humanBackup: "Senior Recruiters", slaHours: 48, retryPolicy: { maxRetries: 3, backoffMinutes: 120 } },
      { id: "s4", name: "Multi-Panel Interview", type: "interview", assignedActor: "human", agentId: null, humanBackup: "Interview Panel", slaHours: 96, retryPolicy: { maxRetries: 2, backoffMinutes: 240 } },
      { id: "s5", name: "Offer Negotiation", type: "offer", assignedActor: "human", agentId: null, humanBackup: "Executive Team", slaHours: 120, retryPolicy: { maxRetries: 3, backoffMinutes: 480 } },
      { id: "s6", name: "Executive Onboarding", type: "join", assignedActor: "human", agentId: null, humanBackup: "HR Director", slaHours: 336, retryPolicy: { maxRetries: 1, backoffMinutes: 720 } },
    ],
  },
  {
    id: "template-bulk",
    name: "Bulk Hiring",
    description: "High-volume workflow for rapid bulk placements",
    jobType: "frontline",
    characteristics: ["6 stages", "Maximum automation", "Fast processing"],
    icon: <Bot className="h-5 w-5 text-emerald-500" />,
    stages: [
      { id: "s1", name: "Bulk Screening", type: "intake", assignedActor: "ai", agentId: "agent-001", humanBackup: "Screening Team", slaHours: 2, retryPolicy: { maxRetries: 5, backoffMinutes: 10 } },
      { id: "s2", name: "Auto Matching", type: "match", assignedActor: "ai", agentId: "agent-002", humanBackup: "Technical Team", slaHours: 1, retryPolicy: { maxRetries: 3, backoffMinutes: 5 } },
      { id: "s3", name: "Batch Outreach", type: "outreach", assignedActor: "ai", agentId: "agent-003", humanBackup: "Recruiter Team", slaHours: 12, retryPolicy: { maxRetries: 7, backoffMinutes: 30 } },
      { id: "s4", name: "Group Interview", type: "interview", assignedActor: "hybrid", agentId: "agent-004", humanBackup: "Coordination Team", slaHours: 24, retryPolicy: { maxRetries: 2, backoffMinutes: 60 } },
      { id: "s5", name: "Standard Offer", type: "offer", assignedActor: "ai", agentId: null, humanBackup: "Recruiters", slaHours: 24, retryPolicy: { maxRetries: 2, backoffMinutes: 120 } },
      { id: "s6", name: "Fast Onboarding", type: "join", assignedActor: "hybrid", agentId: "agent-007", humanBackup: "Onboarding Team", slaHours: 72, retryPolicy: { maxRetries: 1, backoffMinutes: 240 } },
    ],
  },
  {
    id: "template-blank",
    name: "Blank Workflow",
    description: "Start from scratch with no pre-defined stages",
    jobType: "frontline",
    characteristics: ["0 stages", "Custom configuration"],
    icon: <FileText className="h-5 w-5 text-muted-foreground" />,
    stages: [],
  },
];

export function WorkflowTemplatesDialog({
  open,
  onOpenChange,
  onSelectTemplate,
}: WorkflowTemplatesDialogProps) {
  const handleSelect = (template: WorkflowTemplate) => {
    onSelectTemplate(template);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Workflow Templates</DialogTitle>
          <DialogDescription>
            Choose a template to start with. You can customize after selection.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {WORKFLOW_TEMPLATES.map((template) => (
            <Card
              key={template.id}
              className="hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => handleSelect(template)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    {template.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold">{template.name}</h4>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(template);
                        }}
                      >
                        Use This
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {template.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {template.characteristics.map((char, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {char}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export type { WorkflowTemplate };
