import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Settings, Save } from 'lucide-react';

export default function AiConfigurationPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Settings className="text-slate-500" /> Cấu hình AI & Engine
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Điều chỉnh ngưỡng cảnh báo, trọng số và mô hình phân tích</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          <Save size={16} /> {isSaving ? 'Đang lưu...' : 'Lưu cấu hình'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ngưỡng cảnh báo (Thresholds)</CardTitle>
            <CardDescription>Xác định khi nào hệ thống sinh ra cảnh báo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tỷ lệ chuyên cần tối thiểu (%)</label>
              <Input type="number" defaultValue={85} />
              <p className="text-xs text-slate-500">Cảnh báo nếu chuyên cần dưới mức này.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Số ngày nợ học phí cảnh báo</label>
              <Input type="number" defaultValue={5} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Điểm rủi ro cao (High Risk Score)</label>
              <Input type="number" defaultValue={70} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trọng số tính điểm rủi ro</CardTitle>
            <CardDescription>Ảnh hưởng của từng yếu tố lên tổng điểm</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Chuyên cần (%)</label>
              <Input type="number" defaultValue={40} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Thanh toán học phí (%)</label>
              <Input type="number" defaultValue={40} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tương tác/Học tập (%)</label>
              <Input type="number" defaultValue={20} />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Mô hình & Chu kỳ</CardTitle>
            <CardDescription>Cấu hình cách Engine chạy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Chu kỳ phân tích nền</label>
                <select className="w-full h-9 rounded-md border border-slate-200 px-3 py-1 text-sm bg-transparent">
                  <option value="HOURLY">Mỗi giờ</option>
                  <option value="DAILY" selected>Hàng ngày (Nửa đêm)</option>
                  <option value="WEEKLY">Hàng tuần</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Thuật toán / Mô hình</label>
                <select className="w-full h-9 rounded-md border border-slate-200 px-3 py-1 text-sm bg-transparent">
                  <option value="RULE_BASED">Rule-based (Quy tắc)</option>
                  <option value="ML_BASIC">Basic ML Model v1</option>
                  <option value="ML_ADVANCED">Advanced Prediction Model (Gemini Pro)</option>
                </select>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4 text-sm text-blue-800 dark:text-blue-300">
              <p className="font-semibold mb-1">Lưu ý về Explainable AI:</p>
              <p>Mọi kết quả từ Engine đều được lưu trữ lý do (reasoning) và điểm tin cậy (confidence score) để phục vụ kiểm toán độc lập với Business Logic.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
