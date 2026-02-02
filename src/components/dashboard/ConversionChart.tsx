import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DataPoint {
  date: string;
  aiMatches: number;
  humanMatches: number;
  hitlOverrides?: number;
  placements: number;
}

interface ConversionChartProps {
  data: DataPoint[];
  title?: string;
  showHitlOverrides?: boolean;
}

export function ConversionChart({ data, title, showHitlOverrides = false }: ConversionChartProps) {
  return (
    <div className="chart-container">
      {title && <h3 className="section-title mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(173, 58%, 45%)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(173, 58%, 45%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorHuman" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorHITL" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPlacements" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(280, 65%, 60%)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(280, 65%, 60%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              boxShadow: "var(--shadow-md)",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="circle"
            iconSize={8}
          />
          <Area
            type="monotone"
            dataKey="aiMatches"
            name="AI Matches"
            stroke="hsl(173, 58%, 45%)"
            fillOpacity={1}
            fill="url(#colorAI)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="humanMatches"
            name="Human Matches"
            stroke="hsl(38, 92%, 50%)"
            fillOpacity={1}
            fill="url(#colorHuman)"
            strokeWidth={2}
          />
          {showHitlOverrides && (
            <Area
              type="monotone"
              dataKey="hitlOverrides"
              name="HITL Overrides"
              stroke="hsl(199, 89%, 48%)"
              fillOpacity={1}
              fill="url(#colorHITL)"
              strokeWidth={2}
            />
          )}
          <Area
            type="monotone"
            dataKey="placements"
            name="Final Placements"
            stroke="hsl(280, 65%, 60%)"
            fillOpacity={1}
            fill="url(#colorPlacements)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
