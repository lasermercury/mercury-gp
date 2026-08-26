'use client';

import { Component, type ReactNode } from 'react';
import { useLocale } from '@/components/layout/providers';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RotateCcw } from 'lucide-react';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return <ErrorFallback error={this.state.error} onReset={this.handleReset} />;
    }
    return this.props.children;
  }
}

function ErrorFallback({
  error,
  onReset,
}: {
  error: Error | null;
  onReset: () => void;
}) {
  const { locale, direction } = useLocale();
  const isRtl = direction === 'rtl';

  const content = {
    en: {
      title: 'Something went wrong',
      description:
        'An unexpected error occurred. This has been noted and we\'re working to fix it.',
      reset: 'Try Again',
      goHome: 'Go to Homepage',
      errorDetail: 'Error details',
    },
    fa: {
      title: 'مشکلی پیش آمد',
      description:
        'خطای غیرمنتظره‌ای رخ داد. این موضوع ثبت شده و در حال رفع آن هستیم.',
      reset: 'تلاش مجدد',
      goHome: 'بازگشت به صفحه اصلی',
      errorDetail: 'جزئیات خطا',
    },
  }[locale];

  return (
    <div
      className="min-h-[60vh] flex items-center justify-center px-4"
      dir={direction}
    >
      <div className="text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="size-8 text-destructive" />
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-3">{content.title}</h2>

        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          {content.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={onReset}
            className="bg-medical-blue hover:bg-medical-blue/90 text-white cursor-pointer"
          >
            <RotateCcw className={'size-4 ' + (isRtl ? 'ms-2' : 'me-2')} />
            {content.reset}
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              window.location.href = '/';
            }}
            className="cursor-pointer"
          >
            {content.goHome}
          </Button>
        </div>

        {error && process.env.NODE_ENV === 'development' ? (
          <details className="mt-8 text-start">
            <summary className="text-xs text-muted-foreground/60 cursor-pointer hover:text-muted-foreground transition-colors">
              {content.errorDetail}
            </summary>
            <pre className="mt-2 p-4 rounded-lg bg-muted text-xs text-muted-foreground overflow-x-auto max-h-48 scrollbar-thin">
              {error.message}
              {error.stack && '\n\n' + error.stack}
            </pre>
          </details>
        ) : null}
      </div>
    </div>
  );
}
