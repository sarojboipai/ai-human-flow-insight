import { DollarSign, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Job } from "@/lib/mockData";

interface JobEconomicsCardProps {
  job: Job;
  avgMargin?: number;
}

export function JobEconomicsCard({ job, avgMargin = 70 }: JobEconomicsCardProps) {
  const marginDiff = job.margin - avgMargin;
  const isAboveAvg = marginDiff > 0;

  const getMarginIcon = () => {
    if (marginDiff > 5) return <TrendingUp className="h-4 w-4 text-emerald-500" />;
    if (marginDiff < -5) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-amber-500" />;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Job Unit Economics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <div className="text-xs text-muted-foreground mb-1">Revenue</div>
            <div className="text-2xl font-bold text-emerald-500">
              ₹{(job.revenue / 1000).toFixed(0)}K
            </div>
          </div>
          <div className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="text-xs text-muted-foreground mb-1">Cost</div>
            <div className="text-2xl font-bold text-red-500">
              ₹{(job.cost / 1000).toFixed(0)}K
            </div>
          </div>
          <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div className="text-xs text-muted-foreground mb-1">Gross Margin</div>
            <div className="text-2xl font-bold text-primary">{job.margin}%</div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getMarginIcon()}
            <span className="text-sm">
              {isAboveAvg ? "Above" : "Below"} average margin for {job.roleType} roles
            </span>
          </div>
          <span className={`font-semibold ${isAboveAvg ? "text-emerald-500" : "text-red-500"}`}>
            {isAboveAvg ? "+" : ""}{marginDiff.toFixed(1)}%
          </span>
        </div>

        <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">AI Contribution</div>
            <div className="font-semibold text-teal-500">{job.aiContribution}%</div>
          </div>
          <div>
            <div className="text-muted-foreground">Human Contribution</div>
            <div className="font-semibold text-amber-500">{job.humanContribution}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
