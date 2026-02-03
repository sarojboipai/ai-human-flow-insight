import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WorkflowProvider } from "@/contexts/WorkflowContext";
import Index from "./pages/Index";
import FunnelAnalytics from "./pages/FunnelAnalytics";
import HumanAIWorkload from "./pages/HumanAIWorkload";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import AIPerformance from "./pages/AIPerformance";
import HITLQueue from "./pages/HITLQueue";
import HITLAnalytics from "./pages/HITLAnalytics";
import HITLAuditLog from "./pages/HITLAuditLog";
import RevenueIntelligence from "./pages/RevenueIntelligence";
import StaffingPlanner from "./pages/StaffingPlanner";
import Settings from "./pages/Settings";
import OrchestrationEngine from "./pages/OrchestrationEngine";
import JobDetail from "./pages/JobDetail";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerBusiness from "./pages/CustomerBusiness";
import NotFound from "./pages/NotFound";
import OpsDashboard from "./pages/OpsDashboard";
import OpsPipelineConfig from "./pages/OpsPipelineConfig";
import OpsJobOrchestration from "./pages/OpsJobOrchestration";
import OpsRecruiterDashboard from "./pages/OpsRecruiterDashboard";
import OpsAIPerformance from "./pages/OpsAIPerformance";
import PipelineTemplateBuilder from "./pages/PipelineTemplateBuilder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WorkflowProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/funnel" element={<FunnelAnalytics />} />
            <Route path="/human-ai" element={<HumanAIWorkload />} />
            <Route path="/human-activity" element={<RecruiterDashboard />} />
            <Route path="/ai-performance" element={<AIPerformance />} />
            <Route path="/hitl" element={<HITLQueue />} />
            <Route path="/hitl/analytics" element={<HITLAnalytics />} />
            <Route path="/hitl/audit" element={<HITLAuditLog />} />
            <Route path="/revenue" element={<RevenueIntelligence />} />
            <Route path="/staffing" element={<StaffingPlanner />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/orchestration" element={<OrchestrationEngine />} />
            <Route path="/jobs/:jobId" element={<JobDetail />} />
            <Route path="/customer" element={<CustomerDashboard />} />
            <Route path="/customer/business" element={<CustomerBusiness />} />
            {/* Operations Manager routes */}
            <Route path="/ops" element={<OpsDashboard />} />
            <Route path="/ops/pipeline-config" element={<OpsPipelineConfig />} />
            <Route path="/ops/job-orchestration" element={<OpsJobOrchestration />} />
            <Route path="/ops/recruiters" element={<OpsRecruiterDashboard />} />
            <Route path="/ops/ai-performance" element={<OpsAIPerformance />} />
            <Route path="/ops/template-builder" element={<PipelineTemplateBuilder />} />
            <Route path="/ops/template-builder/:templateId" element={<PipelineTemplateBuilder />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WorkflowProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
