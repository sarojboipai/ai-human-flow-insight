import { Card, CardContent } from "@/components/ui/card";
import { Timer } from "lucide-react";
import type { ProgressStep } from "./types";

interface InStageProgressFunnelProps {
  steps: ProgressStep[];
  title?: string;
}

export function InStageProgressFunnel({ steps, title = "In-Stage Progress" }: InStageProgressFunnelProps) {
  if (!steps || steps.length === 0) return null;
  
  const maxCount = steps[0]?.count || 1;
  
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Timer className="h-4 w-4" />
          {title}
        </h4>
        
        <div className="space-y-3">
          {steps.map((step, index) => {
            // Calculate bar width relative to the first step (which is 100%)
            const relativeWidth = (step.count / maxCount) * 100;
            
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{step.label}</span>
                  <span className="font-medium">
                    {step.percentage}%
                    <span className="text-muted-foreground font-normal ml-1">
                      ({step.count.toLocaleString()})
                    </span>
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500 rounded-full"
                    style={{ width: `${relativeWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
