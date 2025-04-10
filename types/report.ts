export interface Report {
  reportId: string;
  hospitalAssociated: {
    name: string;
    addressLine1: string;
    addressLine2: string;
  };
  doctorName: string;
  patientName: string;
  patientInfo: string;
  checkupTime: string;
  checkupDate: string;
  biometrics: Array<{
    name: string;
    measurement: string;
    average: string;
    status: string;
  }>;
  note: string;
  overallCondition: string;
}