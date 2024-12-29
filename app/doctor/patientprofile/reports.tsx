import ReportsTable from "@/components/Reports/ReportsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const PatientReports = () => {
  return (
    <Card className="w-2/3">
      <CardHeader>
        <CardTitle className="text-2xl">Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <ReportsTable />
      </CardContent>
    </Card>
  );
};

export default PatientReports;
