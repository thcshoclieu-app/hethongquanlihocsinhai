import React, { useState } from 'react';
import { useChildren } from '../hooks/useParentHooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, Calendar as CalendarIcon, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';

export default function ParentAttendance() {
  const { selectedChild, isLoading } = useChildren();
  const [date, setDate] = useState<Date | undefined>(new Date());

  if (isLoading) return <div className="p-6">Đang tải dữ liệu...</div>;
  if (!selectedChild) return null;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Lịch sử điểm danh</h2>
          <p className="text-slate-500 dark:text-slate-400">Theo dõi chuyên cần của {selectedChild.fullName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lịch điểm danh</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Có mặt</span>
                <span className="font-semibold text-slate-900">18</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Đi muộn</span>
                <span className="font-semibold text-slate-900">2</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Có phép</span>
                <span className="font-semibold text-slate-900">1</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> Vắng mặt</span>
                <span className="font-semibold text-slate-900">0</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chi tiết điểm danh tháng 6</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: '26/06/2026', class: 'Toán Nâng cao', status: 'PRESENT', time: '08:15', method: 'AI' },
                  { date: '24/06/2026', class: 'IELTS Foundation', status: 'PRESENT', time: '14:02', method: 'Manual' },
                  { date: '22/06/2026', class: 'Toán Nâng cao', status: 'LATE', time: '08:35', method: 'AI' },
                  { date: '19/06/2026', class: 'IELTS Foundation', status: 'EXCUSED', time: '--:--', method: '-' },
                ].map((log, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-800 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700">
                        <span className="text-xs text-slate-500">T{new Date(log.date.split('/').reverse().join('-')).getDay() + 1}</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">{log.date.split('/')[0]}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-slate-100">{log.class}</h4>
                        <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                          <Clock size={14}/> {log.time} • Điểm danh bằng: {log.method}
                        </p>
                      </div>
                    </div>
                    <div>
                      {log.status === 'PRESENT' && <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Có mặt</Badge>}
                      {log.status === 'LATE' && <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">Đi muộn</Badge>}
                      {log.status === 'EXCUSED' && <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Có phép</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
