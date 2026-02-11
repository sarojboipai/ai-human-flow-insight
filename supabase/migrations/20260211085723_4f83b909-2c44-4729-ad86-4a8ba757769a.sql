
-- ============================================
-- 1. Recruiters Table
-- ============================================
CREATE TABLE public.recruiters (
  id text PRIMARY KEY,
  name text NOT NULL,
  team text NOT NULL,
  screened integer NOT NULL DEFAULT 0,
  interviews integer NOT NULL DEFAULT 0,
  placements integer NOT NULL DEFAULT 0,
  revenue numeric NOT NULL DEFAULT 0,
  change numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.recruiters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on recruiters" ON public.recruiters FOR SELECT USING (true);

-- ============================================
-- 2. Agents Table
-- ============================================
CREATE TABLE public.agents (
  id text PRIMARY KEY,
  name text NOT NULL,
  type text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  description text NOT NULL DEFAULT '',
  tasks_processed integer NOT NULL DEFAULT 0,
  success_rate numeric NOT NULL DEFAULT 0,
  avg_latency_ms integer NOT NULL DEFAULT 0,
  assigned_stages jsonb NOT NULL DEFAULT '[]'::jsonb,
  last_active text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on agents" ON public.agents FOR SELECT USING (true);
CREATE POLICY "Allow public insert on agents" ON public.agents FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on agents" ON public.agents FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on agents" ON public.agents FOR DELETE USING (true);

-- ============================================
-- 3. Pipeline Stages Table
-- ============================================
CREATE TABLE public.pipeline_stages (
  id text PRIMARY KEY,
  name text NOT NULL,
  primary_handler text NOT NULL,
  agents jsonb NOT NULL DEFAULT '[]'::jsonb,
  human_backup text NOT NULL DEFAULT '',
  avg_processing_time text NOT NULL DEFAULT '',
  throughput integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.pipeline_stages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on pipeline_stages" ON public.pipeline_stages FOR SELECT USING (true);

-- ============================================
-- 4. HITL Rules V2 Table
-- ============================================
CREATE TABLE public.hitl_rules_v2 (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  rule_type text NOT NULL,
  stage text NOT NULL,
  condition_metric text NOT NULL DEFAULT '',
  operator text NOT NULL DEFAULT '<',
  threshold_value text NOT NULL DEFAULT '0',
  action_type text NOT NULL DEFAULT 'route_to_queue',
  target_queue text NOT NULL DEFAULT 'recruiter_review',
  priority integer NOT NULL DEFAULT 3,
  status text NOT NULL DEFAULT 'active',
  trigger_count integer NOT NULL DEFAULT 0,
  last_triggered text,
  created_by text NOT NULL DEFAULT '',
  version integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.hitl_rules_v2 ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on hitl_rules_v2" ON public.hitl_rules_v2 FOR SELECT USING (true);
CREATE POLICY "Allow public insert on hitl_rules_v2" ON public.hitl_rules_v2 FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on hitl_rules_v2" ON public.hitl_rules_v2 FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on hitl_rules_v2" ON public.hitl_rules_v2 FOR DELETE USING (true);

CREATE TRIGGER update_hitl_rules_v2_updated_at
  BEFORE UPDATE ON public.hitl_rules_v2
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 5. HITL Tasks Table
-- ============================================
CREATE TABLE public.hitl_tasks (
  id text PRIMARY KEY,
  rule_id text,
  rule_name text,
  candidate_id text,
  candidate_name text,
  job_id text,
  job_title text,
  ai_agent_id text,
  ai_decision text,
  confidence_score numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  priority text NOT NULL DEFAULT 'medium',
  assigned_to text,
  assigned_at text,
  resolution text,
  resolved_at text,
  due_at text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.hitl_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on hitl_tasks" ON public.hitl_tasks FOR SELECT USING (true);
CREATE POLICY "Allow public insert on hitl_tasks" ON public.hitl_tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on hitl_tasks" ON public.hitl_tasks FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on hitl_tasks" ON public.hitl_tasks FOR DELETE USING (true);

-- ============================================
-- 6. HITL Audit Logs Table
-- ============================================
CREATE TABLE public.hitl_audit_logs (
  id text PRIMARY KEY,
  rule_id text,
  rule_name text,
  task_id text,
  event_type text NOT NULL,
  actor text NOT NULL DEFAULT '',
  details text NOT NULL DEFAULT '',
  snapshot jsonb DEFAULT '{}'::jsonb,
  "timestamp" text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.hitl_audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on hitl_audit_logs" ON public.hitl_audit_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert on hitl_audit_logs" ON public.hitl_audit_logs FOR INSERT WITH CHECK (true);

-- ============================================
-- 7. Workflows Table
-- ============================================
CREATE TABLE public.workflows (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  version integer NOT NULL DEFAULT 1,
  status text NOT NULL DEFAULT 'draft',
  job_type text NOT NULL DEFAULT 'frontline',
  stages jsonb NOT NULL DEFAULT '[]'::jsonb,
  automations jsonb DEFAULT '[]'::jsonb,
  created_by text NOT NULL DEFAULT '',
  execution_count integer NOT NULL DEFAULT 0,
  success_rate numeric NOT NULL DEFAULT 0,
  profession text,
  job_zone integer,
  location_tier text,
  industry text,
  hiring_type text,
  node_positions jsonb,
  connections jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on workflows" ON public.workflows FOR SELECT USING (true);
CREATE POLICY "Allow public insert on workflows" ON public.workflows FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on workflows" ON public.workflows FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on workflows" ON public.workflows FOR DELETE USING (true);

CREATE TRIGGER update_workflows_updated_at
  BEFORE UPDATE ON public.workflows
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 8. Pipeline Templates Table
-- ============================================
CREATE TABLE public.pipeline_templates (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  hiring_type text NOT NULL DEFAULT 'bulk',
  profession text NOT NULL DEFAULT 'nurse',
  job_zone integer NOT NULL DEFAULT 1,
  default_ai_coverage integer NOT NULL DEFAULT 80,
  default_hitl_ruleset text NOT NULL DEFAULT '',
  characteristics jsonb NOT NULL DEFAULT '[]'::jsonb,
  stages jsonb NOT NULL DEFAULT '[]'::jsonb,
  icon text NOT NULL DEFAULT 'Zap',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.pipeline_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on pipeline_templates" ON public.pipeline_templates FOR SELECT USING (true);
CREATE POLICY "Allow public insert on pipeline_templates" ON public.pipeline_templates FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on pipeline_templates" ON public.pipeline_templates FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on pipeline_templates" ON public.pipeline_templates FOR DELETE USING (true);

-- ============================================
-- 9. Customer Workflow Schemas Table
-- ============================================
CREATE TABLE public.customer_workflow_schemas (
  id text PRIMARY KEY,
  customer_name text NOT NULL,
  workflow_id text NOT NULL DEFAULT '',
  stages jsonb NOT NULL DEFAULT '[]'::jsonb,
  outcome_stages jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.customer_workflow_schemas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on customer_workflow_schemas" ON public.customer_workflow_schemas FOR SELECT USING (true);
