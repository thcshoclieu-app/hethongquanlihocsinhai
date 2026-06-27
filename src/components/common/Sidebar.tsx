import { NavLink, useNavigate } from 'react-router-dom';
import { useUIStore, useAuthStore } from '@/store';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants';
import { AuthService } from '@/services/AuthService';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CalendarCheck, 
  Calendar,
  Camera, 
  Wallet, 
  FileText, 
  Settings, 
  Info,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Clock,
  BrainCircuit,
  Code,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const STAFF_MENU_ITEMS = [
  { path: ROUTES.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
  { path: ROUTES.SCHEDULE, icon: Calendar, label: 'Lịch học' },
  { path: ROUTES.CLASSES, icon: BookOpen, label: 'Lớp học' },
  { path: ROUTES.STUDENTS, icon: Users, label: 'Học sinh' },
  { path: ROUTES.ATTENDANCE, icon: CalendarCheck, label: 'Điểm danh' },
  { path: ROUTES.CAMERA, icon: Camera, label: 'Camera AI' },
  { path: ROUTES.TUITION, icon: Wallet, label: 'Học phí' },
  { path: ROUTES.PAYMENTS, icon: Wallet, label: 'Thanh toán' },
  { path: ROUTES.COMMUNICATION, icon: Bell, label: 'Thông báo' },
  { path: ROUTES.INSIGHTS, icon: BrainCircuit, label: 'AI Insights' },
  { path: ROUTES.DEVELOPER_PORTAL, icon: Code, label: 'Open Platform' },
  { path: ROUTES.PLATFORM_DASHBOARD, icon: Shield, label: 'Platform Admin' },
  { path: ROUTES.REPORTS, icon: FileText, label: 'Báo cáo' },
];

const PARENT_MENU_ITEMS = [
  { path: ROUTES.PARENT_DASHBOARD, icon: LayoutDashboard, label: 'Tổng quan' },
  { path: ROUTES.PARENT_SCHEDULE, icon: Calendar, label: 'Lịch học' },
  { path: ROUTES.PARENT_ATTENDANCE, icon: CalendarCheck, label: 'Điểm danh' },
  { path: ROUTES.PARENT_TUITION, icon: Wallet, label: 'Học phí' },
  { path: ROUTES.PARENT_LEAVE, icon: Clock, label: 'Xin nghỉ' },
  { path: ROUTES.PARENT_NOTIFICATIONS, icon: Bell, label: 'Thông báo' },
];

const BOTTOM_MENU = [
  { path: ROUTES.SETTINGS, icon: Settings, label: 'Cài đặt', roles: ['OWNER', 'ADMIN', 'MANAGER'] },
  { path: ROUTES.PARENT_SETTINGS, icon: Settings, label: 'Cài đặt', roles: ['PARENT'] },
  { path: ROUTES.ABOUT, icon: Info, label: 'Giới thiệu', roles: ['OWNER', 'ADMIN', 'MANAGER', 'TEACHER', 'ASSISTANT', 'ACCOUNTANT', 'PARENT'] },
];

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await AuthService.logout();
    navigate(ROUTES.LOGIN);
  };

  const isParent = user?.role === 'PARENT';
  const menuItems = isParent ? PARENT_MENU_ITEMS : STAFF_MENU_ITEMS;
  
  const bottomMenuItems = BOTTOM_MENU.filter(item => {
    if (!item.roles) return true;
    return user?.role && item.roles.includes(user.role);
  });

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
      className="fixed top-0 left-0 h-screen bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 z-20 flex flex-col shrink-0"
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">SP</span>
          </div>
          <AnimatePresence initial={false}>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap"
              >
                StudentPro
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <button 
          onClick={toggleSidebar}
          className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 absolute -right-3.5 top-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
        >
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative overflow-hidden",
              isActive 
                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium" 
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-50"
            )}
            title={!isSidebarOpen ? item.label : undefined}
          >
            <item.icon size={20} className="shrink-0" />
            <AnimatePresence initial={false}>
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </div>

      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
        {bottomMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative overflow-hidden",
              isActive 
                ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50 font-medium" 
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-50"
            )}
            title={!isSidebarOpen ? item.label : undefined}
          >
            <item.icon size={20} className="shrink-0" />
            <AnimatePresence initial={false}>
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}

        <div className={cn(
          "flex items-center gap-3 px-3 pt-4 pb-2 overflow-hidden",
          !isSidebarOpen && "justify-center px-0"
        )}>
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src={user?.photoURL || ''} />
            <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              {user?.displayName?.[0] || 'U'}
            </AvatarFallback>
          </Avatar>
          <AnimatePresence initial={false}>
            {isSidebarOpen && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{user?.displayName || 'Unknown User'}</p>
                <p className="text-xs text-slate-500 truncate capitalize">{user?.role || 'User'}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            {isSidebarOpen && (
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-1.5 text-slate-500 hover:text-red-600 dark:hover:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                title="Đăng xuất"
                onClick={handleLogout}
              >
                <LogOut size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence initial={false}>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-3 pb-2 text-[10px] text-slate-400 text-center"
            >
              Phiên bản 1.0.0
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
