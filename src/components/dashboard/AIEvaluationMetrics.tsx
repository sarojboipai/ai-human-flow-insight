import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle, XCircle, TrendingUp, TrendingDown } from "lucide-react";

interface AIEvaluationMetricsProps {
  metrics: {
    matchAccuracy: number;
    fitScoreAcceptance: number;
    overrideRate: number;
    escalationRate: number;
    automationFailure: number;
  };
}

interface MetricRowProps {
  label: string;
  value: number;
  target: number;
  isInverted?: boolean; // Lower is better (like override rate, failure rate)
  suffix?: string;
}

function MetricRow({ label, value, target, isInverted = false, suffix = "%" }: MetricRowProps) {
  const isGood = isInverted ? value <= target : value >= target;
  const isWarning = isInverted 
    ? value > target && value <= target * 1.5 
    : value < target && value >= target * 0.8;
  
  const getStatusIcon = () => {
    if (isGood) return <CheckCircle2 className="h-4 w-4 text-success" />;
    if (isWarning) return <AlertTriangle className="h-4 w-4 text-warning" />;
    return <XCircle className="h-4 w-4 text-destructive" />;
  };

  const getProgressColor = () => {
    if (isGood) return "bg-success";
    if (isWarning) return "bg-warning";
    return "bg-destructive";
  };

  const progressValue = isInverted 
    ? Math.max(0, 100 - (value / target) * 50) 
    : Math.min(100, (value / target) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{value}{suffix}</span>
          {getStatusIcon()}
        </div>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full transition-all ${getProgressColor()}`}
          style={{ width: `${Math.min(100, isInverted ? 100 - value * 5 : value)}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Target: {isInverted ? `<${target}` : `>${target}`}{suffix}</span>
        <span className="flex items-center gap-1">
          {isGood ? (
            <>
              <TrendingUp className="h-3 w-3 text-success" />
              On Track
            </>
          ) : (
            <>
              <TrendingDown className="h-3 w-3 text-warning" />
              Needs Attention
            </>
          )}
        </span>
      </div>
    </div>
  );
}

export function AIEvaluationMetrics({ metrics }: AIEvaluationMetricsProps) {
  return (
    <div className="chart-container">
      <h3 className="section-title mb-4">AI Evaluation Metrics</h3>
      <div className="space-y-5">
        <MetricRow 
          label="AI Match Accuracy" 
          value={metrics.matchAccuracy} 
          target={85} 
        />
        <MetricRow 
          label="Fit Score Acceptance" 
          value={metrics.fitScoreAcceptance} 
          target={80} 
        />
        <MetricRow 
          label="Recruiter Override Rate" 
          value={metrics.overrideRate} 
          target={10} 
          isInverted 
        />
        <MetricRow 
          label="HITL Escalation Rate" 
          value={metrics.escalationRate} 
          target={8} 
          isInverted 
        />
        <MetricRow 
          label="Automation Failure Rate" 
          value={metrics.automationFailure} 
          target={2} 
          isInverted 
        />
      </div>
    </div>
  );
}
