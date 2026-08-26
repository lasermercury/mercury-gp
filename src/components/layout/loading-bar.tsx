'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function LoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const barRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rafRef = useRef<number>(0);

  const cleanup = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    cancelAnimationFrame(rafRef.current);
    if (barRef.current) {
      barRef.current.style.opacity = '0';
      barRef.current.style.width = '0%';
    }
  }, []);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    cleanup();

    // Show bar
    bar.style.transition = 'none';
    bar.style.opacity = '1';
    bar.style.width = '15%';

    const t1 = setTimeout(() => {
      bar.style.transition = 'width 400ms ease-out';
      bar.style.width = '45%';
    }, 50);

    const t2 = setTimeout(() => {
      bar.style.transition = 'width 300ms ease-out';
      bar.style.width = '70%';
    }, 350);

    const t3 = setTimeout(() => {
      // Slow creep to 90%
      const creep = () => {
        const current = parseFloat(bar.style.width) || 70;
        if (current >= 90) {
          rafRef.current = requestAnimationFrame(creep);
          return;
        }
        bar.style.transition = 'width 200ms linear';
        bar.style.width = `${current + (90 - current) * 0.03}%`;
        rafRef.current = requestAnimationFrame(creep);
      };
      rafRef.current = requestAnimationFrame(creep);
    }, 600);

    // Complete
    const t4 = setTimeout(() => {
      cancelAnimationFrame(rafRef.current);
      bar.style.transition = 'width 300ms ease-out';
      bar.style.width = '100%';
      const t5 = setTimeout(() => {
        bar.style.transition = 'opacity 300ms ease-out';
        bar.style.opacity = '0';
        const t6 = setTimeout(() => {
          bar.style.width = '0%';
          bar.style.transition = 'none';
        }, 300);
        timersRef.current.push(t6);
      }, 300);
      timersRef.current.push(t5);
    }, 1200);

    timersRef.current = [t1, t2, t3, t4];

    return cleanup;
  }, [pathname, searchParams, cleanup]);

  return (
    <div className="fixed top-0 start-0 end-0 z-[100] h-0.5 opacity-0 pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-0 bg-gradient-to-r from-medical-blue via-soft-blue to-medical-blue"
      />
    </div>
  );
}
