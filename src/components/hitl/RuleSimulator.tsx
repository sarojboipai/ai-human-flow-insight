import { useState } from "react";
import { Play, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HITLRuleV2, historicalCandidates } from "@/lib/mockData";

interface RuleSimulatorProps {
  rules: HITLRuleV2[];
  selectedRule?: HITLRuleV2 | null;
  onSelectRule: (rule: HITLRuleV2) => void;
}

interface SimulationResult {
  totalCandidates: number;
  matchedCandidates: number;
  routingPercentage: number;
  sampleMatches: Array<{
    candidateId: string;
    jobId: string;
    score: number;
    matched: boolean;
  }>;
}

export function RuleSimulator({
  rules,
  selectedRule,
  onSelectRule,
}: RuleSimulatorProps) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const runSimulation = () => {
    if (!selectedRule) return;

    setIsSimulating(true);

    // Simulate processing delay
    setTimeout(() => {
      // Mock simulation logic based on rule conditions
      const matches = historicalCandidates.map((candidate) => {
        let matched = false;

        if (selectedRule.conditionMetric === "ai_confidence") {
          const threshold =
            typeof selectedRule.thresholdValue === "number"
              ? selectedRule.thresholdValue
              : parseFloat(selectedRule.thresholdValue);

          switch (selectedRule.operator) {
            case "<":
              matched = candidate.aiConfidence < threshold;
              break;
            case "<=":
              matched = candidate.aiConfidence <= threshold;
              break;
            case ">":
              matched = candidate.aiConfidence > threshold;
              break;
            case ">=":
              matched = candidate.aiConfidence >= threshold;
              break;
            case "=":
              matched = candidate.aiConfidence === threshold;
              break;
          }
        } else if (selectedRule.conditionMetric === "employer_tier") {
          matched = candidate.employerTier === selectedRule.thresholdValue;
        } else if (selectedRule.conditionMetric === "role_level") {
          matched = candidate.roleLevel === selectedRule.thresholdValue;
        } else {
          // Random simulation for other metrics
          matched = Math.random() > 0.6;
        }

        return {
          candidateId: candidate.id,
          jobId: candidate.jobId,
          score: candidate.aiConfidence,
          matched,
        };
      });

      const matchedCount = matches.filter((m) => m.matched).length;

      setResult({
        totalCandidates: historicalCandidates.length,
        matchedCandidates: matchedCount,
        routingPercentage: (matchedCount / historicalCandidates.length) * 100,
        sampleMatches: matches,
      });

      setIsSimulating(false);
    }, 1500);
  };

  const activeRules = rules.filter((r) => r.status !== "draft");

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Rule Simulator</CardTitle>
          <CardDescription>
            Test rules against historical data to predict routing impact
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">
                Select Rule to Simulate
              </label>
              <Select
                value={selectedRule?.id || ""}
                onValueChange={(id) => {
                  const rule = rules.find((r) => r.id === id);
                  if (rule) onSelectRule(rule);
                }}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Choose a rule..." />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {activeRules.map((rule) => (
                    <SelectItem key={rule.id} value={rule.id}>
                      {rule.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={runSimulation}
              disabled={!selectedRule || isSimulating}
            >
              <Play className="h-4 w-4 mr-2" />
              {isSimulating ? "Simulating..." : "Run Simulation"}
            </Button>
          </div>

          {selectedRule && (
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-sm">
                <span className="font-medium">Rule:</span> {selectedRule.name}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="text-foreground">IF</span>{" "}
                {selectedRule.conditionMetric.replace(/_/g, " ")}{" "}
                {selectedRule.operator} {selectedRule.thresholdValue}{" "}
                <span className="text-foreground">THEN</span>{" "}
                {selectedRule.actionType.replace(/_/g, " ")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {result && (
        <>
          {/* Results Summary */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-info/20">
                    <Users className="h-5 w-5 text-info" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {result.totalCandidates}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total Evaluated
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/20">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {result.matchedCandidates}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Would Route to Human
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {result.routingPercentage.toFixed(1)}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Routing Rate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Routing Impact Visual */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Routing Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Human Review Required</span>
                  <span className="font-medium">
                    {result.routingPercentage.toFixed(1)}%
                  </span>
                </div>
                <Progress value={result.routingPercentage} className="h-3" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    {result.matchedCandidates} candidates routed to human queue
                  </span>
                  <span>
                    {result.totalCandidates - result.matchedCandidates} handled
                    by AI
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sample Matches */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Sample Candidates</CardTitle>
              <CardDescription>
                Preview of candidates that would be affected by this rule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground font-medium">
                      Candidate ID
                    </TableHead>
                    <TableHead className="text-muted-foreground font-medium">
                      Job ID
                    </TableHead>
                    <TableHead className="text-muted-foreground font-medium">
                      AI Confidence
                    </TableHead>
                    <TableHead className="text-muted-foreground font-medium">
                      Rule Match
                    </TableHead>
                    <TableHead className="text-muted-foreground font-medium">
                      Routing
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.sampleMatches.map((match) => (
                    <TableRow key={match.candidateId} className="border-border">
                      <TableCell className="font-mono text-sm">
                        {match.candidateId}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {match.jobId}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-mono ${
                            match.score < 0.7
                              ? "text-warning"
                              : "text-success"
                          }`}
                        >
                          {match.score.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {match.matched ? (
                          <Badge className="bg-warning/20 text-warning">
                            Matched
                          </Badge>
                        ) : (
                          <Badge variant="outline">No Match</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {match.matched ? (
                          <span className="text-sm text-warning">
                            → Human Queue
                          </span>
                        ) : (
                          <span className="text-sm text-success">
                            AI Continues
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
