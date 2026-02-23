import { useState, useCallback, useMemo, useEffect } from "react";
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
  type NodeChange,
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
import { StageDetailsPanel } from "./StageDetailsPanel";
import { 
  getCustomerWorkflowSchema, 
  type Job, 
  type EnhancedStageMetrics,
  type CustomerWorkflowSchema,
  type PipelineWorkflowStage,
} from "@/lib/mockData";

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

// Map stage type to node type
const getNodeType = (stageType: PipelineWorkflowStage["type"]): string => {
  switch (stageType) {
    case "source": return "sourceNode";
    case "candidate": return "candidateNode";
    case "automation": return "automationNode";
    case "ai": return "aiAgentNode";
    case "recruiter": return "recruiterNode";
    case "decision": return "decisionNode";
    case "outcome": return "outcomeNode";
    default: return "stageNode";
  }
};

// Get edge color based on stage type
const getEdgeColor = (stageType: PipelineWorkflowStage["type"]): string => {
  switch (stageType) {
    case "source": return "#94a3b8";
    case "candidate": return "#a855f7";
    case "automation": return "#10b981";
    case "ai": return "#f97316";
    case "recruiter": return "#3b82f6";
    case "decision": return "#1e293b";
    default: return "#94a3b8";
  }
};

// Build nodes dynamically based on customer workflow schema
const buildNodesFromSchema = (
  job: Job, 
  schema: CustomerWorkflowSchema
): Node[] => {
  const metrics = job.enhancedStageMetrics || {};
  const nodes: Node[] = [];
  
  // Build main stage nodes
  schema.stages.forEach((stage) => {
    let label = stage.label;
    if (stage.id === "customer-job-posting") {
      const customerShortName = job.employer.split(' ')[0];
      label = `${customerShortName}\nJob Posting`;
    }
    
    const nodeType = getNodeType(stage.type);
    const nodeData: Record<string, unknown> = {
      label,
      icon: stage.icon,
      variant: stage.id === "source" ? "ankura" : undefined,
    };
    
    // Add metrics for non-source, non-decision nodes
    if (stage.type !== "source" && stage.type !== "decision" && metrics[stage.id]) {
      nodeData.aiPercentage = metrics[stage.id]?.aiPercentage;
      nodeData.humanPercentage = metrics[stage.id]?.humanPercentage;
      nodeData.hitlPercentage = metrics[stage.id]?.hitlPercentage;
      nodeData.slaStatus = metrics[stage.id]?.slaStatus;
    }
    
    nodes.push({
      id: stage.id,
      type: nodeType,
      position: stage.position,
      data: nodeData,
    });
  });
  
  // Build outcome stage nodes
  schema.outcomeStages.forEach((stage) => {
    const nodeType = getNodeType(stage.type);
    const nodeData: Record<string, unknown> = {
      label: stage.label,
      icon: stage.icon,
    };
    
    if (metrics[stage.id]) {
      nodeData.aiPercentage = metrics[stage.id]?.aiPercentage;
      nodeData.humanPercentage = metrics[stage.id]?.humanPercentage;
      nodeData.hitlPercentage = metrics[stage.id]?.hitlPercentage;
      nodeData.slaStatus = metrics[stage.id]?.slaStatus;
    }
    
    nodes.push({
      id: stage.id,
      type: nodeType,
      position: stage.position,
      data: nodeData,
    });
  });
  
  return nodes;
};

