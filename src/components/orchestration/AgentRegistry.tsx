import { Bot, Pause, Play, AlertCircle, CheckCircle, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Agent } from "@/lib/mockData";

interface AgentRegistryProps {
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

const getStatusBadge = (status: Agent["status"]) => {
  switch (status) {
    case "active":
      return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Active</Badge>;
    case "paused":
      return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Paused</Badge>;
    case "error":
      return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Error</Badge>;
  }
};

const getTypeBadge = (type: Agent["type"]) => {
  switch (type) {
    case "phenom":
      return <Badge variant="outline" className="border-primary text-primary">Phenom AI</Badge>;
    case "internal":
      return <Badge variant="outline" className="border-blue-500 text-blue-500">Internal Bot</Badge>;
    case "third-party":
      return <Badge variant="outline" className="border-purple-500 text-purple-500">Third-Party</Badge>;
  }
};

export function AgentRegistry({ agents }: AgentRegistryProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          Agent Registry
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Tasks/Day</TableHead>
              <TableHead className="text-right">Success Rate</TableHead>
              <TableHead className="text-right">Avg Latency</TableHead>
              <TableHead>Stages</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(agent.status)}
                    <div>
                      <div className="font-medium">{agent.name}</div>
                      <div className="text-xs text-muted-foreground">{agent.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getTypeBadge(agent.type)}</TableCell>
                <TableCell>{getStatusBadge(agent.status)}</TableCell>
                <TableCell className="text-right font-medium">
                  {agent.tasksProcessed.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <span className={agent.successRate >= 90 ? "text-emerald-500" : agent.successRate >= 70 ? "text-amber-500" : "text-red-500"}>
                    {agent.successRate}%
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {agent.avgLatencyMs > 0 ? `${agent.avgLatencyMs}ms` : "-"}
                  </div>
                </TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    disabled={agent.status === "error"}
                  >
                    {agent.status === "paused" ? (
                      <Play className="h-4 w-4" />
                    ) : (
                      <Pause className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
