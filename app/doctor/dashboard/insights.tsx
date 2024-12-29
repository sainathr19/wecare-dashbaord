import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart } from "@tremor/react";
import React from "react";

const Insights = () => {
  const chartdata = [
    {
      name: "23 Mar",
      "In-person visits": 90,
      "Remote checkups": 38,
      "Missed checkups": 8,
    },
    {
      name: "24 Mar",
      "In-person visits": 20,
      "Remote checkups": 28,
      "Missed checkups": 3,
    },
    {
      name: "25 Mar",
      "In-person visits": 10,
      "Remote checkups": 38,
      "Missed checkups": 38,
    },
    {
      name: "26 Mar",
      "In-person visits": 80,
      "Remote checkups": 18,
      "Missed checkups": 58,
    },
  ];
  const dataFormatter = (number: number) =>
    Intl.NumberFormat("us").format(number).toString();
  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="text-lg">Insights</CardTitle>
          <CardDescription>Information about patient checkups</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <BarChart
          className="mt-6"
          data={chartdata}
          index="name"
          categories={[
            "In-person visits",
            "Remote checkups",
            "Missed checkups",
          ]}
          colors={["blue", "yellow", "red"]}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
        ></BarChart>
      </CardContent>
    </Card>
  );
};

export default Insights;
