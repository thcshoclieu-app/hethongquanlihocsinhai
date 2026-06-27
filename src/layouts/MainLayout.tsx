import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useUIStore } from '@/store';
import { cn } from '@/lib/utils';

export default function MainLayout() {
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      <Sidebar />
      <div className={cn("flex-1 flex flex-col min-h-screen transition-all duration-300", isSidebarOpen ? "ml-64" : "ml-20")}>
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
