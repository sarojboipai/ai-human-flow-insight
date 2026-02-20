import { Bot, Users } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AttributionBadgesProps {
  aiEnabled?: boolean;
  humanEnabled?: boolean;
  aiTaskDescription?: string;
  humanTaskDescription?: string;
}

export function AttributionBadges({ aiEnabled, humanEnabled, aiTaskDescription, humanTaskDescription }: AttributionBadgesProps) {
  if (!aiEnabled && !humanEnabled) return null;

  const isHybrid = aiEnabled && humanEnabled;

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex items-center gap-1 mt-1.5">
        {isHybrid ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
                <Bot className="h-2.5 w-2.5" />
                <Users className="h-2.5 w-2.5" />
                Hybrid
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[200px]">
              <p className="text-xs"><strong>AI:</strong> {aiTaskDescription || "No description"}</p>
              <p className="text-xs mt-1"><strong>Human:</strong> {humanTaskDescription || "No description"}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <>
            {aiEnabled && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-orange-100 text-orange-700 border border-orange-200">
                    <Bot className="h-2.5 w-2.5" />
                    AI
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[200px]">
                  <p className="text-xs">{aiTaskDescription || "No description"}</p>
                </TooltipContent>
              </Tooltip>
            )}
            {humanEnabled && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700 border border-blue-200">
                    <Users className="h-2.5 w-2.5" />
                    Human
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[200px]">
                  <p className="text-xs">{humanTaskDescription || "No description"}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </>
        )}
      </div>
    </TooltipProvider>
  );
}
