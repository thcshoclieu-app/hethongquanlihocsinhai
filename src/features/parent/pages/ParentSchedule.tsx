import React from 'react';
import { useChildren } from '../hooks/useParentHooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ParentSchedule() {
  const { selectedChild, isLoading } = useChildren();

  if (isLoading) return <div className="p-6">Đang tải dữ liệu...</div>;
  if (!selectedChild) return null;

  const scheduleDays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Lịch học cố định</h2>
          <p className="text-slate-500 dark:text-slate-400">Thời khóa biểu hàng tuần của {selectedChild.fullName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scheduleDays.map((day, idx) => (
          <Card key={day} className="bg-slate-50 dark:bg-slate-900/50">
            <CardHeader className="py-4 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-base text-slate-700 dark:text-slate-200">{day}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {idx === 0 || idx === 2 ? (
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                  <Badge variant="outline" className="mb-2 text-blue-600 bg-blue-50 border-blue-200">Toán Nâng cao</Badge>
                  <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-2"><Clock size={14}/> 08:00 - 09:30</span>
                    <span className="flex items-center gap-2"><MapPin size={14}/> Phòng 201</span>
                    <span className="flex items-center gap-2 text-slate-500">GV: Cô Quỳnh Anh</span>
                  </div>
                </div>
              ) : null}

              {idx === 1 || idx === 4 ? (
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                  <Badge variant="outline" className="mb-2 text-purple-600 bg-purple-50 border-purple-200">IELTS Foundation</Badge>
                  <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-2"><Clock size={14}/> 14:00 - 15:30</span>
                    <span className="flex items-center gap-2"><MapPin size={14}/> Phòng 304</span>
                    <span className="flex items-center gap-2 text-slate-500">GV: Thầy John Doe</span>
                  </div>
                </div>
              ) : null}

              {idx !== 0 && idx !== 1 && idx !== 2 && idx !== 4 && (
                <div className="text-center text-slate-400 text-sm py-6 italic">
                  Không có lịch học
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
