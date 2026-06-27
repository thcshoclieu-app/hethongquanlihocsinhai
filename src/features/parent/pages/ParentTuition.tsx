import React from 'react';
import { useChildren } from '../hooks/useParentHooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Download, Wallet, CreditCard, History } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ParentTuition() {
  const { selectedChild, isLoading } = useChildren();

  if (isLoading) return <div className="p-6">Đang tải dữ liệu...</div>;
  if (!selectedChild) return null;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Học phí & Hóa đơn</h2>
          <p className="text-slate-500 dark:text-slate-400">Xem hóa đơn và lịch sử thanh toán của {selectedChild.fullName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-rose-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 opacity-80 mb-2">
              <Wallet size={20} />
              <span className="font-medium">Chưa thanh toán</span>
            </div>
            <div className="text-3xl font-bold">1.500.000₫</div>
            <p className="mt-2 text-sm opacity-90">1 hóa đơn đến hạn (15/07/2026)</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 opacity-80 mb-2">
              <CreditCard size={20} />
              <span className="font-medium">Đã thanh toán (Năm nay)</span>
            </div>
            <div className="text-3xl font-bold">12.500.000₫</div>
            <p className="mt-2 text-sm opacity-90">6 hóa đơn đã hoàn tất</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col justify-center h-full">
            <Button className="w-full gap-2 mb-2"><CreditCard size={16}/> Thanh toán trực tuyến</Button>
            <p className="text-xs text-center text-slate-500">Hỗ trợ VNPay, Momo, Chuyển khoản</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hóa đơn gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-slate-200 dark:border-slate-800">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Mã HĐ</th>
                  <th className="px-4 py-3 font-medium">Kỳ thu</th>
                  <th className="px-4 py-3 font-medium text-right">Tổng tiền</th>
                  <th className="px-4 py-3 font-medium">Trạng thái</th>
                  <th className="px-4 py-3 font-medium text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="px-4 py-3 font-medium">INV-2026-07</td>
                  <td className="px-4 py-3">Tháng 07/2026</td>
                  <td className="px-4 py-3 text-right font-medium">1.500.000₫</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-rose-600 border-rose-200 bg-rose-50">Chưa thanh toán</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" className="text-blue-600"><Download size={14} className="mr-1"/> PDF</Button>
                  </td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="px-4 py-3 font-medium">INV-2026-06</td>
                  <td className="px-4 py-3">Tháng 06/2026</td>
                  <td className="px-4 py-3 text-right font-medium">2.000.000₫</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">Đã thanh toán</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" className="text-blue-600"><Download size={14} className="mr-1"/> PDF</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><History size={20}/> Lịch sử thanh toán</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border border-slate-100 rounded-lg">
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">Thanh toán học phí Tháng 6</p>
                <p className="text-sm text-slate-500 mt-1">15/06/2026 • Chuyển khoản ngân hàng</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-emerald-600">+2.000.000₫</p>
                <Button variant="link" size="sm" className="px-0 h-auto text-xs"><Download size={12} className="mr-1"/> Biên lai</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
