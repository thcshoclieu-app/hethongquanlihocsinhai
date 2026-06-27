import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Printer, Filter, FileText, Star, Plus, Play, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { useAnalytics } from '@/features/analytics/hooks/useAnalytics';
import { ReportService } from '@/services/analytics/ReportService';
import { HeatmapCalendar } from '@/features/analytics/components/HeatmapCalendar';
import { ExportDialog } from '@/features/analytics/components/ExportDialog';
import { SavedReport } from '@/types';
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';

export default function Reports() {
  const { revenueData, attendanceData, isLoading } = useAnalytics();
  const [savedReports, setSavedReports] = useState<SavedReport[]>([]);
  const [isLoadingReports, setIsLoadingReports] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      setIsLoadingReports(true);
      const reports = await ReportService.getSavedReports();
      setSavedReports(reports);
      setIsLoadingReports(false);
    }
    fetchReports();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" className="text-blue-600" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 h-full flex flex-col p-4 md:p-6 max-w-[1600px] mx-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Báo cáo & Thống kê</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Trung tâm phân tích và xuất dữ liệu toàn diện.
            <span className="block text-xs mt-1 text-slate-400">
              Cập nhật lúc: {new Date().toLocaleTimeString('vi-VN')} - Phạm vi: Dữ liệu hiện tại
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Printer size={16} />
            <span className="hidden sm:inline">In báo cáo</span>
          </Button>
          <ExportDialog reportName="BaoCaoTongHop" data={revenueData} columns={['name', 'thu', 'chi']} />
        </div>
      </div>

      <Tabs defaultValue="financial" className="flex-1 flex flex-col min-h-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 shrink-0">
          <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 flex-wrap h-auto">
            <TabsTrigger value="financial">Tài chính</TabsTrigger>
            <TabsTrigger value="academic">Học tập & Điểm danh</TabsTrigger>
            <TabsTrigger value="ai">AI Analytics</TabsTrigger>
            <TabsTrigger value="saved">Báo cáo đã lưu</TabsTrigger>
            <TabsTrigger value="builder">Report Builder</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Select defaultValue="2023">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Năm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">Năm 2023</SelectItem>
                <SelectItem value="2022">Năm 2022</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Kỳ báo cáo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Cả năm</SelectItem>
                <SelectItem value="q1">Quý 1</SelectItem>
                <SelectItem value="q2">Quý 2</SelectItem>
                <SelectItem value="q3">Quý 3</SelectItem>
                <SelectItem value="q4">Quý 4</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
          </div>
        </div>

        <TabsContent value="financial" className="flex-1 m-0 space-y-6 overflow-auto pb-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-md">
              <CardContent className="p-6">
                <p className="text-blue-100 font-medium">Tổng doanh thu</p>
                <h4 className="text-3xl font-bold mt-2">1,450.5M ₫</h4>
                <p className="text-sm text-blue-100 mt-2">+12.5% so với cùng kỳ</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-md">
              <CardContent className="p-6">
                <p className="text-indigo-100 font-medium">Tổng chi phí</p>
                <h4 className="text-3xl font-bold mt-2">420.0M ₫</h4>
                <p className="text-sm text-indigo-100 mt-2">+5.2% so với cùng kỳ</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-md">
              <CardContent className="p-6">
                <p className="text-emerald-100 font-medium">Lợi nhuận ròng</p>
                <h4 className="text-3xl font-bold mt-2">1,030.5M ₫</h4>
                <p className="text-sm text-emerald-100 mt-2">+15.8% so với cùng kỳ</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Biểu đồ Doanh thu & Chi phí (Triệu VNĐ)</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorThuRep" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorChiRep" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend />
                  <Area type="monotone" name="Doanh thu" dataKey="thu" stroke="#3b82f6" fillOpacity={1} fill="url(#colorThuRep)" />
                  <Area type="monotone" name="Chi phí" dataKey="chi" stroke="#f43f5e" fillOpacity={1} fill="url(#colorChiRep)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="flex-1 m-0 space-y-6 overflow-auto pb-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tỷ lệ chuyên cần trung bình (%)</CardTitle>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip 
                      cursor={{fill: 'transparent'}}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend />
                    <Bar name="Có mặt" dataKey="present" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} barSize={40} />
                    <Bar name="Vắng mặt" dataKey="absent" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Xếp hạng lớp theo chuyên cần</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { class: 'Toán 10A1', rate: 98.5, color: 'bg-green-500' },
                    { class: 'Lý 11B', rate: 96.2, color: 'bg-blue-500' },
                    { class: 'Hóa 12C', rate: 95.0, color: 'bg-indigo-500' },
                    { class: 'Toán 10A2', rate: 92.4, color: 'bg-amber-500' },
                    { class: 'IELTS Intensive', rate: 89.5, color: 'bg-orange-500' },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.class}</span>
                        <span className="font-bold">{item.rate}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.rate}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6">
            <HeatmapCalendar />
          </div>
        </TabsContent>
        
        <TabsContent value="ai" className="flex-1 m-0 space-y-6 overflow-auto pb-4">
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0 shadow-md">
              <CardContent className="p-6">
                <p className="text-slate-300 font-medium">Nhận diện thành công</p>
                <h4 className="text-3xl font-bold mt-2">15,420</h4>
                <p className="text-sm text-green-400 mt-2">+2.4% tuần này</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0 shadow-md">
              <CardContent className="p-6">
                <p className="text-slate-300 font-medium">Nhận diện thất bại</p>
                <h4 className="text-3xl font-bold mt-2">142</h4>
                <p className="text-sm text-red-400 mt-2">-1.2% tuần này</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0 shadow-md">
              <CardContent className="p-6">
                <p className="text-slate-300 font-medium">Độ tin cậy TB (Confidence)</p>
                <h4 className="text-3xl font-bold mt-2">94.5%</h4>
                <p className="text-sm text-slate-300 mt-2">Tương đương tháng trước</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0 shadow-md">
              <CardContent className="p-6">
                <p className="text-slate-300 font-medium">Tốc độ TB (Time)</p>
                <h4 className="text-3xl font-bold mt-2">0.4s</h4>
                <p className="text-sm text-green-400 mt-2">Nhanh hơn 0.1s</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="saved" className="flex-1 m-0 overflow-auto pb-4">
          {isLoadingReports ? (
            <div className="flex justify-center p-8"><Spinner /></div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {savedReports.map((report) => (
                <Card key={report.reportId} className="flex flex-col hover:border-blue-500 transition-colors group cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="p-2 rounded bg-blue-50 text-blue-600 dark:bg-blue-900/30">
                        <FileText size={20} />
                      </div>
                      {report.isFavorite && <Star className="text-amber-500 fill-amber-500" size={18} />}
                    </div>
                    <CardTitle className="text-base mt-3">{report.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline" className="bg-slate-50">{report.type}</Badge>
                      {report.isScheduled && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 flex items-center gap-1">
                          <Calendar size={12} /> Tự động
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 gap-2 h-9">
                        <Play size={14} /> Chạy báo cáo
                      </Button>
                      <Button variant="outline" size="icon" className="h-9 w-9">
                        <Download size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="flex flex-col border-dashed hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer justify-center items-center p-6 min-h-[220px]">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <Plus size={24} />
                </div>
                <h4 className="font-medium text-slate-900 dark:text-white">Tạo báo cáo mới</h4>
                <p className="text-sm text-slate-500 text-center mt-1">Sử dụng Report Builder để tùy chỉnh</p>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="builder" className="flex-1 m-0">
          <Card className="h-full min-h-[400px]">
            <CardContent className="h-full flex items-center justify-center">
              <div className="text-center space-y-4 max-w-md mx-auto">
                <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter size={32} />
                </div>
                <h3 className="text-xl font-bold">Report Builder</h3>
                <p className="text-slate-500">Kéo thả các trường dữ liệu và chỉ số để tạo báo cáo động tùy biến theo nhu cầu của bạn.</p>
                <Button className="mt-4 gap-2 bg-blue-600 text-white hover:bg-blue-700">
                  <Plus size={16} /> Bắt đầu tạo mới
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
