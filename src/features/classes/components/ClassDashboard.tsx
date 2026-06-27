import { Classroom } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, CalendarDays, Wallet, Clock, Activity, CheckCircle2 } from 'lucide-react';

interface ClassDashboardProps {
  classData: Classroom;
}

export default function ClassDashboard({ classData }: ClassDashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Sĩ số</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classData.studentCount} / {classData.maxCapacity}</div>
              <p className="text-xs text-slate-500 mt-1">Học sinh</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Thời gian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">30</div>
              <p className="text-xs text-slate-500 mt-1">Buổi đã học</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Chuyên cần</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">95%</div>
              <p className="text-xs text-slate-500 mt-1">Tháng này</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Học phí</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(classData.tuitionFee)}</div>
              <p className="text-xs text-slate-500 mt-1">/{classData.tuitionType}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Thông báo lớp học</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-blue-500 mt-1"><Activity size={18} /></div>
                <div>
                  <h4 className="font-medium text-sm text-blue-900 dark:text-blue-100">Lớp sắp khai giảng</h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Vào ngày {classData.startDate ? new Date(classData.startDate).toLocaleDateString('vi-VN') : 'chưa xác định'}</p>
                </div>
              </div>
              <div className="text-sm text-slate-500 text-center py-4">Chưa có thông báo nào khác</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Nhân sự</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-3">Giáo viên chính</p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-blue-100 text-blue-700">{classData.teacherId?.charAt(0) || 'T'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{classData.teacherId || 'Chưa gán'}</p>
                </div>
              </div>
            </div>
            {classData.assistantId && (
              <div>
                <p className="text-sm font-medium text-slate-500 mb-3">Trợ giảng</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-green-100 text-green-700">{classData.assistantId?.charAt(0) || 'A'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{classData.assistantId}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lịch học tuần này</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
               <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                 <CalendarDays size={18} />
               </div>
               <div>
                 <p className="font-medium text-sm">{classData.schedule}</p>
                 <p className="text-xs text-slate-500 mt-0.5">Phòng: {classData.room}</p>
               </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
