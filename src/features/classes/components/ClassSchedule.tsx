import { Classroom } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, Edit2 } from 'lucide-react';

interface ClassScheduleProps {
  classData: Classroom;
}

export default function ClassSchedule({ classData }: ClassScheduleProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Lịch học cố định</h3>
        <Button variant="outline" size="sm" className="gap-2">
          <Edit2 size={14} /> Thay đổi lịch
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <CalendarDays size={24} />
            </div>
            <div>
              <h4 className="font-medium text-lg">{classData.schedule}</h4>
              <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><Clock size={14} /> Thời gian: {classData.startDate ? new Date(classData.startDate).toLocaleDateString('vi-VN') : '?'} - {classData.endDate ? new Date(classData.endDate).toLocaleDateString('vi-VN') : '?'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
           <CardHeader>
             <CardTitle className="text-base">Lịch học bù</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-sm text-slate-500 text-center py-8">Chưa có lịch học bù nào</div>
             <Button variant="outline" className="w-full mt-2">Thêm lịch học bù</Button>
           </CardContent>
        </Card>
        
        <Card>
           <CardHeader>
             <CardTitle className="text-base">Lịch nghỉ lễ</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-sm text-slate-500 text-center py-8">Chưa có lịch nghỉ lễ nào</div>
             <Button variant="outline" className="w-full mt-2">Thêm lịch nghỉ lễ</Button>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
