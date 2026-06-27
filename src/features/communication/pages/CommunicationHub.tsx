import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Bell, Search, Filter, Send, MessageSquare, Clock, Plus, Activity, Smartphone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import BroadcastDialog from '../components/BroadcastDialog';
import { useNotifications } from '../hooks/useNotifications';

export default function CommunicationHub() {
  const { notifications, isLoading } = useNotifications();
  const [isBroadcastOpen, setBroadcastOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Trung tâm Thông báo</h2>
          <p className="text-slate-500 dark:text-slate-400">Quản lý và gửi thông báo đa kênh tới học sinh và phụ huynh</p>
        </div>
        <div className="flex gap-2">
          <Link to={ROUTES.COMMUNICATION_TEMPLATES}>
            <Button variant="outline">Mẫu thông báo</Button>
          </Link>
          <Link to={ROUTES.COMMUNICATION_CAMPAIGNS}>
            <Button variant="outline">Chiến dịch</Button>
          </Link>
          <Button onClick={() => setBroadcastOpen(true)} className="gap-2">
            <Send size={16} /> Gửi thông báo mới
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Send size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Đã gửi (tháng này)</p>
              <h3 className="text-2xl font-bold">1,245</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <MessageSquare size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Đã đọc</p>
              <h3 className="text-2xl font-bold">982</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Đang chờ (Queue)</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Lỗi gửi</p>
              <h3 className="text-2xl font-bold">3</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center">
            <CardTitle>Lịch sử gửi thông báo</CardTitle>
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2 h-4 w-4 text-slate-500" />
                <Input placeholder="Tìm kiếm..." className="pl-8 h-8 text-sm" />
              </div>
              <Button variant="outline" size="sm" className="h-8 gap-2">
                <Filter size={14} /> Lọc
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Tiêu đề</th>
                <th className="px-4 py-3 font-medium">Kênh</th>
                <th className="px-4 py-3 font-medium">Người nhận</th>
                <th className="px-4 py-3 font-medium">Thời gian</th>
                <th className="px-4 py-3 font-medium">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {isLoading ? (
                <tr><td colSpan={5} className="text-center py-4">Đang tải...</td></tr>
              ) : notifications.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-4">Chưa có thông báo nào</td></tr>
              ) : (
                notifications.map(notif => (
                  <tr key={notif.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{notif.title}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {notif.channel === 'EMAIL' && <Mail size={14} className="text-blue-500" />}
                        {notif.channel === 'SMS' && <Smartphone size={14} className="text-emerald-500" />}
                        {notif.channel === 'IN_APP' && <Bell size={14} className="text-amber-500" />}
                        {notif.channel === 'PUSH' && <Bell size={14} className="text-purple-500" />}
                        {notif.channel === 'ZALO_OA' && <MessageSquare size={14} className="text-blue-600" />}
                        <span>{notif.channel}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{notif.receiverId}</td>
                    <td className="px-4 py-3 text-slate-500">{new Date(notif.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {notif.status === 'DELIVERED' || notif.status === 'SENT' || notif.status === 'READ' ? (
                        <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">Thành công</Badge>
                      ) : notif.status === 'FAILED' ? (
                        <Badge variant="outline" className="text-rose-600 border-rose-200 bg-rose-50">Lỗi</Badge>
                      ) : (
                        <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">Đang gửi</Badge>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
      
      {isBroadcastOpen && (
        <BroadcastDialog open={isBroadcastOpen} onOpenChange={setBroadcastOpen} />
      )}
    </div>
  );
}
