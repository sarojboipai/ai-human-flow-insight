import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface WorkloadData {
  name: string;
  value: number;
  color: string;
}

interface AIWorkloadChartProps {
  data: WorkloadData[];
  title?: string;
  centerLabel?: string;
  centerValue?: string;
}

export function AIWorkloadChart({
  data,
  title,
  centerLabel,
  centerValue,
}: AIWorkloadChartProps) {
  return (
    <div className="chart-container">
      {title && <h3 className="section-title mb-4">{title}</h3>}
      <div className="relative">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "var(--shadow-md)",
              }}
              formatter={(value: number) => [`${value}%`, ""]}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
        {(centerLabel || centerValue) && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none" style={{ marginTop: "-20px" }}>
            {centerValue && (
              <p className="text-3xl font-semibold">{centerValue}</p>
            )}
            {centerLabel && (
              <p className="text-sm text-muted-foreground">{centerLabel}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
