import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Lock, Bell } from 'lucide-react';
import { useAuthStore } from '@/store';

export default function ParentSettings() {
  const { user } = useAuthStore();

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Cài đặt tài khoản</h2>
        <p className="text-slate-500 dark:text-slate-400">Quản lý thông tin cá nhân và tùy chọn hệ thống.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User size={20} /> Thông tin cá nhân</CardTitle>
            <CardDescription>Cập nhật số điện thoại và email nhận thông báo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Họ và tên</label>
                <Input defaultValue="Nguyễn Văn Phụ Huynh" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Số điện thoại</label>
                <Input defaultValue="0987654321" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue={user?.email || ''} disabled />
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Lưu thay đổi</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell size={20} /> Tùy chọn thông báo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-slate-900 dark:text-slate-100">Thông báo điểm danh</h4>
                <p className="text-sm text-slate-500">Nhận thông báo khi học sinh đến lớp</p>
              </div>
              <input type="checkbox" className="w-4 h-4" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-slate-900 dark:text-slate-100">Nhắc nhở học phí</h4>
                <p className="text-sm text-slate-500">Nhận thông báo nhắc nhở khi sắp đến hạn đóng học phí</p>
              </div>
              <input type="checkbox" className="w-4 h-4" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lock size={20} /> Bảo mật</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Mật khẩu mới</label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Xác nhận mật khẩu mới</label>
              <Input type="password" />
            </div>
            <div className="flex justify-start">
              <Button variant="outline">Đổi mật khẩu</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
