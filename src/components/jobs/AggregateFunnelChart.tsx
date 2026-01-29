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

interface AggregateData {
  name: string;
  total: number;
  ai: number;
  human: number;
}

interface AggregateFunnelChartProps {
  data: AggregateData[];
}

export function AggregateFunnelChart({ data }: AggregateFunnelChartProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Aggregate Funnel - AI vs Human Split</CardTitle>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-teal-500" />
            AI Processed
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            Human Processed
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              angle={-45}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 11 }}
              height={80}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number, name: string) => {
                return [value.toLocaleString(), name === "ai" ? "AI Processed" : "Human Processed"];
              }}
            />
            <Legend wrapperStyle={{ paddingTop: 20 }} />
            <Bar dataKey="ai" name="AI Processed" stackId="a" fill="hsl(173, 58%, 45%)" />
            <Bar dataKey="human" name="Human Processed" stackId="a" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
