import { AreaChart } from "@tremor/react";
import customTooltip from "./Tooltip";

const chartdata = [
  {
    date: "Jan 23",
    BPM: 167,
    pulse: 100,
    sugar: 90,
    oxygen: 100,
    weight: 90,
  },
  {
    date: "Jan 24",
    BPM: 167,
    pulse: 100,
    sugar: 90,
    oxygen: 100,
    weight: 90,
  },
  {
    date: "Jan 25",
    BPM: 152,
    pulse: 95,
    sugar: 50,
    oxygen: 125,
    weight: 45,
  },
  {
    date: "Jan 26",
    BPM: 45,
    pulse: 75,
    sugar: 125,
    oxygen: 10,
    weight: 90,
  },
  {
    date: "Jan 27",
    BPM: 176,
    pulse: 125,
    sugar: 85,
    oxygen: 120,
    weight: 90,
  },
  {
    date: "Jan 28",
    BPM: 167,
    pulse: 90,
    sugar: 100,
    oxygen: 85,
    weight: 89,
  },
];

export default function AreaChartComponent() {
  return (
    <>
      <AreaChart
        className="h-72"
        data={chartdata}
        index="date"
        categories={["BPM"]}
        colors={["green"]}
        yAxisWidth={30}
        customTooltip={customTooltip}
        showGradient={false}
        curveType="natural"
        showAnimation
      />
    </>
  );
}
