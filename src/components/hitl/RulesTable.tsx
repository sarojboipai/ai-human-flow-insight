import { useState } from "react";
import {
  Edit2,
  Trash2,
  Play,
  Pause,
  MoreHorizontal,
  AlertCircle,
  Search,
  Filter,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { HITLRuleV2, RuleType } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface RulesTableProps {
  rules: HITLRuleV2[];
  onEdit: (rule: HITLRuleV2) => void;
  onDelete: (ruleId: string) => void;
  onToggleStatus: (ruleId: string, newStatus: "active" | "paused") => void;
  onSimulate: (rule: HITLRuleV2) => void;
}

const ruleTypeColors: Record<RuleType, string> = {
  confidence: "bg-info/20 text-info border-info/30",
  business: "bg-primary/20 text-primary border-primary/30",
  anomaly: "bg-warning/20 text-warning border-warning/30",
  sla: "bg-destructive/20 text-destructive border-destructive/30",
  posting: "bg-violet-500/20 text-violet-500 border-violet-500/30",
  sourcing: "bg-teal-500/20 text-teal-500 border-teal-500/30",
  outreach: "bg-pink-500/20 text-pink-500 border-pink-500/30",
  interview: "bg-indigo-500/20 text-indigo-500 border-indigo-500/30",
  application: "bg-cyan-500/20 text-cyan-500 border-cyan-500/30",
  screening: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30",
};

const priorityLabels: Record<number, { label: string; color: string }> = {
  1: { label: "P1", color: "bg-destructive/20 text-destructive" },
  2: { label: "P2", color: "bg-warning/20 text-warning" },
  3: { label: "P3", color: "bg-info/20 text-info" },
  4: { label: "P4", color: "bg-muted text-muted-foreground" },
  5: { label: "P5", color: "bg-muted text-muted-foreground" },
};

const ruleTypeToStage: Record<RuleType, string> = {
  posting: "Job Posting",
  sourcing: "Sourcing",
  outreach: "Outreach",
  application: "Application",
  screening: "Screening",
  interview: "Interview",
  confidence: "Cross-Stage",
  business: "Cross-Stage",
  anomaly: "Cross-Stage",
  sla: "Cross-Stage",
};

export function RulesTable({
  rules,
  onEdit,
  onDelete,
  onToggleStatus,
  onSimulate,
}: RulesTableProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<RuleType | "all">("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ruleToDelete, setRuleToDelete] = useState<HITLRuleV2 | null>(null);

  const filteredRules = rules.filter((rule) => {
    const matchesSearch =
      rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || rule.ruleType === filterType;
    return matchesSearch && matchesType;
  });

  const handleDeleteClick = (rule: HITLRuleV2) => {
    setRuleToDelete(rule);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (ruleToDelete) {
      onDelete(ruleToDelete.id);
      toast({
        title: "Rule Deleted",
        description: `"${ruleToDelete.name}" has been deleted.`,
      });
    }
    setDeleteDialogOpen(false);
    setRuleToDelete(null);
  };

  const formatCondition = (rule: HITLRuleV2) => {
    const metricLabel = rule.conditionMetric.replace(/_/g, " ");
    return `${metricLabel} ${rule.operator} ${rule.thresholdValue}`;
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="capitalize">
                {filterType === "all" ? "All Types" : filterType}
              </span>
              {filterType !== "all" && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                  1
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-popover border-border">
            {(["all", "confidence", "business", "anomaly", "sla", "posting", "sourcing", "outreach", "interview", "application", "screening"] as const).map(
              (type) => (
                <DropdownMenuItem
                  key={type}
                  onClick={() => setFilterType(type)}
                  className="capitalize gap-2"
                >
                  {filterType === type && <Check className="h-4 w-4" />}
                  {filterType !== type && <span className="w-4" />}
                  {type === "all" ? "All Types" : type}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">
                Stage
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Name
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Type
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Condition
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Action
              </TableHead>
              <TableHead className="text-muted-foreground font-medium text-center">
                Priority
              </TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">
                Triggers
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Last Triggered
              </TableHead>
              <TableHead className="text-muted-foreground font-medium w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRules.map((rule) => (
              <TableRow key={rule.id} className="border-border">
                <TableCell>
                  <span className={ruleTypeToStage[rule.ruleType] === "Cross-Stage" ? "text-muted-foreground" : ""}>
                    {ruleTypeToStage[rule.ruleType]}
                  </span>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{rule.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {rule.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`capitalize ${ruleTypeColors[rule.ruleType]}`}
                  >
                    {rule.ruleType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                    {formatCondition(rule)}
                  </code>
                </TableCell>
                <TableCell>
                  <span className="text-sm capitalize">
                    {rule.actionType.replace(/_/g, " ")}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={priorityLabels[rule.priority]?.color || ""}
                  >
                    {priorityLabels[rule.priority]?.label || `P${rule.priority}`}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">
                  {rule.triggerCount.toLocaleString()}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {rule.lastTriggered || "Never"}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-popover border-border"
                    >
                      <DropdownMenuItem onClick={() => onEdit(rule)}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit Rule
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onSimulate(rule)}>
                        <Play className="h-4 w-4 mr-2" />
                        Simulate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          onToggleStatus(
                            rule.id,
                            rule.status === "active" ? "paused" : "active"
                          )
                        }
                      >
                        {rule.status === "active" ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Pause Rule
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Activate Rule
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(rule)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Rule
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredRules.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <AlertCircle className="h-8 w-8" />
                    <p>No rules found</p>
                    <p className="text-sm">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Rule</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{ruleToDelete?.name}"? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
