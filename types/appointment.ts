export type AppointmentMode = 'REMOTE' | 'IN_PERSON';

export interface AppointmentType {
  id: string;
  name: string;
  duration: number;
  mode: AppointmentMode;
  price: number;
}

export interface GoogleMeetDetails {
  meetLink: string;
  meetId: string;
  startTime: string;
  endTime: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  type: AppointmentType;
  dateTime: Date;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  mode: AppointmentMode;
  meetDetails?: GoogleMeetDetails;
  location?: string;
}