import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { jobs as mockJobs, type Job } from "@/lib/mockData";

interface DbJob {
  id: string;
  title: string;
  employer: string;
  employer_tier: string;
  role_type: string;
  geography: string;
  status: string;
  created_at: string;
  days_open: number;
  ai_contribution: number;
  human_contribution: number;
  revenue: number;
  cost: number;
  margin: number;
  workflow_id: string | null;
  funnel: any;
  hitl_events: any;
  stage_metrics: any;
  enhanced_stage_metrics: any;
}

function mapDbJobToJob(dbJob: DbJob): Job {
  const mockJob = mockJobs.find(j => j.id === dbJob.id);

  return {
    id: dbJob.id,
    title: dbJob.title,
    employer: dbJob.employer,
    employerTier: dbJob.employer_tier as Job["employerTier"],
    roleType: dbJob.role_type as Job["roleType"],
    geography: dbJob.geography,
    status: dbJob.status as Job["status"],
    createdAt: dbJob.created_at,
    daysOpen: dbJob.days_open,
    aiContribution: dbJob.ai_contribution,
    humanContribution: dbJob.human_contribution,
    revenue: Number(dbJob.revenue),
    cost: Number(dbJob.cost),
    margin: Number(dbJob.margin),
    workflowId: dbJob.workflow_id || "",
    funnel: dbJob.funnel || [],
    hitlEvents: dbJob.hitl_events || [],
    stageMetrics: (dbJob.stage_metrics && Object.keys(dbJob.stage_metrics).length > 0)
      ? dbJob.stage_metrics
      : mockJob?.stageMetrics,
    enhancedStageMetrics: (dbJob.enhanced_stage_metrics && Object.keys(dbJob.enhanced_stage_metrics).length > 0)
      ? dbJob.enhanced_stage_metrics
      : mockJob?.enhancedStageMetrics,
  };
}

export function useJobs() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("jobs-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "jobs" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["jobs"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ["jobs"],
    queryFn: async (): Promise<Job[]> => {
      const { data, error } = await supabase
        .from("jobs" as any)
        .select("*");

      if (error) {
        console.error("Failed to fetch jobs from database, using mock data:", error);
        return mockJobs;
      }

      if (!data || data.length === 0) {
        return mockJobs;
      }

      return (data as unknown as DbJob[]).map(mapDbJobToJob);
    },
    staleTime: 5 * 60 * 1000,
  });
}
