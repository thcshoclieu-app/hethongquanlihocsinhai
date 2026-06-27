import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Unlock, ShieldAlert } from 'lucide-react';
import { usePlatform } from '../hooks/usePlatform';

export default function MaintenancePanel() {
  const { maintenance, isLoading } = usePlatform();
  const [isMaintenance, setIsMaintenance] = useState(maintenance?.enabled || false);

  const toggleMaintenance = () => {
    setIsMaintenance(!isMaintenance);
  };

  if (isLoading) return <div className="p-6">Đang tải...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShieldAlert className="text-rose-500" /> Maintenance & Disaster Recovery
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Kiểm soát trạng thái bảo trì và quy trình khôi phục sự cố</p>
        </div>
      </div>

      <Card className={`border-2 ${isMaintenance ? 'border-rose-500' : 'border-emerald-500'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isMaintenance ? <Lock className="text-rose-500" /> : <Unlock className="text-emerald-500" />}
            Hệ thống đang {isMaintenance ? 'BẢO TRÌ' : 'HOẠT ĐỘNG'}
          </CardTitle>
          <CardDescription>
            Khi bật chế độ bảo trì, toàn bộ API Gateway sẽ trả về 503 cho client, ngoại trừ Platform Admin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg mb-6">
            <p className="font-mono text-sm text-slate-700 dark:text-slate-300">
              {isMaintenance 
                ? 'Thông báo hiển thị: Hệ thống đang bảo trì để nâng cấp cơ sở dữ liệu. Dự kiến hoàn thành trong 60 phút.' 
                : 'Hệ thống đang phục vụ bình thường.'}
            </p>
          </div>
          
          <Button 
            variant={isMaintenance ? 'default' : 'destructive'} 
            onClick={toggleMaintenance}
            className="w-full sm:w-auto"
          >
            {isMaintenance ? 'Tắt chế độ bảo trì' : 'Kích hoạt Bảo trì Toàn hệ thống'}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Backup Verification</CardTitle>
            <CardDescription>Kiểm tra tính toàn vẹn của bản sao lưu gần nhất</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Last Backup</span>
              <span className="font-medium">Hôm nay, 02:00 AM</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Status</span>
              <span className="text-emerald-600 font-medium">Verified OK</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Size</span>
              <span className="font-medium">425 GB</span>
            </div>
            <Button variant="outline" className="w-full mt-4">Chạy kiểm tra thủ công</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disaster Recovery</CardTitle>
            <CardDescription>Quy trình khôi phục sự cố nghiêm trọng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Cảnh báo: Khôi phục từ bản sao lưu sẽ ghi đè lên dữ liệu hiện tại. Hành động này chỉ nên thực hiện bởi Super Admin.
            </p>
            <Button variant="outline" className="w-full text-rose-500 border-rose-200 hover:bg-rose-50">Initiate Restore Protocol</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
