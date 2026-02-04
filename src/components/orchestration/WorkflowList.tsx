import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PipelineTable } from "./PipelineTable";
import { useWorkflows } from "@/contexts/WorkflowContext";
import { useToast } from "@/hooks/use-toast";
import { CreatePipelineDialog } from "./CreatePipelineDialog";

export function WorkflowList() {
  const { workflows, updateWorkflow, deleteWorkflow } = useWorkflows();
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredWorkflows = workflows.filter(
    (wf) =>
      wf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wf.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleStatus = (workflow: { id: string; name: string; status: string }) => {
    const newStatus = workflow.status === "paused" ? "active" : "paused";
    updateWorkflow(workflow.id, { status: newStatus as "active" | "paused" });
    toast({
      title: `Workflow ${newStatus === "active" ? "Activated" : "Paused"}`,
      description: `"${workflow.name}" is now ${newStatus}.`,
    });
  };

  const handleDelete = (workflow: { id: string; name: string }) => {
    deleteWorkflow(workflow.id);
    toast({
      title: "Workflow Deleted",
      description: `"${workflow.name}" has been deleted.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Button className="gap-2" onClick={() => setCreateDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Create Pipeline
        </Button>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pipelines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Single Unified Table */}
      <PipelineTable
        workflows={filteredWorkflows}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
      />
      
      <CreatePipelineDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  );
}
