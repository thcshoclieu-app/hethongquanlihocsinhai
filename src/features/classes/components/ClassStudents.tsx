import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal, Plus, Download, Upload, ArrowRightLeft } from 'lucide-react';
import { Student } from '@/types';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { COLLECTIONS } from '@/constants/collections';
import { Spinner } from '@/components/ui/spinner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TransferStudentDialog } from './TransferStudentDialog';
import { ClassService } from '@/services/ClassService';
import { useAuthStore } from '@/store';

interface ClassStudentsProps {
  classId: string;
  maxCapacity: number;
}

export default function ClassStudents({ classId, maxCapacity }: ClassStudentsProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [transferDialog, setTransferDialog] = useState<{ open: boolean; studentId: string; studentName: string }>({ open: false, studentId: '', studentName: '' });
  const { user } = useAuthStore();

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, COLLECTIONS.STUDENTS), where('classId', '==', classId));
      const snapshot = await getDocs(q);
      setStudents(snapshot.docs.map(doc => ({ studentId: doc.id, ...doc.data() } as Student)));
    } catch (error) {
      console.error('Failed to fetch students', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [classId]);

  const handleTransfer = async (toClassId: string, reason: string) => {
    try {
      await ClassService.transferStudent(
        transferDialog.studentId,
        classId,
        toClassId,
        reason,
        user?.uid || 'system'
      );
      // Refresh list
      fetchStudents();
    } catch (error) {
      console.error('Transfer failed', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <SearchInput placeholder="Tìm học sinh..." />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 text-slate-600">
            <Upload size={16} />
            <span>Import</span>
          </Button>
          <Button variant="outline" className="gap-2 text-slate-600">
            <Download size={16} />
            <span>Export</span>
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700" disabled={students.length >= maxCapacity}>
            <Plus size={16} />
            <span>Thêm học sinh</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Học sinh</TableHead>
                <TableHead>Giới tính</TableHead>
                <TableHead>Ngày sinh</TableHead>
                <TableHead>SĐT Phụ huynh</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <Spinner className="mx-auto" />
                  </TableCell>
                </TableRow>
              ) : students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                    Chưa có học sinh nào trong lớp
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow key={student.studentId}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback className="bg-blue-100 text-blue-700">{student.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.fullName}</p>
                          <p className="text-xs text-slate-500">{student.studentCode}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.gender === 'male' ? 'Nam' : student.gender === 'female' ? 'Nữ' : 'Khác'}</TableCell>
                    <TableCell>{new Date(student.birthday).toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell>{student.phoneParent}</TableCell>
                    <TableCell>
                      <Badge variant={student.status === 'active' ? 'success' : 'secondary'} className="font-normal">
                        {student.status === 'active' ? 'Đang học' : 'Đã nghỉ'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Chi tiết</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2" onClick={() => setTransferDialog({ open: true, studentId: student.studentId!, studentName: student.fullName })}>
                            <ArrowRightLeft size={14} /> Chuyển lớp
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-700">Xóa khỏi lớp</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <TransferStudentDialog 
        open={transferDialog.open} 
        onOpenChange={(open) => setTransferDialog(prev => ({ ...prev, open }))} 
        studentName={transferDialog.studentName} 
        currentClassId={classId} 
        onTransfer={handleTransfer} 
      />
    </div>
  );
}
