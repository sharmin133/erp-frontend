import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";

interface CategoryData {
  category: string;
  count: number;
}

interface Props {
  data: CategoryData[];
}

const COLORS = [
  "#059669",
  "#0EA5E9",
  "#F59E0B",
  "#8B5CF6",
  "#EF4444",
  "#6B7280",
];

export function CategoryDistributionChart({ data }: Props) {
  if (!data.length) {
    return (
      <div className="flex h-65 items-center justify-center text-sm text-gray-400">
        No categories available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label={({ name, percent }: PieLabelRenderProps) =>
            `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
          }
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip
          formatter={(value) => [`${value ?? 0} Products`, "Count"]}
        />

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}