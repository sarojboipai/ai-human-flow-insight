import { Card, CardContent } from "@/components/ui/card";
import { Bot, Users, Lightbulb, CheckCircle } from "lucide-react";
import { SEOScoreRuleCard } from "./SEOScoreRuleCard";
import type { JobSEOScore } from "@/lib/mockData";

interface ReviewJDSEOMetricsCardProps {
  seoScore: JobSEOScore;
  jdSeoDetails: {
    suggestions: string[];
    aiAction: string;
    humanAction: string;
  };
}

export function ReviewJDSEOMetricsCard({ seoScore, jdSeoDetails }: ReviewJDSEOMetricsCardProps) {
  return (
    <div className="space-y-4">
      <SEOScoreRuleCard score={seoScore} />

      {/* Suggested Edits */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-warning" />
            <h4 className="text-sm font-medium">Suggested Edits</h4>
          </div>
          <ul className="space-y-2">
            {jdSeoDetails.suggestions.map((suggestion, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                <CheckCircle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground/60" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* AI Action */}
      <Card className="border-orange-200 dark:border-orange-800">
        <CardContent className="pt-6 space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">AI Action</h4>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-orange-100 dark:bg-orange-900/30">
              <Bot className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm font-medium">{jdSeoDetails.aiAction}</span>
          </div>
        </CardContent>
      </Card>

      {/* Human Action */}
      <Card className="border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6 space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Human Action</h4>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/30">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium">{jdSeoDetails.humanAction}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