// Build edges dynamically based on schema
const buildEdgesFromSchema = (schema: CustomerWorkflowSchema): Edge[] => {
  const edges: Edge[] = [];
  const mainStages = schema.stages;
  const allStages = [...mainStages, ...schema.outcomeStages];
  const stageMap = new Map(allStages.map(s => [s.id, s]));
  
  if (schema.connections && schema.connections.length > 0) {
    // Use custom connections
    schema.connections.forEach(conn => {
      const sourceStage = stageMap.get(conn.source);
      edges.push({
        id: `e-${conn.source}-${conn.target}`,
        source: conn.source,
        target: conn.target,
        type: "default",
        style: { 
          stroke: sourceStage ? getEdgeColor(sourceStage.type) : "#94a3b8", 
          strokeWidth: sourceStage?.type === "source" ? 1 : 2,
          strokeDasharray: sourceStage?.type === "source" ? "5,5" : undefined,
        },
      });
    });
  } else {
    // Connect main stages in sequence
    for (let i = 0; i < mainStages.length - 1; i++) {
      const sourceStage = mainStages[i];
      const targetStage = mainStages[i + 1];
      
      edges.push({
        id: `e-${sourceStage.id}-${targetStage.id}`,
        source: sourceStage.id,
        target: targetStage.id,
        type: "default",
        style: { 
          stroke: getEdgeColor(sourceStage.type), 
          strokeWidth: sourceStage.type === "source" ? 1 : 2,
          strokeDasharray: sourceStage.type === "source" ? "5,5" : undefined,
        },
      });
    }
  }
  
  // Connect decision node to outcomes (branching) or last stage to outcomes (linear)
  const decisionStage = mainStages.find(s => s.type === "decision");
  if (decisionStage && schema.outcomeStages.length >= 3) {
    const [scheduling, silverMed, talentCommunity] = schema.outcomeStages;
    
    edges.push({
      id: `e-decision-scheduling`,
      source: decisionStage.id,
      sourceHandle: "top",
      target: scheduling.id,
      type: "default",
      style: { stroke: "#10b981", strokeWidth: 2 },
      label: "Qualified",
      labelStyle: { fontSize: 10, fill: "#10b981", fontWeight: 600 },
    });
    
    edges.push({
      id: `e-decision-silver`,
      source: decisionStage.id,
      sourceHandle: "right",
      target: silverMed.id,
      type: "default",
      style: { stroke: "#3b82f6", strokeWidth: 2 },
      label: "Hold",
      labelStyle: { fontSize: 10, fill: "#3b82f6", fontWeight: 600 },
    });
    
    edges.push({
      id: `e-decision-community`,
      source: decisionStage.id,
      sourceHandle: "bottom",
      target: talentCommunity.id,
      type: "default",
      style: { stroke: "#a855f7", strokeWidth: 2 },
      label: "Knockout",
      labelStyle: { fontSize: 10, fill: "#a855f7", fontWeight: 600 },
    });
  } else if (!decisionStage && schema.outcomeStages.length > 0) {
    // Linear flow: connect last main stage to first outcome
    const lastMain = mainStages[mainStages.length - 1];
    const firstOutcome = schema.outcomeStages[0];
    edges.push({
      id: `e-${lastMain.id}-${firstOutcome.id}`,
      source: lastMain.id,
      target: firstOutcome.id,
      type: "default",
      style: { stroke: "#10b981", strokeWidth: 2 },
    });
  }
  
  return edges;
};

// localStorage helpers
const loadSavedPositions = (jobId: string, nodes: Node[]): Node[] => {
  try {
    const saved = localStorage.getItem(`pipeline-node-positions-${jobId}`);
    if (!saved) return nodes;
    const positions: Record<string, { x: number; y: number }> = JSON.parse(saved);
    return nodes.map(node => positions[node.id] 
      ? { ...node, position: positions[node.id] } 
      : node
    );
  } catch {
    return nodes;
  }
};

