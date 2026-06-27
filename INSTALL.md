# Hướng dẫn cài đặt (Installation Guide)

## Yêu cầu môi trường
- **Node.js**: v18.x trở lên
- **NPM**: v9.x trở lên

## Các bước cài đặt
1. Clone repository:
   ```bash
   git clone <repo-url>
   cd ai-studio-school-management
   ```
2. Cài đặt thư viện:
   ```bash
   npm install
   ```
3. Cấu hình biến môi trường:
   Tạo file `.env` dựa trên `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Cập nhật các thông số của Firebase vào `.env`.

4. Khởi chạy ứng dụng:
   ```bash
   npm run dev
   ```
   Ứng dụng sẽ chạy tại `http://localhost:3000`.

## Scripts
- `npm run dev`: Chạy môi trường development
- `npm run build`: Build production
- `npm run lint`: Chạy ESLint
- `npm run type-check`: Kiểm tra lỗi TypeScript
- `npm run test`: Chạy Unit Test (Vitest)
