import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobFunnelStage } from "@/lib/mockData";

interface JobFunnelVisualizationProps {
  funnel: JobFunnelStage[];
  title?: string;
}

export function JobFunnelVisualization({ funnel, title = "Job Funnel" }: JobFunnelVisualizationProps) {
  const maxCandidates = Math.max(...funnel.map((s) => s.candidates));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {funnel.map((stage, index) => {
            const widthPercent = maxCandidates > 0 ? (stage.candidates / maxCandidates) * 100 : 0;
            const dropOff =
              index > 0 && funnel[index - 1].candidates > 0
                ? Math.round(
                    ((funnel[index - 1].candidates - stage.candidates) /
                      funnel[index - 1].candidates) *
                      100
                  )
                : 0;

            return (
              <div key={stage.name} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{stage.name}</span>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-semibold">{stage.candidates}</span>
                    {index > 0 && dropOff > 0 && (
                      <span className="text-red-400 text-xs">-{dropOff}%</span>
                    )}
                    <span className="text-muted-foreground text-xs w-16 text-right">
                      {stage.avgTimeInStage}
                    </span>
                  </div>
                </div>
                <div className="h-8 bg-muted rounded-lg overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-lg transition-all duration-500"
                    style={{ width: `${widthPercent}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-end pr-3">
                    <span className="text-xs text-foreground/70 font-medium">
                      {stage.candidates > 0 && `${Math.round(widthPercent)}%`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
