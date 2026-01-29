import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface FunnelStage {
  name: string;
  value: number;
  conversion?: number;
}

interface FunnelChartProps {
  data: FunnelStage[];
  title?: string;
}

const COLORS = [
  "hsl(173, 58%, 45%)",
  "hsl(180, 55%, 42%)",
  "hsl(187, 52%, 39%)",
  "hsl(194, 49%, 36%)",
  "hsl(199, 46%, 33%)",
  "hsl(204, 43%, 30%)",
  "hsl(209, 40%, 27%)",
];

export function FunnelChart({ data, title }: FunnelChartProps) {
  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      fill: COLORS[index % COLORS.length],
    }));
  }, [data]);

  return (
    <div className="chart-container">
      {title && <h3 className="section-title mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            type="number"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={90}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              boxShadow: "var(--shadow-md)",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
            cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
            formatter={(value: number, name: string, props: any) => [
              `${value.toLocaleString()} candidates`,
              props.payload.conversion
                ? `Conversion: ${props.payload.conversion}%`
                : "",
            ]}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
