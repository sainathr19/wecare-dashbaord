"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/Badge/Badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axios";

interface Patient {
  id: string;
  name: string;
  gender: string;
  age: string;
  lastcheckup: string;
  status: string;
  membership: string;
}

interface PatientsResponse {
  status: string;
  data: {
    patients: Patient[];
    total: number;
  };
}

const Patients = () => {
  const [patientList, setPatientList] = useState<Patient[]>([]);
  const [filteredList, setFilteredList] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data } = await axiosInstance.get<PatientsResponse>('/doctor/patients?doctorId=DOC101');
        if (data.status === "Ok") {
          setPatientList(data.data.patients);
          setFilteredList(data.data.patients);
        }
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filter = e.target.value;
    if (filter === "") {
      setFilteredList(patientList);
    } else {
      setFilteredList(
        patientList.filter((patient) =>
          patient.name.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="p-5">
      <Card>
        <CardHeader className="flex flex-row justify-around gap-4 px-10">
          <section className="w-[25%]">
            <CardTitle className="text-xl">Patients List</CardTitle>
            <CardDescription>
              {isLoading 
                ? "Loading patients..." 
                : `Total Patients: ${patientList.length}`
              }
            </CardDescription>
          </section>
          <Input
            placeholder="Search for patient"
            onChange={handleSearchFilterChange}
          />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center py-4">Loading patients...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Patient ID</TableHead>

                  <TableHead className="text-center">Name</TableHead>
                  <TableHead className="text-center">Gender</TableHead>
                  <TableHead className="text-center">Age</TableHead>
                  <TableHead className="text-center">Last Checkup</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Membership</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredList.length > 0 &&
                  filteredList.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className=" pl-0 text-center">
                        {patient.id}
                      </TableCell>
                      <TableCell className=" font-semibold text-center">
                        {patient.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {patient.gender}
                      </TableCell>
                      <TableCell className="text-center">
                        {patient.age}
                      </TableCell>
                      <TableCell className="text-center">
                        {patient.lastcheckup}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            patient.status === "Critical" 
                              ? "error" 
                              : patient.status === "Abnormal"
                                ? "warning"
                                : "success"
                          }
                        >
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            patient.membership === "Expired"
                              ? "error"
                              : "success"
                          }
                        >
                          {patient.membership}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="outline" className="font-normal">
                          <Link href={`/doctor/patients/${patient.id}`}>Profile</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
          {!isLoading && filteredList.length === 0 && (
            <p className="text-center w-full mt-5 text-lg text-muted-foreground">
              No results matching the filter
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Patients;
