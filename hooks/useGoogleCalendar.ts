import { useState } from 'react';
import { GoogleCalendarService } from '@/lib/google-calendar';
import { Appointment } from '@/types/appointment';

export const useGoogleCalendar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const calendarService = new GoogleCalendarService();

  const scheduleAppointment = async (appointment: Appointment) => {
    try {
      setIsLoading(true);
      const meetDetails = await calendarService.createMeeting(appointment);
      return meetDetails;
    } catch (error) {
      console.error('Failed to schedule meeting:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { scheduleAppointment, isLoading };
};