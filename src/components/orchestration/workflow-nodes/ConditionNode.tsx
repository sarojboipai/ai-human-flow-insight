import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkflowNodeData } from "./types";

export const ConditionNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as WorkflowNodeData;

  return (
    <div
      className={cn(
        "min-w-[300px] rounded-xl border bg-card shadow-sm transition-all duration-200",
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
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100">
          <GitBranch className="h-5 w-5 text-amber-600" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-foreground">{nodeData.label}</div>
          
          {/* Condition details */}
          {nodeData.conditions && (
            <div className="mt-2 space-y-2">
              <div className="text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                  Qualified
                </span>
                <span className="text-muted-foreground ml-2 line-clamp-1">
                  {nodeData.conditions.qualified}
                </span>
              </div>
              <div className="text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-medium">
                  Knockout
                </span>
                <span className="text-muted-foreground ml-2 line-clamp-1">
                  {nodeData.conditions.knockout}
                </span>
              </div>
            </div>
          )}

          {!nodeData.conditions && nodeData.subtitle && (
            <div className="text-sm text-muted-foreground mt-0.5">
              {nodeData.subtitle}
            </div>
          )}
        </div>
      </div>

      {/* Output handles - Left and Right for branching */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="qualified"
        className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-background !left-1/4"
        style={{ left: "25%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="knockout"
        className="!w-3 !h-3 !bg-orange-500 !border-2 !border-background !left-3/4"
        style={{ left: "75%" }}
      />
    </div>
  );
});

ConditionNode.displayName = "ConditionNode";
