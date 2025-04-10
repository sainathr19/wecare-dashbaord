import { Pencil2Icon } from "@radix-ui/react-icons";
import React from "react";
import { Report } from "@/types/report";
type PatientReportProps = {
  report: Report;
}
const PatientReportTemplate = ( {report } : PatientReportProps) => {
  // const report = {
  //   reportId: "PR1001",
  //   hospitalAssociated: {
  //     name: "WeCare Hospitals",
  //     addressLine1: "Road no.6 , Nandyal Road",
  //     addressLine2: "Kurnool, 518001",
  //   },
  //   doctorName: "Sainath Reddy",
  //   patientName: "NandaKishore Talari",
  //   patientInfo: "19 Male",
  //   checkupTime: "9:56am",
  //   checkupDate: "23 May 2023",
  //   biometrics: [
  //     {
  //       name: "Heart Rate",
  //       measurement: "72",
  //       average: "75",
  //       status: "Normal",
  //     },
  //     {
  //       name: "Temperature",
  //       measurement: "98.6",
  //       average: "98.4",
  //       status: "Normal",
  //     },
  //     {
  //       name: "SpO2",
  //       measurement: "98",
  //       average: "97",
  //       status: "Normal",
  //     },
  //   ],
  //   note: "-",
  //   overallCondition: "Normal",
  // };
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
          <p>{report.doctorName}</p>
          <p className="uppercase text-xs text-gray-600 mt-5">Patient</p>
          <p>{report.patientName}</p>
          <p>{report.patientInfo}</p>
        </div>
        <div className="flex flex-col justify-center text-right">
          <div className="mb-2">
            <p className="uppercase text-xs text-gray-600">Checkup Date</p>
            <p>{report.checkupDate}</p>
          </div>
          <div className="mb-2">
            <p className="uppercase text-xs text-gray-600">Checkup Time</p>
            <p>{report.checkupTime}</p>
          </div>
        </div>
      </div>
      <hr />
      <table className="w-full divide-y divide-gray-300">
        <thead>
          <tr>
            {TableHeads.map((head) => {
              return (
                <th
                  key={head}
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                >
                  {head}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {report.biometrics.map((metric) => (
            <tr key={metric.name}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                {metric.name}
              </td>
              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                {metric.measurement}
              </td>
              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                {metric.average}
              </td>
              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 text-left">
                {metric.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className="flex flex-row justify-between mt-6">
        <div>
          <p className="uppercase text-xs text-gray-600">Additonal Note</p>
          <p>{report.note}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600 mb-2">Overall Condition</p>
          <p className="text-4xl font-bold text-gray-800">
            {report.overallCondition}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PatientReportTemplate;
