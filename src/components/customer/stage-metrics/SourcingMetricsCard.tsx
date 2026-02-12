import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck } from "lucide-react";
import type { SourcingMetrics } from "./types";

export function SourcingMetricsCard({ metrics }: { metrics: SourcingMetrics }) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <h4 className="text-sm font-semibold text-muted-foreground">Sourcing Details</h4>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <UserCheck className="h-4 w-4 text-orange-500" />
            <span>Candidates sourced by <span className="font-medium">{metrics.candidatesSourcedBy}</span></span>
          </div>
          <span className="text-lg font-bold">{metrics.candidatesSourcedCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-emerald-500" />
            <span>{metrics.candidatesActiveLabel}</span>
          </div>
          <span className="text-lg font-bold">{metrics.candidatesActiveCount}</span>
        </div>
      </CardContent>
    </Card>
  );
}
