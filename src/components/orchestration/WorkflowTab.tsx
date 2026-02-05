import React, { useCallback, useRef, useState, useEffect, useMemo } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  type Node,
  type Edge,
  type Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, Trash2 } from "lucide-react";
import { FloatingAddMenu } from "@/components/orchestration/FloatingAddMenu";
import {
  TriggerNode,
  StageCardNode,
  ConditionNode,
  ActionNode,
  OutputNode,
  LabeledEdge,
  type WorkflowNodeData,
} from "@/components/orchestration/workflow-nodes";
import { NodeConfigPanel } from "@/components/orchestration/NodeConfigPanel";
import { agents } from "@/lib/mockData";

// Register new node types
const nodeTypes = {
  triggerNode: TriggerNode,
  stageCardNode: StageCardNode,
  conditionNode: ConditionNode,
  actionNode: ActionNode,
  outputNode: OutputNode,
};

// Register edge types
const edgeTypes = {
  labeled: LabeledEdge,
};

export interface StageNodeData extends Record<string, unknown> {
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

interface WorkflowTabProps {
  nodes: Node<StageNodeData>[];
  edges: Edge[];
  onNodesChange: (nodes: Node<StageNodeData>[]) => void;
  onEdgesChange: (edges: Edge[]) => void;
  onDirtyChange: () => void;
  workflowDescription?: string;
  onDescriptionChange?: (description: string) => void;
}

// Sample nodes for demo
const DEMO_NODES: Node<WorkflowNodeData>[] = [
  {
    id: "trigger-1",
    type: "triggerNode",
    position: { x: 400, y: 50 },
    data: {
      label: "Trigger",
      nodeCategory: "trigger",
      subtitle: "en_%, external",
      metadata: { jobId: "P-139434" },
    },
  },
  {
    id: "candidate-1",
    type: "stageCardNode",
    position: { x: 400, y: 170 },
    data: {
      label: "Candidate Details V2",
      nodeCategory: "stage",
      icon: "user",
      iconColor: "purple",
      subtitle: "First name, Last name, Email address, Phone number",
    },
  },
  {
    id: "screening-1",
    type: "stageCardNode",
    position: { x: 400, y: 290 },
    data: {
      label: "Screening Questions",
      nodeCategory: "stage",
      icon: "help",
      iconColor: "coral",
      subtitle: "2 Questions",
    },
  },
  {
    id: "condition-1",
    type: "conditionNode",
    position: { x: 400, y: 410 },
    data: {
      label: "Condition",
      nodeCategory: "condition",
      conditions: {
        qualified: "Are you currently in $(location)... is Yes",
        knockout: "Are you currently in $(location)... is No",
      },
    },
  },
  {
    id: "update-qualified",
    type: "actionNode",
    position: { x: 200, y: 560 },
    data: {
      label: "Update Status",
      nodeCategory: "action",
      actionType: "update_status",
      metadata: { Type: "Screening Status", Status: "Qualified" },
    },
  },
  {
    id: "update-knockout",
    type: "actionNode",
    position: { x: 600, y: 560 },
    data: {
      label: "Update Status",
      nodeCategory: "action",
      actionType: "update_status",
      metadata: { Type: "Screening Status", Status: "Knockout" },
    },
  },
  {
    id: "message-qualified",
    type: "actionNode",
    position: { x: 200, y: 680 },
    data: {
      label: "Message",
      nodeCategory: "action",
      actionType: "message",
      metadata: { Elements: "Text Message, Button" },
    },
  },
  {
    id: "message-knockout",
    type: "actionNode",
    position: { x: 600, y: 680 },
    data: {
      label: "Message",
      nodeCategory: "action",
      actionType: "message",
      metadata: { Elements: "Text Message, Button" },
    },
  },
  {
    id: "output-apply",
    type: "outputNode",
    position: { x: 200, y: 800 },
    data: {
      label: "Apply Now",
      nodeCategory: "output",
      outcome: "positive",
      hasExternalLink: true,
    },
  },
  {
    id: "output-search",
    type: "outputNode",
    position: { x: 600, y: 800 },
    data: {
      label: "Search More Jobs",
      nodeCategory: "output",
      outcome: "negative",
      hasExternalLink: true,
    },
  },
];

const DEMO_EDGES: Edge[] = [
  { id: "e1-2", source: "trigger-1", target: "candidate-1", type: "smoothstep", animated: true },
  { id: "e2-3", source: "candidate-1", target: "screening-1", type: "smoothstep", animated: true },
  { id: "e3-4", source: "screening-1", target: "condition-1", type: "smoothstep", animated: true },
  { id: "e4-5", source: "condition-1", target: "update-qualified", sourceHandle: "qualified", type: "labeled", data: { label: "Qualified", color: "emerald" } },
  { id: "e4-6", source: "condition-1", target: "update-knockout", sourceHandle: "knockout", type: "labeled", data: { label: "Knockout", color: "orange" } },
  { id: "e5-7", source: "update-qualified", target: "message-qualified", type: "smoothstep", animated: true },
  { id: "e6-8", source: "update-knockout", target: "message-knockout", type: "smoothstep", animated: true },
  { id: "e7-9", source: "message-qualified", target: "output-apply", type: "smoothstep", animated: true },
  { id: "e8-10", source: "message-knockout", target: "output-search", type: "smoothstep", animated: true },
];

export function WorkflowTab({
  nodes: externalNodes,
  edges: externalEdges,
  onNodesChange,
  onEdgesChange,
  onDirtyChange,
  workflowDescription = "",
  onDescriptionChange,
}: WorkflowTabProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  
  // Use demo nodes if external nodes are empty/default
  const initialNodes = externalNodes.length <= 2 ? DEMO_NODES : externalNodes;
  const initialEdges = externalEdges.length === 0 ? DEMO_EDGES : externalEdges;
  
  const [nodes, setNodes, handleNodesChange] = useNodesState(initialNodes as any);
  const [edges, setEdges, handleEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [description, setDescription] = useState(workflowDescription);

  // Sync external changes
  useEffect(() => {
    if (externalNodes.length > 2) {
      setNodes(externalNodes as any);
    }
  }, [externalNodes, setNodes]);

  useEffect(() => {
    if (externalEdges.length > 0) {
      setEdges(externalEdges);
    }
  }, [externalEdges, setEdges]);

  const selectedNode = useMemo(() => {
    const found = nodes.find((n) => n.id === selectedNodeId);
    return found || null;
  }, [nodes, selectedNodeId]);

  const handleLocalNodesChange = useCallback(
    (changes: any) => {
      handleNodesChange(changes);
      onDirtyChange();
      setTimeout(() => {
        onNodesChange(nodes as any);
      }, 0);
    },
    [handleNodesChange, onDirtyChange, onNodesChange, nodes]
  );

  const handleLocalEdgesChange = useCallback(
    (changes: any) => {
      handleEdgesChange(changes);
      onDirtyChange();
      setTimeout(() => {
        onEdgesChange(edges);
      }, 0);
    },
    [handleEdgesChange, onDirtyChange, onEdgesChange, edges]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            animated: true,
            style: { strokeWidth: 2 },
          },
          eds
        )
      );
      onDirtyChange();
    },
    [setEdges, onDirtyChange]
  );

  const handleNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((n) => n.id !== nodeId));
      setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
      if (selectedNodeId === nodeId) {
        setSelectedNodeId(null);
      }
      onDirtyChange();
    },
    [setNodes, setEdges, selectedNodeId, onDirtyChange]
  );

  const handleUpdateNode = useCallback(
    (nodeId: string, data: Partial<StageNodeData>) => {
      setNodes((nds) =>
        nds.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n))
      );
      onDirtyChange();
    },
    [setNodes, onDirtyChange]
  );

  const handleDescriptionChange = useCallback(
    (value: string) => {
      setDescription(value);
      onDescriptionChange?.(value);
      onDirtyChange();
    },
    [onDescriptionChange, onDirtyChange]
  );

  // Add node from floating menu
  const handleAddNode = useCallback(
    (option: any, position: { x: number; y: number }) => {
      const nodeId = `${option.category}-${Date.now()}`;
      const newNode: Node<WorkflowNodeData> = {
        id: nodeId,
        type: option.type,
        position,
        data: {
          label: option.label,
          nodeCategory: option.category,
          icon: option.type === "stageCardNode" ? (option.label.includes("Candidate") ? "user" : "help") : undefined,
          iconColor: option.iconColor,
          subtitle: "",
        },
      };

      setNodes((nds) => [...nds, newNode] as any);
      onDirtyChange();
    },
    [setNodes, onDirtyChange]
  );

  // Get canvas center for new nodes
  const getCanvasCenter = useCallback(() => {
    if (!reactFlowInstance) return { x: 400, y: 400 };
    const { x, y, zoom } = reactFlowInstance.getViewport();
    const wrapper = reactFlowWrapper.current;
    if (!wrapper) return { x: 400, y: 400 };
    
    return reactFlowInstance.screenToFlowPosition({
      x: wrapper.clientWidth / 2,
      y: wrapper.clientHeight / 2,
    });
  }, [reactFlowInstance]);

  return (
    <div className={`flex-1 flex flex-col min-h-0 ${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""}`}>
      {/* Canvas */}
      <div className="flex-1 relative" ref={reactFlowWrapper}>
        {/* Floating Description Box */}
        <div className="absolute top-4 left-4 z-10 w-72">
          <Textarea
            placeholder="Type workflow description..."
            value={description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            className="min-h-[80px] bg-background/95 backdrop-blur-sm shadow-sm resize-none"
          />
        </div>

        {/* Floating Add Button */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
          <FloatingAddMenu 
            onAddNode={handleAddNode} 
            canvasCenter={getCanvasCenter()}
          />
        </div>

        {/* Fullscreen Toggle */}
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="bg-background/95 backdrop-blur-sm"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>

        <ReactFlow
          nodes={nodes.map((n) => ({
            ...n,
            data: {
              ...n.data,
              isSelected: n.id === selectedNodeId,
              onDelete: () => handleDeleteNode(n.id),
              onSelect: () => setSelectedNodeId(n.id),
            },
          }))}
          edges={edges}
          onNodesChange={handleLocalNodesChange}
          onEdgesChange={handleLocalEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          snapToGrid
          snapGrid={[20, 20]}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          defaultEdgeOptions={{
            type: "smoothstep",
            animated: true,
            style: { strokeWidth: 2 },
          }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#e2e8f0" />
          <Controls showInteractive={false} className="!bg-background !border !shadow-md" />
        </ReactFlow>
      </div>

      {/* Node Config Sheet */}
      <Sheet open={!!selectedNodeId} onOpenChange={(open) => !open && setSelectedNodeId(null)}>
        <SheetContent className="w-[400px] sm:w-[450px]">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <span>Configure Node</span>
              {selectedNodeId && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteNode(selectedNodeId)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <NodeConfigPanel
              node={selectedNode}
              agents={agents}
              onUpdate={(data) => selectedNodeId && handleUpdateNode(selectedNodeId, data)}
              onClose={() => setSelectedNodeId(null)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
