import { useState } from "react";
import { OpsLayout } from "@/components/layout/OpsLayout";
import { useJobs } from "@/hooks/useJobs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { AddJobDialog } from "@/components/ops/AddJobDialog";
import { useNavigate } from "react-router-dom";

export default function OpsJobList() {
  const { data: jobs = [], isLoading } = useJobs();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const filtered = jobs.filter((j) => {
    const matchesSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.employer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || j.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColor = (s: string) => {
    if (s === "active") return "default";
    if (s === "filled") return "secondary";
    return "outline";
  };

  return (
    <OpsLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Job List</h1>
            <p className="text-muted-foreground text-sm">All jobs in the system</p>
          </div>
          <AddJobDialog />
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by title or employer..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="filled">Filled</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Employer</TableHead>
                <TableHead>Role Type</TableHead>
                <TableHead>Geography</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Days Open</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No jobs found</TableCell></TableRow>
              ) : (
                filtered.map((job) => (
                  <TableRow key={job.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/ops/jobs/${job.id}`)}>
                    <TableCell className="font-mono text-xs">{job.id}</TableCell>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.employer}</TableCell>
                    <TableCell className="capitalize">{job.roleType}</TableCell>
                    <TableCell>{job.geography}</TableCell>
                    <TableCell><Badge variant={statusColor(job.status)}>{job.status}</Badge></TableCell>
                    <TableCell className="text-right">{job.daysOpen}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </OpsLayout>
  );
}
