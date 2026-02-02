import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export interface JobPipelineHealthRow {
  jobId: string;
  customer: string;
  currentStage: string;
  bottleneckStage: string;
  aiPercentage: number;
  humanPercentage: number;
  slaRisk: "green" | "amber" | "red";
  slaDetails: string;
}

interface JobPipelineHealthTableProps {
  data: JobPipelineHealthRow[];
  title?: string;
  onJobClick?: (jobId: string) => void;
}

function SLAIndicator({ risk, details }: { risk: "green" | "amber" | "red"; details: string }) {
  const colors = {
    green: "bg-success",
    amber: "bg-warning",
    red: "bg-destructive",
  };

  const labels = {
    green: "On Track",
    amber: "At Risk",
    red: "SLA Breach",
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`h-2.5 w-2.5 rounded-full ${colors[risk]}`} />
      <div className="flex flex-col">
        <span className="text-sm font-medium">{labels[risk]}</span>
        <span className="text-xs text-muted-foreground">{details}</span>
      </div>
    </div>
  );
}

function AIHumanBar({ aiPercentage, humanPercentage }: { aiPercentage: number; humanPercentage: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-2 w-24 overflow-hidden rounded-full bg-secondary">
        <div
          className="absolute left-0 h-full bg-primary"
          style={{ width: `${aiPercentage}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {aiPercentage}% AI / {humanPercentage}% Human
      </span>
    </div>
  );
}

function StageBadge({ stage }: { stage: string }) {
  const stageColors: Record<string, string> = {
    "Lead Ingested": "bg-muted text-muted-foreground",
    "AI Match Generated": "bg-primary/20 text-primary",
    "Human Review": "bg-warning/20 text-warning",
    "Interview Scheduled": "bg-info/20 text-info",
    "Offer Extended": "bg-success/20 text-success",
    "Placement Completed": "bg-success text-success-foreground",
  };

  return (
    <Badge variant="outline" className={stageColors[stage] || "bg-secondary"}>
      {stage}
    </Badge>
  );
}

export function JobPipelineHealthTable({ 
  data, 
  title = "Job Pipeline Health",
  onJobClick 
}: JobPipelineHealthTableProps) {
  return (
    <div className="chart-container">
      <h3 className="section-title mb-4">{title}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job ID</TableHead>
            <TableHead>Enterprise Customer</TableHead>
            <TableHead>Funnel Stage</TableHead>
            <TableHead>Bottleneck</TableHead>
            <TableHead>AI vs Human</TableHead>
            <TableHead>SLA Risk</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow 
              key={row.jobId} 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onJobClick?.(row.jobId)}
            >
              <TableCell className="font-medium text-primary">
                {row.jobId}
              </TableCell>
              <TableCell>{row.customer}</TableCell>
              <TableCell>
                <StageBadge stage={row.currentStage} />
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {row.bottleneckStage}
              </TableCell>
              <TableCell>
                <AIHumanBar 
                  aiPercentage={row.aiPercentage} 
                  humanPercentage={row.humanPercentage} 
                />
              </TableCell>
              <TableCell>
                <SLAIndicator risk={row.slaRisk} details={row.slaDetails} />
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
