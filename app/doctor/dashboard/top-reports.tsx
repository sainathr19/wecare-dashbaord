import { Badge } from "@/components/Badge/Badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { TableHeader } from "@/components/ui/table";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { useUserId } from "@/hooks/useUserId";
import axiosInstance from "@/lib/axios";

interface Patient {
  _id: string;
  patientId: string;
  name: string;
  bloodGroup: string;
  lastCheckup: string;
  membership: string;
}

const TopReports = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId, loading } = useUserId();

  useEffect(() => {
    const fetchPatients = async () => {
      if (!userId) return;
      try {
        const { data: res } = await axiosInstance.get(
          `/doctor/patients?doctorId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );
        if (res.error) {
          throw new Error(res.error);
        }
        setPatients(res.data.patients);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      fetchPatients();
    }
  }, [userId, loading]);

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="text-lg">Recent Patients</CardTitle>
          <CardDescription>Your recent patient reports</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/doctor/patients">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Blood Group</TableHead>
              <TableHead className="text-center">Last Checkup</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : patients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">No patients found</TableCell>
              </TableRow>
            ) : (
              patients.map((patient) => (
                <TableRow key={patient.patientId}>
                  <TableCell className="font-semibold pl-0">
                    {patient.name}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="neutral">
                      {patient.bloodGroup}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {new Date(patient.lastCheckup).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button 
                      variant="outline" 
                      className="font-normal"
                      asChild
                    >
                      <Link href={`/doctor/patients/${patient.patientId}`}>
                        View Profile
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopReports;
