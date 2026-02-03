import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { GitBranch, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditableDecisionNodeData extends Record<string, unknown> {
  label: string;
  stageType: string;
  isSelected?: boolean;
  onDelete?: () => void;
  onSelect?: () => void;
}

export const EditableDecisionNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as unknown as EditableDecisionNodeData;
  
  return (
    <div
      className={cn(
        "relative transition-all group cursor-pointer"
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
            "absolute -top-2 -right-2 z-10 w-5 h-5 rounded-full bg-destructive text-destructive-foreground",
            "flex items-center justify-center transition-opacity",
            selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        >
          <X className="h-3 w-3" />
        </button>
      )}

      {/* Diamond Shape */}
      <div
        className={cn(
          "w-16 h-16 rotate-45 border-2 bg-slate-100 shadow-sm",
          "hover:shadow-md",
          selected || nodeData.isSelected
            ? "border-slate-600 ring-2 ring-slate-600/20"
            : "border-slate-400"
        )}
      >
        <div className="-rotate-45 w-full h-full flex items-center justify-center">
          <GitBranch className="h-5 w-5 text-slate-700" />
        </div>
      </div>

      {/* Label below diamond */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="text-xs font-medium text-slate-700">{nodeData.label}</span>
      </div>

      {/* Handles - positioned on diamond edges */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-slate-600 !border-2 !border-background !-left-1"
        style={{ top: "50%" }}
      />
      
      {/* Top output - Qualified */}
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-background !-top-1"
        style={{ left: "50%" }}
      />
      
      {/* Right output - Hold */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!w-3 !h-3 !bg-blue-500 !border-2 !border-background !-right-1"
        style={{ top: "50%" }}
      />
      
      {/* Bottom output - Rejected */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="!w-3 !h-3 !bg-purple-500 !border-2 !border-background !-bottom-1"
        style={{ left: "50%" }}
      />
    </div>
  );
});

EditableDecisionNode.displayName = "EditableDecisionNode";
