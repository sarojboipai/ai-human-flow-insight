import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditableStageNodeData extends Record<string, unknown> {
  label: string;
  stageType: string;
  icon?: string;
  isSelected?: boolean;
  onDelete?: () => void;
  onSelect?: () => void;
}

export const EditableStageNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as unknown as EditableStageNodeData;
  
  return (
    <div
      className={cn(
        "relative px-4 py-3 rounded-lg border-2 bg-background shadow-sm min-w-[140px] transition-all",
        "hover:shadow-md cursor-pointer",
        selected || nodeData.isSelected
          ? "border-primary ring-2 ring-primary/20"
          : "border-border"
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
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
          style={{ opacity: selected ? 1 : undefined }}
        >
          <X className="h-3 w-3" />
        </button>
      )}

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-primary !border-2 !border-background"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-primary !border-2 !border-background"
      />

      {/* Content */}
      <div className="text-center">
        <span className="text-sm font-medium">{nodeData.label}</span>
      </div>
    </div>
  );
});

EditableStageNode.displayName = "EditableStageNode";
