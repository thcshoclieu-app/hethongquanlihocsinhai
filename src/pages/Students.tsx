import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Filter, Download, Upload, MoreHorizontal, Edit, Trash2, Camera, ArrowRightLeft, LayoutGrid, List } from 'lucide-react';
import { motion } from 'motion/react';
import { useStudents, useClasses } from '@/hooks';
import { StudentFormWizard } from '@/features/students/components/StudentFormWizard';
import { Spinner } from '@/components/ui/spinner';
import { StudentService } from '@/services/StudentService';
import { useAuthStore } from '@/store';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Students() {
  const { students, loading, refetch } = useStudents();
  const { classes } = useClasses();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleCreateStudent = async (data: any) => {
    try {
      await StudentService.createStudent(data, user?.uid || 'system');
      refetch();
    } catch (error) {
      console.error('Failed to create student', error);
    }
  };

  const handleSoftDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa học sinh này?')) {
      try {
        await StudentService.softDeleteStudent(id, user?.uid || 'system');
        refetch();
      } catch (error) {
        console.error('Failed to delete student', error);
      }
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            student.studentCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            student.parentName?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesClass = filterClass === 'all' || student.classId === filterClass;
      const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [students, searchQuery, filterClass, filterStatus]);

  if (loading) {
    return <div className="flex h-full items-center justify-center"><Spinner /></div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 h-full flex flex-col"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Quản lý Học sinh</h2>
          <p className="text-slate-500 dark:text-slate-400">Xem, thêm, sửa, xóa thông tin học sinh.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Upload size={16} />
            <span className="hidden sm:inline">Import</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => setIsFormOpen(true)}>
            <Plus size={16} />
            <span>Thêm học sinh</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col bg-white dark:bg-slate-950 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 gap-4 flex-none">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <SearchInput 
              placeholder="Tìm kiếm theo tên, mã HS, phụ huynh..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={filterClass} onValueChange={setFilterClass}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Lớp học" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả lớp</SelectItem>
                {classes.map(cls => (
                  <SelectItem key={cls.classId} value={cls.classId}>{cls.className}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="active">Đang học</SelectItem>
                <SelectItem value="on_leave">Nghỉ phép</SelectItem>
                <SelectItem value="paused">Tạm nghỉ</SelectItem>
                <SelectItem value="dropped_out">Đã nghỉ</SelectItem>
                <SelectItem value="graduated">Tốt nghiệp</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" title="Bộ lọc nâng cao">
              <Filter size={16} />
            </Button>
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-md p-1 ml-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-8 px-2 ${viewMode === 'grid' ? 'bg-white dark:bg-slate-950 shadow-sm' : 'text-slate-500'}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-8 px-2 ${viewMode === 'list' ? 'bg-white dark:bg-slate-950 shadow-sm' : 'text-slate-500'}`}
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-slate-500 bg-white dark:bg-slate-950 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 flex-1">
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
            <Filter size={32} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Chưa có học sinh nào</h3>
          <p className="mt-2 text-center max-w-sm">Hãy thêm học sinh đầu tiên vào hệ thống để bắt đầu quản lý.</p>
          <Button className="mt-6" onClick={() => setIsFormOpen(true)}>Thêm học sinh</Button>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-slate-500 bg-white dark:bg-slate-950 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 flex-1">
          <p>Không tìm thấy học sinh nào phù hợp với bộ lọc.</p>
        </div>
      ) : viewMode === 'list' ? (
        <Card className="flex-1 flex flex-col min-h-0">
          <CardContent className="p-0 flex-1 overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur z-10 shadow-sm">
                <TableRow>
                  <TableHead className="w-[100px]">Mã HS</TableHead>
                  <TableHead>Học sinh</TableHead>
                  <TableHead>Lớp</TableHead>
                  <TableHead>Phụ huynh / SĐT</TableHead>
                  <TableHead>Ngày nhập học</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => {
                  const studentClass = classes.find(c => c.classId === student.classId);
                  return (
                  <TableRow key={student.studentId}>
                    <TableCell className="font-medium">{student.studentCode || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback className="bg-blue-100 text-blue-700">{student.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p 
                            className="font-medium text-slate-900 dark:text-slate-100 cursor-pointer hover:text-blue-600 transition-colors"
                            onClick={() => navigate(`/students/${student.studentId}`)}
                          >
                            {student.fullName}
                          </p>
                          <p className="text-[10px] text-slate-500 flex items-center gap-1 cursor-pointer">
                            <Camera size={10} className={student.faceRegistered ? 'text-green-500' : 'text-slate-400'} /> 
                            {student.faceRegistered ? 'Đã có Face ID' : 'Chưa có Face ID'}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal" style={studentClass?.color ? { backgroundColor: studentClass.color + '20', color: studentClass.color } : undefined}>
                        {studentClass?.className || 'Chưa xếp lớp'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{student.parentName}</p>
                        <p className="text-xs text-slate-500">{student.phoneParent}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {student.enrollDate ? new Date(student.enrollDate).toLocaleDateString('vi-VN') : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={student.status === 'active' ? 'text-green-600 bg-green-50 border-green-200' : student.status === 'on_leave' ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-slate-600 bg-slate-100 border-slate-200'}>
                        {student.status === 'active' ? 'Đang học' : student.status === 'on_leave' ? 'Nghỉ phép' : student.status === 'paused' ? 'Tạm nghỉ' : student.status === 'dropped_out' ? 'Đã nghỉ' : student.status === 'graduated' ? 'Tốt nghiệp' : 'Lưu trữ'}
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
                          <DropdownMenuItem onClick={() => navigate(`/students/${student.studentId}`)}>Chi tiết hồ sơ</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <ArrowRightLeft size={14} /> Chuyển lớp
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSoftDelete(student.studentId)} className="text-red-600 focus:bg-red-50 focus:text-red-700 gap-2">
                            <Trash2 size={14} /> Xóa học sinh
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </CardContent>
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <p className="text-sm text-slate-500">Hiển thị {filteredStudents.length} học sinh</p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-1 overflow-auto pb-6">
          {filteredStudents.map((student) => {
            const studentClass = classes.find(c => c.classId === student.classId);
            return (
              <Card key={student.studentId} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className={student.status === 'active' ? 'text-green-600 bg-green-50 border-green-200' : 'text-slate-600 bg-slate-100 border-slate-200'}>
                      {student.status === 'active' ? 'Đang học' : 'Không học'}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-2 text-slate-500">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/students/${student.studentId}`)}>Chi tiết hồ sơ</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleSoftDelete(student.studentId)}>Xóa học sinh</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-3">
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl">{student.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg cursor-pointer hover:text-blue-600" onClick={() => navigate(`/students/${student.studentId}`)}>{student.fullName}</h3>
                    <p className="text-sm text-slate-500 mt-1">{student.studentCode || 'Chưa có mã'}</p>
                    
                    <div className="mt-4 grid grid-cols-2 w-full gap-2 text-sm">
                      <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded flex flex-col">
                        <span className="text-xs text-slate-500">Lớp</span>
                        <span className="font-medium truncate" style={{ color: studentClass?.color }}>{studentClass?.className || 'N/A'}</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded flex flex-col">
                        <span className="text-xs text-slate-500">Giáo viên</span>
                        <span className="font-medium truncate">{studentClass?.teacherId || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      
      <StudentFormWizard 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        onSubmit={handleCreateStudent} 
      />
    </motion.div>
  );
}
