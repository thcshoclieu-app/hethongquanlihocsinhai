import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Attendance } from '@/types';

interface AttendanceStatisticsProps {
  attendances: Attendance[];
}

export function AttendanceStatistics({ attendances }: AttendanceStatisticsProps) {
  const activeAttendances = attendances.filter(a => !a.isDeleted);
  
  // Basic stats for demo. A real app would use recharts and aggregate data.
  const presentCount = activeAttendances.filter(a => a.status === 'present').length;
  const lateCount = activeAttendances.filter(a => a.status === 'late').length;
  const absentCount = activeAttendances.filter(a => a.status === 'absent').length;
  
  const total = activeAttendances.length;
  const presentRate = total > 0 ? Math.round((presentCount / total) * 100) : 0;
  const lateRate = total > 0 ? Math.round((lateCount / total) * 100) : 0;

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-slate-500 mb-2">Tỷ lệ đi học</h3>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">{presentRate}%</span>
            <span className="text-sm text-green-600 mb-1">+2% so với tuần trước</span>
          </div>
          <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: `${presentRate}%` }} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-slate-500 mb-2">Tỷ lệ đi trễ</h3>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">{lateRate}%</span>
            <span className="text-sm text-red-600 mb-1">+1% so với tuần trước</span>
          </div>
          <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500" style={{ width: `${lateRate}%` }} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-slate-500 mb-2">Tổng số buổi vắng</h3>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">{absentCount}</span>
            <span className="text-sm text-slate-500 mb-1">học sinh</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
