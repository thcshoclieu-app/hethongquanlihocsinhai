import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useClassDetail } from '@/hooks';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Users, CalendarDays, Wallet, Clock, UserCheck, BookOpen, Settings } from 'lucide-react';
import { motion } from 'motion/react';

// Subcomponents for tabs
import ClassDashboard from '@/features/classes/components/ClassDashboard';
import ClassStudents from '@/features/classes/components/ClassStudents';
import ClassSchedule from '@/features/classes/components/ClassSchedule';

export default function ClassDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { classData, loading, error } = useClassDetail(id);

  const [activeTab, setActiveTab] = useState('overview');

  if (loading) {
    return <div className="flex h-full items-center justify-center"><Spinner /></div>;
  }

  if (error || !classData) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h2 className="text-xl font-semibold">Không tìm thấy thông tin lớp học</h2>
        <Button onClick={() => navigate('/classes')}>Quay lại danh sách</Button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-4 bg-white dark:bg-slate-950 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
        <Button variant="ghost" size="icon" onClick={() => navigate('/classes')}>
          <ArrowLeft size={20} />
        </Button>
        <div className="flex items-center gap-4 flex-1">
          <div 
            className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl font-bold"
            style={{ backgroundColor: classData.color || '#3b82f6' }}
          >
            {classData.logo ? <img src={classData.logo} alt="Logo" className="w-full h-full object-cover rounded-lg" /> : classData.className.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight">{classData.className}</h2>
              <Badge variant={classData.status === 'active' ? 'success' : 'secondary'} className="capitalize">
                {classData.status === 'enrolling' ? 'Tuyển sinh' : classData.status === 'active' ? 'Đang học' : classData.status === 'paused' ? 'Tạm dừng' : classData.status === 'completed' ? 'Đã kết thúc' : 'Lưu trữ'}
              </Badge>
            </div>
            <p className="text-slate-500">Mã: {classData.classCode} • {classData.schoolYear} - {classData.semester}</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        <TabsList className="bg-white dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800 h-12 w-full justify-start overflow-x-auto shrink-0 flex-nowrap">
          <TabsTrigger value="overview" className="gap-2"><BookOpen size={16} /> Tổng quan</TabsTrigger>
          <TabsTrigger value="students" className="gap-2"><Users size={16} /> Học sinh</TabsTrigger>
          <TabsTrigger value="attendance" className="gap-2"><UserCheck size={16} /> Điểm danh</TabsTrigger>
          <TabsTrigger value="schedule" className="gap-2"><CalendarDays size={16} /> Lịch học</TabsTrigger>
          <TabsTrigger value="tuition" className="gap-2"><Wallet size={16} /> Học phí</TabsTrigger>
          <TabsTrigger value="settings" className="gap-2"><Settings size={16} /> Cài đặt</TabsTrigger>
        </TabsList>

        <div className="mt-4 flex-1 overflow-y-auto">
          <TabsContent value="overview" className="m-0 h-full">
            <ClassDashboard classData={classData} />
          </TabsContent>
          
          <TabsContent value="students" className="m-0 h-full">
             <ClassStudents classId={classData.classId} maxCapacity={classData.maxCapacity} />
          </TabsContent>

          <TabsContent value="attendance" className="m-0 h-full">
             <div className="flex items-center justify-center h-[400px] text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-lg">Tính năng Điểm danh đang được cập nhật</div>
          </TabsContent>

          <TabsContent value="schedule" className="m-0 h-full">
             <ClassSchedule classData={classData} />
          </TabsContent>
          
          <TabsContent value="tuition" className="m-0 h-full">
             <div className="flex items-center justify-center h-[400px] text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-lg">Tính năng Học phí đang được cập nhật</div>
          </TabsContent>

          <TabsContent value="settings" className="m-0 h-full">
             <div className="flex items-center justify-center h-[400px] text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-lg">Tính năng Cài đặt đang được cập nhật</div>
          </TabsContent>
        </div>
      </Tabs>
    </motion.div>
  );
}