const savePositions = (jobId: string, nodes: Node[]) => {
  const positions: Record<string, { x: number; y: number }> = {};
  nodes.forEach(n => { positions[n.id] = n.position; });
  localStorage.setItem(`pipeline-node-positions-${jobId}`, JSON.stringify(positions));
};

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
const getNodeMetadata = (nodeId: string, customerName: string): { label: string; icon?: string } => {
  const metadata: Record<string, { label: string; icon?: string }> = {
    "customer-job-posting": { label: "Customer Job Posting", icon: "briefcase" },
    "review-jd-seo": { label: "Review JD SEO", icon: "search" },
    "review-jd-criteria": { label: "Review JD Criteria & Screening Question", icon: "clipboard" },
    "job-post-swaasa": { label: "Job Post in Swaasa", icon: "eye" },
    "sourcing": { label: "Sourcing", icon: "search" },
    "outreach": { label: "Outreach", icon: "send" },
    "campaigns": { label: "Campaigns", icon: "megaphone" },
    "marketing": { label: "Marketing", icon: "megaphone" },
    "application": { label: "Application", icon: "clipboard" },
    "primary-screening": { label: "Primary Screening", icon: "phone" },
    "interview-scheduling": { label: "Interview Scheduling / Validation", icon: "calendar" },
    "placement-candidate": { label: "Placement Candidate", icon: "check" },
    "2ndpri": { label: "2nd Priority", icon: "users" },
    "human-screening": { label: "Human Screening", icon: "userCheck" },
    "backup-candidate": { label: "Backup Candidate", icon: "users" },
    "talent-pool": { label: "Talent Pool", icon: "user" },
  };
  return metadata[nodeId] || { label: "Stage Details" };
};

export function PipelineBoardDialog({ open, onOpenChange, job }: PipelineBoardDialogProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleNodeClick = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
  }, []);

  // Get customer-specific workflow schema
  const workflowSchema = useMemo(() => {
    if (!job) return null;
    return getCustomerWorkflowSchema(job.employer);
  }, [job]);

  // Build nodes from schema
  const dynamicNodes = useMemo(() => {
    if (!job || !workflowSchema) return [];
    return buildNodesFromSchema(job, workflowSchema);
  }, [job, workflowSchema]);

  // Build edges from schema
  const dynamicEdges = useMemo(() => {
    if (!workflowSchema) return [];
    return buildEdgesFromSchema(workflowSchema);
  }, [workflowSchema]);

  // Add click handlers and load saved positions
  const initialNodes = useMemo(() => {
    const withHandlers = dynamicNodes.map(node => {
      if (node.type !== "sourceNode" && node.type !== "decisionNode") {
        return {
          ...node,
          data: { ...node.data, onClick: () => handleNodeClick(node.id) },
        };
      }
      return node;
    });
    return job ? loadSavedPositions(job.id, withHandlers) : withHandlers;
  }, [dynamicNodes, handleNodeClick, job]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(dynamicEdges);

  // Re-sync when job changes
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(dynamicEdges);
  }, [initialNodes, dynamicEdges, setNodes, setEdges]);

  // Wrap onNodesChange to persist positions after drag
  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    onNodesChange(changes);
    // Save after drag end
    const hasDragEnd = changes.some(c => c.type === "position" && !c.dragging);
    if (hasDragEnd && job) {
      // Use setTimeout to read state after React applies changes
      setTimeout(() => {
        setNodes(current => {
          savePositions(job.id, current);
          return current;
        });
      }, 0);
    }
  }, [onNodesChange, job, setNodes]);

  const selectedMetrics: EnhancedStageMetrics | null = selectedNodeId && job?.enhancedStageMetrics 
    ? job.enhancedStageMetrics[selectedNodeId] || null 
    : null;

  const selectedNodeInfo = selectedNodeId && job 
    ? getNodeMetadata(selectedNodeId, job.employer) 
    : null;

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
        
        <div className="flex-1 min-h-0 flex">
          <div className="flex-1 min-h-0">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={handleNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              onPaneClick={() => setSelectedNodeId(null)}
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

          {selectedNodeId && (
            <StageDetailsPanel
              stageName={selectedNodeInfo?.label || "Stage Details"}
              stageIcon={selectedNodeInfo?.icon}
              stageId={selectedNodeId}
              metrics={selectedMetrics}
              onClose={() => setSelectedNodeId(null)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}