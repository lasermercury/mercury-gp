'use client';

import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Settings,
  Chrome,
  Brain,
  Code2,
  Share2,
  FileText,
  ArrowRightLeft,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAdminStore, type AdminTab } from '@/store/use-admin-store';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface NavItem {
  id: AdminTab;
  icon: React.ReactNode;
  labelFa: string;
  labelEn: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', icon: <LayoutDashboard className="w-4 h-4" />, labelFa: 'داشبورد', labelEn: 'Dashboard' },
  { id: 'site-settings', icon: <Settings className="w-4 h-4" />, labelFa: 'تنظیمات سایت', labelEn: 'Site Settings' },
  { id: 'google', icon: <Chrome className="w-4 h-4" />, labelFa: 'اتصال به گوگل', labelEn: 'Google Integration' },
  { id: 'ai-optimization', icon: <Brain className="w-4 h-4" />, labelFa: 'بهینه‌سازی هوش مصنوعی', labelEn: 'AI Optimization (GEO/AIO)' },
  { id: 'schema', icon: <Code2 className="w-4 h-4" />, labelFa: 'اسکیمای نشانه‌گذاری', labelEn: 'Schema Markup' },
  { id: 'social', icon: <Share2 className="w-4 h-4" />, labelFa: 'شبکه‌های اجتماعی', labelEn: 'Social Media' },
  { id: 'robots-sitemap', icon: <FileText className="w-4 h-4" />, labelFa: 'ربات‌ها و نقشه سایت', labelEn: 'Robots & Sitemap' },
  { id: 'redirects', icon: <ArrowRightLeft className="w-4 h-4" />, labelFa: 'تغییر مسیرها', labelEn: 'Redirects' },
  { id: 'bing-others', icon: <Search className="w-4 h-4" />, labelFa: 'بینگ و سایر موتورها', labelEn: 'Bing & Others' },
];

interface AdminSidebarProps {
  isMobile?: boolean;
}

export function AdminSidebar({ isMobile }: AdminSidebarProps) {
  const activeTab = useAdminStore((s) => s.activeTab);
  const setActiveTab = useAdminStore((s) => s.setActiveTab);
  const sidebarCollapsed = useAdminStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useAdminStore((s) => s.toggleSidebar);

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-800 safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={('flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all duration-150 min-w-0 ' + (isActive ? 'text-emerald-400 bg-emerald-400/10' : 'text-zinc-500 hover:text-zinc-300'))}
              >
                <span className="w-4 h-4 shrink-0">{item.icon}</span>
                <span className="text-[9px] leading-tight truncate max-w-[48px] font-persian">{item.labelFa}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 64 : 240 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="h-full bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0 overflow-hidden"
    >
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-3 border-b border-zinc-800 shrink-0">
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 overflow-hidden"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-zinc-100 truncate font-persian">پنل مدیریت</p>
              <p className="text-[10px] text-zinc-500 truncate">SEO/GEO/AIO</p>
            </div>
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={'h-7 w-7 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 ' + (sidebarCollapsed ? 'mx-auto' : '')}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-2">
        <nav className="space-y-0.5 px-2">
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={('w-full flex items-center gap-3 rounded-lg transition-all duration-150 group ' + (sidebarCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5') + (isActive ? ' bg-emerald-500/10 text-emerald-400' : ' text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'))}
                title={item.labelEn}
              >
                <span className="shrink-0">{item.icon}</span>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm truncate font-persian"
                  >
                    {item.labelFa}
                  </motion.span>
                )}
                {!sidebarCollapsed && !isActive && (
                  <span className="text-[10px] text-zinc-600 ml-auto shrink-0 hidden group-hover:block">{item.labelEn}</span>
                )}
              </button>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator className="bg-zinc-800" />

      {/* Footer */}
      <div className="p-3 shrink-0">
        {!sidebarCollapsed && (
          <div className="text-[10px] text-zinc-600 text-center font-persian">
            lasermercury.ir
          </div>
        )}
      </div>
    </motion.aside>
  );
}
