import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { Database } from "lucide-react";
import ankuraLogo from "@/assets/ankura-logo.png";

interface SourceNodeData {
  label: string;
  variant: "ats" | "ankura";
}

interface SourceNodeProps {
  data: SourceNodeData;
}

export const SourceNode = memo(({ data }: SourceNodeProps) => {
  const isATS = data.variant === "ats";
  
  return (
    <div 
      className={`relative rounded-lg shadow-md px-4 py-3 min-w-[100px] ${
        isATS 
          ? "bg-slate-700 text-white" 
          : "bg-blue-600 text-white"
      }`}
    >
      <Handle type="source" position={Position.Right} className="!bg-white !w-2 !h-2" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-white !w-2 !h-2" />
      
      <div className="flex flex-col items-center gap-2">
        <div className={`p-2 rounded-lg ${isATS ? "bg-slate-600" : "bg-blue-500"}`}>
          {isATS ? (
            <Database className="h-5 w-5" />
          ) : (
            <img src={ankuraLogo} alt="Ankura Hospital" className="h-5 w-5 object-contain" />
          )}
        </div>
        <span className="text-xs font-semibold">{data.label}</span>
      </div>
    </div>
  );
});

SourceNode.displayName = "SourceNode";
