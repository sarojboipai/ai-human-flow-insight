import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AOPVarianceRow } from "@/lib/wbrAopData";

interface AOPTargetDashboardProps {
  rows: AOPVarianceRow[];
}

const statusConfig = {
  "on-track": {
    label: "On Track",
    badgeClass: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
    progressClass: "bg-emerald-500",
  },
  "minor-risk": {
    label: "Minor Risk",
    badgeClass: "bg-amber-500/15 text-amber-700 border-amber-500/30",
    progressClass: "bg-amber-500",
  },
  "off-track": {
    label: "Off Track",
    badgeClass: "bg-red-500/15 text-red-700 border-red-500/30",
    progressClass: "bg-red-500",
  },
};

export function AOPTargetDashboard({ rows }: AOPTargetDashboardProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">AOP Target vs Actual</h2>
        <p className="text-sm text-muted-foreground">
          Annual strategic goals vs current progress
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">
            Annual Operating Plan Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider px-1">
              <div className="col-span-2">Metric</div>
              <div className="col-span-2 text-right">AOP Target</div>
              <div className="col-span-2 text-right">Actual</div>
              <div className="col-span-1 text-right">Variance</div>
              <div className="col-span-3">Progress</div>
              <div className="col-span-2 text-center">Status</div>
            </div>

            {rows.map((row) => {
              const config = statusConfig[row.status];
              return (
                <div
                  key={row.metric}
                  className="grid grid-cols-12 gap-4 items-center py-3 px-1 border-b border-border/50 last:border-0"
                >
                  <div className="col-span-2 font-medium text-sm">
                    {row.metric}
                  </div>
                  <div className="col-span-2 text-right text-sm text-muted-foreground">
                    {row.target}
                  </div>
                  <div className="col-span-2 text-right text-sm font-medium">
                    {row.actual}
                  </div>
                  <div
                    className={cn(
                      "col-span-1 text-right text-sm font-semibold",
                      row.variancePercent >= -5 && "text-emerald-600",
                      row.variancePercent < -5 &&
                        row.variancePercent >= -15 &&
                        "text-amber-600",
                      row.variancePercent < -15 && "text-red-600"
                    )}
                  >
                    {row.variancePercent > 0 ? "+" : ""}
                    {row.variancePercent}%
                  </div>
                  <div className="col-span-3 flex items-center gap-2">
                    <Progress
                      value={row.progress}
                      className={cn("h-2 flex-1")}
                    />
                    <span className="text-xs text-muted-foreground w-8">
                      {row.progress}%
                    </span>
                  </div>
                  <div className="col-span-2 text-center">
                    <Badge
                      variant="outline"
                      className={cn("text-xs", config.badgeClass)}
                    >
                      {config.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
