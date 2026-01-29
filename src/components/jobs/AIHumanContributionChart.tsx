import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobFunnelStage } from "@/lib/mockData";

interface AIHumanContributionChartProps {
  funnel: JobFunnelStage[];
  title?: string;
}

export function AIHumanContributionChart({ funnel, title = "AI vs Human Contribution" }: AIHumanContributionChartProps) {
  const data = funnel.map((stage) => ({
    name: stage.name.length > 15 ? stage.name.substring(0, 15) + "..." : stage.name,
    fullName: stage.name,
    ai: stage.aiHandled,
    human: stage.humanHandled,
    aiPercent: stage.candidates > 0 ? Math.round((stage.aiHandled / stage.candidates) * 100) : 0,
    humanPercent: stage.candidates > 0 ? Math.round((stage.humanHandled / stage.candidates) * 100) : 0,
  }));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-teal-500" />
            AI Automated
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            Human Handled
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
            <YAxis
              dataKey="name"
              type="category"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 11 }}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number, name: string, props: { payload: { fullName: string; aiPercent: number; humanPercent: number } }) => {
                const suffix = name === "ai" ? ` (${props.payload.aiPercent}%)` : ` (${props.payload.humanPercent}%)`;
                return [value + suffix, name === "ai" ? "AI Automated" : "Human Handled"];
              }}
              labelFormatter={(label, payload) => {
                if (payload && payload[0]) {
                  return payload[0].payload.fullName;
                }
                return label;
              }}
            />
            <Legend />
            <Bar dataKey="ai" name="AI Automated" stackId="a" fill="hsl(173, 58%, 45%)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="human" name="Human Handled" stackId="a" fill="hsl(38, 92%, 50%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
