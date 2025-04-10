import { AreaChart } from "@tremor/react";
import customTooltip from "./Tooltip";

interface ChartData {
  date: string;
  value: number;
}

interface AreaChartProps {
  data: ChartData[];
  category: string;
  color?: string;
}

export default function AreaChartComponent({ data, category, color = "grey" }: AreaChartProps) {
  const transformedData = data.map(item => ({
    date: item.date,
    [category]: item.value
  }));

  return (
    <AreaChart
      className="h-72"
      data={transformedData}
      index="date"
      categories={[category]}
      colors={[color]}
      yAxisWidth={30}
      customTooltip={customTooltip}
      showGradient={false}
      curveType="natural"
      showAnimation
    />
  );
}
