import { useState } from "react";
import { Plus, Search, RefreshCw, Settings, AlertCircle, CheckCircle, XCircle, Database, MessageSquare, Calendar, Users, Webhook, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Connector, EventSubscription, connectors as mockConnectors, eventSubscriptions as mockEventSubscriptions } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

const getConnectorIcon = (type: Connector["type"]) => {
  switch (type) {
    case "ats":
      return Database;
    case "messaging":
      return MessageSquare;
    case "calendar":
      return Calendar;
    case "crm":
      return Users;
    case "webhook":
      return Webhook;
    case "billing":
      return CreditCard;
  }
};

const getStatusIcon = (status: Connector["status"]) => {
  switch (status) {
    case "connected":
      return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    case "disconnected":
      return <XCircle className="h-4 w-4 text-muted-foreground" />;
    case "error":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
  }
};

const getStatusBadge = (status: Connector["status"]) => {
  switch (status) {
    case "connected":
      return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Connected</Badge>;
    case "disconnected":
      return <Badge className="bg-muted text-muted-foreground border-muted">Disconnected</Badge>;
    case "error":
      return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Error</Badge>;
  }
};

const getTypeBadge = (type: Connector["type"]) => {
  const colors: Record<Connector["type"], string> = {
    ats: "border-blue-500 text-blue-500",
    messaging: "border-green-500 text-green-500",
    calendar: "border-purple-500 text-purple-500",
    crm: "border-orange-500 text-orange-500",
    webhook: "border-cyan-500 text-cyan-500",
    billing: "border-pink-500 text-pink-500",
  };
  return <Badge variant="outline" className={colors[type]}>{type.toUpperCase()}</Badge>;
};

export function ConnectorRegistry() {
  const [connectors] = useState<Connector[]>(mockConnectors);
  const [eventSubscriptions] = useState<EventSubscription[]>(mockEventSubscriptions);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filteredConnectors = connectors.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefresh = (connector: Connector) => {
    toast({
      title: "Syncing...",
      description: `Refreshing connection to ${connector.name}`,
    });
  };

  const handleConfigure = (connector: Connector) => {
    toast({
      title: "Configure Connector",
      description: `Opening settings for ${connector.name}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Connector
        </Button>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search connectors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Connectors Grid */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Connected Systems ({filteredConnectors.length})
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredConnectors.map((connector) => {
            const IconComponent = getConnectorIcon(connector.type);
            return (
              <Card key={connector.id} className={connector.status === "error" ? "border-red-500/50" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        connector.status === "connected" ? "bg-primary/10" : 
                        connector.status === "error" ? "bg-red-500/10" : "bg-muted"
                      }`}>
                        <IconComponent className={`h-5 w-5 ${
                          connector.status === "connected" ? "text-primary" :
                          connector.status === "error" ? "text-red-500" : "text-muted-foreground"
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{connector.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{connector.provider}</p>
                      </div>
                    </div>
                    {getStatusIcon(connector.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    {getTypeBadge(connector.type)}
                    {getStatusBadge(connector.status)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-muted-foreground">Last sync:</span>
                      <span className="ml-1 font-medium">{connector.lastSync}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Daily:</span>
                      <span className="ml-1 font-medium">{connector.dailyVolume.toLocaleString()}</span>
                    </div>
                  </div>

                  {connector.status === "error" && (
                    <div className="text-xs text-red-500 mb-3 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Credentials expired - reconfiguration needed
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 gap-1"
                      onClick={() => handleRefresh(connector)}
                      disabled={connector.status === "error"}
                    >
                      <RefreshCw className="h-3 w-3" />
                      Sync
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 gap-1"
                      onClick={() => handleConfigure(connector)}
                    >
                      <Settings className="h-3 w-3" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Event Subscriptions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Webhook className="h-5 w-5 text-primary" />
            Event Subscriptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trigger Event</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Connector</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Trigger Count</TableHead>
                <TableHead>Last Triggered</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventSubscriptions.map((sub) => {
                const connector = connectors.find(c => c.id === sub.connectorId);
                return (
                  <TableRow key={sub.id}>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        ON {sub.trigger}
                      </code>
                    </TableCell>
                    <TableCell className="font-medium">{sub.action}</TableCell>
                    <TableCell>{connector?.name || "Unknown"}</TableCell>
                    <TableCell>
                      <Badge variant={sub.status === "active" ? "default" : "secondary"}>
                        {sub.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{sub.triggerCount.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground">{sub.lastTriggered}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
