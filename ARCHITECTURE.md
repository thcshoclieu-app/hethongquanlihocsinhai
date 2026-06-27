# Kiến trúc hệ thống (Architecture)

## Tổng quan
Dự án được xây dựng theo mô hình **Clean Architecture**, tách biệt giữa giao diện (UI) và nghiệp vụ (Business Logic), giúp ứng dụng dễ dàng mở rộng và bảo trì.

## Cấu trúc thư mục
- `src/components`: Chứa các UI Component chung (shadcn, forms, layout).
- `src/features`: Mỗi tính năng (domain) được nhóm lại, ví dụ: `analytics`, `tuition`, `attendance`.
- `src/services`: Xử lý nghiệp vụ (Business Logic).
- `src/domain`: Định nghĩa kiểu dữ liệu (Types, Interfaces) và Entities.
- `src/hooks`: Custom React hooks, làm cầu nối giữa UI và Services.
- `src/pages`: Các màn hình chính (Page components).
- `src/lib`: Utility functions (utils, formatters).

## Design Patterns
- **Repository Pattern**: Tách biệt logic truy xuất dữ liệu (Firebase) ra khỏi Service.
- **Service Layer**: Tập trung xử lý logic phức tạp (tính toán doanh thu, chuyên cần).
- **Strategy Pattern**: (Sẽ áp dụng cho Export service và Payment methods).
- **Observer Pattern**: (React Context / Zustand cho global state).

## Offline-First
Sử dụng **Service Worker** và **IndexedDB** qua `vite-plugin-pwa` để cache dữ liệu, hỗ trợ ứng dụng hoạt động ngoại tuyến và đồng bộ lại khi có kết nối mạng (Sync Queue).
