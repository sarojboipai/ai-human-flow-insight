import { useState, useCallback, useMemo } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
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
import { Badge } from "@/components/ui/badge";
import { 
  StageNode, 
  SourceNode, 
  DecisionNode, 
  OutcomeNode,
  CandidateNode,
  AIAgentNode,
  RecruiterNode,
  AutomationNode,
} from "./pipeline-nodes";
import { StageDetailsSheet } from "./StageDetailsSheet";
import type { Job, EnhancedStageMetrics } from "@/lib/mockData";

const nodeTypes = {
  stageNode: StageNode,
  sourceNode: SourceNode,
  decisionNode: DecisionNode,
  outcomeNode: OutcomeNode,
  candidateNode: CandidateNode,
  aiAgentNode: AIAgentNode,
  recruiterNode: RecruiterNode,
  automationNode: AutomationNode,
};

// Build nodes dynamically based on job data
const buildNodes = (job: Job): Node[] => {
  const metrics = job.enhancedStageMetrics || {};
  
  return [
    // Source node
    { 
      id: "ankura", 
      type: "sourceNode", 
      position: { x: 50, y: 140 }, 
      data: { label: job.employer.split(' ')[0] + "\nHospital", variant: "ankura" } 
    },
    
    // Jobs in Hospital - Candidate journey step (Purple)
    { 
      id: "jobs-ankura", 
      type: "candidateNode", 
      position: { x: 200, y: 130 }, 
      data: { 
        label: "Jobs in\n" + job.employer.split(' ')[0], 
        icon: "eye",
        aiPercentage: metrics["jobs-ankura"]?.aiPercentage,
        humanPercentage: metrics["jobs-ankura"]?.humanPercentage,
        hitlPercentage: metrics["jobs-ankura"]?.hitlPercentage,
        slaStatus: metrics["jobs-ankura"]?.slaStatus,
      } 
    },
    
    // Job Discovery - Candidate journey step (Purple)
    { 
      id: "job-discovery", 
      type: "candidateNode", 
      position: { x: 370, y: 130 }, 
      data: { 
        label: "Job\nDiscovery", 
        icon: "search",
        aiPercentage: metrics["job-discovery"]?.aiPercentage,
        humanPercentage: metrics["job-discovery"]?.humanPercentage,
        hitlPercentage: metrics["job-discovery"]?.hitlPercentage,
        slaStatus: metrics["job-discovery"]?.slaStatus,
      } 
    },
    
    // Expression of Interest - Candidate journey step (Purple)
    { 
      id: "expression", 
      type: "candidateNode", 
      position: { x: 540, y: 130 }, 
      data: { 
        label: "Expression\nof Interest", 
        icon: "heart",
        aiPercentage: metrics["expression"]?.aiPercentage,
        humanPercentage: metrics["expression"]?.humanPercentage,
        hitlPercentage: metrics["expression"]?.hitlPercentage,
        slaStatus: metrics["expression"]?.slaStatus,
      } 
    },
    
    // Pre-screen Questions - Automation (Green)
    { 
      id: "prescreen", 
      type: "automationNode", 
      position: { x: 710, y: 130 }, 
      data: { 
        label: "Pre-screen\nQuestions", 
        icon: "send",
        aiPercentage: metrics["prescreen"]?.aiPercentage,
        humanPercentage: metrics["prescreen"]?.humanPercentage,
        hitlPercentage: metrics["prescreen"]?.hitlPercentage,
        slaStatus: metrics["prescreen"]?.slaStatus,
      } 
    },
    
    // Voice Agent Screening - AI Agent (Orange)
    { 
      id: "voice-agent", 
      type: "aiAgentNode", 
      position: { x: 880, y: 130 }, 
      data: { 
        label: "Voice Agent\nScreening", 
        icon: "phone",
        aiPercentage: metrics["voice-agent"]?.aiPercentage,
        humanPercentage: metrics["voice-agent"]?.humanPercentage,
        hitlPercentage: metrics["voice-agent"]?.hitlPercentage,
        slaStatus: metrics["voice-agent"]?.slaStatus,
      } 
    },
    
    // Decision node
    { 
      id: "decision", 
      type: "decisionNode", 
      position: { x: 1050, y: 145 }, 
      data: { label: "Decision" } 
    },
    
    // Scheduling - Automation (Green)
    { 
      id: "scheduling", 
      type: "automationNode", 
      position: { x: 1200, y: 40 }, 
      data: { 
        label: "Interview\nScheduling", 
        icon: "calendar",
        aiPercentage: metrics["scheduling"]?.aiPercentage,
        humanPercentage: metrics["scheduling"]?.humanPercentage,
        hitlPercentage: metrics["scheduling"]?.hitlPercentage,
        slaStatus: metrics["scheduling"]?.slaStatus,
      } 
    },
    
    // Silver Medalist - Human Recruiter (Blue)
    { 
      id: "silver-med", 
      type: "recruiterNode", 
      position: { x: 1200, y: 150 }, 
      data: { 
        label: "Silver\nMedalist", 
        icon: "userCheck",
        aiPercentage: metrics["silver-med"]?.aiPercentage,
        humanPercentage: metrics["silver-med"]?.humanPercentage,
        hitlPercentage: metrics["silver-med"]?.hitlPercentage,
        slaStatus: metrics["silver-med"]?.slaStatus,
      } 
    },
    
    // Talent Community - Candidate (Purple)
    { 
      id: "talent-community", 
      type: "candidateNode", 
      position: { x: 1200, y: 260 }, 
      data: { 
        label: "Talent\nCommunity", 
        icon: "user",
        aiPercentage: metrics["talent-community"]?.aiPercentage,
        humanPercentage: metrics["talent-community"]?.humanPercentage,
        hitlPercentage: metrics["talent-community"]?.hitlPercentage,
        slaStatus: metrics["talent-community"]?.slaStatus,
      } 
    },
  ];
};

