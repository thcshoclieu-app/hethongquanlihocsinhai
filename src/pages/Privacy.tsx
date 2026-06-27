import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" className="gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Quay lại
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Chính sách bảo mật & Dữ liệu sinh trắc học</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
            <h3>1. Thu thập dữ liệu</h3>
            <p>Chúng tôi chỉ thu thập thông tin cần thiết phục vụ cho việc quản lý học sinh và điểm danh.</p>
            <h3>2. Dữ liệu khuôn mặt (Sinh trắc học)</h3>
            <p>Dữ liệu đặc trưng khuôn mặt (face embeddings) được mã hóa và lưu trữ an toàn. Không lưu trữ ảnh gốc. Hệ thống có cơ chế tự động xóa theo yêu cầu hoặc khi học sinh nghỉ học.</p>
            <h3>3. Chia sẻ dữ liệu</h3>
            <p>Chúng tôi KHÔNG chia sẻ dữ liệu với bên thứ ba cho mục đích quảng cáo.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
