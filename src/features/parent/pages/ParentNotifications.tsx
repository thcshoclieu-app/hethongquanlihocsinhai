import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, CalendarCheck, FileText, AlertCircle, Calendar } from 'lucide-react';
import { useChildren } from '../hooks/useParentHooks';

export default function ParentNotifications() {
  const { selectedChild, isLoading } = useChildren();

  if (isLoading) return <div className="p-6">Đang tải dữ liệu...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Thông báo</h2>
          <p className="text-slate-500 dark:text-slate-400">Cập nhật tin tức từ trung tâm và giáo viên</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            <div className="p-4 flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors bg-blue-50/50 dark:bg-blue-900/10">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <FileText size={20} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">Thông báo học phí tháng 7</h4>
                  <span className="text-xs text-blue-600 font-medium">Mới</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Trung tâm xin thông báo học phí tháng 7 của em {selectedChild?.fullName || ''} là 1.500.000₫.</p>
                <p className="text-xs text-slate-500 mt-2">2 giờ trước</p>
              </div>
            </div>

            <div className="p-4 flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CalendarCheck size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-900 dark:text-slate-100">Điểm danh thành công</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{selectedChild?.fullName || ''} đã có mặt tại lớp Toán Nâng cao lúc 08:15.</p>
                <p className="text-xs text-slate-500 mt-2">Hôm nay, 08:16</p>
              </div>
            </div>

            <div className="p-4 flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Calendar size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-900 dark:text-slate-100">Đơn xin nghỉ đã được duyệt</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Đơn xin nghỉ phép ngày 10/05/2026 của {selectedChild?.fullName || ''} đã được giáo viên duyệt.</p>
                <p className="text-xs text-slate-500 mt-2">10/05/2026, 09:30</p>
              </div>
            </div>

            <div className="p-4 flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <AlertCircle size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-900 dark:text-slate-100">Nghỉ lễ 30/4 - 1/5</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Trung tâm sẽ nghỉ lễ từ ngày 30/4 đến hết 2/5. Các lớp sẽ học bù theo lịch giáo viên thông báo riêng.</p>
                <p className="text-xs text-slate-500 mt-2">25/04/2026, 14:00</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
