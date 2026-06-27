import React from 'react';
import { useChildren } from '../hooks/useParentHooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarCheck, AlertTriangle, BookOpen, Clock, FileText, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function ParentDashboard() {
  const { selectedChild, isLoading } = useChildren();

  if (isLoading) {
    return <div className="p-6">Đang tải dữ liệu...</div>;
  }

  if (!selectedChild) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
        <AlertTriangle className="h-12 w-12 text-slate-400 mb-4" />
        <h2 className="text-xl font-semibold text-slate-800">Chưa có thông tin học sinh</h2>
        <p className="text-slate-500 mt-2">Tài khoản của bạn chưa được liên kết với học sinh nào.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Student Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white overflow-hidden relative">
        <div className="absolute right-0 top-0 opacity-10">
          <BookOpen size={200} className="-mr-10 -mt-10" />
        </div>
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-white/20">
              <AvatarImage src={selectedChild.avatar} />
              <AvatarFallback className="text-blue-900 text-2xl bg-white">{selectedChild.fullName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl font-bold">{selectedChild.fullName}</h2>
              <div className="mt-2 space-y-1 text-blue-100">
                <p>Lớp: <span className="font-semibold text-white">Math Advanced G9</span></p>
                <p>Giáo viên CN: <span className="font-semibold text-white">Nguyễn Quỳnh Anh</span></p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-emerald-500/20 text-emerald-100 border-emerald-500/50 hover:bg-emerald-500/30">
                    Trạng thái hôm nay: Đã điểm danh (08:15)
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Quick Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Chuyên cần tháng</CardTitle>
            <CalendarCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">95%</div>
            <p className="text-xs text-slate-500 mt-1">19/20 buổi học</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Học phí cần đóng</CardTitle>
            <FileText className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">1.500.000₫</div>
            <p className="text-xs text-slate-500 mt-1">Hạn chót: 15/07/2026</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Bài tập chưa nộp</CardTitle>
            <BookOpen className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">2</div>
            <p className="text-xs text-slate-500 mt-1">Toán (1), Tiếng Anh (1)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Thông báo mới</CardTitle>
            <Bell className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">3</div>
            <p className="text-xs text-slate-500 mt-1">Từ giáo viên & trung tâm</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Clock size={20} /> Lịch học hôm nay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 p-3 border border-slate-100 rounded-lg bg-slate-50 dark:bg-slate-900 dark:border-slate-800">
                <div className="w-16 flex flex-col items-center justify-center border-r border-slate-200 dark:border-slate-700 pr-4">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">08:00</span>
                  <span className="text-xs text-slate-500">09:30</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100">Toán Nâng cao</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Phòng 201 • Cô Quỳnh Anh</p>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">Đã học</Badge>
                </div>
              </div>

              <div className="flex gap-4 p-3 border border-blue-100 rounded-lg bg-blue-50 dark:bg-blue-900/20 dark:border-blue-900/50">
                <div className="w-16 flex flex-col items-center justify-center border-r border-blue-200 dark:border-blue-800 pr-4">
                  <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">14:00</span>
                  <span className="text-xs text-blue-600 dark:text-blue-400">15:30</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100">IELTS Foundation</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Phòng 304 • Thầy John Doe</p>
                </div>
                <div className="flex items-center">
                  <Badge className="bg-blue-600 text-white hover:bg-blue-700">Sắp diễn ra</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell size={20} /> Thông báo gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <FileText size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Thông báo học phí tháng 7</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Trung tâm xin thông báo học phí tháng 7 của em {selectedChild.fullName} là 1.500.000₫.</p>
                  <p className="text-xs text-slate-500 mt-1">2 giờ trước</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <CalendarCheck size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Điểm danh thành công</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{selectedChild.fullName} đã có mặt tại lớp Toán Nâng cao lúc 08:15.</p>
                  <p className="text-xs text-slate-500 mt-1">Hôm nay</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
