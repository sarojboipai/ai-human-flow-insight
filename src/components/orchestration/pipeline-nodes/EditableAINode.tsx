import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Bot, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AttributionBadges } from "./AttributionBadges";

interface EditableAINodeData extends Record<string, unknown> {
  label: string;
  stageType: string;
  icon?: string;
  agentId?: string;
  isSelected?: boolean;
  onDelete?: () => void;
  onSelect?: () => void;
  aiEnabled?: boolean;
  humanEnabled?: boolean;
  aiTaskDescription?: string;
  humanTaskDescription?: string;
}

export const EditableAINode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as unknown as EditableAINodeData;
  const hasAgent = !!nodeData.agentId;
  
  return (
    <div
      className={cn(
        "relative px-4 py-3 rounded-lg border-2 bg-orange-50 shadow-sm min-w-[160px] transition-all group",
        "hover:shadow-md cursor-pointer",
        !hasAgent && "border-dashed",
        selected || nodeData.isSelected
          ? "border-orange-500 ring-2 ring-orange-500/20"
          : hasAgent 
            ? "border-orange-300" 
            : "border-orange-400"
      )}
      onClick={nodeData.onSelect}
    >
      {/* Delete Button */}
      {nodeData.onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            nodeData.onDelete?.();
          }}
          className={cn(
            "absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-destructive-foreground",
            "flex items-center justify-center transition-opacity",
            selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        >
          <X className="h-3 w-3" />
        </button>
      )}

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-orange-500 !border-2 !border-background"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-orange-500 !border-2 !border-background"
      />

      {/* Content */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
          <Bot className="h-4 w-4 text-orange-600" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-orange-900 block truncate">
            {nodeData.label}
          </span>
          {!hasAgent && (
            <span className="text-xs text-orange-600">No agent assigned</span>
          )}
        </div>
      </div>
      <AttributionBadges
        aiEnabled={nodeData.aiEnabled}
        humanEnabled={nodeData.humanEnabled}
        aiTaskDescription={nodeData.aiTaskDescription}
        humanTaskDescription={nodeData.humanTaskDescription}
      />
    </div>
  );
});

EditableAINode.displayName = "EditableAINode";
