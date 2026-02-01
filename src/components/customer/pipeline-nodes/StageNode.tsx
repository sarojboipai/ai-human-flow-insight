import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { 
  Briefcase, 
  FileText, 
  RefreshCw, 
  Users, 
  Search, 
  Heart, 
  ClipboardList, 
  Phone,
  Calendar,
  Award,
  UserPlus
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  fileText: FileText,
  refresh: RefreshCw,
  users: Users,
  search: Search,
  heart: Heart,
  clipboard: ClipboardList,
  phone: Phone,
  calendar: Calendar,
  award: Award,
  userPlus: UserPlus,
};

const handlerColors: Record<string, { bg: string; text: string; label: string }> = {
  R: { bg: "bg-orange-100", text: "text-orange-600", label: "R" },
  C: { bg: "bg-purple-100", text: "text-purple-600", label: "C" },
  H: { bg: "bg-emerald-100", text: "text-emerald-600", label: "H" },
  AE: { bg: "bg-amber-100", text: "text-amber-600", label: "AE" },
  "X+": { bg: "bg-gradient-to-r from-orange-100 to-rose-100", text: "text-orange-600", label: "X+" },
};

interface StageNodeData {
  label: string;
  icon?: string;
  handlers?: string[];
  borderColor?: string;
}

interface StageNodeProps {
  data: StageNodeData;
}

export const StageNode = memo(({ data }: StageNodeProps) => {
  const Icon = data.icon ? iconMap[data.icon] : Briefcase;
  const borderClass = data.borderColor || "border-blue-200";

  return (
    <div className={`relative bg-white rounded-lg border-2 ${borderClass} shadow-sm px-4 py-3 min-w-[140px]`}>
      <Handle type="target" position={Position.Left} className="!bg-muted-foreground/50 !w-2 !h-2" />
      <Handle type="source" position={Position.Right} className="!bg-muted-foreground/50 !w-2 !h-2" />
      <Handle type="target" position={Position.Top} id="top" className="!bg-muted-foreground/50 !w-2 !h-2" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-muted-foreground/50 !w-2 !h-2" />
      
      <div className="flex flex-col items-center gap-2">
        <div className="p-2 rounded-lg bg-muted/50">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <span className="text-xs font-medium text-center leading-tight">{data.label}</span>
      </div>

      {data.handlers && data.handlers.length > 0 && (
        <div className="absolute -top-2 -right-2 flex gap-0.5">
          {data.handlers.map((handler) => {
            const style = handlerColors[handler];
            return (
              <span
                key={handler}
                className={`${style.bg} ${style.text} text-[10px] font-bold px-1.5 py-0.5 rounded-full`}
              >
                {style.label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
});

StageNode.displayName = "StageNode";