const initialEdges: Edge[] = [
  // Main flow
  { id: "e-ankura-jobs", source: "ankura", target: "jobs-ankura", type: "default", style: { stroke: "#94a3b8", strokeDasharray: "5,5" } },
  { id: "e-jobs-discovery", source: "jobs-ankura", target: "job-discovery", type: "default", style: { stroke: "#a855f7", strokeWidth: 2 } },
  { id: "e-discovery-expression", source: "job-discovery", target: "expression", type: "default", style: { stroke: "#a855f7", strokeWidth: 2 } },
  { id: "e-expression-prescreen", source: "expression", target: "prescreen", type: "default", style: { stroke: "#10b981", strokeWidth: 2 } },
  { id: "e-prescreen-voice", source: "prescreen", target: "voice-agent", type: "default", style: { stroke: "#f97316", strokeWidth: 2 } },
  { id: "e-voice-decision", source: "voice-agent", target: "decision", type: "default", style: { stroke: "#1e293b", strokeWidth: 2 } },
  
  // Decision to outcomes
  { id: "e-decision-scheduling", source: "decision", sourceHandle: "top", target: "scheduling", type: "default", style: { stroke: "#10b981", strokeWidth: 2 }, label: "Qualified", labelStyle: { fontSize: 10, fill: "#10b981", fontWeight: 600 } },
  { id: "e-decision-silver", source: "decision", sourceHandle: "right", target: "silver-med", type: "default", style: { stroke: "#3b82f6", strokeWidth: 2 }, label: "Hold", labelStyle: { fontSize: 10, fill: "#3b82f6", fontWeight: 600 } },
  { id: "e-decision-community", source: "decision", sourceHandle: "bottom", target: "talent-community", type: "default", style: { stroke: "#a855f7", strokeWidth: 2 }, label: "Knockout", labelStyle: { fontSize: 10, fill: "#a855f7", fontWeight: 600 } },
];

