import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, FileText, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PipelineTable } from "./PipelineTable";
import { useWorkflows } from "@/contexts/WorkflowContext";
import { jobs } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { WorkflowTemplatesDialog, WorkflowTemplate } from "./WorkflowTemplatesDialog";

export function WorkflowList() {
  const navigate = useNavigate();
  const { workflows, updateWorkflow, deleteWorkflow } = useWorkflows();
  const [searchQuery, setSearchQuery] = useState("");
  const [templatesDialogOpen, setTemplatesDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredWorkflows = workflows.filter(
    (wf) =>
      wf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wf.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeWorkflows = filteredWorkflows.filter((wf) => wf.status === "active");
  const draftWorkflows = filteredWorkflows.filter((wf) => wf.status === "draft");
  const pausedWorkflows = filteredWorkflows.filter((wf) => wf.status === "paused");

  // Compute jobs count per workflow
  const getJobsCount = (workflowId: string) => {
    return jobs.filter(job => job.workflowId === workflowId).length;
  };

  const handleSelectTemplate = (template: WorkflowTemplate) => {
    // Navigate to builder with template ID
    navigate(`/ops/template-builder?template=${template.id}`);
  };

  const handleEdit = (workflow: { id: string }) => {
    // Navigate to visual builder with workflow ID
    navigate(`/ops/template-builder/${workflow.id}`);
  };

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
        <div className="flex gap-2">
          <Button className="gap-2" onClick={() => navigate("/ops/template-builder")}>
            <Plus className="h-4 w-4" />
            Create Pipeline
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => setTemplatesDialogOpen(true)}>
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
            placeholder="Search pipelines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Active Workflows - Table View */}
      {activeWorkflows.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Active Pipelines ({activeWorkflows.length})
          </h3>
          <PipelineTable
            workflows={activeWorkflows}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      )}

      {/* Paused Workflows - Table View */}
      {pausedWorkflows.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Paused Pipelines ({pausedWorkflows.length})
          </h3>
          <PipelineTable
            workflows={pausedWorkflows}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      )}

      {/* Draft Workflows - Table View with Delete */}
      {draftWorkflows.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Draft Pipelines ({draftWorkflows.length})
          </h3>
          <PipelineTable
            workflows={draftWorkflows}
            onDelete={handleDelete}
            showDeleteAction
          />
        </div>
      )}

      {filteredWorkflows.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No pipelines found matching your search.</p>
        </div>
      )}

      {/* Dialogs */}
      <WorkflowTemplatesDialog
        open={templatesDialogOpen}
        onOpenChange={setTemplatesDialogOpen}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  );
}
