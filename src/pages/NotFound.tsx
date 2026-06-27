import { ROUTES } from '@/constants';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <h1 className="text-9xl font-bold text-slate-200 dark:text-slate-800">404</h1>
      <h2 className="text-2xl font-semibold mt-4 text-slate-800 dark:text-slate-200">Không tìm thấy trang</h2>
      <p className="text-slate-500 mt-2 mb-8 text-center max-w-md">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link to={ROUTES.DASHBOARD}>
        <Button>Về trang chủ</Button>
      </Link>
    </div>
  );
}
