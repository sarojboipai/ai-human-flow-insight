import { Zap, Play, Pause, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { HITLRule } from "@/lib/mockData";
import { Link } from "react-router-dom";

interface HITLRulesPanelProps {
  rules: HITLRule[];
}

const getPriorityBadge = (priority: HITLRule["priority"]) => {
  switch (priority) {
    case "high":
      return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">High</Badge>;
    case "medium":
      return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Medium</Badge>;
    case "low":
      return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Low</Badge>;
  }
};

export function HITLRulesPanel({ rules }: HITLRulesPanelProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            Routing Rules
          </CardTitle>
          <Link to="/hitl">
            <Button variant="ghost" size="sm" className="text-xs">
              View Queue
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <Switch checked={rule.status === "active"} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{rule.name}</span>
                    {getPriorityBadge(rule.priority)}
                  </div>
                  <code className="text-xs text-muted-foreground">{rule.condition}</code>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">{rule.triggerCount}</div>
                <div className="text-xs text-muted-foreground">triggers</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
