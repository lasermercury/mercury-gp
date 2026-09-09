'use client';

import { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Save,
  ChevronRight,
  LogOut,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAdminStore } from '@/store/use-admin-store';
import { AdminLogin, AdminLockScreen } from './admin-login';
import { AdminSidebar } from './admin-sidebar';
import { AdminDashboard } from './admin-dashboard';
import { AdminSiteSettings } from './admin-site-settings';
import { AdminGoogle } from './admin-google';
import { AdminAiOptimization } from './admin-ai-optimization';
import { AdminSchemaManager } from './admin-schema-manager';
import { AdminSocial } from './admin-social';
import { AdminRobotsSitemap } from './admin-robots-sitemap';
import { AdminRedirects } from './admin-redirects';
import { AdminBingOthers } from './admin-bing-others';

interface AdminOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminOverlay({ isOpen, onClose }: AdminOverlayProps) {
  const isLoggedIn = useAdminStore((s) => s.isLoggedIn);
  const isLocked = useAdminStore((s) => s.isLocked);
  const activeTab = useAdminStore((s) => s.activeTab);
  const hasUnsavedChanges = useAdminStore((s) => s.hasUnsavedChanges);
  const saveSettings = useAdminStore((s) => s.saveSettings);
  const logout = useAdminStore((s) => s.logout);
  const lockScreen = useAdminStore((s) => s.lockScreen);
  const updateActivity = useAdminStore((s) => s.updateActivity);
  const sidebarCollapsed = useAdminStore((s) => s.sidebarCollapsed);

  const activityTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Activity tracking & auto-lock */
  useEffect(() => {
    if (!isLoggedIn || !isOpen) return;

    activityTimerRef.current = setInterval(() => {
      updateActivity();
    }, 60000);

    const handleActivity = () => {
      updateActivity();
    };
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    return () => {
      if (activityTimerRef.current) clearInterval(activityTimerRef.current);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [isLoggedIn, isOpen, updateActivity]);

  /* Keyboard shortcut to close (Escape) */
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  /* Prevent body scroll when overlay is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const renderTab = useCallback(() => {
    switch (activeTab) {
      case 'dashboard': return <AdminDashboard />;
      case 'site-settings': return <AdminSiteSettings />;
      case 'google': return <AdminGoogle />;
      case 'ai-optimization': return <AdminAiOptimization />;
      case 'schema': return <AdminSchemaManager />;
      case 'social': return <AdminSocial />;
      case 'robots-sitemap': return <AdminRobotsSitemap />;
      case 'redirects': return <AdminRedirects />;
      case 'bing-others': return <AdminBingOthers />;
      default: return <AdminDashboard />;
    }
  }, [activeTab]);

  const tabLabelFa: Record<string, string> = {
    dashboard: 'داشبورد',
    'site-settings': 'تنظیمات سایت',
    google: 'اتصال به گوگل',
    'ai-optimization': 'بهینه‌سازی AI',
    schema: 'اسکیمای نشانه‌گذاری',
    social: 'شبکه‌های اجتماعی',
    'robots-sitemap': 'ربات‌ها و نقشه سایت',
    redirects: 'تغییر مسیرها',
    'bing-others': 'بینگ و سایر موتورها',
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9999] bg-zinc-950"
      >
        {!isLoggedIn ? (
          <AdminLogin />
        ) : isLocked ? (
          <AdminLockScreen />
        ) : (
          <div className="h-full flex flex-col">
            {/* Top Bar */}
            <div className="h-12 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-xl flex items-center justify-between px-4 shrink-0 z-10">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <span className="text-white font-bold text-[10px]">M</span>
                  </div>
                  <span className="text-sm font-semibold text-zinc-200 font-persian">پنل مدیریت</span>
                  <ChevronRight className="w-3 h-3 text-zinc-600" />
                  <span className="text-sm text-zinc-400 font-persian">{tabLabelFa[activeTab] || activeTab}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {hasUnsavedChanges && (
                  <Button
                    onClick={saveSettings}
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1 h-7 text-xs"
                  >
                    <Save className="w-3 h-3" />
                    <span className="font-persian">ذخیره / Save</span>
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                  onClick={lockScreen}
                  title="Lock Screen"
                >
                  <Lock className="w-3.5 h-3.5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                  onClick={logout}
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </Button>

                <div className="w-px h-4 bg-zinc-800" />

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                  onClick={onClose}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Desktop Sidebar */}
              <div className="hidden md:block">
                <AdminSidebar />
              </div>

              {/* Main Content */}
              <main className="flex-1 overflow-y-auto scrollbar-thin">
                <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto pb-24 md:pb-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {renderTab()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </main>
            </div>

            {/* Mobile Bottom Nav */}
            <div className="md:hidden">
              <AdminSidebar isMobile />
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
