import { useState } from "react";
import { Search, Filter, ArrowRight, X } from "lucide-react";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { jobs, Job } from "@/lib/mockData";
import { PipelineBoardDialog } from "./PipelineBoardDialog";

const COMPANY_OPTIONS = [
  "Ankura Hospital",
  "Oasis Fertility",
  "Manipal Hospitals",
  "KIMS Hospital",
  "Yashoda Hospitals",
  "Aster CMI Hospital",
];

const STAGE_OPTIONS = [
  "Candidate Lead",
  "Profile Completed",
  "AI Matched",
  "Recruiter Contacted",
  "Interview Scheduled",
  "Offer Released",
  "Placement Confirmed",
];

const LOCATION_OPTIONS = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Gurugram",
];

export function CustomerJobsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [companyFilter, setCompanyFilter] = useState<string[]>([]);
  const [stageFilter, setStageFilter] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState<string[]>([]);

  const totalCandidates = (job: Job) => job.funnel[0]?.candidates || 0;
  const currentStage = (job: Job) => {
    const lastActiveStage = [...job.funnel].reverse().find((s) => s.candidates > 0);
    return lastActiveStage?.name || job.funnel[0]?.name;
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCompany =
      companyFilter.length === 0 || companyFilter.includes(job.employer);

    const jobCurrentStage = currentStage(job);
    const matchesStage =
      stageFilter.length === 0 ||
      (jobCurrentStage && stageFilter.includes(jobCurrentStage));

    const matchesLocation =
      locationFilter.length === 0 || locationFilter.includes(job.geography);

    return matchesSearch && matchesCompany && matchesStage && matchesLocation;
  });

  const activeFilterCount =
    companyFilter.length + stageFilter.length + locationFilter.length;

  const toggleFilter = (
    value: string,
    currentFilter: string[],
    setFilter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (currentFilter.includes(value)) {
      setFilter(currentFilter.filter((item) => item !== value));
    } else {
      setFilter([...currentFilter, value]);
    }
  };

  const clearAllFilters = () => {
    setCompanyFilter([]);
    setStageFilter([]);
    setLocationFilter([]);
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
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <Filter className="h-4 w-4 mr-1" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4 bg-popover" align="end">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold">Company</Label>
                    <div className="mt-2 space-y-2">
                      {COMPANY_OPTIONS.map((company) => (
                        <div key={company} className="flex items-center space-x-2">
                          <Checkbox
                            id={`company-${company}`}
                            checked={companyFilter.includes(company)}
                            onCheckedChange={() =>
                              toggleFilter(company, companyFilter, setCompanyFilter)
                            }
                          />
                          <Label
                            htmlFor={`company-${company}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {company}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-sm font-semibold">Stage</Label>
                    <div className="mt-2 space-y-2">
                      {STAGE_OPTIONS.map((stage) => (
                        <div key={stage} className="flex items-center space-x-2">
                          <Checkbox
                            id={`stage-${stage}`}
                            checked={stageFilter.includes(stage)}
                            onCheckedChange={() =>
                              toggleFilter(stage, stageFilter, setStageFilter)
                            }
                          />
                          <Label
                            htmlFor={`stage-${stage}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {stage}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-sm font-semibold">Location</Label>
                    <div className="mt-2 space-y-2">
                      {LOCATION_OPTIONS.map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox
                            id={`location-${location}`}
                            checked={locationFilter.includes(location)}
                            onCheckedChange={() =>
                              toggleFilter(location, locationFilter, setLocationFilter)
                            }
                          />
                          <Label
                            htmlFor={`location-${location}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {location}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {activeFilterCount > 0 && (
                    <>
                      <Separator />
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={clearAllFilters}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Clear All Filters
                      </Button>
                    </>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              
              <TableHead>Current Stage</TableHead>
              <TableHead className="text-right">Candidates</TableHead>
              <TableHead className="text-right">Days Open</TableHead>
              
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-mono text-xs">{job.id}</TableCell>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.employer}</TableCell>
                
                <TableCell>
                  <Badge variant="secondary">{currentStage(job)}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {totalCandidates(job)}
                </TableCell>
                <TableCell className="text-right">{job.daysOpen}</TableCell>
                
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
