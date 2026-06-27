import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, BookOpen, UserCheck, UserX, DollarSign, Wallet, Calendar as CalendarIcon, Clock, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAnalytics } from '@/features/analytics/hooks/useAnalytics';
import { KpiCard } from '@/features/analytics/components/KpiCard';
import { Spinner } from '@/components/ui/spinner';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Dashboard() {
  const { kpi, revenueData, attendanceData, demographicData, isLoading } = useAnalytics();

  if (isLoading || !kpi) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" className="text-blue-600" />
      </div>
    );
  }

  const SUMMARY_CARDS = [
    { title: 'Tổng học sinh', value: kpi.totalStudents.toLocaleString(), icon: Users, colorClass: 'text-blue-600', bgClass: 'bg-blue-100', trend: '12%', trendUp: true },
    { title: 'Tổng lớp học', value: kpi.totalClasses.toString(), icon: BookOpen, colorClass: 'text-indigo-600', bgClass: 'bg-indigo-100', trend: '2', trendUp: true },
    { title: 'Tỷ lệ chuyên cần', value: `${kpi.attendanceRate}%`, icon: UserCheck, colorClass: 'text-green-600', bgClass: 'bg-green-100', trend: '2%', trendUp: true },
    { title: 'Vắng hôm nay', value: kpi.absentToday.toString(), icon: UserX, colorClass: 'text-red-600', bgClass: 'bg-red-100', trend: '5%', trendUp: false },
    { title: 'Doanh thu (Tháng)', value: `${(kpi.revenueMonth / 1000000).toFixed(1)}M đ`, icon: DollarSign, colorClass: 'text-amber-600', bgClass: 'bg-amber-100', trend: '15%', trendUp: true },
    { title: 'Học phí chưa thu', value: `${(kpi.debtTotal / 1000000).toFixed(1)}M đ`, icon: Wallet, colorClass: 'text-orange-600', bgClass: 'bg-orange-100', trend: '2%', trendUp: false },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Tổng quan</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Chào mừng bạn quay lại, đây là tình hình trung tâm hiện tại. 
            <span className="block text-xs mt-1 text-slate-400">
              <Clock size={10} className="inline mr-1" /> Cập nhật lúc: {new Date().toLocaleTimeString('vi-VN')}
            </span>
          </p>
        </div>
        <Button className="hidden sm:flex items-center gap-2">
          <CalendarIcon size={16} />
          <span>Hôm nay: {new Date().toLocaleDateString('vi-VN')}</span>
        </Button>
      </motion.div>
      
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="show"
        className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      >
        {SUMMARY_CARDS.map((card, i) => (
          <KpiCard
            key={i}
            title={card.title}
            value={card.value}
            icon={card.icon}
            trend={card.trend}
            trendUp={card.trendUp}
            colorClass={card.colorClass}
            bgClass={card.bgClass}
          />
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-7"
      >
        <Card className="col-span-1 lg:col-span-4 flex flex-col">
          <CardHeader>
            <CardTitle>Biểu đồ chuyên cần</CardTitle>
            <CardDescription>Số lượng học sinh có mặt và vắng mặt theo kỳ</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
                />
                <Legend iconType="circle" />
                <Area type="monotone" name="Có mặt (%)" dataKey="present" stroke="#10b981" fillOpacity={1} fill="url(#colorPresent)" />
                <Area type="monotone" name="Vắng mặt (%)" dataKey="absent" stroke="#ef4444" fillOpacity={1} fill="url(#colorAbsent)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle>Doanh thu học phí (Triệu đ)</CardTitle>
            <CardDescription>Thống kê thu/chi theo tháng</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" />
                <Bar name="Thu" dataKey="thu" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar name="Chi" dataKey="chi" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.4 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Lớp học sắp diễn ra</CardTitle>
              <CardDescription>Lịch học hôm nay</CardDescription>
            </div>
            <Button variant="ghost" size="icon"><MoreVertical size={16} /></Button>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4">
              {[
                { time: '08:00 - 09:30', name: 'Toán 10A1', room: 'Phòng 102', status: 'Đang diễn ra', statusColor: 'bg-green-500' },
                { time: '09:45 - 11:15', name: 'Lý 11B', room: 'Phòng 204', status: 'Sắp bắt đầu', statusColor: 'bg-amber-500' },
                { time: '14:00 - 15:30', name: 'Hóa 12C', room: 'Phòng 301', status: 'Chiều nay', statusColor: 'bg-blue-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex flex-col items-center justify-center w-16 text-center">
                    <span className="text-xs font-medium text-slate-500">{item.time.split(' - ')[0]}</span>
                    <span className="text-xs text-slate-400">{item.time.split(' - ')[1]}</span>
                  </div>
                  <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold leading-none">{item.name}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock size={12} /> {item.room}
                    </p>
                  </div>
                  <Badge variant="outline" className={`border-none text-white ${item.statusColor}`}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="link" className="w-full mt-4 text-sm">Xem tất cả lịch học</Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Phân bổ học sinh</CardTitle>
            <CardDescription>Theo cấp học</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={demographicData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {demographicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {demographicData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs text-slate-600 dark:text-slate-400">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Thông báo mới</CardTitle>
            <CardDescription>Cập nhật hệ thống & hoạt động</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-6">
              {[
                { title: 'Học sinh Nguyễn Văn A vắng mặt', desc: 'Lớp Toán 10A1 - Đã gửi SMS cho phụ huynh', time: '10 phút trước', color: 'bg-red-500' },
                { title: 'Đóng học phí thành công', desc: 'Lê Thị B - Lớp Lý 11B (500.000đ)', time: '1 giờ trước', color: 'bg-green-500' },
                { title: 'Cập nhật hệ thống', desc: 'Phiên bản 1.0.0 đã được triển khai', time: 'Hôm qua', color: 'bg-blue-500' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== 2 && <div className="absolute left-1 top-4 bottom-[-24px] w-px bg-slate-200 dark:bg-slate-800" />}
                  <div className={`w-2 h-2 mt-1.5 rounded-full z-10 shrink-0 ${item.color}`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
