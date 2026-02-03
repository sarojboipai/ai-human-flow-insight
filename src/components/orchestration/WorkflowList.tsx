import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, FileText, Download, Search, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WorkflowCard } from "./WorkflowCard";
import { Workflow, workflows as mockWorkflows, jobs } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { WorkflowBuilderDialog } from "./WorkflowBuilderDialog";
import { WorkflowTemplatesDialog, WorkflowTemplate } from "./WorkflowTemplatesDialog";

export function WorkflowList() {
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows);
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [templatesDialogOpen, setTemplatesDialogOpen] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow | null>(null);
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

  const handleSaveWorkflow = (workflowData: Partial<Workflow>) => {
    if (workflowData.id) {
      // Update existing
      setWorkflows((prev) =>
        prev.map((w) =>
          w.id === workflowData.id
            ? { ...w, ...workflowData, updatedAt: new Date().toISOString().split("T")[0] }
            : w
        )
      );
    } else {
      // Create new
      const newWorkflow: Workflow = {
        id: `wf-${String(workflows.length + 1).padStart(3, "0")}`,
        name: workflowData.name || "Untitled Workflow",
        description: workflowData.description || "",
        jobType: workflowData.jobType || "frontline",
        status: workflowData.status || "draft",
        stages: workflowData.stages || [],
        version: 1,
        executionCount: 0,
        successRate: 0,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        createdBy: "Current User",
      };
      setWorkflows((prev) => [...prev, newWorkflow]);
    }
    setEditingWorkflow(null);
  };

  const handleSelectTemplate = (template: WorkflowTemplate) => {
    // Pre-fill the form with template data
    const templateWorkflow: Workflow = {
      id: "",
      name: `${template.name} (Copy)`,
      description: template.description,
      jobType: template.jobType,
      status: "draft",
      stages: template.stages,
      version: 1,
      executionCount: 0,
      successRate: 0,
      createdAt: "",
      updatedAt: "",
      createdBy: "",
    };
    setEditingWorkflow(templateWorkflow);
    setCreateDialogOpen(true);
  };

  const handleEdit = (workflow: Workflow) => {
    setEditingWorkflow(workflow);
    setCreateDialogOpen(true);
  };

  const handleToggleStatus = (workflow: Workflow) => {
    const newStatus = workflow.status === "paused" ? "active" : "paused";
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === workflow.id
          ? { ...w, status: newStatus, updatedAt: new Date().toISOString().split("T")[0] }
          : w
      )
    );
    toast({
      title: `Workflow ${newStatus === "active" ? "Activated" : "Paused"}`,
      description: `"${workflow.name}" is now ${newStatus}.`,
    });
  };

  const handleDelete = (workflow: Workflow) => {
    setWorkflows((prev) => prev.filter((w) => w.id !== workflow.id));
    toast({
      title: "Workflow Deleted",
      description: `"${workflow.name}" has been deleted.`,
      variant: "destructive",
    });
  };

  const handleOpenCreate = () => {
    setEditingWorkflow(null);
    setCreateDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <Button className="gap-2" onClick={handleOpenCreate}>
            <Plus className="h-4 w-4" />
            Create Pipeline
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => navigate("/ops/template-builder")}>
            <LayoutGrid className="h-4 w-4" />
            Visual Builder
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

      {/* Active Workflows */}
      {activeWorkflows.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Active Pipelines ({activeWorkflows.length})
          </h3>
          <div className="space-y-4">
            {activeWorkflows.map((workflow) => (
              <WorkflowCard
                key={workflow.id}
                workflow={workflow}
                jobsCount={getJobsCount(workflow.id)}
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
            Paused Pipelines ({pausedWorkflows.length})
          </h3>
          <div className="space-y-4">
            {pausedWorkflows.map((workflow) => (
              <WorkflowCard
                key={workflow.id}
                workflow={workflow}
                jobsCount={getJobsCount(workflow.id)}
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
            Draft Pipelines ({draftWorkflows.length})
          </h3>
          <div className="space-y-4">
            {draftWorkflows.map((workflow) => (
              <WorkflowCard
                key={workflow.id}
                workflow={workflow}
                jobsCount={getJobsCount(workflow.id)}
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
          <p>No pipelines found matching your search.</p>
        </div>
      )}

      {/* Dialogs */}
      <WorkflowBuilderDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        workflow={editingWorkflow}
        onSave={handleSaveWorkflow}
      />
      <WorkflowTemplatesDialog
        open={templatesDialogOpen}
        onOpenChange={setTemplatesDialogOpen}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  );
}
