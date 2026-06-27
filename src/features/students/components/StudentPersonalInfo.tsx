import { Student } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StudentPersonalInfoProps {
  studentData: Student;
}

export default function StudentPersonalInfo({ studentData }: StudentPersonalInfoProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Thông tin cơ bản</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
            <div>
              <p className="text-sm text-slate-500 mb-1">Họ và tên</p>
              <p className="font-medium">{studentData.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Tên thường gọi (Nickname)</p>
              <p className="font-medium">{studentData.nickname || 'Không có'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Giới tính</p>
              <p className="font-medium">
                {studentData.gender === 'male' ? 'Nam' : studentData.gender === 'female' ? 'Nữ' : 'Khác'}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Ngày sinh</p>
              <p className="font-medium">{studentData.birthday ? new Date(studentData.birthday).toLocaleDateString('vi-VN') : 'Không có'}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-slate-500 mb-1">Địa chỉ thường trú</p>
              <p className="font-medium">{studentData.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin phụ huynh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Họ tên phụ huynh</p>
                  <p className="font-medium">{studentData.parentName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Quan hệ</p>
                  <p className="font-medium">{studentData.parentRelation}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Số điện thoại</p>
                  <p className="font-medium">{studentData.phoneParent}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Email</p>
                  <p className="font-medium">{studentData.emailParent || 'Không có'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chỉ số & Sức khỏe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Chiều cao</p>
                <p className="font-medium">{studentData.height ? `${studentData.height} cm` : 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Cân nặng</p>
                <p className="font-medium">{studentData.weight ? `${studentData.weight} kg` : 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Nhóm máu</p>
                <p className="font-medium">{studentData.bloodType || 'N/A'}</p>
              </div>
            </div>
            <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Tiền sử dị ứng</p>
                <p className="font-medium">{studentData.allergies || 'Không có'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Lưu ý y tế khác</p>
                <p className="font-medium">{studentData.healthNotes || 'Không có'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Đặc điểm & Tính cách</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-slate-500 mb-2">Sở thích</p>
              <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md min-h-20 text-sm">
                {studentData.hobbies || 'Chưa cập nhật'}
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-2">Điểm mạnh</p>
              <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-md min-h-20 text-sm text-green-800 dark:text-green-400">
                {studentData.strengths || 'Chưa cập nhật'}
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-2">Điểm cần hỗ trợ</p>
              <div className="bg-amber-50 dark:bg-amber-900/10 p-3 rounded-md min-h-20 text-sm text-amber-800 dark:text-amber-400">
                {studentData.weaknesses || 'Chưa cập nhật'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
