import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Bot, ShieldCheck, CheckCircle2 } from "lucide-react";
import type { JobPostMetrics } from "./types";

const roleIcon: Record<string, React.ElementType> = {
  ai: Bot,
  hitl: ShieldCheck,
  recruiter: User,
};

const roleBadge: Record<string, string> = {
  ai: "bg-orange-100 text-orange-700",
  hitl: "bg-teal-100 text-teal-700",
  recruiter: "bg-blue-100 text-blue-700",
};

export function JobPostMetricsCard({ metrics }: { metrics: JobPostMetrics }) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-5">
        <h4 className="text-sm font-semibold text-muted-foreground">Job Posting Details</h4>

        {/* Posted by */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Posted by</p>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">{metrics.postedBy}</span>
          </div>
        </div>

        {/* JD Reviewed by */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">JD Reviewed by</p>
          <div className="flex flex-col gap-2">
            {metrics.jdReviewedBy.map((reviewer, idx) => {
              const Icon = roleIcon[reviewer.role] || User;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-5">
                    {idx > 0 && (
                      <div className="absolute -mt-6 w-px h-3 bg-border" />
                    )}
                    <Icon className="h-4 w-4" />
                  </div>
                  <Badge variant="secondary" className={roleBadge[reviewer.role]}>
                    {reviewer.name}
                  </Badge>
                  {idx < metrics.jdReviewedBy.length - 1 && (
                    <span className="text-xs text-muted-foreground">→</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Details Added */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Details Added</p>
          <ul className="space-y-1.5">
            {metrics.detailsAdded.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
