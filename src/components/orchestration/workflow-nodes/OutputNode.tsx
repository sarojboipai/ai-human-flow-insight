import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { ExternalLink, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkflowNodeData } from "./types";

const outcomeStyles: Record<string, { bg: string; border: string; text: string; icon: React.ComponentType<{ className?: string }> }> = {
  positive: { 
    bg: "bg-emerald-50", 
    border: "border-emerald-200", 
    text: "text-emerald-700",
    icon: CheckCircle
  },
  negative: { 
    bg: "bg-orange-50", 
    border: "border-orange-200", 
    text: "text-orange-700",
    icon: XCircle
  },
  neutral: { 
    bg: "bg-muted", 
    border: "border-border", 
    text: "text-muted-foreground",
    icon: ArrowRight
  },
};

export const OutputNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as WorkflowNodeData;
  const outcome = nodeData.outcome || "neutral";
  const styles = outcomeStyles[outcome] || outcomeStyles.neutral;
  const Icon = styles.icon;

  return (
    <div
      className={cn(
        "min-w-[180px] rounded-xl border shadow-sm transition-all duration-200",
        styles.bg,
        styles.border,
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

      <div className="flex items-center justify-center gap-2 p-3">
        <Icon className={cn("h-4 w-4", styles.text)} />
        <span className={cn("font-medium text-sm", styles.text)}>
          {nodeData.label}
        </span>
        {nodeData.hasExternalLink && (
          <ExternalLink className={cn("h-3 w-3", styles.text)} />
        )}
      </div>
    </div>
  );
});

OutputNode.displayName = "OutputNode";
