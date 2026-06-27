import { z } from 'zod';

export const emailSchema = z.string().email({ message: 'Email không hợp lệ' });
export const passwordSchema = z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' });
export const phoneSchema = z.string().regex(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, { message: 'Số điện thoại không hợp lệ' });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
