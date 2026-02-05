import { useState, useMemo } from "react";
import { Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { automationEntries, type AutomationEntry, type StageAutomation } from "@/lib/mockData";
import { type StageNodeData } from "@/components/orchestration/WorkflowTab";
import { type Node } from "@xyflow/react";

interface AutomationTabProps {
  nodes: Node<StageNodeData>[];
  stageAutomations: StageAutomation[];
  onAutomationsChange: (automations: StageAutomation[]) => void;
  onDirtyChange: () => void;
}

const ITEMS_PER_PAGE = 10;

const TRIGGER_OPTIONS = [
  { value: "all", label: "All Triggers" },
  { value: "stage_entered", label: "Stage Entered" },
  { value: "stage_completed", label: "Stage Completed" },
  { value: "candidate_matched", label: "Candidate Matched" },
  { value: "interview_scheduled", label: "Interview Scheduled" },
  { value: "offer_released", label: "Offer Released" },
  { value: "sla_breach", label: "SLA Breach" },
];

const ACTION_OPTIONS = [
  { value: "all", label: "All Actions" },
  { value: "send_notification", label: "Send Notification" },
  { value: "update_ats", label: "Update ATS" },
  { value: "send_whatsapp", label: "Send WhatsApp" },
  { value: "create_task", label: "Create Task" },
  { value: "schedule_interview", label: "Schedule Interview" },
];

const TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "custom", label: "Custom" },
  { value: "system", label: "System" },
  { value: "template", label: "Template" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Active & Inactive" },
  { value: "active", label: "Active only" },
  { value: "inactive", label: "Inactive only" },
];

export function AutomationTab({
  nodes,
  stageAutomations,
  onAutomationsChange,
  onDirtyChange,
}: AutomationTabProps) {
  const [activeSubTab, setActiveSubTab] = useState("automations");
  const [searchQuery, setSearchQuery] = useState("");
  const [triggerFilter, setTriggerFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Local state for automation toggles
  const [localAutomations, setLocalAutomations] = useState<AutomationEntry[]>(automationEntries);

  // Get unique creators for filter dropdown
  const creators = useMemo(() => {
    const unique = [...new Set(localAutomations.map(a => a.createdBy))];
    return ["all", ...unique];
  }, [localAutomations]);

  const [createdByFilter, setCreatedByFilter] = useState("all");

  // Filter automations
  const filteredAutomations = useMemo(() => {
    return localAutomations.filter(automation => {
      // Search filter
      if (searchQuery && !automation.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Trigger filter
      if (triggerFilter !== "all" && automation.triggerType !== triggerFilter) {
        return false;
      }
      // Action filter
      if (actionFilter !== "all" && automation.actionType !== actionFilter) {
        return false;
      }
      // Type filter
      if (typeFilter !== "all" && automation.type !== typeFilter) {
        return false;
      }
      // Status filter
      if (statusFilter === "active" && !automation.active) {
        return false;
      }
      if (statusFilter === "inactive" && automation.active) {
        return false;
      }
      // Created by filter
      if (createdByFilter !== "all" && automation.createdBy !== createdByFilter) {
        return false;
      }
      return true;
    });
  }, [localAutomations, searchQuery, triggerFilter, actionFilter, typeFilter, statusFilter, createdByFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredAutomations.length / ITEMS_PER_PAGE);
  const paginatedAutomations = filteredAutomations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const clearFilters = () => {
    setSearchQuery("");
    setTriggerFilter("all");
    setActionFilter("all");
    setTypeFilter("all");
    setStatusFilter("all");
    setCreatedByFilter("all");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || triggerFilter !== "all" || actionFilter !== "all" || 
    typeFilter !== "all" || statusFilter !== "all" || createdByFilter !== "all";

  const handleToggleActive = (automationId: string, active: boolean) => {
    setLocalAutomations(prev => 
      prev.map(a => a.id === automationId ? { ...a, active } : a)
    );
    onDirtyChange();
  };

  const getTypeBadgeStyle = (type: AutomationEntry["type"]) => {
    switch (type) {
      case "custom":
        return "bg-muted text-muted-foreground border-border";
      case "system":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "template":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-background">
        <h2 className="text-xl font-semibold">Automation center</h2>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Automation
        </Button>
      </div>

      {/* Sub-tabs */}
      <div className="px-6 py-3 border-b bg-background">
        <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
          <TabsList className="bg-transparent p-0 h-auto gap-6">
            <TabsTrigger 
              value="automations" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-2"
            >
              Automations
            </TabsTrigger>
            <TabsTrigger 
              value="audit" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-2"
            >
              Audit History
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-2"
            >
              Analytics
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {activeSubTab === "automations" && (
        <div className="flex-1 flex flex-col min-h-0 overflow-auto">
          {/* Filter Bar */}
          <div className="flex items-center gap-2 px-6 py-4 border-b bg-background flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for automation"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 w-56"
              />
            </div>

            <Select value={triggerFilter} onValueChange={(v) => { setTriggerFilter(v); setCurrentPage(1); }}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="All Triggers" />
              </SelectTrigger>
              <SelectContent>
                {TRIGGER_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={actionFilter} onValueChange={(v) => { setActionFilter(v); setCurrentPage(1); }}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="All Actions" />
              </SelectTrigger>
              <SelectContent>
                {ACTION_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={createdByFilter} onValueChange={(v) => { setCreatedByFilter(v); setCurrentPage(1); }}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Created by All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Created by All</SelectItem>
                {creators.filter(c => c !== "all").map(creator => (
                  <SelectItem key={creator} value={creator}>{creator}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Active & Inactive" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setCurrentPage(1); }}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                {TYPE_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground gap-1">
                <X className="h-3 w-3" />
                Clear
              </Button>
            )}
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto px-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Automation name</TableHead>
                  <TableHead className="w-24">Type</TableHead>
                  <TableHead className="w-52">Last Run</TableHead>
                  <TableHead className="w-24">Triggered</TableHead>
                  <TableHead className="w-36">Created by</TableHead>
                  <TableHead className="w-20 text-center">Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAutomations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                      No automations found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedAutomations.map((automation) => (
                    <TableRow key={automation.id} className="cursor-pointer">
                      <TableCell className="font-medium">{automation.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getTypeBadgeStyle(automation.type)}>
                          {automation.type.charAt(0).toUpperCase() + automation.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {automation.lastRun || "N/A"}
                      </TableCell>
                      <TableCell className="font-medium">{automation.triggeredCount}</TableCell>
                      <TableCell className="text-muted-foreground">{automation.createdBy}</TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={automation.active}
                          onCheckedChange={(checked) => handleToggleActive(automation.id, checked)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t bg-background">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => i + 1).map(page => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}

      {activeSubTab === "audit" && (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <p>Audit History - Coming Soon</p>
        </div>
      )}

      {activeSubTab === "analytics" && (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <p>Analytics - Coming Soon</p>
        </div>
      )}
    </div>
  );
}
