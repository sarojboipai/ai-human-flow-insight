import { ArrowRight, Bot, Users, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PipelineStage } from "@/lib/mockData";

interface PipelineGraphProps {
  stages: PipelineStage[];
}

const getHandlerIcon = (handler: PipelineStage["primaryHandler"]) => {
  switch (handler) {
    case "ai":
      return <Bot className="h-4 w-4" />;
    case "human":
      return <Users className="h-4 w-4" />;
    case "hybrid":
      return <Zap className="h-4 w-4" />;
  }
};

const getHandlerColor = (handler: PipelineStage["primaryHandler"]) => {
  switch (handler) {
    case "ai":
      return "border-teal-500 bg-teal-500/10";
    case "human":
      return "border-amber-500 bg-amber-500/10";
    case "hybrid":
      return "border-blue-500 bg-blue-500/10";
  }
};

const getHandlerTextColor = (handler: PipelineStage["primaryHandler"]) => {
  switch (handler) {
    case "ai":
      return "text-teal-500";
    case "human":
      return "text-amber-500";
    case "hybrid":
      return "text-blue-500";
  }
};

export function PipelineGraph({ stages }: PipelineGraphProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Pipeline Orchestration</CardTitle>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-teal-500" />
            AI Automated
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            Human Handled
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            Hybrid (HITL)
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 overflow-x-auto pb-4">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center gap-2">
              <div
                className={`flex flex-col items-center p-4 rounded-lg border-2 min-w-[160px] ${getHandlerColor(
                  stage.primaryHandler
                )}`}
              >
                <div className={`flex items-center gap-2 font-medium ${getHandlerTextColor(stage.primaryHandler)}`}>
                  {getHandlerIcon(stage.primaryHandler)}
                  <span className="text-sm">{stage.name}</span>
                </div>
                <div className="mt-2 text-xs text-muted-foreground text-center">
                  <div className="flex flex-wrap gap-1 justify-center mb-1">
                    {stage.agents.slice(0, 1).map((agent) => (
                      <span key={agent} className="bg-background/50 px-1.5 py-0.5 rounded">
                        {agent}
                      </span>
                    ))}
                  </div>
                  <div className="text-muted-foreground/60">
                    Backup: {stage.humanBackup}
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-border/50 w-full text-center">
                  <div className="text-lg font-semibold">{stage.throughput.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">processed</div>
                </div>
              </div>
              {index < stages.length - 1 && (
                <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
