"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";

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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Patients = () => {
  const [filters, setFilters] = useState<string[]>(["All", "Critical"]);
  const [patientList, setPatientList] = useState([
    {
      id: "PT1001",
      name: "Sainath",
      gender: "Male",
      age: "20",
      lastcheckup: "20 May 2023",
      status: "Normal",
      membership: "Active",
    },
    {
      id: "PT1002",
      name: "Oliver James",
      gender: "Male",
      age: "45",
      lastcheckup: "20 June 2024",
      status: "Normal",
      membership: "Expired",
    },
    {
      id: "PT1003",
      name: "William Smith",
      gender: "Female",
      age: "18",
      lastcheckup: "1 Dec 2023",
      status: "Abnormal",
      membership: "Active",
    },
    {
      id: "PT1004",
      name: "Allison Osman",
      gender: "Female",
      age: "25",
      lastcheckup: "26 Jan 2023",
      status: "Normal",
      membership: "Active",
    },
    {
      id: "PT1005",
      name: "Jennifer Lorez",
      gender: "Female",
      age: "45",
      lastcheckup: "26 Jan 2024",
      status: "Normal",
      membership: "Expired",
    },
    {
      id: "PT1006",
      name: "Anushka sharma",
      gender: "Female",
      age: "32",
      lastcheckup: "02 Mar 2023",
      status: "Normal",
      membership: "Active",
    },
    {
      id: "PT1007",
      name: "Virat Kohli",
      gender: "Male",
      age: "38",
      lastcheckup: "26 Oct 2022",
      status: "Normal",
      membership: "Expired",
    },
    {
      id: "PT1008",
      name: "Varun simha",
      gender: "Male",
      age: "85",
      lastcheckup: "15 Dec 2023",
      status: "Normal",
      membership: "Expired",
    },
    {
      id: "PT1009",
      name: "Osama Bin laden",
      gender: "Male",
      age: "60",
      lastcheckup: "04 Dec 2023",
      status: "Normal",
      membership: "Expired",
    },
    {
      id: "PT1010",
      name: "Bharath Chandra",
      gender: "Male",
      age: "20",
      lastcheckup: "26 Jan 2023",
      status: "Normal",
      membership: "Active",
    },
    {
      id: "PT1011",
      name: "Allison Peroz",
      gender: "Female",
      age: "45",
      lastcheckup: "26 Jan 2023",
      status: "Normal",
      membership: "Expired",
    },
    {
      id: "PT1012",
      name: "Allison Jacobs",
      gender: "Male",
      age: "25",
      lastcheckup: "26 Jan 2023",
      status: "Normal",
      membership: "Expired",
    },
    {
      id: "PT1013",
      name: "Oracle Osman",
      gender: "Female",
      age: "45",
      lastcheckup: "26 Jan 2021",
      status: "Abnormal",
      membership: "Active",
    },
    {
      id: "PT1014",
      name: "Sai Kumar",
      gender: "Male",
      age: "15",
      lastcheckup: "15 Dec 2023",
      status: "Abnormal",
      membership: "Active",
    },

    {
      id: "PT1015",
      name: "Bhagya Lakshmi",
      gender: "Female",
      age: "48",
      lastcheckup: "26 Jan 2023",
      status: "Normal",
      membership: "Active",
    },
  ]);
  const [filteredList, setFilteredList] = useState(patientList);
  const handleSearchFilterChange = async (e: any) => {
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
  const handlechange = async (e: any) => {
    console.log(e);
  };

  return (
    <div className="p-5">
      <Card>
        <CardHeader className="flex flex-row justify-around gap-4  px-10">
          <section className="w-[25%]">
            <CardTitle className="text-xl">Patients List</CardTitle>
            <CardDescription>Patients associated to you</CardDescription>
          </section>
          <Input
            placeholder="Search for patient"
            onChange={handleSearchFilterChange}
          />
          <section className="w-[20%] flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Conditon</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <RadioGroup defaultValue="option-one">
                  <div className="flex items-center space-x-2 px-2 py-1">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">All</Label>
                  </div>
                  <div className="flex items-center space-x-2 px-2 py-1">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">Critical</Label>
                  </div>
                </RadioGroup>
                <DropdownMenuLabel>Membership</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <RadioGroup defaultValue="option-one">
                  <div className="flex items-center space-x-2 px-2 py-1">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">Active</Label>
                  </div>
                  <div className="flex items-center space-x-2 px-2 py-1">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">Expired</Label>
                  </div>
                </RadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </section>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Patient ID</TableHead>

                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Gender</TableHead>
                <TableHead className="text-center">Age</TableHead>
                <TableHead className="text-center">Last Checkup</TableHead>

                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Note</TableHead>
                <TableHead className="text-center">Membership</TableHead>

                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredList.length > 0 &&
                filteredList.map((patient, index) => {
                  return (
                    <TableRow key={index}>
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
                            patient.status === "Abnormal"
                              ? "warning"
                              : "success"
                          }
                        >
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">--- </TableCell>
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
                          <Link href={"/doctor/patientprofile"}>Profile</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          {filteredList.length === 0 && (
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
