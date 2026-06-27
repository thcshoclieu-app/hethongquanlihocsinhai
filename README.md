# Student Management System

## Giới thiệu
Ứng dụng Web PWA quản lý học sinh hiện đại, sử dụng AI nhận diện khuôn mặt để điểm danh, quản lý học phí, quản lý nhiều lớp học và xuất báo cáo Excel/PDF. Đây là nền tảng được xây dựng theo Clean Architecture và tích hợp hoàn chỉnh với Firebase.

## Công nghệ
- **Core**: React 19, Vite, TypeScript
- **Styling**: TailwindCSS, shadcn/ui, Framer Motion
- **State Management**: Zustand
- **Routing**: React Router
- **Forms**: React Hook Form, Zod
- **Backend (Firebase)**: Authentication, Firestore, Storage, Security Rules

## Firebase Setup

Dự án sử dụng Firebase với các dịch vụ sau:

### Authentication
Hỗ trợ đăng nhập với:
- Email/Password
- Google Login
- Forgot Password
- Remember Login
- Tích hợp Protected Route, AdminRoute, TeacherRoute, GuestRoute qua React Router.

### Firestore Database
Database được thiết kế tối ưu, có thể mở rộng lên hàng chục nghìn học sinh, bao gồm các collection:
- `users`: Quản lý tài khoản và phân quyền.
- `teachers`: Thông tin giáo viên.
- `classrooms`: Quản lý không giới hạn số lớp.
- `students`: Hồ sơ học sinh.
- `attendance` & `attendanceLogs`: Dữ liệu và lịch sử điểm danh.
- `tuitionPlans` & `payments`: Quản lý học phí và thanh toán.
- `monthlyReports`: Lưu trữ file báo cáo (Excel/PDF).
- `settings`: Cấu hình hệ thống.
- `notifications`: Thông báo.
- `logs`: Lịch sử hoạt động.
- `faceEmbeddings`: Lưu trữ vector khuôn mặt cho AI.
- `school`: Thông tin chung.
- `backupHistory`: Quản lý sao lưu dữ liệu.

### Storage
Cấu trúc thư mục Firebase Storage:
- `avatars/`
- `attendance/`
- `reports/`
- `logos/`
- `face/`
- `backup/`

### Security Rules (firestore.rules)
Phân quyền truy cập dữ liệu chặt chẽ theo Rule:
- **Super Admin/Admin**: Toàn quyền quản lý hệ thống.
- **Teacher**: Quản lý học sinh, lớp học của mình và điểm danh.
- **Assistant**: Hỗ trợ điểm danh.
- **Viewer**: Quyền xem.

## Kiến trúc (Clean Architecture)
- `src/repositories/`: Giao tiếp trực tiếp với Firestore (CRUD).
- `src/services/`: Tầng nghiệp vụ xử lý dữ liệu từ Repositories.
- `src/schemas/`: Validation với Zod.
- `src/middleware/`: Route Guards (`ProtectedRoute`, `AdminRoute`, v.v.).

## Build và Deploy

Dự án đảm bảo biên dịch thành công qua lệnh:
```bash
npm run build
```

Chạy local development:
```bash
npm run dev
```

Cấu hình Firebase đã được cung cấp (thông qua `firebase.ts`), và dự án sẵn sàng để deploy lên môi trường Production.

