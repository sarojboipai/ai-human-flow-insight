import { useState, useCallback, useMemo, useRef, DragEvent, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  type Node,
  type Edge,
  type Connection,
  type NodeChange,
  type EdgeChange,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Upload, AlertCircle, CheckCircle } from "lucide-react";
import { StagePalette } from "@/components/orchestration/StagePalette";
import { NodeConfigPanel } from "@/components/orchestration/NodeConfigPanel";
import { TemplateMetadataForm, type TemplateMetadata } from "@/components/orchestration/TemplateMetadataForm";
import {
  EditableStageNode,
  EditableAINode,
  EditableHumanNode,
  EditableDecisionNode,
  EditableEntryExitNode,
  EditableAutomationNode,
} from "@/components/orchestration/pipeline-nodes";
import { agents, workflows, pipelineTemplates } from "@/lib/mockData";

const nodeTypes = {
  stageNode: EditableStageNode,
  aiStage: EditableAINode,
  humanStage: EditableHumanNode,
  automationStage: EditableAutomationNode,
  decisionGateway: EditableDecisionNode,
  entryExit: EditableEntryExitNode,
};

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

export default function PipelineTemplateBuilder() {
  const { templateId } = useParams();
  const [searchParams] = useSearchParams();
  const templateParam = searchParams.get("template");
  const navigate = useNavigate();
  const { toast } = useToast();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  
  const [metadata, setMetadata] = useState<TemplateMetadata>(DEFAULT_METADATA);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const isEditing = !!templateId;

  // Load existing workflow or template on mount
  useEffect(() => {
    if (isLoaded) return;
    
    if (templateId) {
      // Load existing workflow for editing
      const workflow = workflows.find(w => w.id === templateId);
      if (workflow) {
        setMetadata({
          name: workflow.name,
          hiringType: workflow.jobType === "frontline" ? "bulk" : workflow.jobType === "professional" ? "fast_track" : "niche",
          profession: "nurse",
          jobZone: 1,
          defaultSLAProfile: "standard",
          defaultAICoverage: 70,
          enterpriseOverrideAllowed: false,
          complianceRequired: false,
        });
        
        // Convert workflow stages to nodes
        const stageNodes: Node<StageNodeData>[] = workflow.stages.map((stage, index) => ({
          id: stage.id,
          type: stage.assignedActor === "ai" ? "aiStage" : stage.assignedActor === "human" ? "humanStage" : "automationStage",
          position: { x: 200 + index * 250, y: 200 },
          data: {
            label: stage.name,
            stageType: stage.assignedActor === "ai" ? "ai" : stage.assignedActor === "human" ? "human" : "automation",
            slaHours: 24,
          },
        }));
        
        setNodes([...INITIAL_NODES, ...stageNodes] as any);
        setIsDirty(false);
      }
    } else if (templateParam) {
      // Load from template
      const template = pipelineTemplates.find(t => t.id === templateParam);
      if (template) {
        setMetadata({
          name: `${template.name} (Copy)`,
          hiringType: template.hiringType,
          profession: template.profession,
          jobZone: template.jobZone,
          defaultSLAProfile: "standard",
          defaultAICoverage: template.defaultAICoverage,
          enterpriseOverrideAllowed: false,
          complianceRequired: false,
        });
        
        // Convert template stages to nodes
        const stageNodes: Node<StageNodeData>[] = template.stages.map((stage, index) => ({
          id: `${stage.id}-${Date.now()}`,
          type: stage.assignedActor === "ai" ? "aiStage" : stage.assignedActor === "human" ? "humanStage" : "automationStage",
          position: { x: 200 + index * 250, y: 200 },
          data: {
            label: stage.name,
            stageType: stage.assignedActor === "ai" ? "ai" : stage.assignedActor === "human" ? "human" : "automation",
            slaHours: 24,
          },
        }));
        
        setNodes([...INITIAL_NODES, ...stageNodes] as any);
        setIsDirty(true);
      }
    }
    
    setIsLoaded(true);
  }, [templateId, templateParam, isLoaded, setNodes]);

  const selectedNode = useMemo(() => {
    const found = nodes.find(n => n.id === selectedNodeId);
    return found || null;
  }, [nodes, selectedNodeId]);

  // Validation
  const validationErrors = useMemo(() => {
    const errors: string[] = [];
    
    if (!metadata.name.trim()) {
      errors.push("Template name is required");
    }
    
    const hasStart = nodes.some(n => n.data.stageType === "entry");
    const hasEnd = nodes.some(n => n.data.stageType === "exit");
    
    if (!hasStart) errors.push("Start node is required");
    if (!hasEnd) errors.push("End node is required");
    
    // Check for orphan nodes
    const connectedNodeIds = new Set<string>();
    edges.forEach(e => {
      connectedNodeIds.add(e.source);
      connectedNodeIds.add(e.target);
    });
    
    const orphanNodes = nodes.filter(n => 
      n.data.stageType !== "entry" && 
      n.data.stageType !== "exit" && 
      !connectedNodeIds.has(n.id)
    );
    
    if (orphanNodes.length > 0) {
      errors.push(`${orphanNodes.length} node(s) are not connected`);
    }
    
    // Check AI/Automation nodes have agents assigned
    const unassignedAINodes = nodes.filter(n => 
      (n.data.stageType === "ai" || n.data.stageType === "automation") && 
      !n.data.agentId
    );
    
    if (unassignedAINodes.length > 0) {
      errors.push(`${unassignedAINodes.length} AI/Automation node(s) need agents assigned`);
    }
    
    // Check Human nodes have roles assigned
    const unassignedHumanNodes = nodes.filter(n => 
      n.data.stageType === "human" && 
      !n.data.humanRole
    );
    
    if (unassignedHumanNodes.length > 0) {
      errors.push(`${unassignedHumanNodes.length} Human node(s) need roles assigned`);
    }
    
    return errors;
  }, [nodes, edges, metadata]);

  const handleNodesChange = useCallback((changes: any) => {
    onNodesChange(changes);
    setIsDirty(true);
  }, [onNodesChange]);

  const handleEdgesChange = useCallback((changes: any) => {
    onEdgesChange(changes);
    setIsDirty(true);
  }, [onEdgesChange]);

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge({
      ...params,
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2 },
    }, eds));
    setIsDirty(true);
  }, [setEdges]);

  const handleNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const handleDeleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null);
    }
    setIsDirty(true);
  }, [setNodes, setEdges, selectedNodeId]);

  const handleUpdateNode = useCallback((nodeId: string, data: Partial<StageNodeData>) => {
    setNodes((nds) => 
      nds.map((n) => n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n)
    );
    setIsDirty(true);
  }, [setNodes]);

  // Drag and drop from palette
  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event: DragEvent) => {
    event.preventDefault();

    if (!reactFlowWrapper.current || !reactFlowInstance) return;

    const type = event.dataTransfer.getData("application/reactflow/type");
    const label = event.dataTransfer.getData("application/reactflow/label");
    const stageType = event.dataTransfer.getData("application/reactflow/stageType") as StageNodeData["stageType"];
    const icon = event.dataTransfer.getData("application/reactflow/icon");

    if (!type) return;

    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    // Snap to grid
    const snappedPosition = {
      x: Math.round(position.x / 20) * 20,
      y: Math.round(position.y / 20) * 20,
    };

    const newNode = {
      id: `${stageType}-${Date.now()}`,
      type,
      position: snappedPosition,
      data: {
        label,
        stageType,
        icon,
        slaHours: 24,
      },
    };

    setNodes((nds) => [...nds, newNode] as any);
    setIsDirty(true);
  }, [reactFlowInstance, setNodes]);

  const handleSaveDraft = useCallback(() => {
    if (!metadata.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a template name",
        variant: "destructive",
      });
      return;
    }
    
    // Save logic here (would connect to backend)
    toast({
      title: "Draft Saved",
      description: `Template "${metadata.name}" has been saved as draft.`,
    });
    setIsDirty(false);
  }, [metadata, toast]);

  const handlePublish = useCallback(() => {
    if (validationErrors.length > 0) {
      toast({
        title: "Cannot Publish",
        description: validationErrors[0],
        variant: "destructive",
      });
      return;
    }
    
    // Publish logic here (would connect to backend)
    toast({
      title: "Template Published",
      description: `Template "${metadata.name}" is now available for use.`,
    });
    setIsDirty(false);
    navigate("/ops/orchestration");
  }, [metadata, validationErrors, toast, navigate]);

  return (
    <ReactFlowProvider>
      <div className="h-screen flex flex-col bg-background">
        {/* Header */}
        <div className="border-b px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/ops/orchestration")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">
                {isEditing ? "Edit Template" : "New Pipeline Template"}
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {metadata.name ? (
                  <span className="font-medium text-foreground">{metadata.name}</span>
                ) : (
                  <span className="italic">Untitled Template</span>
                )}
                {isDirty && <Badge variant="outline" className="text-xs">Unsaved</Badge>}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Validation Status */}
            {validationErrors.length > 0 ? (
              <div className="flex items-center gap-1.5 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{validationErrors.length} issue(s)</span>
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
            <Button onClick={handlePublish} disabled={validationErrors.length > 0}>
              <Upload className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        {/* Metadata Form */}
        <TemplateMetadataForm 
          metadata={metadata} 
          onChange={(updates) => {
            setMetadata(prev => ({ ...prev, ...updates }));
            setIsDirty(true);
          }}
        />

        {/* Main Canvas Area */}
        <div className="flex-1 flex min-h-0">
          {/* Left Sidebar - Stage Palette */}
          <StagePalette />

          {/* Canvas */}
          <div className="flex-1 relative" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes.map(n => {
                const nodeData = n.data as StageNodeData;
                return {
                  ...n,
                  data: {
                    ...nodeData,
                    isSelected: n.id === selectedNodeId,
                    onDelete: () => handleDeleteNode(n.id),
                    onSelect: () => setSelectedNodeId(n.id),
                  }
                };
              })}
              edges={edges}
              onNodesChange={handleNodesChange}
              onEdgesChange={handleEdgesChange}
              onConnect={onConnect}
              onNodeClick={handleNodeClick}
              onPaneClick={handlePaneClick}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              snapToGrid
              snapGrid={[20, 20]}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              defaultEdgeOptions={{
                type: "smoothstep",
                animated: true,
                style: { strokeWidth: 2 },
              }}
            >
              <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#e2e8f0" />
              <Controls showInteractive={false} className="!bg-background !border !shadow-md" />
              <MiniMap
                nodeColor={(node) => {
                  const stageType = (node.data as Record<string, unknown>).stageType as string;
                  switch (stageType) {
                    case "ai": return "#f97316";
                    case "human": return "#3b82f6";
                    case "automation": return "#10b981";
                    case "decision": return "#1e293b";
                    case "entry":
                    case "exit": return "#6b7280";
                    default: return "#94a3b8";
                  }
                }}
                maskColor="rgba(0, 0, 0, 0.1)"
                className="!bg-background/80 !border !shadow-sm"
              />
            </ReactFlow>
          </div>

          {/* Right Sidebar - Node Config */}
          <NodeConfigPanel
            node={selectedNode}
            agents={agents}
            onUpdate={(data) => selectedNodeId && handleUpdateNode(selectedNodeId, data)}
            onClose={() => setSelectedNodeId(null)}
          />
        </div>
      </div>
    </ReactFlowProvider>
  );
}
