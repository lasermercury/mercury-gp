import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Skeleton */}
      <header className="sticky top-0 z-50 h-16 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Skeleton className="h-8 w-28" />
            <div className="hidden md:flex items-center gap-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-24 rounded-lg" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Skeleton — full viewport, dark bg */}
        <div className="min-h-screen bg-navy-deep relative overflow-hidden">
          <div className="grid-pattern absolute inset-0 z-0" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="flex-1 flex flex-col gap-4 max-w-xl">
                <Skeleton className="h-6 w-32 rounded-full bg-white/10" />
                <Skeleton className="h-12 w-full bg-white/10" />
                <Skeleton className="h-12 w-4/5 bg-white/10" />
                <Skeleton className="h-5 w-full bg-white/8" />
                <Skeleton className="h-5 w-3/4 bg-white/8" />
                <div className="flex gap-3 mt-4">
                  <Skeleton className="h-12 w-40 rounded-lg bg-medical-blue/30" />
                  <Skeleton className="h-12 w-44 rounded-lg bg-white/10" />
                </div>
              </div>
              <div className="flex-shrink-0 w-72 md:w-80 lg:w-96">
                <Skeleton className="h-[400px] w-full rounded-3xl bg-white/5" />
              </div>
            </div>
          </div>
        </div>

        {/* Advantages Skeleton */}
        <div className="py-20 md:py-28 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <Skeleton className="h-6 w-32 rounded-full mb-4" />
              <Skeleton className="h-10 w-80 mb-3" />
              <Skeleton className="h-5 w-96" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border/50 p-6"
                >
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-12 w-12 rounded-xl" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-5 w-3/4 mt-4" />
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-2/3 mt-1.5" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works Skeleton — dark bg */}
        <div className="py-20 md:py-28 bg-navy-deep relative overflow-hidden">
          <div className="grid-pattern absolute inset-0 z-0 opacity-50" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <Skeleton className="h-6 w-36 rounded-full bg-white/10 mb-4" />
              <Skeleton className="h-10 w-72 bg-white/10 mb-3" />
              <Skeleton className="h-5 w-96 bg-white/8" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="text-center">
                  <Skeleton className="h-16 w-16 rounded-2xl mx-auto bg-white/10" />
                  <Skeleton className="h-4 w-6 mx-auto mt-2 rounded-full bg-white/10" />
                  <Skeleton className="h-6 w-40 mx-auto mt-3 bg-white/10" />
                  <Skeleton className="h-4 w-full mx-auto mt-2 bg-white/8" />
                  <Skeleton className="h-4 w-3/4 mx-auto mt-1.5 bg-white/8" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Skeleton */}
        <div className="py-20 md:py-28 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <Skeleton className="h-6 w-24 rounded-full mb-4" />
              <Skeleton className="h-10 w-72 mb-3" />
              <Skeleton className="h-5 w-96" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border/50 p-6 md:p-8"
                >
                  <Skeleton className="h-14 w-14 rounded-2xl" />
                  <Skeleton className="h-5 w-3/4 mt-5" />
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-2/3 mt-1.5" />
                  <Skeleton className="h-4 w-24 mt-5" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Safety Skeleton */}
        <div className="py-20 md:py-28 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <Skeleton className="h-6 w-28 rounded-full mb-4" />
              <Skeleton className="h-10 w-64 mb-3" />
              <Skeleton className="h-5 w-80" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border/50 p-6"
                >
                  <div className="flex gap-4">
                    <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-2/3" />
                      <Skeleton className="h-4 w-full mt-2" />
                      <Skeleton className="h-4 w-4/5 mt-1.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="bg-navy-deep border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                {i === 0 ? (
                  <>
                    <Skeleton className="h-8 w-28 bg-white/10 mb-4" />
                    <Skeleton className="h-4 w-full bg-white/8" />
                    <Skeleton className="h-4 w-3/4 bg-white/8 mt-2" />
                  </>
                ) : (
                  <>
                    <Skeleton className="h-4 w-20 bg-white/10 mb-4" />
                    {Array.from({ length: 4 }).map((_, j) => (
                      <Skeleton
                        key={j}
                        className="h-4 w-28 bg-white/8 mt-3"
                      />
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
