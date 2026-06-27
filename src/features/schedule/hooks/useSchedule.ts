import { useState, useEffect } from 'react';
import { ClassSession } from '@/types';
import { SessionService } from '@/services/schedule/SessionService';
import { addDays, format, startOfWeek } from 'date-fns';

export function useSchedule(date: Date, view: string) {
  const [sessions, setSessions] = useState<ClassSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      // Temporary mock fetch, will integrate with real service later
      // Generate some dummy data based on the current date
      const mockSessions: ClassSession[] = [];
      const start = startOfWeek(date, { weekStartsOn: 1 });
      
      for (let i = 0; i < 28; i++) {
        const current = addDays(start, i);
        const dayStr = format(current, 'yyyy-MM-dd');
        
        // Add 2 sessions on Mon, Wed, Fri
        if (current.getDay() === 1 || current.getDay() === 3 || current.getDay() === 5) {
          mockSessions.push({
            sessionId: `mock-1-${i}`,
            classId: 'IELTS-A',
            scheduleId: 'sch-1',
            date: dayStr,
            startTime: '18:00',
            endTime: '19:30',
            roomId: 'Room-101',
            teacherId: 'teacher-1',
            status: 'scheduled',
            isGenerated: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
          
          mockSessions.push({
            sessionId: `mock-2-${i}`,
            classId: 'TOEIC-B',
            scheduleId: 'sch-2',
            date: dayStr,
            startTime: '19:30',
            endTime: '21:00',
            roomId: 'Room-102',
            teacherId: 'teacher-2',
            status: current.getDay() === 3 && i > 10 ? 'cancelled' : 'scheduled',
            isGenerated: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        }
      }
      
      setSessions(mockSessions);
    } catch (error) {
      console.error("Failed to fetch sessions", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [date, view]);

  return { sessions, isLoading, refetch: fetchSessions };
}
