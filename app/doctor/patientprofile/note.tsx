import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const PatientNotes = () => {
  return (
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle className="text-2xl">Notes</CardTitle>
        <CardDescription>Add Notes reagarding this patient</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Enter points you want to remember..."
          rows={13}
        ></Textarea>
        <Button variant="secondary" className="mt-4">
          Save Note
        </Button>
      </CardContent>
    </Card>
  );
};

export default PatientNotes;
