import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FunnelAnalytics from "./pages/FunnelAnalytics";
import HumanAIWorkload from "./pages/HumanAIWorkload";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import AIPerformance from "./pages/AIPerformance";
import HITLQueue from "./pages/HITLQueue";
import RevenueIntelligence from "./pages/RevenueIntelligence";
import StaffingPlanner from "./pages/StaffingPlanner";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/funnel" element={<FunnelAnalytics />} />
          <Route path="/human-ai" element={<HumanAIWorkload />} />
          <Route path="/recruiters" element={<RecruiterDashboard />} />
          <Route path="/ai-performance" element={<AIPerformance />} />
          <Route path="/hitl" element={<HITLQueue />} />
          <Route path="/revenue" element={<RevenueIntelligence />} />
          <Route path="/staffing" element={<StaffingPlanner />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
