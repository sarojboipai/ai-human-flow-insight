export interface WorkflowNodeData extends Record<string, unknown> {
  label: string;
  subtitle?: string;
  description?: string;
  nodeCategory: "trigger" | "stage" | "condition" | "action" | "output";
  
  // Visual customization
  icon?: string;
  iconColor?: string;
  
  // Metadata for display
  metadata?: Record<string, string>;
  
  // Condition-specific
  conditions?: {
    qualified: string;
    knockout: string;
  };
  
  // Action-specific
  actionType?: "update_status" | "message" | "notification" | "send" | "sync";
  status?: string;
  
  // Output-specific
  outcome?: "positive" | "negative" | "neutral";
  hasExternalLink?: boolean;
  
  // Legacy compatibility
  stageType?: "ai" | "automation" | "human" | "decision" | "entry" | "exit";
  agentId?: string;
  humanRole?: string;
  slaHours?: number;
  
  // UI state
  isSelected?: boolean;
  onDelete?: () => void;
  onSelect?: () => void;
}
