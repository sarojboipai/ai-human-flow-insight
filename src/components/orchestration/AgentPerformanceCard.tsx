import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Agent } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";

interface AgentPerformanceCardProps {
  agent: Agent;
}

export function AgentPerformanceCard({ agent }: AgentPerformanceCardProps) {
  const performanceLevel = agent.successRate >= 90 ? "excellent" : agent.successRate >= 75 ? "good" : "needs-attention";
  
  const getPerformanceColor = () => {
    switch (performanceLevel) {
      case "excellent":
        return "text-emerald-500";
      case "good":
        return "text-amber-500";
      case "needs-attention":
        return "text-red-500";
    }
  };

  const getPerformanceIcon = () => {
    switch (performanceLevel) {
      case "excellent":
        return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case "good":
        return <Minus className="h-4 w-4 text-amber-500" />;
      case "needs-attention":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
  };

  const getTypeBadge = (type: Agent["type"]) => {
    switch (type) {
      case "phenom":
        return <Badge variant="outline" className="border-primary text-primary text-xs">Phenom</Badge>;
      case "internal":
        return <Badge variant="outline" className="border-blue-500 text-blue-500 text-xs">Internal</Badge>;
      case "third-party":
        return <Badge variant="outline" className="border-purple-500 text-purple-500 text-xs">3rd Party</Badge>;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-sm font-medium">{agent.name}</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">{agent.description}</p>
          </div>
          {getTypeBadge(agent.type)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-muted-foreground">Success Rate</div>
            <div className={`text-2xl font-bold ${getPerformanceColor()}`}>
              {agent.successRate}%
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Tasks/Day</div>
            <div className="text-2xl font-bold">
              {agent.tasksProcessed.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            Latency: {agent.avgLatencyMs > 0 ? `${agent.avgLatencyMs}ms` : "N/A"}
          </span>
          <div className="flex items-center gap-1">
            {getPerformanceIcon()}
            <span className="text-muted-foreground">{agent.lastActive}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
