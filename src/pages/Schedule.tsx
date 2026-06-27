import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Upload, Plus, Filter } from 'lucide-react';
import { ScheduleMonth } from '@/features/schedule/components/ScheduleMonth';
import { ScheduleWeek } from '@/features/schedule/components/ScheduleWeek';
import { ScheduleDay } from '@/features/schedule/components/ScheduleDay';
import { ScheduleToolbar } from '@/features/schedule/components/ScheduleToolbar';
import { SessionDetailDialog } from '@/features/schedule/components/SessionDetailDialog';
import { useSchedule } from '@/features/schedule/hooks/useSchedule';
import { ClassSession } from '@/types';

export default function Schedule() {
  const [view, setView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [selectedSession, setSelectedSession] = useState<ClassSession | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { sessions, isLoading, refetch } = useSchedule(currentDate, view);

  const handleSessionClick = (session: ClassSession) => {
    setSelectedSession(session);
    setIsDetailOpen(true);
  };

  const handleEditSession = (session: ClassSession) => {
    setIsDetailOpen(false);
    // TODO: open edit dialog
    console.log("Edit session", session);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto h-[calc(100vh-64px)] flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0"
      >
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Quản lý Lịch học</h2>
          <p className="text-slate-500 dark:text-slate-400">Xem và quản lý lịch học, giáo viên, phòng học.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 hidden sm:flex">
            <Upload size={16} />
            <span>Import</span>
          </Button>
          <Button variant="outline" className="gap-2 hidden sm:flex">
            <Download size={16} />
            <span>Export</span>
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus size={16} />
            <span>Tạo lịch mới</span>
          </Button>
        </div>
      </motion.div>

      <Card className="flex-1 flex flex-col min-h-0">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <ScheduleToolbar 
            currentDate={currentDate} 
            onChangeDate={setCurrentDate} 
            view={view} 
            onChangeView={setView} 
          />
        </div>
        <CardContent className="p-0 flex-1 overflow-auto bg-slate-50/50 dark:bg-slate-900/20">
          {view === 'month' && <ScheduleMonth date={currentDate} sessions={sessions} isLoading={isLoading} onSessionClick={handleSessionClick} />}
          {view === 'week' && <ScheduleWeek date={currentDate} sessions={sessions} isLoading={isLoading} onSessionClick={handleSessionClick} />}
          {view === 'day' && <ScheduleDay date={currentDate} sessions={sessions} isLoading={isLoading} onSessionClick={handleSessionClick} />}
        </CardContent>
      </Card>

      <SessionDetailDialog 
        session={selectedSession} 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
        onEdit={handleEditSession} 
      />
    </div>
  );
}
