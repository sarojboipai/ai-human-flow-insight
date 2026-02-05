import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate, useParams, useSearchParams, useLocation } from "react-router-dom";
import {
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Upload, AlertCircle, CheckCircle } from "lucide-react";
import { type TemplateMetadata } from "@/components/orchestration/TemplateMetadataForm";
import {
  TemplateEditorTabs,
  type TemplateEditorTab,
} from "@/components/orchestration/TemplateEditorTabs";
import { AutomationTab } from "@/components/orchestration/AutomationTab";
import { RulesTab } from "@/components/orchestration/RulesTab";
import { WorkflowTab } from "@/components/orchestration/WorkflowTab";
import {
  pipelineTemplates,
  Workflow,
  WorkflowStage,
  StageAutomation,
  HITLRuleV2,
  hitlRulesV2,
} from "@/lib/mockData";
import { useWorkflows } from "@/contexts/WorkflowContext";

interface StageNodeData extends Record<string, unknown> {
  label: string;
  stageType: "ai" | "automation" | "human" | "decision" | "entry" | "exit";
  icon?: string;
  agentId?: string;
  humanRole?: string;
  slaHours?: number;
  onDelete?: () => void;
  onSelect?: () => void;
  isSelected?: boolean;
}

const DEFAULT_METADATA: TemplateMetadata = {
  name: "",
  hiringType: "bulk",
  profession: "nurse",
  jobZone: 1,
  locationTier: "tier_1",
  industry: "hospital",
  defaultSLAProfile: "standard",
  defaultAICoverage: 70,
  enterpriseOverrideAllowed: false,
  complianceRequired: false,
};

// Initial nodes for a new template
const INITIAL_NODES: Node<StageNodeData>[] = [
  {
    id: "start",
    type: "entryExit",
    position: { x: 50, y: 200 },
    data: { label: "Start", stageType: "entry", icon: "play" },
  },
  {
    id: "end",
    type: "entryExit",
    position: { x: 1200, y: 200 },
    data: { label: "End", stageType: "exit", icon: "flag" },
  },
];

const INITIAL_EDGES: Edge[] = [];

// Helper to convert nodes to workflow stages
const nodesToStages = (nodes: Node<StageNodeData>[]): WorkflowStage[] => {
  return nodes
    .filter((n) => !["entry", "exit"].includes(n.data.stageType))
    .map((n) => ({
      id: n.id,
      name: n.data.label,
      type: "match" as const,
      assignedActor:
        n.data.stageType === "ai"
          ? ("ai" as const)
          : n.data.stageType === "human"
          ? ("human" as const)
          : ("hybrid" as const),
      agentId: n.data.agentId || null,
      humanBackup: n.data.humanRole || "Recruiter Team",
      slaHours: n.data.slaHours || 24,
      retryPolicy: { maxRetries: 2, backoffMinutes: 30 },
    }));
};

