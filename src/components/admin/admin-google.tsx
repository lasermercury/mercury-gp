'use client';

import { motion } from 'framer-motion';
import {
  Chrome,
  BarChart3,
  Zap,
  Shield,
  Globe,
  ExternalLink,
  CheckCircle2,
  Copy,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useAdminStore } from '@/store/use-admin-store';

export function AdminGoogle() {
  const state = useAdminStore();

  const ga4Valid = /^G-[A-Z0-9]{7,10}$/.test(state.ga4MeasurementId);
  const gtmValid = /^GTM-[A-Z0-9]{7}$/.test(state.gtmContainerId);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 font-persian">اتصال به گوگل</h2>
        <p className="text-sm text-zinc-400 mt-1">Google Integration — Connect Google services for analytics & search</p>
      </div>

      {/* Google Search Console */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              سرچ کنسول گوگل / Google Search Console
            </CardTitle>
            <CardDescription className="text-zinc-500">Verify site ownership and submit sitemap</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-zinc-400 font-persian">کد تأیید / Verification Code</Label>
              <div className="flex gap-2">
                <Input
                  value={state.gscVerificationCode}
                  onChange={(e) => state.setGscVerificationCode(e.target.value)}
                  placeholder="e.g., abc123def456"
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-600"
                />
                {state.gscVerificationCode && (
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 shrink-0 self-center">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    تنظیم شده
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-zinc-400 font-persian">
                متای تأیید سایت / Site Verification Meta Tag
              </Label>
              <div className="flex gap-2">
                <Input
                  value={state.googleSiteVerificationMeta}
                  onChange={(e) => state.setGoogleSiteVerificationMeta(e.target.value)}
                  placeholder="meta name=google-site-verification content=..."
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-600 text-xs"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 shrink-0"
                  onClick={() => {
                    if (state.googleSiteVerificationMeta) {
                      navigator.clipboard.writeText(state.googleSiteVerificationMeta);
                    }
                  }}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Separator className="bg-zinc-800" />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm text-zinc-300 font-persian">نقشه سایت ارسال شده / Sitemap Submitted</Label>
                <p className="text-xs text-zinc-500 mt-1">Mark if sitemap has been submitted to GSC</p>
              </div>
              <Switch
                checked={state.sitemapSubmittedToGsc}
                onCheckedChange={state.setSitemapSubmittedToGsc}
              />
            </div>

            <Button
              variant="outline"
              className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 gap-2"
              onClick={() => window.open('https://search.google.com/search-console', '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              <span className="font-persian">ارسال نقشه سایت به GSC / Submit Sitemap to GSC</span>
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Google Analytics 4 */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              گوگل آنالیتیکس ۴ / Google Analytics 4
            </CardTitle>
            <CardDescription className="text-zinc-500">Track user behavior and site performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-zinc-400 font-persian">شناسه اندازه‌گیری / Measurement ID</Label>
              <div className="flex gap-2">
                <Input
                  value={state.ga4MeasurementId}
                  onChange={(e) => state.setGa4MeasurementId(e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-600"
                />
                {state.ga4MeasurementId && (
                  <Badge variant="outline" className={('shrink-0 self-center ' + (ga4Valid ? 'border-emerald-500/30 text-emerald-400' : 'border-amber-500/30 text-amber-400'))}>
                    {ga4Valid ? 'معتبر / Valid' : 'نامعتبر / Invalid'}
                  </Badge>
                )}
              </div>
              <p className="text-[10px] text-zinc-600">Format: G-XXXXXXXXXX (7-10 alphanumeric characters)</p>
            </div>

            {state.ga4MeasurementId && ga4Valid && (
              <div className="bg-zinc-800/50 rounded-lg p-3 text-xs text-zinc-400 font-mono">
                <p className="text-zinc-500 mb-1">GA4 Script Preview:</p>
                <p>{'gtag("config", "' + state.ga4MeasurementId + '");'}</p>
              </div>
            )}

            <Button
              variant="outline"
              className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 gap-2"
              onClick={() => window.open('https://analytics.google.com/', '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              <span className="font-persian">باز کردن داشبورد GA4 / Open GA4 Dashboard</span>
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Google Tag Manager */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              گوگل تگ منیجر / Google Tag Manager
            </CardTitle>
            <CardDescription className="text-zinc-500">Manage tracking tags and events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-zinc-400 font-persian">شناسه کانتینر / Container ID</Label>
              <div className="flex gap-2">
                <Input
                  value={state.gtmContainerId}
                  onChange={(e) => state.setGtmContainerId(e.target.value)}
                  placeholder="GTM-XXXXXXX"
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-600"
                />
                {state.gtmContainerId && (
                  <Badge variant="outline" className={('shrink-0 self-center ' + (gtmValid ? 'border-emerald-500/30 text-emerald-400' : 'border-amber-500/30 text-amber-400'))}>
                    {gtmValid ? 'معتبر / Valid' : 'نامعتبر / Invalid'}
                  </Badge>
                )}
              </div>
              <p className="text-[10px] text-zinc-600">Format: GTM-XXXXXXX (7 alphanumeric characters)</p>
            </div>

            {state.gtmContainerId && gtmValid && (
              <div className="bg-zinc-800/50 rounded-lg p-3 text-xs text-zinc-400 font-mono">
                <p className="text-zinc-500 mb-1">GTM Script Preview:</p>
                <p>{'gtm.js?id=' + state.gtmContainerId}</p>
              </div>
            )}

            <Button
              variant="outline"
              className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 gap-2"
              onClick={() => window.open('https://tagmanager.google.com/', '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              <span className="font-persian">باز کردن داشبورد GTM / Open GTM Dashboard</span>
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Links */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              لینک‌های سریع / Quick Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="bg-zinc-800/30 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 h-auto py-3 flex-col gap-1"
                onClick={() => window.open('https://search.google.com/search-console', '_blank')}
              >
                <Chrome className="w-5 h-5" />
                <span className="text-xs font-persian">سرچ کنسول</span>
                <span className="text-[10px] text-zinc-500">Search Console</span>
              </Button>
              <Button
                variant="outline"
                className="bg-zinc-800/30 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 h-auto py-3 flex-col gap-1"
                onClick={() => window.open('https://analytics.google.com/', '_blank')}
              >
                <BarChart3 className="w-5 h-5" />
                <span className="text-xs font-persian">آنالیتیکس</span>
                <span className="text-[10px] text-zinc-500">Analytics</span>
              </Button>
              <Button
                variant="outline"
                className="bg-zinc-800/30 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 h-auto py-3 flex-col gap-1"
                onClick={() => window.open('https://tagmanager.google.com/', '_blank')}
              >
                <Zap className="w-5 h-5" />
                <span className="text-xs font-persian">تگ منیجر</span>
                <span className="text-[10px] text-zinc-500">Tag Manager</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
