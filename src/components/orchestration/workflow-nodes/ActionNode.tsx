import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { CheckSquare, MessageSquare, Send, Bell, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkflowNodeData } from "./types";

const actionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  update_status: CheckSquare,
  message: MessageSquare,
  notification: Bell,
  send: Send,
  sync: RefreshCw,
};

const actionColors: Record<string, { bg: string; icon: string }> = {
  update_status: { bg: "bg-emerald-100", icon: "text-emerald-600" },
  message: { bg: "bg-blue-100", icon: "text-blue-600" },
  notification: { bg: "bg-violet-100", icon: "text-violet-600" },
  send: { bg: "bg-teal-100", icon: "text-teal-600" },
  sync: { bg: "bg-amber-100", icon: "text-amber-600" },
};

export const ActionNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as WorkflowNodeData;
  const actionType = nodeData.actionType || "update_status";
  const Icon = actionIcons[actionType] || CheckSquare;
  const colors = actionColors[actionType] || actionColors.update_status;

  return (
    <div
      className={cn(
        "min-w-[260px] rounded-xl border bg-card shadow-sm transition-all duration-200",
        selected && "ring-2 ring-primary shadow-md",
        "hover:shadow-md"
      )}
      onClick={nodeData.onSelect}
    >
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-muted-foreground !border-2 !border-background"
      />

      <div className="flex items-start gap-3 p-4">
        {/* Icon */}
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", colors.bg)}>
          <Icon className={cn("h-5 w-5", colors.icon)} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-foreground">{nodeData.label}</div>
          {nodeData.metadata && Object.keys(nodeData.metadata).length > 0 && (
            <div className="mt-1.5 space-y-0.5">
              {Object.entries(nodeData.metadata).map(([key, value]) => (
                <div key={key} className="text-xs text-muted-foreground">
                  <span className="font-medium">{key}:</span> {value}
                </div>
              ))}
            </div>
          )}
          {nodeData.subtitle && !nodeData.metadata && (
            <div className="text-sm text-muted-foreground mt-0.5">
              {nodeData.subtitle}
            </div>
          )}
        </div>
      </div>

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-muted-foreground !border-2 !border-background"
      />
    </div>
  );
});

ActionNode.displayName = "ActionNode";
