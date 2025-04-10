import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { Appointment, GoogleMeetDetails } from '@/types/appointment';

export class GoogleCalendarService {
  private oauth2Client: OAuth2Client;
  private calendar: any;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    this.calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
  }

  async createMeeting(appointment: Appointment): Promise<GoogleMeetDetails> {
    const event = {
      summary: `Medical Consultation with ${appointment.patientId}`,
      description: `Appointment Type: ${appointment.type.name}`,
      start: {
        dateTime: appointment.dateTime,
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: new Date(appointment.dateTime.getTime() + appointment.type.duration * 60000),
        timeZone: 'Asia/Kolkata',
      },
      conferenceData: {
        createRequest: {
          requestId: appointment.id,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    };

    const response = await this.calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
    });

    return {
      meetLink: response.data.hangoutLink,
      meetId: response.data.conferenceData.conferenceId,
      startTime: response.data.start.dateTime,
      endTime: response.data.end.dateTime,
    };
  }
}