import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ScheduleFilter() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter size={16} />
          <span>Bộ lọc</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Lọc lịch học</h4>
            <p className="text-sm text-slate-500">
              Lọc lịch theo lớp, giáo viên hoặc phòng học.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <label htmlFor="class" className="text-xs font-medium text-slate-700">Lớp học</label>
              <Select>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Tất cả lớp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả lớp</SelectItem>
                  <SelectItem value="ielts">IELTS</SelectItem>
                  <SelectItem value="toeic">TOEIC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-1">
              <label htmlFor="teacher" className="text-xs font-medium text-slate-700">Giáo viên</label>
              <Select>
                <SelectTrigger id="teacher">
                  <SelectValue placeholder="Tất cả giáo viên" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả giáo viên</SelectItem>
                  <SelectItem value="t1">Nguyễn Văn A</SelectItem>
                  <SelectItem value="t2">Trần Thị B</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1">
              <label htmlFor="room" className="text-xs font-medium text-slate-700">Phòng học</label>
              <Select>
                <SelectTrigger id="room">
                  <SelectValue placeholder="Tất cả phòng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả phòng</SelectItem>
                  <SelectItem value="r1">Room 101</SelectItem>
                  <SelectItem value="r2">Room 102</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full">Áp dụng</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
