import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LayoutGrid, List, Plus, Filter, MoreHorizontal, Users, CalendarDays, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useClasses } from '@/hooks/useClasses';
import { ClassFormDialog } from '@/features/classes/components/ClassFormDialog';
import { ClassService } from '@/services/ClassService';
import { useAuthStore } from '@/store';
import { Spinner } from '@/components/ui/spinner';
import { useNavigate } from 'react-router-dom';

export default function Classes() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { classes, loading, refetch } = useClasses();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleCreateClass = async (data: any) => {
    try {
      await ClassService.createClass(data, user?.uid || 'system');
      refetch();
    } catch (error) {
      console.error('Failed to create class', error);
      // Here you would show a toast notification
    }
  };

  if (loading) {
    return <div className="flex h-full items-center justify-center"><Spinner /></div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 h-full flex flex-col"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Quản lý Lớp học</h2>
          <p className="text-slate-500 dark:text-slate-400">Xem, thêm, sửa, xóa thông tin lớp học.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => setIsFormOpen(true)}>
            <Plus size={16} />
            <span>Thêm lớp mới</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <SearchInput placeholder="Tìm kiếm lớp học..." />
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="active">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Đang mở</SelectItem>
              <SelectItem value="completed">Đã kết thúc</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" title="Bộ lọc nâng cao">
            <Filter size={16} />
          </Button>
          <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-md bg-slate-50 dark:bg-slate-900 p-0.5 ml-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-8 w-8 rounded-sm ${viewMode === 'grid' ? 'bg-white dark:bg-slate-800 shadow-sm' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-8 w-8 rounded-sm ${viewMode === 'list' ? 'bg-white dark:bg-slate-800 shadow-sm' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </Button>
          </div>
        </div>
      </div>

      {classes.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
            <Users className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Chưa có lớp học nào</h3>
          <p className="text-slate-500 max-w-sm mt-2 mb-6">Bạn chưa tạo lớp học nào. Hãy bắt đầu bằng cách thêm một lớp học mới để quản lý học sinh.</p>
          <Button onClick={() => setIsFormOpen(true)}>Thêm lớp đầu tiên</Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {classes.map((cls, i) => (
            <motion.div 
              key={cls.classId} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Card className="h-full overflow-hidden flex flex-col group relative">
                <div className={`h-2 w-full`} style={{ backgroundColor: cls.color || '#3b82f6' }} />
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
                  <MoreHorizontal size={16} />
                </Button>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline" className="mb-2 bg-slate-50 dark:bg-slate-900">{cls.schoolYear}</Badge>
                      <CardTitle className="text-xl cursor-pointer hover:text-blue-600 transition-colors" onClick={() => navigate(`/classes/${cls.classId}`)}>{cls.className}</CardTitle>
                      <CardDescription className="mt-1">Mã: {cls.classCode}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-slate-100 text-slate-700">{cls.teacherId?.charAt(0) || 'T'}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium text-slate-900 dark:text-slate-100">{cls.teacherId || 'Chưa gán'}</p>
                        <p className="text-slate-500 text-xs">Giáo viên</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-slate-400" />
                          <span>{cls.studentCount} / {cls.maxCapacity} học sinh</span>
                        </div>
                        {cls.studentCount >= cls.maxCapacity && (
                           <Badge variant="destructive" className="text-[10px] h-5 px-1">Đầy</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <CalendarDays size={16} className="text-slate-400" />
                        <span>{cls.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Wallet size={16} className="text-slate-400" />
                        <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cls.tuitionFee)}/{cls.tuitionType}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <Badge variant={cls.status === 'active' ? 'success' : 'secondary'} className="font-normal capitalize">
                      {cls.status === 'enrolling' ? 'Tuyển sinh' : cls.status === 'active' ? 'Đang học' : cls.status === 'paused' ? 'Tạm dừng' : cls.status === 'completed' ? 'Đã kết thúc' : 'Lưu trữ'}
                    </Badge>
                    <Button variant="link" className="px-0 text-blue-600" onClick={() => navigate(`/classes/${cls.classId}`)}>Chi tiết</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="flex-1 flex flex-col min-h-0">
          <CardContent className="p-0 flex-1 overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur z-10 shadow-sm">
                <TableRow>
                  <TableHead className="w-[100px]">Mã lớp</TableHead>
                  <TableHead>Tên lớp</TableHead>
                  <TableHead>Giáo viên</TableHead>
                  <TableHead className="text-center">Sĩ số</TableHead>
                  <TableHead>Lịch học</TableHead>
                  <TableHead>Học phí</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((cls) => (
                  <TableRow key={cls.classId}>
                    <TableCell className="font-medium">{cls.classCode}</TableCell>
                    <TableCell>
                      <div className="cursor-pointer hover:text-blue-600 transition-colors" onClick={() => navigate(`/classes/${cls.classId}`)}>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{cls.className}</p>
                        <p className="text-xs text-slate-500">{cls.schoolYear} - {cls.semester}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px] bg-slate-100 text-slate-700">{cls.teacherId?.charAt(0) || 'T'}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{cls.teacherId || 'Chưa gán'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      <span className={cls.studentCount >= cls.maxCapacity ? "text-red-500" : ""}>
                        {cls.studentCount}/{cls.maxCapacity}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600 dark:text-slate-400">{cls.schedule}</TableCell>
                    <TableCell className="text-sm text-slate-600 dark:text-slate-400">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cls.tuitionFee)}</TableCell>
                    <TableCell>
                      <Badge variant={cls.status === 'active' ? 'success' : 'secondary'} className="font-normal capitalize">
                        {cls.status === 'enrolling' ? 'Tuyển sinh' : cls.status === 'active' ? 'Đang học' : cls.status === 'paused' ? 'Tạm dừng' : cls.status === 'completed' ? 'Đã kết thúc' : 'Lưu trữ'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                        <MoreHorizontal size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <ClassFormDialog 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        onSubmit={handleCreateClass} 
      />
    </motion.div>
  );
}
