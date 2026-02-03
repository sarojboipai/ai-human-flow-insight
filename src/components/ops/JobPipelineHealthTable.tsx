import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { JobPipelineHealthRow } from "@/lib/mockData";

interface JobPipelineHealthTableProps {
  data: JobPipelineHealthRow[];
}

// Map funnel stages to display badges
const getStageBadge = (stage: string) => {
  const stageStyles: Record<string, { bg: string; text: string; label: string }> = {
    "Profile Screening": { bg: "bg-emerald-100", text: "text-emerald-700", label: "AI Match Generated" },
    "Skills Matching": { bg: "bg-emerald-100", text: "text-emerald-700", label: "AI Match Generated" },
    "Initial Outreach": { bg: "bg-amber-100", text: "text-amber-700", label: "Human Review" },
    "Interview Scheduling": { bg: "bg-sky-100", text: "text-sky-700", label: "Interview Scheduled" },
    "Offer Negotiation": { bg: "bg-emerald-100", text: "text-emerald-700", label: "Offer Extended" },
    "Placement Confirmed": { bg: "bg-emerald-100", text: "text-emerald-700", label: "Placement Confirmed" },
  };

  const style = stageStyles[stage] || { bg: "bg-muted", text: "text-muted-foreground", label: stage };
  
  return (
    <span className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-medium ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
};

// Map bottleneck to display text
const getBottleneckDisplay = (bottleneck: string) => {
  const mapping: Record<string, string> = {
    "Interview Scheduled": "Offer Released",
    "Offer Released": "Offer Released",
    "Recruiter Contacted": "Offer Released",
    "Placement Confirmed": "Placement Confirmed",
  };
  return mapping[bottleneck] || bottleneck;
};

export function JobPipelineHealthTable({ data }: JobPipelineHealthTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Job Pipeline Health</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Job ID</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Enterprise Customer</TableHead>
              <TableHead>Funnel Stage</TableHead>
              <TableHead>Bottleneck</TableHead>
              <TableHead className="w-[200px]">AI vs Human</TableHead>
              <TableHead className="text-right">SLA Risk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.jobId}>
                <TableCell className="font-medium text-primary">{row.jobId}</TableCell>
                <TableCell className="font-medium">{row.jobTitle}</TableCell>
                <TableCell>{row.customer}</TableCell>
                <TableCell>{getStageBadge(row.currentStage)}</TableCell>
                <TableCell className="text-muted-foreground">
                  {getBottleneckDisplay(row.bottleneckStage)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 flex items-center gap-1">
                      <div 
                        className="h-2 rounded-full bg-emerald-500" 
                        style={{ width: `${row.aiPercentage}%` }}
                      />
                      <div 
                        className="h-2 rounded-full bg-muted" 
                        style={{ width: `${row.humanPercentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {row.aiPercentage}% AI / {row.humanPercentage}% Human
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        row.slaRisk === "green"
                          ? "bg-emerald-500"
                          : row.slaRisk === "amber"
                          ? "bg-amber-500"
                          : "bg-destructive"
                      }`}
                    />
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        row.slaRisk === "green"
                          ? "text-emerald-600"
                          : row.slaRisk === "amber"
                          ? "text-amber-600"
                          : "text-destructive"
                      }`}>
                        {row.slaRisk === "green" ? "On Track" : row.slaRisk === "amber" ? "At Risk" : "Breached"}
                      </div>
                      <div className="text-xs text-muted-foreground">{row.slaDetails}</div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
