import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Play, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditableEntryExitNodeData extends Record<string, unknown> {
  label: string;
  stageType: "entry" | "exit";
  icon?: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const EditableEntryExitNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as unknown as EditableEntryExitNodeData;
  const isEntry = nodeData.stageType === "entry";
  
  return (
    <div
      className={cn(
        "relative px-4 py-3 rounded-full border-2 bg-gray-100 shadow-sm min-w-[100px] transition-all",
        "hover:shadow-md cursor-pointer",
        selected || nodeData.isSelected
          ? "border-gray-600 ring-2 ring-gray-600/20"
          : "border-gray-400"
      )}
      onClick={nodeData.onSelect}
    >
      {/* Handles - Entry only has output, Exit only has input */}
      {!isEntry && (
        <Handle
          type="target"
          position={Position.Left}
          className="!w-3 !h-3 !bg-gray-500 !border-2 !border-background"
        />
      )}
      {isEntry && (
        <Handle
          type="source"
          position={Position.Right}
          className="!w-3 !h-3 !bg-gray-500 !border-2 !border-background"
        />
      )}

      {/* Content */}
      <div className="flex items-center justify-center gap-2">
        {isEntry ? (
          <Play className="h-4 w-4 text-gray-600" />
        ) : (
          <Flag className="h-4 w-4 text-gray-600" />
        )}
        <span className="text-sm font-medium text-gray-700">{nodeData.label}</span>
      </div>
    </div>
  );
});

EditableEntryExitNode.displayName = "EditableEntryExitNode";
