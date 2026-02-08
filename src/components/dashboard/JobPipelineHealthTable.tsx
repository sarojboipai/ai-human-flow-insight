import { useState, useMemo } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ExternalLink, Search } from "lucide-react";

export interface JobPipelineHealthRow {
  jobId: string;
  jobTitle: string;
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

const STAGE_OPTIONS = [
  "Lead Ingested",
  "AI Match Generated",
  "Human Review",
  "Interview Scheduled",
  "Offer Extended",
  "Placement Completed",
];

export function JobPipelineHealthTable({ 
  data, 
  title,
  onJobClick 
}: JobPipelineHealthTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [customerFilter, setCustomerFilter] = useState<string>("all");
  const [stageFilter, setStageFilter] = useState<string>("all");
  
  const itemsPerPage = 10;

  // Get unique customers for filter dropdown
  const uniqueCustomers = useMemo(() => {
    return [...new Set(data.map(row => row.customer))].sort();
  }, [data]);

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    return data.filter(row => {
      const matchesSearch = searchQuery === "" || 
        row.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.customer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCustomer = customerFilter === "all" || row.customer === customerFilter;
      const matchesStage = stageFilter === "all" || row.currentStage === stageFilter;

      return matchesSearch && matchesCustomer && matchesStage;
    });
  }, [data, searchQuery, customerFilter, stageFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCustomerFilterChange = (value: string) => {
    setCustomerFilter(value);
    setCurrentPage(1);
  };

  const handleStageFilterChange = (value: string) => {
    setStageFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="chart-container">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={customerFilter} onValueChange={handleCustomerFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Customers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Customers</SelectItem>
            {uniqueCustomers.map((customer) => (
              <SelectItem key={customer} value={customer}>
                {customer}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={stageFilter} onValueChange={handleStageFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Stages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            {STAGE_OPTIONS.map((stage) => (
              <SelectItem key={stage} value={stage}>
                {stage}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job ID</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Enterprise Customer</TableHead>
            <TableHead>Funnel Stage</TableHead>
            <TableHead>Bottleneck</TableHead>
            <TableHead>AI vs Human</TableHead>
            <TableHead>SLA Risk</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No jobs found matching your filters.
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row) => (
              <TableRow 
                key={row.jobId} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onJobClick?.(row.jobId)}
              >
                <TableCell className="font-medium text-primary">
                  {row.jobId}
                </TableCell>
                <TableCell className="font-medium">{row.jobTitle}</TableCell>
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
            ))
          )}
        </TableBody>
      </Table>
      
      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="flex items-center justify-between mt-4 px-2">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length} jobs
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
