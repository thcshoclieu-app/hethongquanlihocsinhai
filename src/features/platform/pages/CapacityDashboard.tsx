import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Server, TrendingUp, Users, Activity } from 'lucide-react';
import { usePlatform } from '../hooks/usePlatform';

export default function CapacityDashboard() {
  const { capacity, isLoading } = usePlatform();

  if (isLoading) return <div className="p-6">Đang tải...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="text-blue-500" /> Capacity Planning
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Dự báo tài nguyên và tăng trưởng 3 tháng tới</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Server className="text-slate-500"/> Storage Growth</CardTitle>
            <CardDescription>Dự báo dung lượng lưu trữ (GB)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-end border-b pb-4 border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-sm text-slate-500">Hiện tại</p>
                <p className="text-2xl font-bold">{capacity?.storage?.current || 500} <span className="text-sm font-normal text-slate-500">GB</span></p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Dự báo 3 tháng</p>
                <p className="text-2xl font-bold text-amber-600">{capacity?.storage?.projected3Months || 650} <span className="text-sm font-normal text-amber-600/70">GB</span></p>
              </div>
            </div>
            <p className="text-sm text-slate-600">Khuyến nghị: Cần chuẩn bị mở rộng storage node trong 45 ngày tới.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity className="text-emerald-500"/> API Throughput</CardTitle>
            <CardDescription>Dự báo lưu lượng API (Req/tháng)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-end border-b pb-4 border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-sm text-slate-500">Hiện tại</p>
                <p className="text-2xl font-bold">1.2<span className="text-sm font-normal text-slate-500">M</span></p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Dự báo 3 tháng</p>
                <p className="text-2xl font-bold text-emerald-600">2.0<span className="text-sm font-normal text-emerald-600/70">M</span></p>
              </div>
            </div>
            <p className="text-sm text-slate-600">Khuyến nghị: Tự động scale out API Gateway instances lên 4.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="text-purple-500"/> User Base</CardTitle>
            <CardDescription>Dự báo lượng người dùng Active</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-end border-b pb-4 border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-sm text-slate-500">Hiện tại</p>
                <p className="text-2xl font-bold">15,000</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Dự báo 3 tháng</p>
                <p className="text-2xl font-bold text-blue-600">18,500</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">Hạ tầng hiện tại vẫn đáp ứng tốt mức tăng trưởng này.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
