import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Hồ sơ Cá nhân</h2>
        <p className="text-slate-500">Quản lý thông tin tài khoản của bạn.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Thông tin người dùng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-md">
            Giao diện hồ sơ (Giai đoạn sau)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