const legendItems = [
  { color: "bg-purple-500", name: "Candidate Journey", description: "User journey steps" },
  { color: "bg-orange-500", name: "AI Agent", description: "AI automated steps" },
  { color: "bg-blue-500", name: "Human Recruiter", description: "Manual steps" },
  { color: "bg-emerald-500", name: "Automation", description: "Scheduling/CRM" },
  { color: "bg-slate-800", name: "Decision", description: "Qualification branching" },
];

interface PipelineBoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job | null;
}

// Map node IDs to their display labels and icons
const nodeMetadata: Record<string, { label: string; icon?: string }> = {
  "jobs-ankura": { label: "Jobs in Ankura Hospital", icon: "briefcase" },
  "job-discovery": { label: "Job Discovery", icon: "search" },
  "expression": { label: "Expression of Interest", icon: "heart" },
  "prescreen": { label: "Pre-screen Questions", icon: "clipboard" },
  "voice-agent": { label: "Voice Agent Screening", icon: "phone" },
  "decision": { label: "Decision Node", icon: "users" },
  "scheduling": { label: "Interview Scheduling", icon: "calendar" },
  "silver-med": { label: "Silver Medalist Pool", icon: "award" },
  "talent-community": { label: "Talent Community", icon: "users" },
};

export function PipelineBoardDialog({ open, onOpenChange, job }: PipelineBoardDialogProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleNodeClick = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
  }, []);

  const dynamicNodes = useMemo(() => {
    if (!job) return [];
    return buildNodes(job);
  }, [job]);

  const nodesWithHandlers = useMemo(() => {
    return dynamicNodes.map(node => {
      if (node.type !== "sourceNode" && node.type !== "decisionNode") {
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
  }, [dynamicNodes, handleNodeClick]);

  const [nodes, , onNodesChange] = useNodesState(nodesWithHandlers);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const selectedMetrics: EnhancedStageMetrics | null = selectedNodeId && job?.enhancedStageMetrics 
    ? job.enhancedStageMetrics[selectedNodeId] || null 
    : null;

  const selectedNodeInfo = selectedNodeId ? nodeMetadata[selectedNodeId] : null;

  if (!job) return null;

  const statusVariant = job.status === "active" ? "default" : job.status === "filled" ? "secondary" : "outline";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-[95vw] max-h-[90vh] h-[90vh] p-0 gap-0 flex flex-col">
        <DialogHeader className="px-4 py-3 border-b shrink-0 pr-12">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-lg font-semibold">{job.title}</DialogTitle>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">{job.id}</span>
                <span>Customer: <span className="font-medium text-foreground">{job.employer}</span></span>
                <Badge variant={statusVariant} className="capitalize">{job.status}</Badge>
                <span>Days Open: <span className="font-medium text-foreground">{job.daysOpen}</span></span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {legendItems.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5" title={item.description}>
                  <div className={`${item.color} w-3 h-3 rounded`} />
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
            fitViewOptions={{ padding: 0.15 }}
            minZoom={0.3}
            maxZoom={2}
            defaultViewport={{ x: 0, y: 0, zoom: 0.85 }}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#e2e8f0" />
            <Controls 
              showInteractive={false}
              className="!bg-background !border !shadow-md"
            />
            <MiniMap 
              nodeColor={(node) => {
                switch (node.type) {
                  case "candidateNode": return "#a855f7";
                  case "aiAgentNode": return "#f97316";
                  case "recruiterNode": return "#3b82f6";
                  case "automationNode": return "#10b981";
                  case "decisionNode": return "#1e293b";
                  case "sourceNode": return "#3b82f6";
                  default: return "#94a3b8";
                }
              }}
              maskColor="rgba(0, 0, 0, 0.1)"
              className="!bg-background/80 !border !shadow-sm"
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
