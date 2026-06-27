import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function AttendanceCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];
  
  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  // Mock data for attendance status on days
  const getDayStatus = (day: number) => {
    // Random status for demo
    if (day > currentDate.getDate() && currentDate.getMonth() === new Date().getMonth()) return 'future';
    if (day % 7 === 0 || day % 7 === 6) return 'weekend';
    if (day % 5 === 0) return 'absent';
    if (day % 3 === 0) return 'late';
    return 'present';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft size={16} />
          </Button>
          <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
            Hôm nay
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
        {daysOfWeek.map(day => (
          <div key={day} className="bg-slate-50 dark:bg-slate-900 py-3 text-center text-sm font-medium text-slate-500">
            {day}
          </div>
        ))}
        
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-white dark:bg-slate-950 min-h-[100px] p-2" />
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const status = getDayStatus(day);
          const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
          
          return (
            <div key={day} className={`bg-white dark:bg-slate-950 min-h-[100px] p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900 border-t border-slate-100 dark:border-slate-800`}>
              <div className="flex justify-between items-start">
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm ${isToday ? 'bg-blue-600 text-white font-bold' : 'text-slate-700 dark:text-slate-300'}`}>
                  {day}
                </span>
              </div>
              
              <div className="mt-2 flex flex-col gap-1">
                {status === 'present' && (
                  <div className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-md truncate">100% Có mặt</div>
                )}
                {status === 'late' && (
                  <>
                    <div className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-md truncate">90% Có mặt</div>
                    <div className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-md truncate">10% Đi trễ</div>
                  </>
                )}
                {status === 'absent' && (
                  <>
                    <div className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-md truncate">80% Có mặt</div>
                    <div className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-md truncate">20% Vắng</div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Có mặt</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span>Đi trễ</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Vắng mặt</span>
        </div>
      </div>
    </div>
  );
}
