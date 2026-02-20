import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { User, Eye, Heart, Search, Briefcase, ClipboardList } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  user: User,
  eye: Eye,
  heart: Heart,
  search: Search,
  briefcase: Briefcase,
  clipboard: ClipboardList,
};

interface CandidateNodeData {
  label: string;
  icon?: string;
  aiPercentage?: number;
  humanPercentage?: number;
  hitlPercentage?: number;
  slaStatus?: "green" | "amber" | "red";
  onClick?: () => void;
}

interface CandidateNodeProps {
  data: CandidateNodeData;
}

const slaBorderColors = {
  green: "border-success",
  amber: "border-warning",
  red: "border-destructive",
};

export const CandidateNode = memo(({ data }: CandidateNodeProps) => {
  const Icon = (data.icon && iconMap[data.icon]) || User;
  const borderClass = data.slaStatus ? slaBorderColors[data.slaStatus] : "border-purple-300";

  return (
    <div 
      className={`relative bg-purple-50 rounded-lg border-2 ${borderClass} shadow-sm px-4 py-3 min-w-[140px] cursor-pointer hover:shadow-md transition-shadow`}
      onClick={data.onClick}
    >
      <Handle type="target" position={Position.Left} className="!bg-purple-400 !w-2 !h-2" />
      <Handle type="source" position={Position.Right} className="!bg-purple-400 !w-2 !h-2" />
      <Handle type="target" position={Position.Top} id="top" className="!bg-purple-400 !w-2 !h-2" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-purple-400 !w-2 !h-2" />
      
      <div className="flex flex-col items-center gap-2">
        <div className="p-2 rounded-lg bg-purple-100">
          <Icon className="h-5 w-5 text-purple-600" />
        </div>
        <span className="text-xs font-medium text-center leading-tight text-purple-900">{data.label}</span>
      </div>

      {/* AI/Human/HITL attribution badges */}
      {(data.aiPercentage !== undefined || data.humanPercentage !== undefined || data.hitlPercentage !== undefined) && (
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-0.5">
          {data.aiPercentage !== undefined && data.aiPercentage > 0 && (
            <span className="bg-orange-100 text-orange-600 text-[8px] font-bold px-1 py-0.5 rounded">
              {data.aiPercentage}% AI
            </span>
          )}
          {data.humanPercentage !== undefined && data.humanPercentage > 0 && (
            <span className="bg-blue-100 text-blue-600 text-[8px] font-bold px-1 py-0.5 rounded">
              {data.humanPercentage}% H
            </span>
          )}
          {data.hitlPercentage !== undefined && data.hitlPercentage > 0 && (
            <span className="bg-teal-100 text-teal-600 text-[8px] font-bold px-1 py-0.5 rounded">
              {data.hitlPercentage}% HITL
            </span>
          )}
        </div>
      )}
    </div>
  );
});

CandidateNode.displayName = "CandidateNode";
