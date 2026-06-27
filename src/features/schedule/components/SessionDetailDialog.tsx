import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ClassSession } from '@/types';
import { Calendar, Clock, MapPin, User, FileText, CheckCircle, XCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

interface SessionDetailDialogProps {
  session: ClassSession | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (session: ClassSession) => void;
}

export function SessionDetailDialog({ session, isOpen, onClose, onEdit }: SessionDetailDialogProps) {
  if (!session) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between pr-8">
            <DialogTitle className="text-xl">Buổi học lớp {session.classId}</DialogTitle>
            <div className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
              session.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
              session.status === 'holiday' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
              'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              {session.status === 'cancelled' ? 'Đã hủy' : 
               session.status === 'holiday' ? 'Nghỉ lễ' : 
               session.status === 'rescheduled' ? 'Đổi lịch' :
               session.status === 'makeup' ? 'Học bù' :
               session.status === 'completed' ? 'Đã học' : 'Sắp diễn ra'}
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Ngày học</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {format(parseISO(session.date), 'EEEE, dd/MM/yyyy', { locale: vi })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Thời gian</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {session.startTime} - {session.endTime}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Phòng học</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{session.roomId}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Giáo viên</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{session.teacherId}</p>
            </div>
          </div>

          {(session.topic || session.note) && (
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
              <div>
                {session.topic && (
                  <>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Chủ đề</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{session.topic}</p>
                  </>
                )}
                {session.note && (
                  <>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Ghi chú</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{session.note}</p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
          <Button variant="outline" className="text-blue-600" onClick={() => onEdit(session)}>
            Sửa/Đổi lịch
          </Button>
          <Button className="bg-blue-600 text-white" disabled={session.status === 'cancelled'}>
            Điểm danh
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
