import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

const getTierBadge = (tier: Job["employerTier"]) => {
  switch (tier) {
    case "enterprise":
      return <Badge variant="outline" className="border-purple-500 text-purple-500">Enterprise</Badge>;
    case "mid-market":
      return <Badge variant="outline" className="border-blue-500 text-blue-500">Mid-Market</Badge>;
    case "smb":
      return <Badge variant="outline" className="border-muted-foreground text-muted-foreground">SMB</Badge>;
  }
};

export function CustomerJobsTable() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.employer.toLowerCase().includes(searchQuery.toLowerCase())
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
              <TableHead>Employer</TableHead>
              <TableHead>Role Type</TableHead>
              <TableHead>Current Stage</TableHead>
              <TableHead className="text-right">Candidates</TableHead>
              <TableHead className="text-right">AI %</TableHead>
              <TableHead className="text-right">Days Open</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow
                key={job.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/jobs/${job.id}`)}
              >
                <TableCell className="font-mono text-xs">{job.id}</TableCell>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {job.employer}
                    {getTierBadge(job.employerTier)}
                  </div>
                </TableCell>
                <TableCell className="capitalize">{job.roleType}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{currentStage(job)}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {totalCandidates(job)}
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-teal-500">{job.aiContribution}%</span>
                </TableCell>
                <TableCell className="text-right">{job.daysOpen}</TableCell>
                <TableCell className="text-right font-medium">
                  ₹{(job.revenue / 1000).toFixed(0)}K
                </TableCell>
                <TableCell>{getStatusBadge(job.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
