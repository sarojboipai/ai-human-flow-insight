import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building2, MapPin, Calendar, ExternalLink } from "lucide-react";
import { OpsLayout } from "@/components/layout/OpsLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobFunnelVisualization } from "@/components/jobs/JobFunnelVisualization";
import { AIHumanContributionChart } from "@/components/jobs/AIHumanContributionChart";
import { HITLTimeline } from "@/components/jobs/HITLTimeline";
import { JobEconomicsCard } from "@/components/jobs/JobEconomicsCard";
import { useJobs } from "@/hooks/useJobs";

const OpsJobDetail = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const { data: jobs = [] } = useJobs();
  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return (
      <OpsLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">The job you're looking for doesn't exist.</p>
          <Link to="/ops">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </OpsLayout>
    );
  }

  const getStatusBadge = (status: typeof job.status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Active</Badge>;
      case "filled":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Filled</Badge>;
      case "closed":
        return <Badge className="bg-muted text-muted-foreground">Closed</Badge>;
    }
  };

  const getTierBadge = (tier: typeof job.employerTier) => {
    switch (tier) {
      case "enterprise":
        return <Badge variant="outline" className="border-purple-500 text-purple-500">Enterprise</Badge>;
      case "mid-market":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Mid-Market</Badge>;
      case "smb":
        return <Badge variant="outline" className="border-muted-foreground text-muted-foreground">SMB</Badge>;
    }
  };

  return (
    <OpsLayout>
      {/* Header */}
      <div className="mb-6">
        <Link to="/ops" className="block mb-4">
          <Button variant="ghost" size="sm" className="gap-1 -ml-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{job.title}</h1>
              {getStatusBadge(job.status)}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {job.employer}
                {getTierBadge(job.employerTier)}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.geography}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {job.daysOpen} days open
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-1" />
              View Employer
            </Button>
            <Button variant="outline" size="sm">
              Export Data
            </Button>
          </div>
        </div>
      </div>

      {/* Job Funnel */}
      <div className="mb-6">
        <JobFunnelVisualization funnel={job.funnel} title="Candidate Funnel" />
      </div>

      {/* AI vs Human + Economics */}
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <AIHumanContributionChart funnel={job.funnel} />
        <JobEconomicsCard job={job} />
      </div>

      {/* HITL Timeline + Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <HITLTimeline events={job.hitlEvents} />
        
        {/* Activity Feed */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {job.funnel.slice(0, 5).map((stage, index) => (
                <div key={stage.name} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${index === 0 ? "bg-emerald-500" : "bg-muted-foreground"}`} />
                    <div>
                      <p className="text-sm font-medium">{stage.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {stage.candidates} candidates • {stage.avgTimeInStage} avg
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-teal-500">{stage.aiHandled} AI</span>
                    <span className="mx-1 text-muted-foreground">/</span>
                    <span className="text-amber-500">{stage.humanHandled} Human</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </OpsLayout>
  );
};

export default OpsJobDetail;
