import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { classroomSchema } from '@/schemas';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type ClassFormData = z.infer<typeof classroomSchema>;

interface ClassFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ClassFormData) => void;
}

export function ClassFormDialog({ open, onOpenChange, onSubmit }: ClassFormDialogProps) {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<any>({
    resolver: zodResolver(classroomSchema),
    defaultValues: {
      maxCapacity: 30,
      tuitionFee: 0,
      tuitionType: 'month',
      status: 'enrolling',
    }
  });

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const onSubmitForm = (data: any) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Thêm lớp học mới - Bước {step}/4</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin cơ bản</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mã lớp</label>
                  <Input {...register('classCode')} placeholder="Vd: 10A1" />
                  {errors.classCode && <p className="text-sm text-red-500">{errors.classCode.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tên lớp</label>
                  <Input {...register('className')} placeholder="Vd: Toán 10A1" />
                  {errors.className && <p className="text-sm text-red-500">{errors.className.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Màu nhận diện</label>
                  <Input {...register('color')} type="color" className="h-10 p-1 w-full" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Logo URL</label>
                  <Input {...register('logo')} placeholder="https://..." />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mô tả</label>
                <Textarea {...register('description')} placeholder="Mô tả về lớp học" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin học</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Giáo viên chính (ID)</label>
                  <Input {...register('teacherId')} placeholder="ID Giáo viên" />
                  {errors.teacherId && <p className="text-sm text-red-500">{errors.teacherId.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Trợ giảng (ID)</label>
                  <Input {...register('assistantId')} placeholder="ID Trợ giảng" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ngày khai giảng</label>
                  <Input {...register('startDate')} type="date" />
                  {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ngày kết thúc</label>
                  <Input {...register('endDate')} type="date" />
                  {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Lịch học</label>
                  <Input {...register('schedule')} placeholder="Vd: T2, T4 (18:00 - 19:30)" />
                  {errors.schedule && <p className="text-sm text-red-500">{errors.schedule.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phòng học</label>
                  <Input {...register('room')} placeholder="Vd: Phòng 101" />
                  {errors.room && <p className="text-sm text-red-500">{errors.room.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Năm học</label>
                  <Input {...register('schoolYear')} placeholder="Vd: 2023-2024" />
                  {errors.schoolYear && <p className="text-sm text-red-500">{errors.schoolYear.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Học kỳ</label>
                  <Input {...register('semester')} placeholder="Vd: Học kỳ 1" />
                  {errors.semester && <p className="text-sm text-red-500">{errors.semester.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                  <label className="text-sm font-medium">Sức chứa tối đa</label>
                  <Input {...register('maxCapacity', { valueAsNumber: true })} type="number" />
                  {errors.maxCapacity && <p className="text-sm text-red-500">{errors.maxCapacity.message}</p>}
                </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin học phí</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Học phí</label>
                  <Input {...register('tuitionFee', { valueAsNumber: true })} type="number" />
                  {errors.tuitionFee && <p className="text-sm text-red-500">{errors.tuitionFee.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Loại học phí</label>
                  <Select onValueChange={(val: any) => setValue('tuitionType', val)} defaultValue={watch('tuitionType')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại học phí" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Theo tháng</SelectItem>
                      <SelectItem value="session">Theo buổi</SelectItem>
                      <SelectItem value="course">Theo khóa</SelectItem>
                      <SelectItem value="hour">Theo giờ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Xác nhận thông tin</h3>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md space-y-2 text-sm">
                <p><strong>Mã lớp:</strong> {watch('classCode')}</p>
                <p><strong>Tên lớp:</strong> {watch('className')}</p>
                <p><strong>Giáo viên:</strong> {watch('teacherId')}</p>
                <p><strong>Lịch học:</strong> {watch('schedule')}</p>
                <p><strong>Học phí:</strong> {watch('tuitionFee')} / {watch('tuitionType')}</p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button type="button" variant="outline" onClick={handlePrev} disabled={step === 1}>
              Quay lại
            </Button>
            {step < 4 ? (
              <Button type="button" onClick={handleNext}>
                Tiếp tục
              </Button>
            ) : (
              <Button type="submit">
                Hoàn tất
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
