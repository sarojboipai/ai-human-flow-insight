import React, { useCallback, useRef, DragEvent, useState, useEffect, useMemo } from "react";
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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { StagePalette } from "@/components/orchestration/StagePalette";
import { NodeConfigPanel } from "@/components/orchestration/NodeConfigPanel";
import {
  EditableStageNode,
  EditableAINode,
  EditableHumanNode,
  EditableDecisionNode,
  EditableEntryExitNode,
  EditableAutomationNode,
} from "@/components/orchestration/pipeline-nodes";
import { agents } from "@/lib/mockData";

const nodeTypes = {
  stageNode: EditableStageNode,
  aiStage: EditableAINode,
  humanStage: EditableHumanNode,
  automationStage: EditableAutomationNode,
  decisionGateway: EditableDecisionNode,
  entryExit: EditableEntryExitNode,
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
}

export function WorkflowTab({
  nodes: externalNodes,
  edges: externalEdges,
  onNodesChange,
  onEdgesChange,
  onDirtyChange,
}: WorkflowTabProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, handleNodesChange] = useNodesState(externalNodes);
  const [edges, setEdges, handleEdgesChange] = useEdgesState(externalEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  // Sync external changes
  useEffect(() => {
    setNodes(externalNodes as any);
  }, [externalNodes, setNodes]);

  useEffect(() => {
    setEdges(externalEdges);
  }, [externalEdges, setEdges]);

  const selectedNode = useMemo(() => {
    const found = nodes.find((n) => n.id === selectedNodeId);
    return found || null;
  }, [nodes, selectedNodeId]);

  const handleLocalNodesChange = useCallback(
    (changes: any) => {
      handleNodesChange(changes);
      onDirtyChange();
      // Sync to parent after state update
      setTimeout(() => {
        onNodesChange(nodes);
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

  // Drag and drop from palette
  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const type = event.dataTransfer.getData("application/reactflow/type");
      const label = event.dataTransfer.getData("application/reactflow/label");
      const stageType = event.dataTransfer.getData(
        "application/reactflow/stageType"
      ) as StageNodeData["stageType"];
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
      onDirtyChange();
    },
    [reactFlowInstance, setNodes, onDirtyChange]
  );

  return (
    <div className="flex-1 flex min-h-0">
      {/* Left Sidebar - Stage Palette */}
      <StagePalette />

      {/* Canvas */}
      <div className="flex-1 relative" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes.map((n) => {
            const nodeData = n.data as StageNodeData;
            return {
              ...n,
              data: {
                ...nodeData,
                isSelected: n.id === selectedNodeId,
                onDelete: () => handleDeleteNode(n.id),
                onSelect: () => setSelectedNodeId(n.id),
              },
            };
          })}
          edges={edges}
          onNodesChange={handleLocalNodesChange}
          onEdgesChange={handleLocalEdgesChange}
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
                case "ai":
                  return "#f97316";
                case "human":
                  return "#3b82f6";
                case "automation":
                  return "#10b981";
                case "decision":
                  return "#1e293b";
                case "entry":
                case "exit":
                  return "#6b7280";
                default:
                  return "#94a3b8";
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
  );
}
