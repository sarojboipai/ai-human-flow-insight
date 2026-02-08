import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, ArrowRight, ShieldAlert } from "lucide-react";
import type { JobSEOScore } from "@/lib/mockData";

function getScoreColor(score: number): string {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-warning";
  return "text-destructive";
}

function getScoreBg(score: number): string {
  if (score >= 80) return "bg-success/10";
  if (score >= 60) return "bg-warning/10";
  return "bg-destructive/10";
}

function getProgressColor(score: number): string {
  if (score >= 80) return "[&>div]:bg-success";
  if (score >= 60) return "[&>div]:bg-warning";
  return "[&>div]:bg-destructive";
}

const metricLabels: { key: keyof Omit<JobSEOScore, "overall">; label: string }[] = [
  { key: "titleOptimization", label: "Title Optimization" },
  { key: "descriptionQuality", label: "Description Quality" },
  { key: "keywordMatch", label: "Keyword Match" },
  { key: "locationOptimization", label: "Location Optimization" },
  { key: "mobileReadiness", label: "Mobile Readiness" },
];

interface SEOScoreRuleCardProps {
  score: JobSEOScore;
}

export function SEOScoreRuleCard({ score }: SEOScoreRuleCardProps) {
  const isTriggered = score.overall < 80;

  return (
    <Card>
      <CardContent className="pt-6 space-y-5">
        {/* Header */}
        <h4 className="text-sm font-medium text-muted-foreground">SEO Score</h4>

        {/* Overall Score */}
        <div className="flex items-center gap-4">
          <div className={`flex items-center justify-center w-16 h-16 rounded-xl ${getScoreBg(score.overall)}`}>
            <span className={`text-2xl font-bold ${getScoreColor(score.overall)}`}>
              {score.overall}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Overall Score</p>
            <p className="text-xs text-muted-foreground">out of 100</p>
            <Progress
              value={score.overall}
              className={`h-2 mt-1.5 ${getProgressColor(score.overall)}`}
            />
          </div>
        </div>

        {/* Individual Metrics */}
        <div className="space-y-3">
          {metricLabels.map(({ key, label }) => {
            const value = score[key];
            return (
              <div key={key} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{label}</span>
                  <span className={`font-semibold ${getScoreColor(value)}`}>
                    {value}
                  </span>
                </div>
                <Progress
                  value={value}
                  className={`h-1.5 ${getProgressColor(value)}`}
                />
              </div>
            );
          })}
        </div>

        {/* Routing Rule Status */}
        <div className={`rounded-lg border p-3 space-y-2 ${
          isTriggered
            ? "border-destructive/30 bg-destructive/5"
            : "border-success/30 bg-success/5"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className={`h-4 w-4 ${isTriggered ? "text-destructive" : "text-success"}`} />
              <span className="text-xs font-semibold">Routing Rule</span>
            </div>
            <Badge
              className={
                isTriggered
                  ? "bg-destructive text-destructive-foreground text-[10px]"
                  : "bg-success text-success-foreground text-[10px]"
              }
            >
              {isTriggered ? (
                <><AlertTriangle className="h-3 w-3 mr-1" />Triggered</>
              ) : (
                <><CheckCircle className="h-3 w-3 mr-1" />Passed</>
              )}
            </Badge>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <code className="bg-muted px-1.5 py-0.5 rounded text-[10px] font-mono">
              seo_score &lt; 80
            </code>
            <ArrowRight className="h-3 w-3 shrink-0" />
            <span>Route to Recruiter Review</span>
          </div>

          <p className="text-[11px] text-muted-foreground">
            Rule: <span className="font-medium">Low SEO Score</span> (rule-029) · Priority P2
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
