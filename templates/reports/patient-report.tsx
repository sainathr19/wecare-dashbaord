import { Report } from "@/types/report";
import { Pencil2Icon } from "@radix-ui/react-icons";
import React from "react";
interface PatientBio {
  address: {
    city: string;
    zipCode: string;
  };
  _id: string;
  patientId: string;
  name: string;
  gender: string;
  age: number;
  bloodGroup: string;
  birthDate: string;
}

type PatientReportProps = {
  report: Report;
  patientBio: PatientBio;
}

const PatientReportTemplate = ({ report, patientBio }: PatientReportProps) => {
  const TableHeads = ["Biometric", "Measurement", "Average", "Status"];
  return (
    <div className="border-slate-500 p-5 w-[40vh] border-2 rounded-xl h-full">
      <header className="flex flex-row justify-between my-3">
        <div className="flex items-center">
          <Pencil2Icon height={50} width={50} className="mx-3" />
          <div className="ml-4">
            <p className="text-2xl">Patient Report</p>
            <p className="text-lg text-muted-foreground">{report.reportId}</p>
          </div>
        </div>
      </header>
      <hr />
      <div className="flex flex-row justify-between my-4">
        <div>
          <p className="uppercase text-xs text-gray-600">Doctor</p>
          <p>Dr. {report.doctorId}</p>
          <p className="uppercase text-xs text-gray-600 mt-5">Patient</p>
          <p>{patientBio.name}</p>
          <p>{patientBio.age} years, {patientBio.gender}</p>
          <p>{patientBio.bloodGroup}</p>
        </div>
        <div className="flex flex-col justify-center text-right">
          <div className="mb-2">
            <p className="uppercase text-xs text-gray-600">Checkup Date</p>
            <p>{new Date(report.timestamp).toLocaleDateString()}</p>
          </div>
          <div className="mb-2">
            <p className="uppercase text-xs text-gray-600">Checkup Time</p>
            <p>{new Date(report.timestamp).toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
      <hr />
      <table className="w-full divide-y divide-gray-300">
        <thead>
          <tr>
            {TableHeads.map((head) => (
              <th key={head} className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
              Heart Rate
            </td>
            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
              {report.heartRate} BPM
            </td>
            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
              72 BPM
            </td>
            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 text-left">
              {report.status}
            </td>
          </tr>
          <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
              Temperature
            </td>
            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
              {report.temperature}°F
            </td>
            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
              98.6°F
            </td>
            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 text-left">
              {report.status}
            </td>
          </tr>
          <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
              Blood Oxygen
            </td>
            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
              {report.bloodOxygen}%
            </td>
            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
              98%
            </td>
            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 text-left">
              {report.status}
            </td>
          </tr>
        </tbody>
      </table>
      <footer className="flex flex-row justify-between mt-6">
        <div>
          <p className="uppercase text-xs text-gray-600">Additional Note</p>
          <p>Remote Checkup</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600 mb-2">Overall Condition</p>
          <p className="text-4xl font-bold text-gray-800">
            {report.status}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PatientReportTemplate;
