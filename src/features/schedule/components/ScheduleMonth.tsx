import React from 'react';
import { ClassSession } from '@/types';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isSameDay } from 'date-fns';
import { vi } from 'date-fns/locale';

interface ScheduleMonthProps {
  date: Date;
  sessions: ClassSession[];
  isLoading: boolean;
  onSessionClick: (session: ClassSession) => void;
}

export function ScheduleMonth({ date, sessions, isLoading, onSessionClick }: ScheduleMonthProps) {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(monthStart);
  
  // Calculate padding days to start from Monday
  const startDate = new Date(monthStart);
  const day = startDate.getDay();
  const diff = startDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is sunday
  startDate.setDate(diff);

  const endDate = new Date(monthEnd);
  const endDay = endDate.getDay();
  if (endDay !== 0) {
    endDate.setDate(endDate.getDate() + (7 - endDay));
  }

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const getSessionsForDay = (day: Date) => {
    return sessions.filter(session => isSameDay(new Date(session.date), day));
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Đang tải lịch...</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shrink-0">
        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(day => (
          <div key={day} className="py-2 text-center text-sm font-medium text-slate-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="flex-1 grid grid-cols-7 grid-rows-5 overflow-hidden">
        {days.map((day, i) => {
          const daySessions = getSessionsForDay(day);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isToday = isSameDay(day, new Date());
          
          return (
            <div 
              key={day.toISOString()} 
              className={`min-h-[100px] border-b border-r border-slate-200 dark:border-slate-800 p-2 flex flex-col gap-1 overflow-hidden transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50 ${
                !isCurrentMonth ? 'bg-slate-50/50 dark:bg-slate-950/50 text-slate-400' : 'bg-white dark:bg-slate-950 text-slate-700'
              }`}
            >
              <div className="flex justify-between items-center mb-1 shrink-0">
                <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${
                  isToday ? 'bg-blue-600 text-white' : ''
                }`}>
                  {format(day, 'd')}
                </span>
                {daySessions.length > 0 && (
                  <span className="text-xs text-slate-400">{daySessions.length} ca</span>
                )}
              </div>
              
              <div className="flex-1 overflow-y-auto pr-1 space-y-1 custom-scrollbar">
                {daySessions.map(session => (
                  <div 
                    key={session.sessionId} 
                    onClick={() => onSessionClick(session)}
                    className={`text-xs px-2 py-1.5 rounded truncate cursor-pointer hover:opacity-80 transition-opacity ${
                      session.status === 'cancelled' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 line-through' :
                      session.status === 'holiday' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}
                  >
                    <span className="font-medium mr-1">{session.startTime}</span>
                    {session.classId}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
