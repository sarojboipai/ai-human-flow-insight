export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      agents: {
        Row: {
          assigned_stages: Json
          avg_latency_ms: number
          created_at: string
          description: string
          id: string
          last_active: string | null
          name: string
          status: string
          success_rate: number
          tasks_processed: number
          type: string
        }
        Insert: {
          assigned_stages?: Json
          avg_latency_ms?: number
          created_at?: string
          description?: string
          id: string
          last_active?: string | null
          name: string
          status?: string
          success_rate?: number
          tasks_processed?: number
          type: string
        }
        Update: {
          assigned_stages?: Json
          avg_latency_ms?: number
          created_at?: string
          description?: string
          id?: string
          last_active?: string | null
          name?: string
          status?: string
          success_rate?: number
          tasks_processed?: number
          type?: string
        }
        Relationships: []
      }
      candidates: {
        Row: {
          created_at: string
          email: string
          experience_years: number
          first_name: string
          geography: string
          id: string
          last_name: string
          notes: string | null
          phone: string | null
          resume_url: string | null
          role_type: string
          source: string | null
          specialization: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          experience_years?: number
          first_name: string
          geography?: string
          id?: string
          last_name: string
          notes?: string | null
          phone?: string | null
          resume_url?: string | null
          role_type?: string
          source?: string | null
          specialization?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          experience_years?: number
          first_name?: string
          geography?: string
          id?: string
          last_name?: string
          notes?: string | null
          phone?: string | null
          resume_url?: string | null
          role_type?: string
          source?: string | null
          specialization?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      customer_workflow_schemas: {
        Row: {
          created_at: string
          customer_name: string
          id: string
          outcome_stages: Json
          stages: Json
          workflow_id: string
        }
        Insert: {
          created_at?: string
          customer_name: string
          id: string
          outcome_stages?: Json
          stages?: Json
          workflow_id?: string
        }
        Update: {
          created_at?: string
          customer_name?: string
          id?: string
          outcome_stages?: Json
          stages?: Json
          workflow_id?: string
        }
        Relationships: []
      }
      hitl_audit_logs: {
        Row: {
          actor: string
          created_at: string
          details: string
          event_type: string
          id: string
          rule_id: string | null
          rule_name: string | null
          snapshot: Json | null
          task_id: string | null
          timestamp: string | null
        }
        Insert: {
          actor?: string
          created_at?: string
          details?: string
          event_type: string
          id: string
          rule_id?: string | null
          rule_name?: string | null
          snapshot?: Json | null
          task_id?: string | null
          timestamp?: string | null
        }
        Update: {
          actor?: string
          created_at?: string
          details?: string
          event_type?: string
          id?: string
          rule_id?: string | null
          rule_name?: string | null
          snapshot?: Json | null
          task_id?: string | null
          timestamp?: string | null
        }
        Relationships: []
      }
      hitl_rules_v2: {
        Row: {
          action_type: string
          condition_metric: string
          created_at: string
          created_by: string
          description: string
          id: string
          last_triggered: string | null
          name: string
          operator: string
          priority: number
          rule_type: string
          stage: string
          status: string
          target_queue: string
          threshold_value: string
          trigger_count: number
          updated_at: string
          version: number
        }
        Insert: {
          action_type?: string
          condition_metric?: string
          created_at?: string
          created_by?: string
          description?: string
          id: string
          last_triggered?: string | null
          name: string
          operator?: string
          priority?: number
          rule_type: string
          stage: string
          status?: string
          target_queue?: string
          threshold_value?: string
          trigger_count?: number
          updated_at?: string
          version?: number
        }
        Update: {
          action_type?: string
          condition_metric?: string
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          last_triggered?: string | null
          name?: string
          operator?: string
          priority?: number
          rule_type?: string
          stage?: string
          status?: string
          target_queue?: string
          threshold_value?: string
          trigger_count?: number
          updated_at?: string
          version?: number
        }
        Relationships: []
      }
      hitl_tasks: {
        Row: {
          ai_agent_id: string | null
          ai_decision: string | null
          assigned_at: string | null
          assigned_to: string | null
          candidate_id: string | null
          candidate_name: string | null
          confidence_score: number
          created_at: string
          due_at: string | null
          id: string
          job_id: string | null
          job_title: string | null
          metadata: Json | null
          priority: string
          resolution: string | null
          resolved_at: string | null
          rule_id: string | null
          rule_name: string | null
          status: string
        }
        Insert: {
          ai_agent_id?: string | null
          ai_decision?: string | null
          assigned_at?: string | null
          assigned_to?: string | null
          candidate_id?: string | null
          candidate_name?: string | null
          confidence_score?: number
          created_at?: string
          due_at?: string | null
          id: string
          job_id?: string | null
          job_title?: string | null
          metadata?: Json | null
          priority?: string
          resolution?: string | null
          resolved_at?: string | null
          rule_id?: string | null
          rule_name?: string | null
          status?: string
        }
        Update: {
          ai_agent_id?: string | null
          ai_decision?: string | null
          assigned_at?: string | null
          assigned_to?: string | null
          candidate_id?: string | null
          candidate_name?: string | null
          confidence_score?: number
          created_at?: string
          due_at?: string | null
          id?: string
          job_id?: string | null
          job_title?: string | null
          metadata?: Json | null
          priority?: string
          resolution?: string | null
          resolved_at?: string | null
          rule_id?: string | null
          rule_name?: string | null
          status?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          ai_contribution: number
          cost: number
          created_at: string
          days_open: number
          employer: string
          employer_tier: string
          enhanced_stage_metrics: Json | null
          funnel: Json | null
          geography: string
          hitl_events: Json | null
          human_contribution: number
          id: string
          margin: number
          revenue: number
          role_type: string
          stage_metrics: Json | null
          status: string
          title: string
          workflow_id: string | null
        }
        Insert: {
          ai_contribution?: number
          cost?: number
          created_at?: string
          days_open?: number
          employer: string
          employer_tier: string
          enhanced_stage_metrics?: Json | null
          funnel?: Json | null
          geography: string
          hitl_events?: Json | null
          human_contribution?: number
          id: string
          margin?: number
          revenue?: number
          role_type: string
          stage_metrics?: Json | null
          status?: string
          title: string
          workflow_id?: string | null
        }
        Update: {
          ai_contribution?: number
          cost?: number
          created_at?: string
          days_open?: number
          employer?: string
          employer_tier?: string
          enhanced_stage_metrics?: Json | null
          funnel?: Json | null
          geography?: string
          hitl_events?: Json | null
          human_contribution?: number
          id?: string
          margin?: number
          revenue?: number
          role_type?: string
          stage_metrics?: Json | null
          status?: string
          title?: string
          workflow_id?: string | null
        }
        Relationships: []
      }
      pipeline_stages: {
        Row: {
          agents: Json
          avg_processing_time: string
          created_at: string
          human_backup: string
          id: string
          name: string
          primary_handler: string
          throughput: number
        }
        Insert: {
          agents?: Json
          avg_processing_time?: string
          created_at?: string
          human_backup?: string
          id: string
          name: string
          primary_handler: string
          throughput?: number
        }
        Update: {
          agents?: Json
          avg_processing_time?: string
          created_at?: string
          human_backup?: string
          id?: string
          name?: string
          primary_handler?: string
          throughput?: number
        }
        Relationships: []
      }
      pipeline_templates: {
        Row: {
          characteristics: Json
          created_at: string
          default_ai_coverage: number
          default_hitl_ruleset: string
          description: string
          hiring_type: string
          icon: string
          id: string
          job_zone: number
          name: string
          profession: string
          stages: Json
        }
        Insert: {
          characteristics?: Json
          created_at?: string
          default_ai_coverage?: number
          default_hitl_ruleset?: string
          description?: string
          hiring_type?: string
          icon?: string
          id: string
          job_zone?: number
          name: string
          profession?: string
          stages?: Json
        }
        Update: {
          characteristics?: Json
          created_at?: string
          default_ai_coverage?: number
          default_hitl_ruleset?: string
          description?: string
          hiring_type?: string
          icon?: string
          id?: string
          job_zone?: number
          name?: string
          profession?: string
          stages?: Json
        }
        Relationships: []
      }
      recruiters: {
        Row: {
          change: number
          created_at: string
          id: string
          interviews: number
          name: string
          placements: number
          revenue: number
          screened: number
          team: string
        }
        Insert: {
          change?: number
          created_at?: string
          id: string
          interviews?: number
          name: string
          placements?: number
          revenue?: number
          screened?: number
          team: string
        }
        Update: {
          change?: number
          created_at?: string
          id?: string
          interviews?: number
          name?: string
          placements?: number
          revenue?: number
          screened?: number
          team?: string
        }
        Relationships: []
      }
      workflows: {
        Row: {
          automations: Json | null
          connections: Json | null
          created_at: string
          created_by: string
          description: string
          execution_count: number
          hiring_type: string | null
          id: string
          industry: string | null
          job_type: string
          job_zone: number | null
          location_tier: string | null
          name: string
          node_positions: Json | null
          profession: string | null
          stages: Json
          status: string
          success_rate: number
          updated_at: string
          version: number
        }
        Insert: {
          automations?: Json | null
          connections?: Json | null
          created_at?: string
          created_by?: string
          description?: string
          execution_count?: number
          hiring_type?: string | null
          id: string
          industry?: string | null
          job_type?: string
          job_zone?: number | null
          location_tier?: string | null
          name: string
          node_positions?: Json | null
          profession?: string | null
          stages?: Json
          status?: string
          success_rate?: number
          updated_at?: string
          version?: number
        }
        Update: {
          automations?: Json | null
          connections?: Json | null
          created_at?: string
          created_by?: string
          description?: string
          execution_count?: number
          hiring_type?: string | null
          id?: string
          industry?: string | null
          job_type?: string
          job_zone?: number | null
          location_tier?: string | null
          name?: string
          node_positions?: Json | null
          profession?: string | null
          stages?: Json
          status?: string
          success_rate?: number
          updated_at?: string
          version?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
