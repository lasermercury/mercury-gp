'use client';

import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { AdminOverlay } from '@/components/admin/admin-overlay';

export function AdminWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  /* Keyboard shortcut: Ctrl+Shift+A */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {children}

      {/* Admin Panel Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-zinc-800 backdrop-blur-sm transition-all duration-200 flex items-center justify-center shadow-lg group"
        title="SEO Admin Panel (Ctrl+Shift+A)"
        aria-label="Open SEO Admin Panel"
      >
        <Shield className="w-4 h-4" />
        <span className="absolute -top-8 right-0 text-[10px] text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-persian">
          پنل SEO / Admin
        </span>
      </button>

      {/* Admin Overlay */}
      <AdminOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
