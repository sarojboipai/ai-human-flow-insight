import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { Calendar, Award, Users, ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  calendar: Calendar,
  award: Award,
  users: Users,
  arrow: ArrowRight,
};

interface OutcomeNodeData {
  label: string;
  icon?: string;
  handlers?: string[];
  variant?: "scheduling" | "silver" | "community" | "continue";
}

interface OutcomeNodeProps {
  data: OutcomeNodeData;
}

const handlerColors: Record<string, { bg: string; text: string; label: string }> = {
  R: { bg: "bg-orange-100", text: "text-orange-600", label: "R" },
  C: { bg: "bg-purple-100", text: "text-purple-600", label: "C" },
  H: { bg: "bg-emerald-100", text: "text-emerald-600", label: "H" },
  AE: { bg: "bg-amber-100", text: "text-amber-600", label: "AE" },
  "X+": { bg: "bg-gradient-to-r from-orange-100 to-rose-100", text: "text-orange-600", label: "X+" },
};

export const OutcomeNode = memo(({ data }: OutcomeNodeProps) => {
  const Icon = data.icon ? iconMap[data.icon] : Calendar;
  
  const getBorderColor = () => {
    switch (data.variant) {
      case "scheduling": return "border-emerald-300";
      case "silver": return "border-blue-300";
      case "community": return "border-purple-300";
      case "continue": return "border-slate-300";
      default: return "border-muted";
    }
  };

  return (
    <div className={`relative bg-white rounded-lg border-2 ${getBorderColor()} shadow-sm px-3 py-2 min-w-[110px]`}>
      <Handle type="target" position={Position.Left} className="!bg-muted-foreground/50 !w-2 !h-2" />
      <Handle type="target" position={Position.Top} id="top" className="!bg-muted-foreground/50 !w-2 !h-2" />
      <Handle type="source" position={Position.Right} className="!bg-muted-foreground/50 !w-2 !h-2" />
      
      <div className="flex flex-col items-center gap-1.5">
        <div className="p-1.5 rounded-md bg-muted/50">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <span className="text-[10px] font-medium text-center leading-tight">{data.label}</span>
      </div>

      {data.handlers && data.handlers.length > 0 && (
        <div className="absolute -top-2 -right-2 flex gap-0.5">
          {data.handlers.map((handler) => {
            const style = handlerColors[handler];
            return (
              <span
                key={handler}
                className={`${style.bg} ${style.text} text-[9px] font-bold px-1 py-0.5 rounded-full`}
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

OutcomeNode.displayName = "OutcomeNode";
