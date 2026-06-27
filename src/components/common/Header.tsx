import { Bell, Moon, Sun, Search, Globe } from 'lucide-react';
import { useThemeStore, useAuthStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { OrganizationSwitcher } from './OrganizationSwitcher';
import { StudentSwitcher } from '@/features/parent/components/StudentSwitcher';

const routeNames: Record<string, string> = {
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.SCHEDULE]: 'Lịch học',
  [ROUTES.STUDENTS]: 'Học sinh',
  [ROUTES.CLASSES]: 'Lớp học',
  [ROUTES.ATTENDANCE]: 'Điểm danh',
  [ROUTES.CAMERA]: 'Camera AI',
  [ROUTES.TUITION]: 'Học phí',
  [ROUTES.PAYMENTS]: 'Thanh toán',
  [ROUTES.REPORTS]: 'Báo cáo',
  [ROUTES.SETTINGS]: 'Cài đặt',
  [ROUTES.ABOUT]: 'Giới thiệu',
  [ROUTES.PROFILE]: 'Hồ sơ',
  
  // Communication Center
  [ROUTES.COMMUNICATION]: 'Trung tâm Thông báo',
  [ROUTES.COMMUNICATION_TEMPLATES]: 'Mẫu Thông báo',
  [ROUTES.COMMUNICATION_CAMPAIGNS]: 'Chiến dịch',

  // AI Insights
  [ROUTES.INSIGHTS]: 'AI Insights & Decision Support',
  [ROUTES.INSIGHTS_CONFIG]: 'Cấu hình AI',

  // Developer Portal
  [ROUTES.DEVELOPER_PORTAL]: 'Open Platform',
  [ROUTES.DEVELOPER_KEYS]: 'API Keys',
  [ROUTES.DEVELOPER_WEBHOOKS]: 'Webhooks',
  [ROUTES.DEVELOPER_PLUGINS]: 'Marketplace',
  [ROUTES.DEVELOPER_DOCS]: 'Tài liệu API',

  // Platform Operations
  [ROUTES.PLATFORM_DASHBOARD]: 'Platform Operations',
  [ROUTES.PLATFORM_TENANTS]: 'Tenant Management',
  [ROUTES.PLATFORM_MONITORING]: 'System Monitoring',
  [ROUTES.PLATFORM_ALERTS]: 'Alert Center',
  [ROUTES.PLATFORM_AUDIT]: 'Audit Center',
  [ROUTES.PLATFORM_CAPACITY]: 'Capacity Planning',
  [ROUTES.PLATFORM_RELEASES]: 'Release Management',
  [ROUTES.PLATFORM_MAINTENANCE]: 'Maintenance Mode',

  [ROUTES.PARENT_DASHBOARD]: 'Tổng quan',
  [ROUTES.PARENT_ATTENDANCE]: 'Điểm danh',
  [ROUTES.PARENT_SCHEDULE]: 'Lịch học',
  [ROUTES.PARENT_TUITION]: 'Học phí',
  [ROUTES.PARENT_LEAVE]: 'Xin nghỉ',
  [ROUTES.PARENT_NOTIFICATIONS]: 'Thông báo',
  [ROUTES.PARENT_SETTINGS]: 'Cài đặt',
};

export default function Header() {
  const { mode, setMode } = useThemeStore();
  const { user } = useAuthStore();
  const location = useLocation();
  const currentPath = location.pathname;
  const pageTitle = routeNames[currentPath] || 'Trang chủ';
  
  const isParent = user?.role === 'PARENT';

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-10 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100 hidden sm:block min-w-[120px]">{pageTitle}</h1>
        
        <div className="hidden md:flex relative max-w-md w-full ml-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
          <Input 
            type="search" 
            placeholder={isParent ? "Tìm kiếm..." : "Tìm kiếm học sinh, lớp học..."}
            className="pl-9 bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-1 focus-visible:bg-white dark:focus-visible:bg-slate-950 h-9" 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-1.5 sm:gap-3">
        {isParent ? <StudentSwitcher /> : <OrganizationSwitcher />}
        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200" title="Ngôn ngữ">
          <Globe size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200" onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
          {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
          <Bell size={18} />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-950"></span>
        </Button>
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800 ml-1">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-tight">Nguyễn Văn A</p>
            <p className="text-xs text-slate-500">Giáo viên</p>
          </div>
          <Avatar className="h-9 w-9 border border-slate-200 dark:border-slate-800 cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarImage src="" />
            <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-semibold text-sm">NA</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
