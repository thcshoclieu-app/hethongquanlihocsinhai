import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" className="gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Quay lại
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Điều khoản sử dụng</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
            <h3>1. Chấp nhận điều khoản</h3>
            <p>Bằng việc sử dụng ứng dụng Quản lý điểm danh và học phí, bạn đồng ý tuân thủ các điều khoản này.</p>
            <h3>2. Bảo mật dữ liệu</h3>
            <p>Chúng tôi cam kết bảo vệ dữ liệu cá nhân của người dùng, đặc biệt là dữ liệu sinh trắc học (nếu có).</p>
            <h3>3. Quyền và nghĩa vụ</h3>
            <p>Người dùng chịu trách nhiệm về tính chính xác của dữ liệu nhập vào hệ thống.</p>
            {/* Add more terms here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
