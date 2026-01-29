import { CheckCircle, AlertCircle, Pause, Activity, Clock, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent } from "@/lib/mockData";

interface AgentHealthMonitorProps {
  agents: Agent[];
}

const getStatusIcon = (status: Agent["status"]) => {
  switch (status) {
    case "active":
      return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    case "paused":
      return <Pause className="h-4 w-4 text-amber-500" />;
    case "error":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
  }
};

const getHealthColor = (successRate: number) => {
  if (successRate >= 95) return "text-emerald-500";
  if (successRate >= 85) return "text-primary";
  if (successRate >= 70) return "text-amber-500";
  return "text-red-500";
};

const getLatencyColor = (latencyMs: number) => {
  if (latencyMs === 0) return "text-muted-foreground";
  if (latencyMs < 500) return "text-emerald-500";
  if (latencyMs < 1500) return "text-primary";
  if (latencyMs < 3000) return "text-amber-500";
  return "text-red-500";
};

export function AgentHealthMonitor({ agents }: AgentHealthMonitorProps) {
  const activeAgents = agents.filter(a => a.status === "active");
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Activity className="h-5 w-5 text-primary" />
        Agent Health Overview
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {activeAgents.map((agent) => (
          <Card key={agent.id} className="relative overflow-hidden">
            {/* Health indicator bar */}
            <div 
              className={`absolute top-0 left-0 right-0 h-1 ${
                agent.successRate >= 95 ? "bg-emerald-500" :
                agent.successRate >= 85 ? "bg-primary" :
                agent.successRate >= 70 ? "bg-amber-500" : "bg-red-500"
              }`}
            />
            
            <CardHeader className="pb-2 pt-4">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm font-medium truncate flex-1">
                  {agent.name}
                </CardTitle>
                {getStatusIcon(agent.status)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                  <div className={`text-lg font-bold ${getHealthColor(agent.successRate)}`}>
                    {agent.successRate}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Latency</div>
                  <div className={`text-lg font-bold ${getLatencyColor(agent.avgLatencyMs)}`}>
                    {agent.avgLatencyMs > 0 ? `${agent.avgLatencyMs}ms` : "-"}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Zap className="h-3 w-3" />
                  {agent.tasksProcessed.toLocaleString()} tasks
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {agent.lastActive}
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {agent.assignedStages.slice(0, 2).map((stage) => (
                  <Badge key={stage} variant="secondary" className="text-xs">
                    {stage}
                  </Badge>
                ))}
                {agent.assignedStages.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{agent.assignedStages.length - 2}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
