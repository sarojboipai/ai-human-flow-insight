import { HITLLayout } from "@/components/layout/HITLLayout";
import { HITLAnalytics as HITLAnalyticsComponent } from "@/components/hitl/HITLAnalytics";

export default function HITLAnalytics() {
  return (
    <HITLLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="dashboard-title">HITL Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Performance metrics and insights
          </p>
        </div>

        <HITLAnalyticsComponent />
      </div>
    </HITLLayout>
  );
}
