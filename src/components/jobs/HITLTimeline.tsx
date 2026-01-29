import { AlertCircle, CheckCircle, Clock, RefreshCcw, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobHITLEvent } from "@/lib/mockData";

interface HITLTimelineProps {
  events: JobHITLEvent[];
  title?: string;
}

const getEventIcon = (type: JobHITLEvent["type"]) => {
  switch (type) {
    case "escalation":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    case "override":
      return <RefreshCcw className="h-4 w-4 text-amber-500" />;
    case "review":
      return <Clock className="h-4 w-4 text-blue-500" />;
    case "approval":
      return <ThumbsUp className="h-4 w-4 text-emerald-500" />;
  }
};

const getEventBadge = (type: JobHITLEvent["type"]) => {
  switch (type) {
    case "escalation":
      return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Escalation</Badge>;
    case "override":
      return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Override</Badge>;
    case "review":
      return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Review</Badge>;
    case "approval":
      return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Approval</Badge>;
  }
};

export function HITLTimeline({ events, title = "HITL Timeline" }: HITLTimelineProps) {
  if (events.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <CheckCircle className="h-8 w-8 mb-2 text-emerald-500" />
            <p className="text-sm">No human interventions required</p>
            <p className="text-xs">This job has been fully AI-automated</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          {title}
          <Badge variant="secondary">{events.length} events</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-6">
            {events.map((event) => (
              <div key={event.id} className="relative pl-10">
                <div className="absolute left-2 w-5 h-5 rounded-full bg-background border-2 border-border flex items-center justify-center">
                  {getEventIcon(event.type)}
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getEventBadge(event.type)}
                      <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Duration: {event.duration}</span>
                  </div>
                  <p className="text-sm font-medium mb-1">{event.reason}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Assignee: {event.assignee}</span>
                    <span className="text-emerald-500">✓ {event.resolution}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
