import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  rememberMe: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

export const studentSchema = z.object({
  studentCode: z.string().optional(),
  classId: z.string().min(1, 'Lớp là bắt buộc'),
  fullName: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
  nickname: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']),
  birthday: z.string().min(1, 'Ngày sinh là bắt buộc'),
  parentName: z.string().min(2, 'Tên phụ huynh là bắt buộc'),
  parentRelation: z.string().min(1, 'Quan hệ là bắt buộc'),
  phoneParent: z.string().min(10, 'Số điện thoại không hợp lệ'),
  emailParent: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  address: z.string().min(1, 'Địa chỉ là bắt buộc'),
  schoolYear: z.string().min(1, 'Năm học là bắt buộc'),
  enrollDate: z.string().min(1, 'Ngày nhập học là bắt buộc'),
  status: z.enum(['active', 'on_leave', 'paused', 'dropped_out', 'graduated', 'archived']).default('active'),
  note: z.string().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  bloodType: z.string().optional(),
  allergies: z.string().optional(),
  healthNotes: z.string().optional(),
  hobbies: z.string().optional(),
  strengths: z.string().optional(),
  weaknesses: z.string().optional(),
});

export const classroomSchema = z.object({
  classCode: z.string().min(1, 'Mã lớp là bắt buộc'),
  className: z.string().min(1, 'Tên lớp là bắt buộc'),
  shortName: z.string().optional(),
  description: z.string().optional(),
  teacherId: z.string().min(1, 'Giáo viên là bắt buộc'),
  assistantId: z.string().optional(),
  schoolYear: z.string().min(1, 'Năm học là bắt buộc'),
  semester: z.string().min(1, 'Học kỳ là bắt buộc'),
  schedule: z.string().min(1, 'Lịch học là bắt buộc'),
  room: z.string().min(1, 'Phòng học là bắt buộc'),
  color: z.string().optional(),
  logo: z.string().optional(),
  maxCapacity: z.number().min(1, 'Sức chứa tối đa phải lớn hơn 0').default(30),
  startDate: z.string().min(1, 'Ngày khai giảng là bắt buộc'),
  endDate: z.string().min(1, 'Ngày kết thúc là bắt buộc'),
  tuitionFee: z.number().min(0, 'Học phí không hợp lệ').default(0),
  tuitionType: z.enum(['month', 'session', 'course', 'hour']).default('month'),
  status: z.enum(['enrolling', 'active', 'paused', 'completed', 'archived']).default('enrolling'),
});

export const teacherSchema = z.object({
  fullName: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  role: z.string().min(1, 'Vai trò là bắt buộc'),
  status: z.enum(['active', 'inactive']).default('active'),
});

export const paymentSchema = z.object({
  studentId: z.string().min(1, 'Học sinh là bắt buộc'),
  month: z.string().min(1, 'Tháng là bắt buộc'),
  year: z.string().min(1, 'Năm là bắt buộc'),
  totalAmount: z.number().min(0),
  discount: z.number().min(0).default(0),
  paid: z.number().min(0),
  paymentMethod: z.enum(['cash', 'transfer', 'card', 'momo']),
  note: z.string().optional(),
});
