import { useState, useCallback, useMemo } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StageNode, SourceNode, DecisionNode, OutcomeNode } from "./pipeline-nodes";
import { StageDetailsSheet } from "./StageDetailsSheet";
import type { Job, StageMetrics } from "@/lib/mockData";

const nodeTypes = {
  stageNode: StageNode,
  sourceNode: SourceNode,
  decisionNode: DecisionNode,
  outcomeNode: OutcomeNode,
};

const initialNodes: Node[] = [
  // Source node
  { id: "phenom", type: "sourceNode", position: { x: 100, y: 120 }, data: { label: "Phenom", variant: "phenom" } },
  
  // Candidate flow
  { id: "jobs-phenom", type: "stageNode", position: { x: 250, y: 110 }, data: { label: "Jobs in\nPhenom", icon: "briefcase", handlers: ["C"], borderColor: "border-purple-200" } },
  { id: "job-discovery", type: "stageNode", position: { x: 420, y: 110 }, data: { label: "Job\nDiscovery", icon: "search", handlers: ["C"], borderColor: "border-purple-200" } },
  { id: "expression", type: "stageNode", position: { x: 590, y: 110 }, data: { label: "Expression\nof Interest", icon: "heart", handlers: ["C"], borderColor: "border-purple-200" } },
  { id: "prescreen", type: "stageNode", position: { x: 760, y: 110 }, data: { label: "Pre-screen\nQuestions", icon: "clipboard", handlers: ["AE"], borderColor: "border-amber-200" } },
  { id: "voice-agent", type: "stageNode", position: { x: 930, y: 110 }, data: { label: "Voice Agent\nScreening", icon: "phone", handlers: ["X+"], borderColor: "border-orange-200" } },
  
  // Decision node
  { id: "decision", type: "decisionNode", position: { x: 1100, y: 125 }, data: { label: "Decision" } },
  
  // Outcome nodes
  { id: "scheduling", type: "outcomeNode", position: { x: 1230, y: 40 }, data: { label: "Scheduling", icon: "calendar", handlers: ["AE"], variant: "scheduling" } },
  { id: "silver-med", type: "outcomeNode", position: { x: 1230, y: 130 }, data: { label: "Silver Medalist", icon: "award", handlers: ["AE"], variant: "silver" } },
  { id: "talent-community", type: "outcomeNode", position: { x: 1230, y: 220 }, data: { label: "Talent\nCommunity", icon: "users", handlers: ["C"], variant: "community" } },
];

const initialEdges: Edge[] = [
  // Phenom flow
  { id: "e-phenom-jobs", source: "phenom", target: "jobs-phenom", type: "default", style: { stroke: "#94a3b8", strokeDasharray: "5,5" } },
  { id: "e-jobs-discovery", source: "jobs-phenom", target: "job-discovery", type: "default", style: { stroke: "#94a3b8", strokeDasharray: "5,5" } },
  { id: "e-discovery-expression", source: "job-discovery", target: "expression", type: "default", style: { stroke: "#94a3b8", strokeDasharray: "5,5" } },
  { id: "e-expression-prescreen", source: "expression", target: "prescreen", type: "default", style: { stroke: "#94a3b8", strokeDasharray: "5,5" } },
  { id: "e-prescreen-voice", source: "prescreen", target: "voice-agent", type: "default", style: { stroke: "#94a3b8", strokeDasharray: "5,5" } },
  { id: "e-voice-decision", source: "voice-agent", target: "decision", type: "default", style: { stroke: "#94a3b8", strokeDasharray: "5,5" } },
  
  // Decision to outcomes
  { id: "e-decision-scheduling", source: "decision", sourceHandle: "top", target: "scheduling", type: "default", style: { stroke: "#10b981" }, label: "Highly Qualified", labelStyle: { fontSize: 10, fill: "#10b981", fontWeight: 600 } },
  { id: "e-decision-silver", source: "decision", sourceHandle: "right", target: "silver-med", type: "default", style: { stroke: "#3b82f6" }, label: "Qualified", labelStyle: { fontSize: 10, fill: "#3b82f6", fontWeight: 600 } },
  { id: "e-decision-community", source: "decision", sourceHandle: "bottom", target: "talent-community", type: "default", style: { stroke: "#a855f7" }, label: "Knockout", labelStyle: { fontSize: 10, fill: "#a855f7", fontWeight: 600 } },
];

const legendItems = [
  { label: "R", name: "Recruiter", color: "bg-orange-100 text-orange-600" },
  { label: "C", name: "Candidate", color: "bg-purple-100 text-purple-600" },
  { label: "H", name: "Hiring Team", color: "bg-emerald-100 text-emerald-600" },
  { label: "AE", name: "Auto Engine", color: "bg-amber-100 text-amber-600" },
  { label: "X+", name: "X+ Intelligence", color: "bg-gradient-to-r from-orange-100 to-rose-100 text-orange-600" },
];

interface PipelineBoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job | null;
}

// Map node IDs to their display labels and icons
const nodeMetadata: Record<string, { label: string; icon?: string }> = {
  "prescreen": { label: "Pre-screen Questions", icon: "clipboard" },
  "voice-agent": { label: "Voice Agent Screening", icon: "phone" },
  "expression": { label: "Expression of Interest", icon: "heart" },
  "job-discovery": { label: "Job Discovery", icon: "search" },
  "interview": { label: "Interview & Decision", icon: "users" },
  "post-job": { label: "Post a Job", icon: "briefcase" },
  "app-details": { label: "Application Details", icon: "fileText" },
  "app-status": { label: "Application Status Update", icon: "refresh" },
  "jobs-phenom": { label: "Jobs in Phenom", icon: "briefcase" },
};

export function PipelineBoardDialog({ open, onOpenChange, job }: PipelineBoardDialogProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleNodeClick = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
  }, []);

  const nodesWithHandlers = useMemo(() => {
    return initialNodes.map(node => {
      if (node.type === "stageNode") {
        return {
          ...node,
          data: {
            ...node.data,
            onClick: () => handleNodeClick(node.id),
          }
        };
      }
      return node;
    });
  }, [handleNodeClick]);

  const selectedMetrics: StageMetrics | null = selectedNodeId && job?.stageMetrics 
    ? job.stageMetrics[selectedNodeId] || null 
    : null;

  const selectedNodeInfo = selectedNodeId ? nodeMetadata[selectedNodeId] : null;

  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-[95vw] max-h-[90vh] h-[90vh] p-0 gap-0 flex flex-col">
        <DialogHeader className="px-4 py-2 border-b shrink-0 pr-10">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-base font-semibold">{job.title}</DialogTitle>
              <p className="text-xs text-muted-foreground font-mono">{job.id}</p>
            </div>
            <div className="flex items-center gap-2">
              {legendItems.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span className={`${item.color} text-[10px] font-bold px-1.5 py-0.5 rounded-full`}>
                    {item.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 min-h-0">
          <ReactFlow
            nodes={nodesWithHandlers}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.3}
            maxZoom={2}
            defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#e2e8f0" />
            <Controls 
              showInteractive={false}
              className="!bg-background !border !shadow-md"
            />
          </ReactFlow>
        </div>

        <StageDetailsSheet
          open={!!selectedNodeId}
          onOpenChange={(open) => !open && setSelectedNodeId(null)}
          stageName={selectedNodeInfo?.label || "Stage Details"}
          stageIcon={selectedNodeInfo?.icon}
          metrics={selectedMetrics}
        />
      </DialogContent>
    </Dialog>
  );
}
