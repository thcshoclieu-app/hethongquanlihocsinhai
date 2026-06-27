import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { studentSchema } from '@/schemas';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useClasses } from '@/hooks';

type StudentFormData = z.input<typeof studentSchema>;

interface StudentFormWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: StudentFormData) => void;
}

export function StudentFormWizard({ open, onOpenChange, onSubmit }: StudentFormWizardProps) {
  const [step, setStep] = useState(1);
  const { classes } = useClasses();
  
  const { register, handleSubmit, formState: { errors }, setValue, watch, trigger } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      status: 'active',
      gender: 'other',
      enrollDate: new Date().toISOString().split('T')[0],
      schoolYear: new Date().getFullYear().toString() + '-' + (new Date().getFullYear() + 1).toString(),
    }
  });

  const handleNext = async () => {
    // Basic validation per step
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ['fullName', 'birthday', 'gender', 'address'];
    if (step === 2) fieldsToValidate = ['parentName', 'parentRelation', 'phoneParent', 'emailParent'];
    if (step === 3) fieldsToValidate = ['classId', 'schoolYear', 'enrollDate'];
    
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep(s => Math.min(s + 1, 5));
    }
  };
  
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const onSubmitForm = (data: StudentFormData) => {
    onSubmit(data);
    onOpenChange(false);
    setStep(1); // Reset
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Thêm học sinh mới - Bước {step}/5</DialogTitle>
        </DialogHeader>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
          <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${(step / 5) * 100}%` }} />
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin cơ bản</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Họ và tên *</label>
                  <Input {...register('fullName')} placeholder="Vd: Nguyễn Văn A" />
                  {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tên thường gọi (Nickname)</label>
                  <Input {...register('nickname')} placeholder="Vd: Tí" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ngày sinh *</label>
                  <Input {...register('birthday')} type="date" />
                  {errors.birthday && <p className="text-sm text-red-500">{errors.birthday.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Giới tính *</label>
                  <Select onValueChange={(val: any) => setValue('gender', val)} defaultValue={watch('gender')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Địa chỉ *</label>
                <Input {...register('address')} placeholder="Số nhà, đường, phường/xã..." />
                {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin phụ huynh</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tên phụ huynh *</label>
                  <Input {...register('parentName')} placeholder="Vd: Nguyễn Văn B" />
                  {errors.parentName && <p className="text-sm text-red-500">{errors.parentName.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mối quan hệ *</label>
                  <Select onValueChange={(val: any) => setValue('parentRelation', val)} defaultValue={watch('parentRelation')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn mối quan hệ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bố">Bố</SelectItem>
                      <SelectItem value="Mẹ">Mẹ</SelectItem>
                      <SelectItem value="Ông/Bà">Ông/Bà</SelectItem>
                      <SelectItem value="Người giám hộ">Người giám hộ</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.parentRelation && <p className="text-sm text-red-500">{errors.parentRelation.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Số điện thoại *</label>
                  <Input {...register('phoneParent')} placeholder="Vd: 0901234567" />
                  {errors.phoneParent && <p className="text-sm text-red-500">{errors.phoneParent.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input {...register('emailParent')} type="email" placeholder="Vd: email@example.com" />
                  {errors.emailParent && <p className="text-sm text-red-500">{errors.emailParent.message}</p>}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin học tập</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Lớp học *</label>
                  <Select onValueChange={(val: any) => setValue('classId', val)} defaultValue={watch('classId')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn lớp học" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(cls => (
                         <SelectItem key={cls.classId} value={cls.classId}>{cls.className}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.classId && <p className="text-sm text-red-500">{errors.classId.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Năm học *</label>
                  <Input {...register('schoolYear')} placeholder="Vd: 2023-2024" />
                  {errors.schoolYear && <p className="text-sm text-red-500">{errors.schoolYear.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ngày nhập học *</label>
                  <Input {...register('enrollDate')} type="date" />
                  {errors.enrollDate && <p className="text-sm text-red-500">{errors.enrollDate.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Trạng thái *</label>
                  <Select onValueChange={(val: any) => setValue('status', val)} defaultValue={watch('status')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Đang học</SelectItem>
                      <SelectItem value="on_leave">Nghỉ phép</SelectItem>
                      <SelectItem value="paused">Tạm nghỉ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Ghi chú thêm</label>
                <Textarea {...register('note')} placeholder="Ghi chú về học sinh" />
              </div>
            </div>
          )}

          {step === 4 && (
             <div className="space-y-4">
                <h3 className="text-lg font-medium">Ảnh đại diện (Tùy chọn)</h3>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
                    Chưa có ảnh
                  </div>
                  <p className="text-sm text-slate-500 mb-4">Kéo thả ảnh vào đây hoặc click để tải lên</p>
                  <Button type="button" variant="outline">Chọn ảnh từ thiết bị</Button>
                </div>
             </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Xác nhận thông tin</h3>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md space-y-2 text-sm">
                <p><strong>Họ và tên:</strong> {watch('fullName')}</p>
                <p><strong>Ngày sinh:</strong> {watch('birthday')}</p>
                <p><strong>Lớp học:</strong> {classes.find(c => c.classId === watch('classId'))?.className || 'Chưa chọn'}</p>
                <p><strong>Phụ huynh:</strong> {watch('parentName')} ({watch('parentRelation')})</p>
                <p><strong>SĐT Liên hệ:</strong> {watch('phoneParent')}</p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="outline" onClick={handlePrev} disabled={step === 1}>
              Quay lại
            </Button>
            {step < 5 ? (
              <Button type="button" onClick={handleNext}>
                Tiếp tục
              </Button>
            ) : (
              <Button type="submit">
                Lưu học sinh
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