export default function PipelineTemplateBuilder() {
  const { templateId } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const templateParam = searchParams.get("template");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addWorkflow, updateWorkflow, getWorkflow } = useWorkflows();

  // Get metadata from navigation state (for new pipelines created via dialog)
  const initialMetadata = (
    location.state as { metadata?: Partial<TemplateMetadata> } | null
  )?.metadata;

  // Tab state
  const [activeTab, setActiveTab] = useState<TemplateEditorTab>("workflow");

  // Template metadata
  const [metadata, setMetadata] = useState<TemplateMetadata>(() => ({
    ...DEFAULT_METADATA,
    ...(initialMetadata || {}),
  }));

  // Workflow state
  const [nodes, setNodes] = useNodesState(INITIAL_NODES);
  const [edges, setEdges] = useEdgesState(INITIAL_EDGES);

  // Automation state
  const [stageAutomations, setStageAutomations] = useState<StageAutomation[]>([]);

  // Rules state
  const [templateRules, setTemplateRules] = useState<HITLRuleV2[]>(() =>
    hitlRulesV2.slice(0, 5)
  );

  // Dirty state tracking per section
  const [isDirtyWorkflow, setIsDirtyWorkflow] = useState(false);
  const [isDirtyAutomation, setIsDirtyAutomation] = useState(false);
  const [isDirtyRules, setIsDirtyRules] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const isEditing = !!templateId;
  const isDirty = isDirtyWorkflow || isDirtyAutomation || isDirtyRules;

  // Load existing workflow or template on mount
  useEffect(() => {
    if (isLoaded) return;

    if (templateId) {
      // Load existing workflow for editing
      const workflow = getWorkflow(templateId);
      if (workflow) {
        setMetadata({
          name: workflow.name,
          hiringType:
            workflow.hiringType ||
            (workflow.jobType === "frontline"
              ? "bulk"
              : workflow.jobType === "professional"
              ? "fast_track"
              : "niche"),
          profession: workflow.profession || "nurse",
          jobZone: workflow.jobZone || 1,
          locationTier: workflow.locationTier || "tier_1",
          industry: workflow.industry || "hospital",
          defaultSLAProfile: "standard",
          defaultAICoverage: 70,
          enterpriseOverrideAllowed: false,
          complianceRequired: false,
        });

        // Convert workflow stages to nodes
        const stageNodes: Node<StageNodeData>[] = workflow.stages.map(
          (stage, index) => ({
            id: stage.id,
            type:
              stage.assignedActor === "ai"
                ? "aiStage"
                : stage.assignedActor === "human"
                ? "humanStage"
                : "automationStage",
            position: workflow.nodePositions?.[stage.id] || {
              x: 200 + index * 250,
              y: 200,
            },
            data: {
              label: stage.name,
              stageType:
                stage.assignedActor === "ai"
                  ? "ai"
                  : stage.assignedActor === "human"
                  ? "human"
                  : "automation",
              slaHours: stage.slaHours || 24,
              agentId: stage.agentId || undefined,
              humanRole: stage.humanBackup || undefined,
            },
          })
        );

        // Load connections if they exist
        if (workflow.connections) {
          const loadedEdges: Edge[] = workflow.connections.map((conn, idx) => ({
            id: `edge-${idx}`,
            source: conn.source,
            target: conn.target,
            type: "smoothstep",
            animated: true,
          }));
          setEdges(loadedEdges);
        }

        setNodes([...INITIAL_NODES, ...stageNodes] as any);
      }
    } else if (templateParam) {
      // Load from template
      const template = pipelineTemplates.find((t) => t.id === templateParam);
      if (template) {
        setMetadata({
          name: `${template.name} (Copy)`,
          hiringType: template.hiringType,
          profession: template.profession,
          jobZone: template.jobZone,
          locationTier: "tier_1",
          industry: "hospital",
          defaultSLAProfile: "standard",
          defaultAICoverage: template.defaultAICoverage,
          enterpriseOverrideAllowed: false,
          complianceRequired: false,
        });

        // Convert template stages to nodes
        const stageNodes: Node<StageNodeData>[] = template.stages.map(
          (stage, index) => ({
            id: `${stage.id}-${Date.now()}`,
            type:
              stage.assignedActor === "ai"
                ? "aiStage"
                : stage.assignedActor === "human"
                ? "humanStage"
                : "automationStage",
            position: { x: 200 + index * 250, y: 200 },
            data: {
              label: stage.name,
              stageType:
                stage.assignedActor === "ai"
                  ? "ai"
                  : stage.assignedActor === "human"
                  ? "human"
                  : "automation",
              slaHours: 24,
            },
          })
        );

        setNodes([...INITIAL_NODES, ...stageNodes] as any);
        setIsDirtyWorkflow(true);
      }
    }

    setIsLoaded(true);
  }, [templateId, templateParam, isLoaded, setNodes, setEdges, getWorkflow]);

  // Validation
  const validationErrors = useMemo(() => {
    const errors: string[] = [];

    if (!metadata.name.trim()) {
      errors.push("Template name is required");
    }

    const hasStart = nodes.some((n) => n.data.stageType === "entry");
    const hasEnd = nodes.some((n) => n.data.stageType === "exit");

    if (!hasStart) errors.push("Start node is required");
    if (!hasEnd) errors.push("End node is required");

    // Check for orphan nodes
    const connectedNodeIds = new Set<string>();
    edges.forEach((e) => {
      connectedNodeIds.add(e.source);
      connectedNodeIds.add(e.target);
    });

    const orphanNodes = nodes.filter(
      (n) =>
        n.data.stageType !== "entry" &&
        n.data.stageType !== "exit" &&
        !connectedNodeIds.has(n.id)
    );

    if (orphanNodes.length > 0) {
      errors.push(`${orphanNodes.length} node(s) are not connected`);
    }

    // Check AI/Automation nodes have agents assigned
    const unassignedAINodes = nodes.filter(
      (n) =>
        (n.data.stageType === "ai" || n.data.stageType === "automation") &&
        !n.data.agentId
    );

    if (unassignedAINodes.length > 0) {
      errors.push(
        `${unassignedAINodes.length} AI/Automation node(s) need agents assigned`
      );
    }

    // Check Human nodes have roles assigned
    const unassignedHumanNodes = nodes.filter(
      (n) => n.data.stageType === "human" && !n.data.humanRole
    );

    if (unassignedHumanNodes.length > 0) {
      errors.push(
        `${unassignedHumanNodes.length} Human node(s) need roles assigned`
      );
    }

    return errors;
  }, [nodes, edges, metadata]);

  // Build workflow object from current state
  const buildWorkflowData = useCallback(
    (status: "draft" | "active"): Workflow => {
      // Build node positions map
      const nodePositions: Record<string, { x: number; y: number }> = {};
      nodes.forEach((n) => {
        nodePositions[n.id] = n.position;
      });

      // Build connections array
      const connections = edges.map((e) => ({
        source: e.source,
        target: e.target,
      }));

      // Map hiring type to job type
      const jobTypeMap: Record<
        string,
        "frontline" | "professional" | "enterprise"
      > = {
        bulk: "frontline",
        fast_track: "professional",
        niche: "enterprise",
      };

      return {
        id: templateId || `wf-${Date.now()}`,
        name: metadata.name,
        description: `${metadata.profession} pipeline for ${metadata.industry}`,
        version: 1,
        status,
        jobType: jobTypeMap[metadata.hiringType] || "frontline",
        stages: nodesToStages(nodes as Node<StageNodeData>[]),
        createdBy: "Current User",
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        executionCount: 0,
        successRate: 0,
        // New metadata fields
        profession: metadata.profession,
        jobZone: metadata.jobZone,
        locationTier: metadata.locationTier,
        industry: metadata.industry,
        hiringType: metadata.hiringType,
        nodePositions,
        connections,
      };
    },
    [nodes, edges, metadata, templateId]
  );

  const handleSaveDraft = useCallback(() => {
    if (!metadata.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a template name",
        variant: "destructive",
      });
      return;
    }

    const workflowData = buildWorkflowData("draft");

    if (isEditing) {
      updateWorkflow(templateId!, workflowData);
    } else {
      addWorkflow(workflowData);
    }

    toast({
      title: "Draft Saved",
      description: `Template "${metadata.name}" has been saved as draft.`,
    });
    setIsDirtyWorkflow(false);
    setIsDirtyAutomation(false);
    setIsDirtyRules(false);
    navigate("/ops/pipeline-config");
  }, [
    metadata,
    buildWorkflowData,
    isEditing,
    templateId,
    updateWorkflow,
    addWorkflow,
    toast,
    navigate,
  ]);

  const handlePublish = useCallback(() => {
    if (validationErrors.length > 0) {
      toast({
        title: "Cannot Publish",
        description: validationErrors[0],
        variant: "destructive",
      });
      return;
    }

    const workflowData = buildWorkflowData("active");

    if (isEditing) {
      updateWorkflow(templateId!, workflowData);
    } else {
      addWorkflow(workflowData);
    }

    toast({
      title: "Template Published",
      description: `Template "${metadata.name}" is now available for use.`,
    });
    setIsDirtyWorkflow(false);
    setIsDirtyAutomation(false);
    setIsDirtyRules(false);
    navigate("/ops/pipeline-config");
  }, [
    metadata,
    validationErrors,
    buildWorkflowData,
    isEditing,
    templateId,
    updateWorkflow,
    addWorkflow,
    toast,
    navigate,
  ]);

  // Tab content rendering
  const renderTabContent = () => {
    switch (activeTab) {
      case "workflow":
        return (
          <WorkflowTab
            nodes={nodes as Node<any>[]}
            edges={edges}
            onNodesChange={(newNodes) => setNodes(newNodes as any)}
            onEdgesChange={setEdges}
            onDirtyChange={() => setIsDirtyWorkflow(true)}
          />
        );

      case "automation":
        return (
          <AutomationTab
            nodes={nodes as Node<any>[]}
            stageAutomations={stageAutomations}
            onAutomationsChange={setStageAutomations}
            onDirtyChange={() => setIsDirtyAutomation(true)}
          />
        );

      case "rules":
        return (
          <RulesTab
            nodes={nodes as Node<any>[]}
            templateRules={templateRules}
            onRulesChange={setTemplateRules}
            onDirtyChange={() => setIsDirtyRules(true)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <ReactFlowProvider>
      <div className="h-screen flex flex-col bg-background">
        {/* Header */}
        <div className="border-b px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/ops/pipeline-config")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">
                {isEditing ? "Edit Template" : "New Pipeline Template"}
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {metadata.name ? (
                  <span className="font-medium text-foreground">
                    {metadata.name}
                  </span>
                ) : (
                  <span className="italic">Untitled Template</span>
                )}
                {isDirty && (
                  <Badge variant="outline" className="text-xs">
                    Unsaved
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Validation Status */}
            {validationErrors.length > 0 ? (
              <div className="flex items-center gap-1.5 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">
                  {validationErrors.length} issue(s)
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Ready to publish</span>
              </div>
            )}

            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button
              onClick={handlePublish}
              disabled={validationErrors.length > 0}
            >
              <Upload className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        {/* Tab Selector Bar */}
        <TemplateEditorTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isDirtyWorkflow={isDirtyWorkflow}
          isDirtyAutomation={isDirtyAutomation}
          isDirtyRules={isDirtyRules}
        />

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </ReactFlowProvider>
  );
}
