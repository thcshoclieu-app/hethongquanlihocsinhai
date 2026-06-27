import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function ApiDocumentationViewer() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="text-blue-600" /> Open API Documentation
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Tài liệu tích hợp hệ thống qua RESTful API</p>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
          <CardTitle className="text-lg">Authentication</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Mọi API request phải bao gồm API Key trong header <code>x-api-key</code>.
          </p>
          <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg text-sm overflow-x-auto">
            {`GET /api/v1/students HTTP/1.1
Host: api.edtech.com
x-api-key: pk_xxxx.sk_yyyy`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
          <CardTitle className="text-lg">Endpoints (v1)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {/* Mock endpoint docs */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 font-bold text-xs rounded">GET</span>
                <code className="text-sm font-semibold">/api/v1/students</code>
              </div>
              <p className="text-sm text-slate-600">Lấy danh sách học sinh. Hỗ trợ phân trang và filter.</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded">POST</span>
                <code className="text-sm font-semibold">/api/v1/attendance</code>
              </div>
              <p className="text-sm text-slate-600">Ghi nhận điểm danh hàng loạt từ hệ thống bên ngoài (VD: máy quét khuôn mặt, thẻ từ).</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded">POST</span>
                <code className="text-sm font-semibold">/api/v1/invoices/:id/pay</code>
              </div>
              <p className="text-sm text-slate-600">Cập nhật trạng thái thanh toán hóa đơn từ Cổng thanh toán bên thứ 3.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
