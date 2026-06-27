import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { Code, CheckCircle, Smartphone, Globe, Cpu } from 'lucide-react';

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 h-full max-w-4xl mx-auto"
    >
      <div className="text-center space-y-4 py-8">
        <div className="w-24 h-24 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-blue-600/20 rotate-3">
          <span className="text-4xl font-bold italic block -rotate-3">S</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">StudentPro</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 mt-2">Hệ thống quản lý học sinh và điểm danh AI hiện đại.</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="secondary" className="px-3 py-1">Phiên bản 1.0.0</Badge>
          <Badge variant="outline" className="px-3 py-1 text-green-600 border-green-200 bg-green-50">Giai đoạn 1 (UI/UX)</Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Cpu size={20} className="text-blue-500" />
              Công nghệ & Kiến trúc
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {[
                { label: 'Framework', value: 'React 19 + Vite' },
                { label: 'Ngôn ngữ', value: 'TypeScript 5.x' },
                { label: 'Giao diện', value: 'Tailwind CSS v4 + Radix UI' },
                { label: 'Animation', value: 'Motion (Framer Motion)' },
                { label: 'Kiến trúc', value: 'Clean Architecture + Modular' },
                { label: 'Trạng thái', value: 'Zustand' },
              ].map((item, i) => (
                <li key={i} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle size={20} className="text-green-500" />
              Tính năng nổi bật
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Smartphone size={16} />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">Responsive & PWA Ready</p>
                  <p className="text-sm text-slate-500">Tương thích hoàn hảo trên mọi thiết bị: Desktop, Tablet, Mobile.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <Globe size={16} />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">Dark/Light Mode Theme</p>
                  <p className="text-sm text-slate-500">Hỗ trợ tự động chuyển đổi giao diện sáng/tối theo hệ thống.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Code size={16} />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">Design System chuẩn mực</p>
                  <p className="text-sm text-slate-500">Hệ thống màu sắc, typography và spacing đồng nhất theo Google/Apple.</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center text-sm text-slate-500 pt-8 pb-4">
        &copy; {new Date().getFullYear()} Bản quyền thuộc về Đội ngũ phát triển StudentPro.
      </div>
    </motion.div>
  );
}
