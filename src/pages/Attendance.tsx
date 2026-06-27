import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Filter, Download, UserCheck, UserX, UserMinus, Camera, UserPlus, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AttendanceCamera } from '@/features/attendance/components/AttendanceCamera';
import { useAttendance } from '@/features/attendance/hooks/useAttendance';
import { AttendanceTable } from '@/features/attendance/components/AttendanceTable';
import { AttendanceStatistics } from '@/features/attendance/components/AttendanceStatistics';
import { AttendanceCalendar } from '@/features/attendance/components/AttendanceCalendar';
import { useAttendanceExport } from '@/features/attendance/hooks/useAttendanceExport';
import { ManualAttendanceModal } from '@/features/attendance/components/ManualAttendanceModal';

export default function Attendance() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('10a1');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeTab, setActiveTab] = useState('today');
  const [showDeleted, setShowDeleted] = useState(false);
  
  const { attendances, isLoading, refetch } = useAttendance(selectedClass, selectedDate);
  const { exportToCSV } = useAttendanceExport();

  const activeAttendances = attendances.filter(a => !a.isDeleted);
  const presentCount = activeAttendances.filter(a => a.status === 'present').length;
  const lateCount = activeAttendances.filter(a => a.status === 'late').length;
  const absentCount = activeAttendances.filter(a => a.status === 'absent').length;

  return (
    <>
      <AnimatePresence>
        {isCameraOpen && (
          <AttendanceCamera 
            classId={selectedClass} 
            onClose={() => {
              setIsCameraOpen(false);
              refetch();
            }} 
          />
        )}
      </AnimatePresence>
      <ManualAttendanceModal 
        isOpen={isManualModalOpen} 
        onClose={() => setIsManualModalOpen(false)} 
        onSuccess={refetch}
        classId={selectedClass}
      />
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 h-full flex flex-col"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Điểm danh</h2>
            <p className="text-slate-500 dark:text-slate-400">Quản lý điểm danh tự động AI và điểm danh thủ công.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2" onClick={() => exportToCSV(activeAttendances, selectedClass)}>
              <Download size={16} />
              <span className="hidden sm:inline">Xuất Báo cáo</span>
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => setIsManualModalOpen(true)}
              className="gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 border-none"
            >
              <UserPlus size={16} />
              <span className="hidden sm:inline">Điểm danh tay</span>
            </Button>
            <Button 
              className="gap-2 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20 border-none"
              onClick={() => setIsCameraOpen(true)}
            >
              <Camera size={16} />
              <span>Camera AI</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <UserCheck size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Đã điểm danh</p>
                <h4 className="text-2xl font-bold">{activeAttendances.length}</h4>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <UserCheck size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Có mặt</p>
                <h4 className="text-2xl font-bold text-green-600">{presentCount}</h4>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <UserX size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Vắng mặt</p>
                <h4 className="text-2xl font-bold text-red-600">{absentCount}</h4>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                <UserMinus size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Đi trễ</p>
                <h4 className="text-2xl font-bold text-amber-600">{lateCount}</h4>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="flex-1 flex flex-col min-h-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
            <CardHeader className="pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <TabsList>
                  <TabsTrigger value="today">Hôm nay</TabsTrigger>
                  <TabsTrigger value="history">Lịch sử</TabsTrigger>
                  <TabsTrigger value="stats">Thống kê</TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="gap-2" onClick={() => refetch()}>
                    <CalendarIcon size={16} />
                    <span>{new Date(selectedDate).toLocaleDateString('vi-VN')}</span>
                  </Button>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Chọn lớp" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10a1">Toán 10A1</SelectItem>
                      <SelectItem value="10a2">Toán 10A2</SelectItem>
                      <SelectItem value="11b">Lý 11B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {(activeTab === 'today' || activeTab === 'history') && (
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 max-w-sm">
                    <SearchInput placeholder="Tìm kiếm học sinh..." />
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="present">Có mặt</SelectItem>
                        <SelectItem value="absent">Vắng mặt</SelectItem>
                        <SelectItem value="late">Đi trễ</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant={showDeleted ? "secondary" : "outline"} 
                      size="icon" 
                      title="Hiển thị bản ghi đã hủy"
                      onClick={() => setShowDeleted(!showDeleted)}
                    >
                      {showDeleted ? <Eye size={16} /> : <EyeOff size={16} />}
                    </Button>
                    <Button variant="outline" size="icon" title="Bộ lọc nâng cao">
                      <Filter size={16} />
                    </Button>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-auto">
              <TabsContent value="today" className="m-0 h-full">
                <AttendanceTable attendances={attendances} isLoading={isLoading} onRefresh={refetch} showDeleted={showDeleted} />
              </TabsContent>
              <TabsContent value="history" className="m-0 h-full">
                <AttendanceCalendar />
              </TabsContent>
              <TabsContent value="stats" className="m-0 h-full">
                <AttendanceStatistics attendances={activeAttendances} />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </motion.div>
    </>
  );
}
