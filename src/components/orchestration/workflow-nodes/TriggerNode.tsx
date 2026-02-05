import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkflowNodeData } from "./types";

export const TriggerNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as WorkflowNodeData;

  return (
    <div
      className={cn(
        "min-w-[280px] rounded-xl border bg-card shadow-sm transition-all duration-200",
        selected && "ring-2 ring-primary shadow-md",
        "hover:shadow-md"
      )}
      onClick={nodeData.onSelect}
    >
      <div className="flex items-start gap-3 p-4">
        {/* Icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
          <Zap className="h-5 w-5 text-emerald-600" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-foreground">{nodeData.label}</div>
          {nodeData.subtitle && (
            <div className="text-sm text-muted-foreground mt-0.5">
              {nodeData.subtitle}
            </div>
          )}
          {nodeData.metadata && Object.keys(nodeData.metadata).length > 0 && (
            <div className="mt-2 space-y-1">
              {Object.entries(nodeData.metadata).map(([key, value]) => (
                <div key={key} className="text-xs text-muted-foreground">
                  <span className="font-medium">{key}:</span>{" "}
                  <span className="text-foreground">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-background"
      />
    </div>
  );
});

TriggerNode.displayName = "TriggerNode";
