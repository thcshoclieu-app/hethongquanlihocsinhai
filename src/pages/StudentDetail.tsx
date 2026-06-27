import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStudentDetail, useClasses } from '@/hooks';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Users, CalendarDays, Wallet, ArrowRightLeft, Image as ImageIcon, Camera, Activity, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { TransferStudentDialog } from '@/features/classes/components/TransferStudentDialog';
import { FaceEnrollmentDialog } from '@/features/ai/components/FaceEnrollmentDialog';
import { ClassService } from '@/services/ClassService';
import { useAuthStore } from '@/store';

// Subcomponents for tabs (we will create a basic version here)
import StudentOverview from '@/features/students/components/StudentOverview';
import StudentPersonalInfo from '@/features/students/components/StudentPersonalInfo';

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { studentData, loading, error, refetch } = useStudentDetail(id);
  const { classes } = useClasses();
  const { user } = useAuthStore();

  const [activeTab, setActiveTab] = useState('overview');
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [faceDialogOpen, setFaceDialogOpen] = useState(false);

  const handleTransfer = async (toClassId: string, reason: string) => {
    if (!studentData) return;
    try {
      await ClassService.transferStudent(
        studentData.studentId,
        studentData.classId,
        toClassId,
        reason,
        user?.uid || 'system'
      );
      refetch();
    } catch (error) {
      console.error('Transfer failed', error);
    }
  };

  if (loading) {
    return <div className="flex h-full items-center justify-center"><Spinner /></div>;
  }

  if (error || !studentData) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h2 className="text-xl font-semibold">Không tìm thấy hồ sơ học sinh</h2>
        <Button onClick={() => navigate('/students')}>Quay lại danh sách</Button>
      </div>
    );
  }

  const studentClass = classes.find(c => c.classId === studentData.classId);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white dark:bg-slate-950 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 relative">
        <Button variant="ghost" size="icon" onClick={() => navigate('/students')} className="absolute top-4 right-4 md:static">
          <ArrowLeft size={20} />
        </Button>
        <div className="flex items-center gap-4 flex-1">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold overflow-hidden bg-slate-100 border-4 border-white dark:border-slate-950 shadow-md">
            {studentData.avatar ? <img src={studentData.avatar} alt="Avatar" className="w-full h-full object-cover" /> : <User size={32} className="text-slate-400" />}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-bold tracking-tight">{studentData.fullName}</h2>
              {studentData.nickname && <span className="text-lg text-slate-500">({studentData.nickname})</span>}
              <Badge variant="outline" className={studentData.status === 'active' ? 'text-green-600 bg-green-50 border-green-200' : 'text-slate-600 bg-slate-100 border-slate-200'}>
                 {studentData.status === 'active' ? 'Đang học' : studentData.status === 'on_leave' ? 'Nghỉ phép' : studentData.status === 'paused' ? 'Tạm nghỉ' : studentData.status === 'dropped_out' ? 'Đã nghỉ' : studentData.status === 'graduated' ? 'Tốt nghiệp' : 'Lưu trữ'}
              </Badge>
            </div>
            <div className="flex items-center gap-3 mt-1 text-slate-500 text-sm flex-wrap">
              <span>Mã: {studentData.studentCode || 'N/A'}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Users size={14} /> Lớp: <strong style={{ color: studentClass?.color }}>{studentClass?.className || 'Chưa xếp lớp'}</strong></span>
              <span>•</span>
              <span>Năm học: {studentData.schoolYear}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2">Cập nhật hồ sơ</Button>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => setTransferDialogOpen(true)}><ArrowRightLeft size={16} /> Chuyển lớp</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        <TabsList className="bg-white dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800 h-12 w-full justify-start overflow-x-auto shrink-0 flex-nowrap">
          <TabsTrigger value="overview" className="gap-2"><Activity size={16} /> Tổng quan</TabsTrigger>
          <TabsTrigger value="personal" className="gap-2"><User size={16} /> Thông tin cá nhân</TabsTrigger>
          <TabsTrigger value="attendance" className="gap-2"><CalendarDays size={16} /> Điểm danh</TabsTrigger>
          <TabsTrigger value="tuition" className="gap-2"><Wallet size={16} /> Học phí</TabsTrigger>
          <TabsTrigger value="transfers" className="gap-2"><ArrowRightLeft size={16} /> Lịch sử chuyển lớp</TabsTrigger>
          <TabsTrigger value="ai_face" className="gap-2"><Camera size={16} /> AI Face</TabsTrigger>
          <TabsTrigger value="notes" className="gap-2"><FileText size={16} /> Ghi chú</TabsTrigger>
        </TabsList>

        <div className="mt-4 flex-1 overflow-y-auto pb-6">
          <TabsContent value="overview" className="m-0 h-full">
             <StudentOverview studentData={studentData} studentClass={studentClass} />
          </TabsContent>
          
          <TabsContent value="personal" className="m-0 h-full">
             <StudentPersonalInfo studentData={studentData} />
          </TabsContent>

          <TabsContent value="ai_face" className="m-0 h-full">
             <div className="flex flex-col items-center justify-center h-[400px] text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-200 dark:border-slate-800 p-6 text-center">
                {studentData.faceRegistered ? (
                  <>
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 mb-4">
                      <Camera size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">Đã đăng ký khuôn mặt</h3>
                    <p className="text-sm max-w-md mb-6">Học sinh đã có dữ liệu khuôn mặt (Face Embedding) để sử dụng cho tính năng điểm danh tự động.</p>
                    <Button variant="outline" onClick={() => setFaceDialogOpen(true)} className="gap-2">
                      <Camera size={16} /> Đăng ký lại
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4">
                      <Camera size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">Chưa đăng ký khuôn mặt</h3>
                    <p className="text-sm max-w-md mb-6">Thêm dữ liệu khuôn mặt để sử dụng hệ thống điểm danh tự động bằng AI.</p>
                    <Button onClick={() => setFaceDialogOpen(true)} className="gap-2 bg-blue-600 hover:bg-blue-700">
                      <Camera size={16} /> Đăng ký khuôn mặt
                    </Button>
                  </>
                )}
             </div>
          </TabsContent>

          {/* Placeholder for other tabs */}
          {['attendance', 'tuition', 'transfers', 'notes'].map(tab => (
              <TabsContent key={tab} value={tab} className="m-0 h-full">
                <div className="flex items-center justify-center h-[400px] text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-200 dark:border-slate-800">
                    Nội dung đang được cập nhật
                </div>
              </TabsContent>
          ))}
        </div>
      </Tabs>
      
      <TransferStudentDialog 
        open={transferDialogOpen} 
        onOpenChange={setTransferDialogOpen} 
        studentName={studentData.fullName} 
        currentClassId={studentData.classId} 
        onTransfer={handleTransfer} 
      />

      <FaceEnrollmentDialog
        open={faceDialogOpen}
        onOpenChange={setFaceDialogOpen}
        studentId={studentData.studentId}
        studentName={studentData.fullName}
        onSuccessCallback={refetch}
      />
    </motion.div>
  );
}
