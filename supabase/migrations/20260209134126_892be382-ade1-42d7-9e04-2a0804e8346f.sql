
-- Create jobs table
CREATE TABLE public.jobs (
  id text PRIMARY KEY,
  title text NOT NULL,
  employer text NOT NULL,
  employer_tier text NOT NULL,
  role_type text NOT NULL,
  geography text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  days_open integer NOT NULL DEFAULT 0,
  ai_contribution integer NOT NULL DEFAULT 0,
  human_contribution integer NOT NULL DEFAULT 0,
  revenue numeric NOT NULL DEFAULT 0,
  cost numeric NOT NULL DEFAULT 0,
  margin numeric NOT NULL DEFAULT 0,
  workflow_id text,
  funnel jsonb DEFAULT '[]'::jsonb,
  hitl_events jsonb DEFAULT '[]'::jsonb,
  stage_metrics jsonb DEFAULT '{}'::jsonb,
  enhanced_stage_metrics jsonb DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Allow public read access (no auth yet)
CREATE POLICY "Allow public read access on jobs"
  ON public.jobs
  FOR SELECT
  USING (true);
