export interface Report {
    _id: string;
    reportId: string;
    timestamp: string;
    source: string;
    status: string;
    patientId: string;
    doctorId: string;
    type: string;
    isViewed: boolean;
    temperature: string;
    heartRate: string;
    createdAt: string;
    updatedAt: string;
    bloodOxygen: string;
  }