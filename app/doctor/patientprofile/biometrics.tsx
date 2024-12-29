import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AreaChartComponent from "@/components/AreaChart/AreaChart";
import DataTable from "@/components/AreaChart/DataTable";

const Biometrics = () => {
  const metricList: string[] = [
    "Blood Presure",
    "Pulse",
    "Blood Sugar",
    "Blood Oxygen",
    "Weight",
  ];
  return (
    <Tabs defaultValue="bp" className="">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Biometrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <TabsList className="gap-5">
              <TabsTrigger value="bp">BP</TabsTrigger>
              <TabsTrigger value="pulse">PULSE</TabsTrigger>
              <TabsTrigger value="sugar">Blood Sugar</TabsTrigger>
              <TabsTrigger value="oxygen">Blood Oxygen</TabsTrigger>
              <TabsTrigger value="weight">Weight</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="bp" className="flex flex-col gap-5">
            <AreaChartComponent />
            <div className="p-3">
              <DataTable />
            </div>
          </TabsContent>
          <TabsContent value="pulse" className="flex flex-col gap-5">
            <AreaChartComponent />
            <div className="p-3">
              <DataTable />
            </div>
          </TabsContent>
          <TabsContent value="sugar" className="flex flex-col gap-5">
            <AreaChartComponent />
            <div className="p-3">
              <DataTable />
            </div>
          </TabsContent>
          <TabsContent value="oxygen" className="flex flex-col gap-5">
            <AreaChartComponent />
            <div className="p-3">
              <DataTable />
            </div>
          </TabsContent>
          <TabsContent value="weight" className="flex flex-col gap-5">
            <AreaChartComponent />
            <div className="p-3">
              <DataTable />
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
};

export default Biometrics;
