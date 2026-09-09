'use client';

import { motion } from 'framer-motion';
import {
  Activity,
  CheckCircle2,
  XCircle,
  Chrome,
  BarChart3,
  Code2,
  Brain,
  FileText,
  ExternalLink,
  ArrowRight,
  Zap,
  Shield,
  Globe,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAdminStore, calculateSeoHealthScore } from '@/store/use-admin-store';

export function AdminDashboard() {
  const state = useAdminStore();
  const healthScore = calculateSeoHealthScore(state);
  const setActiveTab = useAdminStore((s) => s.setActiveTab);

  const enabledSchemas = state.schemas.filter((s) => s.enabled).length;
  const totalSchemas = state.schemas.length;
  const enabledAiBots = state.aiBots.filter((b) => b.allowed).length;

  const statusCards = [
    {
      icon: <Chrome className="w-5 h-5" />,
      labelFa: 'سرچ کنسول گوگل',
      labelEn: 'Google Search Console',
      status: !!state.gscVerificationCode,
      action: () => setActiveTab('google'),
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      labelFa: 'GA4 فعال',
      labelEn: 'GA4 Active',
      status: !!state.ga4MeasurementId,
      action: () => setActiveTab('google'),
    },
    {
      icon: <Zap className="w-5 h-5" />,
      labelFa: 'GTM فعال',
      labelEn: 'GTM Active',
      status: !!state.gtmContainerId,
      action: () => setActiveTab('google'),
    },
    {
      icon: <Globe className="w-5 h-5" />,
      labelFa: 'نقشه سایت ارسال شده',
      labelEn: 'Sitemap Submitted',
      status: state.sitemapSubmittedToGsc,
      action: () => setActiveTab('google'),
    },
    {
      icon: <Code2 className="w-5 h-5" />,
      labelFa: 'اسکیماها',
      labelEn: 'Schemas',
      status: enabledSchemas >= 15,
      extra: enabledSchemas + '/' + totalSchemas,
      action: () => setActiveTab('schema'),
    },
    {
      icon: <Brain className="w-5 h-5" />,
      labelFa: 'بهینه‌سازی AI',
      labelEn: 'AI Optimization',
      status: state.aiCitationOptimizationEnabled && enabledAiBots >= 5,
      extra: enabledAiBots + '/' + state.aiBots.length,
      action: () => setActiveTab('ai-optimization'),
    },
  ];

  const healthColor = healthScore >= 80 ? 'text-emerald-400' : healthScore >= 50 ? 'text-amber-400' : 'text-red-400';
  const healthBg = healthScore >= 80 ? 'from-emerald-500 to-teal-500' : healthScore >= 50 ? 'from-amber-500 to-orange-500' : 'from-red-500 to-rose-500';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 font-persian">داشبورد</h2>
        <p className="text-sm text-zinc-400 mt-1">Dashboard — Overview of your SEO/GEO/AIO configuration</p>
      </div>

      {/* Health Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-32 h-32 shrink-0">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
                  <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-800" />
                  <circle
                    cx="64" cy="64" r="56" fill="none"
                    stroke="url(#healthGrad)" strokeWidth="8"
                    strokeDasharray={351.86}
                    strokeDashoffset={351.86 - (351.86 * healthScore / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="healthGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={healthScore >= 80 ? '#10b981' : healthScore >= 50 ? '#f59e0b' : '#ef4444'} />
                      <stop offset="100%" stopColor={healthScore >= 80 ? '#14b8a6' : healthScore >= 50 ? '#f97316' : '#f43f5e'} />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={'text-3xl font-bold ' + healthColor}>{healthScore}</span>
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className={'text-xl font-bold font-persian ' + healthColor}>
                  امتیاز سلامت سئو / SEO Health Score
                </h3>
                <p className="text-sm text-zinc-400 mt-2">
                  {healthScore >= 80
                    ? 'سایت شما بهینه‌سازی خوبی دارد / Your site is well-optimized'
                    : healthScore >= 50
                    ? 'نیاز به بهبود دارد / Needs improvement'
                    : 'نیاز به توجه فوری دارد / Needs immediate attention'}
                </p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                  <Badge variant="outline" className="border-zinc-700 text-z1nc-400 text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    {enabledSchemas + '/' + totalSchemas + ' schemas'}
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-xs">
                    <Brain className="w-3 h-3 mr-1" />
                    {enabledAiBots + '/' + state.aiBots.length + ' AI bots'}
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-xs">
                    <FileText className="w-3 h-3 mr-1" />
                    {state.sitemapUrls.length + ' URLs'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statusCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * i }}
          >
            <Card
              className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
              onClick={card.action}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className={'p-2 rounded-lg ' + (card.status ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-500')}>
                    {card.icon}
                  </div>
                  {card.status ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-zinc-600" />
                  )}
                </div>
                <div className="mt-3">
                  <p className="text-sm font-medium text-zinc-200 font-persian">{card.labelFa}</p>
                  <p className="text-xs text-zinc-500">{card.labelEn}</p>
                  {card.extra && (
                    <p className="text-xs text-zinc-500 mt-1">{card.extra}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-200 font-persian mb-3">عملیات سریع / Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Button
            variant="outline"
            className="bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 h-auto py-3 px-4 justify-start gap-3"
            onClick={() => setActiveTab('google')}
          >
            <Chrome className="w-4 h-4 shrink-0" />
            <div className="text-left">
              <p className="text-sm font-persian">اتصال گوگل</p>
              <p className="text-xs text-zinc-500">Setup Google Integration</p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 h-auto py-3 px-4 justify-start gap-3"
            onClick={() => setActiveTab('ai-optimization')}
          >
            <Brain className="w-4 h-4 shrink-0" />
            <div className="text-left">
              <p className="text-sm font-persian">تنظیمات AI</p>
              <p className="text-xs text-zinc-500">Configure AI Bots</p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 h-auto py-3 px-4 justify-start gap-3"
            onClick={() => setActiveTab('schema')}
          >
            <Code2 className="w-4 h-4 shrink-0" />
            <div className="text-left">
              <p className="text-sm font-persian">اسکیماها</p>
              <p className="text-xs text-zinc-500">Manage Schema Markup</p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 h-auto py-3 px-4 justify-start gap-3"
            onClick={() => window.open('https://search.google.com/search-console', '_blank')}
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            <div className="text-left">
              <p className="text-sm font-persian">سرچ کنسول</p>
              <p className="text-xs text-zinc-500">Open Google Search Console</p>
            </div>
          </Button>
        </div>
      </div>

      {/* Recommendations */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-zinc-200 font-persian">
            توصیه‌ها / Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {!state.gscVerificationCode && (
            <div className="flex items-center gap-2 text-sm text-amber-400">
              <ArrowRight className="w-3 h-3 shrink-0" />
              <span className="font-persian">کد تأیید سرچ کنسول تنظیم نشده / GSC verification code not set</span>
            </div>
          )}
          {!state.ga4MeasurementId && (
            <div className="flex items-center gap-2 text-sm text-amber-400">
              <ArrowRight className="w-3 h-3 shrink-0" />
              <span className="font-persian">GA4 متصل نشده / GA4 not connected</span>
            </div>
          )}
          {!state.gtmContainerId && (
            <div className="flex items-center gap-2 text-sm text-amber-400">
              <ArrowRight className="w-3 h-3 shrink-0" />
              <span className="font-persian">GTM متصل نشده / GTM not connected</span>
            </div>
          )}
          {enabledSchemas < totalSchemas && (
            <div className="flex items-center gap-2 text-sm text-amber-400">
              <ArrowRight className="w-3 h-3 shrink-0" />
              <span className="font-persian">{(totalSchemas - enabledSchemas) + ' اسکیما غیرفعال / ' + (totalSchemas - enabledSchemas) + ' schemas disabled'}</span>
            </div>
          )}
          {state.gscVerificationCode && state.ga4MeasurementId && state.gtmContainerId && enabledSchemas === totalSchemas && (
            <div className="flex items-center gap-2 text-sm text-emerald-400">
              <CheckCircle2 className="w-3 h-3 shrink-0" />
              <span className="font-persian">همه چیز بهینه است / Everything looks great!</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
