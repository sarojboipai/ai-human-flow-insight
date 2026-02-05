import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { User, HelpCircle, FileText, CheckSquare, MessageSquare, Bot, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkflowNodeData } from "./types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  user: User,
  help: HelpCircle,
  file: FileText,
  check: CheckSquare,
  message: MessageSquare,
  bot: Bot,
  settings: Settings,
};

const colorSchemes: Record<string, { bg: string; icon: string }> = {
  purple: { bg: "bg-violet-100", icon: "text-violet-600" },
  coral: { bg: "bg-orange-100", icon: "text-orange-600" },
  blue: { bg: "bg-blue-100", icon: "text-blue-600" },
  green: { bg: "bg-emerald-100", icon: "text-emerald-600" },
  teal: { bg: "bg-teal-100", icon: "text-teal-600" },
  amber: { bg: "bg-amber-100", icon: "text-amber-600" },
};

export const StageCardNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as WorkflowNodeData;
  const Icon = iconMap[nodeData.icon || "settings"] || Settings;
  const colors = colorSchemes[nodeData.iconColor || "blue"] || colorSchemes.blue;

  return (
    <div
      className={cn(
        "min-w-[280px] rounded-xl border bg-card shadow-sm transition-all duration-200",
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
          {nodeData.subtitle && (
            <div className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
              {nodeData.subtitle}
            </div>
          )}
          {nodeData.description && (
            <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {nodeData.description}
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

StageCardNode.displayName = "StageCardNode";
