import { AlertTriangle, AlertCircle, Info, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { WBRKPIs, RiskFlag } from "@/lib/wbrAopData";

interface WBRAOPAlignmentInsightsProps {
  kpis: WBRKPIs;
  riskFlags: RiskFlag[];
}

const severityConfig = {
  error: {
    icon: AlertCircle,
    bgClass: "bg-red-500/10 border-red-500/30",
    iconClass: "text-red-500",
  },
  warning: {
    icon: AlertTriangle,
    bgClass: "bg-amber-500/10 border-amber-500/30",
    iconClass: "text-amber-500",
  },
  info: {
    icon: Info,
    bgClass: "bg-blue-500/10 border-blue-500/30",
    iconClass: "text-blue-500",
  },
};

export function WBRAOPAlignmentInsights({ kpis, riskFlags }: WBRAOPAlignmentInsightsProps) {
  // Run rate calculation
  const requiredWeeklyPlacements = Math.ceil(10000 / 52); // ~192/week
  const actualWeeklyPlacements = kpis.weeklyPlacements;
  const runRateGap = actualWeeklyPlacements - requiredWeeklyPlacements;
  const runRatePercent = Math.round((actualWeeklyPlacements / requiredWeeklyPlacements) * 100);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">WBR vs AOP Alignment</h2>
        <p className="text-sm text-muted-foreground">
          Weekly execution alignment with yearly strategy
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Run Rate Comparison */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">
              Weekly Run Rate vs Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Required Placements/Week</p>
                  <p className="text-2xl font-bold">{requiredWeeklyPlacements}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Actual Placements/Week</p>
                  <p className="text-2xl font-bold">{actualWeeklyPlacements}</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 py-3 rounded-lg border bg-muted/30">
                {runRateGap >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                )}
                <span
                  className={cn(
                    "text-lg font-semibold",
                    runRateGap >= 0 ? "text-emerald-600" : "text-red-600"
                  )}
                >
                  {runRatePercent}% of target
                </span>
                <span className="text-sm text-muted-foreground">
                  ({runRateGap >= 0 ? "+" : ""}{runRateGap} gap)
                </span>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Based on AOP target of 10,000 placements ÷ 52 weeks
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Risk Flags */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">
              Risk Flags & Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[280px] overflow-y-auto">
              {riskFlags.map((flag) => {
                const config = severityConfig[flag.severity];
                const Icon = config.icon;
                return (
                  <div
                    key={flag.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg border",
                      config.bgClass
                    )}
                  >
                    <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", config.iconClass)} />
                    <p className="text-sm leading-relaxed">{flag.message}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
