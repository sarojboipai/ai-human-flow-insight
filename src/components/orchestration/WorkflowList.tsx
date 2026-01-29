import { useState } from "react";
import { Plus, FileText, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WorkflowCard } from "./WorkflowCard";
import { Workflow, workflows as mockWorkflows } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export function WorkflowList() {
  const [workflows] = useState<Workflow[]>(mockWorkflows);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filteredWorkflows = workflows.filter(
    (wf) =>
      wf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wf.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeWorkflows = filteredWorkflows.filter((wf) => wf.status === "active");
  const draftWorkflows = filteredWorkflows.filter((wf) => wf.status === "draft");
  const pausedWorkflows = filteredWorkflows.filter((wf) => wf.status === "paused");

  const handleEdit = (workflow: Workflow) => {
    toast({
      title: "Edit Workflow",
      description: `Opening editor for "${workflow.name}"...`,
    });
  };

  const handleToggleStatus = (workflow: Workflow) => {
    const newStatus = workflow.status === "paused" ? "active" : "paused";
    toast({
      title: `Workflow ${newStatus === "active" ? "Activated" : "Paused"}`,
      description: `"${workflow.name}" is now ${newStatus}.`,
    });
  };

  const handleDelete = (workflow: Workflow) => {
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
        <div className="flex gap-2">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Workflow
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Templates
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Import
          </Button>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Active Workflows */}
      {activeWorkflows.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Active Workflows ({activeWorkflows.length})
          </h3>
          <div className="space-y-4">
            {activeWorkflows.map((workflow) => (
              <WorkflowCard
                key={workflow.id}
                workflow={workflow}
                onEdit={handleEdit}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        </div>
      )}

      {/* Paused Workflows */}
      {pausedWorkflows.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Paused Workflows ({pausedWorkflows.length})
          </h3>
          <div className="space-y-4">
            {pausedWorkflows.map((workflow) => (
              <WorkflowCard
                key={workflow.id}
                workflow={workflow}
                onEdit={handleEdit}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        </div>
      )}

      {/* Draft Workflows */}
      {draftWorkflows.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Draft Workflows ({draftWorkflows.length})
          </h3>
          <div className="space-y-4">
            {draftWorkflows.map((workflow) => (
              <WorkflowCard
                key={workflow.id}
                workflow={workflow}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      {filteredWorkflows.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No workflows found matching your search.</p>
        </div>
      )}
    </div>
  );
}
