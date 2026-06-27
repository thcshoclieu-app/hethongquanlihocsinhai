import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2, RefreshCw } from 'lucide-react';
import { Attendance } from '@/types';
import { useManualAttendance } from '../hooks/useManualAttendance';
import { Spinner } from '@/components/ui/spinner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EditAttendanceModal } from './EditAttendanceModal';
import { AttendanceService } from '@/services/AttendanceService';
import { useAuthStore } from '@/store';

interface AttendanceTableProps {
  attendances: Attendance[];
  isLoading: boolean;
  onRefresh: () => void;
  showDeleted?: boolean;
}

export function AttendanceTable({ attendances, isLoading, onRefresh, showDeleted = false }: AttendanceTableProps) {
  const { softDeleteAttendance, isSubmitting } = useManualAttendance();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingRecord, setEditingRecord] = useState<Attendance | null>(null);
  const { user } = useAuthStore();

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn hủy điểm danh này? Hệ thống sẽ lưu lại lịch sử hủy.')) {
      setDeletingId(id);
      await softDeleteAttendance(id, 'Giáo viên hủy');
      setDeletingId(null);
      onRefresh();
    }
  };

  const handleRestore = async (id: string) => {
    setDeletingId(id);
    await AttendanceService.restoreAttendance(id, user?.uid || 'system');
    setDeletingId(null);
    onRefresh();
  };

  if (isLoading) {
    return <div className="p-8 flex justify-center"><Spinner /></div>;
  }

  const visibleAttendances = attendances.filter(record => showDeleted || !record.isDeleted);

  if (visibleAttendances.length === 0) {
    return <div className="p-8 text-center text-slate-500">Chưa có dữ liệu điểm danh.</div>;
  }

  return (
    <>
      <EditAttendanceModal 
        isOpen={!!editingRecord}
        onClose={() => setEditingRecord(null)}
        onSuccess={onRefresh}
        record={editingRecord}
      />
      <Table>
        <TableHeader className="sticky top-0 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur z-10 shadow-sm">
          <TableRow>
            <TableHead>Học sinh</TableHead>
            <TableHead>Giờ điểm danh</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Phương thức</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleAttendances.map((record) => {
            const isDeleted = record.isDeleted;
            
            return (
              <TableRow key={record.attendanceId} className={isDeleted ? "opacity-50 bg-slate-50" : ""}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-slate-100 text-slate-700 text-xs">
                        {record.studentId.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className={`font-medium block leading-tight ${isDeleted ? 'text-slate-500 line-through' : 'text-slate-900 dark:text-slate-100'}`}>
                        {record.studentId}
                      </span>
                      <span className="text-xs text-slate-500">{record.classId}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{record.time}</TableCell>
                <TableCell>
                  {isDeleted ? (
                    <Badge variant="outline" className="text-slate-500">Đã hủy</Badge>
                  ) : (
                    <>
                      {record.status === 'present' && <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none font-normal">Có mặt</Badge>}
                      {record.status === 'absent' && <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none font-normal">Vắng mặt</Badge>}
                      {record.status === 'late' && <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none font-normal">Đi trễ</Badge>}
                      {record.status === 'leave' && <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none font-normal">Nghỉ phép</Badge>}
                    </>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal text-xs text-slate-500">
                    {record.method || 'AI'} {record.confidence ? `(${record.confidence}%)` : ''}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500" disabled={isSubmitting && deletingId === record.attendanceId}>
                        {isSubmitting && deletingId === record.attendanceId ? <Spinner size="sm" /> : <MoreHorizontal size={16} />}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {isDeleted ? (
                        <DropdownMenuItem className="text-green-600 focus:text-green-600 focus:bg-green-50" onClick={() => handleRestore(record.attendanceId)}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Khôi phục
                        </DropdownMenuItem>
                      ) : (
                        <>
                          <DropdownMenuItem className="text-slate-700" onClick={() => setEditingRecord(record)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleDelete(record.attendanceId)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hủy điểm danh
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
