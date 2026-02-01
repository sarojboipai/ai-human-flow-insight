import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { User } from "lucide-react";

interface DecisionNodeData {
  label?: string;
}

interface DecisionNodeProps {
  data: DecisionNodeData;
}

export const DecisionNode = memo(({ data }: DecisionNodeProps) => {
  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="!bg-white !w-2 !h-2 !-left-1" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-white !w-2 !h-2 !-right-1" />
      <Handle type="source" position={Position.Top} id="top" className="!bg-white !w-2 !h-2 !-top-1" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-white !w-2 !h-2 !-bottom-1" />
      
      <div 
        className="w-16 h-16 bg-slate-800 rounded-lg rotate-45 flex items-center justify-center shadow-lg"
      >
        <div className="-rotate-45 flex flex-col items-center">
          <User className="h-6 w-6 text-white" />
        </div>
      </div>
      
      {data.label && (
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-muted-foreground whitespace-nowrap">
          {data.label}
        </span>
      )}
    </div>
  );
});

DecisionNode.displayName = "DecisionNode";
