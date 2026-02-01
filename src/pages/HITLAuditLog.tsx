import { HITLLayout } from "@/components/layout/HITLLayout";
import { AuditLogTable } from "@/components/hitl/AuditLogTable";
import { hitlAuditLogs } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function HITLAuditLog() {
  return (
    <HITLLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="dashboard-title">Audit Log</h1>
          <p className="text-muted-foreground mt-1">
            System triggers and human interventions
          </p>
        </div>

        <div className="chart-container">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title">Audit Trail</h3>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
          </div>
          <AuditLogTable logs={hitlAuditLogs} />
        </div>
      </div>
    </HITLLayout>
  );
}
