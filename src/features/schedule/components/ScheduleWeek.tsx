import React from 'react';
import { ClassSession } from '@/types';
import { startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay } from 'date-fns';
import { vi } from 'date-fns/locale';

interface ScheduleWeekProps {
  date: Date;
  sessions: ClassSession[];
  isLoading: boolean;
  onSessionClick: (session: ClassSession) => void;
}

export function ScheduleWeek({ date, sessions, isLoading, onSessionClick }: ScheduleWeekProps) {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  const hours = Array.from({ length: 15 }, (_, i) => i + 7); // 7:00 to 21:00

  const getSessionsForDay = (day: Date) => {
    return sessions.filter(session => isSameDay(new Date(session.date), day));
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Đang tải lịch...</div>;
  }

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <div className="grid grid-cols-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shrink-0 sticky top-0 z-10">
        <div className="py-3 px-2 text-center text-xs font-medium text-slate-500 border-r border-slate-200 dark:border-slate-800">
          Giờ
        </div>
        {days.map(day => {
          const isToday = isSameDay(day, new Date());
          return (
            <div key={day.toISOString()} className={`py-2 px-1 text-center border-r border-slate-200 dark:border-slate-800 ${isToday ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
              <div className="text-xs font-medium text-slate-500">{format(day, 'EEEE', { locale: vi })}</div>
              <div className={`text-lg font-semibold mt-0.5 ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-slate-100'}`}>
                {format(day, 'dd/MM')}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex-1 overflow-auto relative">
        <div className="grid grid-cols-8 min-h-max relative" style={{ height: `${hours.length * 60}px` }}>
          {/* Time axis */}
          <div className="border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
            {hours.map(hour => (
              <div key={hour} className="h-[60px] border-b border-slate-200 dark:border-slate-800 text-right pr-2 py-1">
                <span className="text-xs text-slate-500 font-medium">{hour}:00</span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((day, dayIndex) => {
            const daySessions = getSessionsForDay(day);
            const isToday = isSameDay(day, new Date());
            
            return (
              <div key={day.toISOString()} className={`border-r border-slate-200 dark:border-slate-800 relative ${isToday ? 'bg-blue-50/20 dark:bg-blue-900/5' : ''}`}>
                {/* Horizontal grid lines */}
                {hours.map(hour => (
                  <div key={hour} className="h-[60px] border-b border-slate-100 dark:border-slate-800/50"></div>
                ))}
                
                {/* Sessions */}
                {daySessions.map(session => {
                  const startHour = parseInt(session.startTime.split(':')[0], 10);
                  const startMinute = parseInt(session.startTime.split(':')[1], 10);
                  const endHour = parseInt(session.endTime.split(':')[0], 10);
                  const endMinute = parseInt(session.endTime.split(':')[1], 10);
                  
                  const startOffset = Math.max(0, (startHour - 7) * 60 + startMinute);
                  const duration = (endHour - startHour) * 60 + (endMinute - startMinute);
                  
                  if (startHour < 7 || startHour > 21) return null; // Outside visible range for this demo
                  
                  return (
                    <div 
                      key={session.sessionId}
                      onClick={() => onSessionClick(session)}
                      className={`absolute left-1 right-1 rounded-md p-1.5 overflow-hidden text-xs cursor-pointer shadow-sm border ${
                        session.status === 'cancelled' ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-900/30' :
                        session.status === 'holiday' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-900/30' :
                        'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-900/30'
                      }`}
                      style={{
                        top: `${startOffset}px`,
                        height: `${duration}px`,
                        zIndex: 10
                      }}
                    >
                      <div className="font-semibold truncate">{session.classId}</div>
                      <div className="text-[10px] opacity-80 mt-0.5">{session.startTime} - {session.endTime}</div>
                      <div className="text-[10px] opacity-80 truncate">{session.roomId}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
