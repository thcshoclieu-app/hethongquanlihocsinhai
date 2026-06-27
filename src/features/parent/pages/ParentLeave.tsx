import React, { useState } from 'react';
import { useChildren } from '../hooks/useParentHooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Clock, Plus, Send } from 'lucide-react';

export default function ParentLeave() {
  const { selectedChild, isLoading } = useChildren();
  const [showForm, setShowForm] = useState(false);

  if (isLoading) return <div className="p-6">Đang tải dữ liệu...</div>;
  if (!selectedChild) return null;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Đơn xin nghỉ học</h2>
          <p className="text-slate-500 dark:text-slate-400">Gửi và theo dõi trạng thái đơn xin phép</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          {showForm ? 'Hủy' : <><Plus size={16}/> Tạo đơn mới</>}
        </Button>
      </div>

      {showForm && (
        <Card className="border-blue-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">Tạo đơn xin nghỉ</CardTitle>
            <CardDescription>Điền thông tin để xin phép cho {selectedChild.fullName}</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowForm(false); }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Lớp học</label>
                  <select className="w-full flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300">
                    <option>Toán Nâng cao</option>
                    <option>IELTS Foundation</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ngày nghỉ</label>
                  <Input type="date" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Lý do nghỉ</label>
                <Textarea placeholder="Nhập lý do xin nghỉ..." required rows={3} />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" type="button" onClick={() => setShowForm(false)}>Hủy</Button>
                <Button type="submit" className="gap-2"><Send size={16}/> Gửi đơn</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Lịch sử đơn từ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900/50">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Toán Nâng cao</h4>
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">Chờ duyệt</Badge>
                  </div>
                  <p className="text-sm text-slate-500 mt-1 flex items-center gap-1"><Clock size={14}/> Nghỉ ngày: 28/06/2026</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-2"><strong>Lý do:</strong> Cháu bị ốm sốt cần đi khám bác sĩ.</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900/50">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">IELTS Foundation</h4>
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Đã duyệt</Badge>
                  </div>
                  <p className="text-sm text-slate-500 mt-1 flex items-center gap-1"><Clock size={14}/> Nghỉ ngày: 10/05/2026</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-2"><strong>Lý do:</strong> Gia đình có việc bận về quê.</p>
                  <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded border border-emerald-100 dark:border-emerald-900/50">
                    <p className="text-xs text-slate-500 mb-1">Giáo viên phản hồi:</p>
                    <p className="text-sm italic">Đã ghi nhận. Em nhớ ôn bài tập trên hệ thống nhé.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
