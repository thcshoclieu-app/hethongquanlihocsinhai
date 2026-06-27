import { ClassSession } from '@/types';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay } from 'date-fns';
import { SessionRepository } from '@/repositories/SessionRepository';

export class SessionService {
  static async getSessions(date: Date, view: string): Promise<ClassSession[]> {
    let startDate: Date;
    let endDate: Date;

    if (view === 'month') {
      startDate = startOfMonth(date);
      endDate = endOfMonth(date);
    } else if (view === 'week') {
      startDate = startOfWeek(date, { weekStartsOn: 1 });
      endDate = endOfWeek(date, { weekStartsOn: 1 });
    } else {
      startDate = startOfDay(date);
      endDate = endOfDay(date);
    }

    return SessionRepository.getSessionsBetween(startDate, endDate);
  }

  static async generateSessionsForSchedule(scheduleId: string, startDate: Date, endDate: Date): Promise<void> {
    // Call the engine to generate sessions
  }
}
