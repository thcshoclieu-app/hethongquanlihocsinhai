import { Student, Classroom } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Mail, MapPin, Calendar, Clock, Activity, AlertCircle } from 'lucide-react';

interface StudentOverviewProps {
  studentData: Student;
  studentClass?: Classroom;
}

export default function StudentOverview({ studentData, studentClass }: StudentOverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Điểm danh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">98%</div>
              <p className="text-xs text-slate-500 mt-1">Chuyên cần tháng này</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Học phí</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">Đã thu</div>
              <p className="text-xs text-slate-500 mt-1">Tháng {new Date().getMonth() + 1}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Ngày nhập học</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{studentData.enrollDate ? new Date(studentData.enrollDate).toLocaleDateString('vi-VN') : 'N/A'}</div>
              <p className="text-xs text-slate-500 mt-1">Thời gian học: 2 năm</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Cảnh báo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-400">0</div>
              <p className="text-xs text-slate-500 mt-1">Không có cảnh báo</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Biểu đồ chuyên cần (Demo)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400">
              [Biểu đồ sẽ được tích hợp ở các phase sau]
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Phone size={18} /> Liên hệ nhanh</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-slate-500">Phụ huynh</p>
              <p className="font-medium">{studentData.parentName} <span className="text-slate-400 font-normal">({studentData.parentRelation})</span></p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Điện thoại</p>
                <p className="font-medium">{studentData.phoneParent}</p>
              </div>
            </div>
            {studentData.emailParent && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-medium text-sm break-all">{studentData.emailParent}</p>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 shrink-0 mt-1">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Địa chỉ</p>
                <p className="font-medium text-sm">{studentData.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {studentData.healthNotes && (
          <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/10 dark:border-amber-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-800 dark:text-amber-500 flex items-center gap-2">
                <AlertCircle size={18} /> Lưu ý sức khỏe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-amber-900 dark:text-amber-400">{studentData.healthNotes}</p>
              {studentData.allergies && (
                <p className="text-sm text-amber-900 dark:text-amber-400 mt-2"><strong>Dị ứng:</strong> {studentData.allergies}</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
