# Hướng dẫn triển khai (Deployment Guide)

Dự án được cấu hình để triển khai dễ dàng lên **Netlify** hoặc **Firebase Hosting**.

## Triển khai lên Netlify

1. Commit toàn bộ mã nguồn lên GitHub.
2. Đăng nhập vào Netlify và chọn **Add new site** -> **Import an existing project**.
3. Chọn repository từ GitHub.
4. Cấu hình build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Thêm các biến môi trường (Environment Variables) từ file `.env` vào Netlify (VITE_FIREBASE_...).
6. Click **Deploy site**.

Hệ thống đã có sẵn file `netlify.toml` để xử lý SPA routing và Security headers.

## Triển khai lên Firebase Hosting

1. Cài đặt Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Đăng nhập:
   ```bash
   firebase login
   ```
3. Khởi tạo Firebase:
   ```bash
   firebase init hosting
   ```
   - Chọn project.
   - Public directory: `dist`
   - Configure as single-page app: `Yes`
   - Set up automatic builds with GitHub: `Optional`
4. Build và Deploy:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```
