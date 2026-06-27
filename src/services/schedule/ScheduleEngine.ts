import { ClassSchedule, ClassSession, Holiday } from '@/types';
import { addDays, addWeeks, addMonths, isBefore, isSameDay, parseISO } from 'date-fns';

export class ScheduleEngine {
  static generateSessions(
    schedule: ClassSchedule,
    startDate: Date,
    endDate: Date,
    holidays: Holiday[]
  ): ClassSession[] {
    const sessions: ClassSession[] = [];
    
    // Custom logic to iterate dates and generate sessions based on repeatRule and daysOfWeek
    let currentDate = startDate;

    while (!isBefore(endDate, currentDate)) {
      const dayOfWeek = currentDate.getDay(); // 0-6, where 0 is Sunday
      
      // Convert dayOfWeek to the format used in daysOfWeek array (0=Sun, 1=Mon, etc.)
      const isScheduledDay = schedule.daysOfWeek.includes(dayOfWeek);

      if (isScheduledDay) {
        // Check for holidays
        const isHoliday = holidays.some(h => {
          const hStart = parseISO(h.startDate);
          const hEnd = parseISO(h.endDate);
          return currentDate >= hStart && currentDate <= hEnd && 
                 (h.appliedTo === 'all' || (h.classIds && h.classIds.includes(schedule.classId)));
        });

        sessions.push({
          sessionId: `generated-${schedule.scheduleId}-${currentDate.toISOString().split('T')[0]}`,
          classId: schedule.classId,
          scheduleId: schedule.scheduleId,
          date: currentDate.toISOString().split('T')[0],
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          roomId: schedule.roomId,
          teacherId: schedule.teacherId,
          assistantId: schedule.assistantId,
          status: isHoliday ? 'holiday' : 'scheduled',
          isGenerated: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }

      // Increment date
      currentDate = addDays(currentDate, 1);
    }

    return sessions;
  }

  static checkConflicts(newSession: ClassSession, existingSessions: ClassSession[]): string[] {
    const conflicts: string[] = [];

    existingSessions.forEach(session => {
      // Check if it's on the same day
      if (session.date === newSession.date && session.status !== 'cancelled' && session.sessionId !== newSession.sessionId) {
        // Check time overlap
        const isOverlap = this.isTimeOverlap(
          newSession.startTime, newSession.endTime,
          session.startTime, session.endTime
        );

        if (isOverlap) {
          // Check teacher conflict
          if (session.teacherId === newSession.teacherId) {
            conflicts.push(`Giáo viên đã có lịch dạy lớp ${session.classId} vào thời gian này.`);
          }
          // Check room conflict
          if (session.roomId === newSession.roomId) {
            conflicts.push(`Phòng ${session.roomId} đã được sử dụng bởi lớp ${session.classId}.`);
          }
        }
      }
    });

    return conflicts;
  }

  private static isTimeOverlap(start1: string, end1: string, start2: string, end2: string): boolean {
    // Simple string comparison works for HH:mm format
    return (start1 < end2 && end1 > start2);
  }
}
