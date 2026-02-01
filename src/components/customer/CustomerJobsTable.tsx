import { useState } from "react";
import { Search, Filter, ArrowRight } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { jobs, Job } from "@/lib/mockData";
import { PipelineBoardDialog } from "./PipelineBoardDialog";

const getStatusBadge = (status: Job["status"]) => {
  switch (status) {
    case "active":
      return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Active</Badge>;
    case "filled":
      return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Filled</Badge>;
    case "closed":
      return <Badge className="bg-muted text-muted-foreground">Closed</Badge>;
  }
};

export function CustomerJobsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCandidates = (job: Job) => job.funnel[0]?.candidates || 0;
  const currentStage = (job: Job) => {
    const lastActiveStage = [...job.funnel].reverse().find((s) => s.candidates > 0);
    return lastActiveStage?.name || job.funnel[0]?.name;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Jobs Pipeline</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filters
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Role Type</TableHead>
              <TableHead>Current Stage</TableHead>
              <TableHead className="text-right">Candidates</TableHead>
              <TableHead className="text-right">Days Open</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-mono text-xs">{job.id}</TableCell>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell className="capitalize">{job.roleType}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{currentStage(job)}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {totalCandidates(job)}
                </TableCell>
                <TableCell className="text-right">{job.daysOpen}</TableCell>
                <TableCell>{getStatusBadge(job.status)}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedJob(job);
                      setDialogOpen(true);
                    }}
                  >
                    View Pipeline
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <PipelineBoardDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        job={selectedJob}
      />
    </Card>
  );
}
